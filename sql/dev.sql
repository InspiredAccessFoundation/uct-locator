----------------------------------
----------------------------------
------ DEVELOPMENT -----
----------------------------------
----------------------------------
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-- Make sure to connect to the db before running the next parts
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
--/connect developmentdb
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
GRANT USAGE ON SCHEMA public TO readwrite;
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