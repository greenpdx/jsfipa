
//var root = "../lib/fipa";
var root = "../more";
var agentID = require(root+"/agentid");
var property = require(root+"/property");
var tv4 = require("tv4");



describe("Test AgentID", function() {
	it("AgentID Construct - name", function() {
		var aid0 = new agentID("aid0");
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid0, agentID.schema);
		expect(valid).toBe(true);
		tv4.dropSchemas();
		tv4.reset();
	});
	it("AgentID Construct - name, address", function() {
		var aid0 = new agentID("aid0",["testaddr"]);
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid0, agentID.schema);
		expect(valid).toBe(true);
		tv4.dropSchemas();
		tv4.reset();
	});
	it("AgentID Construct - name, address, resolver", function() {
		var aid = new agentID("aid");
		var aid0 = new agentID("aid0",["testaddr"],[aid]);
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid0, agentID.schema);
		expect(valid).toBe(true);
		tv4.dropSchemas();
		tv4.reset();
	});
	it("AgentID Construct - name, address, resolver, property", function() {
		var aid1 = new agentID("aid1");
		var aid2 = new agentID("aid2");
		var prop1 = new property("tst1", new Object);
		var prop2 = new property("tst2", "testprop");
		var aid0 = new agentID("aid0",["testaddr"],[aid1,aid2],[prop1,prop2]);
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid0, agentID.schema);
		expect(valid).toBe(true);
		tv4.dropSchemas();
		tv4.reset();
	});
	it("AgentID clone - all", function() {
		var aid1 = new agentID("aid1");
		var aid2 = new agentID("aid2");
		var prop1 = new property("tst1", new Object);
		var prop2 = new property("tst2", "testprop");
		var aid0 = new agentID("aid0",["testaddr"],[aid1,aid2],[prop1,prop2]);
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid0, agentID.schema);
		if (valid == false) console.log(tv4.error);
		expect(valid).toBe(true);
		var clon = aid0.clone();
		valid = tv4.validate( clon, agentID.schema);
		expect(valid).toBe(true);
		tv4.dropSchemas();
		tv4.reset();
	});
	it("AgentID write - all", function() {
		var aid1 = new agentID("aid1");
		var aid2 = new agentID("aid2");
		var prop1 = new property("tst1", new Object);
		var prop2 = new property("tst2", "testprop");
		var aid0 = new agentID("aid0",["testaddr"],[aid1,aid2],[prop1,prop2]);
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid0, agentID.schema);
		expect(valid).toBe(true);

		tv4.dropSchemas();
		tv4.reset();
	});
	it("AgentID read - all", function() {
		var aid1 = new agentID("aid1");
		var aid2 = new agentID("aid2");
		var prop1 = new property("tst1", new Object);
		var prop2 = new property("tst2", "testprop");
		var aid0 = new agentID("aid0",["testaddr"],[aid1,aid2],[prop1,prop2]);
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid0, agentID.schema);
		expect(valid).toBe(true);

		tv4.dropSchemas();
		tv4.reset();
	});
	it("AgentID setName,getName", function() {
		var aid = new agentID();
		aid.agentName = "test";
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid, agentID.schema);
		expect(valid).toBe(true);

		var name = aid.agentName;
		expect(name).toBe("test");	
		
		tv4.dropSchemas();
		tv4.reset();
	});
	it("AgentID addAddress, getAddress, rmAddress", function() {
		var aid = new agentID("aid");
		
		var err = aid.addAddress("addr1");
		console.log(err);
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid, agentID.schema);
		expect(valid).toBe(true);
	console.log(aid.toString());
		var addrs = aid.agentAddresses;		//return array len=1
		expect((Array.isArray(addrs) && addrs.length == 1) ).toBe(true);
		
		var addr1 = aid.getAddress("addr1");	// return int
		expect((typeof(addr1) === 'string') && addr1 == 'addr1').toBe(true);

		var addr2 = aid.getAddress("addr2");	// return null
		console.log("118 "+addr2+"\n");
		expect(addr2 === null).toBe(true);

		var rslt = aid.addAddress("addr2");
		expect(rslt == 2).toBe(true);
		
		var addrs = aid.agentAddresses		//return array len=2
		expect((Array.isArray(addrs) && addrs.length == 2)).toBe(true);

		var addr2_1 = aid.getAddress("addr2");	// return string
		expect((typeof(addr2_1) === 'string') && addr2_1 == "addr2").toBe(true);
		
		rslt = aid.rmAddress("addr1");
		expect(rslt == 0).toBe(true);
		
		var addr1_1 = aid.getAddress("addr1");	// return null
		console.log(aid.toString()+"\n");
		expect(addr1_1 === null ).toBe(true);
		
		var addrs_1 = aid.getAddress();	//return array len=1
		expect( (Array.isArray(addrs) && addrs.length == 1) ).toBe(true);

		tv4.dropSchemas();
		tv4.reset();
	});
	
	it("AgentID addAddress, getAddress, rmAddress(invalid)", function() {
		var aid = new agentID("aid");
		var aid1 = new agentID("aid1");
		
		aid.addAddress("addr1");
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid, agentID.schema);
		expect(valid).toBe(true);

		var addrs = aid.getAddress("test");		//return null
		expect(addrs === null).toBe(true);

		var addrs = aid1.getAddress("test");		//return null
		console.log(addrs+" "+typeof(addres))
		expect(addrs == null).toBe(true);
		
		var addr1 = aid.addAddress(new Object);	// return false
		expect(addr1 == -2).toBe(true);

		var addr1 = aid.addAddress("addr1");	// return false, dup
		expect(addr1 == -1).toBe(true);

		rslt = aid.rmAddress("test");
		expect(rslt == -1).toBe(true);

		rslt = aid.rmAddress("addr1");
		rslt = aid.rmAddress("test");
		expect(rslt == -1).toBe(true);

		tv4.dropSchemas();
		tv4.reset();
	});

	it("AgentID addResolve, getResolve, rmResolve", function() {
		var aid = new agentID("aid");
		var aid1 = new agentID("aid1");
		var aid2 = new agentID("aid2");
		
		aid.addResolver(aid1);
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid, agentID.schema);
		expect(valid).toBe(true);

		var addrs = aid.agentResolvers;		//return array len=1
		expect( (Array.isArray(addrs) && addrs.length == 1) ).toBe(true);
		
		var addr1 = aid.getResolver(aid1);	// return int
		expect(addr1 instanceof agentID).toBe(true);

		var addr2 = aid.getResolver(aid2);	// return null
		expect(addr2 === null).toBe(true);

		var rslt = aid.addResolver(aid2);
		expect(rslt == 2).toBe(true);
		
		var addrs = aid.agentResolvers;		//return array len=2
		expect((Array.isArray(addrs) && addrs.length == 2)).toBe(true);

		var addr2_1 = aid.getResolver("aid2");	// return int
		console.log(addr2_1+" "+typeof(addr2_1));
		expect(addr2_1 instanceof agentID).toBe(true);
		
		rslt = aid.rmResolver("addr1");
		expect(rslt != -1).toBe(true);
		
		var addr1_1 = aid.getResolver("addr1");	// return null
		expect(addr1_1 === null).toBe(true);
		
		tv4.dropSchemas();
		tv4.reset();
	});
	
	it("AgentID addProperty, getProperty, rmProperty(invalid)", function() {
		var aid = new agentID("aid");
		
		aid.addAddress("addr1");
		tv4.addSchema(property.schema);
		var valid = tv4.validate( aid, agentID.schema);
		expect(valid).toBe(true);

		var addrs = aid.getAddress("test");		//return null
		expect(addrs === null).toBe(true);
		
		var addr1 = aid.addAddress(new Object);	// return false
		expect(addr1 < 0).toBe(true);

		rslt = aid.rmAddress("test");
		expect(rslt < 0).toBe(true);

		tv4.dropSchemas();
		tv4.reset();
	});

});

function getDef(base, id) {
	var def = base["definitions"];
	var obj = (def[id] === "undefined")? null: def[id];
	return obj;
};

// get the schemas
var prop = property.schema;
var agt = agentID.schema;

//add schema to 
tv4.addSchema(prop)
var aid = new agentID("aid",["ssss"])
var aid1 = new agentID("aid1",["address"],[aid]);

var aid0 = new agentID("aid0",["ssss"],[aid1]);
aid0.addAddress("test1");
var val = tv4.validate(aid0, agt, true);
if (tv4.error) console.log(aid0.toString(),val, tv4.error.toString());


val = tv4.validate(aid1,agt, true);
var aid2 = aid1.clone();
val = tv4.validate(aid2,agt, true);

		var aid = new agentID("aid");
		
		aid.addAddress("addr1");
