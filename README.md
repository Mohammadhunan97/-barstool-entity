# V 0.4.5

- Versions < 1.0.0 are marked as unstable releases of Barstool org libraries

# A non-disruptive backend library for entity generation

# Steps left before Stable release of Version 1:

- Try out the project on another product-grade application
- Basic documentation
- Prevent SQL Injection [ DONE ]
- Type Checking [ DONE ]
- Only accepts application/json [ DONE ]
- Switch to connection pools [ DONE ]
- Should check that barstool config is written properly [ DONE ]
- Should be able to choose which routes you want from C.R.U.D [ DONE ]
- Support Regex [ DONE ]
- Support custom statements [ DONE ]
- Support for unique constraint through custom statements [ DONE ]
- Support foreign key through custom statements

# Steps for release 2:

Functional:

- Support default values
- Support custom fail messages
- Support custom regex fail messages
- Support for unique constraint through config
- Support basic encryption
- Support callbacks to be passed to the routes
- Support on/off option in config for updatability with invalid data passed in as a parameter
- Support foreign key through config

Code revision:

- Make query to mysql functions reusable (express routes should just call these functions)

# Test this library:

- yarn transpile
- node app/index.js
