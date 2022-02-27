# jsmf-bayes
The objective is of this project is to provide a model conform to a given metamodel extracted from "raw" JavaScript objects
(i.e., data). To do so, we train a naive Bayes approach from the metamodel. The training set is generated based on the metamodel elements.
Once trained, we try to identify in the raw objects  the element that are close to the metamodel elements; 
the metamodel act as a pattern to be found in the data

## installation
- It runs on NodeJS
- It uses NPM for installation.
- It relies on JSMF-CORE and DClassify libraries.

To install it, simply type:
```npm install```

## Example scenarios
Some prototypical scenarios are given in the scenario.js file.  They represent the atomic specific cases that one may encounter
when dealing with "raw objects".
 
For instance, if we want to find the following 3 classes pattern: A->B->C (A has a reference to B; B has a reference to C; A, B, C are not classifiable by their attributes). On instances objects, the algorithm will do several classification iterations until finding a stable step;
It will first determine C (no relation) and reconstruct the graph according to the preceding relation.


### Limitation of the current approach
Such implementation working with probability will encounter an issue when dealing with a similar situation: where the classification can either type A or type B.

Obviously, undecidable cases are also giving random results. For instance, for this class pattern A-> B <- C (A has a reference to B
and C a reference to B; A, B, C are only classifiable using relationships); The classification can state that any object related to B
can be either A or C. It will give, as answer the first most probable classifier;


### Additional notes
The current implementation is very verbose (many outputs on the console) for understanding and explanation purpose. 
