var varsP={}; var arrP = [];
var InsideInArrayP=[];
function priP(link){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() { 
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
    if (err) {
        alert('Error: ' + err);
    } else {
varsP.data=select(dom,'tbody tr td.flag a img'); 
varsP.image=select(dom,'tbody tr td.flag a img'); 
varsP.title=select(dom,'tbody tr td.legend .team .short a'); 
varsP.points=select(dom,'tbody tr'); 

for(var i=0;i<varsP.data.length;i++){
  var nameData=varsP.title[i].children[0].data;
  nameData=nameData.replace(/\s{2,}/g,'');
   // nameData=nameData.replace(/\s/g,'');

  arrP.push({
    image:varsP.image[i].attribs.src,
    href:varsP.title[i].attribs.href,
    title:varsP.title[i].attribs.title,
    name:nameData,
    position:varsP.points[i].children[1].children[0].data,
    play:varsP.points[i].children[11].children[0].data,
    win:varsP.points[i].children[13].children[0].data,
    equal:varsP.points[i].children[15].children[0].data,
    loss:varsP.points[i].children[17].children[0].data,
    inwin:varsP.points[i].children[19].children[0].data,
    inequal:varsP.points[i].children[21].children[0].data,
    inloss:varsP.points[i].children[23].children[0].data,
    outwin:varsP.points[i].children[25].children[0].data,
    outequal:varsP.points[i].children[27].children[0].data,
    outloss:varsP.points[i].children[29].children[0].data,
    goalFor:varsP.points[i].children[31].children[0].data,
    goalAgainst:varsP.points[i].children[33].children[0].data,
    plus:varsP.points[i].children[35].children[0].data,
    points:varsP.points[i].children[37].children[0].data,
  });
}
Ti.API.info(arrP);
   
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
