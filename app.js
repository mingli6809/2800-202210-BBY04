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
const {
  getEventListeners
} = require('events');
const req = require('express/lib/request');
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

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: "123456",
  database: "COMP2800",
  multipleStatements: true
});

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
    const createDBAndTables = `CREATE DATABASE IF NOT EXISTS COMP2800;
        use COMP2800;
        CREATE TABLE IF NOT EXISTS BBY04_user (
        ID int NOT NULL AUTO_INCREMENT,
        email varchar(30),
        password varchar(30),
        code varchar(30),
        PRIMARY KEY (ID));`;
    const createDBAndTables1 = `CREATE DATABASE IF NOT EXISTS COMP2800;
        use COMP2800;
        CREATE TABLE IF NOT EXISTS BBY04_Event (
        ID int NOT NULL AUTO_INCREMENT,
        InstituteName varchar(30),
        EventName varchar(30),
        StartDate  DATE,
        EndDate    DATE,
        Description  longtext,
        PRIMARY KEY (ID));`;
    const createDBAndTables2 = `CREATE DATABASE IF NOT EXISTS COMP2800;
        use COMP2800;
        CREATE TABLE IF NOT EXISTS BBY04_VoteResult (
        EVENTID int NOT NULL ,
        USERID  INT NOT NULL,
        Result INT,
        PRIMARY KEY (EVENTID,USERID),
        FOREIGN KEY(EVENTID) REFERENCES bby04_event(ID)
        ON DELETE CASCADE,
        FOREIGN KEY(USERID)  REFERENCES bby04_user(ID)
        ON DELETE CASCADE
        );`;
    connection.query(createDBAndTables, function (error, results, fields) {
      if (error) {
        console.log(error);
      }
    });
    connection.query(createDBAndTables1, function (error, results, fields) {
      if (error) {
        console.log(error);
      }
    });
    connection.query(createDBAndTables2, function (error, results, fields) {
      if (error) {
        console.log(error);
      }
    });

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

app.get("/CHECKIMG", function (req, res) {
  let n = req.query.eventid;
  let name1 = "event" + n + ".png";
  console.log(name1);
  const path = "./img/" + name1;
  if (fs.existsSync(path))
    res.send("1");
  else
    {res.send("0");
    console.log("101");}



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

    const path = "./img/" + name1;
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

  connection.query(
    "SELECT * FROM BBY04_user",
    function (error, results, fields) {
      res.send(results);
    }
  );

});

app.get("/allEvents", function (req, res) {

  connection.query(
    "SELECT * FROM BBY04_event",
    function (error, results, fields) {
      res.send(results);
    }
  );

});

app.get("/EVENTRESULT", function (req, res) {
  let a = req.session.userid;
  let b = req.query.eventid;
  connection.query("SELECT Result FROM  BBY04_VOTERESULT WHERE USERID = ? AND   EVENTID= ? ",
    [a, b],
    function (error, results, fields) {
      if (results != null) {
        res.send(results);
        console.log(results);
      } else
        res.send(3);
    });
})


app.get("/EVENTRESULT1", function (req, res) {
  let b = req.query.eventid;
  connection.query("SELECT count(*) AS count FROM  BBY04_VOTERESULT WHERE  EVENTID= ? ",
    [b],
    function (error, results, fields) {
      let string = results[0].count.toString();
      res.send(string);
    })

})

app.get("/EVENTRESULT2", function (req, res) {
  let b = req.query.eventid;
  connection.query("SELECT count(*) AS count FROM  BBY04_VOTERESULT WHERE Result=1 AND EVENTID= ? ",
    [b],
    function (error, results, fields) {
      let string = results[0].count.toString();
      res.send(string);
    })

})


app.get("/EVENTDES", function (req, res) {
  let b = req.query.eventid
  connection.query("SELECT Description FROM  BBY04_EVENT WHERE ID= ? ",
    [b],
    function (error, results, fields) {
      res.send(results);
    });
})


app.get("/updatevent", function (req, res) {
  let a = req.session.userid;
  let b = req.query.eventid
  connection.query("insert into BBY04_VOTERESULT values (?,?,?) ",
    [b, a, 1],
    function (error, results, fields) {
      res.send(results);
      console.log(results);
    });
})

app.get("/updatevent1", function (req, res) {
  let a = req.session.userid;
  let b = req.query.eventid
  connection.query("insert into BBY04_VOTERESULT values (?,?,?) ",
    [b, a, 0],
    function (error, results, fields) {
      res.send(results);

    });
})


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
app.get("/createUser", function (req, res) {
  if (req.session.loggedIn && req.session.code == "123") {
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
// for the create user admin page
app.post('/add-user', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let string = req.body.email;
  if (string.includes("@my.bcit.ca")) {

    connection.query('Select * from BBY04_user where email = ?', [req.body.email], function (error, result1s, fields) {
      if (result1s.length == 0) {
        connection.query('INSERT INTO BBY04_user (email, password,code) values (?, ?, ?)',
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



      } else {
        res.send({
          status: "fail",
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

// app.post('/add-user', function (req, res) {
//   res.setHeader('Content-Type', 'application/json');

//   let string = req.body.email;
//   if (string.includes("@my.bcit.ca")) {


//     connection.query('INSERT INTO BBY04_user (email, password,code) values (?, ?, ?)',
//       [req.body.email, req.body.password, req.body.code],
//       function (error, results, fields) {
//         if (error) {}
//         res.send({
//           status: "success",
//           msg: "User Created"
//         });

//       });



//   } else {
//     res.send({
//       status: "fail",
//       msg: "User email domain is not correct."
//     });
//   }
// });


app.post("/updateUser", function (req, res) {


  if (req.body.email.includes("@my.bcit.ca")) {
    connection.query('UPDATE BBY04_user SET email = ? , password = ? WHERE ID = ?',
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

  } else {
    res.send({
      status: "fail",
      msg: "User email domain is not correct. Use my.bcit.ca"
    })
  }

})




app.post("/delUser", function (req, res) {
  if (req.body.email == req.session.email) {
    res.send({
      status: "fail",
      msg: "Cannot Delete your own account"
    });
  } else {

    connection.query('DELETE FROM BBY04_user WHERE email = ?',
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
          msg: userRecord.ID,

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

  connection.query(
    "SELECT * FROM BBY04_user WHERE email = ? AND password = ?", [email, password],
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



app.listen(8000);