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

	// 메일 계정을 <select/> 로 선택할 수 있게
	var ea = {
		field: document.getElementById( "userEmail2" ),
		select: document.getElementById( "selectEmail" )
	}

	ea.select.addEventListener( "change", mailAccountSelect );
	ea.field.addEventListener( "focus", mailAccountCustomInput );

	// 셀렉트 박스를 선택할 때
	function mailAccountSelect() {
		var val = ea.select.options[ea.select.selectedIndex].value;

		// 프리셋을 선택하면 그 값을 input에 반영
		if ( val != "custom" ) {
			ea.field.value = val;
		}
		// `직접입력`을 선택하면 input을 비우고 포커스
		else {
			ea.field.value = "";
			ea.field.focus();
		}
	}

	// 직접입력할 때
	function mailAccountCustomInput() {
		// 셀렉트 박스를 `직접입력`으로 선택
		ea.select.selectedIndex = 0;
	}

})( document );