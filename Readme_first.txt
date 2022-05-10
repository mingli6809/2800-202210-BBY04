1.This is the project demo module for login/logout and associate DB management in the studentVote App.
2.The DB which is used is mysql databse, when APP is loaded, the app will create a database "test1" ,and a new table "costumer" will be created.
3.The pass word for local host of DB is set to null which can be changed according to developer's local DB setting.
4.Before running the app,please install Mysql database and associated modules for nodes, such as express, mysql2...etc.
5.The App is focus on the login/logout and database management.
6.When users login, the app will direct users to different page according to their Identification,such as administrator or regular user.
7.Every user in the table will have a attribute "code" which will be used for his identity.
8.The app has set sessions for different users after their login, the system will remember it and direct it for the following procedure.
9.As for signup , the App limit users with email domain @my.bcit.ca at present which can be changed later.
