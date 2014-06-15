var _animate = 0;
$(document).ready(function(){
	/*
	var _length = $(".gallery-item").length;
	var _width = 1000 * _length;
	$(".gallery-container").width(_width);
	
	$(".leftBtn").click(function(e){
		if(!_animate){
			var _left = $(".gallery-container").position().left;
			if(_left < 0){
				_animate = 1;
				$(".gallery-container").animate({
					"left":"+=1000"
				},400,function(){
					_animate = 0;
				});
			}
		}
	});
	$(".rightBtn").click(function(e){
		if(!_animate){
			var _left = $(".gallery-container").position().left;
			if(_left > (-_width+1000)){
				_animate = 1;
				$(".gallery-container").animate({
					"left":"-=1000"
				},400,function(){
					_animate = 0;
				});	
			}
		}
	});
	$(".thumbnailList>li").each(function(index,element){
		$(element).click(function(e){
			if(!$(element).is(".current")){
				console.log("123");
				if(!_animate){
					_animate = 1;
					var _left = -index * 1000;
					$(".gallery-container").animate({
						"left":_left
					},400,function(e){
						$(".thumbnailList>li.current").removeClass("current");
						$(element).addClass("current");
						_animate = 0;
					});
				}
			}
		});
	});
	*/
	$(".sliderGallery").slider();

	$(".thumbnailList").find("li").each(function(index,element){
		$(element).click(function(e){
			if(!$(element).is(".current")){
				$(".sliderGallery").slider("jumpTo",index);
			}
		});
	});
});
(function($){
	$.fn.slider = function(options,arg){
		var _this;
		var settings = {
			width : 998,
			height: 592
		};
		var fns = {
			init: function(){
				var contentContainer = document.createElement("div");
				var width = fns.measureChild();
				$(_this).addClass("window")
				.css({
					"overflow": "hidden",
					"width": settings.width,
					"height": settings.height,
					"position": "relative"
				});
				$(contentContainer).addClass("container")
				.css({
					"width": width,
					"height": settings.height,
					"position": "absolute",
					"top": 0,
					"left": 0,
				});
				$(_this).append($(contentContainer));
				fns.handleChild();
				fns.leftClick();
				fns.rightClick();
				fns.leftIsEnable.call($(_this));
				fns.rightIsEnable.call($(_this));
				fns.thumbnailList.call($(_this));
			},
			measureChild: function(){
				var width = 0;
				$(_this).children().each(function(){
					width += $(this).css({
						"display": "inline-block"
					}).width();
				});
				return width;
			},
			handleChild: function(){
				$(_this).find("div:not(.container)")
				.addClass("children")
				.css({
					"float": "left"
				})
				.appendTo($(_this).children(".container"));
				$(_this).children(".container")
				.children(".children:first")
				.addClass("current");
			},
			leftClick: function(){
				$(".leftBtn").click(_this,function(e){
					var obj = e.data[0];
					if(fns.isAnimate.call(obj)) return;
					var lpos = $(obj).children(".container").position().left;
					if(lpos < 0){
						var next_element_width = $(obj).find(".children:eq("+(fns.currentIndex.call(obj) -1)+")").width();
						next_element_width = settings.width - next_element_width;
						next_element_width = next_element_width / 2;
						var next_lpos = -fns.lengthBeforeCurrentLeft.call(obj) + next_element_width;
						fns.isAnimate.call(obj,true);
						if(next_lpos > 0){
							$(obj).children(".container").animate({
								"left": 0
							},500,function(){
								var index = fns.currentIndex.call(obj);
								$(obj).find(".children:eq("+index+")").removeClass("current");
								$(obj).find(".children:eq("+(index-1)+")").addClass("current");
								fns.isAnimate.call(obj,false);
								fns.leftIsEnable.call(obj);
								fns.rightIsEnable.call(obj);
								fns.thumbnailList.call(obj);
							});
						}else{
							$(obj).children(".container").animate({
								"left": next_lpos
							},500,function(){
								var index = fns.currentIndex.call(obj);
								$(obj).find(".children:eq("+index+")").removeClass("current");
								$(obj).find(".children:eq("+(index-1)+")").addClass("current");
								fns.isAnimate.call(obj,false);
								fns.leftIsEnable.call(obj);
								fns.rightIsEnable.call(obj);
								fns.thumbnailList.call(obj);
							});
						}
					}
				});
			},
			rightClick: function(){
				$(".rightBtn").click(_this,function(e){
					var obj = e.data[0];
					if(fns.isAnimate.call(obj)) return;
					var lpos = $(obj).children(".container").position().left;
					var right = settings.width - $(obj).children(".container").width();
					if(lpos > right){
						var next_element_width = $(obj).find(".children:eq("+(fns.currentIndex.call(obj) + 1)+")").width();
						next_element_width = settings.width - next_element_width;
						next_element_width = next_element_width / 2;
						var next_lpos = -fns.lengthBeforeCurrentRight.call(obj) + next_element_width;
						fns.isAnimate.call(obj,true);
						if(next_lpos < right){
							$(obj).children(".container").animate({
								"left": right
							},500,function(){
								var index = fns.currentIndex.call(obj);
								$(obj).find(".children:eq("+index+")").removeClass("current");
								$(obj).find(".children:eq("+(index+1)+")").addClass("current");
								fns.isAnimate.call(obj,false);
								fns.leftIsEnable.call(obj);
								fns.rightIsEnable.call(obj);
								fns.thumbnailList.call(obj);
							});
						}else{
							$(obj).children(".container").animate({
								"left": next_lpos
							},500,function(){
								var index = fns.currentIndex.call(obj);
								$(obj).find(".children:eq("+index+")").removeClass("current");
								$(obj).find(".children:eq("+(index+1)+")").addClass("current");
								fns.isAnimate.call(obj,false);
								fns.leftIsEnable.call(obj);
								fns.rightIsEnable.call(obj);
								fns.thumbnailList.call(obj);
							});
						}
					}
				});
			},
			lengthBeforeCurrentLeft: function(){
				var nextIndex = fns.currentIndex.call($(this)) - 1;
				var length = 0;
				$(this).find(".children:lt("+nextIndex+")").each(function(){
					length += $(this).width();
				});
				return length;
			},
			lengthBeforeCurrentRight: function(){
				var nextIndex = fns.currentIndex.call($(this)) + 1;
				var length = 0;
				$(this).find(".children:lt("+nextIndex+")").each(function(){
					length += $(this).width();
				});
				return length;
			},
			currentIndex: function(){
				var length = $(this).find(".children").length;
				var index = length - $(this).find(".children.current~.children").length - 1;
				return index;
			},
			isAnimate: function(b){
				if(b == undefined){
					return $(this).is(".isAnimate");
				}else{
					if(b) $(this).addClass("isAnimate");
					else $(this).removeClass("isAnimate");
				}
			},
			leftIsEnable: function(){
				if($(this).children(".container").position().left == 0)
					$(".leftBtn").addClass("disabled");
				else{
					$(".leftBtn").removeClass("disabled");
				}
			},
			rightIsEnable: function(){
				var right = settings.width - $(this).children(".container").width();
				if($(this).children(".container").position().left == right)
					$(".rightBtn").addClass("disabled");
				else
					$(".rightBtn").removeClass("disabled");	
			},
			thumbnailList: function(){
				var index = fns.currentIndex.call($(this));
				$(".thumbnailList>li.current").removeClass("current");
				$(".thumbnailList>li:eq("+index+")").addClass("current");
			},
			jumpTo: function(value){
				
				if(value >= $(this).find(".children").length || value < 0) return;
				var width = 0;
				$(this).find(".children:lt("+value+")").each(function(){
					width += $(this).width();
				});
				var lpos = $(this).children(".container").position().left;
				var right = settings.width - $(this).children(".container").width();
				if(lpos > right || lpos < 0){
					var next_element_width = $(this).find(".children:eq("+value+")").width();
					next_element_width = settings.width - next_element_width;
					next_element_width = next_element_width / 2;
					var next_lpos = -width + next_element_width;
					fns.isAnimate.call(this,true);
					if(next_lpos < right){
						$(this).children(".container").animate({
							"left": right
						},500,function(obj,jI){
							return function(){
								var index = fns.currentIndex.call(obj);
								$(obj).find(".children:eq("+index+")").removeClass("current");
								$(obj).find(".children:eq("+jI+")").addClass("current");
								fns.isAnimate.call(obj,false);
								fns.leftIsEnable.call(obj);
								fns.rightIsEnable.call(obj);
								fns.thumbnailList.call(obj);
							}
						}(this,value));
					}else if(next_lpos > 0){
						$(this).children(".container").animate({
							"left": 0
						},500,function(obj,jI){
							return function(){
								var index = fns.currentIndex.call(obj);
								$(obj).find(".children:eq("+index+")").removeClass("current");
								$(obj).find(".children:eq("+jI+")").addClass("current");
								fns.isAnimate.call(obj,false);
								fns.leftIsEnable.call(obj);
								fns.rightIsEnable.call(obj);
								fns.thumbnailList.call(obj);
							}
						}(this,value));
					}else{
						$(this).children(".container").animate({
							"left": next_lpos
						},500,function(obj,jI){
							return function(){
								var index = fns.currentIndex.call(obj);
								$(obj).find(".children:eq("+index+")").removeClass("current");
								$(obj).find(".children:eq("+jI+")").addClass("current");
								fns.isAnimate.call(obj,false);
								fns.leftIsEnable.call(obj);
								fns.rightIsEnable.call(obj);
								fns.thumbnailList.call(obj);
							}
						}(this,value));
					}
				}
			}
		};
		if(typeof options === 'object' || typeof options === 'undefined'){
			settings = $.extend(settings,options);
			return this.each(function(){
				_this = $(this);
				fns.init();
			});
		}else if(typeof options === 'string'){
			if(fns[options]){
				fns[options].call(this,arg);
			}
		}
	};
})(jQuery);