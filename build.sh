#!/bin/bash
echo "getting service dependencies"
npm i
echo "building webapp"
cd ./src/web/ns2panel-scraper-web
npm i
npm run buildProd
mv build ../../
echo "build dir moved"