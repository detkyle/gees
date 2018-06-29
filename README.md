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

- Install [node.js](https://nodejs.org/en) and [yarn](https://yarnpkg.com/en/)
- Clone this repo and cd into it
- Run `yarn install`
- You can run `yarn start` to setup a local dev server
  - This will run the app, but will only partially work since it's missing game assets the script depends on
  - Mainly use this to verify your code complies without errors
- Make any changes you want and run `yarn build-gees`
- Copy the updated contents of `./install/gees.user.js`
- Create a new local script in TamperMonkey or ViolentMonkey
- Paste the updated code, save, and refresh page

## Relese Notes

**2018-06-25 v0.2.0**

- Fetch all depot assets before exporting to GS

**2018-06-24 v0.1.0**

- Initial version
- Added export legion missions button
- Added export legion assets button
