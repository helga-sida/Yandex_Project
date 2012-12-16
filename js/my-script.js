document.createElement('header');
document.createElement('nav');
document.createElement('section');
document.createElement('footer');
			
$(document).ready(function() {
	$('section span').show();
	$('section').hide();
		
	$('#main-navigation li a').on('click', function (event, obj) {
		var self = $(this);
		var settings = returnSettings(self.attr('id'));
			
		$('header')
			.css({'backgroundColor': '#eee'})
			.animate({
				'color': '#fff', 
				'backgroundColor': settings.color
				});
				
		$('#main-navigation li')
			.css({'borderBottomColor': 'transparent'});
					
		self
			.parent()
			.css({'borderBottomColor': settings.color});
				
		$('.active')
			.fadeOut(0)
			.removeClass('active');
						
		$(settings.contentId).fadeIn().addClass('active');
					
		return false;
	});
				
	$('section span').on('click', function() {
		$('.active')
			.fadeOut()
			.removeClass('active');
		$('#main-navigation li')
			.css({'borderBottomColor': 'transparent'});
		$('header')
			.animate({
				'color': '#555', 
				'backgroundColor': '#eee'
				}, 
				function() {
					$(this).css({'backgroundColor': 'transparent'});
			});
	});
});
				
function returnSettings(id) {
			
	var settings = {};
				
	switch(id) {
		case 'about-me':
			settings = {color: '#ff8e00', contentId: '#section1'};
			break;
		case 'experience':
			settings = {color: '#008000', contentId: '#section2'};
			break;
		case 'knowledge':
			settings = {color: '#006ca5', contentId: '#section3'};
			break;
		case 'resources':
			settings = {color: '#d3462d', contentId: '#section4'};
			break;
	}
	return settings;
}