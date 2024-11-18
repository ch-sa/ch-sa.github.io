---
title: Feiertags Diff
---

<div>
  <label for="base-state">Base State:</label>
  <select id="base-state" name="base-state" onchange="compareHolidays()">
    <option value="Bavaria">Bavaria</option>
    <option value="Berlin">Berlin</option>
    <option value="Saxony">Saxony</option>
    <!-- Add more states as needed -->
  </select>
</div>
<div>
  <label for="compare-states">Compare States:</label>
  <div id="compare-states">
    <label><input type="checkbox" name="compare-state" value="Bavaria" onchange="compareHolidays()"> Bavaria</label>
    <label><input type="checkbox" name="compare-state" value="Berlin" onchange="compareHolidays()"> Berlin</label>
    <label><input type="checkbox" name="compare-state" value="Saxony" onchange="compareHolidays()"> Saxony</label>
    <!-- Add more states as needed -->
  </div>
</div>
<!-- Removed the button -->
<div id="result" class="diff-container">
  <table id="holidays-table">
    <thead>
      <tr>
        <th id="base-state-header">Base State Holidays</th>
        <!-- Compare state headers will be dynamically added here -->
      </tr>
    </thead>
    <tbody id="holidays-table-body">
      <!-- Holiday rows will be dynamically added here -->
    </tbody>
  </table>
</div>

<style>
    .main-content {
        max-width: 80%;
        margin: 0 auto;
    }
    .diff-container {
        overflow: hidden;
    }
    table {
        border-collapse: collapse;
        table-layout: fixed;
    }

    th, td {
        padding: 8px;
        border: 1px solid #e1e4e8;
        text-align: left;
    }
    th {
        background-color: #f6f8fa;
    }
    tr:nth-child(odd) {
        background-color: #f6f8fa;
    }
    .added {
        background-color: #e6ffed;
        color: #22863a;
    }
    .removed {
        background-color: #ffeef0;
        color: #cb2431;
    }
</style>
<script>
  const holidays = {
    Bavaria: [
      { date: '2024-01-01', name: 'Neujahrstag' },
      { date: '2024-01-06', name: 'Heilige Drei Könige' },
      { date: '2024-03-29', name: 'Karfreitag' },
      { date: '2024-04-01', name: 'Ostermontag' },
      { date: '2024-05-01', name: 'Tag der Arbeit' },
      { date: '2024-05-09', name: 'Christi Himmelfahrt' },
      { date: '2024-05-20', name: 'Pfingstmontag' },
      { date: '2024-05-30', name: 'Fronleichnam' },
      { date: '2024-08-15', name: 'Mariä Himmelfahrt' },
      { date: '2024-10-03', name: 'Tag der Deutschen Einheit' },
      { date: '2024-10-31', name: 'Reformationstag' },
      { date: '2024-11-01', name: 'Allerheiligen' },
      { date: '2024-12-25', name: 'Erster Weihnachtstag' },
      { date: '2024-12-26', name: 'Zweiter Weihnachtstag' }
    ],
    Berlin: [
      { date: '2024-01-01', name: 'Neujahrstag' },
      { date: '2024-03-29', name: 'Karfreitag' },
      { date: '2024-04-01', name: 'Ostermontag' },
      { date: '2024-05-01', name: 'Tag der Arbeit' },
      { date: '2024-05-09', name: 'Christi Himmelfahrt' },
      { date: '2024-05-20', name: 'Pfingstmontag' },
      { date: '2024-10-03', name: 'Tag der Deutschen Einheit' },
      { date: '2024-12-25', name: 'Erster Weihnachtstag' },
      { date: '2024-12-26', name: 'Zweiter Weihnachtstag' }
    ],
    Saxony: [
      { date: '2024-01-01', name: 'Neujahrstag' },
      { date: '2024-03-29', name: 'Karfreitag' },
      { date: '2024-04-01', name: 'Ostermontag' },
      { date: '2024-05-01', name: 'Tag der Arbeit' },
      { date: '2024-05-09', name: 'Christi Himmelfahrt' },
      { date: '2024-05-20', name: 'Pfingstmontag' },
      { date: '2024-10-03', name: 'Tag der Deutschen Einheit' },
      { date: '2024-10-31', name: 'Reformationstag' },
      { date: '2024-11-20', name: 'Buß- und Bettag' },
      { date: '2024-12-25', name: 'Erster Weihnachtstag' },
      { date: '2024-12-26', name: 'Zweiter Weihnachtstag' }
    ]
    // Add more states and their holidays as needed
  };

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      currentState: params.get('currentState'),
      incomingStates: params.get('incomingStates') ? params.get('incomingStates').split(',') : []
    };
  }

  function updateURL(baseState, compareStates) {
    const params = new URLSearchParams();
    params.set('currentState', baseState);
    params.set('incomingStates', compareStates.join(','));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
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
    baseStateHeader.textContent = `Base: ${baseState}`;
    holidaysTableHead.innerHTML = `<th id="base-state-header">Base: ${baseState}</th>`;

    // Remove the base state from the compare states if it is selected
    compareStates = compareStates.filter(state => state !== baseState);

    compareStates.forEach(state => {
      const th = document.createElement('th');
      th.textContent = `${state} Holidays`;
      holidaysTableHead.appendChild(th);
    });

    const allDates = new Set(baseHolidays.map(holiday => holiday.date));
    compareStates.forEach(state => {
      holidays[state].forEach(holiday => allDates.add(holiday.date));
    });

    allDates.forEach(date => {
      const tr = document.createElement('tr');
      const baseHoliday = baseHolidays.find(h => h.date === date);
      const baseTd = document.createElement('td');
      if (baseHoliday) {
        baseTd.textContent = `${baseHoliday.date} - ${baseHoliday.name}`;
      } else {
        baseTd.textContent = 'Not a holiday';
        baseTd.classList.add('removed');
      }
      tr.appendChild(baseTd);

      compareStates.forEach(state => {
        const td = document.createElement('td');
        const stateHoliday = holidays[state].find(h => h.date === date);
        if (stateHoliday) {
          td.textContent = `${stateHoliday.date} - ${stateHoliday.name}`;
          if (!baseHoliday) {
            td.classList.add('added');
          }
        } else {
          td.textContent = 'Not a holiday';
          td.classList.add('removed');
        }
        tr.appendChild(td);
      });

      holidaysTableBody.appendChild(tr);
    });

    // Remove the checkbox for the selected base state
    document.querySelectorAll('input[name="compare-state"]').forEach(checkbox => {
      checkbox.parentElement.style.display = checkbox.value === baseState ? 'none' : 'block';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
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
    compareHolidays();
  });
</script>
