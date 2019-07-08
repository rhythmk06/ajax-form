 $(document).ready(function() {
 	
	 $("#register").submit(function(event) {

	 	event.preventDefault();

	 	var firstname = $("#firstname").val();
	 	var username = $("#username").val();
	 	var email = $("#email").val();
	 	var submit = "submit";

		 $.ajax({
	       type: "POST",
	       url: "backend.php",
	       data: {
	       	'firstname' : firstname,
	       	'username' : username,
	       	'email' : email,
	       	'submit': submit,
	       },
	       dataType: "json",

	       beforeSend: function() {
			   $('#loader').html("<img src='loading.gif' />");
  		   },

	       success: function(result){
          	if(result.status == false) {
          		$("#error").html(result.msg);
          	}
          	else if(result.status == "empty") {
          		setTimeout(function() {
          			$('#loader img').hide();
	          		$("#fname_err").html(result.fname_err ? result.fname_err : '' );
	          		$("#uname_err").html(result.uname_err ? result.uname_err: '');
	          		$("#email_err").html(result.email_err ? result.email_err: '');
          		},500);
          	}
   			else if(result.status == true){
   				setTimeout(function() {
			   		$('#loader img').hide();
			   		$("#success").html(result.msg);
		      		$("#register")[0].reset();
		      		$("#fname_err").empty();
		      		$("#uname_err").empty();
		      		$("#email_err").empty();
			  	},2000);
				
          		
          	}

	      }
		});

	});


	 $("#username").keyup(function(event) {

	 	var username = $("#username").val();
	 	
		 $.ajax({
	       type: "POST",
	       url: "check.php",
	       data: {'username' : username},
	       dataType: "json",
	       success: function(result){
	      
	       	if(result.status){
				$("#uname_err").addClass("text-success");
				$("#uname_err").removeClass("text-danger");
				$("#uname_err").html(result.msg);
				$("#submit").attr("disabled", result.disable)
			}else{
				$("#uname_err").addClass("text-danger");
				$("#uname_err").removeClass("text-success");
				$("#uname_err").html(result.msg);
				$("#submit").attr("disabled", result.disable)
			}
	       }
		});

	});


});