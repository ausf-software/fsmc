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

var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}


//source http://www.plantuml.com/plantuml/uml
function compress2(s) {
	//UTF8
	s = unescape(encodeURIComponent(s));
	var arr = [];
	for (var i = 0; i < s.length; i++)
		arr.push(s.charCodeAt(i));	
	var compressor = new Zopfli.RawDeflate(arr);
	var compressed = compressor.compress();
	return encode64_(compressed);
}
