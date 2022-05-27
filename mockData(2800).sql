CREATE DATABASE IF NOT EXISTS COMP2800;
use COMP2800;
CREATE TABLE IF NOT EXISTS BBY04_user (
					ID int NOT NULL AUTO_INCREMENT,
					email varchar(30),
					password varchar(30),
					code varchar(30),
					PRIMARY KEY (ID));
CREATE TABLE IF NOT EXISTS BBY04_events (
          ID int NOT NULL AUTO_INCREMENT,
          InstituteName varchar(30),
          EventName varchar(30),
          StartDate  DATE,
          EndDate    DATE,
          Description  longtext,
          ImagePath varChar(50),
          PRIMARY KEY (ID));
					
CREATE TABLE IF NOT EXISTS BBY04_VoteResult (
          EVENTID int NOT NULL ,
          USERID  INT NOT NULL,
          Result INT,
          PRIMARY KEY (EVENTID,USERID),
          FOREIGN KEY(EVENTID) REFERENCES bby04_events(ID)
          ON DELETE CASCADE,
          FOREIGN KEY(USERID)  REFERENCES bby04_user(ID)
          ON DELETE CASCADE
          ); 
INSERT IGNORE INTO BBY04_user (ID,email, password,code) values (1,"admin@my.bcit.ca", "333", "123");       
INSERT INTO BBY04_user (email, password,code) values ("mingli6809@my.bcit.ca", "333", "123");
INSERT INTO BBY04_user (email, password,code) values ("melody@my.bcit.ca", "333", null);
INSERT INTO BBY04_user (email, password,code) values ("sylvie@my.bcit.ca", "333", "123");
INSERT INTO BBY04_user (email, password,code) values ("tom@my.bcit.ca", "333", "456");				
INSERT INTO BBY04_events (InstituteName, EventName,StartDate,EndDate,Description,ImagePath) values ("BCIT", "TEST1","2022-05-01","2022-05-07","TEST1","img\\event1653626107519.png");
INSERT INTO BBY04_events (InstituteName, EventName,StartDate,EndDate,Description,ImagePath) values ("BCIT", "TEST2","2022-05-10","2022-05-20","TEST2","img\\event1653626135069.png");
INSERT INTO BBY04_events (InstituteName, EventName,StartDate,EndDate,Description,ImagePath) values ("BCIT", "TEST3","2022-05-21","2022-05-30","TEST3","img\\event1653626164318.png");