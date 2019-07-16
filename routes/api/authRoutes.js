const passport  = require("passport");
const User      = require("../../models/User");
const bcrypt = require('bcryptjs');
// Passing express to our routes function

module.exports = (app) => {

// When submitting a form on register page we create a new entry in DB.
    app.post('/api/register', async (req, res)=>{
	    const password = req.body.password;
	    const password2 = req.body.password2;
        if (password == password2){
            const newUser = await new User({
          		name: req.body.name, email: req.body.email,
          		username: req.body.username,password: req.body.password,
          		address: req.body.address,phone: req.body.phone
          	});
      	    await User.createUser(newUser, function(err, user){
          		if(err) throw err;
          		 res.send(200)
          	})
        } else{
          	console.log("Passwords don't match");
            res.send("Passwords don't match")
        }
    });


// When submitting a form on Login page , we pass values from inputs to passport local strategy.
  	app.post('/api/login',
  	  passport.authenticate('local'),
    	  function(req, res, err){
    	      console.log(req.user)
            if(err){res.send(err)}
            else{ res.send("success")}
    	  }
  	);

    app.get('/api/logout',
        function(req, res){
            req.logout(),
            console.log('log Out')
  		     res.redirect("/")
  	    }
    );

// Endpoint to get current user
  	app.get('/api/current_user', (req,res) => {

      console.log('api/current_user called')
          if(req.user) {res.send(req.user)}
          else{res.send(false)}
    })
    
    app.get('/api/getAllUsers', (req,res) => {
      console.log('/api/getAllUsers')
          if(req.user && req.user.admin ) { 
              User.find( {} , (err, users)=>{
                         if(err) {throw err}
                         else{ res.send(users) }
                     })
          }
          else{res.send(false)}
    })
    

    app.put('/api/update_user', async (req,res) => {
      let password = req.body.password
            if(req.user) {
                bcrypt.hash(password, (hash) => {
                  req.body.password = hash
                   User.findByIdAndUpdate(req.user._id,req.body.updatedUser,(err, user)=>{
                         if(err) {throw err}
                         else{ res.send(req.user) }
                     })
                  })
            }
            else{res.send(false)}
    })





}
