/*
  This module is used for displaying static pages, either with a custom  
  template file (located in /views/pages/<name>.jade) or will use the
  default `page.jade`.

  If using the default `page.jade`, define a new function inside
  `staticpages.js`. This function should return the HTML content to 
  be displayed. There's a `demo` function defined already.
  Check `http://localhost:8585/demo` to see how the demo function is rendered.
*/

// Node modules
var express = require('express'),
    router = express.Router(),
    path = require("path"),
    fs = require("fs");
// ===

var pagesURL = path.join(__dirname, "../../views", "pages"),
    viewsURL = path.join(__dirname, "../../views", ""),
    staticPages = require("./staticpages.js");

router.get(['/', '/:pageID'], function(req, res, next) {
  var pageID = req.params.pageID,
      templatePath = null,
      pageTemplate = null,
      f = null,
      html = null,
      show404 = false;

  if(!pageID) {
    pageID = "home";
  }

  // check if custom jade file exists for this page
  try {
    pageTemplate = pageID + ".jade";
    f = fs.openSync(path.join(pagesURL, pageTemplate), 'r');
    fs.closeSync(f);
  } catch(e) {
    pageTemplate = "page.jade";
    if(staticPages.hasOwnProperty(pageID)) {
      html = staticPages[pageID].call(this, req);
    } else {
      show404 = true;
    }
  }
  // ===

  if(show404) {
    templatePath = path.join(viewsURL, "404.jade");
    res.status(404)
       .render(templatePath, {
          html: html,
          pageTitle: "pyCloud!"
    });
  } else {
    templatePath = path.join(pagesURL, pageTemplate);
    res.status(200)
       .render(templatePath, {
          html: html,
          pageTitle: "pyCloud!"
    });
  }

  return next();
});

module.exports = router;
