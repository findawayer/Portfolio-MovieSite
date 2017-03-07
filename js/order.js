;( function( window, document, $, undefined ) {

	// 티켓 매수 (Ticket Quantity) 조정
	var $tq = {
		field: $( "#orderQuantity" ),
		plusButton: $( "#increaseQuantity" ),
		minusButton: $( "#decreaseQuantity" ),
		total: $( "#orderTotal" ),
		maxValue: 10
	};

	$tq.plusButton.on( "click", function( event ) {
		event.preventDefault();
		increaseQuantity();
	});
	$tq.minusButton.on( "click", function( event ) {
		event.preventDefault();
		decreaseQuantity();
	});

	function increaseQuantity() {
		var value = Number( $tq.field.val() );

		if ( value < $tq.maxValue ) {
			value++;
			$tq.field.val( value );
			$tq.total.text( (value * 9500).toLocaleString() );
		} else {
			alert( "티켓은 한 번에 " + $tq.maxValue + "장을 초과해 예매하실 수 없습니다." );
		}
	}

	function decreaseQuantity() {
		var value = Number( $tq.field.val() );

		if ( value > 1 ) {
			value--;
			$tq.field.val( value );
			$tq.total.text( (value * 9500).toLocaleString() );
		}
	}

	// 메일 계정을 <select/> 로 선택할 수 있게
	var $ea = {
		field: $( "#userEmail2" ),
		select: $( "#selectEmail" )
	};

	$ea.select.on( "change", function() {
		mailAccountSelect();
	});
	$ea.field.on( "focus", function() {
		mailAccountCustomInput();
	});

	// 셀렉트 박스를 선택할 때
	function mailAccountSelect() {
		var selected = $ea.select.val();

		// 프리셋을 선택하면 그 값을 input에 반영
		if ( selected != "custom" ) {
			$ea.field.val( selected );
		}
		// 직접입력을 선택하면 input을 비우고 포커스
		else {
			$ea.field.val( "" ).focus();
		}
	}

	// 직접입력할 때
	function mailAccountCustomInput() {
		// 셀렉트 박스를 `직접입력`으로 선택
		$ea.select.val( "custom" );
	}

})( window, document, jQuery );