"use strict";
const express = require('express');
const session = require("express-session");
const app = express();
const fs = require("fs");
const mysql = require('mysql2');
const {
  JSDOM
} = require('jsdom');
const multer = require("multer");
app.use("/img", express.static("./img"));
app.use("/css", express.static("./css"));
app.use("/js", express.static("./js"));
app.use("/img1", express.static("./img1"));

app.use(session({
  secret: "spoopy",
  name: "StudentVote",
  resave: false,
  saveUninitialized: true
}));

let dbPass = '';
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./img")
  },
  filename: function (req, file, callback) {
    callback(null, "my" + req.session.userid + ".png");
  }
});
const upload = multer({
  storage: storage
});

app.post('/upload-images', upload.array("files"), function (req, res) {
  console.log(req.files);
  for (let i = 0; i < req.files.length; i++) {
    req.files[i].filename = req.files[i].originalname;
  }
});

app.get("/", function (req, res) {
  if (req.session.loggedIn) {
    res.redirect("/profile");
  } else {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: dbPass,
      multipleStatements: true
    });
    const createDBAndTables = `CREATE DATABASE IF NOT EXISTS test1;
        use test1;
        CREATE TABLE IF NOT EXISTS bby_04_user (
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

    });
    connection.end();
    let doc = fs.readFileSync('./landingpage.html', "utf8");
    res.send(doc);
  }
});
app.get("/adminUsers", function (req, res) {
  if (req.session.loggedIn && req.session.code == "123") {
    let doc = fs.readFileSync("./adminUsers.html", "utf-8");
    res.send(doc);
  } else {
    res.redirect("/");
  }

})

app.get("/profile", function (req, res) {
  if (req.session.loggedIn) {
    let doc1 = fs.readFileSync('./dashboard.html', "utf8");
    let doc2 = fs.readFileSync('./home.html', "utf8");
    let dom = new JSDOM(doc2);
    let n = req.session.userid;
    let name1 = "my" + n + ".png";
    let page = ' <img class = "avatar" src="img/' + name1 + '">';
    let page1 = ' <img class = "avatar" src="img/default.png">';

    const path = "./img/"+ name1;
    if (fs.existsSync(path))
      dom.window.document.querySelector("#im").innerHTML = page;
    else {
      dom.window.document.querySelector("#im").innerHTML = page1;
    }

    if (req.session.code == "123") 
      res.send(doc1);
    else
      res.send(dom.serialize());
  } else {
    res.redirect("/");
  }

});

app.get("/nav", function (req, res) {
  let doc = fs.readFileSync("./common/nav.html", "utf-8");
  res.send(doc);
});

app.get("/footer", function (req, res) {
  let doc = fs.readFileSync("./common/footer.html", "utf-8");
  res.send(doc);
});

app.get("/allUsers", function (req, res) {

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
    "SELECT * FROM BBY_04_USER",
    function (error, results, fields) {
      res.send(results);
    }
  );

});

app.get("/change_logo", function (req, res) {
  let doc = fs.readFileSync("./ProfilePage_icon.html", "utf-8");
  res.send(doc);
});

app.get("/userprofile", function (req, res) {
  if (req.session.loggedIn) {
    let doc2 = fs.readFileSync('./profilePage.html', "utf8");
    res.send(doc2);
  } else {
    res.redirect("/");
  }
});


app.get("/signup", function (req, res) {
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
app.get("/createUser", function(req,res){
  if(req.session.loggedIn && req.session.code == "123"){
    let doc = fs.readFileSync("./createUser.html", "utf-8");
    res.send(doc);
  } else {
    res.redirect("/");
  }
})

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
// for the create user admin page
app.post('/add-user', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let string = req.body.email;
  if (string.includes("@my.bcit.ca")) {

    let connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'test1'
    });
    connection.connect();
    connection.query('Select * from BBY_04_USER where email = ?',[req.body.email],function(error,result1s,fields){
      if(result1s.length == 0){
        connection.query('INSERT INTO BBY_04_USER (email, password,code) values (?, ?, ?)',
      [req.body.email, req.body.password, req.body.code],
      function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        res.send({
          status: "success",
          msg: "User Created"
        });

      });


    connection.end();
      } else {
        res.send({
          status:"fail",
          msg: "User already exists"
        })
      }
    })
    
  } else {
    res.send({
      status: "fail",
      msg: "User email domain is not correct. Use my.bcit.ca"
    });
  }
});

app.post('/add-user', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let string = req.body.email;
  if (string.includes("@my.bcit.ca")) {

    let connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: dbPass,
      database: 'test1'
    });
    connection.connect();
    connection.query('INSERT INTO bby_04_user (email, password,code) values (?, ?, ?)',
      [req.body.email, req.body.password, req.body.code],
      function (error, results, fields) {
        if (error) {
        }
        res.send({
          status: "success",
          msg: "User Created"
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
app.post("/updateUser", function(req,res){
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test1'
  });
  connection.connect();
  
  if(req.body.email.includes("@my.bcit.ca")){
    connection.query('UPDATE BBY_04_USER SET email = ? , password = ? WHERE ID = ?',
    [req.body.email, req.body.password, req.body.ID],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      res.send({
        status: "success",
        msg: "Record updated."
      });
      
    });
    connection.end();
  } else {
    res.send({
      status:"fail",
      msg:"User email domain is not correct. Use my.bcit.ca"
    })
  }
  
})

app.post("/delUser",function(req,res){
  if(req.body.email == req.session.email){
    res.send({
      status: "fail",
      msg: "Cannot Delete your own account"
    }); 
  } else{
    let connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'test1'
    });
    connection.connect();
    connection.query('DELETE FROM BBY_04_USER WHERE email = ?',
      [req.body.email],
      function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        res.send({
          status: "success",
          msg: "Record deleted."
        });
  
      });
  }
  
    
})

app.post("/login", function (req, res) {
  res.setHeader("Content-Type", "application/json");
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
        req.session.userid = userRecord.ID;
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
    "SELECT * FROM bby_04_user WHERE email = ? AND password = ?", [email, password],
    function (error, results, fields) {
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


app.post('/update-customer', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPass,
    database: 'test1'
  });
  connection.connect();
  connection.query('UPDATE bby_04_user SET email = ? , password=? WHERE ID = ?',
    [req.body.email, req.body.password, req.session.userid],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      res.send({
        status: "success",
        msg: "Recorded updated."
      });

    });
  connection.end();

});

let port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log('StudentVote app listening on port ' + port + '!');
})