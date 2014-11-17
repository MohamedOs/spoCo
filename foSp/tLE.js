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
 
function pri(pageNumber){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() { 
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
  if (err) {
    alert('Error: ' + err);
  } else {
    
        vars.data=select(dom,'script');
      var dataNeu=vars.data[7].children[0].data;
    dataNeu=dataNeu.split('var comp_pointstable = new Array')[1];
    dataNeu=dataNeu.split(');')[0];
    dataNeu=dataNeu.split('"i",10814,0,1,0,0,1,')[1];
    dataNeu=dataNeu.slice(2, -6);
        var pointstable = eval("[" + dataNeu + "]");
        var pointstableArray=[];
        for(var i=0;i<pointstable.length/20;i++){
          arr.push({
          nadiLink:pointstable[(i*20)+4],
          nadiImage:pointstable[(i*20)+3],
          nadiName:pointstable[(i*20)+5],
          nadiEnName:pointstable[(i*20)+6],
          nadiNation:pointstable[(i*20)+7],
          nadiL:pointstable[(i*20)+8],
          nadiF:pointstable[(i*20)+9],
          nadiT:pointstable[(i*20)+10],
          nadiKH:pointstable[(i*20)+11],
          nadiTotal:pointstable[(i*20)+16],
          nadiS1:pointstable[(i*20)+13],
          nadiS2:pointstable[(i*20)+14],
          nadiS3:pointstable[(i*20)+15],

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
var queryIndexCat='http://www.kooora.com/?c=10814';
xhr.open("GET",queryIndexCat);
xhr.send();

}
