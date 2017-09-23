// JavaScript Document
var timeoutActive = null;
var timeinterRemove = null;
var outtime = 4000;
$(document).ready(function(e) {
    $('input').focus(function(e){
	    $(this).parent().addClass('active');
	}).blur(function(e){
		$(this).parent().removeClass('active');
	});
	
	$('form').submit(function(e){
	    e.preventDefault();
		$(this).parent().slideUp();
		$('.login-herd').addClass('active').css('margin-top','250px');
		timeinterActive = window.setInterval(function(){
			$('.login-herd').addClass('active');
			timeinterRemove = window.setTimeout(function(){
				window.clearTimeout(timeinterRemove);
				$('.login-herd').removeClass('active');
			},4000);
		},4500);
	});

	$('#form-login').submit(function (e) {
		e.preventDefault();
		window.setTimeout(function () {
			window.location.href = window.location.href.replace('login.html','index.html');
		},1500);
	})

});
/*function timeoutActiveFun(){
	window.clearTimeout(timeoutActive);	
	if(outtime==4000){
		outtime = 50000;
	}
	console.log(outtime);
	timeoutActive = window.setTimeout('timeoutActiveFun',outtime);
}
*/