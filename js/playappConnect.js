function statusChangeCallback(response) {
	console.log('statusChangeCallback');

	if (response.status === 'connected') {
		console.log("Utilisateur loggé sur Facebook");
		console.log("App authorisée");
		playappAutoComplete();
	}

	else if (response.status === 'not_authorized') {
		console.log("Utilisateur loggé sur Facebook");
		console.log("App non authorisée");
		
		//Call d'une fenêtre pour authorisation
		FB.login(function(loginResp) {

		    if(loginResp.authResponse){
		    	//Si l'utilisateur accepte, on fait le traitement
		        playappAutoComplete();
		    }
		    
		}, {scope: 'public_profile'});
	}

	else{
		console.log("unknown");
		console.log("Veuillez vous connecter sur Facebook");
	}
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '367983133405271',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.2'
	});

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/fr_FR/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Fonction pour le pré-remplissage de champs avec les données du compte Facebook
function playappAutoComplete(){
	FB.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
		console.log(response);

		if(response.first_name != undefined){
			$("#firstname").val(response.first_name);
		}
		if(response.last_name != undefined){
			$("#lastname").val(response.last_name);
		}
		if(response.email != undefined){
			$("#email").val(response.email);
		}
	});
}
