/**
 * Backend for the birthday wishlist.
 * Lives inside a Google Sheet (Extensions → Apps Script).
 *
 * Sheet columns (row 1 = headers, exactly these):
 *   id | name | link | image | note | reserved_by
 *
 * Only the sheet owner sees "reserved_by". Visitors just see "Reserved".
 */

function doGet(e) {
  const action = (e.parameter.action || "list");
  if (action === "reserve") return json(reserve(e.parameter.id, e.parameter.who));
  return json({ items: listItems() });
}

function sheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function listItems() {
  const rows = sheet().getDataRange().getValues();
  const head = rows.shift().map(String);
  const col = (n) => head.indexOf(n);
  return rows
    .filter(r => String(r[col("name")]).trim())
    .map(r => ({
      id: String(r[col("id")]),
      name: String(r[col("name")]),
      link: String(r[col("link")] || ""),
      image: String(r[col("image")] || ""),
      note: String(r[col("note")] || ""),
      reserved: String(r[col("reserved_by")] || "").trim() !== "",
    }));
}

function reserve(id, who) {
  who = String(who || "").trim().slice(0, 60);
  if (!id || !who) return { ok: false, error: "missing" };
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet();
    const rows = sh.getDataRange().getValues();
    const head = rows[0].map(String);
    const idCol = head.indexOf("id"), rCol = head.indexOf("reserved_by");
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][idCol]) === String(id)) {
        if (String(rows[i][rCol]).trim()) return { ok: false, error: "taken" };
        sh.getRange(i + 1, rCol + 1).setValue(who + " · " + new Date().toLocaleString());
        return { ok: true };
      }
    }
    return { ok: false, error: "not_found" };
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
