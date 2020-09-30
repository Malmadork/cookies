/**
 * Malmadork/cookies v1.3.0
 * https://github.com/Malmadork/cookies
 *
 * Copyright 2020 Malmadork
 * This script is available open-source. Please include this header in each use of this script, modified or unmodified.
 * 
 * Documentation on github
 * Cookie(key, value, options)
 * Cookies.set | Cookies.get | Cookies.remove
 * Cookies.storage
 */
var Cookie = function(key, value, options) {
    this.config = {key, value, options}
    this.pluses = /\+/g;
    this.result = key ? true : undefined;

    if(result === undefined) {
        let _res = {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for(var i = 0; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var name = this.decode(parts.shift());
            var cookie = parts.join('=');
            
            if (key && key === name) {
                _res = this.read(cookie, undefined);
                break;
            }

            if (!key && (cookie = read(cookie)) !== undefined) {
                _res[name] = cookie;
            }
        }
        return _res;
    }

    this.storage = {
        set: function(key, data) {
            let value = (typeof data === 'object') ? JSON.stringify(data) : (typeof data === 'string') ? data : null;
            if(value == null) return console.log("Data type of KEY [Cookies.storage.set(KEY)] invalid!")
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
    }

    this.remove = function(key) {

        if(this.Cookie(key) === undefined) return false;
        let optionobj = Object.assign({expires: -1}, options || {})
        this.Cookie(key, {}, optionobj);
		return {status: !this.Cookie(key), message: 'Cookie has been removed'};
    }
    this.set = (key, value, options) => {
        this.options = (typeof options === "object") ? Object.assign(options, {}) : {};
        
        
        if (this.options.expires && typeof this.options.expires === 'number') {
            var days = this.options.expires, t = this.options.expires = new Date();
            t.setTime(+t + days * 864e+5);
        }

        var _key = (typeof key === 'string') ? true : false;

        if(_key === undefined) {
            return false;
        }

        var _value = (typeof value === 'object') ? this.stringifyCookieValue(value) : ((typeof value === 'string') ? value : undefined);

        if(_value === undefined) {
            return false;
        }
        
        return (document.cookie = [
            this.encode(key), '=', _value,
            this.options.expires ? '; expires=' + this.options.expires.toUTCString() : '',
            this.options.path    ? '; path='    + this.options.path : '',
            this.options.domain  ? '; domain='  + this.options.domain : '',
            this.options.secure  ? '; secure' : ''
        ].join(''));
    }
    this.get = (key) => {
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        if(typeof key === 'number') {
            if(key > cookies.length - 1 || key < 0) return false;

            var parts = cookies[key].split('=');
            var name = this.decode(parts.shift());
            var cookie = parts.join('=');
            let _res = {}
            _res[name] = this.read(cookie, undefined)
            return _res;
        }
        else {
            for(var i = 0; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = this.decode(parts.shift());
                var cookie = parts.join('=');
                
                

                if (key && key === name) {
                    result = this.read(cookie, undefined);
                    break;
                }

                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
        }
        
        return result;
    }
    
    this.cookie = (config) => {
        if(typeof config.key === 'number') {
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            if(config.key >= cookies.length - 1 || config.key < 0) return false;

            var parts = cookies[config.key].split('=');
            var name = this.decode(parts.shift());
            var cookie = parts.join('=');
            return this.read(cookie, undefined)
        }
        if(config.key === undefined) {
            return document.cookie.split('; ');
        }
        else if(config.value !== undefined) {
            this.options = (typeof options === "object") ? Object.assign(options, {}) : {};
            
			if (typeof this.options.expires === 'number') {
				var days = this.options.expires, t = this.options.expires = new Date();
				t.setTime(+t + days * 864e+5);
            }

			return (document.cookie = [
				this.encode(key), '=', this.stringifyCookieValue(value),
				this.options.expires ? '; expires=' + this.options.expires.toUTCString() : '',
				this.options.path    ? '; path='    + this.options.path : '',
				this.options.domain  ? '; domain='  + this.options.domain : '',
				this.options.secure  ? '; secure' : ''
            ].join(''));
            
        }
        else {
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            
            for(var i = 0; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = this.decode(parts.shift());
                var cookie = parts.join('=');
                
                if (config.key && config.key === name) {
                    this.result = this.read(cookie, value);
                    break;
                }
    
                if (!key && (cookie = read(cookie)) !== undefined) {
                    this.result[name] = cookie;
                }
            }
        }
    }
    this.encode = (s) => {
        return encodeURIComponent(s);
    }
    this.decode = (s) => {
        return decodeURIComponent(s);
    }
    this.read = (s, converter) => {
        var value = parseCookieValue(s);
		return this.isFunction(converter) ? converter(value) : value;
    }
    this.readValue = (s) => {
        return parseCookieValue(s);
    }
    this.parseCookieValue = (s) => {
        if (s.indexOf('"') === 0) {
			
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        var res;
        
		try {
            
            s = decodeURIComponent(s.replace(pluses, ' '));
            res = JSON.parse(s);
			return res;
		} catch(e) {
            return s;
        }
    }
    this.stringifyCookieValue = (value) => {
		return this.encode(JSON.stringify(value));
    }
    this.isFunction = (functionToCheck) => {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    this.cookie(this.config);
    return this.result;
}
var Cookies = {
    storage: {
        set: function(key, data) {
            let value = (typeof data === 'object') ? JSON.stringify(data) : (typeof data === 'string') ? data : null;
            if(value == null) return console.log("Data type of KEY [Cookies.storage.set(KEY)] invalid!")
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

        if(Cookie(key) === undefined) return false;
        let optionobj = Object.assign({expires: -1}, {})
        Cookie(key, {}, optionobj);
		return true;
    },
    set: (key, value, options) => {
        this.options = (typeof options === "object") ? Object.assign(options, {}) : {};
        
        
        if (this.options.expires && typeof this.options.expires === 'number') {
            var days = this.options.expires, t = this.options.expires = new Date();
            t.setTime(+t + days * 864e+5);
        }

        var _key = (typeof key === 'string') ? true : false;

        if(_key === undefined) {
            return false;
        }

        var _value = (typeof value === 'object') ? this.stringifyCookieValue(value) : ((typeof value === 'string') ? value : undefined);

        if(_value === undefined) {
            return false;
        }
        
        return (document.cookie = [
            this.encode(key), '=', _value,
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
            var name = this.decode(parts.shift());
            var cookie = parts.join('=');
            let _res = {}
            _res[name] = this.read(cookie, undefined)
            return _res;
        }
        else {
            for(var i = 0; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = this.decode(parts.shift());
                var cookie = parts.join('=');
                
                

                if (key && key === name) {
                    result = this.read(cookie, undefined);
                    break;
                }

                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
        }
        
        return result;
    },
    encode: (s) => {
        return encodeURIComponent(s);
    },
    decode: (s) => {
        return decodeURIComponent(s);
    },
    read: (s, converter) => {
        var value = parseCookieValue(s);
		return this.isFunction(converter) ? converter(value) : value;
    },
    readValue: (s) => {
        return parseCookieValue(s);
    },
    parseCookieValue: (s) => {
        if (s.indexOf('"') === 0) {
			
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        var res;
        
		try {
            
            s = decodeURIComponent(s.replace(pluses, ' '));
            res = JSON.parse(s);
			return res;
		} catch(e) {
            return s;
        }
    },
    stringifyCookieValue: (value) => {
		return this.encode(JSON.stringify(value));
    },
    isFunction: (functionToCheck) => {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
}