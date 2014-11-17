var vars2={}; var arr2 = [];
function timeConverter2(UNIX_timestamp){
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
 
function pri2(pageNumber){
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() { 
var select = soupselect.select;
var body=xhr.responseText;
var handler = new htmlparser.DefaultHandler(function(err, dom) {
	if (err) {
		alert('Error: ' + err);
	} else {
		
vars2.data=select(dom,'script');	
var dataNeu2=vars2.data[7].children[0].data;
		dataNeu2=dataNeu2.split('var comp_matches = new Array')[1];
		dataNeu2=dataNeu2.split(');')[0];
		dataNeu2=dataNeu2.slice(4, -4);
        var matches = eval("[" + dataNeu2 + "]");
		//Ti.API.info(matches);
		var matchesArray=[];
		for(var i=0;i<matches.length/8;i++){
			var dateUnix=matches[(i*8)+0];
			dateUnix=dateUnix.replace("#","");
			arr2.push({
				playerOne:matches[(i*8)+4],
				playerOneLink:matches[(i*8)+3],
				playerTwo:matches[(i*8)+6],
				playerTwoLink:matches[(i*8)+5],
				link:matches[(i*8)+7],
				date:timeConverter2(dateUnix),
			});
		}

Ti.API.info(arr2);
	}
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(body);
};
xhr.onerror = function() {
    Titanium.API.info('error');
};
var queryIndexCat='http://www.kooora.com/?c=10817';
xhr.open("GET",queryIndexCat);
xhr.send();

}