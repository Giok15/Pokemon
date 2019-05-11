var pokemonName;
var pokemonId;
var pokemonIdLength;
var pokemonIdPrevious;
var pokemonIdNext;
var pokemonSearch;

function WhoPokemon(sender) {

	document.getElementById("searchBox").className += " searchBox--displayInvisible";

	if(sender == "arrowNext" || sender == "arrowPrevious") {
		if(parseInt(pokemonId) != 721 && parseInt(pokemonId) != 1) {document.getElementById("arrowNext").className += " details--arrowDisplayInvisible"; document.getElementById("arrowPrevious").className += " details--arrowDisplayInvisible";}
		else {
			if(parseInt(pokemonId) == 1) {document.getElementById("arrowNext").className += " details--arrowDisplayInvisible";}
			if(parseInt(pokemonId) == 721) {document.getElementById("arrowPrevious").className += " details--arrowDisplayInvisible";}
		}
		if(sender == "arrowNext") {pokemonId++;} else {pokemonId--;}
		pokemonIdLength = pokemonId.toString().length;
		if (pokemonIdLength == 1) {pokemonId = "00" + pokemonId;}
		if (pokemonIdLength == 2) {pokemonId = "0" + pokemonId;}
		pokemonSearch = pokemonId;
	}

	if(sender == "btnSearch" || sender == "searchField") {
		pokemonSearch = document.getElementById("searchField").value.toLowerCase();
	}

	$.getJSON('https://pokeapi.co/api/v2/pokemon/' + pokemonSearch + "/", function(data)
	{
		pokemonName = data.name;
		pokemonId = data.id.toString();
		pokemonIdPrevious = (data.id - 1).toString();
		pokemonIdNext = (data.id + 1).toString();
		pokemonName = pokemonName.toLowerCase().replace(/\b[a-z]/g, function(letter) {return letter.toUpperCase();});

		pokemonIdLength = pokemonId.length; if (pokemonIdLength == 1) {pokemonId = "00" + pokemonId;} if (pokemonIdLength == 2) {pokemonId = "0" + pokemonId;}
		pokemonIdLength = pokemonIdPrevious.length; if (pokemonIdLength == 1) {pokemonIdPrevious = "00" + pokemonIdPrevious;} if (pokemonIdLength == 2) {pokemonIdPrevious = "0" + pokemonIdPrevious;}
		pokemonIdLength = pokemonIdNext.length; if (pokemonIdLength == 1) {pokemonIdNext = "00" + pokemonIdNext;} if (pokemonIdLength == 2) {pokemonIdNext = "0" + pokemonIdNext;}

		document.getElementById("name").innerHTML = "<strong>" + pokemonName + " #" + pokemonId + "</strong>";
   	document.getElementById("type").innerHTML = "Type: ";
		var types = [];
		for (var i = 0; i < data.types.length; i++) {
 			var types = data.types[i];
  		document.getElementById("type").innerHTML += " <img src='http://pokedream.com/pokedex/images/types/" + types.type.name + ".gif'></img>";
		}
		document.getElementById("weight").innerHTML = parseInt(data.weight) / 10 + " kg <a class='fa fa-balance-scale'></a>";
		document.getElementById("height").innerHTML = parseInt(data.height) / 10 + " m <a class='fa fa-arrows-v'></a>";
		if(sender == "btnSearch" || sender == "searchField") {document.getElementById("cryIcon").innerHTML += " <img class='imgCry' src='geluid.png'></img>";}
		document.getElementById("nextPrevious").innerHTML = "<a href='#' id='arrowPrevious' class='details--arrowIdText' onclick='WhoPokemon(" + '"arrowPrevious"' + ")'><img class='details details--arrow' src='arrowLeft.png'> #" + pokemonIdPrevious + "</a> <a href='#' class='details--arrowIdText details--arrowMargin' id='arrowNext' onclick='WhoPokemon(" + '"arrowNext"' + ")'>#" + pokemonIdNext + " <img class='details--arrow' src='arrowRight.png'></a>";
		if(parseInt(pokemonId) == 1) {document.getElementById("nextPrevious").innerHTML = "<a href='#' class='details--arrowIdText details--arrowMarginLarge' id='arrowNext' onclick='WhoPokemon(" + '"arrowNext"' + ")'>#" + pokemonIdNext + " <img class='details--arrow' src='arrowRight.png'></a>";}
		if(parseInt(pokemonId) == 721) {document.getElementById("nextPrevious").innerHTML = "<a href='#' id='arrowPrevious' class='details--arrowIdText' onclick='WhoPokemon(" + '"arrowPrevious"' + ")'><img class='details details--arrow' src='arrowLeft.png'> #" + pokemonIdPrevious + "</a>";}

		document.getElementById("context").className += " context--background";
		document.getElementById("imagePokemon").src = "http://assets.pokemon.com/assets/cms2/img/pokedex/full/" + pokemonId + ".png";
		document.getElementById("imagePokemon").className += " imagePokemon--displayVisible";

		if(document.getElementById("checkBox").checked === false && sender == "btnSearch" || document.getElementById("checkBox").checked === false && sender == "searchField") {
			var audio = new Audio('Pokemon.mp3');
	  	audio.volume = 1;
			audio.play();
	    setTimeout(function(){ DetailsPokemon(); }, 4000);
		}
		else {DetailsPokemon();}
	})

.fail(function() {document.getElementById("searchBox").className = "searchBox"; document.getElementById("searchField").className = "searchField searchField--error"; });
}

function DetailsPokemon() {
	document.getElementById("dataBox").className += " dataBox--displayVisible";
	document.getElementById("imagePokemon").className += " imagePokemon--filter";
	document.getElementById("imageTerug").className += " imageTerug--displayVisible";

	var msg = new SpeechSynthesisUtterance(pokemonName);
	window.speechSynthesis.speak(msg);
	setTimeout(function(){ 		var audio = new Audio("http://pokedream.com/pokedex/images/cries/" + pokemonId + ".mp3");
	audio.volume = 1;
	audio.play(); }, 1000);
}

function Cry(){
	var audio = new Audio("http://pokedream.com/pokedex/images/cries/" + pokemonId + ".mp3");
	audio.volume = 1;
	audio.play();
}

function searchFieldTextChanged(){
	var test = document.getElementById("searchField");

	if(test.classList.contains('searchField--error')){
			document.getElementById("searchField").value = "";
		document.getElementById("searchField").className = "searchField";
	}
}
