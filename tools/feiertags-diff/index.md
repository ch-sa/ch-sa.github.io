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

<script src="script.js"></script>