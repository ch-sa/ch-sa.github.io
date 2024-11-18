---
title: Feiertags Diff
---

<h2>Feiertags Diff</h2>
<div>
  <label for="base-state">Base State:</label>
  <select id="base-state" name="base-state">
    <option value="Bavaria">Bavaria</option>
    <option value="Berlin">Berlin</option>
    <option value="Saxony">Saxony</option>
    <!-- Add more states as needed -->
  </select>
</div>
<div>
  <label for="compare-states">Compare States:</label>
  <div id="compare-states">
    <label><input type="checkbox" name="compare-state" value="Bavaria"> Bavaria</label>
    <label><input type="checkbox" name="compare-state" value="Berlin"> Berlin</label>
    <label><input type="checkbox" name="compare-state" value="Saxony"> Saxony</label>
    <!-- Add more states as needed -->
  </div>
</div>
<div>
  <button onclick="compareHolidays()">Compare</button>
</div>
<div id="result" class="diff-container">
  <div id="base-state-holidays" class="diff-column">
    <h3>Base State Holidays</h3>
    <ul id="base-holidays-list"></ul>
  </div>
  <div id="compare-state-holidays" class="diff-columns">
    <!-- Compare state columns will be dynamically added here -->
  </div>
</div>

<style>
      .main-content {
        max-width: 80%; /* Adjust this value as needed */
        margin: 0 auto;
      }
      
    .diff-container {
        display: flex;
        justify-content: space-between;
        border: 1px solid #d1d5da;
        border-radius: 6px;
        overflow: hidden;
    }
    .diff-column {
        width: 50%;
        padding: 16px;
        box-sizing: border-box;
    }
    .diff-columns {
        display: flex;
        flex-wrap: wrap;
        width: 50%;
    }
    .diff-column h3 {
        margin-top: 0;
    }
    .diff-column ul {
        list-style-type: none;
        padding: 0;
    }
    .diff-column li {
        padding: 8px;
        border-bottom: 1px solid #e1e4e8;
    }
    .diff-column li:nth-child(odd) {
        background-color: #f6f8fa;
    }
    .diff-column li.added {
        background-color: #e6ffed;
        color: #22863a;
    }
    .diff-column li.removed {
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

  function compareHolidays() {
    const baseState = document.getElementById('base-state').value;
    const compareStateElements = document.querySelectorAll('input[name="compare-state"]:checked');
    const compareStates = Array.from(compareStateElements).map(el => el.value);

    const baseHolidays = holidays[baseState] || [];
    const baseHolidaysList = document.getElementById('base-holidays-list');
    const compareHolidaysContainer = document.getElementById('compare-state-holidays');

    baseHolidaysList.innerHTML = '';
    compareHolidaysContainer.innerHTML = '';

    const baseHolidayDates = baseHolidays.map(holiday => holiday.date);

    baseHolidays.forEach(holiday => {
      const li = document.createElement('li');
      li.textContent = `${holiday.date} - ${holiday.name}`;
      if (!compareStates.flatMap(state => holidays[state] || []).map(holiday => holiday.date).includes(holiday.date)) {
        li.classList.add('removed');
      }
      baseHolidaysList.appendChild(li);
    });

    compareStates.forEach(state => {
      const stateHolidays = holidays[state] || [];
      const column = document.createElement('div');
      column.classList.add('diff-column');
      const header = document.createElement('h3');
      header.textContent = `${state} Holidays`;
      column.appendChild(header);
      const ul = document.createElement('ul');
      stateHolidays.forEach(holiday => {
        const li = document.createElement('li');
        li.textContent = `${holiday.date} - ${holiday.name}`;
        if (!baseHolidayDates.includes(holiday.date)) {
          li.classList.add('added');
        }
        ul.appendChild(li);
      });
      column.appendChild(ul);
      compareHolidaysContainer.appendChild(column);
    });
  }
</script>
