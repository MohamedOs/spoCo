var arr7 = [];
var vars7={};
function pri7(){
var queryIndexF7='select * from html where url="https://mobile.twitter.com/hashtag/Alkoora_app" and xpath="//*[@class=\'tweet\']"';
Titanium.Yahoo.yql(queryIndexF7, function(e){
vars7.data=e.data;
function getObjects(obj, key, val) {
var objects = [];
for (var i in obj) {
if (!obj.hasOwnProperty(i)) continue;
if (typeof obj[i] == 'object') {
objects = objects.concat(getObjects(obj[i], key, val));
} else
//if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
if (i == key && obj[i] == val || i == key && val == '') { //
objects.push(obj);
} else if (obj[i] == val && key == ''){
//only add if the object is not already in the array
if (objects.lastIndexOf(obj) == -1){
objects.push(obj);
}
}
}
return objects;
}
//return an array of values that match on a certain key
function getValues(obj, key) {
var objects = [];
for (var i in obj) {
if (!obj.hasOwnProperty(i)) continue;
if (typeof obj[i] == 'object') {
objects = objects.concat(getValues(obj[i], key));
} else if (i == key) {
objects.push(obj[i]);
}
}
return objects;
}
//return an array of keys that match on a certain value
function getKeys(obj, val) {
var objects = [];
for (var i in obj) {
if (!obj.hasOwnProperty(i)) continue;
if (typeof obj[i] == 'object') {
objects = objects.concat(getKeys(obj[i], val));
} else if (obj[i] == val) {
objects.push(i);
}
}
return objects;
}
var ds7 = vars7.data;
vars7.d1=(getObjects(ds7,'class','avatar'));
vars7.d2=(getObjects(ds7,'class','tweet-text'));
for(var i=0;i<vars7.d2.length;i++){
arr7.push({
image:vars7.d1[i].a.img.src,
title:vars7.d1[i].a.img.alt,
content:vars7.d2[i].div.p.content,
});
}
Ti.API.info(arr7);
});
}