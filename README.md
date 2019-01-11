# V 0.3.7

- Versions < 1.0.0 are marked as unstable releases of Barstool org libraries

# A non-disruptive backend library for entity generation

# Steps left before Stable release of Version 1:

- Try out the project on another product-grade application
- Basic documentation
- Prevent SQL Injection
- Type Checking

# Steps for release 2:

- Should support default values
- Should support Regex
- Should support custom fail messages
- Should support custom regex fail messages
- Add support for unique constraint
- Should support basic encryption
- Should support custom statements
- Switch to connection pools
- Make post to mysql functions reusable even if you're not using express (express routes should just call these functions)
- add callbacks to be passed to the routes

# Test this library:

- yarn transpile
- node app/index.js
