 steem.api.setOptions({
      url: 'https://api.steemit.com'
    });
 
 	// definition of global variables
    var user;
    var choice;
    var trx_no;
    var AI_choice;
    var status;
    var money;
    var choices = ['rock', 'scissors', 'paper'];
 
   // Array for last digit of transaction data is defined. This will be used for AI choice
 	var rock = ['1', '4', '7', 'a', 'd'];
    var scissors = ['2', '5', '8', 'b', 'e'];
    var paper = ['3', '6', '9', 'c', 'f'];
   // variable for memo
 	var status_text;
 	//variable for global win-loss calculation
    var winloss = 0;

	// Start listening to block-chain
    var release = steem.api.streamTransactions('head', function(err, result) {
      // Check if result is a transfer from user to AI
		if ((result.operations["0"]["0"] == 'transfer') && (result.operations["0"]["1"].to == 'rocksciss') && (result.operations["0"]["1"].from == user) && (choices.includes(result.operations["0"]["1"].memo))) {
        
		// Get the transaction ID and get the last digit for AI choice determination
		trx_no = result.transaction_id;
        var ch = trx_no.substring(39, 40);
        		
		// The series of IF statements define the AI choice	
        if (rock.includes(ch)) {
          AI_choice = "rock";
        }

        if (scissors.includes(ch)) {
          AI_choice = "scissors";
        }

        if (paper.includes(ch)) {
          AI_choice = "paper";
        }

        if (ch == '0') {
          AI_choice = "null";
        }

        // Below series of IF statements make the winning - losing state. This is just to show user.
		if (choice == AI_choice) {
          status_text = "Tie game! 0.09 SBD paid back.";
          winloss -= 0.01;
        }
        if ((choice == 'rock') && (AI_choice == 'scissors')) {
          status_text = "WIN! 0.2 SBD paid.";
          winloss += 0.1;

        }
        if ((choice == 'rock') && (AI_choice == 'paper')) {
          status_text = "LOST! Better luck next time";
          winloss -= 0.099;
        }
        if ((choice == 'scissors') && (AI_choice == 'paper')) {
          status_text = "WIN! 0.2 SBD paid.";
          winloss += 0.1;
        }
        if ((choice == 'scissors') && (AI_choice == 'rock')) {
          status_text = "LOST! Better luck next time";
          winloss -= 0.099;

        }

        if ((choice == 'paper') && (AI_choice == 'rock')) {
          status_text = "WIN! 0.2 SBD paid.";
          winloss += 0.1;
        }
        if ((choice == 'paper') && (AI_choice == 'scissors')) {
          status_text = "LOST! Better luck next time";
          winloss -= 0.099;
        }

        if (ch == '0') {
          status_text = "NULL! 0.09 SBD paid back.";
          winloss -= 0.01;
        }
		
		// Write the results
        document.getElementById('status').innerHTML += user + " seleceted  " + choice + "</br>";
        document.getElementById('status').innerHTML += "AI seleceted  " + AI_choice + "</br>";
        document.getElementById('status').innerHTML += "TRX ID  " + trx_no + "</br>";
        document.getElementById('status').innerHTML += status_text + "</br>";
        document.getElementById('status').innerHTML += "-------------------------------------------------" + "</br>";
        document.getElementById('winloss').innerHTML = "Overall Status: " + winloss.toFixed(3) + " SBD"

      }
    });

	//initially don't show game screen until a valid username is entered.
    document.getElementById('game_container').style.display = "none";
    document.getElementById('transact_head').style.display = "none";

 // function to control user entry   
 function user_enter() {
      var cont = 0;
      user = document.getElementById('name').value;
      //not blank
	 if (user == "") {
        cont = 1;
        window.alert("User Name can't be empty");
      }
		// not at the initial state
      if (user == "UserName") {
        cont = 1;
        window.alert("Please enter a Steemit user name");
      }
      //not starting with @
	  if (user.substring(0, 1) == "@") {
        cont = 1;
        window.alert("Please enter username without @");
      }
      // a valid steemit username - check if the user array turns !=zero length
	  if (cont == 0) {
        steem.api.getAccounts([user], function(err, result) {
          if (result.length == 1) {
            game_on(user);

          } else {
            window.alert("Entry is not a Steemit User Name")
          }
        });

      }


    }

 // Show the game screen if user is valid.
    function game_on(user) {
      document.getElementById('game_container').style.display = "block";
      document.getElementById('transact_head').style.display = "block";
      document.getElementById('Start').style.display = "none";
      document.getElementById('name').style.display = "none";
      document.getElementById('username_div').innerHTML = "Hello  " + user + " Let's play!"


    }





    function r_ock() {
      window.open('https://v2.steemconnect.com/sign/transfer?from=' + user + '&to=' + 'rocksciss' + '&amount=' + '0.100 SBD' + '&memo=' + 'rock', 100, 100);
      choice = "rock";

    }

    function s_cissor() {
      window.open('https://v2.steemconnect.com/sign/transfer?from=' + user + '&to=' + 'rocksciss' + '&amount=' + '0.100 SBD' + '&memo=' + 'scissors', 100, 100);
      choice = "scissors";

    }

    function p_aper() {
      window.open('https://v2.steemconnect.com/sign/transfer?from=' + user + '&to=' + 'rocksciss' + '&amount=' + '0.100 SBD' + '&memo=' + 'paper', 100, 100);
      choice = "paper";

    }