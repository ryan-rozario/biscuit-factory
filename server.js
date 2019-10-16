var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

// invoke an instance of express application.
var app = express();

// set our application port
app.set('port', PORT);

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));




// set a cookie
app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.user_id;
    if (cookie === undefined)
    {
      res.cookie('user_id',"guest_user");
      console.log('cookie created successfully');
    } 
    else
    {
      // yes, cookie was already present
      if(cookie=="admin")
      {
        console.log("Yay u managed to solve it");
        console.log('cookie exists', cookie);
        res.clearCookie('user_id');
        return res.redirect('/success');
      } 
    } 
    next(); // <-- important!
  });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
})


app.get('/success', (req, res) => {
    res.send('You have completed the challenge');
})




// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

