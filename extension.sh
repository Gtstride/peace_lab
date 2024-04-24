#!/usr/bin/env bash

#NOTE: if you are on macOS, update to bash v4 i.e brew install bash

rm -rf extension extension.zip
cp -r public extension 
cd extension
 
declare -A scripts0=(
    [file]='flowbite'
    [url]='https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js'
)
declare -A scripts1=(
    [file]='dialogflow/bootstrap'
    [url]='https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1'
)
declare -A scripts2=(
   [file]='myscript'
   [url]='./script.js'
)

declare -n scripts
for scripts  in ${!scripts@}; do
  curl ${scripts[url]} -o ${scripts[file]}
  sed -i"" -e "s|${scripts[url]}|${scripts[file]}|g" index.html
done

zip -r extension.zip *
mv extension.zip ../