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
        INSERT INTO BBY04_user (email, password,code) values ("sumit@my.bcit.ca", "123", "123");
        INSERT INTO BBY04_user (email, password,code) values ("eugene@my.bcit.ca", "333", "");

