@echo off
start cmd /k "cd server && node index.js"
start cmd /k "cd client && npm start"
start cmd /k "cd socket && node index.js"
