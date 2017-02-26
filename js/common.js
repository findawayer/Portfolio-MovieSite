;( function( document ){

	/* 슬라이드아웃 메뉴 활성화 */
	(function slideMenuToggle() {
		var hamburger = document.getElementById( "sidemenuTrigger" );
		var sidemenu = document.getElementById( "sidemenu" );

		hamburger.addEventListener( "click", function(e) {
			e.preventDefault();
			sidemenu.classList.toggle( "open" );
		});
	})();

	/* 플로팅 인풋 플레이스홀더 */
	(function floatingLabels( targets ) {
		if ( !targets.length > 0 ) return;

		Array.from( targets ).forEach( function( e ) {
			setFloatingLabel( e );
		});

		function setFloatingLabel( el ) {
			var field = el.parentElement.querySelector( ".ui-input" );
			var toggler = "ui-input-placeholder--float";

			["change", "keydown", "keyup"].forEach( function( event ) {
				field.addEventListener( event, function() {
					toggleState( field, el );
				});
			});

			function toggleState( input, label ) {
				if ( input.value != "" ) {
					label.classList.add( toggler );
				} else {
					label.classList.remove( toggler );
				}
			}
		}
	})( document.getElementsByClassName( "ui-input-placeholder" ) );


	/* 더 읽기 */
	(function collapsibleText( targets ) {
		if ( !targets.length > 0 ) return;

		for ( var i = 0; i < targets.length; ++i ) {
			initEvent( targets[i] );
		}

		function initEvent( textBlock ) {
			var readMore = textBlock.querySelector( ".read-more" );
			readMore.addEventListener( "click", function( event ) {
				event.preventDefault();
				expandText( textBlock );
			});
		}

		function expandText( textBlock ) {
			textBlock.className = textBlock.className + " is-expanded";
		}

	})( document.getElementsByClassName( "text-collapsed" ) );

})( document );