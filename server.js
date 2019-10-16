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
    res.send('Success. You have learnt how to modify cookies.\n\n flag: 3d1t_c0ok135  ');
})




// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
    res.status(404).send("HOW DID U GET HERE. THIS PAGE CANNOT BE FOUND.404 ERROR.A means of connecting a computer to any other computer anywhere in the world via dedicated routers and servers. When two computers are connected over the Internet, they can send and receive all kinds of information such as text, graphics, voice, video, and computer programs. No one owns Internet, although several organizations the world over collaborate in its functioning and development. The high-speed, fiber-optic cables (called backbones) through which the bulk of the Internet data travels are owned by telephone companies in their respective countries.    The Internet grew out of the Advanced Research Projects Agency's Wide Area Network (then called ARPANET) established by the US Department Of Defense in 1960s for collaboration in military research among business and government laboratories.Later universities and other US institutions connected to it. This resulted in ARPANET growing beyond everyone's expectations and acquiring the name Internet.The development of hypertext based technology (called World Wide web, WWW, or just the Web) provided means of displaying text, graphics, and animations, and easy search and navigation tools that triggered Internet's explosive worldwide growth.")
});


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

