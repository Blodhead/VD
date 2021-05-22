var turn=0;
var exceptionturn = 0;
var model = {
	boardSize: 10,
	numShips:10,
	
	shipSunk1:0,
	guesses1:0,
	shipSunk2:0,
	guesses2:0,
	
	s14:1,
	s13:2,
	s12:3,
	s11:4,
	
	s24:1,
	s23:2,
	s22:3,
	s21:4,
	
	ships1: [
		{locations:[0,0,0,0],hits:["","","","",],shipLength:4,init:false},
		{locations:[0,0,0],hits:["","","",],shipLength:3,init:false},
		{locations:[0,0,0],hits:["","","",],shipLength:3,init:false},
		{locations:[0,0],hits:["","",],shipLength:2,init:false},
		{locations:[0,0],hits:["","",],shipLength:2,init:false},
		{locations:[0,0],hits:["","",],shipLength:2,init:false},
		{locations:[0],hits:["",],shipLength:1,init:false},
		{locations:[0],hits:["",],shipLength:1,init:false},
		{locations:[0],hits:["",],shipLength:1,init:false},
		{locations:[0],hits:["",],shipLength:1,init:false}
	],
	
	ships2: [
		{locations:[0,0,0,0],hits:["","","","",],shipLength:4,init:false},
		{locations:[0,0,0],hits:["","","",],shipLength:3,init:false},
		{locations:[0,0,0],hits:["","","",],shipLength:3,init:false},
		{locations:[0,0],hits:["","",],shipLength:2,init:false},
		{locations:[0,0],hits:["","",],shipLength:2,init:false},
		{locations:[0,0],hits:["","",],shipLength:2,init:false},
		{locations:[0],hits:["",],shipLength:1,init:false},
		{locations:[0],hits:["",],shipLength:1,init:false},
		{locations:[0],hits:["",],shipLength:1,init:false},
		{locations:[0],hits:["",],shipLength:1,init:false}
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
					if(model.ships2[i].locations[index] == loc) {flag = 1; break loop1;}
					
			}
			    /////DOHVATA KOJI JE (INDEKS) U NIZU ODREDJENOG BRODA (I) JEDNAK UNETOJ VREDNOSTI I POSTAVLJA (FLEG) NA 1 AKO POSTOJI, AKO NE ONDA NA 0

                var i = x;
				var cell;
				
				var hels = document.getElementsByClassName("board player2");
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
					if(model.ships1[i].locations[index] == loc) {flag = 1; break loop2;}
					
			}
				var i = x;
				var hels = document.getElementsByClassName("board player1");
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
	generateShiplocations: function(x,y,len,dir){
		var locations = 0;
		
		///////////////////Player1
		if(turn == 0){//ne zaboravi da setujes turn na 1

				locations = model.generateShips(x,y,len,dir);
				if(model.collision(locations)) {
					alert("There is a ship nearby");
					return;
					}
				switch (len){
					case 4: if(model.s14<=0){alert("No more ships of this length"); return null;}
							else model.s14--;
							model.ships1[model.s14].locations = locations;
							showShips(model.ships1[model.s14]);
							model.ships1[model.s14].init=true;
							var strings = "There are "+model.s14 + " lenght of 4<br/> "+
							"There are "+model.s13 + " lenght of 3<br/> "+
							"There are "+model.s12 + " lenght of 2<br/> "+
							"There are "+model.s11 + " lenght of 1<br/> ";
							document.getElementById("paragraf").innerHTML = strings;
							break;
							
					case 3: if(model.s13<=0){alert("No more ships of this length"); return null;}
							else model.s13--;
							model.ships1[model.s13+1].locations = locations;
							showShips(model.ships1[model.s13+1]);
							model.ships1[model.s13+1].init=true;
							var strings = "There are "+model.s14 + " lenght of 4<br/> "+
							"There are "+model.s13 + " lenght of 3<br/> "+
							"There are "+model.s12 + " lenght of 2<br/> "+
							"There are "+model.s11 + " lenght of 1<br/> ";
							document.getElementById("paragraf").innerHTML = strings;
							break;
					
					case 2: if(model.s12<=0){alert("No more ships of this length"); return null;}
							else model.s12--;
							model.ships1[model.s12+3].locations = locations;
							showShips(model.ships1[model.s12+3]);
							model.ships1[model.s12+3].init=true;
							var strings = "There are "+model.s14 + " lenght of 4<br/> "+
							"There are "+model.s13 + " lenght of 3<br/> "+
							"There are "+model.s12 + " lenght of 2<br/> "+
							"There are "+model.s11 + " lenght of 1<br/> ";
							document.getElementById("paragraf").innerHTML = strings;
							break
					
					case 1: if(model.s11<=0){alert("No more ships of this length"); return null;}
							else model.s11--;
							model.ships1[model.s11+6].locations = locations;
							showShips(model.ships1[model.s11+6]);
							model.ships1[model.s11+6].init=true;
							var strings = "There are "+model.s14 + " lenght of 4<br/> "+
							"There are "+model.s13 + " lenght of 3<br/> "+
							"There are "+model.s12 + " lenght of 2<br/> "+
							"There are "+model.s11 + " lenght of 1<br/> "; 
							document.getElementById("paragraf").innerHTML = strings;
							break;
					
					default: alert("Something went wrong...");break;
					}
				
			

		}
		///////////////////Player2
		if(turn == 1){
		locations = model.generateShips(x,y,len,dir);
				if(model.collision(locations)) {
					alert("There is a ship nearby");
					return;
					}
				switch (len){
					case 4: if(model.s24<=0){alert("No more ships of this length"); return null;}
							else model.s24--;
							model.ships2[model.s24].locations = locations;
							showShips(model.ships2[model.s24]);
							model.ships2[model.s24].init=true;
							var strings = "There are "+model.s24 + " lenght of 4<br/> "+
							"There are "+model.s23 + " lenght of 3<br/> "+
							"There are "+model.s22 + " lenght of 2<br/> "+
							"There are "+model.s21 + " lenght of 1<br/> ";
							document.getElementById("paragraf").innerHTML = strings;
							break;
							
					case 3: if(model.s23<=0){alert("No more ships of this length"); return null;}
							else model.s23--;
							model.ships2[model.s23+1].locations = locations;
							showShips(model.ships2[model.s23+1]);
							model.ships2[model.s23+1].init=true;
							var strings = "There are "+model.s24 + " lenght of 4<br/> "+
							"There are "+model.s23 + " lenght of 3<br/> "+
							"There are "+model.s22 + " lenght of 2<br/> "+
							"There are "+model.s21 + " lenght of 1<br/> ";
							document.getElementById("paragraf").innerHTML = strings;
							break;
					
					case 2: if(model.s22<=0){alert("No more ships of this length"); return null;}
							else model.s22--;
							model.ships2[model.s22+3].locations = locations;
							showShips(model.ships2[model.s22+3]);
							model.ships2[model.s22+3].init=true;
							var strings = "There are "+model.s24 + " lenght of 4<br/> "+
							"There are "+model.s23 + " lenght of 3<br/> "+
							"There are "+model.s22 + " lenght of 2<br/> "+
							"There are "+model.s21 + " lenght of 1<br/> ";
							document.getElementById("paragraf").innerHTML = strings;
							break
					
					case 1: if(model.s21<=0){alert("No more ships of this length"); return null;}
							else model.s21--;
							model.ships2[model.s21+6].locations = locations;
							showShips(model.ships2[model.s21+6]);
							model.ships2[model.s21+6].init=true;
							var strings = "There are "+model.s24 + " lenght of 4<br/> "+
							"There are "+model.s23 + " lenght of 3<br/> "+
							"There are "+model.s22 + " lenght of 2<br/> "+
							"There are "+model.s21 + " lenght of 1<br/> "; 
							document.getElementById("paragraf").innerHTML = strings;
							break;
							
					default: alert("Something went wrong...");break;
					}
				
			
		}


		},
/////////////////////////////////////////////////////////////////////GENERATE SHIPS	
		generateShips:function(x,y,len,dir){
			var direction = dir;
			var row = x;
			var col = y;
			
				var newShiplocations = [];
				
				for(var i = 0; i<len; i++){
					if(direction == 1){
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
						
						if(ship.init == true)
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
						
						if(ship.init == true)
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
		cell.innerHTML="<img src=\"battleship-assets/hit.png\" width=\"60\" height=\"60\" alt=\"as\" />";
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

		if(turn == 1)
		cell.innerHTML="<img src=\"battleship-assets/miss3.png\" width=\"60\" height=\"60\" alt=\"as\" />";
		else if(turn == 0)
		cell.innerHTML="<img src=\"battleship-assets/miss2.png\" width=\"60\" height=\"60\" alt=\"as\" />";
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
			

			if(hit && model.shipSunk1 == model.numShips){
				view.displayMessage(player1+ " won in: " + model.guesses1 + " guesses");
				for (var i = 0 ; i< model.numShips;i++)
						showShips(model.ships2[i]);
						document.body.style.backgroundImage = "url(battleship-assets/Pozadina_pobeda.jpg)";
						alert("Game is finished!");
				}

			if(hit && model.shipSunk2 == model.numShips){
				view.displayMessage(player2+ " won in: " + model.guesses2 + " guesses");
				for (var i = 0 ; i< model.numShips;i++)
						showShips(model.ships1[i]);
						document.body.style.backgroundImage = "url(battleship-assets/Pozadina_pobeda.jpg)";
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

				if(turn == 0){
				var hels = document.getElementsByClassName("board player1");
				for(var j = 0; j<hels.length; j++){
				var p = hels.item(j);
				if(p.id == ships.locations[i]) {cell = hels.item(j); break;}
				
				}
				//cell.className+=" show";
				if(ships.hits[i] != "hit")
				cell.innerHTML="<img src=\"battleship-assets/ship1.png\" width=\"60\" height=\"60\" alt=\"as\" />";
				}
				
				else if (turn == 1){
				var hels = document.getElementsByClassName("board player2");
				for(var j = 0; j<hels.length; j++){
				var p = hels.item(j);
				if(p.id == ships.locations[i]) {cell = hels.item(j); break;}
	
				}
				if(ships.hits[i] != "hit")
					cell.innerHTML="<img src=\"battleship-assets/ship2.png\" width=\"60\" height=\"60\" alt=\"as\" />";
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
						if(p.id == ships.locations[i]) {cell = hels.item(j); break;}
						
						}
						
					if(document.URL.includes("battleship-setup")){
						var hels = document.getElementsByClassName("board player1");
							for(var j = 0; j<hels.length; j++){
							var p = hels.item(j);
							cell = hels.item(j);
							cell.innerHTML=" ";
							}
						
						}
						else{
						if(cell.className!="board player2 miss" && cell.className!="board player2 hit")
						cell.innerHTML=" ";}
					}
				
					else if (turn == 1){
					var hels = document.getElementsByClassName("board player1");
						for(var j = 0; j<hels.length; j++){
						var p = hels.item(j);
						if(p.id == ships.locations[i]) {cell = hels.item(j); break;}
						
						}

						if(document.URL.includes("battleship-setup")){
						var hels = document.getElementsByClassName("board player2");
							for(var j = 0; j<hels.length; j++){
							var p = hels.item(j);
							cell = hels.item(j);
							cell.innerHTML=" ";
							}
						}
						else{
						if(cell.className!="board player1 miss" && cell.className!="board player1 hit")
						cell.innerHTML=" ";}
					}
		}
	
};
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
	var elemClass = (e.target || e.srcElement).class;
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
		
	}else if(document.URL.includes("battleship-setup")){
		
		mouseDownId = elementId;
		
		
		}
	}
	
var mouseDownId,mouseUpId;
	
/////////////////////////////////////////////////////////////////////MOUSE_UP	
function mouseRelese(e){
	e = e||window.event;
	var elementId = (e.target || e.srcElement).id;
	mouseUpId = elementId;
	var locflag = false;
	
	if(document.URL.includes("battleship-setup")){
	if(turn == 0){
	var hels = document.getElementsByClassName("board player1");
		for(var j = 0; j<hels.length; j++){
		var p = hels.item(j);
		if(elementId == p.id) {locflag = true; break;}
		}
	}
	
	if(turn == 1){
	var hels = document.getElementsByClassName("board player2");
		for(var j = 0; j<hels.length; j++){
		var p = hels.item(j);
		if(elementId == p.id) {locflag = true; break;}
		}
	}
		
		
	if(locflag == true)
	selectBoat();
	
	
	if(model.s11==0 && model.s12==0 && model.s13 == 0 && model.s14 == 0 && turn == 0){
			for (var i = 0 ; i< model.numShips;i++)
			hideShips(model.ships1[i]);
		turn = 1;
		var hels = document.getElementsByClassName("board player1");
			for(var j = 0; j<100; j++)
			hels.item(0).className = "board player2";
		
		
	}
		
		
	if(model.s21==0 && model.s22==0 && model.s23 == 0 && model.s24 == 0 && turn == 1){
		
	

			names1 = model.ships1;
			names2 = model.ships2;
			
			localStorage.setItem("names1", JSON.stringify(names1));
			localStorage.setItem("names2", JSON.stringify(names2));
			
		
		
		window.location.href = 'battleship-game.html';	}
	}
	else if(document.URL.includes("battleship-game")){}
	}

/////////////////////////////////////////////////////////////////////SELECT
var names1 = [];
var names2 = [];
var row, column;
function selectBoat(){
	var d1 = parseInt(mouseDownId.charAt(0));
	var d2 = parseInt(mouseDownId.charAt(1));
	var u1 = parseInt(mouseUpId.charAt(0));
	var u2 = parseInt(mouseUpId.charAt(1));
	var temp = 0;
	
	
	if(d1 == u1){

		temp = Math.abs(d2-(u2));
		switch(temp+1) {
			case 4:model.generateShiplocations(d1,d2,4,1);break;
			case 3:model.generateShiplocations(d1,d2,3,1);break;
			case 2:model.generateShiplocations(d1,d2,2,1);break;
			case 1:model.generateShiplocations(d1,d2,1,1);break;
			default: alert("Ship too large"); break;
			}
		}
	else if(d2 == u2){

		temp = Math.abs(d1-(u1));
		switch(temp+1) {
			case 4:model.generateShiplocations(d1,d2,4,0);break;
			case 3:model.generateShiplocations(d1,d2,3,0);break;
			case 2:model.generateShiplocations(d1,d2,2,0);break;
			case 1:model.generateShiplocations(d1,d2,1,0);break;
			default: alert("Ship too large"); break;
			}
		
		}
	else{
		alert("Input not valid!");
		return null;
		}
	
	
	
	}


/////////////////////////////////////////////////////////////////////LISTENERS_INCLUDE
document.addEventListener("keydown",handleKeyPress,false);
document.addEventListener("mousedown",mouseClick,false);
document.addEventListener("mouseup",mouseRelese,false);




/////////////////////////////////////////////////////////////////////INITIALIZE
function init(){
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	
	turn = 1;
	
	var i1=localStorage.getItem("names1");
	var i2=localStorage.getItem("names2");
	
	model.ships1 = JSON.parse(i1);
	model.ships2 = JSON.parse(i2);
	
		if(first_turn == 0){
for (var i = 0 ; i< model.numShips;i++)
showShips(model.ships2[i]);}
	};

/////////////////////////////////////////////////////////////////////BEGINING
function start(){
//SETUP
if ( document.URL.includes("battleship-game") ) {
	turn = 1;
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
	window.location.href = 'battleship-setup.html';
	
	}
////WELCOME_END
	
	window.onload = start;
	


	
	
	
	
	