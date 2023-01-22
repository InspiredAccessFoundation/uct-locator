----------------------------------
----------------------------------
------ DEVELOPMENT -----
----------------------------------
----------------------------------
-- Create database and schema ---
CREATE DATABASE developmentdb;
-- Revoke privileges from 'public' role
REVOKE CREATE ON SCHEMA public
FROM PUBLIC;
REVOKE ALL ON DATABASE developmentdb
FROM PUBLIC;
-- Read-only role
CREATE ROLE readonly;
GRANT CONNECT ON DATABASE developmentdb TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO readonly;
-- Read/write role
CREATE ROLE readwrite;
GRANT CONNECT ON DATABASE developmentdb TO readwrite;
GRANT USAGE,
    CREATE ON SCHEMA public TO readwrite;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON ALL TABLES IN SCHEMA public TO readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON TABLES TO readwrite;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE ON SEQUENCES TO readwrite;
-- Users creation
CREATE USER developmentuser WITH PASSWORD 'real-dev-password-here';
-- Grant privileges to users
GRANT readwrite TO developmentuser;
----------------------------------
----------------------------------
------ PRODUCTION -----
----------------------------------
----------------------------------
-- Create database and schema ---
CREATE DATABASE productiondb;
-- Revoke privileges from 'public' role
REVOKE ALL ON DATABASE productiondb
FROM PUBLIC;
-- Read-only role
CREATE ROLE prod_readonly;
GRANT CONNECT ON DATABASE productiondb TO prod_readonly;
GRANT USAGE ON SCHEMA public TO prod_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO prod_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO prod_readonly;
-- Read/write role
CREATE ROLE prod_readwrite;
GRANT CONNECT ON DATABASE productiondb TO prod_readwrite;
GRANT USAGE,
    CREATE ON SCHEMA public TO prod_readwrite;
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON ALL TABLES IN SCHEMA public TO prod_readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON TABLES TO prod_readwrite;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO prod_readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE ON SEQUENCES TO prod_readwrite;
-- Users creation
CREATE USER productionuser WITH PASSWORD 'real-prod-password-here';
-- Grant privileges to users
GRANT prod_readwrite TO productionuser;