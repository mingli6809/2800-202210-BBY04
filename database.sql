CREATE DATABASE IF NOT EXISTS test1;
use test1;
CREATE TABLE IF NOT EXISTS customer (
ID int NOT NULL AUTO_INCREMENT,
email varchar(30),
password varchar(30),
code varchar(30),
PRIMARY KEY (ID));
INSERT INTO customer (email, password,code) values ("mingli6809@gmail.com", "333", "123");
INSERT INTO customer (email, password,code) values ("melody@gmail.com", "333", null);
INSERT INTO customer (email, password,code) values ("sylvie@gmail.com", "333", "123");
INSERT INTO customer (email, password,code) values ("tom@gmail.com", "333", "456");