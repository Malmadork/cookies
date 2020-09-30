var Cookie = function(key, value, options) {
    this.config = {key, value, options}
    this.pluses = /\+/g;
    this.result = key ? undefined : {};

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

        if(this.Cookie(key) === undefined) return {
            status: false,
            message: "Cookie not found"
        }
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

            var _value = (typeof value === 'object') ? this.stringifyCookieValue(value) : ((typeof value === 'string') ? value : undefined);

            if(_value === undefined) {
                return "Cookie must be set as an object or string."
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
            
            return result;
    }
    
    this.cookie = (config) => {
        if(config.key === undefined) {
            this.result = this;
        }
        else if(config.value !== undefined) {
            this.options = Object.assign(config.options, {})
            
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
        
		try {
            
            s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
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
var Cookies = Cookie();

var COOKIE = function(key, value, options) {
    this.config = {key, value, options}
    this.pluses = /\+/g;
    this.result = key ? undefined : {};

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

        if(this.Cookie(key) === undefined) return {
            status: false,
            message: "Cookie not found"
        }
        let optionobj = Object.assign({expires: -1}, options || {})
        this.Cookie(key, {}, optionobj);
		return {status: !this.Cookie(key), message: 'Cookie has been removed'};
    }
    this.set = (key, value, options) => {
        this.options = Object.assign(options, {})
            
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
    this.get = (key) => {
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
           
            for(var i = 0; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = this.decode(parts.shift());
                var cookie = parts.join('=');
                
                if (config.key && config.key === name) {
                    result = this.read(cookie, undefined);
                    break;
                }
    
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
            return result;
    }
    
    this.cookie = (config) => {
        if(config.key === undefined) {
            this.result = this;
        }
        else if(config.value !== undefined) {
            this.options = Object.assign(config.options, {})
            
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
        
		try {
            
            s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
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
var COOKIES = COOKIE();

// var COOKIE = function(key, value, options) {

//     this.config = {key, value, options}
    
//     this.storage = {
//         set: function(key, data) {
//             let value = (typeof data === 'object') ? JSON.stringify(data) : (typeof data === 'string') ? data : null;
//             if(value == null) return console.log("Data type of KEY [Cookies.storage.set(KEY)] invalid!")
//             localStorage.setItem(key, value);
//             return true;
//         },
//         get: function(key) {
//             let value = false;
//             let found = localStorage.getItem(key) ? true : false;
//             if(found) {
//                 try {
//                     value = JSON.parse(localStorage.getItem(key))
//                 } catch (error) {
//                     value = localStorage.getItem(key)
//                 }
//             }
//             return value;
//         },
//         remove: function(key) {
//             let found = localStorage.getItem(key) ? true : false;
//             if(found !== false) {
//                 localStorage.removeItem(key)
//                 return found;
//             }
//             else return found;
            
//         },
//         clear: function() {
//             localStorage.clear();
//             return true;
//         },
//         all: function(matches) {
//             let list = {};
//             if(matches === undefined) {
//                 if(localStorage.length > 0) {
//                     Object.keys(localStorage).forEach(item => {
//                         try {
//                             list[item] = JSON.parse(localStorage[item])
//                         } catch (error) {
//                             list[item] = localStorage[item]
//                         }
                        
//                     })
//                     return list;
//                 }
//                 else {
//                     return false;
//                 }
//             }
//             else {
//                 if(localStorage.length > 0) {
//                     Object.keys(localStorage).forEach(item => {
//                         if(item.includes(matches)) {
//                             try {
//                                 list[item] = JSON.parse(localStorage[item])
//                             } catch (error) {
//                                 list[item] = localStorage[item]
//                             }
//                         }
//                     })
//                     return list;
//                 }
//                 else {
//                     return false;
//                 }
//             }
//         }
//     }

// }
// class COOKIE {
//     constructor(key = undefined, value = undefined, options = undefined) {
//         this.config = {key, value, options}
//         this.storage = {
//             set: function(key, data) {
//                 let value = (typeof data === 'object') ? JSON.stringify(data) : (typeof data === 'string') ? data : null;
//                 if(value == null) return console.log("Data type of KEY [Cookies.storage.set(KEY)] invalid!")
//                 localStorage.setItem(key, value);
//                 return true;
//             },
//             get: function(key) {
//                 let value = false;
//                 let found = localStorage.getItem(key) ? true : false;
//                 if(found) {
//                     try {
//                         value = JSON.parse(localStorage.getItem(key))
//                     } catch (error) {
//                         value = localStorage.getItem(key)
//                     }
//                 }
//                 return value;
//             },
//             remove: function(key) {
//                 let found = localStorage.getItem(key) ? true : false;
//                 if(found !== false) {
//                     localStorage.removeItem(key)
//                     return found;
//                 }
//                 else return found;
                
//             },
//             clear: function() {
//                 localStorage.clear();
//                 return true;
//             },
//             all: function(matches) {
//                 let list = {};
//                 if(matches === undefined) {
//                     if(localStorage.length > 0) {
//                         Object.keys(localStorage).forEach(item => {
//                             try {
//                                 list[item] = JSON.parse(localStorage[item])
//                             } catch (error) {
//                                 list[item] = localStorage[item]
//                             }
                            
//                         })
//                         return list;
//                     }
//                     else {
//                         return false;
//                     }
//                 }
//                 else {
//                     if(localStorage.length > 0) {
//                         Object.keys(localStorage).forEach(item => {
//                             if(item.includes(matches)) {
//                                 try {
//                                     list[item] = JSON.parse(localStorage[item])
//                                 } catch (error) {
//                                     list[item] = localStorage[item]
//                                 }
//                             }
//                         })
//                         return list;
//                     }
//                     else {
//                         return false;
//                     }
//                 }
//             }
//         }
//     }
    
// }
// var _Cookie = function(key, value, options) {
//     return new COOKIE(key, value, options)
// }