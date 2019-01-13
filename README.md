# V 0.4.1

- Versions < 1.0.0 are marked as unstable releases of Barstool org libraries

# A non-disruptive backend library for entity generation

# Steps left before Stable release of Version 1:

- Try out the project on another product-grade application
- Basic documentation
- Prevent SQL Injection [DONE]
- Type Checking [DONE]
- Only accepts application/json [DONE]
- Should support Regex [DONE]
- Switch to connection pools [DONE]
- Should check that barstool config is written properly

# Steps for release 2:

- Should support default values
- Should support custom fail messages
- Should support custom regex fail messages
- Add support for unique constraint
- Should support basic encryption
- Should support custom statements
- add callbacks to be passed to the routes
- Make query to mysql functions reusable (express routes should just call these functions)
- Should be able to choose which routes you want from C.R.U.D
- Allow option for choosing if you want to allow client to update with some invalid data

# Test this library:

- yarn transpile
- node app/index.js
