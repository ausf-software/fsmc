document.getElementById("function-submit").onclick = function(){
	document.getElementById("text_answer_div").innerHTML = "<br>";
	var input = document.getElementById('function-input');
	var ob = new StateMachine(input.value);
	ob.parseFunction();
	ob.setsInit();
	ob.calculateState();
	console.log(ob.summands);
	console.log(ob.states);
	console.log(ob.toString());
	var theDiv = document.getElementById("text_answer_div");
	theDiv.innerHTML += ob.toHtmlString();
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