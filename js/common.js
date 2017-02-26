;( function( document ){

	/* 슬라이드아웃 메뉴 활성화 */
	var hamburger = document.getElementById( "sidemenuTrigger" );
	var sidemenu = document.getElementById( "sidemenu" );

	hamburger.addEventListener( "click", function(e) {
		e.preventDefault();
		sidemenu.classList.toggle( "open" );
	});

	/* 플로팅 인풋 플레이스홀더 */
	var floatingLabels = document.getElementsByClassName( "ui-input-placeholder" );

	if ( floatingLabels.length > 0 ) {
		Array.from( floatingLabels ).forEach( function( e ) {
			setFloatingLabel( e );
		});
	}

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

})( document );