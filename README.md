# ns2-vs-tool

ns2-vs-tool compares two players winrates when playing against each other and with each other, on both sides, in NS2 public matches.

currently hosted: https://ns2-vs.azurewebsites.net/

(if it's not up, get in touch: Will#4799)
(if it's up but broken, i've probably ran out of credits on browserless - will from azure app service to azure vm at some point to solve the issue)

## Installation

The tool can be used without the frontend with playerids being provided via either cmd line or via the tools rest interface.

dependencies: node 16, npm

all steps assuming you're at the root of the project directory

### local frontend

```bash
npm i
ensure your .env NODE_ENV property is set to local
cd src\web\ns2panel-scraper-web
npm i
npm run build
cd to the root of the project dir
npm run start
```

(if you are on windows check the build directory does not have a trailing whitespace)

### cmdline

```bash
npm i
node ./src/index.js --env=localCmdLine --player1=27140047 --player2=112370
```

### rest

```bash
npm i
ensure your .env NODE_ENV property is set to local
npm run start
submit a POST to the /players endpoint with an array of two numerical player ids
```
