;( function( document ){

	window.addEventListener( "DOMContentLoaded", function() {

		/* 영화목록 masonry */
		var movieGrid = document.getElementById( "movieGrid" );
		var movieFilter = document.getElementById( "movieFilter" );

		if ( movieGrid || movieFilter )  {
			var movieGridIso = new Isotope( movieGrid, {
				itemSelector: ".gallery__item",
				layoutMode: 'fitRows',
				masonry: {
					columnWidth: 220
				}
			});

			var filterFn = function( itemEl ) {
				var filter = new RegExp( event.target.innerText );
				var movieItemGenre = itemEl.querySelector( ".gallery__item__genre" ).innerText;

				return filter.test( movieItemGenre );
			};

			movieFilter.addEventListener( "click", function( event ) {
				var target = event.target;

				if ( target.tagName == "BUTTON" ) {
					target.parentElement.querySelector( ".selected" ).classList.remove( "selected" );
					target.classList.add( "selected" );

					var filterValue = event.target.hasAttribute( "data-filter" )
						? event.target.getAttribute( "data-filter" )
						: filterFn;

					movieGridIso.arrange({
						filter: filterValue
					});

				}
			});
		}

	});

})( document );