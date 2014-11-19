var varsM={}; var arrM = [];
var InsideInArrayM=[];
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
//http://www.kooora.com/?c=5910&stage=1&sch=true
function priM(link){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() { 
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
    if (err) {
        alert('Error: ' + err);
    } else {
        varsM.data=select(dom,'script'); 
        var dataNeu2=varsM.data[7].children[0].data;
        dataNeu2=dataNeu2.split('var lang = 0;')[1];
        dataNeu2=dataNeu2.split('mfooter("");')[0];
        dataNeu2=dataNeu2.slice(2, -2);
        dataNeu2=dataNeu2.replace(/dh\s*\(.*?\);\s*/g,'');
        dataNeu2=dataNeu2.replace(/mc/g,'');
        dataNeu2=dataNeu2.replace(/\(/g,"");
        dataNeu2=dataNeu2.replace(/\s*\<.*?\>\s*/g,"");
        dataNeu2=dataNeu2.split(');');
        for(var i=0;i<dataNeu2.length;i++){
       var inArray=eval("[" + dataNeu2[i] + "]");
       var dateUnix=inArray[2];
      // dateUnix=dateUnix.replace("#","");
       var a = new Date(dateUnix*1000);
       var hour = a.getHours();
       var min = a.getMinutes();
       var pRrsult=inArray[9];
      // pRrsult=pRrsult.replace("&nbsp;:&nbsp;",":");
       var pTime=inArray[4];
       //pTime=pTime.replace("^~$f","");
       InsideInArrayM.push({
       link:inArray[1],
       date:timeConverter(dateUnix),
       hour:hour,
       min:min,
       time:pTime,
       playerOneLink:inArray[5],
       playerOne:inArray[7],
       playerResult:pRrsult,
       playerTwoLink:inArray[10],
       playerTwo:inArray[12],
         });
        }
        for(var i=0;i<dataNeu2.length-1;i++){
          arrM.push({
          data:InsideInArrayM[i]
          });
        }
        Ti.API.info(arrM);
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
