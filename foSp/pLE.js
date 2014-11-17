var vars={}; var arr = [];

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
var dataNeu3=vars.data[7].children[0].data;
        dataNeu3=dataNeu3.split('var scorers_list = new Array')[1];
        dataNeu3=dataNeu3.split(');')[0];
        dataNeu3=dataNeu3.slice(4, -6);
        var scorers = eval("[" + dataNeu3 + "]");
        var scorersArray=[];
            for(var i=0;i<scorers.length/9;i++){
                arr.push({
                    playerName:scorers[(i*9)+2],
                    playerEnName:scorers[(i*9)+3],
                    palyerLink:scorers[(i*9)+1],
                    playerScores:scorers[(i*9)+0],
                    nadiName:scorers[(i*9)+7],
                    nadiLink:scorers[(i*9)+6]
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