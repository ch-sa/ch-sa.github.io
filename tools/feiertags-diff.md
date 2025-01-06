---
title: Feiertags Diff
---

<div class="form-container">
  <div class="form-group">
    <label for="base-state" class="form-label">Current:</label>
    <select id="base-state" name="base-state" onchange="compareHolidays()">
      <option value="Baden-Württemberg">Baden-Württemberg</option>
      <option value="Bayern">Bayern</option>
      <option value="Berlin">Berlin</option>
      <option value="Brandenburg">Brandenburg</option>
      <option value="Bremen">Bremen</option>
      <option value="Hamburg">Hamburg</option>
      <option value="Hessen">Hessen</option>
      <option value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</option>
      <option value="Niedersachsen">Niedersachsen</option>
      <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
      <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
      <option value="Saarland">Saarland</option>
      <option value="Sachsen">Sachsen</option>
      <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
      <option value="Schleswig-Holstein">Schleswig-Holstein</option>
      <option value="Thüringen">Thüringen</option>
    </select>
  </div>
  <div class="form-group">
    <label for="compare-states" class="form-label">Incoming:</label>
    <div id="compare-states" class="horizontal-checkboxes">
      <label><input type="checkbox" name="compare-state" value="Baden-Württemberg" onchange="compareHolidays()"> Baden-Württemberg</label>
      <label><input type="checkbox" name="compare-state" value="Bayern" onchange="compareHolidays()"> Bayern</label>
      <label><input type="checkbox" name="compare-state" value="Berlin" onchange="compareHolidays()"> Berlin</label>
      <label><input type="checkbox" name="compare-state" value="Brandenburg" onchange="compareHolidays()"> Brandenburg</label>
      <label><input type="checkbox" name="compare-state" value="Bremen" onchange="compareHolidays()"> Bremen</label>
      <label><input type="checkbox" name="compare-state" value="Hamburg" onchange="compareHolidays()"> Hamburg</label>
      <label><input type="checkbox" name="compare-state" value="Hessen" onchange="compareHolidays()"> Hessen</label>
      <label><input type="checkbox" name="compare-state" value="Mecklenburg-Vorpommern" onchange="compareHolidays()"> Mecklenburg-Vorpommern</label>
      <label><input type="checkbox" name="compare-state" value="Niedersachsen" onchange="compareHolidays()"> Niedersachsen</label>
      <label><input type="checkbox" name="compare-state" value="Nordrhein-Westfalen" onchange="compareHolidays()"> Nordrhein-Westfalen</label>
      <label><input type="checkbox" name="compare-state" value="Rheinland-Pfalz" onchange="compareHolidays()"> Rheinland-Pfalz</label>
      <label><input type="checkbox" name="compare-state" value="Saarland" onchange="compareHolidays()"> Saarland</label>
      <label><input type="checkbox" name="compare-state" value="Sachsen" onchange="compareHolidays()"> Sachsen</label>
      <label><input type="checkbox" name="compare-state" value="Sachsen-Anhalt" onchange="compareHolidays()"> Sachsen-Anhalt</label>
      <label><input type="checkbox" name="compare-state" value="Schleswig-Holstein" onchange="compareHolidays()"> Schleswig-Holstein</label>
      <label><input type="checkbox" name="compare-state" value="Thüringen" onchange="compareHolidays()"> Thüringen</label>
    </div>
  </div>
</div>

<div id="next-holiday" class="next-holiday">
  <!-- Next holiday information will be dynamically added here -->
</div>

<div id="result" class="diff-container">
  <table id="holidays-table">
    <thead>
      <tr>
        <th>Datum</th>
        <th id="base-state-header">Base State Holidays</th>
        <!-- Compare state headers will be dynamically added here -->
      </tr>
    </thead>
    <tbody id="holidays-table-body">
      <!-- Holiday rows will be dynamically added here -->
    </tbody>
  </table>
</div>

<button id="download-ics" class="download-button">Export Diff Feiertage in Kalender (.ics)</button>

<p class="disclaimer">Created with the help of some ✨ and not yet reviewed, treat with care!</p>

<style>
    .main-content {
        max-width: 80%;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        .main-content {
            max-width: 95%;
            margin: 0 auto;
        }

        .form-group {
            flex-direction: column;
        }

        .form-label {
            margin-bottom: 5px;
        }

        #base-state {
            width: 100%;
            max-width: none;
        }

        .horizontal-checkboxes {
            flex-direction: column;
            gap: 8px;
        }

        .horizontal-checkboxes label {
            margin-left: 0;
            font-size: 14px;
        }

        .next-holiday {
            font-size: 14px;
            padding: 10px;
        }

        /* Disable sticky columns on mobile */
        th:first-child,
        td:first-child,
        th:nth-child(2),
        td:nth-child(2) {
            position: static;
            min-width: 120px;
        }

        /* Adjust table for better mobile view */
        th, td {
            padding: 6px;
            min-width: 120px;
            font-size: 14px;
        }

        .download-button {
            width: 100%;
            margin: 15px 0;
            padding: 12px;
            font-size: 16px;
        }

        /* Make the table container full-width on mobile */
        .diff-container {
            margin: 0 -15px;
            width: calc(100% + 30px);
        }
    }


    @media (max-width: 768px) {
        .main-content {
            max-width: 95%;
            margin: 0 auto;
        }

        .form-group {
            flex-direction: column;
        }

        .form-label {
            margin-bottom: 5px;
        }

        #base-state {
            width: 100%;
            max-width: none;
        }

        .horizontal-checkboxes {
            flex-direction: column;
            gap: 8px;
        }

        .horizontal-checkboxes label {
            margin-left: 0;
            font-size: 14px;
        }

        .next-holiday {
            font-size: 14px;
            padding: 10px;
        }

        /* Disable sticky columns on mobile */
        th:first-child,
        td:first-child,
        th:nth-child(2),
        td:nth-child(2) {
            position: static;
            min-width: 120px;
        }

        /* Adjust table for better mobile view */
        th, td {
            padding: 6px;
            min-width: 120px;
            font-size: 14px;
        }

        .download-button {
            width: 100%;
            margin: 15px 0;
            padding: 12px;
            font-size: 16px;
        }

        /* Make the table container full-width on mobile */
        .diff-container {
            margin: 0 -15px;
            width: calc(100% + 30px);
        }
    }


    @media (max-width: 768px) {
        .main-content {
            max-width: 95%;
            margin: 0 auto;
        }

        .form-group {
            flex-direction: column;
        }

        .form-label {
            margin-bottom: 5px;
        }

        #base-state {
            width: 100%;
            max-width: none;
        }

        .horizontal-checkboxes {
            flex-direction: column;
            gap: 8px;
        }

        .horizontal-checkboxes label {
            margin-left: 0;
            font-size: 14px;
        }

        .next-holiday {
            font-size: 14px;
            padding: 10px;
        }

        /* Disable sticky columns on mobile */
        th:first-child,
        td:first-child,
        th:nth-child(2),
        td:nth-child(2) {
            position: static;
            min-width: 120px;
        }

        /* Adjust table for better mobile view */
        th, td {
            padding: 6px;
            min-width: 120px;
            font-size: 14px;
        }

        .download-button {
            width: 100%;
            margin: 15px 0;
            padding: 12px;
            font-size: 16px;
        }

        /* Make the table container full-width on mobile */
        .diff-container {
            margin: 0 -15px;
            width: calc(100% + 30px);
        }
    }


    @media (max-width: 768px) {
        .main-content {
            max-width: 95%;
            margin: 0 auto;
        }

        .form-group {
            flex-direction: column;
        }

        .form-label {
            margin-bottom: 5px;
        }

        #base-state {
            width: 100%;
            max-width: none;
        }

        .horizontal-checkboxes {
            flex-direction: column;
            gap: 8px;
        }

        .horizontal-checkboxes label {
            margin-left: 0;
            font-size: 14px;
        }

        .next-holiday {
            font-size: 14px;
            padding: 10px;
        }

        /* Disable sticky columns on mobile */
        th:first-child,
        td:first-child,
        th:nth-child(2),
        td:nth-child(2) {
            position: static;
            min-width: 120px;
        }

        /* Adjust table for better mobile view */
        th, td {
            padding: 6px;
            min-width: 120px;
            font-size: 14px;
        }

        .download-button {
            width: 100%;
            margin: 15px 0;
            padding: 12px;
            font-size: 16px;
        }

        /* Make the table container full-width on mobile */
        .diff-container {
            margin: 0 -15px;
            width: calc(100% + 30px);
        }
    }

    .diff-container {
        overflow-x: auto;
        position: relative;
    }
    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed;
        overflow: hidden;
    }

    th, td {
        padding: 8px;
        border: 1px solid #e1e4e8;
        text-align: left;
        min-width: 200px;
    }

    /* Sticky first two columns */
    th:first-child,
    td:first-child {
        position: sticky;
        left: 0;
        z-index: 2;
        background: white;
        border-right: 2px solid #e1e4e8;
    }

    th:nth-child(2),
    td:nth-child(2) {
        position: sticky;
        left: 200px; /* same as min-width */
        z-index: 1;
        background: white;
        border-right: 2px solid #e1e4e8;
    }

    th:first-child,
    th:nth-child(2) {
        z-index: 3;
        background: #f6f8fa;
    }

    tr:nth-child(odd) td:first-child,
    tr:nth-child(odd) td:nth-child(2) {
        background: #fafafa;
    }
    .added {
        background-color: #e6ffed;
        color: #22863a;
    }
    .removed {
        background-color: #ffeef0;
        color: #cb2431;
    }
    .horizontal-checkboxes {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding-left: 0;
    }
    .horizontal-checkboxes label {
        display: flex;
        gap: 5px;

    }
    .next-holiday {
        margin: 20px 0;
        background-color: #f0f7fb;
        border-left: 5px solid #3498db;
        padding: 15px;
        padding-right: 25px;
        border-radius: 3px;
        display: inline-block;
        max-width: 100%;
    }
    .warning-icon {
        color: #d9534f;
        margin-left: 5px;
    }
    .form-container {
        margin-bottom: 20px;
    }
    .form-group {
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;
    }
    .form-group label {
        padding-top: 5px;
    }
    .form-label {
        min-width: 6em;
        font-weight: bold;
    }
    .disclaimer {
        text-align: center;
        font-style: italic;
        color: #666;
        margin-top: 2em;
        font-size: 0.8em;
    }
    .download-button {
        margin: 20px 0;
        padding: 10px 20px;
        background-color: #0366d6;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
    .download-button:hover {
        background-color: #045cb5;
    }
</style>
<script>
  let holidays = {};

  const STATE_TO_NAME = {
      'DE-BW': 'Baden-Württemberg',
      'DE-BY': 'Bayern',
      'DE-BE': 'Berlin',
      'DE-BB': 'Brandenburg',
      'DE-HB': 'Bremen',
      'DE-HH': 'Hamburg',
      'DE-HE': 'Hessen',
      'DE-MV': 'Mecklenburg-Vorpommern',
      'DE-NI': 'Niedersachsen',
      'DE-NW': 'Nordrhein-Westfalen',
      'DE-RP': 'Rheinland-Pfalz',
      'DE-SL': 'Saarland',
      'DE-SN': 'Sachsen',
      'DE-ST': 'Sachsen-Anhalt',
      'DE-SH': 'Schleswig-Holstein',
      'DE-TH': 'Thüringen'
    };

  const NAME_TO_STATE = Object.entries(STATE_TO_NAME).reduce((acc, [abbr, name]) => {
    acc[name] = abbr;
    return acc;
  }, {});

  async function fetchHolidays() {
    const currentYear = new Date().getFullYear();
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/DE`);
    const data = await response.json();    

    // Initialize holidays object
    holidays = Object.values(STATE_TO_NAME).reduce((acc, state) => {
      acc[state] = [];
      return acc;
    }, {});

    // Transform API data into required format
    data.forEach(holiday => {
      const holidayData = {
        date: holiday.date,
        name: holiday.localName
      };

      // If holiday is global, add it to all states
      if (holiday.global) {
        Object.keys(holidays).forEach(state => {
          holidays[state].push({...holidayData});
        });
        return;
      }

      // Add holiday to specific states
      if (holiday.counties) {
        holiday.counties.forEach(county => {
          const stateName = stateMapping[county];
          if (stateName && holidays[stateName]) {
            holidays[stateName].push({...holidayData});
          }
        });
      }
    });

    // Sort holidays by date for each state
    Object.keys(holidays).forEach(state => {
      holidays[state].sort((a, b) => a.date.localeCompare(b.date));
    });

    compareHolidays();
  }

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      currentState: params.get('current'),
      incomingStates: params.getAll('incoming')
    };
  }

  function updateURL(baseState, compareStates) {
    const params = new URLSearchParams();
    params.set('current', baseState);
    compareStates.forEach(state => params.append('incoming', state));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }

  function getNextHoliday() {
    const today = new Date().toISOString().split('T')[0];
    const allHolidays = Object.values(holidays).flat();
    const futureHolidays = allHolidays.filter(holiday => holiday.date >= today);
    futureHolidays.sort((a, b) => new Date(a.date) - new Date(b.date));
    return futureHolidays[0];
  }

  function updateNextHolidaySection() {
    const nextHoliday = getNextHoliday();
    if (!nextHoliday) return;

    const baseState = document.getElementById('base-state').value;
    const compareStates = Array.from(document.querySelectorAll('input[name="compare-state"]:checked')).map(el => el.value);
    const selectedStates = [baseState, ...compareStates];

    const statesWithHoliday = selectedStates.filter(state => 
      holidays[state].some(holiday => holiday.date === nextHoliday.date)
    );
    const statesWithoutHoliday = selectedStates.filter(state => 
      !holidays[state].some(holiday => holiday.date === nextHoliday.date)
    );

    const formatStateList = (states) => {
      if (states.length === 0) return '';
      if (states.length === 1) return states[0];
      const lastState = states[states.length - 1];
      const otherStates = states.slice(0, -1);
      return `${otherStates.join(', ')} oder ${lastState}`;
    };

    const nextHolidayDiv = document.getElementById('next-holiday');
    nextHolidayDiv.innerHTML = `
      Nächster Feiertag ist <strong>${nextHoliday.name} am ${nextHoliday.date}</strong>
      ${statesWithHoliday.length ? `in ${formatStateList(statesWithHoliday.map(state => `${state} 😎`))}` : ''}
      ${statesWithoutHoliday.length ? `und nicht in ${formatStateList(statesWithoutHoliday.map(state => `${state} 👨‍💻`))}` : ''}.
    `;
  }

  function getWeekdaySuffix(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { weekday: 'short' });
  }

  function compareHolidays() {
    const baseState = document.getElementById('base-state').value;
    let compareStates = Array.from(document.querySelectorAll('input[name="compare-state"]:checked')).map(el => el.value);

    updateURL(baseState, compareStates);

    const baseHolidays = holidays[baseState] || [];
    const holidaysTableBody = document.getElementById('holidays-table-body');
    const holidaysTableHead = document.querySelector('#holidays-table thead tr');
    const baseStateHeader = document.getElementById('base-state-header');

    holidaysTableBody.innerHTML = '';
    baseStateHeader.textContent = `Current: ${baseState}`;
    holidaysTableHead.innerHTML = `<th>Date</th><th id="base-state-header">Current: ${baseState}</th>`;

    // Remove the base state from the compare states if it is selected
    compareStates = compareStates.filter(state => state !== baseState);

    compareStates.forEach(state => {
      const th = document.createElement('th');
      th.textContent = `Incoming: ${state}`;
      holidaysTableHead.appendChild(th);
    });

    const allDates = new Set(baseHolidays.map(holiday => holiday.date));
    compareStates.forEach(state => {
      holidays[state].forEach(holiday => allDates.add(holiday.date));
    });

    const sortedDates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

    sortedDates.forEach(date => {
      const tr = document.createElement('tr');
      const baseHoliday = baseHolidays.find(h => h.date === date);
      const baseTd = document.createElement('td');
      const dateTd = document.createElement('td');
      dateTd.textContent = `${date} (${getWeekdaySuffix(date)})`;

      let hasDiff = false;

      if (baseHoliday) {
        baseTd.textContent = `${baseHoliday.name}`;
      } else {
        baseTd.textContent = 'Kein Feiertag';
        baseTd.classList.add('removed');
        hasDiff = true;
      }
      tr.appendChild(dateTd);
      tr.appendChild(baseTd);

      compareStates.forEach(state => {
        const td = document.createElement('td');
        const stateHoliday = holidays[state].find(h => h.date === date);
        if (stateHoliday) {
          td.textContent = `${stateHoliday.name}`;
          if (!baseHoliday) {
            td.classList.add('added');
            hasDiff = true;
          }
        } else {
          td.textContent = 'Kein Feiertag';
          td.classList.add('removed');
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
    document.querySelectorAll('input[name="compare-state"]').forEach(checkbox => {
      checkbox.parentElement.style.display = checkbox.value === baseState ? 'none' : 'flex';
    });

    updateNextHolidaySection();
  }

  function generateICS(conflicts) {
    const now = new Date().toISOString().replace(/[-:.]/g, '').split('T')[0];
    
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Feiertags-Diff//DE',
        ...conflicts.map(conflict => {
            const date = conflict.date.replace(/-/g, '');
            const uid = `${date}-${Math.random().toString(36).substr(2, 9)}`;
            const states = conflict.states.join(', ');
            
            return [
                'BEGIN:VEVENT',
                `UID:${uid}`,
                `DTSTAMP:${now}T000000Z`,
                `DTSTART;VALUE=DATE:${date}`,
                `DTEND;VALUE=DATE:${date}`,
                `STATUS:TENTATIVE`,
                `SUMMARY:${conflict.holiday} (Konflikt)`,
                `DESCRIPTION;ALTREP="data:text/html,Unterschiedliche Feiertage in: ${states}.%3Cbr%3E%3Cbr%3EGeneriert%20mit%20%3Ca%20href%3D%22${window.location.href}%22%3EFeiertags-Diff%3C%2Fa%3E.":Unterschiedliche Feiertage in: ${states}.\n\nGeneriert mit ${window.location.href}.`,
                'END:VEVENT'
            ].join('\r\n');
        }),
        'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
}

function downloadICS() {
    const baseState = document.getElementById('base-state').value;
    const compareStates = Array.from(document.querySelectorAll('input[name="compare-state"]:checked')).map(el => el.value);
    const conflicts = [];

    // Get all dates with differences
    document.querySelectorAll('#holidays-table-body tr').forEach(row => {
        if (row.querySelector('.warning-icon')) {
            const date = row.cells[0].textContent.trim().replace(' ⚠️', '');
            const states = [baseState, ...compareStates];
            const stateHolidays = states.map(state => {
                const idx = states.indexOf(state) + 1;
                return row.cells[idx].textContent;
            });
            
            conflicts.push({
                date: date,
                holiday: stateHolidays.find(h => h !== 'Kein Feiertag') || 'Feiertags-Konflikt',
                states: states
            });
        }
    });

    const icsContent = generateICS(conflicts);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'feiertags-diff.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

  document.addEventListener('DOMContentLoaded', async () => {
    const { currentState, incomingStates } = getQueryParams();
    if (currentState) {
      document.getElementById('base-state').value = currentState;
    }
    incomingStates.forEach(state => {
      const checkbox = document.querySelector(`input[name="compare-state"][value="${state}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
    await fetchHolidays();
    document.getElementById('download-ics').addEventListener('click', downloadICS);
  });
</script>
