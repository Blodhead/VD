/*var counter = 60;
var interval = setInterval(function() {
    counter--;
    // Display 'counter' wherever you want to display it.
    if (counter <= 0) {
     		clearInterval(interval);
      	$('#timer').html("<h3>Count down complete</h3>");  
        return;
    }else{
    	$('#time').text(counter);
    }
}, 1000);*/

var znak = ["Skoocko", "Kordun", "Lika", "Banija", "Slavonija", "RS"];

var model = {

    combination1:[
        {location:[0,0,0,0]}
    ],
    combination2:[
        {location:[0,0,0,0]}
    ],

///////////////////////////////////////////////////////////

}

var p1Flag;
var p2Flag;
//////////////////////////////////////////////////////////

function start(){
    //SETUP
        init();
};




///////////////////////////////////////////////////////////

function init(){
    
	var player1Button = document.getElementById("Cvarak");
    var player2Button = document.getElementById("Bosko");

    player1Button.addEventListener("click", setP1);
    player2Button.addEventListener("click", setP2);

	//var i1=localStorage.getItem("names1");
	//var i2=localStorage.getItem("names2");
	
	//model.ships1 = JSON.parse(i1);
	//model.ships2 = JSON.parse(i2);
	
/*if(first_turn == 0){
for (var i = 0 ; i< model.numShips;i++)
showShips(model.ships2[i]);}*/

};

///////////////////////////////////////////////////////////

function setP1() {
    p2Flag = 1;

    if((p1Flag == true) && (p2Flag == true))
    window.location.href = "../html/skocko-igra.html";

}

function setP2() {
    p1Flag = 1;

    if((p1Flag == true) && (p2Flag == true))
    window.location.href = "../html/skocko-igra.html";

}

window.onload = start;