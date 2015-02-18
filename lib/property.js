/*
 * 
 */
var tv4 = require("tv4");

var Property = function(__keyword, __value){
    if (__keyword === undefined) {// parameter was omitted in call
        _keyword = null;
        _value = null;		// any
	} else {
		if ((arguments.length != 2) ||
			(typeof(__keyword) !== 'string')) {
				throw new Error("Invalid Param");
			} 
	}

	this.keyword = __keyword;
	this.value = __value;
};

Property.clone = function(prop) {
	if ((typeof(prop) === 'undefined') || !(tv4.validate(prop,Property.schema))) {
		throw new Error("Property.clone: Invalid Parameter");
	}
	nprop = new Property(prop.keyword, prop.value);
	return nprop;
};

Property.schema = {
	"id": "Property",
	"title": "Property",
	"type": "object",
	"properties": {
		"keyword": {"type": "string"},
		"value": { }
	},
	"required": ["keyword", "value"]
};

module.exports = Property;
