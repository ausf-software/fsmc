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

class CodeTable {
	
	names;
	names_bit;
	codes_sets;
	name_var;
	len_set;
	step;
	
	constructor (names, name_var) {
		this.names = names;
		this.names_bit = [];
		this.codes_sets = [];
		this.name_var = name_var;
		this.len_set = 0;
		this.step = 1;
	}
	
	calculate() {
		this.len_set = 2;
		while(this.len_set < this.names.length) {
			this.len_set *= 2;
			this.step++;
		}
		
		for (var i = 0; i < this.len_set; i++) {
			var str = createBinaryString(i).slice(32 - this.step);
			this.codes_sets.push(new Set(this.step, str.split("")));
		}
		
		for (var i = 0; i < this.step; i++) {
			this.names_bit.push(getIndexString(i.toString()));
		}
		
	}
	
	toString () {
		var st = "    ";
		for (var i = 0; i < this.names_bit.length; i++) {
			st += this.name_var + this.names_bit[i] + " ";
		}
		
		for (var i = 0; i < this.names.length; i++) {
			st += "\n" + this.names[i] + "  ";
			for (var k = 0; k < this.step; k++) {
				st += this.codes_sets[i].values[k] + " ";
			}
		}
		return st;
	}
	
	toHtmlString () {
		var st = "<table><thead><tr><th>K" + this.name_var + "</th>";
		
		for (var i = 0; i < this.names_bit.length; i++) {
			st += "<th>" + this.name_var + this.names_bit[i] + "</th>";
		}
		st += "</tr></thead><tbody>";
		
		for (var i = 0; i < this.names.length; i++) {
			st += "<tr><td>" + this.names[i] + "</td>";
			for (var k = 0; k < this.step; k++) {
				st += "<td>" + this.codes_sets[i].values[k] + "</td>";
			}
			st+= "</tr>"; 
		}
		st += "</tbody></table>";
		return st;
	}
	
};

class PDNFObject {
	
	constructor (value, name, ncode) {
		this.value = value;
		this.name = name;
		this.ncode = ncode;
	}
	
	toString() {
		var t_ = "₍ₜ-₁₎";
		if (this.name == "x") {
			if (this.value == 1) {
				return this.name + this.ncode + t_;
			}
			return "x̅" + this.ncode + t_;
		}
		if (this.value == 1) {
			return this.name + this.ncode + t_;
		}
		return "q̅" + this.ncode + t_;
	}
};

class PDNFCode {
	
	constructor (objects) {
		this.objects = objects;
	}
	
	toString() {
		var st = "";
		
		for (var i = 0; i < this.objects.length; i++) {
			st += this.objects[i].toString();
			if (i != this.objects.length - 1) st += " ᐱ ";
		}
		
		return st;
	}
};

class PDNFSample {
	
	constructor (objects) {
		this.objects = objects;
	}
	
	toString() {
		var st = "";
		
		for (var i = 0; i < this.objects.length; i++) {
			st += this.objects[i].toString();
			if (i != this.objects.length - 1) st += " ᐯ ";
		}
		
		return st;
	}
};

class DNF {
	
	constructor (codes_state, codes_var) {
		this.codes_state = codes_state;
		this.codes_var = codes_var;
	}
	
	toString() {
		var st = "";
		
		for (var i = 0; i < this.codes_state.length; i++) {
			st += "(" + this.codes_state[i].toString() + ") ᐱ (" + this.codes_var[i].toString() + ")";
			if (i != this.codes_state.length - 1) st += " ᐯ ";
		}
		
		return st;
	}
	
}