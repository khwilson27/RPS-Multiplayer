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

	  // Define variables
	  var name = "";
	  var p1Name = "";
	  var p1Choice = "";
	  var player1wins= 0;
      var player1losses= 0;
      var player2wins= 0;
      var player2losses= 0;

	  // saves players name to global variable and renders on page
	  $(".submitName").on("click", function(){
			event.preventDefault();
	  		if ($(".nameInput").val().trim() != "") {
			  		
			  		if ($(".player1Name").text() != "" && $(".player2Name").text() != "") {
			  			alert("There are already 2 players!");
			  		} else if ($(".player1Name").text() != null && $(".player2Name").text() == null) {
			  			name = $(".nameInput").val().trim();
				  		$(".nameInput").val("");
				  		$(".nameInput").remove();
				  		$(".submitName").remove();
			  			$(".player2Name").text(name);
			  			$("<h2>").addClass("player2Name").text(name).appendTo(".nameArea");
			  			$(".instructionsText").text("Pick rock, paper, or scissors!");
			  		} else {
			  			name = $(".nameInput").val().trim();
				  		$(".nameInput").val("");
				  		$(".nameInput").remove();
				  		$(".submitName").remove();
			  			$(".player1Name").text(name);
			  			$("<h2>").addClass("player1Name").text(name).appendTo(".nameArea");
			  			$(".instructionsText").text("Pick rock, paper, or scissors!");
			  		}

	  		} else {alert("Invalid input!")}

	  })

	  $("#mainContent").on("click", ".clickableImg", function(){

	  	if (name != "") {
	  		var choice = $(this).data("choice");
	  		$(".rpsImg").removeClass("clickableImg");
	  		$(".instructionsText").text("You picked " + choice + ". Waiting for other player to make a choice...");

	  		if (p1Choice != "") {
	  			db.ref("/playerData/player2Data").set({
		          name: name,
		          choice: choice
		        });
	  		} else {
	  			db.ref("/playerData/player1Data").set({
		          name: name,
		          choice: choice
		        });
	  		}

	  	} else {alert("You must first enter a name!")}

	  })


	  db.ref("/playerData").on("value", function(snapshot) {

	      if (snapshot.child("player1Data").exists() && snapshot.child("player2Data").exists()) {

			    // Evaluate inputs in game
			    p1Name = snapshot.val().player1Data.name;
			    p1Choice = snapshot.val().player1Data.choice;

			    var p2Name = snapshot.val().player2Data.name;
			    var p2Choice = snapshot.val().player2Data.choice;

			    console.log(p1Name, p1Choice, p2Name, p2Choice);
			    db.ref("/playerData").remove();

			    // Determine winner
			    if (p1Choice == p2Choice) {
			    	$(".instructionsText").text("Tie! Both " + p1Name + " & " + p2Name + " chose " + p1Choice + "!");
			    } else if (p1Choice == "rock") {
			    	if (p2Choice == "scissors") {
			    		$(".instructionsText").text(p1Name + " chose " + p1Choice +". " + p2Name + " chose " + p2Choice + ". " + p1Name + " wins!");
			    		player1wins++;
			    		player2losses++;	
			    	} else if (p2Choice == "paper") {
			    		$(".instructionsText").text(p1Name + " chose " + p1Choice +". " + p2Name + " chose " + p2Choice + ". " + p2Name + " wins!");
			    		player1losses++;
			    		player2wins++;
			    	}
			    } else if (p1Choice == "paper") {
			    	if (p2Choice == "scissors"){
			    		$(".instructionsText").text(p1Name + " chose " + p1Choice +". " + p2Name + " chose " + p2Choice + ". " + p2Name + " wins!");	
			    		player1losses++;
			    		player2wins++;
			    	} else if (p2Choice == "rock") {
			    		$(".instructionsText").text(p1Name + " chose " + p1Choice +". " + p2Name + " chose " + p2Choice + ". " + p1Name + " wins!");
			    		player1wins++;
			    		player2losses++;
			    	}
			    } else if (p1Choice == "scissors") {
			    	if (p2Choice == "paper"){
			    		$(".instructionsText").text(p1Name + " chose " + p1Choice +". " + p2Name + " chose " + p2Choice + ". " + p1Name + " wins!");
			    		player1wins++;
			    		player2losses++;	
			    	} else if (p2Choice == "rock") {
			    		$(".instructionsText").text(p1Name + " chose " + p1Choice +". " + p2Name + " chose " + p2Choice + ". " + p2Name + " wins!");
			    		player1losses++;
			    		player2wins++;
			    	}
			    }

			    // Print oppenent's name and both players scores
			    if (p1Name == name) {
			    	$(".player1Wins").text("Wins: " + player1wins);
			    	$(".player1Losses").text("Losses: " + player1losses);
			    	$(".player2Wins").text("Wins: " + player2wins);
			    	$(".player2Losses").text("Losses: " + player2losses);
			    	$(".player2Name").text(p2Name);
			    } else {
			    	$(".player1Wins").text("Wins: " + player2wins);
			    	$(".player1Losses").text("Losses: " + player2losses);
			    	$(".player2Wins").text("Wins: " + player1wins);
			    	$(".player2Losses").text("Losses: " + player1losses);
			    	$(".player2Name").text(p1Name);
			    }

			    $(".instructionsText").append(" Choose rock, paper, or scissors to play again!");
			    $(".rpsImg").addClass("clickableImg");
			    p1Name = "";
	  			p1Choice = "";

		  } else if (snapshot.child("player1Data").exists()) {
		  		p1Name = snapshot.val().player1Data.name;
			    p1Choice = snapshot.val().player1Data.choice;
		  }

	  })

	  // stores comments to firebase and appends them to the chat area
	  $(".submitMessage").on("click", function() {

	  	event.preventDefault();
		if (name != "") {

			var message = $("#comment").val().trim();
			$("#comment").val("");

	  		db.ref("/comments").push({
	          name: name,
	          message: message
	        });

	  	} else {alert("You must first enter a name!")}

	  })

	  db.ref("/comments").on("child_added", function(snapshot) {

		      // storing the snapshot.val() in a variable for convenience
		      var sv = snapshot.val();

			  var messageName = sv.name;
			  var messageMessage = sv.message;

			  var newRow = $("<div>").addClass("row").appendTo($("#chatBox"));
			  var newNameCol = $("<div>").addClass("col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3").appendTo(newRow);
			  var newNameP = $("<p>").addClass("messengerName").text(messageName).appendTo(newNameCol);
			  var newMessageCol = $("<div>").addClass("col-xs-12 col-sm-9 col-md-9 col-lg-9 col-xl-9").appendTo(newRow);
			  var newMessageP = $("<p>").addClass("message").text(messageMessage).appendTo(newMessageCol);

      }) // close db child-added event

    

}) //closing document.ready