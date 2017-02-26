;( function( document ) {

	// 티켓 매수 (Ticket Quantity) 조정
	var tq = {
		field: document.getElementById( "orderQuantity" ),
		plusButton: document.getElementById( "increaseQuantity" ),
		minusButton: document.getElementById( "decreaseQuantity" ),
		maxValue: 10
	}

	tq.plusButton.addEventListener( "click", increaseQuantity );
	tq.minusButton.addEventListener( "click", decreaseQuantity );

	// 메일 계정을 <select/> 로 선택할 수 있게
	var ea = {
		field: document.getElementById( "userEmail2" ),
		select: document.getElementById( "selectEmail" )
	}

	ea.select.addEventListener( "change", mailAccountControl );

	function increaseQuantity() {
		var val = Number( tq.field.value );

		if ( val < tq.maxValue ) {
			tq.field.value = val + 1;
		} else {
			alert( "티켓은 한 번에 " + tq.maxValue + "장까지 예매하실 수 없습니다." );
		}
	}

	function decreaseQuantity() {
		var val = Number( tq.field.value );

		if ( val > 1 ) {
			tq.field.value = val - 1;
		}
	}

	function mailAccountControl() {
		var val = ea.select.options[ea.select.selectedIndex].value;

		if ( val != "custom" ) {
			ea.field.value = val;
		} else {
			ea.field.value = "";
			ea.field.focus();
		}
	}

})( document );