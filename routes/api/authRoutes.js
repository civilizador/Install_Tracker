const passport  = require("passport");
const User      = require("../../models/User");
const bcrypt = require('bcryptjs');
const moment = require("moment")
const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("out.txt");


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
          		    region: req.body.region,
          		    projects: []
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

     app.post("/api/genReport",async(req,res)=>{
         const user = await User.findById(req.body.userId,(err,user)=>{if(err){console.log(err)}else return user} )
         const allProjects =  user.projects.map((project)=>{return{
          		    name: project.projectName,
          		    startDate: project.projectStartDate,
          		    id: project.projectId, 
           		    LastStatus: project.status[project.status.length-1].projectStatus,
           		    LastCoordinatesLat: project.status[project.status.length-1].location.lat,
           		     LastCoordinatesLng: project.status[project.status.length-1].location.lng
          	        }}
                )
            console.log(allProjects);
            fastcsv
              .write(allProjects, { headers: true })
              .pipe(ws);
                        res.send(allProjects)
    })
   	
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
             res.send(req.user)
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
    
    app.post('/api/update_user',  (req,res) => {
        let password  = req.body.password
        let password2 = req.body.password2
            if(req.user) {
                if (password == password2){
                        const newUser = {
                      		    name: req.body.name, 
                      		    email: req.body.email,
                      		    directManagerName: req.body.directManagerName,
                      		    directManagerEmail: req.body.directManagerName,
                      		    status: "No status set",
                      		    username: req.body.username,
                      		    password: req.body.password,
                      		    phone: req.body.phone,
                      		    region: req.body.region,
                      		    projects: req.body.projects
                      	}
                bcrypt.hash(newUser.password,async (hash) => {
                     newUser.password = hash
                     User.findByIdAndUpdate(req.user._id,
                        { "$set": { newUser } },
                        (err) => {
                            if (err) throw err;
                            else{
                            }
                        })       
                } )
            }}
    });
    
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
    
    
    // // UPDATE USER STATUS. 
    
    // app.post('/api/updateUserStatus', async(req,res)=>{
    //     if(req.user){
    //           User.findByIdAndUpdate(req.user._id,
    //             { "$set": { "status": req.body.status } },
    //             function(err) {
    //                 if (err) throw err;
    //                 else{
    //                     const projectsForToday  =  req.user.projects.filter(  (project)   => {    return project.projectStartDate == today1}    )   
    //                         if(projectsForToday.length>0){
    //                             const updatedUser = req.user ;
    //                                 updatedUser.projectForToday = projectsForToday
    //                                 res.send(updatedUser)
    //                         }else{
    //                             const updatedUser = req.user ;
    //                                 updatedUser.projectForToday = [{
    //                                     projectId : "Nothing for today",
    //                                     projectName : "Nothing for today",
    //                                     projectStartDate : "Nothing for today",
    //                                     projectStartTime : "Nothing for today",
    //                                     installAddress : "Nothing for today",
    //                                 }]
    //                                 res.send(updatedUser)
    //                         }
    //                 }
    //             });
    //     }else{
    //         res.send('noUserLoggedIn')
    //     }
    // })
    
    
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
         if(req.user && req.user.admin){
            const userId = req.body.dataToSend.userId;
            const projectId = req.body.dataToSend.projectId;
            const userToRemoveFrom = await User.findById(userId,(err,user)=>{
                if(err){console.log("Failed to look up a user by ID")}
                else{return user}
            })
            const updatedProjects = await userToRemoveFrom.projects.filter((project)=>{return project.projectId !== projectId})
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
    
    // UPDATE STATUS ON PROJECT
    
    app.post('/api/updateProjectStatus',async(req,res)=>{
        
        if(req.user) {
            
            console.log('UPDATING STATUS OF THE INSTALL   ',req.body)
            const userProjects = await req.user.projects
            const projectLatLng = {lat: userProjects.find( (project)=>{return project.projectId == req.body.projectId} ).lat, lng: userProjects.find( (project)=>{return project.projectId == req.body.projectId} ).lng }
            const userLatLng = {lat:req.user.lat, lng:req.user.lng}
                if(projectLatLng.lat && userLatLng.lng!=0){
                     console.log("PROJECT LAT LONG",projectLatLng,'USER LAT LNG',userLatLng)
                         
                        const unit = 'M'
                        function distance(lat1, lon1, lat2, lon2, unit ) {
                        	if ((lat1 == lat2) && (lon1 == lon2)) {
                        		return 0;
                        	}
                        	else {
                        		var radlat1 = Math.PI * lat1/180;
                        		var radlat2 = Math.PI * lat2/180;
                        		var theta = lon1-lon2;
                        		var radtheta = Math.PI * theta/180;
                        		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                        		if (dist > 1) {
                        			dist = 1;
                        		}
                        		dist = Math.acos(dist);
                        		dist = dist * 180/Math.PI;
                        		dist = dist * 60 * 1.1515;
                        		if (unit=="K") { dist = dist * 1.609344 }
                        		if (unit=="N") { dist = dist * 0.8684 }
                        		return dist;
                        	}
                        }
                        
                        const result = distance(projectLatLng.lat, projectLatLng.lng,userLatLng.lat, userLatLng.lng, unit)
                        console.log(result)
                            if(result>5){
                                 console.log("Your location is out of range")
                                    res.send("Your location is out of range")
                            }else{
                                userProjects.find((project)=>{return project.projectId == req.body.projectId}).status.push({
                                projectStatus: req.body.value,
                                timeStamp: new Date(),
                                location: {lat:req.user.lat , lng:req.user.lng} 
                            })
                            
                            console.log('UPDATING STATUS OF THE INSTALL WITH  ',req.body, 'PROJECT to modify: ', userProjects)
                
                             await User.findOneAndUpdate(
                                { _id: req.user._id }, 
                                { $set: { projects: userProjects } },
                                function(err){
                                    if(err){console.log(err)}
                                    else{console.log('success')}
                                }
                            );
                            await User.save
                            // Sending currently logged in user with projectForToday 
                               res.send(req.user)   
                            }
                                               
                }else{
                    console.log('Location information is missing')
                     res.send('Location information is missing')
                }
                
                
           
          }else{res.send(false)}
  
    })
    
    app.post('/api/changeProjectStatusAdmin',async(req,res)=>{
         if(req.user.admin) {
            
            const projectId = req.body.projectId
            const userToUpdate =  await User.findById(req.body.userId,(err,user)=>{
                if(err){console.log("Failed to look up a user by ID")}
                else{return user}
            })
            console.log("USER USER USER USER TO TO TO UPDATE STATUS AS ADMIN", userToUpdate)
            userToUpdate.projects.find((project)=>{
                        return project.projectId == projectId
                    }).status.push(
                            {
                                projectStatus: req.body.value,
                                timeStamp: new Date()
                             }
                        )
                        
            await User.findOneAndUpdate(
                                { _id: req.body.userId  },
                                { $set: { projects: userToUpdate.projects } },
                                function(err,user){
                                    if(err){console.log(err)}
                                    else{console.log('success',user.projects)}
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
        
             
         }else{
            res.send('Not_an_admin')
        }
            
    })

}
