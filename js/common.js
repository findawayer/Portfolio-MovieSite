!function( window, document, $, undefined ){

	/* 슬라이드아웃 메뉴 활성화 */
	!function slideMenuToggle() {
		var $hamburger = $( "#sidemenuTrigger" );
		var $sidemenu = $( "#sidemenu" );

		$hamburger.on( "click", function(event) {
			event.preventDefault();
			$sidemenu.toggleClass( "open" );
		});
	}();

	/* 플로팅 인풋 플레이스홀더 */
	!function floatingLabels( $targets ) {
		if ( !$targets.length > 0 ) return;

		$targets.each( function( i, el ) {
			setFloatingLabel( el );
		});

		function setFloatingLabel( trigger ) {
			var $trigger = $( trigger );
			var $field = $trigger.parent().find( ".ui-input" );
			var toggler = "ui-input-placeholder--float";

			$field.on( "change keydown keyup", function() {
				toggleState( $field, $trigger );
			});

			function toggleState( $input, $label ) {
				if ( $input.val() ) {
					$label.addClass( toggler );
				} else {
					$label.removeClass( toggler );
				}
			}
		}
	}( $( ".ui-input-placeholder" ) );


	/* 더 읽기 */
	!function collapsibleText( $targets ) {
		if ( !$targets.length > 0 ) return;

		$targets.each( function( i, el ) {
			initEvent( el );
		});

		function initEvent( textBlock ) {
			var $textBlock = $( textBlock );

			$textBlock.find( ".read-more" ).on( "click", function( event ) {
				event.preventDefault();
				expandText( $textBlock );
			});
		}

		function expandText( textBlock ) {
			textBlock.addClass( "is-expanded" );
		}

	}( $( ".text-collapsed" ) );

}( window, document, jQuery );