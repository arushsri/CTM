CREATE DATABASE asmp_db;
CREATE USER asmp_user WITH PASSWORD 'arush';
ALTER ROLE asmp_user SET client_encoding TO 'utf8';
ALTER ROLE asmp_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE asmp_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE asmp_db TO asmp_user;