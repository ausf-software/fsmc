
var ob = new StateMachine("1*n+2*m-3");
ob.parseFunction();
ob.setsInit();
ob.calculateState();
console.log(ob.toString());