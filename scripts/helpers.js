// FILENAME: helpers
// PURPOSE: Defines the ensureAuthenticated method to force authentication
//          before allowing access.
// 
// DATE: 04/08/2023
// AUTHOR: Kaleb Chisholm
// ----------------------------------------------------------------------------
function ensureAuthenticated(req, resp, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("info", "Please log in to view that resource");
  resp.render("../views/login", { message: req.flash("info") });
}
module.exports = { ensureAuthenticated };
