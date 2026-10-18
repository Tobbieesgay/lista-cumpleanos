# 🎂 Birthday Wishlist

A one-page wishlist (in Spanish) hosted free on GitHub Pages. Friends tap **Apartar** (Reserve) on a gift, and everyone else then sees it as **Apartado ✓**, so nobody buys the same thing twice.

## How it works

- `index.html` — the page friends visit. **Your gifts are listed inside it**, in `GIFTS`.
- `apps-script.gs` — a tiny backend in a Google Sheet that only remembers which gifts are reserved and by whom. The sheet fills itself; you never edit it.
- Visitors only see "Apartado ✓". Who reserved it is in the sheet, which only you can see (or don't look, to keep the surprise!).

## Setup (≈5 minutes)

### 1. Add the reservation backend
1. Create a new, **empty** Google Sheet.
2. **Extensions → Apps Script**, delete the sample code, paste in everything from `apps-script.gs`, and save.
3. **Deploy → New deployment →** type **Web app**. Execute as: **Me**. Who has access: **Anyone**.
4. Authorize when asked, then copy the **Web app URL**.

### 2. Connect the page
In `index.html`, find `CONFIG` and paste the URL into `apiUrl`.

### 3. Turn on GitHub Pages
Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
Your link will be `https://<your-username>.github.io/<repo-name>/`.

## Everyday use
- **Add a gift:** add a line to `GIFTS` in `index.html` with a new unique `id` (or just send Claude the link).
- **Un-reserve a gift:** delete its row in the Google Sheet.
- **Changed the script?** Deploy → Manage deployments → edit → New version (the URL stays the same).

Until `apiUrl` is set, reservations only last until the page is refreshed — handy for previewing.
