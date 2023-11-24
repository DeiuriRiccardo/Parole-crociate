// contenuto array preso da https://stackoverflow.com/questions/3368837/list-every-font-a-users-browser-can-display/3368855#3368855
var fonts = ['Courier New',
'Arial',
'Arial Black',
'Bahnschrift',
'Calibri',
'Cambria',
'Cambria Math',
'Candara',
'Comic Sans MS',
'Consolas',
'Constantia',
'Corbel',
'Ebrima',
'Franklin Gothic Medium',
'Gabriola',
'Gadugi',
'Georgia',
'HoloLens MDL2 Assets',
'Impact',
'Ink Free',
'Javanese Text',
'Leelawadee UI',
'Lucida Console',
'Lucida Sans Unicode',
'Malgun Gothic',
'Marlett',
'Microsoft Himalaya',
'Microsoft JhengHei',
'Microsoft New Tai Lue',
'Microsoft PhagsPa',
'Microsoft Sans Serif',
'Microsoft Tai Le',
'Microsoft YaHei',
'Microsoft Yi Baiti',
'MingLiU-ExtB',
'Mongolian Baiti',
'MS Gothic',
'MV Boli',
'Myanmar Text',
'Nirmala UI',
'Palatino Linotype',
'Segoe MDL2 Assets',
'Segoe Print',
'Segoe Script',
'Segoe UI',
'Segoe UI Historic',
'Segoe UI Emoji',
'Segoe UI Symbol',
'SimSun',
'Sitka',
'Sylfaen',
'Symbol',
'Tahoma',
'Times New Roman',
'Trebuchet MS',
'Verdana',
'Webdings',
'Wingdings',
'Yu Gothic']

var select = "";
fonts.forEach(font => {
    select += `<option value="${font}" style="font-family:'${font}';">
        <span style="font-family:${font};">${font}</span>
        </option>`;
});

document.getElementById('fonts').innerHTML = select;

function setFont(){
    document.getElementById('containerTabella').style.fontFamily = document.getElementById('fonts').value;
}