# Cookies.js Overview

Cookies.js is used to work around a unique jquery.cookies error that occurs. Some, including myself, encountered errors when using `$.cookie`. I decided to take it upon myself to create an easy to use cookie method for anyone.

You can get a CDN for this repo at:  
https://cdn.jsdelivr.net/gh/Malmadork/cookies@master/src/Cookies.js  
Try using:  
```html
<script src="https://cdn.jsdelivr.net/gh/Malmadork/cookies@master/src/Cookies.js"></script>
```

You can also get a minified version at:  
https://cdn.jsdelivr.net/gh/Malmadork/cookies@master/src/Cookies.min.js  
Try using:  
```html
<script src="https://cdn.jsdelivr.net/gh/Malmadork/cookies@master/src/Cookies.min.js"></script>
```

# Documentation

Cookies.js no longer requires jquery! 

Cookies is a object with various methods: `Cookies.set(key, value, options)`, `Cookies.get(key)`, and `Cookies.remove(key)`.

`Cookies.set()` accepts up to three arguments, `key, value, options`.  
Keys:
> Keys must be a string for setting and getting objects by name. If a key is a number, it will fetch a cookie at that index. Key is required.

Value:
> Value can be an object or string, and is used when setting cookies. Value is required

Options:
> Options is optional.
> Options must be an object, and has several settings:
> - `expires`: Sets the expiration date for the cookie (number in milliseconds or string with identifiers). Examples for setting expiration date are below
> - `path`: Sets the path for the cookie.
> - `domain`: Sets the domain for the cookie
> - `secure`: Cookie can only be transmitted over https.
> No options are required however:
> - Expires is reccomended
> - Other options are for security and request handling, so not required.

Cookies.js can also handle localStorage data!
> `Cookies.storage` or `Cookie().storage` can be used here.
> - `Cookies.storage.set()`: Sets localStorage data at given key.
> - `get(key)`: Returns localStorage data given key.
> - `remove(key)`: Removes data at given key.
> - `clear()`: Resets localStorage.
> - `all()` / `all(matches)`: Returns all localStorage (with matching)

`Cookies.storage.all()` returns all localStorage, whereas `Cookies.storage.all(matches)` returns all localStorage matching that value.


# Cookie Examples

```js
// Cookies usage:

/* Setting cookies using Cookies.set()
 *
 * The key is the name the cookie is stored under, must be a string.
 * The value is the data stored under the key value with document.cookie
 * The options allow for changing the path, domain, secure, and expires
 *     features of a cookie. 
 * 
 * The expires option allows for numbers or strings. Numbers will be
 * assumed as milliseconds, and strings will operate using a number followed 
 * by an identifier. This will be explored below. 
 */
Cookies.set(key, value, options);

// Sets a cookie with an expiration date of 5 days. 
Cookies.set('myCookie', {data: "Hello World!"}, {expires: "5d"})

/* Fetching cookies using Cookies.get() */
Cookies.get('myCookie')

/* Removing Cookies using Cookies.remove()
 * Key: Must be of type string
 */
Cookies.remove('myCookie');

/* Fetching all Cookies using Cookies.get()
 * No arguments supplied
 */
Cookies.get();

/* Fetching a cookie at an index using Cookies.get()
 * Key: Type of number
 */
Cookies.get(0);



//It is good practice to check if the cookie exists before fetching it, i.e.
if(!!Cookie('myCookie')) {
    console.log(Cookie('myCookie'));
}
```

## Expires option
The `expires` option allows for a number, which will be assumed as milliseconds but you can also utilize a string (composed of a number followed by an identifier) to signify a length of time. 
```
- ms: millisecond
- s:  second
- m:  minute
- h:  hour
- d:  day
- w:  week
- M:  month
```
The following examples include an instance of each of these in use.
```js
// milliseconds via number (100000ms)
Cookies.set("myCookieMS", {data: 1},  {expires: 100000})

// milliseconds via string (100000ms)
Cookies.set("myCookieMSS", {data: 1},  {expires: "100000ms"})

// seconds via number (240 seconds)
Cookies.set("myCookieSeconds", {data: 1},  {expires: "240s"})

// minutes via number (30 minutes)
Cookies.set("myCookieMinutes", {data: 1},  {expires: "30m"})

// hours via number (12 hours)
Cookies.set("myCookieHours", {data: 1},  {expires: "12h"})

// days via number (7 days)
Cookies.set("myCookieDays", {data: 1},  {expires: "7d"})

// weeks via number (2 weeks)
Cookies.set("myCookieWeeks", {data: 1},  {expires: "2w"})

// months via number (1 month)
Cookies.set("myCookieMonths", {data: 1},  {expires: "1M"})
```

# localStorage Examples

```js
/* Example: Setting localStorage
 * Key: Must be of type string
 * Value: Can be object or string.
 */
Cookies.storage.set('myStorage', {data:"Hola mundo!"});

/* Example: Fetching localStorage
 * Key: Must be of type string
 */
Cookies.storage.get('myStorage'); // Given previous example, should return {data:"Hola mundo!"}

/* Example: Removing localStorage
 * Key: Must be of type string
 */
Cookies.storage.remove('myStorage');

/* Example: Clearing localStorage
 * Note: Completely clears all data...
 */
Cookies.storage.clear();

/* Example: Getting all localStorage
 * [OPTIONAL] - Matches: Must be a string, case-sensitive
 */
Cookies.storage.all(); //Returns all localstorage data
Cookies.storage.all('mySto') //Returns all storage objects that match "mySto"
```

# Recent Changes
- Removed the Cookie() methods in favor for the object 
   > Use `Cookies.set()`, `Cookies.get()`, `Cookies.remove()`
- `COOKIE_TOOLS` is a new object holding various helper methods for managing cookies and local storage. These may not be very useful for user use, but exist to aid Cookie storage.
- `Cookies.set(key, value, options)` now allows the `expires` option to be stored in formats other than days. 
   > When you set the expires option, a number value will be assumed as milliseconds instead of days, and one can also use a string in order to set the expiration time of the Cookie. This string will be composed of a number followed by characters that signify the length of time [ms, s, m, h, d, w, M]. For example: `{expires: "2d"}` will expire in two days, `{expires: "120m"}` will expire in 120 minutes,  `{expires: "1M"}` will expire in a month.
- Various Bug Fixes

# Other

If you run into issues or have ideas for improvements to code, please leave a note in the issues tab on Github. 

Note: Setting cookies using Cookies.js may only work when on a server.
