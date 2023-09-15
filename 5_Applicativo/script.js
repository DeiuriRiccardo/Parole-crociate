
var difficolta = document.getElementById("difficolta").value;

function generaTabella(){
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
    var parole;
    // tramite ajax leggo il contnuto del dizionario
    $.get('280000_parole_italiane.txt', function(file) {
        $.each(parola => {
            parole += parola;
        });
    });
    console.log(parole);
}
