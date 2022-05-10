## StudentVote

* [General Info] (#general-info)
* [Developers] (#developers)
* [Contents] (#contents)

## General Info
StudentVote is an app made by students, for students, to be able to vote for what we feel is important.
This webapp is written with HTML, JS, and CSS, running off of NodeJS and it's modules: mysql2, express, and express-sessions.

## Developers
StudentVote is written with care by Team BBY04:
* Eugene Jeong 1C
* Sumit Khanduri 1C
* Ming Li 2C
* Dalibor Cavlovic 2C

## Contents
Contents of the project folder are:

'''
Top level of project folder:
├── .vscode                         # Settings for VSCode
├── common                          # Folder for common files
├── css                             # Folder for css
├── img                             # Folder for images
├── js                              # Folder for js
├── .gitattributes                  # Folder for git
├── .gitignore                      # Git ignore files
├── Readme.md                       # Readme file
├── app.js                          # Primary JS file
├── dashboard.html                  # HTML dashboard for admins
├── database.sql                    # SQL database
├── home.html                       # HTML homepage for users
├── landingpage.html                # HTML landing page for users and admins
├── login.html                      # HTML login page for users and admins
├── signup.html                     # HTML signup page for users and admins

It has the following subfolders and files:
├── common                          # Folder for common files
    ├── nav.html                        # HTML navbar
├── css                             # Folder for css
    ├── dashboardStyle.css              # Style for dashboard.html
    ├── landingPage.css                 # Style for landingpage.html
    ├── login.css                       # Style for login.html
    ├── signup.css                      # Style for signup.html
    ├── styleHome.css                   # Style for home.html
├── img                             # Folder for images
    ├── Contact.svg                     # Image for "Email" icon
    ├── Key.svg                         # Image for "Admin Code" icon
    ├── Pass.svg                        # Image for "Password" icon
    ├── StudentVote.png                 # Image for logo
    ├── StudentVoterLogoResized.png     # Image for resized logo
    ├── close.png                       # Image for "Close" icon
    ├── contact.png                     # Image for "Contact Us" icon
    ├── download.png                    # Image of hand holding loudspeaker
    ├── hamburger.png                   # Image for hamburger menu
    ├── home.png                        # Image for "Home" icon
    ├── images.png                      # Image of ballot box
    ├── power.png                       # Image for "Logout" icon
    ├── settings.png                    # Image for "Settings" icon
    ├── vote.png                        # Image for "Past Votes" icon
    ├── voting-box.png                  # Image for favicon
    ├── voting.jpg                      # Image of someone voting
├── js                              # Folder for js
    ├── dashboard.js                    # JS for dashboard.html
    ├── home.js                         # JS for home.html
    ├── landingPage.js                  # JS for landingpage.html
    ├── login.js                        # JS for login.html
    ├── signup.js                       # JS for signup.html
































1.This is the project demo module for login/logout and associate DB management in the studentVote App.

2.The DB which is used is mysql databse, when APP is loaded, the app will create a database 
            "test1" ,and a new table "costumer" will be created.

3.The pass word for local host of DB is set to null which can be changed according to developer's local DB setting.

4.Before running the app,please install Mysql database and associated modules for nodes, such as express, mysql2...etc.

5.The App is focus on the login/logout and database management.

6.When users login, the app will direct users to different page according to their Identification,
            such as administrator or regular user.
7.Every user in the table will have a attribute "code" which will be used for his identity.

8.The app has set sessions for different users after their login, the system will remember it and 
            direct it for the following procedure.

9.As for signup , the App limit users with email domain @my.bcit.ca/regular emails at present.
            this will be later changed to only university/school email domains.

