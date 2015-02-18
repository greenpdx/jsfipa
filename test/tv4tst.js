var agentID = require("./agentid");
var property = require("./property");
var tv4 = require("tv4");

function getDef(base, id) {
	var def = base["definitions"];
	var obj = (def[id] === "undefined")? null: def[id];
	return obj;
};

var prop = property.schema;
var agt = agentID.schema;
tv4.addSchema(prop)
var aid = new agentID("aid",["ssss"])
var aid1 = {
	"name": "aid1",
	"addresses": ["address"],

};

var aid0 = new agentID("aid0",["ssss"],[aid1]);
var val = tv4.validate(aid0, agt, true);
if (tv4.error) console.log(aid0.toString(),val, tv4.error.toString());


val = tv4.validate(aid1,agt, true);
var aid2 = agentID.clone(aid1);
val = tv4.validate(aid2,agt, true);
