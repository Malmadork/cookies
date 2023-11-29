/**
 * Malmadork/cookies v1.5.0
 * https://github.com/Malmadork/cookies
 *
 * Copyright 2020-2023 Malmadork
 * This script is available open-source. Please include this header in each use of this script, modified or unmodified.
 * 
 * Documentation on github
 * Cookies.set | Cookies.get | Cookies.remove
 * Cookies.storage.set | Cookies.storage.get
 */

var COOKIE_TOOLS = {
    pluses: /\+/g,
    encode: (s) => {
        return encodeURIComponent(s);
    },
    decode: (s) => {
        return decodeURIComponent(s);
    },
    read: (s, converter) => {
        var value = COOKIE_TOOLS.parseCookieValue(s);
        return COOKIE_TOOLS.isFunction(converter) ? converter(value) : value;
    },
    readValue: (s) => {
        return COOKIE_TOOLS.parseCookieValue(s);
    },
    parseCookieValue: (s) => {
        
        if (s.indexOf('"') === 0) {
            
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        var res;
       
        try {
            
            s = decodeURIComponent(s.replace(this.pluses, ' '));
            
            res = JSON.parse(s);
            return res;
        } catch(e) {
            console.error(e);
            return s;
        }
    },
    stringifyCookieValue: (value) => {
        return COOKIE_TOOLS.encode(JSON.stringify(value));
    },
    isFunction: (functionToCheck) => {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    },
    isNumeric: (str) => {
        if (typeof str != "string") return false;
        return !isNaN(str) && !isNaN(parseFloat(str)) 
    },
    parseDateTme: (datetime) => {
        if( typeof this.options.expires === 'number' ) {
            return datetime;
        }
        else if( typeof this.options.expires === 'string' ) {
            var arr = datetime.match(/[a-zA-Z]+|[0-9]+/g);
            if(arr.length != 2) {
                console.error("Incorrect format for 'expires' value. Provide a number followed by characters signifying the length of time [ms, s, m, h, d, w, M]. ", datetime);
            }

            if(COOKIE_TOOLS.isNumeric(arr[0])) {
                if(!COOKIE_TOOLS.isNumeric(arr[1])) {

                    var res = parseFloat(arr[0]);
                    switch(arr[1]) {
                        case 'ms':
                            break;
                        case 's':
                            res = parseFloat(arr[0] * 1000);
                            break;
                        case 'm':
                            res = parseFloat(arr[0] * 6e+4);
                            break;
                        case 'h':
                            res = parseFloat(arr[0] * 3.6e+6);
                            break;
                        case 'd':
                            res = parseFloat(arr[0] * 8.64e+7);
                            break;
                        case 'w':
                            //604,800,000
                            res = parseFloat(arr[0] * 6.048e+8)
                            break;
                        case 'M':
                            //2,629,746,000
                            res = parseFloat(arr[0] * 2.629746e+9)
                            break;
                        default: 
                            break; 
                    }
                       
                    return res;
                }
                else console.error("Format for expires value must be a number followed by characters signifying the length of time [ms, s, m, h, d, w, M]. Example '1000ms', '24h', '365d'. ", datetime);
            }
            else console.error("Format for expires value must be a number followed by characters signifying the length of time [ms, s, m, h, d, w, M]. Example '1000ms', '24h', '365d'. ", datetime);

        }
        else {
            console.error("Incorrect format for 'expires' value. Provide a number in milliseconds or a string followed by [ms, s, m, h, d, w, M]", datetime);
        }
    }
}

var Cookies = {
    storage: {
        set: function(key, data) {
            let value = (typeof data === 'object') ? JSON.stringify(data) : (typeof data === 'string') ? data : null;
            if(value == null) return console.error("Data type of KEY [Cookies.storage.set(KEY)] invalid!")
            localStorage.setItem(key, value);
            return true;
        },
        get: function(key) {
            let value = false;
            let found = localStorage.getItem(key) ? true : false;
            if(found) {
                try {
                    value = JSON.parse(localStorage.getItem(key))
                } catch (error) {
                    value = localStorage.getItem(key)
                }
            }
            return value;
        },
        remove: function(key) {
            let found = localStorage.getItem(key) ? true : false;
            if(found !== false) {
                localStorage.removeItem(key)
                return found;
            }
            else return found;
            
        },
        clear: function() {
            localStorage.clear();
            return true;
        },
        all: function(matches) {
            let list = {};
            if(matches === undefined) {
                if(localStorage.length > 0) {
                    Object.keys(localStorage).forEach(item => {
                        try {
                            list[item] = JSON.parse(localStorage[item])
                        } catch (error) {
                            list[item] = localStorage[item]
                        }
                        
                    })
                    return list;
                }
                else {
                    return false;
                }
            }
            else {
                if(localStorage.length > 0) {
                    Object.keys(localStorage).forEach(item => {
                        if(item.includes(matches)) {
                            try {
                                list[item] = JSON.parse(localStorage[item])
                            } catch (error) {
                                list[item] = localStorage[item]
                            }
                        }
                    })
                    return list;
                }
                else {
                    return false;
                }
            }
        }
    },
    remove: function(key) {

        if(this.get() === undefined) return false;
        let optionobj = Object.assign({expires: -1}, {})
        this.set(key, {}, optionobj);
		return true;
    },
    set: (key, value, options) => {
        this.options = (typeof options === "object") ? Object.assign(options, {}) : {};
        
        
        if (this.options.expires) {
            var time = COOKIE_TOOLS.parseDateTme(this.options.expires), t = this.options.expires = new Date();
            t.setTime(+t + time);
        }

        var _key = (typeof key === 'string') ? true : false;

        if(_key === undefined) {
            return false;
        }

        var _value = (typeof value === 'object') ? COOKIE_TOOLS.stringifyCookieValue(value) : ((typeof value === 'string') ? value : undefined);

        if(_value === undefined) {
            return false;
        }
        
        return (document.cookie = [
            COOKIE_TOOLS.encode(key), '=', _value,
            this.options.expires ? '; expires=' + this.options.expires.toUTCString() : '',
            this.options.path    ? '; path='    + this.options.path : '',
            this.options.domain  ? '; domain='  + this.options.domain : '',
            this.options.secure  ? '; secure' : ''
        ].join(''));
    },
    get: (key) => {
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        if(typeof key === 'number') {
            if(key > cookies.length - 1 || key < 0) return false;

            var parts = cookies[key].split('=');
            var name = COOKIE_TOOLS.decode(parts.shift());
            var cookie = parts.join('=');
            let _res = {}
            _res[name] = COOKIE_TOOLS.read(cookie, undefined)
            return _res;
        }
        else {

            for(var i = 0; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = COOKIE_TOOLS.decode(parts.shift());
                var cookie = parts.join('=');
                
                if (key && key === name) {
                    return COOKIE_TOOLS.read(cookie, undefined);
                    break;
                }

                if (!key && (cookie = COOKIE_TOOLS.read(cookie)) !== undefined) {
                    return result[name] = cookie;
                }
            }
        }
        
        return false;
    }

}
