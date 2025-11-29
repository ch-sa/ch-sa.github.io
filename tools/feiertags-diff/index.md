---
title: Feiertags Diff
css: style.css
js: script.js
---

<div class="form-container">
  <div class="form-group">
    <label for="year" class="form-label">Year:</label>
    <select id="year" class="dropdown-select" name="year" onchange="compareHolidays()">
      <!-- Year options will be dynamically populated -->
    </select>
  </div>

  <div class="form-group">
    <label for="base-state" class="form-label">Current:</label>
    <select id="base-state" class="dropdown-select" name="base-state" onchange="compareHolidays()">
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
      <div class="checkbox-chip">
        <input type="checkbox" id="state-baden-wuerttemberg" name="compare-state" value="Baden-Württemberg" onchange="compareHolidays()">
        <label for="state-baden-wuerttemberg">Baden-Württemberg</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-bayern" name="compare-state" value="Bayern" onchange="compareHolidays()">
        <label for="state-bayern">Bayern</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-berlin" name="compare-state" value="Berlin" onchange="compareHolidays()">
        <label for="state-berlin">Berlin</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-brandenburg" name="compare-state" value="Brandenburg" onchange="compareHolidays()">
        <label for="state-brandenburg">Brandenburg</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-bremen" name="compare-state" value="Bremen" onchange="compareHolidays()">
        <label for="state-bremen">Bremen</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-hamburg" name="compare-state" value="Hamburg" onchange="compareHolidays()">
        <label for="state-hamburg">Hamburg</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-hessen" name="compare-state" value="Hessen" onchange="compareHolidays()">
        <label for="state-hessen">Hessen</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-mecklenburg-vorpommern" name="compare-state" value="Mecklenburg-Vorpommern" onchange="compareHolidays()">
        <label for="state-mecklenburg-vorpommern">Mecklenburg-Vorpommern</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-niedersachsen" name="compare-state" value="Niedersachsen" onchange="compareHolidays()">
        <label for="state-niedersachsen">Niedersachsen</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-nordrhein-westfalen" name="compare-state" value="Nordrhein-Westfalen" onchange="compareHolidays()">
        <label for="state-nordrhein-westfalen">Nordrhein-Westfalen</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-rheinland-pfalz" name="compare-state" value="Rheinland-Pfalz" onchange="compareHolidays()">
        <label for="state-rheinland-pfalz">Rheinland-Pfalz</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-saarland" name="compare-state" value="Saarland" onchange="compareHolidays()">
        <label for="state-saarland">Saarland</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-sachsen" name="compare-state" value="Sachsen" onchange="compareHolidays()">
        <label for="state-sachsen">Sachsen</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-sachsen-anhalt" name="compare-state" value="Sachsen-Anhalt" onchange="compareHolidays()">
        <label for="state-sachsen-anhalt">Sachsen-Anhalt</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-schleswig-holstein" name="compare-state" value="Schleswig-Holstein" onchange="compareHolidays()">
        <label for="state-schleswig-holstein">Schleswig-Holstein</label>
      </div>
      <div class="checkbox-chip">
        <input type="checkbox" id="state-thueringen" name="compare-state" value="Thüringen" onchange="compareHolidays()">
        <label for="state-thueringen">Thüringen</label>
      </div>
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

<button id="download-ics" class="download-button">Export conflicts into calender (.ics)</button>

<p class="disclaimer">
  Co-Created with some ✨.
  Only considers state-level public holidays.
  Improve me <a href="https://github.com/ch-sa/ch-sa.github.io/tree/master/tools/feiertags-diff">on GitHub</a>!
</p>