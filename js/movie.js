;( function( document ){

	/* 영화관 검색: DatePicker 활성화 */
	dhtmlXCalendarObject.prototype.langData["ko"] = {
	    dateformat: "%Y년 %n월 %j일 (%D)",
	    monthesFNames: [
	    	"1월","2월","3월","4월","5월","6월",
	    	"7월","8월","9월","10월","11월", "12월"
	    ],
	    monthesSNames: [
	    	"1월","2월","3월","4월","5월","6월",
	    	"7월","8월","9월","10월","11월", "12월"
	    ],
	    daysFNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
	    daysSNames: ["일", "월","화","수","목","금","토"],
	    weekstart: 0,
	    weekname: "주",
	    today: "오늘",
	    clear: "초기화"
	};

	var myCalendar = new dhtmlXCalendarObject( "theaterSeekerDate" );
	myCalendar.loadUserLanguage( "ko" );
	myCalendar.hideTime();
	myCalendar.setDate( new Date(2017, 0, 1) );

	/* 내 코멘트: FiveStarRating 활성화 */
	var myRatingConfig = {
		container: document.getElementById( "myRatingStars" ),
		curValue: 0,
		maxValue: 10,
		callback: function( rating ) {
			myRatingConfig.container.nextElementSibling.innerText = rating;
		}
	};

	if ( myRatingConfig.container ) {
		rating(
			myRatingConfig.container,
			myRatingConfig.curValue,
			myRatingConfig.maxValue,
			myRatingConfig.callback
		);
	}

})( document );