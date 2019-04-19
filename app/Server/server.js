var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("EncProj.db");
var bodyParser = require('body-parser');
var express_session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
db.serialize();

app.use(function(req, res, next) {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      res.setHeader('Origin', 'http://localhost:5000')
      // Pass to next layer of middleware
      next();
});

var server = app.listen(3000, () => {
 console.log('server is running on port', server.address().port);
});

db.serialize(function() {
sqlstr = "CREATE TABLE IF NOT EXISTS Users (username TEXT, password TEXT);";
db.run(sqlstr);
sqlstr = "CREATE TABLE IF NOT EXISTS Messages (PK INTEGER PRIMARY KEY AUTOINCREMENT, Sender TEXT, Recipient TEXT, Message TEXT, Cipher TEXT, CKEY TEXT);";
db.run(sqlstr);
sqlstr = "CREATE TABLE IF NOT EXISTS Session (Username TEXT, Cookie TEXT);";
db.run(sqlstr);
});

app.post('/Register', function (req, res, next) {
let username = req.body.username;
let password = req.body.password;
  
if (req.method === "POST") {
    try {
    db.run("INSERT INTO Users (username, password) VALUES (?, ?)", username, password);
    db.run("INSERT INTO Session (Username, Cookie) VALUES (?, ?)", username, username);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Origin", "http://localhost:3000/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.statusCode = 200; 
    res.redirect('http://localhost:5000/index.html');
      } catch (e) {
        res.statusCode = 400;
        res.end("Invalid JSON");
      }
	}
	else
	{
		res.statusCode = 400;
    res.end("Send POST REQUEST");
  }
  next();
},

app.post('/Login', function (req, res, next) {

  let username = (req.body.username).toLowerCase();
  let password = (req.body.password).toLowerCase();   
  let sql = "SELECT * FROM  Users WHERE (username = '"+username+"' AND password = '"+password+"');";
  var x;

  db.all(sql, (err, rows) => {
    if (err) {
      next(err);
      return;
    }
    if (!rows) {
      res.status(400);
      res.send('Invalid username or password');
      return
    }
    rows.forEach((row) => {
      if (row.username === username && row.password === password) {
          x = 1;
      }
      else {
          x = 2;
          db.close();
      }
    })
    if (x === 1) {
        res.writeHead(302, { "Location": "http://localhost:3000/index.html"});
        return res.end();
    }
    else { res.writeHead(302, { "Location": "http://localhost:3000/login.html"});
        return res.end();}
   })}
   ,
   app.get('/messages', (req, res) => {
    let username = (req.query.username).toLowerCase();
    let sql = "SELECT * FROM  Messages WHERE Recipient ='"+username+"';";
    let count = "SELECT Count (*) FROM Messages WHERE Recipient = '"+username+"';"

    db.all(sql, (err, rows)=> {        
          res.send(rows);         
    }
    ) 
    })
  ),
  app.get('/messages_sent', (req, res) => {
    let username = (req.query.username).toLowerCase();
    let sql = "SELECT * FROM  Messages WHERE Sender ='"+username+"';";
    let count = "SELECT Count (*) FROM Messages WHERE username = '"+username+"';"

    db.all(sql, (err, rows)=> {        
          res.send(rows);         
    }
    ) 
    })
  ),
  app.post('/messages', (req, res) => {
    

    Message = (req.body.message).toLowerCase();
    Recipient = (req.body.recipient).toLowerCase();
    Sender = (req.body.sender).toLowerCase();
    Cipher = req.body.cipher
    CKEY = req.body.CKEY

    if (req.method === "POST") {
      try {
      db.run("INSERT INTO Messages (Sender, Recipient, Message, Cipher, CKEY) VALUES (?, ?, ?, ?, ?)", Sender, Recipient, Message, Cipher, CKEY);
    //  res.header("Access-Control-Allow-Origin", "*");
     //res.header("Origin", "http://localhost:3000/");
     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.statusCode = 200; 
        } catch (e) {
          res.statusCode = 400;
          res.end("Invalid JSON");
        }
    }
    })