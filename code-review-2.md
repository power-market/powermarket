## Issues / Waffle.io

- Consider using waffle.io
- Generally you want 1:1 issues:PRs

"homepage does not exist" <-- generally someone gets assigned to an issue

## Commit messages

- Look in 1706-FSA-NY library for Kate's Gist

"fix: removes dead code"

"feat: adds homepage" <-- you can track who added what

## Branch hygiene

- Master is your single source of truth
- Branches should be small nubs of features / small pieces
- You should be touching as few files as possible
- Entire team should pull from master at least 1-2x / day

## Dependencies

- Make sure 'react-side-bar' is a SAVED dependency in your package.json

## Front-end architecture

- Make sure your app.js(?) is actually app.jsx -- needs to push out JSX
- You have two Main.jsxes in two separate directories; consider naming ./components/main.jsx -> index.jsx

- consider a products reducer that maintains "selectedProduct" for SingleProduct, "filteredProducts" for filtered products, etc
- also consider an orders reducer that maintains "selectedOrder" for a single Order, etc
