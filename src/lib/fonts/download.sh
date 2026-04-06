#!/bin/bash

rm -rf ./geist && mkdir -p ./geist
wget -q -P ./geist https://cdn.jsdelivr.net/npm/geist@1.7.0/LICENSE.txt
wget -q -P ./geist https://cdn.jsdelivr.net/npm/geist@1.7.0/dist/fonts/geist-sans/Geist-Variable.woff2
wget -q -P ./geist https://cdn.jsdelivr.net/npm/geist@1.7.0/dist/fonts/geist-mono/GeistMono-Variable.woff2
