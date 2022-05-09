"use strict";
const express = require('express');
const session = require("express-session");
const app = express();
const fs = require("fs");
const mysql = require('mysql2');

app.use("/img", express.static("./img"));
app.use("/css", express.static("./css"));
app.use("/js", express.static("./js"));


app.use(session({
  secret: "secret words",
  name: "wazaSessionID",
  resave: false,
  saveUninitialized: true
}));

app.get("/", function (req, res) {
  if (req.session.loggedIn) {
    res.redirect("/profile");
  } else {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      multipleStatements: true
    });
    const createDBAndTables = `CREATE DATABASE IF NOT EXISTS test1;
        use test1;
        CREATE TABLE IF NOT EXISTS BBY_04_USER (
        ID int NOT NULL AUTO_INCREMENT,
        email varchar(30),
        password varchar(30),
        code varchar(30),
        PRIMARY KEY (ID));`;
    connection.connect();
    connection.query(createDBAndTables, function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      console.log(results);
    });
    connection.end();
    let doc = fs.readFileSync('./landingpage.html', "utf8");
    res.send(doc);
  }
});

app.get("/profile", function (req, res) {
  if (req.session.loggedIn) {
    let doc1 = fs.readFileSync('./dashboard.html', "utf8");
    let doc2 = fs.readFileSync('./home.html', "utf8");
    if (req.session.code == "123")
      res.send(doc1);
    else
      res.send(doc2);

  } else {
    res.redirect("/");
  }

});

app.get("/nav", function(req,res){
  let doc = fs.readFileSync("./common/nav.html", "utf-8");
  res.send(doc);
})

app.get("/admin-table", function (req, res) {

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "test1"
    });
    let myResults = null;
    connection.connect();
    connection.query(
        "SELECT * FROM BBY_04_USER where code != 123",
        function (error, results, fields) {
            myResults = results;
            if (error) {
                console.log(error);
            }
            let table = "<table><tr><th>User</th></tr>";
            for (let i = 0; i < results.length; i++) {
                table += "<tr><td>" + results[i].email + "</td></tr>";
            }
            table += "</table>";
            res.send(table);
            connection.end();
        }
    );

});


app.get("/createuser", function (req, res) {
  if (req.session.loggedIn) {
    let doc1 = fs.readFileSync('./dashboard.html', "utf8");
    let doc2 = fs.readFileSync('./home.html', "utf8");

    if (req.session.code == "123")
      res.send(doc1);
    else
      res.send(doc2);

  } else {
    let doc = fs.readFileSync('./signup.html', "utf8");
    res.send(doc);
  }

});

app.get("/login_landing", function (req, res) {
  if (req.session.loggedIn) {
    let doc1 = fs.readFileSync('./dashboard.html', "utf8");
    let doc2 = fs.readFileSync('./home.html', "utf8");
    if (req.session.code == "123")
      res.send(doc1);
    else
      res.send(doc2);
  } else {
    let doc = fs.readFileSync('./login.html', "utf8");
    res.send(doc);
  }

});


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/add-customer', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log("password", req.body.password);
  console.log("Email", req.body.email);
  console.log("code", req.body.code);

  let string = req.body.email;
  if (string.includes("@my.bcit.ca")) {

    let connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'test1'
    });
    connection.connect();
    connection.query('INSERT INTO BBY_04_USER (email, password,code) values (?, ?, ?)',
      [req.body.email, req.body.password, req.body.code],
      function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        res.send({
          status: "success",
          msg: "Record added."
        });

      });


    connection.end();
  } else {
    res.send({
      status: "fail",
      msg: "User email domain is not correct."
    });
  }
});

app.post("/login", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log("What was sent", req.body.email, req.body.password);
  let results = authenticate(req.body.email, req.body.password,
    function (userRecord) {

      if (userRecord == null) {
        res.send({
          status: "fail",
          msg: "User account not found/Password is not correct."
        });
      } else {
        req.session.loggedIn = true;
        req.session.email = userRecord.email;

        req.session.code = userRecord.code;
        req.session.save(function (err) {});
        res.send({
          status: "success",
          msg: "Logged in."
        });
      }
    });

});

app.get("/logout", function (req, res) {

  if (req.session) {
    req.session.destroy(function (error) {
      if (error) {
        res.status(400).send("Unable to log out")
      } else {

        res.redirect("/");
      }
    });
  }
});




function authenticate(email, password, callback) {
  const mysql = require("mysql2");
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test1"
  });
  connection.connect();
  connection.query(
    "SELECT * FROM BBY_04_USER WHERE email = ? AND password = ?", [email, password],
    function (error, results, fields) {

      console.log("Results from DB", results);

      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return callback(results[0]);
      } else {
        return callback(null);
      }

    }
  );

}

let port = 8000;
app.listen(port, function () {
  console.log('StudentVote app listening on port ' + port + '!');
})