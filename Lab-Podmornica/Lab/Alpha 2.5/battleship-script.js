var turn=1;
var exceptionturn = 0;
var model = {
	boardSize: 10,
	numShips:10,
	
	shipSunk1:0,
	guesses1:0,
	shipSunk2:0,
	guesses2:0,
	
	ships1: [
		{locations:[0,0,0,0],hits:["","","","",],shipLength:4},
		{locations:[0,0,0],hits:["","","",],shipLength:3},
		{locations:[0,0,0],hits:["","","",],shipLength:3},
		{locations:[0,0],hits:["","",],shipLength:2},
		{locations:[0,0],hits:["","",],shipLength:2},
		{locations:[0,0],hits:["","",],shipLength:2},
		{locations:[0],hits:["",],shipLength:1},
		{locations:[0],hits:["",],shipLength:1},
		{locations:[0],hits:["",],shipLength:1},
		{locations:[0],hits:["",],shipLength:1}
	],
	
	ships2: [
		{locations:[0,0,0,0],hits:["","","","",],shipLength:4},
		{locations:[0,0,0],hits:["","","",],shipLength:3},
		{locations:[0,0,0],hits:["","","",],shipLength:3},
		{locations:[0,0],hits:["","",],shipLength:2},
		{locations:[0,0],hits:["","",],shipLength:2},
		{locations:[0,0],hits:["","",],shipLength:2},
		{locations:[0],hits:["",],shipLength:1},
		{locations:[0],hits:["",],shipLength:1},
		{locations:[0],hits:["",],shipLength:1},
		{locations:[0],hits:["",],shipLength:1}
	],
	
/////////////////////////////////////////////////////////////////////FIRE	
		fire: function(locations){
			var x = 0;
			var flag = 0;
			var index = 0;
									
				locations = locations+"";
				var r = locations.charAt(0);
				var k = locations.charAt(1);
				var loc = "" + k+r;
				
			if(turn==0){
	loop1:	for(var i=0;i<model.numShips;i++){
				var ship = model.ships2[i];
				x = i;
				index = 0;
				for(index = 0; index<model.ships2[i].shipLength;index++)
					if(model.ships2[i].locations[index] == locations) {flag = 1; break loop1;}
					
			}
			    /////DOHVATA KOJI JE (INDEKS) U NIZU ODREDJENOG BRODA (I) JEDNAK UNETOJ VREDNOSTI I POSTAVLJA (FLEG) NA 1 AKO POSTOJI, AKO NE ONDA NA 0

                var i = x;
				var cell;
				
				var hels = document.getElementsByClassName("board player1");
				for(var j = 0; j<hels.length; j++){
				var p = hels.item(j);
				if(p.id == loc) {cell = hels.item(j); break;}
				}
				//////CELL UZIMA VREDNOST UNETOG INDEKSA BIO BROD NA TOJ POZICIJI ILI NE

				if((model.ships2[i].hits[index] == "hit" && flag == 1)||(cell.className == "board player2 miss")){
					
				view.displayMessage("You have already hit model locations!");
				return true;
				///////VEC POGODJENO POLJE, IZLAZI IZ PROGRAMA
				}else if (flag == 1){

				/////MENJA CIFRE INDEKSU
				model.ships2[i].hits[index] = "hit";

				view.displayHit(loc);
				view.displayMessage("HIT!");
				
				
				if(model.isSunk(ship)){
					view.displayMessage("Sank!");
					model.shipSunk1++;
					}
					return true;
				}
		
		view.displayMiss(loc);
		view.displayMessage("You missed!");
		return false;
		
			}else if(turn==1){
	loop2:	for(var i=0;i<model.numShips;i++){
				var ship = model.ships1[i];
				x = i;
				var index = 0;
				for(index = 0; index<model.ships1[i].shipLength;index++)
					if(model.ships1[i].locations[index] == locations) {flag = 1; break loop2;}
					
			}
				var i = x;
				var hels = document.getElementsByClassName("board player2");
				for(var j = 0; j<hels.length; j++){
				var p = hels.item(j);
				if(p.id == loc) {cell = hels.item(j); break;}
				
				}
				if((model.ships1[i].hits[index] == "hit" && flag == 1)|| (cell.className == "board player1 miss")){
				view.displayMessage("You have already hit model locations!");
				return true;
				
				}else if (flag == 1){
					
				model.ships1[i].hits[index] = "hit";

				view.displayHit(loc);
				view.displayMessage("HIT!");
				
				
				if(model.isSunk(ship)){
					view.displayMessage("Sank!");
					model.shipSunk2++;
					}
					return true;
				}
		
		view.displayMiss(loc);
		view.displayMessage("You missed!");
		return false;
			}
	},
	
	isSunk: function(ship){
		for(var i=0;i<ship.shipLength;i++){
			if(ship.hits[i] !== "hit"){
				return false
				}
			}
			return true;
		},
/////////////////////////////////////////////////////////////////////GENERATE LOCATIONS
	generateShiplocations: function(){
		var locations = 0;
		
		///////////////////Player1
		turn = 0;
		for (var i = 0 ; i< model.numShips;i++){
			do{
				locations = model.generateShips(model.ships1[i]);
				}while(model.collision(locations));
				model.ships1[i].locations = locations;
			}
		console.log("Ships array1: ");
		console.log(model.ships1);
		
		///////////////////Player2
		turn = 1;
		for (var i = 0 ; i< model.numShips;i++){
			do{
				locations = model.generateShips(model.ships2[i]);
				}while(model.collision(locations));
				model.ships2[i].locations = locations;
			}
		console.log("Ships array2: ");
		console.log(model.ships2);
		turn = 0;
		},
/////////////////////////////////////////////////////////////////////GENERATE SHIPS	
		generateShips:function(ship){
			var direction = Math.floor(Math.random() * 2);
			var row,col;
			
			if(direction == 1){
				row = Math.floor(Math.random() * model.boardSize);
				col = Math.floor(Math.random() * (model.boardSize - ship.shipLength + 1));
				} else {
					col = Math.floor(Math.random() * model.boardSize);
					row = Math.floor(Math.random() * (model.boardSize - ship.shipLength + 1));
				
				}
				var newShiplocations = [];
				
				for(var i = 0; i<ship.shipLength; i++){
					if(direction === 1){
						newShiplocations.push("" + row + "" + (col + i));
						}else{
							newShiplocations.push("" +(row+i) + "" + col);
							}
					
					}
					return newShiplocations;
			},
/////////////////////////////////////////////////////////////////////COLISION!!!		
			collision: function(locations){
				
				if(turn == 0){
				for(var i = 0; i < model.numShips; i ++){
					var ship = model.ships1[i];
					for(var j = 0; j <locations.length; j++){
						
						var f = locations[j].charAt(1);
						var f1 = f;
						var f2 = f;
						if(f != 0) f1--;
						if(f != 9) f2++;
						var s = locations[j].charAt(0);
						var s1 = s;
						var s2 = s;
						if(s != 0) s1--;
						if(s != 9) s2++;
						
						var centre = s + "" + f;
						var up = s + "" + f1;
						var down = s + "" + f2;
						var left = s1 + "" + f;
						var right = s2 + "" + f;
						var d_left_up = s1 + "" + f1;
						var d_left_down = s1 + "" + f2;
						var d_right_up = s2 + "" + f1;
						var d_right_down = s2 + "" + f2;
						
						for(var k = 0;k<ship.shipLength;k++){
						if(ship.locations[k] == centre) return true;
						if(ship.locations[k] == up) return true;
						if(ship.locations[k] == down) return true;
						if(ship.locations[k] == left) return true;
						if(ship.locations[k] == right) return true;
						if(ship.locations[k] == d_left_up) return true;
						if(ship.locations[k] == d_left_down) return true;
						if(ship.locations[k] == d_right_up) return true;
						if(ship.locations[k] == d_right_down) return true;
						}
										
						if(ship.locations.indexOf(locations[j])>=0){
							return true;
							}
						}
					}
					return false;
				}	
				else if(turn == 1){
				for(var i = 0; i < model.numShips; i ++){
					var ship = model.ships2[i];
					for(var j = 0; j <locations.length; j++){
												
						var f = locations[j].charAt(1);
						var f1 = f;
						var f2 = f;
						if(f != 0) f1--;
						if(f != 9) f2++;
						var s = locations[j].charAt(0);
						var s1 = s;
						var s2 = s;
						if(s != 0) s1--;
						if(s != 9) s2++;
						
						var centre = s + "" + f;
						var up = s + "" + f1;
						var down = s + "" + f2;
						var left = s1 + "" + f;
						var right = s2 + "" + f;
						var d_left_up = s1 + "" + f1;
						var d_left_down = s1 + "" + f2;
						var d_right_up = s2 + "" + f1;
						var d_right_down = s2 + "" + f2;
						
						for(var k = 0;k<ship.shipLength;k++){
						if(ship.locations[k] == centre) return true;
						if(ship.locations[k] == up) return true;
						if(ship.locations[k] == down) return true;
						if(ship.locations[k] == left) return true;
						if(ship.locations[k] == right) return true;
						if(ship.locations[k] == d_left_up) return true;
						if(ship.locations[k] == d_left_down) return true;
						if(ship.locations[k] == d_right_up) return true;
						if(ship.locations[k] == d_right_down) return true;
						}
						
						if(ship.locations.indexOf(locations[j])>=0){
							return true;
							}
						}
					}
					return false;
				}	
				alert("Something went wrong!!!!");
			}
			
};


/////////////////////////////////////////////////////////////////////
var view = {
	displayMessage: function(msg){
		var cell = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
		},
/////////////////////////////////////////////////////////////////////DISPLAYING HIT		
	displayHit: function(locations){
		var cell;
		if(turn == 0){
		var hels = document.getElementsByClassName("board player2");
		for(var i = 0; i<hels.length; i++){
		var p = hels.item(i);
		if(p.id == locations) {cell = hels.item(i); break;}
		}
			}

		else if(turn == 1){
		var hels = document.getElementsByClassName("board player1");
		for(var i = 0; i<hels.length; i++){
		var p = hels.item(i);
		if(p.id == locations) {cell = hels.item(i); break;}
		}
			}
		
		cell.className+=" hit";
		cell.innerHTML=" ";
		cell.innerHTML="<img src=\"hit.png\" width=\"60\" height=\"60\" alt=\"as\" />";
		},
/////////////////////////////////////////////////////////////////////DISPLAYING MISS		
	displayMiss: function(locations){
		var cell;
			
		if(turn == 0){
		var hels = document.getElementsByClassName("board player2");
		for(var i = 0; i<hels.length; i++){
		var p = hels.item(i);
		if(p.id == locations) {cell = hels.item(i); break;}
		}
		}
		else if(turn == 1){
		var hels = document.getElementsByClassName("board player1");
		for(var i = 0; i<hels.length; i++){
		var p = hels.item(i);
		if(p.id == locations) {cell = hels.item(i); break;}
		}}
		
		if(turn == 0 && cell.className != "board player1 miss")
		cell.className+=" miss";
		if(turn == 1 && cell.className != "board player2 miss")
		cell.className+=" miss";
				
		/*if(turn == 0){
		var hels = document.getElementsByClassName("board player1");
		for(var i = 0; i<hels.length; i++){
		var p = hels.item(i);
		if(p.id == locations) {cell = hels.item(i); break;}
		}
		}
		else if(turn == 1){
		var hels = document.getElementsByClassName("board player2");
		for(var i = 0; i<hels.length; i++){
		var p = hels.item(i);
		if(p.id == locations) {cell = hels.item(i); break;}
		}}*/
		
		if(turn == 1)
		cell.innerHTML="<img src=\"miss3.png\" width=\"60\" height=\"60\" alt=\"as\" />";
		else if(turn == 0)
		cell.innerHTML="<img src=\"miss2.png\" width=\"60\" height=\"60\" alt=\"as\" />";
		}
	};
/////////////////////////////////////////////////////////////////////CATCHING GUESS	
var first_turn = 0;


var controller = {
	
	processGuess: function(guess){
		first_turn = 1;
		var locations = guess;
		if(locations == null) return null;
		var hit;

			if(turn == 0)
			model.guesses1++;
			else if(turn == 1) model.guesses2++;
			
			hit = model.fire(locations);
			
			if(turn == 0)
			if(hit && model.shipSunk1 == model.numShips){
				view.displayMessage(player1+ " won in: " + model.guesses1 + " guesses");
				for (var i = 0 ; i< model.numShips;i++)
						showShips(model.ships2[i]);
						document.body.style.backgroundImage = "url(Pozadina_pobeda.jpg)";
						alert("Game is finished!");
				}
			else if(turn == 1)
			if(hit && model.shipSunk2 == model.numShips){
				view.displayMessage(player2+ " won in: " + model.guesses2 + " guesses");
				for (var i = 0 ; i< model.numShips;i++)
						showShips(model.ships1[i]);
						document.body.style.backgroundImage = "url(Pozadina_pobeda.jpg)";
						alert("Game is finished!");
				}
			
		
		if(turn == 0 && hit) turn = 0;
			else if(turn == 0) {turn = 1;
			
				for (var i = 0 ; i< model.numShips;i++)
						showShips(model.ships2[i]);
				for (var i = 0 ; i< model.numShips;i++)
						hideShips(model.ships1[i]);
		
				
			}
		else if(turn == 1 && hit) turn = 1;
		
			else if(turn == 1){turn = 0;
			
				for (var i = 0 ; i< model.numShips;i++)
							showShips(model.ships1[i]);
				for (var i = 0 ; i< model.numShips;i++)
							hideShips(model.ships2[i]);
							
			}
		
		}
	
	};
/////////////////////////////////////////////////////////////////////SHOW_SHIPS
function showShips(ships){
	for(var i = 0; i< ships.shipLength;i++){
		var cell;
		
		var r = ships.locations[i].charAt(0);
		var k = ships.locations[i].charAt(1);
		var loc = "" + k+r;
				
				if(turn == 0){
				var hels = document.getElementsByClassName("board player1");
				for(var j = 0; j<hels.length; j++){
				var p = hels.item(j);
				if(p.id == loc) {cell = hels.item(j); break;}
				
				}
				//cell.className+=" show";
				if(ships.hits[i] != "hit")
				cell.innerHTML="<img src=\"ship1.png\" width=\"60\" height=\"60\" alt=\"as\" />";
				}
				
				else if (turn == 1){
				var hels = document.getElementsByClassName("board player2");
				for(var j = 0; j<hels.length; j++){
				var p = hels.item(j);
				if(p.id == loc) {cell = hels.item(j); break;}
	
				}
				if(ships.hits[i] != "hit")
					cell.innerHTML="<img src=\"ship2.png\" width=\"60\" height=\"60\" alt=\"as\" />";
				}
		}
	
	};	
/////////////////////////////////////////////////////////////////////HIDE_SHIPS
function hideShips(ships){
	for(var i = 0; i< ships.shipLength;i++){
			var cell;

			var r = ships.locations[i].charAt(0);
			var k = ships.locations[i].charAt(1);
			var loc = "" + k+r;
			
					if(turn == 0){
					var hels = document.getElementsByClassName("board player2");
						for(var j = 0; j<hels.length; j++){
						var p = hels.item(j);
						if(p.id == loc) {cell = hels.item(j); break;}
						
						}
					
						if(cell.className!="board player2 miss" && cell.className!="board player2 hit")
						cell.innerHTML=" ";
					}
				
					else if (turn == 1){
					var hels = document.getElementsByClassName("board player1");
						for(var j = 0; j<hels.length; j++){
						var p = hels.item(j);
						if(p.id == loc) {cell = hels.item(j); break;}
						
						}

						if(cell.className!="board player1 miss" && cell.className!="board player1 hit")
						cell.innerHTML=" ";
					}
		}
	
};
/////////////////////////////////////////////////////////////////////PARSING	
/*function parseGuess(guess){
	var alphabet = ["A","B","C","D","E","F","G","H","I","J"];
	if((guess ===null || guess.length<2)&& guess.length>3){
		alert("Enter a valid guess. Must be a letter and a number");
		}else{
			var firstChar = guess.charAt(0);
			var row = alphabet.indexOf(firstChar);
			if(guess.charAt(0) == "A" || guess.charAt(0) == "a") 
			row =0;
			var column = guess.charAt(1);
			var extra = guess.charAt(2);
			if(extra == '0') column = 10;
			else if(extra!= ""){alert("Input is not located on model board"); return null;}
			column = column-1;
			if(isNaN(row) || isNaN(column)){
					alert("Not a walid input");
			}else if(row<0 || row>= model.boardSize || column <0 || column>=model.boardSize){
				alert("Input is not located on model board");
				}else {
					return row+ "" +column;
					}
				
				
				}
				return null;
			};*/
/////////////////////////////////////////////////////////////////////FIRE_BUTTON		
function handleFireButton(){
	var guessFireButoon = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();
	
	controller.processGuess(guess);
	
	guessInput.value = "";
	};
	
/////////////////////////////////////////////////////////////////////KEY_PRESS_LISTENER
function handleKeyPress(e){
	
	if ( document.URL.includes("battleship-play") ) {
    var fireButton = document.getElementById("fireButton");
	e=e||window.event;
	
	if(e.keyCode ===13){
		e.preventDefault(); 
		fireButton.click();
		return false;
	}
}
else if(document.URL.includes("battleship-welcome")){
	var playButton = document.getElementById("playButton");
	e=e||window.event;
	
	if(e.keyCode==13){
		e.preventDefault();
		playButton.click();
		return false;
		}
	}
	
	
	
};

/////////////////////////////////////////////////////////////////////MOUSE_DOWN
function mouseClick(e){
	e = e||window.event;
	var elementId = (e.target || e.srcElement).id;
	var locflag = false;
	var againButton = document.getElementById("againButton");
	if ( document.URL.includes("battleship-game") ) {
		
	if(elementId == againButton.id) {againButton.click(); return null;}
	
	if(turn == 1){
		var hels = document.getElementsByClassName("board player1");
		for(var j = 0; j<hels.length; j++){
		var p = hels.item(j);
		if(elementId == p.id) {locflag = true; break;}
		}

		if(locflag == true){
		var r = elementId.charAt(0);
		var k = elementId.charAt(1);
		var loc = "" + k+r;
		controller.processGuess(loc);
		}
		
	}else if(turn == 0){
		var hels = document.getElementsByClassName("board player2");
		for(var j = 0; j<hels.length; j++){
		var p = hels.item(j);
		if(elementId == p.id) {locflag = true; break;}
		}

		if(locflag == true){
		var r = elementId.charAt(0);
		var k = elementId.charAt(1);
		var loc = "" + k+r;
		controller.processGuess(loc);
		}}
		
	}
	}
/////////////////////////////////////////////////////////////////////MOUSE_UP	
function mouseRelese(e){
	e = e||window.event;
	var elementId = (e.target || e.srcElement).id;
	
	}

/////////////////////////////////////////////////////////////////////SELECT

function selectBoat(){
	
	
	}


/////////////////////////////////////////////////////////////////////LISTENERS_INCLUDE
document.addEventListener("keydown",handleKeyPress,false);
document.addEventListener("mousedown",mouseClick,false);
document.addEventListener("mouseup",mouseRelese,false);




/////////////////////////////////////////////////////////////////////INITIALIZE
function init(){
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	

	
	var guessInput = document.getElementById("guessInput");
	//guessInput.generateShiplocations();
	model.generateShiplocations();
	
		if(first_turn == 0){
for (var i = 0 ; i< model.numShips;i++)
showShips(model.ships1[i]);}
	};

/////////////////////////////////////////////////////////////////////BEGINING
function start(){
//SETUP
if ( document.URL.includes("battleship-game") ) {
    init();
}
//WELCOME
else if(document.URL.includes("battleship-welcome")){
	
	}
//SETUP
else if(document.URL.includes("battleship-setup")){
	
	}
	
};


/////////////////////////////////////////////////////////////////////WELCOME_START_CHECK_SEQUENCE
function checkup(player){
	var name = player;
	if (! /^[a-zA-Z0-9_]+$/.test(name)) {
		
    return false;
}
if(name.length>=3 && name.length<=15)
return true;
return false;
	}


var player1 = localStorage.getItem('Igrac1'),
player2 =localStorage.getItem('Igrac2');

function playPress(){
	localStorage.setItem('Igrac1',document.getElementById("Player1_name").value);
	localStorage.setItem('Igrac2',document.getElementById("Player2_name").value);
	player1 = document.getElementById("Player1_name");
	player2 = document.getElementById("Player2_name");
	if(!checkup(player1.value))
	alert("unacceptable name for player1! Must contain more than 3 and less then 10 letters,numbers or '_'");
	else if(!checkup(player2.value))
	alert("unacceptable name for player2! Must contain more than 3 and less then 15 letters,numbers or '_'");
	else
	window.location.href = 'battleship-game.html';
	
	}
////WELCOME_END
	
	window.onload = start;
	

  var x = document.getElementById("guessInput");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  
   var x = document.getElementById("fireButton");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
	
	
	
	
	
	
	