CREATE DATABASE IF NOT EXISTS COMP2800;
use COMP2800;
CREATE TABLE IF NOT EXISTS bby04_event (
ID int NOT NULL AUTO_INCREMENT,
InstituteName varchar(30),
EventName varchar(30),
StartDate  DATE,
EndDate    DATE,
Description  longtext,
PRIMARY KEY (ID));
INSERT INTO bby04_event (InstituteName,EventName,StartDate,EndDate,Description) values ("BCIT", "VOTING_TEST", "2022-05-10","2022-06-05","FOR TESTING");