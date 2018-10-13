
// define a startup script that 
// reads the JSON data files from the filesystem 
// and inserts them into the database if needed
Meteor.startup(function(){
// fibers/future to make sync what is async by default
 	 Future = Npm.require('fibers/future');
})
