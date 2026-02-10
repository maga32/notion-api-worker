#!/bin/bash
set -e

rm -rf node_modules
npm install
npm run build
nohup node build/server.js > /dev/null 2>&1 &