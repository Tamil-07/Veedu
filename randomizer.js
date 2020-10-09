function veedu( button, popup ) {

	// UI elements
	var buttonElement = button;
	var popupElement = popup;

	var initialClick = false;
	var randomRange = 6;

	// Useless websites: url | uses flash 
	// Commented out websites which have crashed.
	var sitesList = [

		
		['http://www.youtube.com/user/SorruLifeKodumai.com/',         true],
		['http://www.oldtamilpoetry.com/',                            true],
		['http://www.tagavalaatruppadai.in./',                        false],
		['http://www.pleasedonate.biz/',                              false],
		['http://imaninja.com/',                                      false],
		['http://willthefuturebeaweso.me/',                           false],
                ['http://semanticresponsiveillustration.com/',                true]
	];

	var sites = null;

	// Prepares and binds the button
	var init = function() {

		button.onclick = onButtonClick;

		// If the browser doesn't support flash. Remove flash websites from the list.
		if ( !swfobject.hasFlashPlayerVersion("1") ) {
			removeFlashWebsites();
		}

		sites = sitesList.slice(0);

		// If the Browser supports html5 storage
		if ( supportsHtmlStorage() === true ) {

			// Check for past data
			if ( localStorage[ 'sites' ] !== undefined ) {
				loadSites();
			}
		}
	};

	// Removes flash websites from the list
	var removeFlashWebsites = function() {
		
		var i, site;
		var newList = [];

		for ( i = 0; i < sitesList.length; i++ ) {
			
			site = sitesList[i];
			if ( site[1] === false ) {
				newList.push( site )
			}
		}

		sitesList = newList;
	};

	// Selects and removes the next website from the list
	var selectWebsite = function() {

		var site, range, index;
		
		range = randomRange > sites.length ? sites.length : randomRange;
		index = Math.floor( Math.random() * range );

		site = sites[index];
		sites.splice( index, 1 );

		return site;
	};

	// Opens the given url in a new window
	var openSite = function( url ) {
		window.open( url );
	};

	var onButtonClick = function() {

		// Track click count.
		_gaq.push(['_trackEvent', 'user', 'clicks', 'button']);

		// Change text from "TO A"
		if ( initialClick === false ) {
			document.getElementById( 'joint' ).innerHTML = 'TO ANOTHER';
			initialClick = true;
		}

		var url = selectWebsite()[0];
    	openSite( url );

    	// User has visited ALL the sites... refresh the list.
    	if ( sites.length == 0 ) {

    		// If the browser doesn't support flash. Remove flash websites from the list.
			if ( !swfobject.hasFlashPlayerVersion("1") ) {
				removeFlashWebsites();
			}

			sites = sitesList.slice(0);
    	}

    	storeSites();
	};

	// Save the current list of sites for the new user.
	var storeSites = function() {
		localStorage[ 'sites' ] = JSON.stringify( sites );
	}

	// Load the list of sites, so new users see new sites.
	var loadSites = function() {
		sites = JSON.parse( localStorage['sites'] );
	};

	init();
}
function supportsHtmlStorage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}
