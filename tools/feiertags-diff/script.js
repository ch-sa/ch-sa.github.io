let holidays = {};

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

async function fetchHolidays() {
  const currentYear = new Date().getFullYear();
  const response = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/DE`
  );
  const data = await response.json();

  // Initialize holidays object
  holidays = Object.values(STATE_TO_NAME).reduce((acc, state) => {
    acc[state] = [];
    return acc;
  }, {});

  // Transform API data into required format
  data.forEach((holiday) => {
    const holidayData = {
      date: holiday.date,
      name: holiday.localName,
    };

    // If holiday is global, add it to all states
    if (holiday.global) {
      Object.keys(holidays).forEach((state) => {
        holidays[state].push({ ...holidayData });
      });
      return;
    }

    // Add holiday to specific states
    if (holiday.counties) {
      holiday.counties.forEach((county) => {
        const stateName = STATE_TO_NAME[county];
        if (stateName && holidays[stateName]) {
          holidays[stateName].push({ ...holidayData });
        }
      });
    }
  });

  // Sort holidays by date for each state
  Object.keys(holidays).forEach((state) => {
    holidays[state].sort((a, b) => a.date.localeCompare(b.date));
  });

  compareHolidays();
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    currentState: params.get("current"),
    incomingStates: params.getAll("incoming"),
  };
}

function updateURL(baseState, compareStates) {
  const params = new URLSearchParams();
  params.set("current", baseState);
  compareStates.forEach((state) => params.append("incoming", state));
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, "", newUrl);
}

function getNextHoliday() {
  const today = new Date().toISOString().split("T")[0];
  const allHolidays = Object.values(holidays).flat();
  const futureHolidays = allHolidays.filter((holiday) => holiday.date >= today);
  futureHolidays.sort((a, b) => new Date(a.date) - new Date(b.date));
  return futureHolidays[0];
}

function updateNextHolidaySection() {
  const nextHoliday = getNextHoliday();
  if (!nextHoliday) return;

  const baseState = document.getElementById("base-state").value;
  const compareStates = Array.from(
    document.querySelectorAll('input[name="compare-state"]:checked')
  ).map((el) => el.value);
  const selectedStates = [baseState, ...compareStates];

  const statesWithHoliday = selectedStates.filter((state) =>
    holidays[state].some((holiday) => holiday.date === nextHoliday.date)
  );
  const statesWithoutHoliday = selectedStates.filter(
    (state) =>
      !holidays[state].some((holiday) => holiday.date === nextHoliday.date)
  );

  const formatStateList = (states) => {
    if (states.length === 0) return "";
    if (states.length === 1) return states[0];
    const lastState = states[states.length - 1];
    const otherStates = states.slice(0, -1);
    return `${otherStates.join(", ")} oder ${lastState}`;
  };

  const nextHolidayDiv = document.getElementById("next-holiday");
  nextHolidayDiv.innerHTML = `
      Nächster Feiertag ist <strong>${nextHoliday.name} am ${
    nextHoliday.date
  }</strong>
      ${
        statesWithHoliday.length
          ? `in ${formatStateList(
              statesWithHoliday.map((state) => `${state} 😎`)
            )}`
          : ""
      }
      ${
        statesWithoutHoliday.length
          ? `und nicht in ${formatStateList(
              statesWithoutHoliday.map((state) => `${state} 👨‍💻`)
            )}`
          : ""
      }.
    `;
}

function getWeekdaySuffix(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", { weekday: "short" });
}

function compareHolidays() {
  const baseState = document.getElementById("base-state").value;
  let compareStates = Array.from(
    document.querySelectorAll('input[name="compare-state"]:checked')
  ).map((el) => el.value);

  updateURL(baseState, compareStates);

  const baseHolidays = holidays[baseState] || [];
  const holidaysTableBody = document.getElementById("holidays-table-body");
  const holidaysTableHead = document.querySelector("#holidays-table thead tr");
  const baseStateHeader = document.getElementById("base-state-header");

  holidaysTableBody.innerHTML = "";
  baseStateHeader.textContent = `Current: ${baseState}`;
  holidaysTableHead.innerHTML = `<th>Date</th><th id="base-state-header">Current: ${baseState}</th>`;

  // Remove the base state from the compare states if it is selected
  compareStates = compareStates.filter((state) => state !== baseState);

  compareStates.forEach((state) => {
    const th = document.createElement("th");
    th.textContent = `Incoming: ${state}`;
    holidaysTableHead.appendChild(th);
  });

  const allDates = new Set(baseHolidays.map((holiday) => holiday.date));
  compareStates.forEach((state) => {
    holidays[state].forEach((holiday) => allDates.add(holiday.date));
  });

  const sortedDates = Array.from(allDates).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  sortedDates.forEach((date) => {
    const tr = document.createElement("tr");
    const baseHoliday = baseHolidays.find((h) => h.date === date);
    const baseTd = document.createElement("td");
    const dateTd = document.createElement("td");
    dateTd.textContent = `${date} (${getWeekdaySuffix(date)})`;

    let hasDiff = false;

    if (baseHoliday) {
      baseTd.textContent = `${baseHoliday.name}`;
    } else {
      baseTd.textContent = "Kein Feiertag";
      baseTd.classList.add("removed");
      hasDiff = true;
    }
    tr.appendChild(dateTd);
    tr.appendChild(baseTd);

    compareStates.forEach((state) => {
      const td = document.createElement("td");
      const stateHoliday = holidays[state].find((h) => h.date === date);
      if (stateHoliday) {
        td.textContent = `${stateHoliday.name}`;
        if (!baseHoliday) {
          td.classList.add("added");
          hasDiff = true;
        }
      } else {
        td.textContent = "Kein Feiertag";
        td.classList.add("removed");
        hasDiff = true;
      }
      tr.appendChild(td);
    });

    if (hasDiff) {
      dateTd.innerHTML += ' <span class="warning-icon">⚠️</span>';
    }

    holidaysTableBody.appendChild(tr);
  });

  // Remove the checkbox for the select base state
  document
    .querySelectorAll('input[name="compare-state"]')
    .forEach((checkbox) => {
      checkbox.parentElement.style.display =
        checkbox.value === baseState ? "none" : "flex";
    });

  updateNextHolidaySection();
}

function generateICS(conflicts) {
  const now = new Date().toISOString().replace(/[-:.]/g, "").split("T")[0];

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Feiertags-Diff//DE",
    ...conflicts.map((conflict) => {
      const date = conflict.date.replace(/-/g, "");
      const endDate = new Date(conflict.date);
      endDate.setDate(endDate.getDate() + 1);
      console.log(date);
      console.log(endDate);
      const endDateString = endDate
        .toISOString()
        .split("T")[0]
        .replaceAll("-", "");
      console.log(endDateString);
      const uid = `${date}-${Math.random().toString(36).substr(2, 9)}`;
      const shortStatesWithHoliday = conflict.statesWithHoliday
        .map((state) => NAME_TO_STATE[state].split("-")[1])
        .join(", ");
      const statesWithHoliday = conflict.statesWithHoliday.join(", ");
      const statesWithoutHoliday = conflict.statesWithoutHoliday.join(", ");

      return [
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${now}T000000Z`,
        `DTSTART;VALUE=DATE:${date}`,
        `DTEND;VALUE=DATE:${endDateString}`,
        `STATUS:TENTATIVE`,
        `SUMMARY:${conflict.holiday} (Only in ${shortStatesWithHoliday}!)`,
        `DESCRIPTION;ALTREP="data:text/html,${conflict.holiday} is a public holiday in
                ${statesWithHoliday} but not in ${statesWithoutHoliday}.%3Cbr%3E%3Cbr%3EGeneriert%20mit%20%3Ca%20href%3D%22${window.location.href}%22%3EFeiertags-Diff%3C%2Fa%3E.":Der ${conflict.holiday} is a public holiday in
                ${statesWithHoliday} but not in ${statesWithoutHoliday}.\n\nGenerated with ${window.location.href}.`,
        "END:VEVENT",
      ].join("\r\n");
    }),
    "END:VCALENDAR",
  ].join("\r\n");

  return icsContent;
}

function downloadICS() {
  const baseState = document.getElementById("base-state").value;
  const compareStates = Array.from(
    document.querySelectorAll('input[name="compare-state"]:checked')
  ).map((el) => el.value);
  const conflicts = [];

  // Get all dates with differences
  document.querySelectorAll("#holidays-table-body tr").forEach((row) => {
    if (row.querySelector(".warning-icon")) {
      const date = row.cells[0].textContent.trim().replace(" ⚠️", "");
      const states = [baseState, ...compareStates];
      const stateHolidays = states.map((state) => {
        const idx = states.indexOf(state) + 1;
        return row.cells[idx].textContent;
      });

      const statesWithHoliday = states.filter(
        (state, idx) => stateHolidays[idx] !== "Kein Feiertag"
      );
      const statesWithoutHoliday = states.filter(
        (state, idx) => stateHolidays[idx] === "Kein Feiertag"
      );

      conflicts.push({
        date: date,
        holiday:
          stateHolidays.find((h) => h !== "Kein Feiertag") ||
          "Feiertags-Konflikt",
        statesWithHoliday: statesWithHoliday,
        statesWithoutHoliday: statesWithoutHoliday,
      });
    }
  });

  const icsContent = generateICS(conflicts);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "feiertags-diff.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", async () => {
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
});
