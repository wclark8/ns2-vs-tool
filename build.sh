#!/bin/bash
echo "getting service dependencies"
npm i
echo "building webapp"
cd ./src/web/ns2panel-scraper-web
npm i
npm run buildLinux