1.This is demo module for login/logout and associate DB management in the studentVote App.
2.The DB which is used is mysql databse, when APP is loaded, the app will create a database "test1" ,and a new table "costumer" will be created.
3.there is no password for my database.
4.Before running the app,please install Mysql database and associated modules for nodes, such as express, mysql2...etc.
5.The App is focus on the login/logout and database management, so UI parts is in simple.
6.When users login, the app will direct users to different page according to their Identification,such as administrator or regular user.
7.Every user in the table will have a attribute "code" which will be used for his identity.
8.The app has set sessions for different users after their login, the system will remember it and direct it for the following procedure.
  So users do not need to login again before they logout.
