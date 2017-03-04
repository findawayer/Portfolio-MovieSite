;( function( window, document, $, undefined ){

	/* 슬라이드아웃 메뉴 활성화 */
	( function slideMenuToggle() {
		var $hamburger = $( "#sidemenuTrigger" );
		var $sidemenu = $( "#sidemenu" );

		$hamburger.on( "click", function( event ) {
			event.preventDefault();
			$sidemenu.toggleClass( "open" );
		});
	})();

	/* 플로팅 레이블 */
	( function floatingLabels( $targets ) {
		if ( !$targets.length ) return;

		// 모든 플로팅 레이블에 이벤트 리스너 추가
		$targets.each( function( i, el ) {
			setFloatingLabel( el );
		});

		// 플로팅 레이블 준비
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
	})( $( ".ui-input-placeholder" ) );


	/* 더 읽기 */
	( function collapsibleText( $targets ) {
		if ( !$targets.length ) return;

		// 모든 '더 읽기' 버튼에 이벤트 리스너 추가
		$targets.each( function( i, el ) {
			initEvent( el );
		});

		// 클릭시 감춰진 텍스트 펼치기
		function initEvent( textBlock ) {
			var $textBlock = $( textBlock );

			$textBlock.find( ".read-more" ).on( "click", function( event ) {
				event.preventDefault();
				$textBlock.addClass( "is-expanded" );
			});
		}
	})( $( ".text-collapsed" ) );

	/* 터치 횡스크롤 활성화
	 * 플러그인: smoothTouchScroll
	 * 디펜던시: jQuery, jQuery UI, jQuery kinetic */
	if ( $.fn.smoothTouchScroll ) {
		$(".touch-scrollable").smoothTouchScroll();
	}

})( window, document, jQuery );