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


    //trasformi in array di byte  
    var bytes = new Uint8Array(txt.length);
    for (var i = 0; i < txt.length; i++) {
        var ascii = txt.charCodeAt(i);
        bytes[i] = ascii;
    }


    //fai aprire la finestra di download
    saveFile([bytes], 'Parole-Crociate.txt');
}