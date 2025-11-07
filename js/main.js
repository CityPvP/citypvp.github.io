(function ($) {
    "use strict";
	
    $('.simpleslide100').each(function(){
        var delay = 7000;
        var speed = 1000;
        var itemSlide = $(this).find('.simpleslide100-item');
        var nowSlide = 0;

        $(itemSlide).hide();
        $(itemSlide[nowSlide]).show();
        nowSlide++;
        if(nowSlide >= itemSlide.length) {nowSlide = 0;}

        setInterval(function(){
            $(itemSlide).fadeOut(speed);
            $(itemSlide[nowSlide]).fadeIn(speed);
            nowSlide++;
            if(nowSlide >= itemSlide.length) {nowSlide = 0;}
        },delay);
    });

})(jQuery);


document.addEventListener("contextmenu", function(e){
	e.preventDefault();
	}, false);

	document.onkeydown = function(event) {
	var blocked = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 96, 97, 98, 99, 100, 101, 102, 103, 14, 105, 106, 107, 109, 110, 111, 112, 113, 114, 115, 117, 118, 119, 120, 121, 123, 144, 145, 189, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222];
    
	if(blocked.indexOf(event.keyCode) > -1) {
       return false;
	}
    
	else if (event.ctrlKey && event.shiftKey && (event.keyCode == 73 || event.keyCode == 74)) {        
       return false;
	}
	}