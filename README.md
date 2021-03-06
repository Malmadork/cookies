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

Cookie is a function that accepts up to three arguments.
The 3 arguments are `key, value, options`.  
Keys:
> Keys must be a string for setting and getting objects by name. If a key is a number, it will fetch a cookie at that index.

Value:
> Value can be an object or string, and is used when setting cookies.

Options:
> Options must be an object, and has several settings:
> - `expires`: Sets the expiration date for the cookie (in days).
> - `path`: Sets the path for the cookie.
> - `domain`: Sets the domain for the cookie
> - `secure`: Cookie can only be transmitted over https.
> No options are required however:
> - Expires is reccomended
> - Other options are for security and request handling, so not required.

Cookies Documentation:
> `Cookies` is another way of calling the same methods used with `Cookie`
> - The equivalent of `Cookie(key, value, option)` is `Cookies.set(key, value, option)`
> - The equivalent of `Cookie(key)` is `Cookies.get(key)`

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
//Cookie function:

/* No arguments: 
 * Supply only key: fetches cookie at given key
 * All arguments: sets cookie at given key
 */
Cookie(key, value, options);

/* Example: Setting a cookie that expires in one day
 * Key: Must be of type string
 * Value: Can be string or object
 * Options: Must be of type object
 */
Cookie('myCookie', {data: "Hello World!"}, {expires: 1});

/* Example: Fetching a cookie with key "myCookie"
 * Key: Must be of type string (or number, but returns differently)
 */
Cookie('myCookie'); // Given previous example, returns {data: "Hello World"}

/* Example: Fetching all Cookies
 * No arguments supplied
 */
Cookie();

/* Example: Fetching a cookie at an index
 * Key: Type of number
 */
Cookie(0);

// Cookies usage:

/* Setting cookies using Cookies.set()
 * Works the same as Cookie(key, value, options)
 */
Cookies.set('myCookie', {data: "Hi Earth!"}, {expires: 5})

/* Fetching cookies using Cookies.get()
 * Works the same as Cookie(key)
 */
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
- `Cookie().remove(key)` is no longer a function
- `Cookie()` no longer returns document, returns parsed document.cookie
- `Cookies.get()` no longer returns error, returns parsed document.cookie
- Added `Cookie(index)` and `Cookies.get(index)` to fetch a cookie at an index
- Changed returns to `return false` rather than `return {status: false, message:"[Error Message]"}`. 
- Added Support for setting strings.
- `Cookies.set` still returns the document.cookie object set.

# Other

I'm fairly new to creating open-source code, so I'm sure there might be some issues. If you experience problems, and it might have something to do with my code, try these steps:  
1) Try moving where the script is located in your html file  
2) Make sure you have jquery and are running this on a server (for cookies)  
3) Double check documentation  
4) **If all else fails** or you have suggestions, reach out to me @ gamesandmoreneocities@gmail.com. Please provide one of the Issue Templates.

You may also request for new features at the listed email, and please include one of the provided Issue Templates.