CREATE DATABASE IF NOT EXISTS COMP2800;
use COMP2800;
CREATE TABLE IF NOT EXISTS BBY04_user (
ID int NOT NULL AUTO_INCREMENT,
email varchar(30),
password varchar(30),
code varchar(30),
PRIMARY KEY (ID));
INSERT INTO BBY-4-user (email, password,code) values ("mingli6809@my.bcit.ca", "333", "123");
INSERT INTO BBY-4-user (email, password,code) values ("melody@my.bcit.ca", "333", null);
INSERT INTO BBY-4-user (email, password,code) values ("sylvie@my.bcit.ca", "333", "123");
INSERT INTO BBY-4-user (email, password,code) values ("tom@my.bcit.ca", "333", "456");