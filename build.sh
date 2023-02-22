#!/bin/bash
echo "getting service dependencies"
npm i
echo "building webapp"
cd ns2panel-scraper/src/web/ns2panel-scraper-web
npm i
npm run buildLinux