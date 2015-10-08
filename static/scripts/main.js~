// import(vendor/jquery-1.11.3.min.js)

var pyCloud = {
	winResizeFns: Array(),
	dom: {
		html: $("html"),
		body: $("body"),
		header: $("#header"),
		main: $("#main"),
		win: $(window),
		doc: $(document)
	},
	onWinResize: function() {
		var t = this,
			winH = 0,
			pageH = 0,
			docH = 0,
			mainH = 0,
			htmlH = 0;

		t.dom.win.resize(function() {
			winH = t.dom.win.outerHeight(false);
			docH = t.dom.doc.outerHeight(false);

			pageH = t.dom.body.outerHeight(false);
			htmlH = t.dom.html.outerHeight(false);

			winH = (winH > docH)? winH : docH;
			pageH = (pageH > htmlH)? pageH : htmlH;

			if(pageH < winH) {
				mainH = t.dom.main.outerHeight(false);
				t.dom.main.css("min-height", mainH + (winH-pageH));
			}

			for(var i=0; i<t.winResizeFns.length; i++) {
				t.winResizeFns[i].fn.call(null, t.winResizeFns[i].params);
			}
		}).resize();
	},

	addWinResize: function(fn, params) {
		var t= this;
		t.winResizeFns.push({fn: fn, params: params});
		t.onWinResize();
	},

	init: function() {
		var t = this;
		t.onWinResize();
	}
};

$(document).ready(function() {
	pyCloud.init();
});

/* 
All page specific js files should be imported here
Do this if this js file can be used on multiple pages
*/
// import(modules/login.js)
