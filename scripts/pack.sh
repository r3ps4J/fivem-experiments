#!/bin/bash

cd "resources/$1" || exit
mkdir -p "./temp/$1"
cp ./{fxmanifest.lua,README.md} "./temp/$1"
cp ./*.lua "./temp/$1" || :
cp -r ./dist "./temp/$1" || :
cd ./temp && zip -r "../$1.zip" "./$1"
cd .. && rm -rf ./temp
