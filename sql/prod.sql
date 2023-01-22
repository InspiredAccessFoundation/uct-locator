----------------------------------
----------------------------------
------ PRODUCTION -----
----------------------------------
----------------------------------
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-- Make sure to connect to the db before running the next parts
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
--/connect productiondb
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