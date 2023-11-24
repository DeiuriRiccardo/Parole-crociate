function exportTxt(){
    var txt = "";
    txt += document.getElementById('parolaDifficile').textContent;
    var table = document.getElementById('table').textContent.split("");
    var [altezza, larghezza] = elaboraDifficolta();
    for (let i = 0; i < table.length; i++) {
        if(i % larghezza == 0){
            txt += "\n";
        }
        txt += table[i]+" ";
    }
        
    var list = document.getElementById('list').innerHTML.split('<br>');
    list.forEach(element => {
        txt += "\n" + element;
    });
    

    console.log(txt);
    


    //trasformi in array di byte  
    var bytes = new Uint8Array(txt.length);
    for (var i = 0; i < txt.length; i++) {
        var ascii = txt.charCodeAt(i);
        bytes[i] = ascii;
    }


    //fai aprire la finestra di download
    saveFile([bytes], 'Parole-Crociate.txt');
}

function exportHtml(){
    var styleTable = "body{width: 80vh;} table{font-weight:bold;border:2px solid #033dff;padding:1vh;font-size:3vh;max-width:max-content;} table td{padding:8px 10px;} #list{font-size:3vh;padding:10px;padding-left:20px;column-count:2;} #parolaDifficile{font-size:3vh;padding: 10px;font-weight: bold;}"
    var content = "<!DOCTYPE html><html><head><style>"+styleTable+"</style></head><body><div id='parolaDifficile'>";
    content += document.getElementById('parolaDifficile').innerHTML;
    content += "</div><table><tr>"; 
    var table = document.getElementById('table').textContent.split("");
    var [altezza, larghezza] = elaboraDifficolta();
    for (let i = 0; i < table.length; i++) {
        if(i % larghezza == 0){
            content += "</tr><tr>"
        }
        content += "<td>" + table[i] + "</td>";
    }
    var list = document.getElementById('list').innerHTML;
    content += "</tr></table><div id='list'>" +list+"</div></body></html>";
    
    //trasformi in array di byte  
    var bytes = new Uint8Array(content.length);
    for (var i = 0; i < content.length; i++) {
        var ascii = content.charCodeAt(i);
        bytes[i] = ascii;
    }

    //fai aprire la finestra di download
    saveFile([bytes], 'Parole-Crociate.html');
}

var saveFile = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, name) {
        var blob = new Blob(data, { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());