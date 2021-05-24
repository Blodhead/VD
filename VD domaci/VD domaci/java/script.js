///////////////////////////////////////////////////////////

pobeda = "Torbica"

cvarci = 0;
boskici = 0;

var model = {
    
    matrix : [

    {pokusaj : [0,0,0,0], pogodak : [0,0,0,0], cnt : 0},
    {pokusaj : [0,0,0,0], pogodak : [0,0,0,0], cnt : 0},
    {pokusaj : [0,0,0,0], pogodak : [0,0,0,0], cnt : 0},
    {pokusaj : [0,0,0,0], pogodak : [0,0,0,0], cnt : 0},
    {pokusaj : [0,0,0,0], pogodak : [0,0,0,0], cnt : 0},
    {pokusaj : [0,0,0,0], pogodak : [0,0,0,0], cnt : 0},
    {pokusaj : [0,0,0,0], pogodak : [0,0,0,0], cnt : 0},

]
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

};

///////////////////////////////////////////////////////////

function setP1() {
    p2Flag = 1;

    if((p1Flag == true) && (p2Flag == true))
    window.location.href = "../html/skocko-podesavanja.html";

}

function setP2() {
    p1Flag = 1;

    if((p1Flag == true) && (p2Flag == true))
    window.location.href = "../html/skocko-podesavanja.html";

}

///////////////////// PODESAVANJA /////////////////////////

var cvarkov = [0,0,0,0]
var boskic = [0,0,0,0]

var turn = "Cvarkov"

function initPodesavanja(){

    document.getElementById('Skocko').addEventListener('click',addElement);
    document.getElementById('Kordun').addEventListener('click',addElement);
    document.getElementById('Lika').addEventListener('click',addElement);
    document.getElementById('Banija').addEventListener('click',addElement);
    document.getElementById('Slavonija').addEventListener('click',addElement);
    document.getElementById('RepublikaRrspka').addEventListener('click',addElement);

    document.getElementById('Potvrdi').addEventListener('click',endTurn);

}
///////////////////////////////////////////////////////////

function addElement(){

    var icon = this.id; 

    switch(turn){

        case "Cvarkov":{

            for(var i = 0; i < 4; i++){

                if(cvarkov[i] == 0){
                    cvarkov[i] = this.id;
                    document.getElementById('n' + (i+1)).innerHTML = "<img class=\"icons\" id=" + (i+1) + " onclick=\"\" src=\"../Images/" + icon + ".png\" alt=\"\">"
                    document.getElementById(i+1).addEventListener('click',removeElement);
                    break;
                }

            }
            break;
        }
        case "Boskic":{

            for(var i = 0; i < 4; i++){

                if(boskic[i] == 0){
                    boskic[i] = this.id;
                    document.getElementById('n' + (i+1)).innerHTML = "<img class=\"icons\" id=" + (i+1) + " onclick=\"\" src=\"../Images/" + icon + ".png\" alt=\"\">"
                    document.getElementById(i+1).addEventListener('click',removeElement);
                    break;
                }

            }
            break;
        }
    }

}

///////////////////////////////////////////////////////////

function removeElement(){

    if(turn == "Cvarkov"){
        cvarkov[(parseInt(this.id)-1)] = 0;
        document.getElementById('n' + this.id).innerHTML = "";
    }
    else if(turn == "Boskic"){
        boskic[(parseInt(this.id)-1)] = 0;
        document.getElementById('n' + this.id).innerHTML = "";
    }

}

///////////////////////////////////////////////////////////

function endTurn(){

    if(turn == "Cvarkov") {

        if(isFull(cvarkov) == true)
        turn = "Boskic";
        else {alert("Чварков, унесите све ознаке, немојте се зафркавати...");return;}

    }
    else {
        if(isFull(boskic) == true)
        turn = "Cvarkov";
        else {alert("Бошкић, унесите све знакове!"); return;}
        } 

    for(var i = 0; i < 4; i++){
        //mora i za citavu matricu da radi!!!!!
        document.getElementById('n' + (i+1)).innerHTML =  "" ;

    }

    if(isFull(cvarkov) && isFull(boskic)){ ////ekskluzivno za ekran za podesavanja

        localStorage.setItem('Igrac1', JSON.stringify(cvarkov));
        localStorage.setItem('Igrac2', JSON.stringify(boskic));

        document.getElementById('Skocko').removeEventListener('click',addElement);
        document.getElementById('Kordun').removeEventListener('click',addElement);
        document.getElementById('Lika').removeEventListener('click',addElement);
        document.getElementById('Banija').removeEventListener('click',addElement);
        document.getElementById('Slavonija').removeEventListener('click',addElement);
        document.getElementById('RepublikaRrspka').removeEventListener('click',addElement);
    
        document.getElementById('Potvrdi').removeEventListener('click',endTurn);

        window.location.href = "../html/skocko-igra.html";

    }

}

///////////////////////////////////////////////////////////

function isFull(arr){

    for(var i = 0; i < arr.length ; i++){

        if(arr[i] == 0) return false;

    }

    return true;

}

///////////////////////// IGRA ////////////////////////////

var timer = 60;

var row = 0,col = 0;

function initIgra(){
    
    document.getElementById('Start').addEventListener('click', startTimer);
    document.getElementById('NovaIgra').addEventListener('click', newGame);

    cvarkov = JSON.parse(localStorage.getItem('Igrac1'));
    boskic = JSON.parse(localStorage.getItem('Igrac2'));

    document.getElementById('Skocko1').addEventListener('click',addSign);
    document.getElementById('Kordun1').addEventListener('click',addSign);
    document.getElementById('Lika1').addEventListener('click',addSign);
    document.getElementById('Banija1').addEventListener('click',addSign);
    document.getElementById('Slavonija1').addEventListener('click',addSign);
    document.getElementById('RepublikaRrspka1').addEventListener('click',addSign);

    document.getElementById('dd0').addEventListener('click',check);
    document.getElementById('dd1').addEventListener('click',check);
    document.getElementById('dd2').addEventListener('click',check);
    document.getElementById('dd3').addEventListener('click',check);
    document.getElementById('dd4').addEventListener('click',check);
    document.getElementById('dd5').addEventListener('click',check);
    document.getElementById('dd6').addEventListener('click',check);

}

///////////////////////////////////////////////////////////

function addSign(){

    var icon = this.id; 

    //switch(turn){

        //case "Cvarkov":{

            for(var i = 0; i < 4; i++){

                if(model.matrix[row].pokusaj[i] == 0){
                    icon = icon.slice(0,-1);
                    model.matrix[row].pokusaj[i] = icon;
                    document.getElementById(""+ row + i).innerHTML = "<img class=\"icons\" id="+ "2" + row + (i+1) +" onclick=\"\" src=\"../Images/" + icon + ".png\" alt=\"\">"
                    document.getElementById("2" + row + (i+1)).addEventListener('click',removeSign);
                    break;
                }

            }
 //           break;
  //      }
   /*     case "Boskic":{

            for(var i = 0; i < 4; i++){

                if(boskic[i] == 0){
                    icon = icon.slice(0,-1);
                    model.matrix[row].pokusaj[i] = icon;
                    document.getElementById(""+ row + i).innerHTML = "<img class=\"icons\" id="+ (i+1) +" onclick=\"\" src=\"../Images/" + icon + ".png\" alt=\"\">"
                    document.getElementById("" + (i+1)).addEventListener('click',removeSign);
                    break;
                }

            }
            break;
        }*/
    //}


}
///////////////////////////////////////////////////////////

function removeSign(){

    document.getElementById(this.id).removeEventListener('click',removeSign);
    document.getElementById(""+ row + (parseInt(this.id)- parseInt("2" + row + "1"))).innerHTML = "";
    model.matrix[row].pokusaj[parseInt(this.id)-parseInt("2" + row + "1")] = 0;

}


///////////////////////////////////////////////////////////
function check(){ 
    col = 0;
    var temp = 0;
    switch(turn){

        case "Cvarkov":{

            for(var i = 0; i < 4; i++){

                if(model.matrix[row].pokusaj[i] == cvarkov[i]) {model.matrix[row].pogodak[i] = 1; temp++;}
                else model.matrix[row].pogodak[i] = 0;

            }

            for(var i = 0; i < 4; i++){
                for(var j = 0; j < 4; j++){

                    if(model.matrix[row].pogodak[i] == 1) break;
                    if(model.matrix[row].pokusaj[i] == cvarkov[j])
                    model.matrix[row].pogodak[i] = 2;

                }
            }
            var j = 0;
            for(var i = 0 ; i < 4 ; i++){
                
                if(model.matrix[row].pogodak[i] == 1){
                    document.getElementById('1' + row + i).style.backgroundColor = "red";
                    j++;
                }
                else if(model.matrix[row].pogodak[i] == 2)
                    document.getElementById('1' + row + j).style.backgroundColor = "yellow";
            }

            document.getElementById("dd" + row).disabled = true;

            row++;

            break;
            
        }
        case "Boskic":{

            for(var i = 0; i < 4; i++){

                if(model.matrix[row].pokusaj[i] == boskic[i]) {model.matrix[row].pogodak[i] = 1; temp++;}
                else model.matrix[row].pogodak[i] = 0;

            }

            for(var i = 0; i < 4; i++){
                for(var j = 0; j < 4; j++){

                    if(model.matrix[row].pogodak[i] == 1) break;
                    if(model.matrix[row].pokusaj[i] == boskic[j])
                    model.matrix[row].pogodak[i] = 2;

                }
            }
            var j = 0;
            for(var i = 0 ; i < 4 ; i++){
                
                if(model.matrix[row].pogodak[i] == 1){
                    document.getElementById('1' + row + i).style.backgroundColor = "red";
                    j++;
                }
                else if(model.matrix[row].pogodak[i] == 2)
                    document.getElementById('1' + row + j).style.backgroundColor = "yellow";
            }

            document.getElementById("dd" + row).disabled = true;

            row++;

            break;
        }
    }


}

///////////////////////////////////////////////////////////
                /////// TIMER ///////
///////////////////////////////////////////////////////////

function startTimer() {

    min = parseInt(timer);

    if (timer < 1) {
        document.getElementById('time-left').innerHTML = "Време је истекло!";
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

    localStorage.setItem('Igrac1',0);
    localStorage.setItem('Igrac1',0);
    
    window.location.href = "../html/skocko-podesavanja.html";
}

function endGame(){


    if(pobeda == "Boskic"){

        var x = document.createElement("VIDEO");

        x.setAttribute("src","../video/Boskic pobeda.mp4");

        x.setAttribute("width", "320");
        x.setAttribute("height", "240");
        x.setAttribute("controls", "controls");
        document.body.appendChild(x);

    }
    else if(pobeda == "Cvarkov"){

        var x = document.createElement("VIDEO");

        x.setAttribute("src","../video/Boskic pobeda.mp4"); //ko gubi ima pravo da se ljuti video

        x.setAttribute("width", "320");
        x.setAttribute("height", "240");
        x.setAttribute("controls", "controls");
        document.body.appendChild(x);

    } 
}


///////////////////////////////////////////////////////////
window.onload = start;
///////////////////////////////////////////////////////////