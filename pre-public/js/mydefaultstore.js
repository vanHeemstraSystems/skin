$(document).ready(function(){$(".options a").on("click", function(e) {e.preventDefault();if($(this).hasClass("active")) {return;}$(".options a").removeClass("active");$(this).addClass("active");var clickid = $(this).attr("id");$("#listdisplay").fadeOut(240, function(){if(clickid == "thumbnails-list"){console.log("SKIN: thumbnails view");$(this).addClass("thumbview");}else {console.log("SKIN: list view");$(this).removeClass("thumbview");}$("#listdisplay").fadeIn(200);});});});