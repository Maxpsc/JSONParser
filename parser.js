/**
 * JSON字符串解析器，功能同JSON.parse()
 * @param {string}  - json string
 * @return {*} 由字符串解析的json对象
 * @method parser
 */
var parser = function(str){
    //全局游标index
    var i = 0;
    return parseValue();

    function parseValue() {
        switch(str[i]){
            case '{':return parseObject();
            case '[':return parseArray();
            case '"':return parseString();
            case 't':return parseTrue();
            case 'f':return parseFalse();
            case 'n':return parseNull();
            default: return parseNumber();
        }
    }
    function parseObject() {
        i += 1;
        var res = {};
        while(str[i] !== '}'){
            if(i === str.length - 1){
                throwEndError();
            }
            var key = parseString();
            i += 1;
            var value = parseValue();
            res[key] = value;
            if(str[i] === ','){
                i += 1;
            }
        }
        return res;
    }
    function parseArray() {
        i += 1;
        var res = [];
        while(str[i] !== ']'){
            if(i === str.length - 1){
                throwEndError();
            }
            res.push(parseValue());
            if(str[i] === ','){
                i += 1;
            }
        }
        i += 1;
        return res;
    }
    function parseString() {
        var res = '';
        i += 1;
        while(str[i] !== '"'){
            if(i === str.length - 1){
                throwEndError();
            }
            res += str[i];
            i += 1;
        }
        i += 1;
        return res;
    }
    function parseNumber() {
        var res = '';
        while(isDigital(str[i])){
            res += str[i];
            i += 1;
        }
        res = parseFloat(res);
        if(!isNaN(res)){
            return res;
        }else{
            throwTokenError(i);
        }
        function isDigital(n){
            var chars = {
                '.': true,
                '+': true,
                '-': true,
                'e': true,
                'E': true
            };
            return chars[n] || (n >= '0' && n <= '9');
        }
    }
    function parseTrue() {
        if(str.substr(i,4) === 'true'){
            i += 4;
            return true;
        }else{
            throwTokenError(i);
        }
    }
    function parseFalse() {
        if(str.substr(i,5) === 'false'){
            i += 5;
            return false;
        }else{
            throwTokenError(i);
        }
    }
    function parseNull() {
        if(str.substr(i,4) === 'null'){
            i += 4;
            return null;
        }else{
             throwTokenError(i);
        }
    }
    //dealing errors
    function throwTokenError(pos){
        throw new SyntaxError('Unexpected token '+ str[pos] + ' in JSON at position '+ pos);
    }
    function throwEndError(){
        throw new SyntaxError('Unexpected end of JSON input');
    }
};
var json1 = '{"a":1,"b":"b","c":true,"d":null,"e":[1,2],"f":{"a":1}}';
var json2 = '[1,2,[1,2],3]';
console.log(parser(json1));
console.log(parser(json2));
