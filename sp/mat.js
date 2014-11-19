var varsM={}; var arrM = [];
var InsideInArrayM=[];
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
       InsideInArrayM.push({
       link:inArray[1],
       date:inArray[2],
       time:inArray[4],
       playerOneLink:inArray[5],
       playerOne:inArray[7],
       playerResult:inArray[9],
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
