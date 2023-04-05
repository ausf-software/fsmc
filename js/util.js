function createBinaryString (nMask) {
  // nMask must be between -2147483648 and 2147483647
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  return sMask;
}

function getIndexString(st) {
	var new_st = "";
	
	for (var i = 0; i < st.length; i++) {
		switch (st.at(0)) {
			case '0':
				new_st += "₀";
				break;
			case '1':
				new_st += "₁";
				break;
			case '2':
				new_st += "₂";
				break;
			case '3':
				new_st += "₃";
				break;
			case '4':
				new_st += "₄";
				break;
			case '5':
				new_st += "₅";
				break;
			case '6':
				new_st += "₆";
				break;
			case '7':
				new_st += "₇";
				break;
			case '8':
				new_st += "₈";
				break;
			case '9':
				new_st += "₉";
				break;
		}
	}
	
	return new_st;
}

function getDNF(states, state_table, sets, sets_table, trans_if_function, state_if_function) {
	var codes_state = [];
	var codes_var = [];
	
	for (var i = 0; i < states.length; i++) {
		if (state_if_function(states[i]), state_table) {
			var code_state = [];
			var code_vars = [];
			
			for (var k = 0; k < state_table.step; k++) {
				code_state.push(new PDNFObject(state_table.codes_sets[i].values[k], "q", getIndexString(k.toString())));
			}
			
			for (var k = 0; k < sets.length; k++) {
				var code_var_ = [];
				
				if (trans_if_function(states, i, k)) {
					for (var y = 0; y < sets_table.step; y++) {
						code_var_.push(new PDNFObject(sets_table.codes_sets[k].values[y], "x", getIndexString(y.toString())));
					}
				}
				if (code_var_.length != 0) {
					code_vars.push(new PDNFCode(code_var_));
				}
			}
			
			if (code_vars.length != 0) {
				codes_state.push(new PDNFCode(code_state));
				codes_var.push(new PDNFSample(code_vars));
			}
		}
	}
	return new DNF(codes_state, codes_var);
}

function getStatesQ(q_number, state_table) {
	var names = [];
	for (var i = 0; i < state_table.names.length; i++) {
		if (state_table.codes_sets[i].values[q_number] == '1') {
			
			names.push(state_table.names[i]);
		}
	}
	return names;
}