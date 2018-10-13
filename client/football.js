
/*
Meteor.subscribe("X");
*/


////////////////////////////
///// helper functions for the campeonatos dropdown 
////////////////////////////
Template.campeonatos_dropdown.helpers({
// returns an array of the names of all campeonatos
  get_campeonatos : function(){
 
 //we can call the API here from the client to take adventage of the browser developer tools 
 /*    HTTP.call( 'GET', "https://api.football-data.org/v2/competitions", 
       options = { headers: { 'X-Auth-Token' : "XXXXXXXXXXXXXXXX"}}, 
       function( error, response ) {
         if (error) { console.log(error) } else { console.log(response.data) } }
       });  */ 
 /* 
 //Note that ajax calls do not work because of the cross domain reference 
  $.ajax({headers:{},
   url: "https://api.football-data.org/v2/competitions/",
   dataType:'json',type:'GET',success : function(response){ 
       ...... 
   }
  });*/

 //To make it private we call a mtethod wich will call the API from the server    
    Meteor.call('getCompetitionData', "v2", function(err, res) {
      if(err) console.error("getCompetitionData ERR" ,err);
        else {
 //         console.log("getCompetitionDatata  OK", res);
          Session.set("competiciones", res );            
        }
    })
    return Session.get("competiciones") 
   }});

////////////////////////////
///// helper functions for the feature list display template 
////////////////////////////
Template.jugadores_list.helpers({
  "get_jugadores_valores":function(){
        
    campeonatoId = Session.get("campeonatoId")

    if (campeonatoId != undefined){
       //we can call the API here from the browser client
      //To make it private we call a mtethod wich it will call the API fromthe server
      Meteor.call('getListaGoleadores', campeonatoId, function(err, res) {
        if(err) console.error("getListaGoleadores ERR" ,err);
          else {
 //           console.log("getListaGoleadores  OK", res);
            Session.set("goleadores", res );            
          }
        })
      return Session.get("goleadores") 
      }
   }
})


////////////////////////////
///// event handlers for the dropdown form
////////////////////////////

Template.campeonatos_dropdown.events({
    // event handler for when user changes the selected
    // option in the drop down list
    "change .js-select-campeonato":function(event){
      event.preventDefault();
      var id = $(event.target).val();
      Session.set("campeonatoId" , id );
    }, 
    // event handler for when the user clicks on the 
    // blobs button
   /*  "click .js-show-blobs":function(event){
      event.preventDefault();
      initBlobVis();
    }, */
     
  }); 



      
 

