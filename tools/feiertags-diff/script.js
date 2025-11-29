/* -------------------------------------------------------------------------- */
/*                              GLOBAL VARIABLES                              */
/* -------------------------------------------------------------------------- */

const STATE_TO_NAME = {
  "DE-BW": "Baden-Württemberg",
  "DE-BY": "Bayern",
  "DE-BE": "Berlin",
  "DE-BB": "Brandenburg",
  "DE-HB": "Bremen",
  "DE-HH": "Hamburg",
  "DE-HE": "Hessen",
  "DE-MV": "Mecklenburg-Vorpommern",
  "DE-NI": "Niedersachsen",
  "DE-NW": "Nordrhein-Westfalen",
  "DE-RP": "Rheinland-Pfalz",
  "DE-SL": "Saarland",
  "DE-SN": "Sachsen",
  "DE-ST": "Sachsen-Anhalt",
  "DE-SH": "Schleswig-Holstein",
  "DE-TH": "Thüringen",
};

const NAME_TO_STATE = Object.entries(STATE_TO_NAME).reduce(
  (acc, [abbr, name]) => {
    acc[name] = abbr;
    return acc;
  },
  {}
);

let holidayDiff = [];
let currentState;
let incomingStates;

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function enumerationText(elements, lastSeparator) {
  if (elements.length === 0) return "";
  if (elements.length === 1) {
    return elements[0];
  }
  return `${elements.slice(0, -1).join(", ")} ${lastSeparator} ${elements.at(
    -1
  )}`;
}

function getWeekdaySuffix(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", { weekday: "short" });
}

function populateYearDropdown() {
  const currentYear = new Date().getFullYear();
  const yearSelect = document.getElementById("year");
  yearSelect.innerHTML = "";
  
  for (let i = 0; i <= 5; i++) {
    const year = currentYear + i;
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
  
  yearSelect.value = currentYear.toString();
}

/* -------------------------------------------------------------------------- */
/*                                    LOGIC                                   */
/* -------------------------------------------------------------------------- */

async function fetchHolidays() {
  const selectedYear = document.getElementById("year").value;
  const response = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${selectedYear}/DE`
  );
  const data = await response.json();

  compareHolidays(data);
}

function generateDiff(data, selectedStates) {
  const diff = [];
  for (const holiday of data) {
    let statesWithHoliday;

    if (holiday.global) {
      statesWithHoliday = selectedStates;
    } else {
      statesWithHoliday = holiday.counties
        ?.map((c) => STATE_TO_NAME[c])
        .filter((s) => selectedStates.includes(s));
      if (statesWithHoliday.length === 0) {
        continue;
      }
    }

    diff.push({
      date: holiday.date,
      nameDe: holiday.localName,
      nameEn: holiday.name,
      states: statesWithHoliday,
      stateCodes: statesWithHoliday.map((state) => NAME_TO_STATE[state]),
      conflict: !(
        selectedStates.every((state) => statesWithHoliday.includes(state)) ||
        selectedStates.every((state) => !statesWithHoliday.includes(state))
      ),
    });
  }
  return diff;
}

function updateNextHolidaySection() {
  function getNextHoliday() {
    const today = new Date().toISOString().split("T")[0];
    return holidayDiff.find((holiday) => holiday.date >= today);
  }

  const nextHoliday = getNextHoliday();
  if (!nextHoliday) return;

  const selectedStates = [currentState, ...incomingStates];
  const statesWithHoliday = nextHoliday.states;
  const statesWithoutHoliday = selectedStates.filter(
    (state) => !statesWithHoliday.includes(state)
  );

  const nextHolidayDiv = document.getElementById("next-holiday");
  nextHolidayDiv.innerHTML = `
    Nächster Feiertag ist <strong>${nextHoliday.nameDe}</strong> am <strong>${
    nextHoliday.date
  }</strong>
    ${
      statesWithHoliday.length
        ? `in ${enumerationText(
            statesWithHoliday.map((state) => `${state} 😎`),
            "oder"
          )}`
        : ""
    }
    ${
      statesWithoutHoliday.length
        ? `und nicht in ${enumerationText(
            statesWithoutHoliday.map((state) => `${state} 👨‍💻`),
            "oder"
          )}`
        : ""
    }.
  `;
}

function compareHolidays(data) {
  function updateURL(baseState, compareStates) {
    const params = new URLSearchParams();
    params.set("current", baseState);
    compareStates.forEach((state) => params.append("incoming", state));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  }

  currentState = document.getElementById("base-state").value;
  incomingStates = Array.from(
    document.querySelectorAll('input[name="compare-state"]:checked')
  ).map((el) => el.value);
  // Remove the base state from the compare states if it is selected.
  incomingStates = incomingStates.filter((state) => state !== currentState);
  updateURL(currentState, incomingStates);

  // Table head
  const currentHead = document.getElementById("base-state-header");
  currentHead.textContent = `Current: ${currentState}`;
  const incomingHead = document.querySelector("#holidays-table thead tr");
  incomingHead.innerHTML = `<th>Date</th><th id="base-state-header">Current: ${currentState}</th>`;
  incomingStates.forEach((state) => {
    const th = document.createElement("th");
    th.textContent = `Incoming: ${state}`;
    incomingHead.appendChild(th);
  });

  // Table body
  holidayDiff = generateDiff(data, [currentState, ...incomingStates]);

  const holidaysTableBody = document.getElementById("holidays-table-body");
  holidaysTableBody.innerHTML = "";
  holidayDiff.forEach((holiday) => {
    const tr = document.createElement("tr");

    const isHolidayInState = (state) => holiday.states.includes(state);
    function addHolidayCell(stateName, cellTd) {
      if (isHolidayInState(stateName)) {
        cellTd.textContent = holiday.nameDe;
        cellTd.setAttribute("data-mobile-content", "✓");
        if (stateName !== currentState && !isHolidayInState(currentState)) {
          cellTd.classList.add("added");
        }
      } else {
        cellTd.textContent = "Kein Feiertag";
        cellTd.setAttribute("data-mobile-content", "✗");
        cellTd.classList.add("removed");
      }
      tr.appendChild(cellTd);
    }

    // Header column
    const dateTd = document.createElement("td");
    const dateString = `${holiday.date} (${getWeekdaySuffix(holiday.date)})`;
    dateTd.setAttribute("data-label", dateString);
    dateTd.setAttribute("data-holiday-name", holiday.nameDe);
    dateTd.textContent = dateString;
    tr.appendChild(dateTd);

    // Base column
    const currentTd = document.createElement("td");
    currentTd.setAttribute("data-label", `Current: ${currentState}`);
    addHolidayCell(currentState, currentTd);

    // Incoming column
    incomingStates.forEach((state) => {
      const td = document.createElement("td");
      td.setAttribute("data-label", `Incoming: ${state}`);
      addHolidayCell(state, td);
    });

    if (holiday.conflict) {
      dateTd.innerHTML += ' <span class="warning-icon">⚠️</span>';
    }

    holidaysTableBody.appendChild(tr);
  });

  // Remove the checkbox for the select base state
  document
    .querySelectorAll('input[name="compare-state"]')
    .forEach((checkbox) => {
      checkbox.parentElement.style.display =
        checkbox.value === currentState ? "none" : "flex";
    });

  updateNextHolidaySection();
}

function generateICS(selectedStates) {
  const now = new Date().toISOString().replace(/[-:.]/g, "").split("T")[0];

  const hashCode = (s) =>
    s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Feiertags-Diff//DE",
    ...holidayDiff
      .filter((h) => h.conflict)
      .map((holiday) => {
        const iCalDate = holiday.date.replaceAll("-", "");
        const eventHash = hashCode(selectedStates.join(""));
        const uid = `${iCalDate}-${eventHash}`;
        const stateCodesWithHoliday = holiday.stateCodes
          .map((name) => name.split("-")[1])
          .join(", ");
        const statesWithHoliday = enumerationText(holiday.states, "and");
        const statesWithoutHoliday = enumerationText(
          selectedStates.filter((s) => !statesWithHoliday.includes(s)),
          "and"
        );

        const descriptionText =
          `${holiday.nameDe} (${holiday.nameEn}) is a public holiday in ${statesWithHoliday}` +
          (statesWithoutHoliday ? ` but not in ${statesWithoutHoliday}.` : `.`);
        return [
          "BEGIN:VEVENT",
          `UID:${uid}`,
          `DTSTAMP:${now}T000000Z`,
          `DTSTART;VALUE=DATE:${iCalDate}`,
          `STATUS:TENTATIVE`,
          `SUMMARY:${holiday.nameDe} (Only in ${stateCodesWithHoliday}!)`,
          `DESCRIPTION;ALTREP="data:text/html,` +
            descriptionText +
            `%3Cbr%3E%3Cbr%3EGeneriert%20mit%20%3Ca%20href%3D%22${window.location.href}%22%3EFeiertags-Diff%3C%2Fa%3E."` +
            `:${descriptionText}\n\n` +
            `Generated with ${window.location.href}.`,
          "END:VEVENT",
        ].join("\r\n");
      }),
    "END:VCALENDAR",
  ].join("\r\n");

  return icsContent;
}

function downloadICS() {
  const icsContent = generateICS([currentState, ...incomingStates]);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "feiertags-diff.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    currentState: params.get("current"),
    incomingStates: params.getAll("incoming"),
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  // Populate year dropdown first
  populateYearDropdown();
  
  const { currentState, incomingStates } = getQueryParams();
  if (currentState) {
    document.getElementById("base-state").value = currentState;
  }
  incomingStates.forEach((state) => {
    const checkbox = document.querySelector(
      `input[name="compare-state"][value="${state}"]`
    );
    if (checkbox) {
      checkbox.checked = true;
    }
  });
  await fetchHolidays();
  document
    .getElementById("download-ics")
    .addEventListener("click", downloadICS);
  
  // Add listeners to update table on selection change
  document.getElementById("base-state").addEventListener("change", fetchHolidays);
  document.getElementById("year").addEventListener("change", fetchHolidays);
  document.querySelectorAll('input[name="compare-state"]').forEach((checkbox) => {
    checkbox.addEventListener("change", fetchHolidays);
  });
});
