var Cookie = function(key, value, options) {
    this.config = {key, value, options}
    this.pluses = /\+/g;
    this.result = key ? undefined : {};

    this.remove = function(key) {

        if(this.Cookie(key) === undefined) return {
            status: false,
            message: "Cookie not found"
        }
        this.Cookie(key, {}, $.extend({}, options, { expires: -1 }));
		return !this.Cookie(key);
    }
    this.cookie = (config) => {
        if(config.key === undefined) {
            this.result = this;
        }
        else if(config.value !== undefined) {
            this.options = $.extend({}, config.defaults, options);
            
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
		return $.isFunction(converter) ? converter(value) : value;
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
    this.cookie(this.config);
    return this.result;
}
var Cookies = Cookie();