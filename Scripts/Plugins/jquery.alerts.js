// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
//
(function($) {
	
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;确定&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;取消&nbsp;', // text for the Cancel button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'jalert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'jconfirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			$.alerts._show(title, message, value, 'jprompt', function(result) {
				if( callback ) callback(result);
			});
		},

		information: function (message, title, callback) {
		    if (title == null) title = 'Information';
		    $.alerts._show(title, message, null, 'jinformation', function (result) {
		        if (callback) callback(result);
		    });
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');
			
			$("BODY").append(
			  '<div id="jalert_container">' +
			    '<h1 id="jalert_title"></h1>' +
			    '<div id="jalert_content">' +
			      '<div id="jalert_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#jalert_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#jalert_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			$("#jalert_title").text(title);
			$("#jalert_content").addClass(type);
			$("#jalert_message").text(msg);
			$("#jalert_message").html( $("#jalert_message").text().replace(/\n/g, '<br />') );
			
			$("#jalert_container").css({
				minWidth: $("#jalert_container").outerWidth(),
				maxWidth: $("#jalert_container").outerWidth()
			});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'jalert':
					$("#jalert_message").after('<div id="jalert_panel"><input type="button" value="' + $.alerts.okButton + '" id="jalert_ok" /></div>');
					$("#jalert_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#jalert_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#jalert_ok").trigger('click');
					});
				break;
				case 'jconfirm':
					$("#jalert_message").after('<div id="jalert_panel"><input type="button" value="' + $.alerts.okButton + '" id="jalert_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="jalert_cancel" /></div>');
					$("#jalert_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#jalert_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#jalert_ok").focus();
					$("#jalert_ok, #jalert_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#jalert_ok").trigger('click');
						if( e.keyCode == 27 ) $("#jalert_cancel").trigger('click');
					});
				break;
				case 'jprompt':
					$("#jalert_message").append('<br /><input type="text" size="30" id="jalert_prompt" />').after('<div id="jalert_panel"><input type="button" value="' + $.alerts.okButton + '" id="jalert_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="jalert_cancel" /></div>');
					$("#jalert_prompt").width( $("#jalert_message").width() );
					$("#jalert_ok").click( function() {
						var val = $("#jalert_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#jalert_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#jalert_prompt, #jalert_ok, #jalert_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#jalert_ok").trigger('click');
						if( e.keyCode == 27 ) $("#jalert_cancel").trigger('click');
					});
					if( value ) $("#jalert_prompt").val(value);
					$("#jalert_prompt").focus().select();
				break;
			    case 'jinformation':
			        $("#jalert_message").after('<div id="jalert_panel"></div>');
			    break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#jalert_container").draggable({ handle: $("#jalert_title") });
					$("#jalert_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#jalert_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="jalert_overlay"></div>');
					$("#jalert_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#jalert_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#jalert_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#jalert_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#jalert_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#jalert_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
		
	}
	
	// Shortuct functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	}
	
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};

	jInformation = function (message, title, callback) {
	    $.alerts.information(message, title, callback);
	}
	
})(jQuery);