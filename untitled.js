var http = require('http'),
    express = require('express'),
    app = express(),
    sqlite3 = require('sqlite3').verbose(),
    bodyParser = require('body-parser'),
    db = new sqlite3.Database('user');
    var t=0
    app.set('view engine', 'pug')



app.set('views', __dirname + '/public');
app.engine('.html', require('jade').__express);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

     db.run('CREATE TABLE IF NOT EXISTS user (username TEXT , password TEXT)')
            

app.get('/', function(req, res) {
 res.render('index.jade',function(err, html) {
                res.send(200, html);

});
})
     app.get('/signup', function(req, res) {
 res.render('signup.jade',function(err, html) {
                res.send(200, html);

     })
})

app.post('/add', function(req, res) {
    t=0
    username = req.body.username;
    password = req.body.password;
    db.serialize(function () {
    db.each('SELECT username,password FROM user', function (err, row) {
        console.log(row.username+""+row.password)
        console.log(username +""+password)
       if(row.username == username)
         {  t=1   
            if (row.password==password) {
                t=2
         } 
           else
            {t=3
            }


         }
  })
    


    if(t==0)
    { console.log("inserting")
        res.render('signup.jade',function(err, html) {
                res.send(200, html);
            })
}

if(t==2)
{
 res.send("logged in")
}

if(t==3)
{
    res.render('index.jade',{message:"invalid"})
}
})
});

app.post('/signup',function(req,res){
        username = req.body.username;
    password = req.body.password;


    sqlRequest = "INSERT INTO 'user' (username,password) VALUES('" + username + "', '" + password + "')"
    db.run(sqlRequest, function(err) {
        if(err !== null) {
            res.status(500).send("An error has occurred -- " + err);
        }
        else {
            res.render('index.jade',function(err, html) {
                res.send(200, html);
            })
        }
    });

})




var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

// Starts the server itself
var server = http.createServer(app).listen(port, host, function() {
    console.log("Server listening to %s:%d within %s environment",
                host, port, app.get('env'));

});