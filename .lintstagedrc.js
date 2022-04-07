export default {
    "*.{js,ts,tsx}": [
        "eslint --fix"
    ],
    "*.{json,css,html}": [
        "prettier --write"
    ],
    "*.md": [
        "prettier --write --tab-width 2"
    ],
    "{frontend,types}/**/*.{ts,tsx}": [
        () => "tsc --noEmit --project ./frontend/tsconfig.json",
    ],
    "{backend,types}/**/*.ts": [
        () => "tsc --noEmit --project ./backend/tsconfig.json",
    ],
}
