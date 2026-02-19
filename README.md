# Fixidity

A fork of [fluidity](https://github.com/PrettyCoffee/fluidity) — an accordion-based browser startpage.

Fixidity keeps all the original features (custom themes, link groups, search engine settings) and adds config portability so your settings survive domain changes.

## Live Demo

[howdeploy.github.io/fixidity](https://howdeploy.github.io/fixidity/)

## Usage

1. Install a New Tab Override extension ([Chrome](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/))
2. Set `https://howdeploy.github.io/fixidity/` as your new tab URL

## Import / Export Config

All settings (links, themes, active design, search engine) are stored in browser localStorage, which is tied to the domain. If the domain changes, settings are lost.

Fixidity adds **Export Config** and **Import Config** buttons in Settings:

- **Export** — saves all your settings to a `fixidity-config.json` file
- **Import** — restores settings from a previously exported JSON file and reloads the page

This lets you back up your setup or transfer it between browsers and domains.

## Local Setup

1. Clone the repository
2. `npm install`
3. `npm run start` — opens at `http://localhost:5173`
4. `npm run build` — production build in `/dist/`

## Credits

- Original project: [fluidity](https://github.com/PrettyCoffee/fluidity) by [PrettyCoffee](https://github.com/PrettyCoffee)
- Icons: [FontAwesome](https://fontawesome.com/icons)
- Illustrations: [DeathAndMilk](https://www.instagram.com/deathandmilk_/)
