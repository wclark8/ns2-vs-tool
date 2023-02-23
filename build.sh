#!/bin/bash
echo "getting service dependencies"
#npm i
echo "building webapp"
cd ./src/web/ns2panel-scraper-web
#npm i
echo "INSTALLING NODE DEPENDENCIES IS CURRENTLY DISABLED TO AVOID WORKAROUNDS REGARDING HAVING TO UPLOAD NODE_MODULES PIECEMEAL"
npm run buildLinux