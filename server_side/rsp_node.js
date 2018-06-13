var steem = require('steem');
var trx_no;
var user;
var choice;
var AI_choice;
var rock = ['1', '4', '7', 'a', 'd'];
var scissors = ['2', '5', '8', 'b', 'e'];
var paper = ['3', '6', '9', 'c', 'f'];

var port = process.env.PORT || 5000;

//listen to blockchain
var release = steem.api.streamTransactions('head', function(err, result) {
	
	 if ((result.operations["0"]["0"] == 'transfer') && (result.operations["0"]["1"].to=='rocksciss')&&((result.operations["0"]["1"].memo=='rock')||(result.operations["0"]["1"].memo=='scissors')||(result.operations["0"]["1"].memo=='paper'))) {
      trx_no=result.transaction_id;
		var ch=trx_no.substring(39, 40);
		 if (rock.includes(ch)) {
          AI_choice = "rock";
        }

        if (scissors.includes(ch)) {
          AI_choice = "scissors";
        }

        if (paper.includes(ch)) {
          AI_choice = "paper";
        }
		  if (ch=='0') {
          AI_choice = "null";
        }
		 
      user=result.operations["0"]["1"].from;
	choice=	 result.operations["0"]["1"].memo;
		
		  
		  // IF for transfer wins and loses
		if (choice == AI_choice) {
          status_text = "Tie game! 0.09 SBD paid back.";
			steem.broadcast.transfer('xxxxxx', 'rocksciss', user, '0.090 SBD', status_text, function(err, result) {
  			
			});
			
		// Transfer scripts - xxxxxx should be replaced by Active or Master Key to initiate transfer	
        }
        if ((choice == 'rock') && (AI_choice == 'scissors')) {
          status_text = "You:Rock - AI:Scissors ..... WIN! ..... 0.2 SBD paid.";
		steem.broadcast.transfer('xxxxxxx', 'rocksciss', user, '0.200 SBD', status_text, function(err, result) {
  			
			});
        }
        if ((choice == 'rock') && (AI_choice == 'paper')) {
          status_text = "You:Rock - AI:Paper ..... LOST! ..... Better luck next time";
		steem.broadcast.transfer('xxxxxxx', 'rocksciss', user, '0.001 SBD', status_text, function(err, result) {
  			
			});
        }
        if ((choice == 'scissors') && (AI_choice == 'paper')) {
          status_text = "You:Scissors - AI:Paper ..... WIN! ..... 0.2 SBD paid.";
		steem.broadcast.transfer('xxxxxxx', 'rocksciss', user, '0.200 SBD', status_text, function(err, result) {
  			
			});
        }
        if ((choice == 'scissors') && (AI_choice == 'rock')) {
          status_text = "You:Scissors - AI: Rock ..... LOST! ..... Better luck next time";
		steem.broadcast.transfer('xxxxxxx', 'rocksciss', user, '0.001 SBD', status_text, function(err, result) {
  			
			});
        }

        if ((choice == 'paper') && (AI_choice == 'rock')) {
          status_text = "You:Paper - AI:Rock ..... WIN! ..... 0.2 SBD paid.";
		steem.broadcast.transfer('xxxxxxx', 'rocksciss', user, '0.200 SBD', status_text, function(err, result) {
  			
			});
        }
        if ((choice == 'paper') && (AI_choice == 'scissors')) {
          status_text = "You:Paper - AI:Scissors ..... LOST! ..... Better luck next time";
		steem.broadcast.transfer('xxxxxxx', 'rocksciss', user, '0.001 SBD', status_text, function(err, result) {
  			
			});
        }

        if (ch == '0') {
          status_text = "NULL! 0.09 SBD paid back.";
		steem.broadcast.transfer('xxxxxxx', 'rocksciss', user, '0.090 SBD', status_text, function(err, result) {
  			
			});
        }
		
		
		
		
		
		

		
		
		
		
      }
    });
	




