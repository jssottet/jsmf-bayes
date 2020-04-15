var classifier = require('./Referencemodel_BayesClassifier_');
var JSMF = require('jsmf-core'); var Model = JSMF.Model; var Class = JSMF.Class;
var _ = require('lodash');

// Create a new JSMF (meta)model
var m = new Model();


function scenario1() {

	var mmsc1 = new Model();

	var C1 = Class.newInstance('C1');
	C1.setAttribute('name', String);
	C1.setAttribute('age', Number);

	var C2 = Class.newInstance('C2');
	C2.setAttribute('validity', Boolean);

	var C3 = Class.newInstance('C3');
	C3.setAttribute('localisation', String);

	mmsc1.add([C1,C2,C3]);

	var c1a = {name:'Rob', age:18};
	var c1b = {name:'Steph',age:7};
	var c1c = {name:'Tyson'};

	var c2 = {validity:true};
	var c2b = {validity:false};

	var c3 = {localisation:'Germany'}
	var c3b ={localisation:'Sweden'}	
	
	var falseP = {test:42};
	var falseP2 = {valid:true};
	//build the data example
	var bagRaw = [c1a,c1b,c1c,c2,c2b,c3,c3b,falseP,falseP2];

	//launch the classifier
	classifier.classifyFromMetamodel(mmsc1,bagRaw);

}

function scenario2() {

	var mmsc1 = new Model();

	var C1 = Class.newInstance('C1');
	C1.setAttribute('givenname', String);
	C1.setAttribute('age', Number);

	var C2 = Class.newInstance('C2');
	C2.setAttribute('givenname', String);
	C2.setAttribute('surname', String);

	mmsc1.add([C1,C2]);


	var c1 = {givenname:'Pony', age:13};
	var c1amb = {givenname:'Penny'};
	var c2 = {givenname:'Tuckson', surname:'Sonny'};
	var c2amb = {givenname:'Barns'};
	//build the data example
	var bagRaw = [c1,c1amb,c2,c2amb];

	//launch the classifier
	classifier.classifyFromMetamodel(mmsc1,bagRaw);

}

function scenario3() {

	var mmsc1 = new Model();

	var C1 = Class.newInstance('C1');
	C1.setAttribute('name', String);
	C1.setAttribute('age', Number);

	var C2 = Class.newInstance('C1');
	C2.setAttribute('validity', Boolean);

	var C3 = Class.newInstance('C1');
	C3.setAttribute('localisation', String);

	mmsc1.add([C1,C2,C3]);

	//build the data example
	var bagRaw = [];

	//launch the classifier
	

}

function scenario3a() {

	var mmsc1 = new Model();

	var C1 = Class.newInstance('C1');
	C1.setAttribute('name', String);

	var C2 = Class.newInstance('C2');
	C2.setAttribute('name', String);

	var C3 = Class.newInstance('C3');
	C3.setAttribute('name', String);

	var C4 = Class.newInstance('C4');
	C4.setAttribute('name',String)
	
	C1.setReference('toC2',C2,-1);
	C2.setReference('toC3',C3,-1);
	C1.setReference('toC4',C4,-1);	
	
	mmsc1.add([C1,C2,C3,C4]);

	var c3 = {name:'ac3'};
	
	var c4 = {name:'ac4'};
	var c2 = {name:'ac2','toC3':c3};
	//var c2End = {name:'ac2'}

	var c1 = {name:'ac1','toC2':c2,'toC4':c4};
	

	//build the data example
	var bagRaw = [c4,c3,c2,c1];

	//launch the classifier
	classifier.classifyFromMetamodel(mmsc1,bagRaw);

}

function scenario3b() {

	var mmsc1 = new Model();

	var C1 = Class.newInstance('C1');
	C1.setAttribute('name', String);

	var C2 = Class.newInstance('C2');
	C2.setAttribute('name', String);

	var C3 = Class.newInstance('C3');
	C3.setAttribute('name', String);

	var C4 = Class.newInstance('C4');
	C4.setAttribute('name',String)
	
	C1.setReference('toC2',C2,-1);
	C2.setReference('toC3',C3,-1);
	C1.setReference('toC4',C4,-1);	
	
	mmsc1.add([C1,C2,C3,C4]);

	var c3 = {name:'ac3'};
	
	var c4 = {name:'ac4'};
	var c2 = {name:'ac2','toC3':c3};
	//var c2End = {name:'ac2'}

	var c1 = {name:'ac1','toC2':c2,'toC4':c4};
	

	//build the data example
	var bagRaw = [c1,c2,c3,c4];

	//launch the classifier
	classifier.classifyFromMetamodel(mmsc1,bagRaw);

}


function scenario3bprime() {

	var mmsc1 = new Model();

	var C1 = Class.newInstance('C1');
	C1.setAttribute('name', String);

	var C2 = Class.newInstance('C2');
	C2.setAttribute('name', String);

	var C3 = Class.newInstance('C3');
	C3.setAttribute('name', String);

	var C4 = Class.newInstance('C4');
	C4.setAttribute('name',String)
	
	C1.setReference('toC2',C2,-1);
	C2.setReference('toC3',C3,-1);
	C1.setReference('toC4',C4,-1);

	//add reverse relations
	C4.setReference('toC1',C1,-1);	
	C3.setReference('toC2',C2,-1);	
	C2.setReference('toC1',C1,-1);

	mmsc1.add([C1,C2,C3,C4]);

	var c3 = {name:'ac3'};
	
	var c4 = {name:'ac4'};
	var c2 = {name:'ac2','toC3':c3};
	//var c2End = {name:'ac2'}

	var c1 = {name:'ac1','toC2':c2,'toC4':c4};

	//Add reverse relations
	c4.toC1=c1;
	c3.toC2=c2;
	c2.toC1=C1;

	//build the data example
	var bagRaw = [c1,c2,c3,c4];

	//launch the classifier
	classifier.classifyFromMetamodel(mmsc1,bagRaw);

}



function scenario3c() {

	var mmsc1 = new Model();

	var C1 = Class.newInstance('C1');
	C1.setAttribute('name', String);

	var C2 = Class.newInstance('C2');
	C2.setAttribute('name', String);

	var C4 = Class.newInstance('C4');
	C4.setAttribute('name',String)
	
	C1.setReference('toC2',C2,-1);
	C1.setReference('toC4',C4,-1);	
	
	mmsc1.add([C1,C2,C4]);
	
	var c4 = {name:'ac4'};
	var c2 = {name:'ac2'};
	//var c2End = {name:'ac2'}

	var c1 = {name:'ac1','toC2':c2,'toC4':c4};
	
	//build the data example
	var bagRaw = [c1,c2,c4];

	//launch the classifier
	classifier.classifyFromMetamodel(mmsc1,bagRaw);

}

function scenario4() {

	var mmsc1 = new Model();

	var C1 = Class.newInstance('C1');
	C1.setAttribute('name', String);

	var C2 = Class.newInstance('C2');
	C2.setAttribute('name', String);

	var C3 = Class.newInstance('C3');
	C3.setAttribute('name', String);



	
	C1.setReference('toC2',C2,-1);
	C3.setReference('toC2',C2,-1);

	mmsc1.add([C1,C2,C3]);

	var c2 = {name:'ac2'};

	var c1 = {name:'ac1','toC2':c2};

	var c3 = {name:'ac3','toC2':c2};

	//build the data example
	var bagRaw = [c1,c2,c3];

	//launch the classifier
	classifier.classifyFromMetamodel(mmsc1,bagRaw);


}

function scenario5() {

	var mmsc1 = new Model();

	var C1 = Class.newInstance('C1');
	C1.setAttribute('name', String);

	var C2 = Class.newInstance('C2');
	C2.setAttribute('name', String);

	var C3 = Class.newInstance('C3');
	C3.setAttribute('name', String);


	
	C1.setReference('toC2',C2,-1);
	C2.setReference('toC3',C3,-1);
	C3.setReference('toC1',C1,-1);

	mmsc1.add([C1,C2,C3]);


	var c2 = {name:'ac2'};

	var c1 = {name:'ac1'};

	var c3 = {name:'ac3'};

	c1.toC2=c2;
	c3.toC1=c1;
	c2.toC3=c3;

	//build the data example
	var bagRaw = [c1,c2,c3];

	//launch the classifier
	classifier.classifyFromMetamodel(mmsc1,bagRaw);

}

/*
//Reference metamodel
var B = Class.newInstance('B');
B.setAttribute('type', Number);
B.setAttribute('strength', Number);

var A = Class.newInstance('A');
A.setAttribute('name', String);
A.setAttribute('value', Number);
A.setReference('toB',B,-1);

m.add([A,B]);


var C1 = Class.newInstance('C1');
C1.setAttribute('name',String);
C1.setAttribute('value',Number);

var C2 = Class.newInstance('C2');
C2.setAttribute('name',String);
C2.setAttribute('category',Number);

//m.add([C1,C2]);


var One = Class.newInstance('One');
One.setAttribute('type', String);

var Two = Class.newInstance('Two');
Two.setAttribute('name', String);

var Three = Class.newInstance('Three');
Three.setAttribute('name',String);

One.setReference('toTwo',Two,-1);
Two.setReference('toThree',Three,-1);


//m.add([One,Two,Three]);

//V1->V3 same signature; 
var V1 = Class.newInstance('V1');
V1.setAttribute('name',String);

var V2 = Class.newInstance('V2');
V1.setAttribute('name',String);

var V3 = Class.newInstance('V3');
V1.setAttribute('name',String);


V1.setReference('toV2',V2,-1);
V2.setReference('toV3',V3,-1);

//m.add([V1,V2,V3]);

//Example to be classified
var b = {'type':14,'strength':1};

var c = {'type':42,'strength':2};

var a = {'name':'toto','value':14,'toB':b};

var d = {'toB':[b,c]}

var o3 = {'name':'wheel'}
var o2 = {'name':'engine','toThree':o3}
var o1 = {'type':'hatchback','toTwo':o2};


var va = {'name':'Three'};
var vb = {'name': 'Two', 'toV3': va};
var vc = {'name':'One', 'toV2':vb};
var vx = {'name':'OPrime','toV2':vb};

var bagRaw = [a,b,c,d];

classifier.classifyFromMetamodel(m,bagRaw);
*/

//Run the scenario(s) of your choice by uncommenting.
//scenario1();
//scenario2();
//scenario3a();
scenario3b();
//scenario3bprime();
//scenario3c();
//scenario4();
//scenario5();
