---
title: Feiertags Diff
css: style.css
js: script.js
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

<p class="disclaimer">Co-Created with some ✨, not yet optimized for mobile!</p>