CREATE DATABASE IF NOT EXISTS COMP2800;
use COMP2800;
CREATE TABLE IF NOT EXISTS bby04VoteResult (
EVENTID int NOT NULL ,
USERID  INT NOT NULL,
Result INT,
PRIMARY KEY (EVENTID,USERID),
FOREIGN KEY(EVENTID) REFERENCES bby_04_event(ID)
ON DELETE CASCADE,
FOREIGN KEY(USERID)  REFERENCES bby_04_user(ID)
ON DELETE CASCADE
);