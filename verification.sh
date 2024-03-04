#!/usr/bin/env bash
tar -xzvf website.tar.gz
npx http-server website > access.log &
npm run main -- -u http://localhost:8080/kayako.com

