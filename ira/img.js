var arrBg = [];
var varsBg={};
function dataBg(num,url){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function () {
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
if (err) {
alert('Error: ' + err);
} else {
var photos=select(dom,'.ld');
//Ti.API.info(photos.length);
var photoData;
num=num*5;
var maxNum=num+5;
for(var i=num;i<maxNum;i++){
photoData=JSON.parse(photos[i].attribs.data);
arrBg.push({
number:i,
image:photoData.iurl,
width:photoData.imgW,
height:photoData.imgH,
host:photoData.rhost,
title:photoData.tit,
size:photoData.imgS,
altTitle:photoData.altTitle
});
}
Ti.API.info(arrBg);
}
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(body);
//Titanium.API.info(xhr.responseText);
};
xhr.onerror = function() {
Titanium.API.info("error");
};
xhr.open("GET",url);
xhr.send();
}
