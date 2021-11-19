/**
 * The MIT License (MIT)
 *
 * Copyright ©2016-2021 Luxembourg Institute of Science and Technology All Rights Reserved
 * 
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @author J.S. Sottet
 */

var JSMF = require('jsmf-core'); var Model = JSMF.Model; var Class = JSMF.Class;
var _ = require('lodash');

//Warning: A unique Class name should be provided: JSMF.Class.newInstance('name') check it first ...
var dclassify = require('dclassify');
//var natural = require('natural');


// Utilities provided by dclassify
var Classifier = dclassify.Classifier;
var DataSet    = dclassify.DataSet;
var Document   = dclassify.Document;

/**
* utility function to translate actual value into a JSMF Type
*/
function JSMFtypeof(val) {  
    var result = 'undefined';
     switch(typeof(val)) {
            case 'string' :  
                result ='isString'
                break;
            case 'number' :
                result = 'isNumber'
                break;
            case 'boolean' :
                result = 'isBoolean'
                break;
            case 'object' :
                //if is JSMFObject
                if(val instanceof Date) {
                 result = 'isDate'
                } else {
                   result = 'reference';
                }
                break; 
            case 'undefined':
                break;
            default :
                break;
        }

    return result;    
}

/**
* Train the classifier against a given Class 
* @param givenClass: a JSMF Class
* @return tabDoc: a collection of document for training the Naive Bayesian
*/
//TODO: play on class definition alternance (i.e., put some of the attribute value when not mandatory; generate only equi-proportion of instances)
function buildDoc4Training(givenClass) {

	var tabDoc = [];
	var curr_doc = undefined;

	// giving a 5 excerpt for training purpose with ALL attributes.
	for(i=0;i<5;i++) {

		var itemName = 'item'+givenClass.__name+'_'+i; //building a document id with the name of the class and indice
		var curr_doc = new Document(itemName,[]);

		//using getAllAttributes to extend to inherited attributes
		_.forEach(givenClass.getAllAttributes(), function(attributeObj,attributeName) {			
			curr_doc.add([attributeName+' : '+attributeObj.type.name]) 
		});
		tabDoc.push(curr_doc);
	}
	
	//Generate 5 random attribute combination: partial class
	for(i=0;i<5;i++) {

		var j;
		if(i!==0){j = i*10+i;} else {j=10;}
		var itemName = 'item'+givenClass.__name+'_'+j; //building a document id with the name of the class and indice j
		var curr_doc = new Document(itemName,[]);

		//using getAllAttributes to extend to inherited attributes
		_.forEach(givenClass.getAllAttributes(), function(attributeObj,attributeName) {
			if(!attributeObj.mandatory) {
				//random generation -> should be equally distributed amongst non mandatory attributes?		
				if(((Math.floor(Math.random() * 2) == 0))) { //50% chance to generate a non-mandatory attribute
					curr_doc.add([attributeName +' : '+attributeObj.type.name]) 
				}
			} else {
				curr_doc.add([attributeName+' : '+attributeObj.type.name]) 
			}
		});

		tabDoc.push(curr_doc);
	}	

	return tabDoc;	
}



/**
* (Direct)Train the classifier against a given Class with the same name as features of the given Class
* @param givenClass: a JSMF Class
* @return tabDoc: a collection of document for training
*/
//TODO: play on class definition alternance (i.e., put some example of not related class)
function buildDocTrainingReferences(givenClass) {

	var tabDoc = [];
	var curr_doc = undefined;

	// giving a 5 excerpt for training purpose with all the references of the class (included inherented).
	for(i=0;i<5;i++) {

		var itemName = 'item'+givenClass.__name+'_'+i; //building a document id with the name of the class and indice
		var curr_doc = new Document(itemName,[]);

		//Extend it to all inherited references
		_.forEach(givenClass.getAllReferences(), function(referenceObj,referenceName) {			
			curr_doc.add([referenceName+' : '+referenceObj.type.__name]) 
		});
		tabDoc.push(curr_doc);
	}
		
	return tabDoc;	
}


/**
* Provide a data (set of Dclassify documents) prepared for training the classifier for each class in the metamodel
* @param : model the metamodel from which classification training data could be build
* @return data : a DataSet object (see dclassify library)
**/
function buildDataFromMetaModel(model) {
	var data = new DataSet();
	//iterate over the metamodel 
	_.map(model.classes, function(jsmfClass,className){
		var documents = buildDoc4Training(jsmfClass[0]);
		//Add the document to the given data set associated with the name of the class
		data.add(className,documents);
	});
	return data;
}


function buildDataForReference(model) {
	var data = new DataSet();
	//iterate over the metamodel
	_.map(model.classes, function(jsmfClass,className){
		var documents = buildDocTrainingReferences(jsmfClass[0]);
		//Add the document to the given data set associated with the name of the class
		data.add(className,documents);
	});
	return data;
}

/**
* Build a classifiable Document (see Dclassify) for a raw object exluding its references
*/
function makeClassifiable(rawObject)
{
	var documentTab = [];
	_.forEach(rawObject,function(value,key){
		var type=JSMFtypeof(value);
		if(type!=='reference') {
			var elem = key+' : '+type;	
			documentTab.push(elem);
		} else {
			console.log('warning undefined property');
		}
	});
	var result = new Document('InstanceName',documentTab);
	return result;
}

/**
* Build from a document for a raw object including only its references
*/
function makeClassifiableReference(rawObject,classifiedMap) 
{
	var documentTab = [];
	_.forEach(rawObject,function(value,key){
			var type = JSMFtypeof(value);
			if(type=='reference') {
				//find referenced object Class (i.e., value) in pre-classified map (i.e. valueM)
				var found = undefined;
				for (var [keyM, valueM] of classifiedMap) {
					for(i in valueM){
						if(value===valueM[i].rawObject) {found=keyM; break;} 
					}
				}
				//console.log(found, value);
				var elem = key+' : '+found; //TODO: remove/try without the key, name of the reference
				if(found!==undefined) {
					documentTab.push(elem);	
				} else {
					console.log('Target of the relation no in the initial data');
				}
			}
		});
	var result = new Document('InstanceName',documentTab);
	return result;
}

/**
* Entry point function: classify from a given metamodel
* @metamodel JSMF metamodel: the metamodel patterns to find
* @rawElements : an not ordered bag of JavaScript objects
* @configuration : an object containing the parameters, like setting of probability threshold,
* training set, etc.  (not implemented yet).
*/
function classifyFromMetamodel(metamodel,rawElements,configuration) {

    var data = buildDataFromMetaModel(metamodel);

    // an optimisation for working with small vocabularies
    var options = {
        applyInverse: true
    };

    //options?
    var classifier = new Classifier(options);

    //Train the classifier on data
    classifier.train(data);

    //get the classifier proba (displayed)
    console.log(JSON.stringify(classifier.probabilities, null, 4));

    var bagRaw = rawElements;

	//Contains the map associating raw element with its two kind of probabilities with a metamodel element
	// Map should have the following signature:
	// map(ClassName, [{ProbObject}])
	// ProbObject : {'rawObject': , 'ProbaAtt':[classifier.probabilities];'ProbaRef':[classifier.probabilities]}
    var map = new Map();

	
    //initialise map with each classifiers + unclassified.
    _.each(classifier.probabilities, 
				function(x,y){
	                map.set(y,[]);
            });

	//intialise map for element which are not recognised
    map.set('unclassified',[]);

    //First pre-classification without references: just attributes signatures
    for(i in bagRaw) {
        var currentRaw = bagRaw[i];
        var doc = makeClassifiable(bagRaw[i]);
        var currentclassification = classifier.classify(doc);

        className = currentclassification.category;
        if(currentclassification.probability<1 ||
           currentclassification.probabilities[0].probability<0.09) { //adjustement: check value for Threshold for "too loose" criteria for classifying.
           className = 'unclassified';
        } else {
            className = currentclassification.category;
        }
        var tab = map.get(className);
		
		ProbaTab = currentclassification.probabilities;
		var Obj= {'rawObject': currentRaw, 'ProbaAttribute':currentclassification.probabilities};
        tab.push(Obj);	 //currentRaw
        map.set(className,tab);
    }

    //Second classification (until reaching a fix point)
    var refData = buildDataForReference(metamodel);

    var classifierRef = new Classifier(options);

    //Train the classifier on (references)data
    classifierRef.train(refData);

   // console.log(JSON.stringify(classifierRef.probabilities, null, 4));
    console.log('Before Reference classification: ', map);
	var update = true; 

	//TODO check cardinality
    while(update) { 
        update=false;
        for (var [keyMap,valueMap] of map) {

            for(i in valueMap) {
                var rawObject = valueMap[i].rawObject;
				var probaAtt = valueMap[i].ProbaAttribute;

                var doc = makeClassifiableReference(rawObject,map);
	
                currentclassification = classifierRef.classify(doc);
	
				//Take the first (most probable) classification category.		
                currentClass = currentclassification.category;
				console.log(currentClass, ' VS \n',probaAtt);

                //Confront with the attribute signature (i.e., remove false-positive)
				var probaAttofcurrentClassifier= _.find(probaAtt,['category', currentClass]).probability;
				if(probaAttofcurrentClassifier < 0.09) { //Threshold to be precised
					console.log('too low probability')
				} else {
                	if(currentClass!=keyMap) {
                    	update = true;
                    	console.log('Classification needs to be updated from ', keyMap , 
								' to ', currentClass, 'for', rawObject);

              			//console.log('Before ',map);

                    	//remove the element of the map from its older position
                    	_.remove(map.get(keyMap), function(ob){ return ob.rawObject==rawObject}); 

						var Obj= {'rawObject': rawObject, 'ProbaAttribute':probaAtt,
								'ProbaRef': currentclassification.probabilities};
                    	map.get(currentClass).push(Obj); //rawObject
                    	console.log('After ', map);
						//console.log(currentclassification.probabilities);
                	}
				} // end else if(probaAttofcurrentClassifier < 0.09)
            } // end for i in valueMap
        } // end for [keyMap,valueMap] of map

    } //end while update

    return map;
    
} //end function


function correctModelAgainstMetamodel(metamodel,mapProba) {
	//build a first JSMF model from the mapped elements

	//correct the JSMF model


}

module.exports = { classifyFromMetamodel};
