var serveStatic = require('serve-static');

/**
 * The middleware factory
 *
 * @param root: the root folder
 * @param rules: the rules array
 * @returns {Function} the middleware function
 */
module.exports = function(root, rules){

  return function(req, res, next){

    if(!matches(req, rules))
      return next();

    serveStatic(root)(req, res, next);
  };
};

/**
 * check if request matches a rule and replace the url if needed
 *
 * @param req: the req object
 * @param rules: the rules array
 * @returns {boolean}
 */
function matches(req, rules){

  return rules.some(function(rule){

    var matches = false;

    req.url = req.url.replace(rule.match, function(match){

      matches = true;

      if(rule.fn)
        return rule.fn.apply(this, arguments);

      return match;
    });

    return matches;
  });
}
