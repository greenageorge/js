var http = require('http'),
    express = require('express'),
    app = express(),
    sqlite3 = require('sqlite3').verbose(),
    bodyParser = require('body-parser'),
    db = new sqlite3.Database('user');
    app.set('view engine', 'pug')
    var username,password
    


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

app.post('/signup',function(req,res){
        username = req.body.username;
    password = req.body.password;


    sqlRequest = "INSERT INTO 'user' (username,password) VALUES('" + username + "', '" + password + "')"
    db.run(sqlRequest, function(err) {
        if(err !== null) {
            res.status(500).send("An error has occurred -- " + err);
        }
        else {
            
             return res.redirect('/')
        }
    });

})




var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

var server = http.createServer(app).listen(port, host, function() {
    console.log("%s:%d",
                host, port);

});


app.post('/',(req,res) => {


    const u = req.body.username,
      p = req.body.password;
    db.serialize(() => {
    db.all('SELECT username,password FROM user WHERE username="'+ u +'"', (err,row) => {
        if(row.length>0){
            var s=row[0].password
            if(s!=p){
        res.render('index.jade',{message:"invalid"});

        }else{
        res.send("Welcome");
        }}
        else
        {
            return(res.redirect('/signup'))
        }
    });

    });

    
});