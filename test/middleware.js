var expect = require('chai').expect;
var sinon = require('sinon');
var middleware = require('../index.js');


describe('static-proxy-middleware tests', function(){

  it('should just call next if rules don\'t match', function(){

    var req = {

      url: '/public/js/test.js'
    };

    var next = sinon.spy();

    middleware('.', [
      {
        match: /publics/g,
        fn: function(){ return '';}
      }
    ])(req, null, next);


    expect(next.calledOnce).to.equal(true);
    expect(req.url).to.equal('/public/js/test.js');
  });


  it('should replace url if rules match', function(){

    var req = {

      url: '/public/js/test.js'
    };

    var next = sinon.spy();

    middleware('.', [
      {
        match: /public/g,
        fn: function(){ return 'assets';}
      }
    ])(req, null, next);


    expect(next.calledOnce).to.equal(true);
    expect(req.url).to.equal('/assets/js/test.js');
  });
});


