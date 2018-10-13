 

 apivalues  = JSON.parse(Assets.getText("apikey.json"));
// console.log("getCompetitionData apikey" ,apivalues.services.football.apiKey);
 
 Meteor.methods({ 
   
   "getCompetitionData" : function (version){
        allowed = [2000,2001,2002,2003,2013,2014,2015,2016,2017,2018,2019,2021]
        var campeonatos = new Array();
        const future = new Future();
        HTTP.call( 'GET', "https://api.football-data.org/v2/competitions", 
        options = { headers: { 'X-Auth-Token' : apivalues.services.football.apiKey }}, 
        function( error, response ) {
	        if ( error ) {
	            console.log( error );
	            future.throw(error);
	        } else {
	            if (response != undefined){         
	    //           console.log( response.data.competitions );
	               var i=0;  
	               for (var j=0;j<response.data.competitions.length;j++){                           
		               if (allowed.includes(response.data.competitions[j].id)) {  
		                   campeonatos[i] = {
		                   name: response.data.competitions[j].name, 
		                   id: response.data.competitions[j].id }; 
		 //                  console.log(i, campeonatos[i]);
		                 i++
		                }
		            }	            
		        }
		  //      console.log("getCompetitionData campeonatos" ,campeonatos);
		        future.return(campeonatos);
	        } 
	    })
	    // Execution is paused until callback arrives
        const ret = future.wait(); // Wait on future not Future
        return ret;	    
	},
	"getListaGoleadores" : function (campeonato){
        
        var jugadores = new Array();
        const fut = new Future();
        
        HTTP.call( 'GET', "https://api.football-data.org/v2/competitions/"+ campeonato + "/scorers/", 
        options = { headers: { 'X-Auth-Token' : apivalues.services.football.apiKey }}, 
        function( error, response ) {
          if ( error ) {
             console.log( error );
           } else {
            if (response != undefined){         
           //     console.log( response.data.scores);
                for (var i=0;i<response.data.scorers.length;i++){                           
                  jugadores[i] = {
                   nombre: response.data.scorers[i].player.name,                       
                   goles: response.data.scorers[i].numberOfGoals
                } 
              }
            }
        }
         //console.log("getCompetitionData campeonatos", i, jugadores[i]);
         fut.return(jugadores);
        });
        const lista = fut.wait(); // Wait on future not Future
        return lista	  
    }  
 }) 