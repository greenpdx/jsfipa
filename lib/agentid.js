/*
 * 
 */


var property = require('./property');
var tv4 = require("tv4");
var toClass = {}.toString;

var AgentID = function(__name, __addresses, __resolvers, __userDefinedProperties) {
	this.name = null;
    this.addresses = [];		// []string
	this.resolvers = [];		// []AgentID
	this.userDefinedProperties = []; //[]Property;

	if (arguments.length > 0) {
		if ((arguments[0] !== 'undefined') && (typeof(arguments[0]) === 'string')) {
			this.name = arguments[0];
		} else {	// invalid parameter
			throw new Error("AgentID.name Invalid Parameter");
		}

		var i =0;
		if (typeof(arguments[1]) !== "undefined") {
			var a = typeof(arguments[1]);
			var t = typeof(["zot"]);
			var l = arguments[1].length;
			if ((arguments[1].constructor === Array) && (arguments[1].length > 0)) {
				var strary = arguments[1];
				this.addresses = [];
				for (i = 0; i < strary.length; i++) {
					this.addresses.push(strary[i]);
				}
			} else	// invalid parameter
				throw new Error("AgentID.addresses Invalid Parameter");
		}	// ignore missing
		if (typeof(arguments[2]) !== 'undefined') {
			if ((arguments[2].constructor === Array) && (arguments[1].length > 0)) {
				var aidary = arguments[2];
				this.resolvers = [];
				for (i = 0; i < aidary.length; i++) {
					this.resolvers.push(AgentID.clone(aidary[i]));
				}
			} else	//invalid parameter
				throw new Error("AgentID.resolvers Invalid Parameter");
		}	// ignore missing
		if (typeof(arguments[3]) !== 'undefined') {
			if ((arguments[3].constructor === Array) && arguments[3].length > 0) {
				var prpary = arguments[3];
				this.userDefinedProperties = [];
				for (i = 0; i < prpary.length; i++) {
					this.userDefinedProperties.push(property.clone(prpary[i]));
				}
			} else {  // something there invalid
				throw new Error("AgentID.userDefinedProperties Invalid Parameter");
			}
		} // if undefined ignore
	}
	return this;
};

AgentID.clone = function(aid) {		// AgentID
	if ((aid === 'undefined') || !(tv4.validate(aid, AgentID.schema))) {		// AgentID
		console.log("AgentID.clone "+tv4.error);
		return null;
	}
	var naid = new AgentID();
	naid.name = (typeof(aid.name) === 'string')? aid.name: null;
	var i = 0;
	if ((typeof(aid.addresses) !== 'undefined') && (aid.addresses.constructor === Array)) {
		naid.addresses = [];
		for (i=0;i < aid.addresses.length ;i++) {
			var ad = aid.addresses[i];
			naid.addresses.push(ad);
		}
	}
	if ((typeof(aid.resolvers) !== 'undefined') && (aid.resolvers.constructor === Array)) {
		naid.resolvers = [];
		for (i=0;i < aid.resolvers.length ;i++) {
			naid.resolvers.push(AgentID.clone(aid.resolvers[i]));
		}
	}
	if ((typeof(aid.userDefinedProperties) !== 'undefined') && (aid.userDefinedProperties.constructor === Array)) {
		naid.userDefinedProperties = [];
		for (i=0;i < aid.userDefinedProperties.length ;i++) {
			naid.userDefinedProperties.push(property.clone(aid.userDefinedProperties[i]));
		}
	}
	return naid;
};

AgentID.prototype.getName = function() {
	return this.name;
};

AgentID.prototype.setName = function(_name) {
	this.name = _name;
};

AgentID.prototype.getAddress = function(_addr) {
	if ((typeof(_addr) !== 'string') || (typeof(this.addresses) === 'undefined')) {
		return this.addresses;
	}
	var idx = this.addresses.indexOf(_addr);
	if (idx < 0) return null;
	return idx;
};

AgentID.prototype.addAddress = function(_addr) {
	if (typeof(_addr) !== 'string') {
		return false;
	}
	if (typeof(this.addresses) === 'undefined') this.addresses = [];
	var idx = this.addresses.indexOf(_addr);
	if ( idx < 0 ) {
		this.addresses.push(_addr);
		return true;
	}
	return false;
};

AgentID.prototype.rmAddress = function(_addr) {
	if ((typeof(_addr) !== 'string') || (typeof(this.addresses) === 'undefined')) {
		return false;
	}
	var idx = this.addresses.indexOf(_addr);
	if (idx < 0) return false;
	this.addresses.splice(idx,1);
	return true;
};

AgentID.prototype.getResolve = function(_rosv) {
	if (typeof(_rosv) ==='undefined') return this.resolvers;
	if (!(_rosv instanceof AgentID)) throw new Error("AgentID.getResolve: Invalid Param");
	
	var idx = this.resolvers.indexOf(_rosv);
	if (idx < 0) return null;
	return idx;
};

AgentID.prototype.addResolve = function(_rosv) {
	if (!(_rosv instanceof AgentID)) {
		return false;
	}
	if (typeof(this.resolvers) === 'undefined') this.resolvers = [];
	var idx = this.resolvers.indexOf(_rosv);
	if ( idx < 0 ) {
		this.resolvers.push(_rosv);
		return true;
	}
	return false;
};

AgentID.prototype.rmResolve = function(_rosv) {
	if ((!(_rosv instanceof AgentID)) || (typeof(this.resolvers) === 'undefined')) {
		return false;
	}
	var idx = this.resolvers.indexOf(_rosv);
	if (idx < 0) return false;
	this.resolvers.splice(idx,1);
	return true;
};

AgentID.prototype.getProperty = function(_prop) {
	if ((!(_prop instanceof Property)) || (typeof(this.userDefinedProperties) === 'undefined')) {
		return this.userDefinedProperties;
	}
	var idx = this.userDefinedProperties.indexOf(_prop);
	if (idx < 0) return null;
	return idx;
};

AgentID.prototype.addProperty = function(_rosv) {
	if (!(_rosv instanceof Property)) {
		return false;
	}
	if (typeof(this.userDefinedProperties) === 'undefined') this.userDefinedProperties = [];
	var idx = this.userDefinedProperties.indexOf(_rosv);
	if ( idx < 0 ) {
		this.property.push(_addr);
		return true;
	}
	return false;
};

AgentID.prototype.rmProperty = function(_rosv) {
	if ((!(_rosv instanceof Property)) || (this.userDefinedProperties.length === 0)) {
		return false;
	}
	var idx = this.userDefinedProperties.indexOf(_rosv);
	if (idx < 0) return false;
	this.property.splice(idx,1);
	return true;
};

AgentID.schema = {
	"id": "AgentID",
	"title": "AgentID",
	"type": "object",
	"properties": {
		"name": {"type":"string"},
		"addresses": {
			"type": "array",
			"items": "string",
			"minItems": 0,
			"uniqueItems": true
		},
		"resolvers": {
			"type": "array",
			"items": {"$ref": "#/definitions/AgentID"},
			"minItems": 0,
			"uniqueItems": true					
		},
		"userDefinedProperties": {
			"type": "array",
			"items": {"$ref": "#/definitions/Property"},
			"minItems": 0,
			"uniqueItems": true					
		}
	},
	"required": ["name"]
};

module.exports = AgentID;

function main() {
	var aid = new AgentID("aid");
	var aid1 = new AgentID("aid1");
	var aid2 = new AgentID("aid2");
		
	aid.addResolve(aid1);
	tv4.addSchema(property.schema);
	var valid = tv4.validate( aid, AgentID.schema);
	//expect(valid).toBe(true);
	console.log(valid);

	var addrs = aid.getResolve();		//return array len=1
	//expect( (Array.isArray(addrs) && addrs.length == 1) ).toBe(true);
		
	var addr1 = aid.getResolve(aid1);	// return int
	console.log(addr1+" "+typeof(addr1));
	//expect((typeof(addr1) === 'number') && addr1 == 0).toBe(true);

}

main();
