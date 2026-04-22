#!/bin/bash

# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private

# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI="postgresql://buff_bugger_db_user:WbLGXocZSs6tTMJoAwBJKOhtWJvAslj6@dpg-d7jqnn77f7vs73e08ckg-a.virginia-postgres.render.com/buff_bugger_db"

# Execute each .sql file in the directory
for file in init_data/*.sql; do
    echo "Executing $file..."
    psql $PG_URI -f "$file"
done