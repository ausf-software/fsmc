class Parametr {
	
	// 0 - plus
	// 1 - minus
	// 1 - number
	// 0 - varible
	constructor (type, value, operation, name) {
		this.type = type;
		this.value = value;
		this.name = name;
		this.operation = operation;
	}
	
};

class Set {
	
	constructor (size, values) {
		this.size = size;
		this.values = values;
	}
	
	toString() {
		var st = "{" + this.values[0];
		for (var i = 1; i < this.size; i++) {
			st += ", " + this.values[i];
		}
		st += "}";
		return st;
	}
	
};

class Transition {
	
	constructor (start, set, end, res) {
		this.start = start;
		this.set = set;
		this.end = end;
		this.res = res;
	}
	
	toString() {
		var st = this.end +  ": [" + this.set.toString() + ", bit: " + this.res + "]";
		return st;
	}
	
};

class State {
	
	name;
	type;
	operation;
	value;
	trans;
	
	// 0 - start
	// 1 - else
	constructor (name, type, operation, value) {
		this.name = name;
		this.type = type;
		this.operation = operation;
		this.value = value;
		this.trans = [];
	}
	
	addTransition(set, st, res){
		this.trans.push(new Transition(this.name, set, st, res));
	}
	
};