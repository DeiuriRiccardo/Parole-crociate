var modalita;
var contenuto;
var parole;
var parolaDifficile;

function elaboraDifficolta(option){
    var difficolta = document.getElementById("difficolta").value;
    if(option == "column"){
        var column = 2;
        if(difficolta != "principiante"){
            column = 3;
        }
        return column;
    }else if(option == "parole"){
        var num = 0;
        switch(difficolta){
            case "principiante":
                num = 10;
                break;
            case "dilettante":
                num = 14;
                break;
            case "esperto":
                num = 17;
                break;
        }
        return [num];
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
        }
        return [itable, ntable];
    }
    
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
    document.getElementById('containerTabella').style.borderWidth = "2px";
    setup();
}

function setup(){
    mostraLoader();
    setTimeout(togliLoader, 1000);

    setFont();

    modalita = document.getElementById('modalita').value;

    var numeroParole = elaboraDifficolta("parole");
    leggo(numeroParole);

    var exportButtons = document.querySelectorAll('.export');
    exportButtons.forEach(button => {
        button.removeAttribute('disabled');
    });

    document.getElementById('soluzione').removeAttribute('disabled');
    document.getElementById('soluzione').style.display = 'block';
}

function generaSoluzione(){
    if(modalita == "adulti"){
        var lettereEstranee = document.querySelectorAll('.lettereEstranee');
        var parolaDifficile = document.getElementById('parolaDifficile');
        parolaDifficile.innerHTML = "Parola difficile: ";
        lettereEstranee.forEach(td => {
            parolaDifficile.innerHTML += td.textContent;
        });
    }
    const colori = [
        'lightblue',
        'lightgreen',
        'lightcoral',
        'lightseagreen',
        'lightsalmon',
        'lightsteelblue',
        'lightpink',
        'lightgoldenrodyellow',
        'lightcyan',
        'lavender', // Sostituito 'lightgray' con 'lavender'
        'dodgerblue',
        'mediumseagreen',
        'tomato',
        'gold',
        'deepskyblue',
        'mediumaquamarine',
        'lightcoral',
        'lightblue',
        'lightgoldenrodyellow'
    ];
    for(let i=0; i < parole.length; i++){
        var classi = document.querySelectorAll(`.p${i}`);
        classi.forEach(tdAndParola => {
            tdAndParola.style.backgroundColor = colori[i];
        });
    }
    
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
            xhttp.open("GET", "Dizionari/"+file.name);
        }else{
            xhttp.open("GET", "Dizionari/280000_parole_italiane.txt");
        }
        
        xhttp.send();
    });
}


function trovaParoleConSpaziVuoti(spaziVuoti){
    var lunghezzaMassima = 0;
    var parolePossibili = [];
    var dizionario = contenutoDizionario.split("\n");
    dizionario.forEach(parola => {
        lunghezzaMassima = Math.max(parola.length, lunghezzaMassima);
        if(parola.length == spaziVuoti){
            var isOther = true;
            parole.forEach(parolaLista => {
                if(parolaLista == parola){
                    isOther = false;
                }
            });
            if(isOther){
                parolePossibili.push(parola);
            }
        }
    });
    if(spaziVuoti == undefined){
        return lunghezzaMassima;
    }else{
        return parolePossibili;
    }
}

async function leggo(numeroParole) {
    await leggiContenuto();
    if(numeroParole == 1){
        var spaziVuoti = calcolaSpaziVuoti();
        var parolePossibili = trovaParoleConSpaziVuoti(spaziVuoti);
        parolaDifficile = parolePossibili[parseInt(Math.random()*parolePossibili.length)];
        stampaTabella();
    }else{
        var dizionario = contenutoDizionario.split("\n");
        if(dizionario.length < (numeroParole + 10)){
            window.alert("Dizionario troppo piccolo per questa difficoltà.");
            return;
        }
        var [x, y] = elaboraDifficolta();
        parole = [];
        if(modalita == 'adulti'){
            var caratteriTotali = 0;
            var spaziMassimi = trovaParoleConSpaziVuoti();
            do{
                var caratteriMinimi = (x*y)-spaziMassimi;
                var parola = prendiParola(dizionario);
                if(parola != undefined){
                    parole.push(parola);
                    caratteriTotali += parola.length;
                }
            }while(caratteriMinimi >= caratteriTotali);
        }else{
            for(let i =0; i < numeroParole; i++){
                var parola = prendiParola(dizionario);
                if(parola != undefined){
                    parole[i] = parola;
                }else{
                    i--;
                }
            }
        }
        popolaTabella();
    }
}

function prendiParola(dizionario){
    var [x, y] = elaboraDifficolta();
    var maxChar = Math.min(x, y);
    var parola = dizionario[parseInt(Math.random()*dizionario.length)];
    if(parola.length > 2 && parola.length <= maxChar){
        var parola_senza_accenti = parola.replace(/[àèéìòù']/, function(match) {
            var accentata = "àèéìòù'";
            var senza_accenti = "aeeiou";
            var index = accentata.indexOf(match);
            return senza_accenti.charAt(index);
        });
        var isNewParola = true;
        parole.forEach(item => {
            if(item == parola_senza_accenti.trim()){
                isNewParola = false;
            }
        });
        if(isNewParola){
            parola = parola_senza_accenti.trim();
            return parola;
        }
    }
}


/**
 * Questa funzione serve a verificare se si può inserire
 * la parola nella posizione data, se sì ritorna true.
 * 
 * @param lettere sono le lettere da inserire
 * @param posX posizione x dove inserire la lettera
 * @param posY posizione y dove inserire la lettera
 * @param direction direzione in cui inserire le lettere
 * @returns true se la parola non va bene
 *          oppure il contenuto (array) se va tutto bene 
 */
function controlloLettere(lettere, posX, posY, direction){
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
 * @param posX posizione x dove inserire la lettera
 * @param posY posizione y dove inserire la lettera
 * @param direction direzione in cui inserire le lettere
 * @param j numero della parola, serve per la classe e la soluzione 
 */
function inserisciLettere(lettere, posX, posY, direction, j){
    for (let m = 0; m < lettere.length; m++) {
        contenuto[posY][posX] = lettere[m] +"," +j;
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
}

/**
 * Questa funzione serve a popolare l'array bidimensionale
 * con i caratteri delle parole da inserire.
 * 
 */
function popolaTabella() {
    var numeroParole = elaboraDifficolta("parole");
    var [altezza, larghezza] = elaboraDifficolta();
    contenuto = [altezza];
    svuotaTabella();
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
    parole = parole.sort();
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
            if(controlloLettere(lettere, posX, posY, direction)){
                inserisciLettere(lettere, posX, posY, direction, j);
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
            if(controlloLettere(lettere, posX, posY, direction)){
                inserisciLettere(lettere, posX, posY, direction, j);
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
            if(controlloLettere(lettere, posX, posY, direction)){
                inserisciLettere(lettere, posX, posY, direction, j);
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
            if(controlloLettere(lettere, posX, posY, direction)){
                inserisciLettere(lettere, posX, posY, direction, j);
            }else{
                j--;
            }
        }
    }
    if(modalita == 'adulti' && calcolaSpaziVuoti() > 25){
        svuotaTabella();
        leggo(numeroParole);
        return;
    }
    gestisciModalita();
    stampaLista();
}

function calcolaSpaziVuoti(){
    var spaziVuoti = 0;
    for (let i = 0; i < contenuto.length; i++) {
        for (let n = 0; n < contenuto[i].length; n++) {
            if(contenuto[i][n] == undefined || contenuto[i][n] == null){
                spaziVuoti++;
            }
        }
    }
    return spaziVuoti;
}

function gestisciModalita(){
    if(modalita == "adulti"){
        leggo(1);
    }else{
        stampaTabella();
    }
}

function stampaTabella(){
    var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


    // inserimento dell'array di parole nella tabella HTML
    var tr = document.querySelectorAll("tr");
    
    var div = document.getElementById('parolaDifficile');
    div.innerHTML = "";
    if(modalita == "adulti"){
        div.innerHTML = "Parola difficile: ";
        var lettere = parolaDifficile.split("");
        var m = 0;
    }
    for (let i = 0; i < contenuto.length; i++) {
        var td = tr[i].getElementsByTagName("td");
        for (let n = 0; n < contenuto[i].length; n++) {
            if(contenuto[i][n] != null){
                var contenutoAndClass = contenuto[i][n].split(",");
                contenuto[i][n] = contenutoAndClass[0];
                td[n].setAttribute('class', "cella p"+ contenutoAndClass[1]);
                td[n].style.color = "black";
            }else{
                if(modalita == "bambini"){
                    contenuto[i][n] = alfabeto[parseInt(Math.random()*alfabeto.length)];
                }else{
                    div.innerHTML = div.innerHTML + "_ ";
                    contenuto[i][n] = lettere[m].toUpperCase();
                    m++;
                    td[n].setAttribute('class', 'lettereEstranee');
                }
            }
            td[n].textContent = contenuto[i][n];
        }
    }
}

/**
 * Questa funzione stampa la lista delle parole inserite
 * nella tabella.
 */
function stampaLista(){
    var list = document.getElementById('list');
    list.innerHTML = "";
    list.style.columnCount = elaboraDifficolta("column");
    for (let j = 0; j < parole.length; j++) {
        list.innerHTML += `<span class="p${j}">${parole[j]}</span><br>`;
    }
}

async function mostraLoader(){
    document.getElementById('containerTabella').style.display = "none";
    document.getElementById('loader').style.display = "block";
}

function togliLoader(){
    document.getElementById('containerTabella').style.display = "block";
    document.getElementById('loader').style.display = "none";
}
