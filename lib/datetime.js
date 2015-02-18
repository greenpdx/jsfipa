var DateTime = function() {
    //	instance variables
    this.year = 1967;
    this.month = 8;
    this.day = 11;
    this.hour = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.typeDesignator = "";
    if (arguments.length > 0 ) {
		if ((arguments.length == 1) && (typeof(argument[0]) === 'number')) {		//epoch time UTC
			var d = new Date(arguments[0]);
			this.year = d.getFullYear();
			this.month = d.getMonth();
			this.day = d.getDate();
			this.hour = d.getHour();
			this.minutes = d.getMinutes();
			this.seconds = d.getSeconds();
			this.milliseconds = d.getMilliseconds();
		} else {
		this.year = ((arguments[0] !== 'undefined') && (typeof(arguments[0]) ==='number'))? arguments[0]: null;
		this.month = ((arguments[1] !== 'undefined') && (typeof(arguments[1]) ==='number'))? arguments[1]: null;
		this.day = ((arguments[2] !== 'undefined') && (typeof(arguments[2]) ==='number'))? arguments[2]: null;
		this.hour = ((arguments[3] !== 'undefined') && (typeof(arguments[3]) ==='number'))? arguments[3]: null;
		this.minutes = ((arguments[4] !== 'undefined') && (typeof(arguments[4]) ==='number'))? arguments[4]: null;
		this.seconds = ((arguments[5] !== 'undefined') && (typeof(arguments[5]) ==='number'))? arguments[5]: null;
		this.milliseconds = ((arguments[6] !== 'undefined') && (typeof(arguments[6]) ==='number'))? arguments[6]: null;
 		this.typeDesignator = ((arguments[7] !== 'undefined') && (typeof(arguments[7]) ==='number'))? arguments[7]: null;
		}
	}
};



DateTime.clone = function(dt) {
	if ((typeof(dt) === 'undefined') || !(tv4.validate(dt, DateTime.schema))) {
		return false;
	}
	var ndt = new DateTime();
    ndt.year = dt.year;
    ndt.month = dt.month;
    ndt.day = dt.day;
    ndt.hour = dt.hour;
    ndt.minutes = dt.minutes;
    ndt.seconds = dt.seconds;
    ndt.milliseconds = dt.milliseconds;
    ndt.typeDesignator = dt.typeDesignator;
    return ndt;
};

DateTime.schema = {
	"id": "DateTime",
	"title": "DtaeTime",
	"type": "object",
	"properties": {
		"day": {
			"type":"number",
			"minimum": 1,
			"maximum": 31
		},
		"hour": {
			"type": "number",
			"minimum": 0,
			"maximum": 23			
		},
		"milliseconds": {
			"type": "number",
			"minimum": 0,
			"maximum": 999						
		},
		"minutes": {
			"type": "number",
			"minimum": 0,
			"maximum": 59						
		},
		"month": {
			"type": "number",
			"minimum": 1,
			"maximum": 12						
		},
		"seconds": {
			"type": "number",
			"minimum": 0,
			"maximum": 59						
		},
		"typeDesignator": {
			"type": "string",
			"minLength": 1,
			"maxLength": 1						
		},
		"year": {
			"type": "number",						
		},
	},
	"required": [
		"year",
		"typeDesignator",
		"seconds",
		"month",
		"minutes",
		"milliseconds",
		"hour",
		"day"
	]
};

module.exports = DateTime;

