# gees

Galactic Era Enhancement Suite

## Installation

### Script manager

- Install [TamperMonkey](http://tampermonkey.net) or [ViolentMonkey](https://violentmonkey.github.io/get-it) for your browser
- Go to the [install script](https://github.com/jarekb84/gees/raw/master/install/gees.user.js)
- Your script manager should prompt you to install script
- Once installed, refresh page
- You can configure your script manager to check for updates

## Development

### Setup

- Install [node.js](https://nodejs.org/en) and [yarn](https://yarnpkg.com/en/)
- Clone this repo and cd into it
- Run `yarn install`

### Dev

- Run `set HTTPS=true&&yarn start`
  - sets up a local dev server
  - runs under https to allow fetching of local js bundle and loading it into aall.space
- Go to your browser of choice and run the script from /scripts/localDev.js in the console
  - this will emebed the local js file into the game and let you debug using dev tools
- Each time you make a change to the js code, rerun the above scrip in console

### Publishing release

- Update package.json and README.md
- Run `yarn build-gees`
- Commit and push to github

## Relese Notes

**2018-07-03 v0.4.3**

- Added task name and output quantity to hover
- Added more console output to help debug idle planet issues

**2018-07-01 v0.4.2**

- Still seeing issues with idle flagging
  - added delay before asking for data
  - now accounts for tasks that have just completed
  - added more console output to help debug

**2018-07-01 v0.4.1**

- Fixed incorrectly flagging planet as idle

**2018-07-01 v0.4.0**

- Fixed issue with incorrectly flagged idle planets
- Added info on when all planets will go idle
- Added improved development workflow notes to readme

**2018-06-29 v0.3.0**

- Added idle planet detector
- Buttons now turn yellow when fetching or sending data
- Buttons only displayed after user is logged in

**2018-06-25 v0.2.0**

- Fetch all depot assets before exporting to GS

**2018-06-24 v0.1.0**

- Initial version
- Added export legion missions button
- Added export legion assets button
