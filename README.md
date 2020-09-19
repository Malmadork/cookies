# Cookies.js Overview

Cookies.js is used to work around a unique jquery.cookies error that occurs. Some, including myself, encountered errors when using `$.cookie`. I decided to take it upon myself to create an easy to use cookie method for anyone.

You can get a CDN for this repo at:
https://cdn.jsdelivr.net/gh/Malmadork/cookies@master/src/Cookies.js

# Documentation

Cookies.js does still require jquery, as it needs to use `$.extend`.
You can find more information on jquery here: https://jquery.com/
Below is a CDN link for minified jquery:
https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js

Cookie is a function that accepts up to three arguments, and has a remove function.
The 3 arguments are `key, value, options`. 
Keys:
> Keys must be a string, and is used to fetch or set cookies.

Value: 
> Value must be an object, and is used when setting cookies.

Options:
> Options must be an object, and has several settings:
> - `expires`: Sets the expiration date for the cookie (in days).
> - `path`: Sets the path for the cookie.
> - `domain`: Sets the domain for the cookie
> - `secure`: Cookie can only be transmitted over https.
> No options are required however:
> - Expires is reccomended
> - Other options are for security and request handling, so not required.


# Examples

```js
//Cookies function:

/* No arguments: returns document
 * Supply only key: fetches cookie at given key
 * All arguments: sets cookie at given key
 */
Cookie(key, value, options);

/* Example: Setting a cookie that expires in one day
 * Key: Must be of type string
 * Value: Must be of type object
 * Options: Must be of type object
 */
Cookie('myCookie', {data: "Hello World!"}, {expires: 1});

/* Example: Fetching a cookie with key "myCookie"
 * Key: Must be of type string
 */
Cookie('myCookie'); // Given previous example, returns {data: "Hello World"}

/* Example: Removing a cookie given key "myCookie"
 * Key: Must be supplied in the remove function
 */
Cookie().remove('myCookie');


//It is good practice to check if the cookie exists before fetching it, i.e.
if(!!Cookie('myCookie')) {
    console.log(Cookie('myCookie'));
}


```