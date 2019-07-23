//  Loading env variables into our APP.
 require('dotenv').config();

    const fs = require('fs');
    const   express =          require("express");
    const   app =              express();
    const   passport =         require("passport");
    const   bodyParser =       require("body-parser"); //body parser allows us to take data from forms and use req.body.parametr ex: req.body.name
    const   mongoose =         require("mongoose");
    const   flash    =         require("connect-flash");
    const   cookieParser =     require('cookie-parser');
    const   cookieSession   =  require("cookie-session");
    const   path =             require("path")
   
//  Connecting to DB
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB successfully connected"))
        .catch(err => console.log(err));

// EXPRESS APP CONFIGURATION:

  // Parsing data from the forms! This step is super important in order for passport to work.
      app.use(bodyParser.urlencoded({
          extended: true
      }));
      app.use(bodyParser.json());
      app.use(cookieParser());

  //  Express session creates a new session each time we logIn
      app.use(require("express-session")({
          secret: process.env.XPRESS_SEC ,
          resave: true,
          saveUninitialized: true
      }));

 // Setting default Engine and default directory.
     app.set("view engine", "ejs");
     app.use(express.static("public"));
     app.use(express.static(__dirname + "/public"));
     app.use(flash());

// AUTH flow with Passport.

  //  Calling Passport to initializa and create a session.
      app.use(passport.initialize());
      app.use(passport.session());

  //   Creating a function that will check if user loged in or not.
      app.use(function(req, res, next){
          res.locals.currentUser = req.user;// req.user will either be empty or contain information about user from the request
          res.locals.error = req.flash("error");
          res.locals.success = req.flash("success");
          next();
      });
      app.use(express.static(path.join(__dirname, "client", "build")))

//CRUD ROUTES
    require('./routes/api/authRoutes')(app);

//  PASSPORT.js CONFIGURATION IMPORT
    require("./services/passportConfig")

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
    if(process.env.NODE_ENV!='production'){
      process.env.PORT=5000
    }
    app.listen(   process.env.PORT || 5000 , process.env.IP,function(){
            console.log("Server had been started")
    });
