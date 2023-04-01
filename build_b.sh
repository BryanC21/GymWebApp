#!/usr/bin/env bash node
#!/bin/bash -x

cd ./backend/

npm i 
node database/create_db.js drop #or remove drop to keep the database
node index.js

