var serveStatic = require('serve-static');


module.exports = function(root, rules){

  return function(req, res, next){

    if(!match(req, rules))
      return next();

    serveStatic(root)(req, res, next);
  };
};


function match(req, rules){

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
