;( function( document ) {

    /**
     * 영화관 검색
     * `dhtmlxCalendar` 플러그인 사용
     * Ref: https://dhtmlx.com/docs/products/dhtmlxCalendar/
     */
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
        daysFNames: [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ],
        daysSNames: [ "일", "월", "화", "수", "목", "금", "토" ],
        weekstart: 0,
        weekname: "주",
        today: "오늘",
        clear: "초기화"
    };

    var myCalendar = new dhtmlXCalendarObject( "theaterSeekerDate" );
    myCalendar.loadUserLanguage( "ko" );
    myCalendar.hideTime();
    myCalendar.setDate( new Date( 2017, 0, 1 ) );

    /**
     * 영화에 별점 주기 활성화
     * starRate 플러그인 사용
     */
    $( "#myRatingStars" ).starRate({
        maxLength: 10,
        displayText: true,
        starClass: "star",
        activeStarClass: "star--active",
        starWrapperClass: "ratings__stars",
        textClass: "ratings__text"
    });

    /**
     * 트레일러 영상 플레이어를 활성화
     * YouTube iframe API: https://developers.google.com/youtube/player_parameters
     */
    ( function handleTrailer() {
        // 셀렉터 캐시
        var $selector = {
            body: $( "body" ),
            overlay: $( "#blackout" ),
            modal: $( "#trailerModal" ),
            showButton: $( "#showTrailer" ),
            hideButton: $( "#hideTrailer" ),
        };

        // 플레이어
        var player = {
            obj: null, // 플레이어 오브젝트
            query : {
                theme: "dark",
                color: "white",
                autohide: 1,
                autoplay: 1,
                enablejsapi: 1,
                modestbranding: 1, // YouTube 로고 감춤
                rel: 0, // 관련 동영상 표시
                showinfo: 0, // 제목, 업로더 감춤
                iv_load_policy: 3 // 특수효과 감춤
            },
            visible: false
        };

        // 보이기, 숨기기 버튼 활성화
        $selector.showButton.on( "click", showPlayer );
        $selector.hideButton.on( "click", hidePlayer );

        // YouTube API를 이용해 iframe을 생성
        function setPlayer( id ) {
            player.obj = new YT.Player( "trailer", {
                width: 480,
                height: 282,
                videoId: id,    
                playerVars: player.query
            });

            // 처음 플레이어 크기 설정
            resizePlayer();

            // 리사이즈나 화면 회전시 플레이어 크기 다시 설정
            $( window ).on( "resize orientationchange", function() {
                resizePlayer();
            });
        }

        // 화면 크기에 비례해 iframe의 크기 조절
        function resizePlayer() {
            var viewport = {}, frame = {}, modal = {};

            viewport.width = $( window ).width();
            viewport.height = $( window ).height();

            frame.width = viewport.width;
            frame.height = frame.width / 1.6; // 16 : 10

            modal.top = ( ( viewport.height - frame.height ) / 2 ) + "px";
            modal.left = "0px";

            $selector.modal.css( modal );

            player.obj.setSize( frame.width, frame.height );
        }

        // iframe 및 마스크 레이어를 보이기
        function showPlayer() {
            // 처음 클릭시 iframe을 생성 
            if ( !player.obj ) {
                setPlayer( $selector.showButton.data( "youtube" ) );
            }

            $selector.body.addClass( "modal-is-on" );
            $selector.overlay.show();
            player.obj.playVideo();
            player.visible = true;
        }

        // iframe 및 마스크 레이어를 감추기
        function hidePlayer() {
            player.obj.stopVideo();
            $selector.overlay.hide();
            $selector.body.removeClass( "modal-is-on" );
            player.visible = false;
        }

    })();

})( document );