var staticPages = {
  demo: function(req) {
    /* 
      This is a demo function, to show how a page can use the
       default `page.jade` template.
    */
    return (
    	"<h1>Demo</h1>"
    	+ "<p>"
    	+ "Hey there, " + req.params.pageID
    	+ "<p>"
    	);
  }
};

module.exports = staticPages;