(function() {
/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"edn":3,"EdnValue":4,"EOF":5,"EdnNilLiteral":6,"EdnBooleanLiteral":7,"EdnString":8,"EdnCharacter":9,"EdnSymbol":10,"EdnKeyword":11,"EdnInteger":12,"EdnFloat":13,"EdnList":14,"EdnVector":15,"EdnMap":16,"EdnSet":17,"EdnTag":18,"EdnValueList":19,"DISCARD":20,"NIL":21,"TRUE":22,"FALSE":23,"STRING":24,"NEWLINE":25,"RETURN":26,"SPACE":27,"TAB":28,"CHAR":29,"SYMBOL":30,"KEYWORD":31,"INTEGER":32,"FLOAT":33,"(":34,")":35,"[":36,"]":37,"{":38,"}":39,"#{":40,"TAG":41,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",20:"DISCARD",21:"NIL",22:"TRUE",23:"FALSE",24:"STRING",25:"NEWLINE",26:"RETURN",27:"SPACE",28:"TAB",29:"CHAR",30:"SYMBOL",31:"KEYWORD",32:"INTEGER",33:"FLOAT",34:"(",35:")",36:"[",37:"]",38:"{",39:"}",40:"#{",41:"TAG"},
productions_: [0,[3,2],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[19,2],[19,1],[19,3],[19,2],[6,1],[7,1],[7,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,2],[14,3],[15,2],[15,3],[16,2],[16,3],[17,2],[17,3],[18,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {
var $0 = $$.length - 1;
switch (yystate) {
case 1: return this.$ = $$[$0-1];
break;
case 15: this.$ = [];
break;
case 16: this.$ = [$$[$0]];
break;
case 17: this.$ = $$[$0-2]
break;
case 18: this.$ = $$[$0-1]; $$[$0-1].push($$[$0]);
break;
case 19: this.$ = null;
break;
case 20: this.$ = true;
break;
case 21: this.$ = false;
break;
case 22: // replace escaped characters with actual character
this.$ = yytext.substr(1,yyleng-2)
.replace(/\\(\\|")/g, "$"+"1")
.replace(/\\n/g,'\n')
.replace(/\\r/g,'\r')
.replace(/\\t/g,'\t')
.replace(/\\v/g,'\v')
.replace(/\\f/g,'\f')
.replace(/\\b/g,'\b');
break;
case 23: this.$ = yy.Character("\n");
break;
case 24: this.$ = yy.Character("\r");
break;
case 25: this.$ = yy.Character(" ");
break;
case 26: this.$ = yy.Character("\t");
break;
case 27: this.$ = yy.Character(yytext[1]);
break;
case 28: this.$ = yy.Symbol(yytext);
break;
case 29: this.$ = yy.Keyword(yytext.slice(1));
break;
case 30: this.$ = yy.Integer(parseInt(yytext));
break;
case 31: this.$ = yy.Float(parseFloat(yytext));
break;
case 32: this.$ = yy.List([]);
break;
case 33: this.$ = yy.List($$[$0-1]);
break;
case 34: this.$ = yy.Vector([]);
break;
case 35: this.$ = yy.Vector($$[$0-1]);
break;
case 36: this.$ = yy.Map([]);
break;
case 37: this.$ = yy.Map($$[$0-1]);
break;
case 38: this.$ = yy.Set([]);
break;
case 39: this.$ = yy.Set($$[$0-1]);
break;
case 40: this.$ = yy.Tag($$[$0-1].substr(1), $$[$0], yy.options);
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],38:[1,31],40:[1,32],41:[1,33]},{1:[3]},{5:[1,34]},{5:[2,2],20:[2,2],21:[2,2],22:[2,2],23:[2,2],24:[2,2],25:[2,2],26:[2,2],27:[2,2],28:[2,2],29:[2,2],30:[2,2],31:[2,2],32:[2,2],33:[2,2],34:[2,2],35:[2,2],36:[2,2],37:[2,2],38:[2,2],39:[2,2],40:[2,2],41:[2,2]},{5:[2,3],20:[2,3],21:[2,3],22:[2,3],23:[2,3],24:[2,3],25:[2,3],26:[2,3],27:[2,3],28:[2,3],29:[2,3],30:[2,3],31:[2,3],32:[2,3],33:[2,3],34:[2,3],35:[2,3],36:[2,3],37:[2,3],38:[2,3],39:[2,3],40:[2,3],41:[2,3]},{5:[2,4],20:[2,4],21:[2,4],22:[2,4],23:[2,4],24:[2,4],25:[2,4],26:[2,4],27:[2,4],28:[2,4],29:[2,4],30:[2,4],31:[2,4],32:[2,4],33:[2,4],34:[2,4],35:[2,4],36:[2,4],37:[2,4],38:[2,4],39:[2,4],40:[2,4],41:[2,4]},{5:[2,5],20:[2,5],21:[2,5],22:[2,5],23:[2,5],24:[2,5],25:[2,5],26:[2,5],27:[2,5],28:[2,5],29:[2,5],30:[2,5],31:[2,5],32:[2,5],33:[2,5],34:[2,5],35:[2,5],36:[2,5],37:[2,5],38:[2,5],39:[2,5],40:[2,5],41:[2,5]},{5:[2,6],20:[2,6],21:[2,6],22:[2,6],23:[2,6],24:[2,6],25:[2,6],26:[2,6],27:[2,6],28:[2,6],29:[2,6],30:[2,6],31:[2,6],32:[2,6],33:[2,6],34:[2,6],35:[2,6],36:[2,6],37:[2,6],38:[2,6],39:[2,6],40:[2,6],41:[2,6]},{5:[2,7],20:[2,7],21:[2,7],22:[2,7],23:[2,7],24:[2,7],25:[2,7],26:[2,7],27:[2,7],28:[2,7],29:[2,7],30:[2,7],31:[2,7],32:[2,7],33:[2,7],34:[2,7],35:[2,7],36:[2,7],37:[2,7],38:[2,7],39:[2,7],40:[2,7],41:[2,7]},{5:[2,8],20:[2,8],21:[2,8],22:[2,8],23:[2,8],24:[2,8],25:[2,8],26:[2,8],27:[2,8],28:[2,8],29:[2,8],30:[2,8],31:[2,8],32:[2,8],33:[2,8],34:[2,8],35:[2,8],36:[2,8],37:[2,8],38:[2,8],39:[2,8],40:[2,8],41:[2,8]},{5:[2,9],20:[2,9],21:[2,9],22:[2,9],23:[2,9],24:[2,9],25:[2,9],26:[2,9],27:[2,9],28:[2,9],29:[2,9],30:[2,9],31:[2,9],32:[2,9],33:[2,9],34:[2,9],35:[2,9],36:[2,9],37:[2,9],38:[2,9],39:[2,9],40:[2,9],41:[2,9]},{5:[2,10],20:[2,10],21:[2,10],22:[2,10],23:[2,10],24:[2,10],25:[2,10],26:[2,10],27:[2,10],28:[2,10],29:[2,10],30:[2,10],31:[2,10],32:[2,10],33:[2,10],34:[2,10],35:[2,10],36:[2,10],37:[2,10],38:[2,10],39:[2,10],40:[2,10],41:[2,10]},{5:[2,11],20:[2,11],21:[2,11],22:[2,11],23:[2,11],24:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11],29:[2,11],30:[2,11],31:[2,11],32:[2,11],33:[2,11],34:[2,11],35:[2,11],36:[2,11],37:[2,11],38:[2,11],39:[2,11],40:[2,11],41:[2,11]},{5:[2,12],20:[2,12],21:[2,12],22:[2,12],23:[2,12],24:[2,12],25:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],30:[2,12],31:[2,12],32:[2,12],33:[2,12],34:[2,12],35:[2,12],36:[2,12],37:[2,12],38:[2,12],39:[2,12],40:[2,12],41:[2,12]},{5:[2,13],20:[2,13],21:[2,13],22:[2,13],23:[2,13],24:[2,13],25:[2,13],26:[2,13],27:[2,13],28:[2,13],29:[2,13],30:[2,13],31:[2,13],32:[2,13],33:[2,13],34:[2,13],35:[2,13],36:[2,13],37:[2,13],38:[2,13],39:[2,13],40:[2,13],41:[2,13]},{5:[2,14],20:[2,14],21:[2,14],22:[2,14],23:[2,14],24:[2,14],25:[2,14],26:[2,14],27:[2,14],28:[2,14],29:[2,14],30:[2,14],31:[2,14],32:[2,14],33:[2,14],34:[2,14],35:[2,14],36:[2,14],37:[2,14],38:[2,14],39:[2,14],40:[2,14],41:[2,14]},{5:[2,19],20:[2,19],21:[2,19],22:[2,19],23:[2,19],24:[2,19],25:[2,19],26:[2,19],27:[2,19],28:[2,19],29:[2,19],30:[2,19],31:[2,19],32:[2,19],33:[2,19],34:[2,19],35:[2,19],36:[2,19],37:[2,19],38:[2,19],39:[2,19],40:[2,19],41:[2,19]},{5:[2,20],20:[2,20],21:[2,20],22:[2,20],23:[2,20],24:[2,20],25:[2,20],26:[2,20],27:[2,20],28:[2,20],29:[2,20],30:[2,20],31:[2,20],32:[2,20],33:[2,20],34:[2,20],35:[2,20],36:[2,20],37:[2,20],38:[2,20],39:[2,20],40:[2,20],41:[2,20]},{5:[2,21],20:[2,21],21:[2,21],22:[2,21],23:[2,21],24:[2,21],25:[2,21],26:[2,21],27:[2,21],28:[2,21],29:[2,21],30:[2,21],31:[2,21],32:[2,21],33:[2,21],34:[2,21],35:[2,21],36:[2,21],37:[2,21],38:[2,21],39:[2,21],40:[2,21],41:[2,21]},{5:[2,22],20:[2,22],21:[2,22],22:[2,22],23:[2,22],24:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[2,22],29:[2,22],30:[2,22],31:[2,22],32:[2,22],33:[2,22],34:[2,22],35:[2,22],36:[2,22],37:[2,22],38:[2,22],39:[2,22],40:[2,22],41:[2,22]},{5:[2,23],20:[2,23],21:[2,23],22:[2,23],23:[2,23],24:[2,23],25:[2,23],26:[2,23],27:[2,23],28:[2,23],29:[2,23],30:[2,23],31:[2,23],32:[2,23],33:[2,23],34:[2,23],35:[2,23],36:[2,23],37:[2,23],38:[2,23],39:[2,23],40:[2,23],41:[2,23]},{5:[2,24],20:[2,24],21:[2,24],22:[2,24],23:[2,24],24:[2,24],25:[2,24],26:[2,24],27:[2,24],28:[2,24],29:[2,24],30:[2,24],31:[2,24],32:[2,24],33:[2,24],34:[2,24],35:[2,24],36:[2,24],37:[2,24],38:[2,24],39:[2,24],40:[2,24],41:[2,24]},{5:[2,25],20:[2,25],21:[2,25],22:[2,25],23:[2,25],24:[2,25],25:[2,25],26:[2,25],27:[2,25],28:[2,25],29:[2,25],30:[2,25],31:[2,25],32:[2,25],33:[2,25],34:[2,25],35:[2,25],36:[2,25],37:[2,25],38:[2,25],39:[2,25],40:[2,25],41:[2,25]},{5:[2,26],20:[2,26],21:[2,26],22:[2,26],23:[2,26],24:[2,26],25:[2,26],26:[2,26],27:[2,26],28:[2,26],29:[2,26],30:[2,26],31:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26],37:[2,26],38:[2,26],39:[2,26],40:[2,26],41:[2,26]},{5:[2,27],20:[2,27],21:[2,27],22:[2,27],23:[2,27],24:[2,27],25:[2,27],26:[2,27],27:[2,27],28:[2,27],29:[2,27],30:[2,27],31:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27],37:[2,27],38:[2,27],39:[2,27],40:[2,27],41:[2,27]},{5:[2,28],20:[2,28],21:[2,28],22:[2,28],23:[2,28],24:[2,28],25:[2,28],26:[2,28],27:[2,28],28:[2,28],29:[2,28],30:[2,28],31:[2,28],32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],37:[2,28],38:[2,28],39:[2,28],40:[2,28],41:[2,28]},{5:[2,29],20:[2,29],21:[2,29],22:[2,29],23:[2,29],24:[2,29],25:[2,29],26:[2,29],27:[2,29],28:[2,29],29:[2,29],30:[2,29],31:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],37:[2,29],38:[2,29],39:[2,29],40:[2,29],41:[2,29]},{5:[2,30],20:[2,30],21:[2,30],22:[2,30],23:[2,30],24:[2,30],25:[2,30],26:[2,30],27:[2,30],28:[2,30],29:[2,30],30:[2,30],31:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],37:[2,30],38:[2,30],39:[2,30],40:[2,30],41:[2,30]},{5:[2,31],20:[2,31],21:[2,31],22:[2,31],23:[2,31],24:[2,31],25:[2,31],26:[2,31],27:[2,31],28:[2,31],29:[2,31],30:[2,31],31:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],37:[2,31],38:[2,31],39:[2,31],40:[2,31],41:[2,31]},{4:38,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:36,20:[1,37],21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],35:[1,35],36:[1,30],38:[1,31],40:[1,32],41:[1,33]},{4:38,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:40,20:[1,37],21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],37:[1,39],38:[1,31],40:[1,32],41:[1,33]},{4:38,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:42,20:[1,37],21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],38:[1,31],39:[1,41],40:[1,32],41:[1,33]},{4:38,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:44,20:[1,37],21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],38:[1,31],39:[1,43],40:[1,32],41:[1,33]},{4:45,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],38:[1,31],40:[1,32],41:[1,33]},{1:[2,1]},{5:[2,32],20:[2,32],21:[2,32],22:[2,32],23:[2,32],24:[2,32],25:[2,32],26:[2,32],27:[2,32],28:[2,32],29:[2,32],30:[2,32],31:[2,32],32:[2,32],33:[2,32],34:[2,32],35:[2,32],36:[2,32],37:[2,32],38:[2,32],39:[2,32],40:[2,32],41:[2,32]},{4:48,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,20:[1,47],21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],35:[1,46],36:[1,30],38:[1,31],40:[1,32],41:[1,33]},{4:49,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],38:[1,31],40:[1,32],41:[1,33]},{20:[2,16],21:[2,16],22:[2,16],23:[2,16],24:[2,16],25:[2,16],26:[2,16],27:[2,16],28:[2,16],29:[2,16],30:[2,16],31:[2,16],32:[2,16],33:[2,16],34:[2,16],35:[2,16],36:[2,16],37:[2,16],38:[2,16],39:[2,16],40:[2,16],41:[2,16]},{5:[2,34],20:[2,34],21:[2,34],22:[2,34],23:[2,34],24:[2,34],25:[2,34],26:[2,34],27:[2,34],28:[2,34],29:[2,34],30:[2,34],31:[2,34],32:[2,34],33:[2,34],34:[2,34],35:[2,34],36:[2,34],37:[2,34],38:[2,34],39:[2,34],40:[2,34],41:[2,34]},{4:48,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,20:[1,47],21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],37:[1,50],38:[1,31],40:[1,32],41:[1,33]},{5:[2,36],20:[2,36],21:[2,36],22:[2,36],23:[2,36],24:[2,36],25:[2,36],26:[2,36],27:[2,36],28:[2,36],29:[2,36],30:[2,36],31:[2,36],32:[2,36],33:[2,36],34:[2,36],35:[2,36],36:[2,36],37:[2,36],38:[2,36],39:[2,36],40:[2,36],41:[2,36]},{4:48,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,20:[1,47],21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],38:[1,31],39:[1,51],40:[1,32],41:[1,33]},{5:[2,38],20:[2,38],21:[2,38],22:[2,38],23:[2,38],24:[2,38],25:[2,38],26:[2,38],27:[2,38],28:[2,38],29:[2,38],30:[2,38],31:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],37:[2,38],38:[2,38],39:[2,38],40:[2,38],41:[2,38]},{4:48,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,20:[1,47],21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],38:[1,31],39:[1,52],40:[1,32],41:[1,33]},{5:[2,40],20:[2,40],21:[2,40],22:[2,40],23:[2,40],24:[2,40],25:[2,40],26:[2,40],27:[2,40],28:[2,40],29:[2,40],30:[2,40],31:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],37:[2,40],38:[2,40],39:[2,40],40:[2,40],41:[2,40]},{5:[2,33],20:[2,33],21:[2,33],22:[2,33],23:[2,33],24:[2,33],25:[2,33],26:[2,33],27:[2,33],28:[2,33],29:[2,33],30:[2,33],31:[2,33],32:[2,33],33:[2,33],34:[2,33],35:[2,33],36:[2,33],37:[2,33],38:[2,33],39:[2,33],40:[2,33],41:[2,33]},{4:53,6:3,7:4,8:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,21:[1,16],22:[1,17],23:[1,18],24:[1,19],25:[1,20],26:[1,21],27:[1,22],28:[1,23],29:[1,24],30:[1,25],31:[1,26],32:[1,27],33:[1,28],34:[1,29],36:[1,30],38:[1,31],40:[1,32],41:[1,33]},{20:[2,18],21:[2,18],22:[2,18],23:[2,18],24:[2,18],25:[2,18],26:[2,18],27:[2,18],28:[2,18],29:[2,18],30:[2,18],31:[2,18],32:[2,18],33:[2,18],34:[2,18],35:[2,18],36:[2,18],37:[2,18],38:[2,18],39:[2,18],40:[2,18],41:[2,18]},{20:[2,15],21:[2,15],22:[2,15],23:[2,15],24:[2,15],25:[2,15],26:[2,15],27:[2,15],28:[2,15],29:[2,15],30:[2,15],31:[2,15],32:[2,15],33:[2,15],34:[2,15],35:[2,15],36:[2,15],37:[2,15],38:[2,15],39:[2,15],40:[2,15],41:[2,15]},{5:[2,35],20:[2,35],21:[2,35],22:[2,35],23:[2,35],24:[2,35],25:[2,35],26:[2,35],27:[2,35],28:[2,35],29:[2,35],30:[2,35],31:[2,35],32:[2,35],33:[2,35],34:[2,35],35:[2,35],36:[2,35],37:[2,35],38:[2,35],39:[2,35],40:[2,35],41:[2,35]},{5:[2,37],20:[2,37],21:[2,37],22:[2,37],23:[2,37],24:[2,37],25:[2,37],26:[2,37],27:[2,37],28:[2,37],29:[2,37],30:[2,37],31:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37],37:[2,37],38:[2,37],39:[2,37],40:[2,37],41:[2,37]},{5:[2,39],20:[2,39],21:[2,39],22:[2,39],23:[2,39],24:[2,39],25:[2,39],26:[2,39],27:[2,39],28:[2,39],29:[2,39],30:[2,39],31:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],37:[2,39],38:[2,39],39:[2,39],40:[2,39],41:[2,39]},{20:[2,17],21:[2,17],22:[2,17],23:[2,17],24:[2,17],25:[2,17],26:[2,17],27:[2,17],28:[2,17],29:[2,17],30:[2,17],31:[2,17],32:[2,17],33:[2,17],34:[2,17],35:[2,17],36:[2,17],37:[2,17],38:[2,17],39:[2,17],40:[2,17],41:[2,17]}],
defaultActions: {34:[2,1]},
parseError: function parseError(str, hash) {
throw new Error(str);
},
parse: function parse(input) {
var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
this.lexer.setInput(input);
this.lexer.yy = this.yy;
this.yy.lexer = this.lexer;
this.yy.parser = this;
if (typeof this.lexer.yylloc == "undefined")
this.lexer.yylloc = {};
var yyloc = this.lexer.yylloc;
lstack.push(yyloc);
var ranges = this.lexer.options && this.lexer.options.ranges;
if (typeof this.yy.parseError === "function")
this.parseError = this.yy.parseError;
function popStack(n) {
stack.length = stack.length - 2 * n;
vstack.length = vstack.length - n;
lstack.length = lstack.length - n;
}
function lex() {
var token;
token = self.lexer.lex() || 1;
if (typeof token !== "number") {
token = self.symbols_[token] || token;
}
return token;
}
var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
while (true) {
state = stack[stack.length - 1];
if (this.defaultActions[state]) {
action = this.defaultActions[state];
} else {
if (symbol === null || typeof symbol == "undefined") {
symbol = lex();
}
action = table[state] && table[state][symbol];
}
if (typeof action === "undefined" || !action.length || !action[0]) {
var errStr = "";
if (!recovering) {
expected = [];
for (p in table[state])
if (this.terminals_[p] && p > 2) {
expected.push("'" + this.terminals_[p] + "'");
}
if (this.lexer.showPosition) {
errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
} else {
errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
}
this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
}
}
if (action[0] instanceof Array && action.length > 1) {
throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
}
switch (action[0]) {
case 1:
stack.push(symbol);
vstack.push(this.lexer.yytext);
lstack.push(this.lexer.yylloc);
stack.push(action[1]);
symbol = null;
if (!preErrorSymbol) {
yyleng = this.lexer.yyleng;
yytext = this.lexer.yytext;
yylineno = this.lexer.yylineno;
yyloc = this.lexer.yylloc;
if (recovering > 0)
recovering--;
} else {
symbol = preErrorSymbol;
preErrorSymbol = null;
}
break;
case 2:
len = this.productions_[action[1]][1];
yyval.$ = vstack[vstack.length - len];
yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
if (ranges) {
yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
}
r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
if (typeof r !== "undefined") {
return r;
}
if (len) {
stack = stack.slice(0, -1 * len * 2);
vstack = vstack.slice(0, -1 * len);
lstack = lstack.slice(0, -1 * len);
}
stack.push(this.productions_[action[1]][0]);
vstack.push(yyval.$);
lstack.push(yyval._$);
newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
stack.push(newState);
break;
case 3:
return true;
}
}
return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
if (this.yy.parser) {
this.yy.parser.parseError(str, hash);
} else {
throw new Error(str);
}
},
setInput:function (input) {
this._input = input;
this._more = this._less = this.done = false;
this.yylineno = this.yyleng = 0;
this.yytext = this.matched = this.match = '';
this.conditionStack = ['INITIAL'];
this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
if (this.options.ranges) this.yylloc.range = [0,0];
this.offset = 0;
return this;
},
input:function () {
var ch = this._input[0];
this.yytext += ch;
this.yyleng++;
this.offset++;
this.match += ch;
this.matched += ch;
var lines = ch.match(/(?:\r\n?|\n).*/g);
if (lines) {
this.yylineno++;
this.yylloc.last_line++;
} else {
this.yylloc.last_column++;
}
if (this.options.ranges) this.yylloc.range[1]++;
this._input = this._input.slice(1);
return ch;
},
unput:function (ch) {
var len = ch.length;
var lines = ch.split(/(?:\r\n?|\n)/g);
this._input = ch + this._input;
this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
//this.yyleng -= len;
this.offset -= len;
var oldLines = this.match.split(/(?:\r\n?|\n)/g);
this.match = this.match.substr(0, this.match.length-1);
this.matched = this.matched.substr(0, this.matched.length-1);
if (lines.length-1) this.yylineno -= lines.length-1;
var r = this.yylloc.range;
this.yylloc = {first_line: this.yylloc.first_line,
last_line: this.yylineno+1,
first_column: this.yylloc.first_column,
last_column: lines ?
(lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
this.yylloc.first_column - len
};
if (this.options.ranges) {
this.yylloc.range = [r[0], r[0] + this.yyleng - len];
}
return this;
},
more:function () {
this._more = true;
return this;
},
less:function (n) {
this.unput(this.match.slice(n));
},
pastInput:function () {
var past = this.matched.substr(0, this.matched.length - this.match.length);
return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
},
upcomingInput:function () {
var next = this.match;
if (next.length < 20) {
next += this._input.substr(0, 20-next.length);
}
return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
},
showPosition:function () {
var pre = this.pastInput();
var c = new Array(pre.length + 1).join("-");
return pre + this.upcomingInput() + "\n" + c+"^";
},
next:function () {
if (this.done) {
return this.EOF;
}
if (!this._input) this.done = true;
var token,
match,
tempMatch,
index,
col,
lines;
if (!this._more) {
this.yytext = '';
this.match = '';
}
var rules = this._currentRules();
for (var i=0;i < rules.length; i++) {
tempMatch = this._input.match(this.rules[rules[i]]);
if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
match = tempMatch;
index = i;
if (!this.options.flex) break;
}
}
if (match) {
lines = match[0].match(/(?:\r\n?|\n).*/g);
if (lines) this.yylineno += lines.length;
this.yylloc = {first_line: this.yylloc.last_line,
last_line: this.yylineno+1,
first_column: this.yylloc.last_column,
last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
this.yytext += match[0];
this.match += match[0];
this.matches = match;
this.yyleng = this.yytext.length;
if (this.options.ranges) {
this.yylloc.range = [this.offset, this.offset += this.yyleng];
}
this._more = false;
this._input = this._input.slice(match[0].length);
this.matched += match[0];
token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
if (this.done && this._input) this.done = false;
if (token) return token;
else return;
}
if (this._input === "") {
return this.EOF;
} else {
return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
{text: "", token: null, line: this.yylineno});
}
},
lex:function lex() {
var r = this.next();
if (typeof r !== 'undefined') {
return r;
} else {
return this.lex();
}
},
begin:function begin(condition) {
this.conditionStack.push(condition);
},
popState:function popState() {
return this.conditionStack.pop();
},
_currentRules:function _currentRules() {
return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
},
topState:function () {
return this.conditionStack[this.conditionStack.length-2];
},
pushState:function begin(condition) {
this.begin(condition);
}});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* commas are whitespace */
break;
case 2:/* skip comment */
break;
case 3:return 20;
break;
case 4:return 25;
break;
case 5:return 26;
break;
case 6:return 27;
break;
case 7:return 28;
break;
case 8:return 29
break;
case 9:return 33;
break;
case 10:return 32;
break;
case 11:return 24
break;
case 12:return 22;
break;
case 13:return 23;
break;
case 14:return 21;
break;
case 15:return 5;
break;
case 16:return 34;
break;
case 17:return 35;
break;
case 18:return 40;
break;
case 19:return 38;
break;
case 20:return 39;
break;
case 21:return 36;
break;
case 22:return 37;
break;
case 23:return 41;
break;
case 24:return 31;
break;
case 25:return 30;
break;
}
};
lexer.rules = [/^(?:\s+)/,/^(?:,)/,/^(?:;[^\n]+)/,/^(?:#[_])/,/^(?:\\newline\b)/,/^(?:\\return\b)/,/^(?:\\space\b)/,/^(?:\\tab\b)/,/^(?:\\[a-z]\b)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)\b)/,/^(?:(-?([0-9]|[1-9][0-9]+))\b)/,/^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:true\b)/,/^(?:false\b)/,/^(?:nil\b)/,/^(?:$)/,/^(?:\()/,/^(?:\))/,/^(?:#\{)/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:#[a-zA-Z0-9\/]+)/,/^(?::[a-zA-Z0-9\/\.\*\+\!\:\-\_\?\$\=\#]+)/,/^(?:[a-zA-Z\.\*\+\!\-\_\?\$\%\&\=\/][a-zA-Z0-9\#\.\*\+\!\-\_\?\$\%\&\=\/]*)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();/*global parser:true */
"use strict";
if (typeof exports !== 'undefined') {
var edn = exports;
} else {
var edn = window.edn = {};
}
// Internal: Jison Parser constructor.
function Parser() {}
Parser.prototype = parser;
// Public: Parse edn String.
//
// str - edn String
// options -
// tags - Tag dispatch functions (default: edn.tags)
//
// Returns a value.
edn.parse = function (str, options) {
var parser = new Parser();
parser.yy.options = extendDefaultOptions(options);
return parser.parse(str);
};
// Public: Registered printer functions.
//
// Maps key type names to a stringify function.
//
// Examples
//
// edn.types['myapp/Person'] = function (person) {
// return '#myapp/Person {:name "'+person.name'"}';
// }
//
edn.printers = {};
// Public: Convert Object to edn String.
//
// obj - Object
// options -
// printers - Printer functions (default: edn.printers)
// converters - Conversion functions (default: edn.converters)
// types - Type checker functions (default: edn.types)
//
// Returns edn String.
edn.stringify = function (obj, options) {
options = extendDefaultOptions(options);
if (obj && obj.toEDN) {
return obj.toEDN();
}
obj = edn.convert(obj, options);
var type = edn.typeOf(obj, options);
if (type) {
var printer = options.printers[type];
if (printer) {
return printer(obj);
} else {
throw new Error("No printer function for type " + type);
}
} else {
throw new Error("No printer function for object " + obj);
}
};
edn.values = {};
// Public: Attempts to get primitive value of edn value.
//
// The returned value will be lossy. For an example, lists and vectors
// will be unwrapped into plain old Arrays making it impossible to
// know the original type.
//
// obj - edn Object
// deep - Recursive (default: true)
// options -
// values - valueOf functions (default: edn.values)
//
// Returns value.
edn.valueOf = function (obj, deep, options) {
if (deep == void 0) deep = true;
options = extendDefaultOptions(options);
function valueOf(obj) {
var type = edn.typeOf(obj, options);
if (type) {
var f = options.values[type];
return f ? f(obj, deep, valueOf) : obj;
} else {
return obj;
}
}
return valueOf(obj);
};
// Public: Registered equality functions.
//
// Maps key type names to a isEqual function.
//
// Examples
//
// edn.equal['myapp/Person'] = function (a, b) {
// return a.name == b.name;
// }
//
edn.equal = {};
// Public: Deep compare edn values.
//
// In general, two values will be equal if they serialize to the same
// edn string. With the expection of maps and sets which may serialize
// in a different order but are still collections of the same values.
//
// a - An edn value
// b - Another edn value
// options -
// equal - isEqual compare functions (default: edn.equal)
// converters - Conversion functions (default: edn.converters)
// types - Type checker functions (default: edn.types)
//
// Returns true if values are equal, otherwise false.
edn.isEqual = function (a, b, options) {
options = extendDefaultOptions(options);
function isEqual(a, b) {
a = edn.convert(a, options);
b = edn.convert(b, options);
var aType = edn.typeOf(a, options);
var bType = edn.typeOf(b, options);
var eq = options.equal[aType];
if (a === b) {
return true;
} else if (aType !== bType) {
return false;
} else if (eq) {
return eq(a, b, isEqual);
} else {
throw new Error("No equal function for type " + aType);
}
}
return isEqual(a, b);
};
// Internal: Registered object converter functions.
//
// Maps key type names to a function that returns an
// edn built-in object.
//
// Examples
//
// edn.converters['myapp/Person'] = function (person) {
// return edn.generic('myapp/Person', {name: person.name});
// }
//
edn.converters = {};
// Internal: Attempt to convert object to EDN value.
//
// obj - Object
// options -
// converters - Conversion functions (default: edn.converters)
// types - Type checker functions (default: edn.types)
//
// Returns EDN value.
edn.convert = function (obj, options) {
options = extendDefaultOptions(options);
if (obj && obj.asEDN) {
return obj.asEDN();
} else {
var type = edn.typeOf(obj, options);
if (type) {
var f = options.converters[type];
return f ? f(obj) : obj;
} else {
throw new Error("No type for object " + obj);
}
}
};
// Public: Registered type checking functions.
//
// Maps key type names to type checking function.
//
// Examples
//
// edn.types['myapp/Person'] = function (obj) {
// return obj instanceof Person;
// }
//
edn.types = {};
// Internal: Get object type String.
//
// Used internally for looking up printers and tag converters.
//
// obj - Object to detect type of
// options -
// types - Type checker functions (default: edn.types)
//
// Returns type String or null;
edn.typeOf = function (obj, options) {
options = extendDefaultOptions(options);
var matchedTypes = [];
for (var type in options.types) {
if (options.types[type](obj)) {
matchedTypes.push(type);
}
}
if (matchedTypes.length == 1) {
return matchedTypes[0];
} else if (matchedTypes.length > 1) {
throw new Error(
"Conflicted types " + matchedTypes.join(', ') + " for object " + obj);
} else {
return null;
}
};
// Internal: Merge user options with defaults.
//
// options - User options Object
//
// Returns new options Object.
function extendDefaultOptions(options) {
// Recursive optimization if defaults have already been
// merged with user options.
if (options && options._defaults) {
return options;
}
var obj = {
_defaults: true,
types: Object.create(edn.types),
converters: Object.create(edn.converters),
values: Object.create(edn.values),
equal: Object.create(edn.equal),
printers: Object.create(edn.printers),
tags: Object.create(edn.tags)
};
if (options) {
extend(obj.types, options.types);
extend(obj.converters, options.converters);
extend(obj.values, options.values);
extend(obj.equal, options.equal);
extend(obj.printers, options.printers);
extend(obj.tags, options.tags);
}
return obj;
}
// Internal: Copy object properties onto target object.
//
// target - Target Object
// source - Source Object to copy from
//
// Returns nothing.
function extend(target, source) {
var k;
for (k in source)
target[k] = source[k];
}
// Internal: Compare valueOf objects.
//
// a - Object
// b - Object
//
// Returns true if values are equal, otherwise false.
function compareValues(a, b) {
return a.valueOf() == b.valueOf();
}
// Internal: Compare Array objects.
//
// a - Array
// b - Array
// isEqual - isEqual function
//
// Returns true if all collection values are equal.
function compareArrayValues(a, b, isEqual) {
var aLen = a.length;
var bLen = b.length;
if (aLen != bLen) {
return false;
}
for (var i = 0; i < aLen; i++) {
if (!isEqual(a[i], b[i])) {
return false;
}
}
return true;
}
// Internal: Invoke object's valueOf function.
//
// obj - Object
//
// Return value.
function valueOf(obj) {
return obj.valueOf();
}
// Make Object#toString available
var toString = Object.prototype.toString;
// Built-in Elements
//
// nil
//
// nil represents nil, null or nothing. It should be read as an object
// with similar meaning on the target platform.
(function () {
// Public: Register typeof check for null.
//
// obj - Any value
//
// Returns true if object is null, otherwise false.
edn.types.nil = function (obj) {
return obj === null;
};
// Public: Stringify nil.
//
// Returns String.
edn.printers.nil = function () {
return "nil";
};
// Public: Compare nil values.
//
// a - nil value
// b - nil value
//
// Always returns true since two nil types are always equal.
edn.equal.nil = function (a, b) {
return true;
};
// Public: Register typeof check for undefined.
//
// obj - Any value
//
// Returns true if object is undefined, otherwise false.
edn.types.undefined = function (obj) {
return obj === void 0;
};
// Public: Convert undefined to null.
//
// Returns null.
edn.converters.undefined = function () {
return null;
};
})();
// Booleans
//
// true and false should be mapped to booleans.
//
// If a platform has canonic values for true and false, it is a
// further semantic of booleans that all instances of true yield that
// (identical) value, and similarly for false.
(function () {
// Public: Register typeof check for boolean.
//
// obj - Any value
//
// Returns true if object is a boolean, otherwise false.
edn.types.boolean = function (obj) {
return toString.call(obj) === '[object Boolean]';
};
// Public: Stringify boolean.
//
// Returns String.
edn.printers.boolean = function (bool) {
return bool.valueOf() ? "true" : "false";
};
// Public: Compare boolean values.
//
// a - boolean value
// b - boolean value
//
// Returns true if values are equal.
edn.equal.boolean = compareValues;
})();
// Strings
//
// Strings are enclosed in "double quotes". May span multiple lines.
// Standard C/Java escape characters \t \r \n are supported.
(function () {
// Public: Register typeof check for string.
//
// obj - Any value
//
// Returns true if object is a string, otherwise false.
edn.types.string = function (obj) {
return toString.call(obj) === '[object String]';
};
// Public: Stringify string.
//
// Returns String.
edn.printers.string = function (str) {
return JSON.stringify(str);
};
// Public: Compare string values.
//
// a - string value
// b - string value
//
// Returns true if values are equal.
edn.equal.string = compareValues;
})();
// Characters
//
// Characters are preceded by a backslash: \c. \newline, \return,
// \space and \tab yield the corresponding characters. Backslash
// cannot be followed by whitespace.
edn.Character = (function () {
var pool = {};
// Public: Create a new Character object.
//
// Calling the Character function returns an interned Character. The
// constructor always returns a new object. The function call is the
// prefered api.
function Character(c) {
// If called as function, try to pull an existing interned character
// from the pool
if (!(this instanceof Character)) {
var char = pool[c];
if (!char) {
char = new Character(c);
Object.freeze(char);
pool[c] = char;
}
return char;
}
// Internal: Returns the String character.
this.char = c;
}
// Public: Get the primitive string value.
//
// Returns String.
Character.prototype.valueOf = function () {
return this.char;
};
// Public: String representation of the Character.
//
// Returns String.
Character.prototype.toString = function () {
return this.char;
};
// Internal: Node.js console.log inspect printer.
//
// Returns String.
Character.prototype.inspect = function () {
return "[edn.Character " + require('util').inspect(this.char) + "]";
};
// Public: Register typeof check for Character.
//
// obj - Any value
//
// Returns true if object is a Character, otherwise false.
edn.types.character = function (obj) {
return obj instanceof Character;
};
// Public: Stringify Character object.
//
// char - Character object
//
// Returns String.
edn.printers.character = function (char) {
char = char.valueOf();
switch (char) {
case "\n":
return "\\newline";
case "\r":
return "\\return";
case " ":
return "\\space";
case "\t":
return "\\tab";
default:
return "\\" + char[0];
}
};
// Public: Get valueOf returns primitive string.
edn.values.character = valueOf;
// Public: Compare character values.
edn.equal.character = compareValues;
// Public: Alias for Character function.
edn.character = Character;
// Expose Character to parser
parser.yy.Character = Character;
return Character;
})();
// Symbols
//
// Symbols are used to represent identifiers, and should map to
// something other than strings, if possible.
//
// Symbols begin with a non-numeric character and can contain
// alphanumeric characters and . * + ! - _ ? $ % & =. If -, + or . are
// the first character, the second character must be non-numeric.
// Additionally, : # are allowed as constituent characters in symbols
// other than as the first character.
//
// / has special meaning in symbols. It can be used once only in the
// middle of a symbol to separate the prefix (often a namespace) from
// the name, e.g. my-namespace/foo. / by itself is a legal symbol, but
// otherwise neither the prefix nor the name part can be empty when
// the symbol contains /.
//
// If a symbol has a prefix and /, the following name component should
// follow the first-character restrictions for symbols as a whole.
// This is to avoid ambiguity in reading contexts where prefixes might
// be presumed as implicitly included namespaces and elided
// thereafter.
edn.Symbol = (function () {
var pool = {};
// Public: Create a new Symbol object.
//
// Calling the Symbol function returns an interned Symbol. The
// constructor always returns a new object. The function call is the
// prefered api.
//
// nsname - String with "/" seperating the name and namespace
//
// or
//
// namespace - String namespace
// name - String name
function Symbol(namespace, name) {
// If called as function, try to pull an existing interned symbol
// from the pool
if (!(this instanceof Symbol)) {
var nsname = joinNamespace(namespace, name);
var sym = pool[nsname];
if (!sym) {
sym = new Symbol(namespace, name);
// Interned symbols are immutable
Object.freeze(sym);
pool[sym.valueOf()] = sym;
}
return sym;
}
var parts = splitNamespacedName(namespace, name);
// Public: Returns the String namespace.
this.namespace = parts[0];
// Public: Returns the String name.
this.name = parts[1];
}
// Internal: Return seperated namespace and name.
//
// nsname - String with "/" seperating the name and namespace
//
// or
//
// namespace - String namespace
// name - String name
//
// Returns Array pair with {0:namespace, 1:name}.
function splitNamespacedName(namespace, name) {
if (namespace && name) {
return [namespace, name];
} else {
var parts = namespace.split('/', 2);
if (namespace == '/') {
return [null, '/'];
} else if (parts.length == 2) {
return parts;
} else {
return [null, parts[0]];
}
}
}
// Internal: Join namespace and name.
//
// nsname - String with "/" seperating the name and namespace
//
// or
//
// namespace - String namespace
// name - String name
//
// Returns joined String.
function joinNamespace(namespace, name) {
if (namespace && name) {
return [namespace, name].join('/');
} else {
return namespace;
}
}
// Public: Get the primitive string value.
//
// Returns String.
Symbol.prototype.valueOf = function () {
if (this.namespace) {
return [this.namespace, this.name].join('/');
} else {
return this.name;
}
};
// Public: String representation of the Symbol.
//
// Returns String.
Symbol.prototype.toString = function () {
return this.valueOf();
};
// Internal: Node.js console.log inspect printer.
//
// Returns String.
Symbol.prototype.inspect = function () {
return "[edn.Symbol " + this.toString() + "]";
};
// Public: Register typeof check for Symbol.
//
// obj - Any value
//
// Returns true if object is a Symbol, otherwise false.
edn.types.symbol = function (obj) {
return obj instanceof Symbol;
};
// Public: Stringify Symbol object.
//
// symbol - Symbol object
//
// Returns String.
edn.printers.symbol = function (symbol) {
return symbol.toString();
};
// Public: Get valueOf returns primitive string.
edn.values.symbol = valueOf;
// Public: Compare symbol values.
//
// a - symbol value
// b - symbol value
//
// Returns true if values are equal.
edn.equal.symbol = compareValues;
// Public: Alias for Symbol function.
edn.symbol = Symbol;
// Expose Symbol to parser
parser.yy.Symbol = Symbol;
return Symbol;
})();
// Keywords
//
// Keywords are identifiers that typically designate themselves. They
// are semantically akin to enumeration values. Keywords follow the
// rules of symbols, except they can (and must) begin with a colon,
// e.g. :fred or :my/fred. If the target platform does not have a
// keyword type distinct from a symbol type, the same type can be used
// without conflict, since the mandatory leading : of keywords is
// disallowed for symbols.
//
// If the target platform supports some notion of interning, it is a
// further semantic of keywords that all instances of the same keyword
// yield the identical object.
edn.Keyword = (function () {
var pool = {};
// Public: Create a new Keyword object.
//
// Calling the Keyword function returns an interned Keyword. The
// constructor always returns a new object. The function call is the
// prefered api.
//
// nsname - String with "/" seperating the name and namespace
//
// or
//
// namespace - String namespace
// name - String name
//
// or
//
// symbol - edn.Symbol
function Keyword(namespace, name) {
// Get internal symbol for keyword nsname
var sym;
if (namespace instanceof edn.Symbol) {
sym = namespace;
} else {
sym = edn.Symbol(namespace, name);
}
// If called as function, try to pull an existing interned keyword
// from the pool
if (!(this instanceof Keyword)) {
var key = pool[sym.valueOf()];
if (!key) {
key = new Keyword(namespace, name);
// Interned keywords are immutable
Object.freeze(key);
pool[sym.valueOf()] = key;
}
return key;
}
// Internal: Returns internal Symbol.
this.symbol = sym;
// Public: Returns the String namespace.
this.namespace = sym.namespace;
// Public: Returns the String name.
this.name = sym.name;
}
// Public: Get the primitive string value.
//
// Returns String.
Keyword.prototype.valueOf = function () {
return this.symbol.valueOf();
};
// Public: String representation of the Keyword.
//
// Returns String.
Keyword.prototype.toString = function () {
return ":" + this.symbol.toString();
};
// Internal: Node.js console.log inspect printer.
//
// Returns String.
Keyword.prototype.inspect = function () {
return "[edn.Keyword " + this.toString() + "]";
};
// Public: Register typeof check for Keyword.
//
// obj - Any value
//
// Returns true if object is a Keyword, otherwise false.
edn.types.keyword = function (obj) {
return obj instanceof Keyword;
};
// Public: Stringify Keyword object.
//
// keyword - Keyword object
//
// Returns String.
edn.printers.keyword = function (keyword) {
return keyword.toString();
};
// Public: Get valueOf returns primitive string.
edn.values.keyword = valueOf;
// Public: Compare keyword values.
//
// a - keyword value
// b - keyword value
//
// Returns true if values are equal.
edn.equal.keyword = compareValues;
// Public: Alias for Keyword function.
edn.keyword = Keyword;
// Expose Keyword to parser
parser.yy.Keyword = Keyword;
return Keyword;
})();
// Integers
//
// Integers consist of the digits 0 - 9, optionally prefixed by - to
// indicate a negative number, or (redundantly) by +. An integer can
// have the suffix N to indicate that arbitrary precision is desired.
// -0 is a valid integer not distinct from 0.
(function () {
// Public: Tag Number as a integer type.
//
// n - Number
//
// Returns new Number.
edn.integer = function (n) {
// Skip tagging integers
// n = Object(n);
// n.type = 'integer';
return n;
};
// Expose Integer to parser
parser.yy.Integer = edn.integer;
// Public: Register typeof check for Integer.
//
// obj - Any value
//
// Returns true if object is a Integer, otherwise false.
edn.types.integer = function (obj) {
if (obj && obj.type) {
return obj.type == 'integer';
} else {
return (toString.call(obj) === '[object Number]') &&
Math.floor(obj) == obj;
}
};
// Public: Stringify Integer object.
//
// n - Number object
//
// Returns String.
edn.printers.integer = function (n) {
return n.toString();
};
// Public: Get valueOf returns primitive number.
edn.values.integer = valueOf;
// Public: Compare integer values.
//
// a - integer value
// b - integer value
//
// Returns true if values are equal.
edn.equal.integer = compareValues;
})();
// Floating point numbers
//
// 64-bit (double) precision is expected.
//
// In addition, a floating-point number may have the suffix M to
// indicate that exact precision is desired.
(function () {
// Public: Tag Number as a float type.
//
// n - Number
//
// Returns new Number.
edn.float = function (n) {
n = Object(n);
n.type = 'float';
return n;
};
// Expose Integer to parser
parser.yy.Float = edn.float;
// Public: Register typeof check for Float.
//
// obj - Any value
//
// Returns true if object is a Float, otherwise false.
edn.types.float = function (obj) {
if (obj && obj.type) {
return obj.type == 'float';
} else {
return (toString.call(obj) === '[object Number]') &&
Math.floor(obj) != obj;
}
};
// Public: Stringify Float object.
//
// n - Number object
//
// Returns String.
edn.printers.float = function (n) {
var s = n.toString();
if (!/\./.test(s)) s += ".0";
return s;
};
// Public: Get valueOf returns primitive number.
edn.values.float = valueOf;
// Public: Compare float values.
//
// a - float value
// b - float value
//
// Returns true if values are equal.
edn.equal.float = compareValues;
})();
// Lists
//
// A list is a sequence of values. Lists are represented by zero or
// more elements enclosed in parentheses (). Note that lists can be
// heterogeneous.
//
// (a b 42)
(function () {
// Public: Tag Array as a List type.
//
// ary - Array
//
// Returns new List Array.
edn.list = function (ary) {
ary = ary.slice(0);
ary.type = 'list';
return ary;
};
// Expose List to parser
parser.yy.List = edn.list;
// Public: Register typeof check for List.
//
// obj - Any value
//
// Returns true if object is a List, otherwise false.
edn.types.list = function (obj) {
return toString.call(obj) === '[object Array]' &&
obj.type === 'list';
};
// Public: Stringify Array/List object.
//
// ary - Array object
//
// Returns String.
edn.printers.list = function (ary) {
return '(' + ary.map(edn.stringify).join(' ') + ')';
};
// Public: Get valueOf returns primitive array.
edn.values.list = function (ary, deep, valueOf) {
if (deep) {
return ary.map(valueOf);
} else {
return ary.slice(0);
}
};
// Public: Compare list collections.
//
// a - list value
// b - list value
//
// Returns true collection of values is equal.
edn.equal.list = compareArrayValues;
})();
// Vectors
//
// A vector is a sequence of values that supports random access.
// Vectors are represented by zero or more elements enclosed in square
// brackets []. Note that vectors can be heterogeneous.
//
// [a b 42]
(function () {
// Public: Tag Array as a Vector type.
//
// ary - Array
//
// Returns new Vector Array.
edn.vector = function (ary) {
ary = ary.slice(0);
ary.type = 'vector';
return ary;
};
// Expose Vector to parser
parser.yy.Vector = edn.vector;
// Public: Register typeof check for Vector.
//
// obj - Any value
//
// Returns true if object is a Vector, otherwise false.
edn.types.vector = function (obj) {
return toString.call(obj) === '[object Array]' &&
obj.type === 'vector';
};
// Public: Stringify Vector object.
//
// ary - Array object
//
// Returns String.
edn.printers.vector = function (ary) {
return '[' + ary.map(edn.stringify).join(' ') + ']';
};
// Public: Get valueOf returns primitive array.
edn.values.vector = function (ary, deep, valueOf) {
if (deep) {
return ary.map(valueOf);
} else {
return ary.slice(0);
}
};
// Public: Compare vector collections.
//
// a - vector value
// b - vector value
//
// Returns true collection of values is equal.
edn.equal.vector = compareArrayValues;
// Public: Register typeof check for Array.
//
// obj - Any value
//
// Returns true if object is a Array, otherwise false.
edn.types.array = function (obj) {
return toString.call(obj) === '[object Array]' &&
typeof obj.type == 'undefined';
};
// Public: Convert Array to Vector object.
//
// ary - Array object
//
// Returns Vector object.
edn.converters.array = function (ary) {
return edn.vector(ary);
};
})();
// Maps
//
// A map is a collection of associations between keys and values. Maps
// are represented by zero or more key and value pairs enclosed in
// curly braces {}. Each key should appear at most once. No semantics
// should be associated with the order in which the pairs appear.
//
// {:a 1, "foo" :bar, [1 2 3] four}
//
// Note that keys and values can be elements of any type. The use of
// commas above is optional, as they are parsed as whitespace.
if (false && typeof Map !== 'undefined') {
edn.Map = Map;
} else {
// Backport Harmony Map
// http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets
//
// Though, its disabled until Map supports iteration. Yeah, wtf.
// Guess we'll need to wait till we have Harmony iterators.
edn.Map = (function () {
// Public: Create a new Map object.
function Map() {
if (!(this instanceof Map)) {
return new Map();
}
// Internal: Returns Array of keys.
// API not finalized. May change in a minor release.
Object.defineProperty(this, 'keys', {
configurable: false,
enumerable: false,
writable: false,
value: []
});
// Internal: Returns Array of values.
// API not finalized. May change in a minor release.
Object.defineProperty(this, 'values', {
configurable: false,
enumerable: false,
writable: false,
value: []
});
// Internal: Returns Array of [key, value] pairs.
// API not finalized. May change in a minor release.
Object.defineProperty(this, 'items', {
configurable: false,
enumerable: false,
writable: false,
value: []
});
// Internal: Hack to expose and enumerable property to play
// nice with node's deepEqual function. Maybe some day it will
// eventually support comparing Maps.
Object.defineProperty(this, '_map', {
enumerable: true,
get: function () {
var obj = {};
this.items.forEach(function (item) {
obj[edn.stringify(item[0])] = item[1];
});
return obj;
}
});
}
// Internal: Check if two objects are egal.
//
// http://wiki.ecmascript.org/doku.php?id=harmony:egal
//
// Returns true or false.
var objectIs;
if (Object.is) {
objectIs = Object.is;
} else {
objectIs = function (x, y) {
if (x === y) {
if (x === 0) {
return 1 / x === 1 / y;
} else {
return true;
}
}
return x !== x && y !== y;
};
}
// Internal: Find index of value in Array.
//
// Similar to Array.prototype.indexOf, but uses Object.is.
//
// http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets
//
// keys - Array of keys to search.
// key - Object key to search for.
//
// Return Number index of value in Array. Otherwise returns -1 key
// is not keys Array.
function indexOfIdentical(keys, key) {
for (var i = 0, length = keys.length; i < length; i++) {
if (objectIs(keys[i], key)) {
return i;
}
}
return -1;
}
// Public: Find associated value for key in the map.
//
// key - Object
//
// Returns the value associated to the key. Or "undefined" if
// there is none.
Map.prototype.get = function (key) {
var index = indexOfIdentical(this.keys, key);
return index < 0 ? undefined : this.values[index];
};
// Public: Check if key is associated to a value in the map.
//
// key - Object
//
// Returns true if value has been associated to the key in the
// map. Otherwise returns false.
Map.prototype.has = function (key) {
return indexOfIdentical(this.keys, key) >= 0;
};
// Public: Associated the value for a key in the map.
//
// key - Object
// value - Object
//
// Returns the value argument.
Map.prototype.set = function (key, value) {
var keys = this.keys;
var values = this.values;
var items = this.items;
var _map = this._map;
var index = indexOfIdentical(keys, key);
if (index < 0) index = keys.length;
keys[index] = key;
values[index] = value;
items[index] = [key, value];
return value;
};
// Public: Removes the key and value from the map.
//
// key - Object
//
// Returns true if key was removed. Returns false if key did not
// exist in map.
Map.prototype['delete'] = function (key) {
var keys = this.keys;
var values = this.values;
var items = this.items;
var _map = this._map;
var index = indexOfIdentical(keys, key);
if (index < 0) return false;
keys.splice(index, 1);
values.splice(index, 1);
items.splice(index, 1);
return true;
};
// Public: String representation of the Map.
//
// Returns String.
Map.prototype.toString = function () {
return '[object Map]';
};
// Internal: Node.js console.log inspect printer.
//
// Returns String.
Map.prototype.inspect = function () {
return "[edn.Map " + require('util').inspect(this.items) + "]";
};
return Map;
})();
}
(function () {
// Public: Convert flat Array of key and values to Map.
//
// values - Array of [k1, v1, k2, v2, ...]
//
// Returns new Map.
edn.map = function (values) {
var map = new edn.Map();
for (var i = 0; i < values.length; i += 2) {
map.set(values[i], values[i + 1]);
}
return map;
};
// Expose Map to parser
parser.yy.Map = edn.map;
// Public: Register typeof check for Map.
//
// obj - Any value
//
// Returns true if object is a Map, otherwise false.
edn.types.map = function (obj) {
return obj instanceof edn.Map;
};
// Public: Stringify Map object.
//
// map - Map object
//
// Returns String.
edn.printers.map = function (map) {
var m = map.items.map(function (item) {
return edn.stringify(item[0]) + " " + edn.stringify(item[1]);
});
return "{" + m.join(", ") + "}";
};
// Public: Get valueOf returns primitive array.
edn.values.map = function (map, deep, valueOf) {
var safe = map.keys.every(function (key) {
return typeof valueOf(key) != 'object';
});
if (safe) {
var obj = {};
map.items.forEach(function (item) {
var value = item[1];
if (deep) value = valueOf(value);
obj[valueOf(item[0])] = value;
});
return obj;
}
return map;
};
// Public: Compare map collections.
//
// a - map value
// b - map value
// isEqual - isEqual function
//
// Returns true collection of values is equal.
edn.equal.map = function (a, b, isEqual) {
var aItems = a.items;
var bItems = b.items;
if (aItems.length != bItems.length) {
return false;
}
return aItems.every(function (aItem) {
var bItem = bItems.filter(function (bItem) {
return isEqual(aItem[0], bItem[0]);
})[0];
if (bItem) {
return isEqual(aItem[1], bItem[1]);
} else {
return false;
}
});
};
// Public: Register type of check for plain Object.
//
// obj - Any value
//
// Returns true if object is a direct prototype of Object,
// otherwise false.
edn.types.object = function (obj) {
return obj && (typeof obj === 'object') &&
(Object.getPrototypeOf(obj) === Object.prototype);
};
// Public: Convert Object to and EDN map.
//
// obj - Plain Object
//
// Returns a Map object.
edn.converters.object = function (obj) {
var map = new edn.Map();
Object.keys(obj).forEach(function (key) {
map.set(edn.keyword(key), obj[key]);
});
return map;
};
})();
// Sets
//
// A set is a collection of unique values. Sets are represented by
// zero or more elements enclosed in curly braces preceded by # #{}.
// No semantics should be associated with the order in which the
// elements appear. Note that sets can be heterogeneous.
//
// #{a b [1 2 3]}
//
if (false && typeof Set !== 'undefined') {
edn.Set = Set;
} else {
// Backport Harmony Set
// http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets
//
// Disabled until Set supports iteration
edn.Set = (function () {
// Public: Create a new Set object.
function Set() {
if (!(this instanceof Set)) {
return new Set();
}
// Internal: Hack to expose and enumerable property to play
// nice with node's deepEqual function. Maybe some day it will
// eventually support comparing Sets and Maps.
Object.defineProperty(this, '_map', {
configurable: false,
enumerable: true,
writable: false,
value: new edn.Map()
});
// Internal: Returns Array of values.
// API not finalized. May change in a minor release.
Object.defineProperty(this, 'values', {
configurable: false,
enumerable: false,
get: function () { return this._map.keys; }
});
}
// Public: Check if value is in set.
//
// value - Object
//
// Returns true if value exists in the set. Otherwise returns
// false.
Set.prototype.has = function (value) {
return this._map.has(value);
};
// Public: Add the value to the set.
//
// value - Object
//
// Returns 'undefined';
Set.prototype.add = function (value) {
this._map.set(value, true);
return 'undefined';
};
// Public: Removes the value from the set.
//
// value - Object
//
// Returns 'undefined';
Set.prototype['delete'] = function (value) {
this._map['delete'](value);
return 'undefined';
};
// Public: String representation of the Set.
//
// Returns String.
Set.prototype.toString = function () {
return '[object Set]';
};
// Internal: Node.js console.log inspect printer.
//
// Returns String.
Set.prototype.inspect = function () {
return "[edn.Set " + require('util').inspect(this.values) + "]";
};
return Set;
})();
}
(function () {
// Public: Convert Array to Set.
//
// values - Array of values
//
// Returns new Set.
edn.set = function (values) {
var set = new edn.Set();
if (values) {
values.forEach(function (v) {
set.add(v);
});
}
return set;
};
// Expose Set to parser
parser.yy.Set = edn.set;
// Public: Register typeof check for Set.
//
// obj - Any value
//
// Returns true if object is a Set, otherwise false.
edn.types.set = function (obj) {
return obj instanceof edn.Set;
};
// Public: Stringify Set object.
//
// set - Set object
//
// Returns String.
edn.printers.set = function (set) {
return "#{" + set.values.map(edn.stringify).join(" ") + "}";
};
// Public: Get valueOf returns primitive array.
edn.values.set = function (set, deep, valueOf) {
if (deep) {
return set.values.map(valueOf);
} else {
return set.values.slice(0);
}
};
// Public: Compare set collections.
//
// a - set value
// b - set value
// isEqual - isEqual function
//
// Returns true collection of values is equal.
edn.equal.set = function (a, b, isEqual) {
var aValues = a.values;
var bValues = b.values;
if (aValues.length != bValues.length) {
return false;
}
return aValues.every(function (aValue) {
return bValues.some(function (bValue) {
return isEqual(aValue, bValue);
});
});
};
})();
// Tagged Elements
//
// edn supports extensibility through a simple mechanism. # followed
// immediately by a symbol starting with an alphabetic character
// indicates that that symbol is a tag. A tag indicates the semantic
// interpretation of the following element. It is envisioned that a
// reader implementation will allow clients to register handlers for
// specific tags. Upon encountering a tag, the reader will first read
// the next element, then pass the result to the corresponding handler
// for further interpretation, and the result of the handler will be
// the data value yielded by the tag + tagged element, i.e. reading a
// tag and tagged element yields one value. This value is the value to
// be returned to the program and is not further interpreted as edn
// data by the reader.
edn.tags = {};
// Public: Dispatch tag and tagged element.
//
// If a handler is registered for the tag, it will be invoked with the
// element returning a new value.
//
// Otherwise, the default handler will be invoked which will return an
// Generic object wrapper. If `edn.tags.default` is set to null, an
// error will be throw instead.
//
// Returns a value or raises an error if theres no tag handler.
edn.dispatchTag = function (tag, element, options) {
options = extendDefaultOptions(options);
var f = options.tags[tag];
if (f) {
return f(element);
} else if (options.tags.default) {
return options.tags.default(tag, element);
} else {
throw new Error("No reader function for tag " + tag);
}
};
// Expose tag to parser
parser.yy.Tag = edn.dispatchTag;
edn.Generic = (function () {
// Public: Create a new Generic object.
//
// tag - Symbol tag
// element - Any value
function Generic(tag, element) {
if (!(this instanceof Generic)) {
return new Generic(tag, element);
}
if (!(tag instanceof edn.Symbol)) {
tag = edn.Symbol(tag);
}
// Public: Returns the Symbol tag
this.tag = tag;
// Public: Returns the element value
this.element = element;
Object.freeze(this);
}
// Public: Get primitive string value.
//
// Returns String.
Generic.prototype.valueOf = function () {
return this.element;
};
// Public: String representation of the UUID.
//
// Returns String.
Generic.prototype.toString = function () {
return '[object Generic]';
};
// Internal: Node.js console.log inspect printer.
//
// Returns String.
Generic.prototype.inspect = function () {
return "[edn.Generic " + this.tag + " " +
require('util').inspect(this.element) + "]";
};
// Public: Register typeof check for Generic.
//
// obj - Any value
//
// Returns true if object is a Generic, otherwise false.
edn.types.generic = function (obj) {
return obj instanceof Generic;
};
// Public: Stringify Generic object.
//
// obj - Generic object
//
// Returns String.
edn.printers.generic = function (obj) {
return "#" + obj.tag + " " + edn.stringify(obj.element);
};
// Public: Get valueOf returns primitive array.
edn.values.generic = function (obj, deep, valueOf) {
return valueOf(obj.element);
};
// Public: Compare generic value.
//
// a - generic value
// b - generic value
// isEqual - isEqual function
//
// Returns true if tag and elements are equal.
edn.equal.generic = function (a, b, isEqual) {
return isEqual(a.tag, b.tag) && isEqual(a.element, b.element);
};
// Public: Register default handler for generic tags.
//
// tag - Symbol tag
// element - Any value
edn.tags.default = Generic;
// Public: Alias for Generic function.
edn.generic = Generic;
return Generic;
})();
// Built-in Tagged Elements
//
// Date built-in tagged element
//
// #inst "rfc-3339-format"
// #inst "1985-04-12T23:20:50.52Z"
//
// An instant in time. The tagged element is a string in RFC-3339 format.
(function () {
// Public: Convert 'inst' tag to Date object.
//
// str - ISO Date String
//
// Returns Date object.
edn.tags.inst = function (str) {
return new Date(Date.parse(str));
};
// Public: Register typeof check for Date.
//
// obj - Any value
//
// Returns true if object is a Date, otherwise false.
edn.types.inst = function (obj) {
return obj instanceof Date;
};
// Public: Convert Date to and EDN value.
//
// date - Date object
//
// Returns an Generic object.
edn.converters.inst = function (date) {
return edn.generic('inst', date.toISOString());
};
})();
// UUID built-in tagged element
//
// #uuid "f81d4fae-7dec-11d0-a765-00a0c91e6bf6"
//
// A UUID. The tagged element is a canonical UUID string representation.
edn.UUID = (function () {
// Public: Create a new UUID object.
//
// value - String value.
function UUID(value) {
if (!(this instanceof UUID)) {
return new UUID(value);
}
// Internal: Returns the String value.
this.value = value;
// Public: Returns the Number length of the value String.
Object.defineProperty(this, 'length', {
enumerable: false,
value: value.length
});
Object.freeze(this);
}
// Public: Get primitive string value.
//
// Returns String.
UUID.prototype.valueOf = function () {
return this.value;
};
// Public: String representation of the UUID.
//
// Returns String.
UUID.prototype.toString = function () {
return this.value;
};
// Internal: Node.js console.log inspect printer.
//
// Returns String.
UUID.prototype.inspect = function () {
return "[edn.UUID " + this.value + "]";
};
// Public: Convert 'uuid' tag to UUID object.
//
// str - String
//
// Returns UUID object.
edn.tags.uuid = function (str) {
return new UUID(str);
};
// Public: Register typeof check for UUID.
//
// obj - Any value
//
// Returns true if object is a UUID, otherwise false.
edn.types.uuid = function (obj) {
return obj instanceof UUID;
};
// Public: Convert UUID to and EDN value.
//
// uuid - UUID object
//
// Returns an Generic object.
edn.converters.uuid = function (uuid) {
return edn.generic('uuid', uuid.value);
};
// Public: Alias for UUID function.
edn.uuid = UUID;
return UUID;
})();
})();
