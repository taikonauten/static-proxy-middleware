# static-proxy-middleware
Is a [connect](https://github.com/senchalabs/connect), [express](https://github.com/strongloop/express) and [browser-sync](https://github.com/BrowserSync/browser-sync) middleware.
It proxies some matched request to a static folder and is very helpful in testing frontend assets.

## Installation

    $ npm install --save static-proxy-middleware

## Usage

    var browserSync = require('browsersync');
    var middleware = require('static-proxy-middleware');

    // initialise the proxy with the root path and an array of rules
    var staticProxy = middleware('.', [
        {
            // matches every request that has the 'public' substring
            match: /public/g,

            // replace 'public' with 'assets' (optional)
            fn: function(m){

                return 'assets';
            }
        }

    ])


    browserSync.init({

        proxy: 'http://www.example.org',
        middleware: staticProxy
    })

You can see how simple this middleware is.

## Rules

This middleware on redirect matched rules that means that you have to specify at least one rule for the middleware to work at all.
The replacer function is optional and works exactly as `String.prototype.replace` would.

## Contributing

Everyone is welcome to contribute to this project. Please make sure to write tests for the functionality you want to add.
Use `npm test` to start the tests.

## Thanks

special thanks to [serve-static](https://github.com/expressjs/serve-static). This project is only a thin wrapper over it.

