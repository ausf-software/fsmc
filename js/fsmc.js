setHide("info_div", "info_selector", "Readme");
setHide("text_answer_div", "answer_text_selector", "Text answer");
setHide("table_div", "answer_table_selector", "Tables");
setHide("pdnf_div", "answer_pdnf_selector", "Сanonical equation");
setHide("img_div", "answer_img_selector", "Image");
setHide("uml_div", "answer_uml_selector", "UML code");
setHide("steps_div", "steps_selector", "Solution algorithm");

var last = Date.now();

document.getElementById("function-submit").onclick = function(){
	var diff = Date.now() - last;
	if (diff > 1000) {
		last = Date.now();
		var input = document.getElementById('function-input');
		if (isValid(input)) {
			document.getElementById("text_answer_div").innerHTML = "<br>";
			document.getElementById("table_div").innerHTML = "<br>";
			document.getElementById("pdnf_div").innerHTML = "<br>";
			
			var ob = new StateMachine(input.value);
			ob.parseFunction();
			ob.setsInit();
			ob.calculateState();
			ob.calculateCanonical();
			
			var theDivText = document.getElementById("text_answer_div");
			theDivText.innerHTML += ob.toHtmlString();
			
			var theDivTable = document.getElementById("table_div");
			theDivTable.innerHTML += ob.state_table.toHtmlString();
			theDivTable.innerHTML += ob.sets_table.toHtmlString();
			
			var theDivDNF = document.getElementById("pdnf_div");
			theDivDNF.innerHTML += getDNFAnswerHtml(ob);
			
			var umlString = ob.toUmlString();
			
			var theUML = document.getElementById("uml_div");
			theUML.innerHTML = "<p class='answer'>" + umlString.replaceAll("\n", "<p class='answer'>");
			
			var dia = document.getElementById("diagram");
			if (dia != null)
				dia.remove();
			
			var img = document.createElement("img");
			img.id = "diagram";
			img.src = "https://www.plantuml.com/plantuml/png/" + compress2(umlString);
			document.getElementById("img_div").appendChild(img);
		} else {
			alert("Invalid text");
		}
	}
}

document.getElementById("info_selector").onclick = function(){
	setHide("info_div", "info_selector", "Readme");
}

document.getElementById("answer_text_selector").onclick = function(){
	setHide("text_answer_div", "answer_text_selector", "Text answer");
}

document.getElementById("answer_table_selector").onclick = function(){
	setHide("table_div", "answer_table_selector", "Tables");
}

document.getElementById("answer_pdnf_selector").onclick = function(){
	setHide("pdnf_div", "answer_pdnf_selector", "Сanonical equation");
}

document.getElementById("answer_img_selector").onclick = function(){
	setHide("img_div", "answer_img_selector", "Image");
}

document.getElementById("answer_uml_selector").onclick = function(){
	setHide("uml_div", "answer_uml_selector", "UML code");
}

document.getElementById("steps_selector").onclick = function(){
	setHide("steps_div", "steps_selector", "Solution algorithm");
}

function setHide(id, name, text) {
	var element = document.getElementById(id);
	if (element.style.display == 'none') {
		element.style.display = '';
		document.getElementById(name).innerHTML = "▼ " + text;
	} else {
		element.style.display = 'none';
		document.getElementById(name).innerHTML = "➤ " + text;
	}
}

function log(ob) {
	console.log(ob.summands);
	console.log(ob.states);
	console.log(ob.toString());
	console.log(ob.sets_table.toString());
}

function getDNFAnswerHtml(state_machine) {
	var st = "";
	for (var i = 0; i < state_machine.canonical.length; i++) {
		st += "<p class='answer'>" + state_machine.canonical[i].toString();
	}
	return st;
}

function isValid(input) {
	return input.value != "" && /^[a-z0-9-+]+$/.test(input.value);
}