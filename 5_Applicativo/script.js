function elaboraDifficolta(option){
    var difficolta = document.getElementById("difficolta").value;
    if(option == "column"){
        var column = 2;
        if(difficolta == "leggenda"){
            column = 3;
        }else if(difficolta != "principiante"){
            column = 3;
        }
        return column;
    }else if(option == "parole"){
        var num = 0;
        var millisec = 0;
        switch(difficolta){
            case "principiante":
                num = 10;
                millisec = 500;
                break;
            case "dilettante":
                num = 14;
                millisec = 2000;
                break;
            case "esperto":
                num = 17;
                millisec = 3500;
                break;
            case "leggenda":
                num = 20;
                millisec = 5000;
                break;
        }
        return [num,millisec];
    }else{
        var itable = 0;
        var ntable = 0;
        switch(difficolta){
            case "principiante":
                itable = 10;
                ntable = 10;
                break;
            case "dilettante":
                itable = 10;
                ntable = 14;
                break;
            case "esperto":
                itable = 12;
                ntable = 15;
                break;
            case "leggenda":
                itable = 18;
                ntable = 20;
                break;
        }
        return [itable, ntable];
    }
    
}

function generaTabella(){
    mostraLoader();
    setFont();
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
    document.getElementById('containerTabella').style.borderWidth = "2px";

    var [numeroParole,millisec] = elaboraDifficolta("parole");
    leggo(numeroParole);
}


let contenutoDizionario = null;

function leggiContenuto() {
    return new Promise((resolve, reject) => {
        // Se il contenuto del dizionario è già stato letto, restituiscilo direttamente
        if (contenutoDizionario !== null) {
            resolve();
            return;
        }

        var input = document.getElementById('fileInput');
        var file = input.files[0];
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            var text = this.responseText;

            // Memorizza il contenuto del dizionario
            contenutoDizionario = text;

            resolve();
        };
        xhttp.onerror = function () {
            reject(new Error('Errore durante il caricamento del file.'));
        };
        
        if(file != undefined){
            xhttp.open("GET", file.name);
        }else{
            xhttp.open("GET", "280000_parole_italiane.txt");
        }
        
        xhttp.send();
    });
}


async function leggo(numeroParole, contenuto) {
    try {
        await leggiContenuto();

        var dizionario = contenutoDizionario.split("\n");
        var [x, y] = elaboraDifficolta();
        var maxChar = Math.min(x, y);
        var parole = [];
        if(numeroParole == 1){
            var spaziVuoti = calcolaSpaziVuoti(contenuto);
            var continua = true;
            while(continua){
                var parola = dizionario[parseInt(Math.random()*dizionario.length)];
                if(parola.length == spaziVuoti){
                    continua = false;
                    parole[0] = parola;
                }
            }
        }else{
            for (let i = 0; i < numeroParole; i++){
                var parola = dizionario[parseInt(Math.random()*dizionario.length)];
                if(parola.length > 2 && parola.length <= maxChar){
                    parole[i] = parola;
                }else{
                    i--;
                }
            }
        }

        document.getElementById('divVuoto').innerHTML = parole;

        if (contenuto == undefined) {
            chiamaPopolaTabella();
        } else {
            stampaTabella(contenuto);
        }
    } catch (error) {
        console.error(error);
    }
}


/**
 * Questa funzione serve a verificare se si può inserire
 * la parola nella posizione data, se sì ritorna true.
 * 
 * @param lettere sono le lettere da inserire
 * @param contenuto array bidimensionale di char
 * @param posX posizione x dove inserire la lettera
 * @param posY posizione y dove inserire la lettera
 * @param direction direzione in cui inserire le lettere
 * @returns true se la parola non va bene
 *          oppure il contenuto (array) se va tutto bene 
 */
function controlloLettere(lettere, contenuto, posX, posY, direction){
    for (let m = 0; m < lettere.length; m++) {
        // non si deve sovrapporre
        if(contenuto[posY][posX] != lettere[m] && contenuto[posY][posX] != null){
            return false;
        }
        if(direction>5){
            posY++;
            posX--;
        }else if(direction > 3){
            posY++;
            posX++;
        }else if(direction > 1){
            posY++;
        }else {
            posX++;
        }
    }
    return true;
}


/**
 * Questa funzione serve a inserire le lettere 
 * nell'array bidimensionale
 * 
 * @param lettere sono le lettere da inserire
 * @param contenuto array bidimensionale di char
 * @param posX posizione x dove inserire la lettera
 * @param posY posizione y dove inserire la lettera
 * @param direction direzione in cui inserire le lettere
 * @returns true se la parola non va bene
 *          oppure il contenuto (array) se va tutto bene 
 */
function inserisciLettere(lettere, contenuto, posX, posY, direction){
    for (let m = 0; m < lettere.length; m++) {
        contenuto[posY][posX] = lettere[m];
        if(direction>5){
            posY++;
            posX--;
        }else if(direction > 3){
            posY++;
            posX++;
        }else if(direction > 1){
            posY++;
        }else {
            posX++;
        }
    }
    return contenuto;
}

function chiamaPopolaTabella(){
    var parole = document.getElementById('divVuoto').innerHTML.split(",");
    popolaTabella(parole);
}

/**
 * Questa funzione serve a popolare l'array bidimensionale
 * con i caratteri delle parole da inserire.
 * 
 */
function popolaTabella(parole) {
    var [numeroParole,millisec] = elaboraDifficolta("parole");
    var [altezza, larghezza] = elaboraDifficolta();
    var contenuto = [altezza];
    svuotaTabella();
    console.log(parole);
    /**
     * Questa funzione riempe la tabella di null
     */
    function svuotaTabella(){
        for (let i = 0; i < altezza; i++) {
            contenuto[i] = new Array(larghezza);
            for (let n = 0; n < larghezza; n++) {
                contenuto[i][n] = null;
            }
        }
    }
    
    var interrupt = 0;
    for (let j = 0; j < parole.length; j++) {
        /* interrupt serve a interrompere i cicli e rigenerare le parole
           nel caso in cui si generasse un ciclo infinito */
        interrupt++;
        if(interrupt > 700){
            interrupt = 0;
            svuotaTabella();
            leggo(numeroParole);
            return;
        }
        var lettere = parole[j].toUpperCase().split("");
        var direction = parseInt(Math.random()*8);
        if(direction == 0 || direction == 1){ // orizzontale
            // deve iniziare in una posiziona in cui ci stia tutta la parola 
            var posX = parseInt(Math.random()*(larghezza+1-lettere.length));
            var posY = parseInt(Math.random()*altezza);
            if(direction == 1){ // invertito
                lettere.reverse();
            }
            if(controlloLettere(lettere, contenuto, posX, posY, direction)){
                contenuto = inserisciLettere(lettere, contenuto, posX, posY, direction);
            }else{
                j--;
            }
        }else if(direction == 2 || direction == 3){ // verticale
            // deve iniziare in una posiziona in cui ci stia tutta la parola 
            var posX = parseInt(Math.random()*larghezza);
            var posY = parseInt(Math.random()*(altezza+1-lettere.length));
            if(direction == 3){ // invertito
                lettere.reverse();
            }
            if(controlloLettere(lettere, contenuto, posX, posY, direction)){
                contenuto = inserisciLettere(lettere, contenuto, posX, posY, direction);
            }else{
                j--;
            }
        }else if(direction == 4 || direction == 5){ // diagonale verso destra
            // deve iniziare in una posiziona in cui ci stia tutta la parola 
            var posX = parseInt(Math.random()*(larghezza+1-lettere.length));
            var posY = parseInt(Math.random()*(altezza+1-lettere.length));
            if(direction == 5){ // invertito
                lettere.reverse();
            }
            if(controlloLettere(lettere, contenuto, posX, posY, direction)){
                contenuto = inserisciLettere(lettere, contenuto, posX, posY, direction);
            }else{
                j--;
            }
        }else if(direction == 6 || direction == 7){ // diagonale verso sinistra
            // deve iniziare in una posiziona in cui ci stia tutta la parola 
            var posX = lettere.length-1 + parseInt(Math.random()*(larghezza-lettere.length));
            var posY = parseInt(Math.random()*(altezza+1-lettere.length));
            if(direction == 7){ // invertito
                lettere.reverse();
            }
            if(controlloLettere(lettere, contenuto, posX, posY, direction)){
                contenuto = inserisciLettere(lettere, contenuto, posX, posY, direction);
            }else{
                j--;
            }
        }
    }
    var modalita = document.getElementById('modalita');
    if(calcolaSpaziVuoti(contenuto) > 25 && modalita.value == 'adulti'){
        // faccio cambiare le parole della tabella e la rigenero
        svuotaTabella();
        console.log("recalc - troppi spazi vuoti");
        leggo(numeroParole);
    }
    gestisciModalita(contenuto);
    stampaLista(parole);
}

function calcolaSpaziVuoti(contenuto){
    var spaziVuoti = 0;
    for (let i = 0; i < contenuto.length; i++) {
        for (let n = 0; n < contenuto[i].length; n++) {
            if(contenuto[i][n] == undefined || contenuto[i][n] == null){
                spaziVuoti++;
            }
        }
    }
    console.log(spaziVuoti);
    return spaziVuoti;
}

function gestisciModalita(contenuto){
    var modalita = document.getElementById('modalita');
    if(modalita.value == "adulti"){
        leggo(1, contenuto);
    }else{
        stampaTabella(contenuto);
        
    }
}

function stampaTabella(contenuto){
    var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


    // inserimento dell'array di parole nella tabella HTML
    var modalita = document.getElementById('modalita');
    var tr = document.querySelectorAll("tr");
    
    var parola = document.getElementById('divVuoto').innerHTML;
    var lettere = parola.split("");
    var m = 0;
    
    var div = document.getElementById('parolaDifficile');
    div.innerHTML = "";
    if(modalita.value == "adulti"){
        div.innerHTML = "Parola Difficile: "
    }
    for (let i = 0; i < contenuto.length; i++) {
        var td = tr[i].getElementsByTagName("td");
        for (let n = 0; n < contenuto[i].length; n++) {
            if(contenuto[i][n] != null){
                td[n].style.color = "black";
            }else{
                if(modalita.value == "bambini"){
                    contenuto[i][n] = alfabeto[parseInt(Math.random()*alfabeto.length)];
                }else{
                    div.innerHTML = div.innerHTML + "_ ";
                    contenuto[i][n] = lettere[m].toUpperCase();
                    m++;
                }
                td[n].style.color = "red";
            }
            td[n].textContent = contenuto[i][n];
        }
    }
    togliLoader();
}

/**
 * Questa funzione stampa la lista delle parole inserite
 * nella tabella.
 * 
 * @param parole è l'array di parole 
 */
function stampaLista(parole){
    var list = document.getElementById('list');
    list.innerHTML = "";
    list.style.columnCount = elaboraDifficolta("column");
    for (let j = 0; j < parole.length; j++) {
        list.innerHTML += parole[j] + "<br>";
    }
}

function mostraLoader(){
    document.getElementById('containerTabella').style.display = "none";
    document.getElementById('loader').style.display = "block";
}

function togliLoader(){
    document.getElementById('containerTabella').style.display = "block";
    document.getElementById('loader').style.display = "none";
}
