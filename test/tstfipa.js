var property = require("./lib/fipa/property");
var agentID = require("./lib/fipa/agentid");
var tv4 = require("tv4");


var aid1 = new agentID("aid1");
var aid2 = new agentID("aid2");
var prop1 = new property("tst1", new Object);
var prop2 = new property("tst2", "testprop");
var aid0 = new agentID("aid0",["testaddr"],[aid1,aid2],[prop1,prop2]);
tv4.addSchema(property.schema);
var valid = tv4.validate( aid0, agentID.schema);

tv4.dropSchemas();
tv4.reset();

