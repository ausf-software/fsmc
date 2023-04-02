window.onload = function () {
	document.getElementById("menu").onclick = function(){
	var x = document.getElementById('site_menu');
		if (x.className === "site_menu") {
		x.className += " responsive";
		} else {
		x.className = "site_menu";
		}
	}
	document.getElementById("function-submit").onclick = function(){
		document.getElementById("text_answer").innerHTML = "<label id='answer_text_selector' class='selector'>&#9660; Text answer</label><br><br>";
		var input = document.getElementById('function-input');
		var ob = new StateMachine(input.value);
		ob.parseFunction();
		ob.setsInit();
		ob.calculateState();
		var theDiv = document.getElementById("text_answer");
		theDiv.innerHTML += ob.toHtmlString();
		console.log(ob.states);
		console.log(ob.summands);	
	}
};
//1*n+2*m-3