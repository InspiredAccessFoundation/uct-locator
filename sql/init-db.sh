#!/bin/bash
    set -e
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /var/sql/create-script.sql
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "developmentdb" -f /var/sql/dev.sql
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "productiondb" -f /var/sql/prod.sql