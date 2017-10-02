$(function () {

	const api = '/api/v1/';

	$('.deleteNew').click(function(){
		var ide = $(this).attr('data-ide');
		$.ajax({
		  method: "DELETE",
		  url: api + "/news/" + ide
		}).done(function( data ) {
		  	//delete a row
		    $("div[data-ide=" + ide + "]").remove();

		 }).fail( function( jqXHR, textStatus, errorThrown ) {
		    alert( errorThrown );
		    console.log(textStatus + " - " + errorThrown);
		});
	});

	$('.new').click(function() {
		var url = $(this).attr('data-url');
		var win = window.open(url, '_blank');
	});

});