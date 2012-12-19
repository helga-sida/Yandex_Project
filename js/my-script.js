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
		var currentBackgroundColor = colorToHex($('header').css('backgroundColor'));	
			
		$('header').animateColor({ 
			duration: 600,
			fps: 100,
			colorBegin: currentBackgroundColor,
			colorEnd: settings.color,
			before: function() {
				$('header').css({'color': '#fff'});
			}
		}); 
		
		$('#main-navigation li')
			.css({'borderBottomColor': 'rgba(0, 0, 0, 0)'});
					
		self
			.parent()
			.css({'borderBottomColor': settings.color});
				
		if($('.active').size() > 0)	{
			$('.active')
				.hide(0)
				.removeClass('active');
				
			$(settings.contentId)
				.show(0)
				.addClass('active');
		} else {	
			$(settings.contentId)
				.fadeIn(200)
				.addClass('active');
		}	
					
		return false;
	});
				
	$('section span').on('click', function() {
		var currentBackgroundColor = colorToHex($('header').css('backgroundColor'));
		
		$('.active')
			.fadeOut()
			.removeClass('active');
			
		$('#main-navigation li').css({'borderBottomColor': 'rgba(0, 0, 0, 0)'});

		$('header').animateColor({ 
			duration: 600,
			fps: 100,
			colorBegin: currentBackgroundColor,
			colorEnd: '#ffffff',
			callback: function() {
				$('header').css({'color': '#555','backgroundColor': 'transparent'});
			}
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

function d2h(dec) { 
    return dec.toString(16);
}

function h2d(hex) { 
    return parseInt(hex,16);
}

function h2rgb(h,e,x) {
    return [h2d(h), h2d(e), h2d(x)];
}

function cssColor2rgb(color) {
	var rezult;
	
    if(color.indexOf('rgb') < 0) {
		rezult = h2rgb(color.substring(1,3),color.substring(3,5),color.substring(5,7));
    } else {
		rezult = color.substring(4,color.length-1).split(',');
	}
	
	return rezult;
}

$.fn.animateColor = function(options) {
	options = $.extend({ 
			duration: 1000,
			fps: 20,
			callback: function() {},
			before: function() {}
		}, options); 

	var self = $(this);

	var duration = parseFloat(options.duration);
	var fps = parseFloat(options.fps);
	var interval = Math.ceil(1000 / fps);
	var totalframes = Math.ceil(duration / interval);
	var begin = options.colorBegin;
	var end = options.colorEnd;
	
	options.before();
	
	for(i = 1; i <= totalframes; i++) {
        (function() {
            var frame = i;
            var b = cssColor2rgb(begin);
            var e = cssColor2rgb(end);
            var change0 = e[0] - b[0];
            var change1 = e[1] - b[1];
            var change2 = e[2] - b[2];

            function color() {
				var increase0 = ease(frame, b[0], change0, totalframes);
				var increase1 = ease(frame, b[1], change1, totalframes);
				var increase2 = ease(frame, b[2], change2, totalframes);

				self.css({'backgroundColor': 'rgb('+parseInt(increase0)+','+parseInt(increase1)+','+parseInt(increase2)+')'});        
				
				if(totalframes == frame) {
					options.callback(); 
				};		
            }
				  
            setTimeout(color, interval * frame);
        })(); 
	}		
}

function ease(frame, begin, change, totalframes) {
    return begin + change * (frame / totalframes);
}

function colorToHex(color) {

    if (color.substr(0, 1) === '#') {
        return color;
    } else if (color == 'rgba(0, 0, 0, 0)' || color == 'transparent') {
        return '#ffffff';
    }
	
    var digits = /^rgb?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(1|0\.\d+))?\)$/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
	
    return '#' + rgb.toString(16);
};
