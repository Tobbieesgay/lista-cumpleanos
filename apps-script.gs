/**
 * Backend for the birthday wishlist — it only stores reservations.
 * The gifts themselves live in index.html (GIFTS).
 *
 * Lives inside an empty Google Sheet (Extensions → Apps Script).
 * The sheet fills itself: id | reserved_by | date
 * Only the sheet owner sees who reserved. Visitors just see "Apartado ✓".
 */

function doGet(e) {
  const action = e.parameter.action || "list";
  if (action === "reserve") return json(reserve(e.parameter.id, e.parameter.who));
  return json({ reserved: reservedIds() });
}

function sheet() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(["id", "reserved_by", "date"]);
  return sh;
}

function reservedIds() {
  const rows = sheet().getDataRange().getValues().slice(1);
  return rows.map(r => String(r[0]).trim()).filter(Boolean);
}

function reserve(id, who) {
  id = String(id || "").trim().slice(0, 100);
  who = String(who || "").trim().slice(0, 60);
  if (!id || !who) return { ok: false, error: "missing" };
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (reservedIds().indexOf(id) !== -1) return { ok: false, error: "taken" };
    sheet().appendRow([id, who, new Date()]);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
