;( function( window, document, $, undefined ) {

	/**
	 * 사이드 메뉴 활성화 (Hammer 플러그인 사용)
	 * 1. 햄버거 메뉴를 클릭하면 사이드 메뉴 토글
	 * 2. 메뉴가 열린 상태에서 메뉴를 왼쪽으로 스와이프하면 메뉴 닫기
	 * Hammer API: http://hammerjs.github.io/api/
	 */
	( function handleSideMenu() {
		var domCache = {}, isVisible, gestureWatcher;

		// DOM 요소들을 캐시
		// Hammer 플러그인은 네이티브 노드를 필요로 하므로 네이티브로 캐시
		domCache.trigger = document.getElementById( "sidemenuTrigger" );
		domCache.menu = document.getElementById( "sidemenu" );

		// 햄버거 메뉴를 클릭할 때 
		$( domCache.trigger ).on( "click", function( event ) {
			event.preventDefault();
			// 메뉴가 보이면 숨기기, 보이지 않으면 보이기
			if ( isVisible ) closeMenu(); else openMenu();
		});

		// Hammer 인스턴스 생성 - 옵션 설정 - 제스처 바인딩
		gestureWatcher = new Hammer( domCache.menu );
		gestureWatcher.get( "swipe" ).set({ direction: Hammer.DIRECTION_HORIZONTAL });
		gestureWatcher.on( "swipeleft", closeMenu );

		// 메뉴를 보이기 (+접근성 관리)
		function openMenu() {
			if ( isVisible ) return;

			$( domCache.menu ).addClass( "sidemenu--open" ).attr( "aria-hidden", "false" );
			$( domCache.trigger ).attr( "aria-expanded", "true" );
			isVisible = true;
		}

		// 메뉴를 숨기기 (+접근성 관리)
		function closeMenu() {
			if ( !isVisible ) return;

			$( domCache.menu ).removeClass( "sidemenu--open" ).attr( "aria-hidden", "true" );
			$( domCache.trigger ).attr( "aria-expanded", "false" );
			isVisible = false;
		}
	})();

	/**
	 * 터치 횡스크롤 활성화 (Hammer 플러그인 사용)
	 * "touch-scrollable" 클래스를 가진 요소를 제스처로 횡스크롤
	 * Hammer API: http://hammerjs.github.io/api/
	 */
	( function setTouchScrollable( $targets ) {
		if ( !$targets.length ) return;

		var watchPan = function( el ) {
			this.node = el;
			this.inner = this.wrapInner();
			this.setWatcher();

			var $inner = $( this.inner );
			var offset = {};

			offset.start = ( this.node.scrollWidth - this.node.offsetWidth ) * -1;
			offset.end = 0;

			$inner.on( "panstart", function( event ) {
				offset.current = parseInt( $inner.css( "left" ) );
			});

			$inner.on( "pan", function( event ) {
				var delta = offset.current + event.originalEvent.gesture.deltaX;
				console.log(offset.start, delta, offset.end);

				if ( offset.start <= delta && delta <= offset.end )
					$inner.css({ left: delta });
			});
		};

		watchPan.prototype = {
			wrapInner: function() {
				$( this.node ).wrapInner( "<div class=\"touch-scrollable__inner\"></div>" );
				return this.node.children[0];
			},
			setWatcher: function() {
				this.watcher = new Hammer.Manager( this.inner, {
					domEvents: true,
					recognizers: [
						[ Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL } ]
					]
				});
			}
		};

		$targets.each( function( i, target ) {
			new watchPan( target );
		});

	})( $( ".touch-scrollable" ) );

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

})( window, document, jQuery );