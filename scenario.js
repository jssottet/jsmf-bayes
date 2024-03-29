var classifier = require('./Referencemodel_BayesClassifier_');
var JSMF = require('jsmf-core'); var Model = JSMF.Model; var Class = JSMF.Class;
var _ = require('lodash'), util = require('util');

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

//Warning: not fully defined
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
	var c4prime = {name:'ac4prime'};
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


function scenarioAPKReverse() {
	var mmAPK = new Model();
	
	var Apk = Class.newInstance('Apk');
	Apk.setAttribute('name', String);
	Apk.setAttribute('version', Number);
	
	//var Permission = Class.newInstance();
	//Permission.setAttribute();

	var Component = Class.newInstance('Component');
	Component.setAttribute('name', String);
	Component.setAttribute('kind', Number);
	Component.setAttribute('export', Boolean);

	var Instruction = Class.newInstance('Instruction');
	Instruction.setAttribute('statement', String);
	Instruction.setAttribute('class_name', String);
	Instruction.setAttribute('method', String);
	Instruction.setAttribute('id', Number);

	Apk.setReference('components',Component,-1);
	Component.setReference('instructions',Instruction,-1);

	mmAPK.add([Apk,Component,Instruction]);

	//The example excerpts, is a transcription 'object by object' of what is produced by protobuf of a reverse-engineered APK.
	var apkroot = {
    	"name": "a2dp.Vol",
    	"version": 107,
    	"permissions": [],
    	"used_permissions": [
    	    "android.permission.WRITE_EXTERNAL_STORAGE",
    	    "android.permission.ACCESS_WIFI_STATE",
    	    "com.google.android.providers.talk.permission.READ_ONLY",
    	    "android.permission.RECEIVE_SMS",
    	    "android.permission.ACCESS_COARSE_LOCATION",
    	    "android.permission.GET_ACCOUNTS",
    	    "android.permission.READ_CONTACTS",
    	    "android.permission.RESTART_PACKAGES",
    	    "android.permission.KILL_BACKGROUND_PROCESSES",
    	    "android.permission.MODIFY_AUDIO_SETTINGS",
    	    "android.permission.READ_PHONE_STATE",
    	    "android.permission.RECEIVE_BOOT_COMPLETED",
    	    "android.permission.BLUETOOTH",
    	    "android.permission.CHANGE_WIFI_STATE",
    	    "android.permission.ACCESS_LOCATION_EXTRA_COMMANDS",
    	    "android.permission.ACCESS_FINE_LOCATION",
    	    "android.permission.BROADCAST_STICKY",
    	    "com.android.launcher.permission.READ_SETTINGS",
    	    "android.permission.BLUETOOTH_ADMIN"
    	]
	}
	
	var componenta2dpService = {"name": "a2dp.Vol.service",
         "kind": 1,
         "exported": false,
         "permission": null,
         "missing": null,
         "alias_target": null,
         "grant_uri_permissions": null,
         "read_permission": null,
         "write_permission": null,
         "authorities": [],
	}
	
	 var componenta2dpAppChooser = {"name": 'a2dp.Vol.AppChooser',
      "kind": 0,
      "exported": false,
      "permission": null,
      "missing": null,
      "alias_target": null,
      "grant_uri_permissions": null,
      "read_permission": null,
      "write_permission": null,
      "authorities": [],
    }

	var componenta2dpProviderList ={"name": 'a2dp.Vol.ProviderList',
      "kind": 0,
      "exported": false,
      "permission": null,
      "missing": null,
      "alias_target": null,
      "grant_uri_permissions": null,
      "read_permission": null,
      "write_permission": null,
      "authorities": []
    }

	var componenta2dpALauncher= {"name": 'a2dp.Vol.ALauncher',
      "kind": 1,
      "exported": false,
      "permission": null,
      "missing": null,
      "alias_target": null,
      "grant_uri_permissions": null,
      "read_permission": null,
      "write_permission": null,
      "authorities": []
    }


	var componenta2dpEditDevice= {"name": 'a2dp.Vol.EditDevice',
      "kind": 0,
      "exported": false,
      "permission": null,
      "missing": null,
      "alias_target": null,
      "grant_uri_permissions": null,
      "read_permission": null,
      "write_permission": null,
      "authorities": []
    }

  var componenta2dpStarter= {"name": 'a2dp.Vol.Starter',
      "kind": 2,
      "exported": true,
      "permission": null,
      "missing": null,
      "alias_target": null,
      "grant_uri_permissions": null,
      "read_permission": null,
      "write_permission": null,
      "authorities": []
    }


var componenta2dpCustomIntentMaker= {"name": 'a2dp.Vol.CustomIntentMaker',
      "kind": 0,
      "exported": false,
      "permission": null,
      "missing": null,
      "alias_target": null,
      "grant_uri_permissions": null,
      "read_permission": null,
      "write_permission": null,
      "authorities": []
    }

var componenta2dpPreferences = { "name": 'a2dp.Vol.Preferences',
      "kind": 0,
      "exported": false,
      "permission": null,
      "missing": null,
      "alias_target": null,
      "grant_uri_permissions": null,
      "read_permission": null,
      "write_permission": null,
      "authorities": []
}

	var instructionr21 = {
         "statement": "virtualinvoke r21.<a2dp.Vol.MyApplication: void sendBroadcast(android.content.Intent)>(r3)",
         "class_name": "a2dp.Vol.service",
         "method": "<a2dp.Vol.service: void onDestroy()>",
         "id": 43
    };

	var instructionr91 = {
          "statement": "virtualinvoke r91.<a2dp.Vol.MyApplication: void sendBroadcast(android.content.Intent)>(r7)",
          "class_name": "a2dp.Vol.service",
          "method": "<a2dp.Vol.service: void onCreate()>",
          "id": 172
     };

	var instructionr13 = {
         "statement": "virtualinvoke r13.<a2dp.Vol.MyApplication: void sendBroadcast(android.content.Intent)>(r3)",
         "class_name": "a2dp.Vol.Preferences",
         "method": "<a2dp.Vol.Preferences: void onDestroy()>",
         "id": 43
    };
	
	var instructionr0 = {
         "statement": "virtualinvoke r0.<a2dp.Vol.Preferences: android.content.ComponentName startService(android.content.Intent)>(r8)",
         "class_name": "a2dp.Vol.Preferences",
         "method": "<a2dp.Vol.service: void onDestroy()>",
         "id": 43
    };

	apkroot.components=(componenta2dpService,componenta2dpAppChooser,componenta2dpProviderList,componenta2dpALauncher,
componenta2dpEditDevice,componenta2dpStarter,componenta2dpCustomIntentMaker,componenta2dpPreferences);
	componenta2dpService.exitpoints=[instructionr21,instructionr91];
	componenta2dpPreferences.exitpoints=[instructionr13,instructionr0];

	//build the data example from objects
	var bagRaw = [apkroot,componenta2dpService,instructionr21,instructionr91,instructionr13,instructionr0,componenta2dpAppChooser,componenta2dpProviderList,componenta2dpALauncher,
componenta2dpEditDevice,componenta2dpStarter,componenta2dpCustomIntentMaker,componenta2dpPreferences
	
	];

	//launch the classifier
	var finalclassificationMap = classifier.classifyFromMetamodel(mmAPK,bagRaw);
	//	console.log('final',util.inspect(finalclassificationMap,showHidden=false, depth=3, colorize=true));
	console.log(finalclassificationMap);
}


//Run the scenario(s) of your choice by uncommenting.
//scenario1();
//scenario2();
//scenario3a();
//scenario3b();
//scenario3bprime();
//scenario3c();
//scenario4();
//scenario5();
scenarioAPKReverse();
