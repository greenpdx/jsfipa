var root = process.cwd()+"/lib";

var aid = require(root+"/agentid");
var envl = require(root+"/envelope");
var dttm = require(root+"/datetime");
var mssg = require(root+"/message");
var mts = require(root+"/mts");
var prpy = require(root+"/property");


var aid0 = new aid("aid0");

var aid1 = aid.clone(aid0);
aid1.setName("aid1");


var ev1 = new envl();
var msg1 = new mssg("Test Body");

var ev1 = new envl(); 
var aid2 = new aid();


o = Object.create(null);
var aid3 = new aid("tst",[],[aid1],[]);
var log = "TST";
