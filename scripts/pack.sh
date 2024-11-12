#!/bin/bash

cd "resources/$1" || exit
mkdir -p "./temp/$1"
cp ./{fxmanifest.lua,README.md} "./temp/$1"

if compgen -G ./*.lua; then
    cp ./*.lua "./temp/$1"
else
    echo "No lua files found to pack"
fi

if [ -d "./dist" ]; then
    cp -r ./dist "./temp/$1"
else
    echo "No dist folder found to pack"
fi

cd ./temp && zip -r "../$1.zip" "./$1"
cd .. && rm -rf ./temp
