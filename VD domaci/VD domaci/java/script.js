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


///////////////// START - INITIALIZATION //////////////////



function start(){
    //SETUP

    if(window.location.href.includes('skocko-uputstvo.htm'))
        initUputstvo();
        else if(window.location.href.includes('skocko-igra.html'))
        initIgra();
        else initPodesavanja();
    
    
};

////////////////////// UPUTSTVO //////////////////////////

var p1Flag;
var p2Flag;

function initUputstvo(){

    document.getElementById("Cvarak").addEventListener("click", setP1);
    document.getElementById("Bosko").addEventListener("click", setP2);

	//var i1=localStorage.getItem("names1");
	//var i2=localStorage.getItem("names2");
	
	//model.ships1 = JSON.parse(i1);
	//model.ships2 = JSON.parse(i2);

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

///////////////////// PODESAVANJA /////////////////////////

var cvarkov = [0,0,0,0]
var bosko = [0,0,0,0]

function initPodesavanja(){



}

///////////////////////// IGRA ////////////////////////////

var timer = 60;

function initIgra(){
    
    document.getElementById('Start').addEventListener('click', startTimer);
    document.getElementById('NovaIgra').addEventListener('click', newGame);
}


///////////////////////////////////////////////////////////
                /////// TIMER ///////

function startTimer() {

    min = parseInt(timer);

    if (timer < 1) {
        document.getElementById('time-left').innerHTML = "Време истекло!";
        document.getElementById("time").innerHTML = min.toString();
        return;
    }

    document.getElementById("time").innerHTML = min.toString();
    timer--;

    setTimeout(function () {
        startTimer();
    }, 1000);

}

function resetTimer(){

    document.getElementById('time-left').innerHTML = "Преостало време за погађање:";
    document.getElementById("time").innerHTML = min.toString();
    timer = 60;

}

///////////////////////////////////////////////////////////

function newGame(){
    //DON'T FORGET TO CHANGE LOCAL STORAGE!!!!!
    window.location.href = "../html/skocko-podesavanja.html";
}

///////////////////////////////////////////////////////////
window.onload = start;
///////////////////////////////////////////////////////////