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
    var tabella = document.getElementById("table");
    tabella.innerHTML = table;
    tabella.style.borderWidth = "2px";
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
    var [altezza, larghezza] = elaboraDifficolta();
    var parole = ["ciao", "abbagliava", "pippa", "zuppa", "fascia",
                    "prova", "ciupilan"]
    var contenuto = [altezza];

    for (let i = 0; i < altezza; i++) {
        contenuto[i] = new Array(larghezza);
        for (let n = 0; n < larghezza; n++) {
            contenuto[i][n] = null;
        }
    }
    
    
    for (let j = 0; j < parole.length; j++) {
        var recalc = false;
        var lettere = parole[j].toUpperCase().split("");
        var direction = parseInt(Math.random()*8);

        if(direction == 0 || direction == 1){ // orizzontale
            // deve iniziare in una posiziona in cui ci stia tutta la parola 
            var posX = parseInt(Math.random()*(larghezza+1-lettere.length));
            var posY = parseInt(Math.random()*altezza);
            var memoryX = -1;
            if(direction == 1){ // invertito
                lettere.reverse();
            }
            for (let m = 0; m < lettere.length; m++) {
                for (let i = 0; i < contenuto.length; i++) {
                    for (let n = 0; n < contenuto[i].length; n++) {

                        if(i == posY && n == posX){
                            // non si deve sovrapporre
                            if (contenuto[i][n] == null) {
                                contenuto[i][n] = lettere[m];
                                break;
                            }else if(contenuto[i][n] == lettere[m]){
                                memoryX = n;
                                break;
                            }else{
                                if(m == 0){
                                    recalc = true;
                                }else{
                                    for (let g = m; g > 0; g--) {
                                        n--;
                                        if(memoryX != n){
                                            contenuto[i][n] = null;
                                        }
                                        recalc = true;
                                    }
                                    break;
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
        }else if(direction == 2 || direction == 3){ // verticale
            // deve iniziare in una posiziona in cui ci stia tutta la parola 
            var posX = parseInt(Math.random()*larghezza);
            var posY = parseInt(Math.random()*(altezza+1-lettere.length));
            var memoryY = -1;
            if(direction == 3){ // invertito
                lettere.reverse();
            }
            for (let m = 0; m < lettere.length; m++) {
                for (let i = 0; i < contenuto.length; i++) {
                    for (let n = 0; n < contenuto[i].length; n++) {
                        
                        if(i == posY && n == posX){
                            // non si deve sovrapporre
                            if (contenuto[i][n] == null) {
                                contenuto[i][n] = lettere[m];
                                break;
                            }else if(contenuto[i][n] == lettere[m]){
                                memoryY = i;
                                break;
                            }else{
                                if(m == 0){
                                    recalc = true;
                                }else{
                                    for (let g = m; g > 0; g--) {
                                        i--;
                                        if(memoryY != i){
                                            contenuto[i][n] = null;
                                        }
                                        recalc = true;
                                    }
                                    break;
                                }
                            }
                            
                        }
                    }
                    if(recalc){
                        break;
                    }
                }
                if(recalc){
                    j--;
                    break;
                }
                posY++;
            }
        }else if(direction == 4 || direction == 5){ // diagonale verso destra
            // deve iniziare in una posiziona in cui ci stia tutta la parola 
            var posX = parseInt(Math.random()*(larghezza+1-lettere.length));
            var posY = parseInt(Math.random()*(altezza+1-lettere.length));
            var memoryX = -1;
            var memoryY = -1;
            if(direction == 5){ // invertito
                lettere.reverse();
            }
            for (let m = 0; m < lettere.length; m++) {
                for (let i = 0; i < contenuto.length; i++) {
                    for (let n = 0; n < contenuto[i].length; n++) {
                        
                        if(i == posY && n == posX){
                            // non si deve sovrapporre
                            if (contenuto[i][n] == null) {
                                contenuto[i][n] = lettere[m];
                                break;
                            }else if(contenuto[i][n] == lettere[m]){
                                memoryX = n;
                                memoryY = i;
                                break;
                            }else{
                                if(m == 0){
                                    recalc = true;
                                }else{
                                    for (let g = m; g > 0; g--) {
                                        n--;
                                        i--;
                                        if(!(memoryX == n && memoryY == i)){
                                            contenuto[i][n] = null;
                                        }
                                        recalc = true;
                                    }
                                    break;
                                }
                            }
                            
                        }
                    }
                    if(recalc){
                        break;
                    }
                }
                if(recalc){
                    j--;
                    break;
                }
                posX++;
                posY++;
            }
        }else if(direction == 6 || direction == 7){ // diagonale verso sinistra
            // deve iniziare in una posiziona in cui ci stia tutta la parola 
            var posX = lettere.length-1 + parseInt(Math.random());
            var posY = parseInt(Math.random()*(altezza+1-lettere.length));
            var memoryX = -1;
            var memoryY = -1;
            if(direction == 7){ // invertito
                lettere.reverse();
            }
            for (let m = 0; m < lettere.length; m++) {
                for (let i = 0; i < contenuto.length; i++) {
                    for (let n = 0; n < contenuto[i].length; n++) {
                        
                        if(i == posY && n == posX){
                            // non si deve sovrapporre
                            if (contenuto[i][n] == null) {
                                contenuto[i][n] = lettere[m];
                                break;
                            }else if(contenuto[i][n] == lettere[m]){
                                memoryX = n;
                                memoryY = i;
                                break;
                            }else{
                                if(m == 0){
                                    recalc = true;
                                }else{
                                    for (let g = m; g > 0; g--) {
                                        n++;
                                        i--;
                                        if(!(memoryX == n && memoryY == i)){
                                            contenuto[i][n] = null;
                                        }
                                        recalc = true;
                                    }
                                    break;
                                }
                            }
                            
                        }
                    }
                    if(recalc){
                        break;
                    }
                }
                if(recalc){
                    j--;
                    break;
                }
                posX--;
                posY++;
            }
        }
    }
    console.log(contenuto);
    
    var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


    // inserimento dell'array di parole nella tabella HTML
    var tr = document.querySelectorAll("tr");
    for (let i = 0; i < contenuto.length; i++) {
        var td = tr[i].getElementsByTagName("td");
        for (let n = 0; n < contenuto[i].length; n++) {
            if(contenuto[i][n] == null){
                contenuto[i][n] = alfabeto[parseInt(Math.random()*alfabeto.length)];
            }
            td[n].textContent = contenuto[i][n];
        }
    }
}


