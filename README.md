# Fixidity

A fork of [fluidity](https://github.com/PrettyCoffee/fluidity) — an accordion-based browser startpage.

Fixidity keeps all the original features (custom themes, link groups, search engine settings) and adds bug fixes, new features, and config portability.

## Live Demo

[howdeploy.github.io/fixidity](https://howdeploy.github.io/fixidity/)

## What's Changed

### Bug Fixes
- **Google logo** — fixed white square caused by Vite data URI inlining breaking CSS `mask-image`
- **Theme dropdown** — fixed infinite re-render loop that caused the dropdown to shake instead of opening
- **CSS animations** — fixed `from/from` typo in wave and box-flicker keyframes
- **ColorPicker** — fixed stale state when switching between themes
- **Accordion width** — added ResizeObserver for correct content width on window resize
- **Search encoding** — queries are now properly URL-encoded
- **Theme removal** — fixed stale state bug when deleting custom themes
- **Settings textarea** — syncs correctly when switching between link groups

### New Features
- **Recent sites** — a "Recent" column tracks the last 5 sites visited from the startpage
- **Configurable Recent title** — the column name can be overridden via config import (e.g. set to your language)
- **Config import/export** — back up and restore all settings as a JSON file

## Usage

1. Install a New Tab Override extension ([Chrome](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/))
2. Set `https://howdeploy.github.io/fixidity/` as your new tab URL

## Config

All settings are stored in browser `localStorage`. Use **Export / Import** in Settings to back up or transfer your setup.

The config JSON supports these keys:

| Key | Description |
|-----|-------------|
| `link-groups` | Link groups with titles and URLs |
| `search-settings` | Search engine URL and fast forward aliases |
| `design` | Active theme |
| `themes` | Custom themes list |
| `recent-title` | Display name for the Recent column (default: "Recent") |

## Local Setup

```bash
git clone https://github.com/howdeploy/fixidity.git
cd fixidity
npm install
npm run start    # dev server at http://localhost:5173
npm run build    # production build in /dist/
```

## Credits

- Original project: [fluidity](https://github.com/PrettyCoffee/fluidity) by [PrettyCoffee](https://github.com/PrettyCoffee)
- Icons: [FontAwesome](https://fontawesome.com/icons)
- Illustrations: [DeathAndMilk](https://www.instagram.com/deathandmilk_/)
