# logi-securekey
A node.js module for Logi's SSO method. This package is meant to help create a secureKey token for usage in the Logi embedded API.

![](http://www.logianalytics.com/wp-content/uploads/2015/11/Logi_Color_2x.png)

[SecureKey documentation](http://devnet.logianalytics.com/rdPage.aspx?rdReport=Article&dnDocID=2162&dnProd=2) can be found on devnet.logianalytics.com.


## Install
~~~
npm install logi-securekey
~~~


## Basic Usage
~~~
var sk = require('logi-securekey'),
    user = {
        username: 'David.Bowie',
        userid: 1,
        clientbrowseraddress: '1.2.3.4'
    },
    params = {}
    
sk.createToken({pathname:'MyLogiApp'}, user, params, (err,token)=>{
	if(err) console.log(err)
	if(token) console.log(token)
})
~~~


## URL Request Options
~~~
var sk = require('logi-securekey'),
    user = {
        username: 'David.Bowie',
        userid: 1,
        clientbrowseraddress: '1.2.3.4'
    },
    url = {
	    protocol: 'https',
	    hostname: 'www.myAppDomain.com'
	    pathname:'MyLogiApp',
	    port: '8080',
    }
    
sk.createToken('', user, '', (err,token)=>{
	if(err) console.log(err)
	if(token) console.log(token)
})    
~~~


## Passing Extra Parameters
~~~
var sk = require('logi-securekey'),
    user = {
        username: 'David.Bowie',
        userid: 1,
        clientbrowseraddress: '1.2.3.4'
    },
    params = {
	    mySong: 'Space Oddity',
	    UnderPressure: true,
	    Rebel: 'rebel',
	    AnythingElse: 'Send all the things'
    }
    
sk.createToken({pathname:'MyLogiApp'}, user, params, (err,token)=>{
	if(err) console.log(err)
	if(token) console.log(token)
})    
~~~


## createToken(url, user, params, callback)
* `url` (object) [OPTIONAL]
    * protocol: http|https.
    * hostname: The IP or domain on which the Logi application resides. DEFAULT=localhost.
    * port: DEFAULT=NULL.
    * pathname: The path to the Logi application. DEFAULT=NULL.


* `user` (object) [REQUIRED]
    * Username: Name of the authenticated user.
    * UserID: ID of the user authenticated user.
    * ClientBrowserAddress: the server that is requesting the secureKey token.
    * Roles: Roles of the authenticated user.
    * Rights: Rights of the authenticated user.


* `parameters` (object) [OPTIONAL]
    * Provide a flattened json object with names and values to set custom session variables that will be accessible with @Session in the Logi app.


* `callback` (function) [REQUIRED]
    * error: An error message, in case of failure.
    * token: The token generated by the request.