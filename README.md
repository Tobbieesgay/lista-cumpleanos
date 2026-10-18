# 🎂 Birthday Wishlist

A one-page wishlist hosted free on GitHub Pages. Friends can tap **Apartar** (Reserve) on a gift so nobody buys the same thing twice. The list lives in a Google Sheet, so you can add or edit items from your phone without touching code.

## How it works

- `index.html` — the page friends visit (GitHub Pages).
- `apps-script.gs` — a tiny backend that runs inside your Google Sheet. It reads the items and records reservations.
- Visitors only see "Apartado ✓" (Reserved). Who reserved it is written in the sheet, so only you can see it (or don't look, to keep the surprise!).

## Setup (≈10 minutes)

### 1. Make the Google Sheet
1. Create a new Google Sheet.
2. In row 1, type these headers exactly: `id | name | link | image | note | reserved_by`
3. Add one gift per row (or import `regalos.csv` via File → Import to start with the gifts already saved). `id` can just be 1, 2, 3… `image` is an optional image URL. Leave `reserved_by` empty.

### 2. Add the backend
1. In the sheet: **Extensions → Apps Script**.
2. Delete the sample code, paste in everything from `apps-script.gs`, and save.
3. **Deploy → New deployment →** type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Authorize when asked, then copy the **Web app URL**.

### 3. Connect the page
1. Open `index.html`, find `CONFIG` near the bottom, and paste the URL into `apiUrl`.
2. Change `title` and `subtitle` if you like.

### 4. Turn on GitHub Pages
Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
Your link will be `https://<your-username>.github.io/<repo-name>/`.

## Everyday use
- **Add a gift:** add a row in the sheet. It shows up on refresh.
- **Un-reserve a gift:** clear its `reserved_by` cell.
- **Changed the script?** Deploy → Manage deployments → edit → New version (the URL stays the same).

Until `apiUrl` is set, the page shows the gifts listed in `SAMPLE` inside `index.html` so you can preview it.
