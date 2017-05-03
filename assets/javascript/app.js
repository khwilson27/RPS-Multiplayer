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

	  var resetDb = function() {
			  db.ref().set({
			    player1wins: 0,
			    player1losses: 0,
			    player2wins: 0,
			    player2losses: 0,
			  });
	  }

	  var name= "";

	   database.ref().on("value", function(snapshot) {

	          var name = snapshot.val().name;
	          var email = snapshot.val().email;
	          var age = snapshot.val().age;
	          var comment = snapshot.val().comment;

	          $("#name-display").text(name);
	          $("#email-display").text(email);
	          $("#age-display").text(age);
	          $("#comment-display").text(comment);

	    // Create Error Handling
	    // If any errors are experienced, log them to console.
	    }, function(errorObject) {
	      console.log("The read failed: " + errorObject.code);
	    });

	  console.log(db.p1nameChoice);

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

	  		db.ref("/p1nameChoice").set({
	          name: name,
	          message: choice
	        });

	  	} else {alert("You must first enter a name!")}

	  })

	  $(".submitMessage").on("click", function() {

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