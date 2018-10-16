
var startList = new Array();
var myList = new Array();


function initialise (){
	for (var i=0; i<60; i++)
		startList.push(i);

	myList.splice(0,myList.length);

};

function lottoRandoms() {
	var currentSelection = -1;
	var index = -1;
	var upperBound;
	initialise();  // 
	
	upperBound = startList.length;

	// Generate 6 main numbers
	for (var i=0; i<6; i++) {
		// Get next randomly chosen number
		index = Math.floor(Math.random() * upperBound);
		currentSelection = startList[index];
		// console.log(index);
		// console.log(currentSelection);
		myList.push(currentSelection);

		// Remove that element from startList
		startList.splice(index, 1);

		// Reset upperBound
		upperBound--;
	}
	myList = myList.sort(function(a, b){return a - b});
};

// initialise();

lottoRandoms();
console.log("startList = "+startList.toString());
console.log("myList = "+myList.toString());
console.log("startList length = "+startList.length);

