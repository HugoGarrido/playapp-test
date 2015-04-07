$(document).ready(function(){
	console.log("hello");
	$("#retry").hide();

	$("#retry").click(function(){
		//$("#formSection form").show();
		$("#lastname").val('');
		$("#firstname").val('');
		$("#email").val('');
		$("#formSection form").show();
		$(this).hide();
		return false;
	});

	$("#goPlayApp").click(function(event){

		$("#status").empty();
		
		var newsletter = 0;
		var playapp = 0;
		var lastname = $("#lastname").val();
		var firstname = $("#firstname").val();
		var email = $("#email").val();

		var validlstnm = megaValidator(lastname, 'nom', 100, true);
		var validml = megaValidator(email, 'email', 100, true);
		var validfrstnm = megaValidator(firstname, 'prenom', 100, true);

		if(validlstnm && validfrstnm && validml){
			console.log("sending");
			//Radio
			if($("input:radio[name=newsletter]:checked").val() == 'oui'){
				console.log("Radio oui");
				playapp = 1;
			}else{
				console.log("Radio non");
				playapp = 0;
			}

			//Checkbox
			if($('input[name=checkletter]').is(':checked')){
				console.log("Checkbox oui");
				newsletter = 1;
			}else{
				console.log("Checkbox non");
				newsletter = 0;
			}


			$.ajax({
				method: 'POST',
				url: 'http://www.playappli.com/playapp/api/',
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				data: {'ajax': "add_user", 'firstname': firstname, 'lastname': lastname, 'email': email, 'newsletter': newsletter, 'playapp': playapp}
			}).done(function(resp){

				$("#formSection form").hide();
				$("#status").empty();
				console.log(resp);
				
				if(resp.status == 'OK'){
					console.log(resp.datas.email);
					$("#status").append("<ul><li>email "+resp.datas.email+"</li><li>prenom "+resp.datas.firstname+"</li><li>nom "+resp.datas.lastname+"</li><li>newsletter "+resp.datas.newsletter+"</li><li>playapp "+resp.datas.playapp+"</li></ul>");
				}
				if(resp.status == 'KO'){
					console.log(resp.message);
					$("#status").append("<p>"+resp.message+"</p>");
					$("#retry").show();
				}
			});
		}
		else{
			console.log("not sending");
		}

		event.preventDefault();
	});	
});

function validateInput(input, type){
	var regex = undefined;
	
	if(type == 'email'){
		regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	} 

    if(type == 'prenom' || type == 'nom'){
    	regex = /^[A-Za-z ]{1,}$/;
    }
    
    return regex.test(input);
}

function validateSize(input, maxLength){
	if(input.length > maxLength){
		return false;
	}else{
		return true;
	}
}

function megaValidator(input, type, maxLength, verbose){
	if(validateInput(input, type)){
		if(validateSize(input, maxLength) == true){
			return true;
		}
		else{
			if(verbose == true){
				$("#status").append("<p>Votre "+ type + " ne pas faire plus de "+ maxLength +" caractères</p>");	
			}
			return false;
		}
	}
	else{
		if(verbose == true){
			$("#status").append("<p>Votre "+ type + " n'est pas valide</p>");	
		}		
		return false;
	}
}