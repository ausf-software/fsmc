class StateMachine {
	
	func;
	summands;
	setSize;
	sets;
	states;
	isNumber;
	
	sets_table;
	state_table;
	canonical;

    constructor (func) {
        this.func = func;
		this.summands = [];
		this.setSize = 0;
		this.sets = [];
		this.states = [];
		this.isNumber = false;
		this.canonical = [];
	}
	
	parseFunction() {
		var temp = this.func;
		temp = temp.replaceAll("-", "+-");
		var sum = temp.split("+");
		var regIsNumber = new RegExp("^[0-9-]+$");
		
		for (let i = 0; i < sum.length; i++) {
			
			var type = regIsNumber.test(sum[i]) ? 1 : 0;
			var operation = sum[i].at(0) == '-' ? 1 : 0;
			sum[i] = sum[i].replace("-", "");
			
			var pos_name = 1;
			var sub = sum[i].split("*");
			var value;
			var name = "";
			
			if (type == 0) {
				if (sub.length == 2) {
					if (regIsNumber.test(sub[0])) {
						value = Number(sub[0]);
					} else {
						value = Number(sub[1]);
						pos_name = 0;
					}
				} else {
					if (sub[0].length == 0) {
						value = 0;
					} else {
						var last = sub[0].at(sub[0].length - 1);
						if (regIsNumber.test(last)) {
							name = sub[0].substring(0, 1);
							var pr = sub[0].at(1);
							value = pr.length != 0 ? Number(pr) : 1;
						} else {
							name = last;
							var pr = sub[0].substring(0, sub[0].length - 1);
							value = pr.length != 0 ? Number(pr) : 1;
						}
					}
				}
			} else {
				value = Number(sub[0]);
			}
			
			name = name.length == 0 ? (type == 1 ? "number" : sub[pos_name]) : name;
			
			if (type == 0) this.setSize++;
			else this.isNumber = true;
			
			this.summands.push(new Parametr(type, value, operation, name));
		}
	}
	
	setsInit() {
		var count = 2**this.setSize;
		var table_names = [];
		
		for (var i = 0; i < count; i++) {
			var str = createBinaryString(i).slice(32 - this.setSize);
			this.sets.push(new Set(this.setSize, str.split("")));
			table_names.push(this.sets[i].toString());
		}
	
		this.sets_table = new CodeTable(table_names, "x");
		this.sets_table.calculate();
	}
	
	calculateState() {
		if (!this.isNumber) {
			this.states.push(new State("+0", 0, 0, 0));
		} else {
			for(var item of this.summands) {
				if (item.type == 1) {
					var temp = (item.operation == 1 ? "-" : "+") + item.value;
					this.states.push(new State(temp, 0, item.operation, item.value));
					break;
				}
			}
		}
		var table_names = [];
		var max = 1;
		for (var mark = 0; mark < max; mark++) {
			for (var set of this.sets) {
				var temp = this.states[mark].value * (this.states[mark].operation == 1 ? -1 : 1);
				for (var i = 0; i < set.size; i++) {
					temp += set.values[i] * this.summands[i].value * (this.summands[i].operation == 1 ? -1 : 1);
				}
				
				var new_state_operation = temp >= 0 ? 0 : 1;
				temp *= temp >= 0 ? 1 : -1;
				
				var binary = temp.toString(2);
				
				var res;
				if (new_state_operation == 1 && temp % 2 == 1) {
					temp += 2;
					binary = temp.toString(2);
				}
				res = Number(binary.at(binary.length - 1));
				
				var state;
				if (binary.length != 1) {
					state = binary.substring(0, binary.length - 1);
				} else {
					state = "0";
				}
				
				var vl = parseInt(state, 2);
				var name = (new_state_operation == 0 ? "+" : "-") + vl;
				
				var flag = -1;
				for (var k  = 0; k < this.states.length; k++) {
					if (this.states[k].name == name) { 
						flag = k;
						break;
					}
				}
				
				if (flag == -1) {
					var st = new State(name, 1, new_state_operation, vl);
					this.states.push(st);
					this.states[mark].addTransition(set, name, res);
					max++;
				} else {
					this.states[mark].addTransition(set, this.states[flag].name, res);
				}
			}
			table_names.push(this.states[mark].name);
		}
		
		this.state_table = new CodeTable(table_names, "q");
		this.state_table.calculate();
	}
	
	toString() {
		var st = "";
		st += "The original function: " + this.func + "\n";
		st += "Initial state: " + this.setSize + "\n\n";
		for (var i = 0; i < this.states.length; i++) {
			st += "Out of state " + this.states[i].name + ":\n";
			for (var k = 0; k < this.sets.length; k++) {
				st += "		in the state of " + this.states[i].trans[k].toString() + "\n";
			}
			st += "\n";
		}
		return st;
	}
	
	toHtmlString() { 
		var st = "";
		st += "<p class='answer'>The original function: " + this.func;
		st += "<p class='answer'>Number of variables: " + this.setSize;
		st += "<p class='answer'>Initial state: " + this.states[0].name;
		for (var i = 0; i < this.states.length; i++) {
			st += "<p class='answer'>Out of state " + this.states[i].name + ":";
			for (var k = 0; k < this.sets.length; k++) {
				st += "<p class='answer-item'>in the state of " + this.states[i].trans[k].toString();
			}
		}
		return st;
	}
	
	calculateCanonical() {
		var res = [];
		
		var trans_if_function_y = function(states, state_id, trans_id){
			return states[state_id].trans[trans_id].res == 1;
		}
		
		var state_if_function_y = function(state, state_table){
			return true;
		}
		var y_text = "y(t) =";
		var y_dnf = getDNF(this.states, this.state_table, this.sets, this.sets_table, trans_if_function_y, state_if_function_y);
		y_text += " " + y_dnf.toString();
		res.push(y_text);
		
		var q_number = 0;
		var names = [];
		var state_if_function_q = function(state, state_table){
			var flag = false;
			for (var i = 0; i < names.length && !flag; i++) {
				flag = state.trans[i].end == names[i];
			}
			return flag;
		}
		
		var trans_if_function_q = function(states, state_id, trans_id){
			var flag = false;
			for (var i = 0; i < names.length && !flag; i++) {
				flag = states[state_id].trans[trans_id].end == names[i];
			}
			return flag;
		}
		
		for (; q_number < this.state_table.step; q_number++) {
			names = getStatesQ(q_number, this.state_table);
			var q_dnf = getDNF(this.states, this.state_table, this.sets, this.sets_table, trans_if_function_q, state_if_function_q);
			var q_text = "q" + getIndexString(q_number.toString()) + "(t) =";
			q_text += " " + q_dnf.toString();
			res.push(q_text);
		}
		
		this.canonical = res;
	}
	
	toUmlString() {
		var res = "@startuml\n";
		res += "!theme sketchy-outline\n";
		res += "title " + this.func  +"\n";
		
		for (var i = 0; i < this.states.length; i++) {
			res += "object " + this.states[i].name.replace("+", "p").replace("-", "m") + "\n";
		}
		
		for (var i = 0; i < this.states.length; i++) {
			var used = new Array(this.sets.length).fill(0);
			for (var k = 0; k < this.sets.length; k++) {
				if (used[k] != 0)
					continue;
				var temp = this.states[i].trans[k];
				var pairs = "";
				for (var b = k; b < this.sets.length; b++) {
					var curr_trans = this.states[i].trans[b];
					if (temp.end === curr_trans.end) {
						used[b] = 1;
						pairs += curr_trans.set.toString() + "|" + curr_trans.res + "\\n";
					}
				}
				res += (temp.start.replace("+", "p").replace("-", "m") + " --|> " + temp.end.replace("+", "p").replace("-", "m") + ":" + pairs + "\n");
			}
		}
		
		res += "@enduml";
		return res;
	}
	
};
//2n - 10