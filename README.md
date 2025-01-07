To start npm, use fnm:

`fnm env --use-on-cd | Out-String | Invoke-Expression`



make sure you have install http-server:

npx http-server -v

if not:

npm install -g http-server

then:

npm run local
