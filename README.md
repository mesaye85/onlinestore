# Online Store

A two-page jQuery storefront: a catalog page that loads products from an API and an admin page with a form to register new ones.

## Context

I committed this in September 2020 (commit message "Competency Report"), early in learning web development. It is a later version of code I first uploaded in August 2020 to a separate online-store repository, with search and category filter buttons added. I removed that copy in 2026; its one later fix, the stylesheet link in `index.html`, is applied here.

## Stack

- HTML, CSS, jQuery 3.5.1
- Bootstrap 4.5.2 and Popper.js 1.16.1 from CDNs
- A shared practice API at `http://restclass.azurewebsites.net/api/points` for storing and reading products (each item is tagged with `user: "Mesaye"`)

## Running it

Open `index.html` (catalog) or `admin.html` (register a product) in a browser. There is no build step. Both pages depend on the practice API above, which I don't control and which may no longer be online; without it the catalog stays empty. The script errors listed below also stop parts of both pages from working.

## Status

Archived. Not maintained.

## Known gaps

- `index.html` line 9 had `rel="stylysheet"`, so `css/catalog.css` never loaded. That's fixed now; the CSS is unchanged.
- The search input is `id="txt-seatch"` (`index.html` line 30) but `js/catalog.js` line 123 reads `#txt-search`, so search throws. The loop in `search()` (lines 112-116) has no braces and only checks the last item.
- `js/admin.js` declares `init` and `clearForm` inside `register()` (lines 60-71), so `window.onload = init` (line 108) fails and the Register button is never wired up. Even if it were, the POST sends `item` before it is created (line 34 vs line 53).
- Field name mismatch: the admin form saves `image` (`js/admin.js` line 18) and the catalog reads `item.img` (`js/catalog.js` line 79).
- Product data from the shared API is inserted as raw HTML (`js/catalog.js` lines 77-86 and 92-101), so anyone who can write to that API can inject markup or script. The template also has stray quotes that produce broken HTML.
- Dead code: `displayCatagories()` (`js/catalog.js` lines 54-71) and the `ListStore` object (`js/admin.js` lines 74-105) reference variables that don't exist and are never called.
- The success alert toggles a `hidden` class, but the HTML and CSS use `hiddin` (`admin.html` line 61, `css/admin.css` line 1). `clearForm()` uses selectors without `#` (`js/admin.js` lines 61-65).
- The category buttons and boxes in `index.html` (lines 41-61) are placeholder content (Cat, Dog, Melon, ...) unrelated to the products.
- Accessibility: catalog images have no `alt`; `admin.html` labels use `for="Price"` and `for="Catagory"` while the inputs are lowercase (lines 47, 50); the nav has unclosed `<li>`/`<a>` tags (`index.html` lines 24-27).
- The API URL is hardcoded in four places and uses plain HTTP. No tests. "Catagory" is misspelled throughout.

## What I'd do differently now

- Keep one repo per project with its full history instead of two copies.
- Build DOM nodes with `textContent` instead of HTML strings, and validate input on both sides.
- Put the API base URL in one config value and show an error when it is unreachable.
