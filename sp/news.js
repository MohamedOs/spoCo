var vars={}; var arr = [];
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' - ' + month + ' - ' + year ;
  return time;
}
function news(link){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() {
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
if (err) {
alert('Error: ' + err);
} else {
vars.data=select(dom,'script');
var dataNeu=vars.data[7].children[0].data+vars.data[8].children[0].data;
dataNeu=dataNeu.split('var news = new Array')[1];
dataNeu=dataNeu.split(');')[0];
dataNeu=dataNeu.slice(4, -6);
var arrIn = eval("[" + dataNeu + "]");
//var arr=new Array+dataNeu;
//dataNeu=dataNeu.replace("\n","}{");
//Ti.API.info(arr);
//Ti.API.info(arr[8]);
//Ti.API.info("arr[0]");
for(var i=0;i<arrIn.length/7;i++){
var imageRow=arrIn[(i*7)+3];
imageRow=imageRow.split('&z=120')[0];
var dDate=arrIn[(i*7)+2];
dDate=dDate.replace("#","");
dDate=timeConverter(dDate);
arr.push({
image:imageRow,
title:arrIn[(i*7)+4],
href:"http://www.kooora.com/?"+arrIn[(i*7)+1],
des:arrIn[(i*7)+6],
date:dDate
});
}
Ti.API.info(arr);
}
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(body);
};
xhr.onerror = function() {
Titanium.API.info('error');
};
var queryIndexCat=link;
xhr.open("GET",queryIndexCat);
xhr.send();
}
