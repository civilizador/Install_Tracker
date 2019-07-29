const passport  = require("passport");
const User      = require("../../models/User");
const bcrypt = require('bcryptjs');
const moment = require("moment")
const today = new Date().getDate().toString()
const today1 = moment().format("YYYY-MM-Do").slice(0,-2);  
console.log('Today DATE: ',today1)
// Passing express to our routes function

module.exports = (app) => {


    // REGISTER ROUTE 
    
    // When submitting a form on register page we create a new entry in DB.
    app.post('/api/register', async (req, res)=>{
	    const password = req.body.password;
	    const password2 = req.body.password2;
        if (password == password2){
            const newUser = await new User({
          		    name: req.body.name, 
          		    email: req.body.email,
          		    directManagerName: req.body.directManagerName,
          		    directManagerEmail: req.body.directManagerName,
          		    status: "No status set",
          		    username: req.body.username,
          		    password: req.body.password,
          		    phone: req.body.phone,
          		    region: req.body.region
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


   	
    // LOGIN ROUTE   

  	app.post('/api/login',
  	  passport.authenticate('local'),
    	  function(req, res, err){
            if(err){res.send('Please Try again')}
            else{ res.send(req.user)}
    	  }
  	);
    
    // LOGOUT ROUTE
    
    app.get('/api/logout',
        function(req, res){
            req.logout(),
            console.log('log Out')
  		     res.redirect("/")
  	    }
    );

    // GET CURRENT LOGGED IN USER
    
  	app.get('/api/current_user', async (req,res) => {
          if(req.user) {
            const projectsForToday  = await req.user.projects.filter(  (project)   => {    return project.projectStartDate == today1}    )   
                if(projectsForToday.length>0){
                    req.user.projectForToday = projectsForToday
                        res.send(req.user)
                }else{
                     req.user.projectForToday = [{
                            projectId : "Nothing for today",
                            projectName : "Nothing for today",
                            projectStartDate : "Nothing for today",
                            projectStartTime : "Nothing for today",
                            installAddress : "Nothing for today",
                        }]
                        res.send(req.user)
                }
          }
            
          else{res.send(false)}
    })
    
    
    // GET ALL TECHS except the ADMIN
    
    app.get('/api/getAllUsers', async (req,res) => {
      console.log('/api/getAllUsers')
            if(req.user) { 
                const   allUsersNoAdmin  = await User.find( {"admin":false}  ,(err, users)=>{
                        if(err) {throw err}
                         else{ 
                             return users.map((user) => {
                                const temp = user.projects.filter(  (project)   => { 
                                            console.log('PROJECT START DATEEEE!!!: ',project.projectStartDate); 
                                            return project.projectStartDate == "28" 
                                        } )
                                return  { ...user, projectForToday: temp }
                              })
                         }
                    }) 
                console.log('FILTERED USERS: ',allUsersNoAdmin)
                res.send(allUsersNoAdmin)    
            } else{res.send(false)}
    })
    
    
    // GET A PARTICULAR USER DATA 
    
    app.get('/api/getAllUsers/:id', async (req,res) => {
        if(req.user) { 
            const   userData  = await User.find(req.params.id , (err, user)=>{
                         if(err) {throw err}
                         else{ return user  }
                     })
            const   todayProject = await userData.project.find( (project) => {project.projectStartDate==moment().format('YYYY MM Do').slice(0,-2) } )    
               if(todayProject) {console.log(todayProject)}
               else{console.log('nothing was found')}
               
                    res.send(userData) 
          }
          else{res.send(false)}
    })
    
    
    // UPDATE USER ACCOUNT INFO
    
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
    
    
    // UPDATE USER LOCATION
    
    app.post('/api/updateLatLng', async(req,res)=>{
        if(req.user){
            const latlng = req.body.latlng 
               User.findByIdAndUpdate(req.user._id,
                { "$set": { "lat": latlng.latitude, "lng":latlng.longitude } },
                function(err) {
                    if (err) throw err;
                    else{
                        const projectsForToday  =  req.user.projects.filter(  (project)   => {    return project.projectStartDate == today1}    )   
                            if(projectsForToday.length>0){
                                const updatedUser = req.user ;
                                    updatedUser.projectForToday = projectsForToday
                                    res.send(updatedUser)
                            }else{
                                const updatedUser = req.user ;
                                    updatedUser.projectForToday = [{
                                        projectId : "Nothing for today",
                                        projectName : "Nothing for today",
                                        projectStartDate : "Nothing for today",
                                        projectStartTime : "Nothing for today",
                                        installAddress : "Nothing for today",
                                    }]
                                    res.send(updatedUser)
                            }
                    }
                });
        }else{
            res.send('noUserLoggedIn')
        }
    })
    
    
    // UPDATE USER STATUS. 
    
    app.post('/api/updateUserStatus', async(req,res)=>{
        if(req.user){
               User.findByIdAndUpdate(req.user._id,
                { "$set": { "status": req.body.status } },
                function(err) {
                    if (err) throw err;
                    else{
                        const projectsForToday  =  req.user.projects.filter(  (project)   => {    return project.projectStartDate == today1}    )   
                            if(projectsForToday.length>0){
                                const updatedUser = req.user ;
                                    updatedUser.projectForToday = projectsForToday
                                    res.send(updatedUser)
                            }else{
                                const updatedUser = req.user ;
                                    updatedUser.projectForToday = [{
                                        projectId : "Nothing for today",
                                        projectName : "Nothing for today",
                                        projectStartDate : "Nothing for today",
                                        projectStartTime : "Nothing for today",
                                        installAddress : "Nothing for today",
                                    }]
                                    res.send(updatedUser)
                            }
                    }
                });
        }else{
            res.send('noUserLoggedIn')
        }
    })
    
    
    // ADD PROJECT. Pushing a new project into the array with all projects
    
    app.post('/api/addProjectToTech', async(req,res) => {
        if(req.user && req.user.admin){
            const userId = req.body.dataToSend.userId;
            const projectToAdd = req.body.dataToSend.project;
            console.log('YAY! we triggered Adding Project to the tech route',userId,projectToAdd)
            User.findOneAndUpdate(
                { _id: userId }, 
                { $push: { projects: projectToAdd } },
                function(err){
                    if(err){console.log(err)}
                    else{console.log('success')}
                    
                }
            );
            await User.save
            const allUsers = await User.find({},
                (err,users)=>{
                    if(err){
                        console.log("removeJob route. Failed to fetch all users after removing job")
                    }else{
                        return users
                    }
                }) 
            res.send(allUsers)  
            
       }
   })
   
    // REMOVE PROJECT 
    
    app.post("/api/removeJob", async(req,res)=>{
        console.log(req.body.dataToSend.userId)
        console.log(req.body.dataToSend.projectId)
        if(req.user && req.user.admin){
            const userId = req.body.dataToSend.userId;
            const projectId = req.body.dataToSend.projectId;
            const userToRemoveFrom = await User.findById(userId,(err,user)=>{
                if(err){console.log("Failed to look up a user by ID")}
                else{return user}
            })
            const updatedProjects = await userToRemoveFrom.projects.filter((project)=>{return project.projectId !== projectId})
            
            console.log('YAY! we triggered Adding Project to the tech with ID: ',userId,'updated Projects list: ',updatedProjects,'Project ID to Remove : ',projectId)
            await User.findOneAndUpdate(
                { _id: userId }, 
                { $set: { projects: updatedProjects } },
                function(err){
                    if(err){console.log(err)}
                    else{console.log('success')}
                }
            );
            await User.save
            const allUsers = await User.find({},
                (err,users)=>{
                    if(err){
                        console.log("removeJob route. Failed to fetch all users after removing job")
                    }else{
                        return users
                    }
                }) 
            res.send(allUsers)    
       }
    })   


}
