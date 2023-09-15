function elaboraDifficolta(){
    var difficolta = document.getElementById("difficolta").value;
    var itable = 0;
    var ntable = 0;
    switch(difficolta){
        case "principiante":
            itable = 10;
            ntable = 10;
            break;
        case "dilettante":
            itable = 12;
            ntable = 10;
            break;
        case "esperto":
            itable = 15;
            ntable = 10;
            break;
        case "leggenda":
            itable = 20;
            ntable = 20;
            break;
    }
    return [itable, ntable];
}

function generaTabella(){
    var [itable, ntable] = elaboraDifficolta();
    var table = "<table>";
    for (let i = 0; i < itable; i++) {
        table += "<tr>";
        for (let n = 0; n < ntable; n++) {
            table += "<td class='cella'></td>";
        }
        table += "</tr>";
    }
    document.getElementById("table").innerHTML = table;
    popolaTabella();
}

function popolaTabella() {
    /*var parole;
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        console.log(this.responseText[i]);
    }
    xhttp.open("GET", "280000_parole_italiane.txt");
    xhttp.send();


    console.log(parole);*/
    var [x, y] = elaboraDifficolta();
    var parole = ["ciao", "abbagliava", "pippa", "zuppa", "fascia",
                    "prova", "buongiorno", "ciupilan"]
    var contenuto = [x];

    for (let i = 0; i < x; i++) {
    contenuto[i] = new Array(y);
    }
    
    // orizzontale
    for (let j = 0; j < parole.length; j++) {
        var recalc = false;
        var lettere = parole[j].split("");
        // deve iniziare in una posiziona in cui ci stia tutta la parola 
        var posX = parseInt(Math.random()*(y-lettere.length));
        var posY = parseInt(Math.random()*x);
        console.log( posX +" "+ posY);
        for (let m = 0; m < lettere.length; m++) {
            for (let i = 0; i < contenuto.length; i++) {
                for (let n = 0; n < contenuto[i].length; n++) {
                    
                    if(i == posY && n == posX){
                        // non si deve sovrapporre
                        if (contenuto[i][n] == null) {
                             contenuto[i][n] = lettere[m];
                             
                        }else{
                            for (let g = m; g > 0; g--) {
                                contenuto[i][n] = null;
                                n--;
                                recalc = true;
                                
                            }
                        }
                    }
                
                }
            }
            if(recalc){
                j--;
                break;
            }
            posX++;
        }
        
    }
    console.log(contenuto);
}


