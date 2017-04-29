$(document).ready(function() {

	  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyAPDQyy4hH2Q-6E0INLR4Dz_hkXmlz2nn0",
	    authDomain: "rps-multiplayer-8e4af.firebaseapp.com",
	    databaseURL: "https://rps-multiplayer-8e4af.firebaseio.com",
	    projectId: "rps-multiplayer-8e4af",
	    storageBucket: "rps-multiplayer-8e4af.appspot.com",
	    messagingSenderId: "485695189412"
	  };
	  firebase.initializeApp(config);



	  // Create a variable to reference the database.
	  var db = firebase.database();

	  db.ref().set({
	    player1name: "",
	    player1choice: "",
	    player1wins: 0,
	    player1losses: 0,
	    player2name: "",
	    player2choice: "",
	    player2wins: 0,
	    player2losses: 0,
	  });

	  $("#mainContent").on("click", ".clickableImg", function(){

	  	var choice = $(this).data("choice");
	  	var name = $(".nameInput").val();

	  	if (!name) {
	  		alert("Please input and submit a valid name!");
	  	} 
		else {
	  		$(".clickableImg").removeClass("clickableImg");
	  	}





	  })

    

}) //closing document.ready