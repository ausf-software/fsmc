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
		document.getElementById("back").innerHTML = "";
		var input = document.getElementById('function-input');
		var ob = new StateMachine(input.value);
		ob.parseFunction();
		ob.setsInit();
		ob.calculateState();
		var theDiv = document.getElementById("back");
		theDiv.innerHTML += ob.toHtmlString();
		theDiv.appendChild(content);
		console.log(ob.toString());	
	}
};
//1*n+2*m-3