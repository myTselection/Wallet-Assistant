var go=Object.create;var Nn=Object.defineProperty;var po=Object.getOwnPropertyDescriptor;var vo=Object.getOwnPropertyNames;var _o=Object.getPrototypeOf,yo=Object.prototype.hasOwnProperty;var l=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var mo=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of vo(e))!yo.call(t,i)&&i!==n&&Nn(t,i,{get:()=>e[i],enumerable:!(r=po(e,i))||r.enumerable});return t};var jn=(t,e,n)=>(n=t!=null?go(_o(t)):{},mo(e||!t||!t.__esModule?Nn(n,"default",{value:t,enumerable:!0}):n,t));var zn=l((nd,Un)=>{Un.exports=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}});var z=l(K=>{var ct,wo=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];K.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};K.getSymbolTotalCodewords=function(e){return wo[e]};K.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e};K.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');ct=e};K.isKanjiModeEnabled=function(){return typeof ct<"u"};K.toSJIS=function(e){return ct(e)}});var De=l(M=>{M.L={bit:1};M.M={bit:0};M.Q={bit:3};M.H={bit:2};function Eo(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return M.L;case"m":case"medium":return M.M;case"q":case"quartile":return M.Q;case"h":case"high":return M.H;default:throw new Error("Unknown EC Level: "+t)}}M.isValid=function(e){return e&&typeof e.bit<"u"&&e.bit>=0&&e.bit<4};M.from=function(e,n){if(M.isValid(e))return e;try{return Eo(e)}catch{return n}}});var Hn=l((od,Gn)=>{function Fn(){this.buffer=[],this.length=0}Fn.prototype={get:function(t){let e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let n=0;n<e;n++)this.putBit((t>>>e-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){let e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};Gn.exports=Fn});var Vn=l((ad,$n)=>{function ve(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}ve.prototype.set=function(t,e,n,r){let i=t*this.size+e;this.data[i]=n,r&&(this.reservedBit[i]=!0)};ve.prototype.get=function(t,e){return this.data[t*this.size+e]};ve.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n};ve.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};$n.exports=ve});var Xn=l(qe=>{var bo=z().getSymbolSize;qe.getRowColCoords=function(e){if(e===1)return[];let n=Math.floor(e/7)+2,r=bo(e),i=r===145?26:Math.ceil((r-13)/(2*n-2))*2,o=[r-7];for(let a=1;a<n-1;a++)o[a]=o[a-1]-i;return o.push(6),o.reverse()};qe.getPositions=function(e){let n=[],r=qe.getRowColCoords(e),i=r.length;for(let o=0;o<i;o++)for(let a=0;a<i;a++)o===0&&a===0||o===0&&a===i-1||o===i-1&&a===0||n.push([r[o],r[a]]);return n}});var Kn=l(Yn=>{var xo=z().getSymbolSize,Jn=7;Yn.getPositions=function(e){let n=xo(e);return[[0,0],[n-Jn,0],[0,n-Jn]]}});var Qn=l(_=>{_.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var Q={N1:3,N2:3,N3:40,N4:10};_.isValid=function(e){return e!=null&&e!==""&&!isNaN(e)&&e>=0&&e<=7};_.from=function(e){return _.isValid(e)?parseInt(e,10):void 0};_.getPenaltyN1=function(e){let n=e.size,r=0,i=0,o=0,a=null,u=null;for(let c=0;c<n;c++){i=o=0,a=u=null;for(let s=0;s<n;s++){let f=e.get(c,s);f===a?i++:(i>=5&&(r+=Q.N1+(i-5)),a=f,i=1),f=e.get(s,c),f===u?o++:(o>=5&&(r+=Q.N1+(o-5)),u=f,o=1)}i>=5&&(r+=Q.N1+(i-5)),o>=5&&(r+=Q.N1+(o-5))}return r};_.getPenaltyN2=function(e){let n=e.size,r=0;for(let i=0;i<n-1;i++)for(let o=0;o<n-1;o++){let a=e.get(i,o)+e.get(i,o+1)+e.get(i+1,o)+e.get(i+1,o+1);(a===4||a===0)&&r++}return r*Q.N2};_.getPenaltyN3=function(e){let n=e.size,r=0,i=0,o=0;for(let a=0;a<n;a++){i=o=0;for(let u=0;u<n;u++)i=i<<1&2047|e.get(a,u),u>=10&&(i===1488||i===93)&&r++,o=o<<1&2047|e.get(u,a),u>=10&&(o===1488||o===93)&&r++}return r*Q.N3};_.getPenaltyN4=function(e){let n=0,r=e.data.length;for(let o=0;o<r;o++)n+=e.data[o];return Math.abs(Math.ceil(n*100/r/5)-10)*Q.N4};function Oo(t,e,n){switch(t){case _.Patterns.PATTERN000:return(e+n)%2===0;case _.Patterns.PATTERN001:return e%2===0;case _.Patterns.PATTERN010:return n%3===0;case _.Patterns.PATTERN011:return(e+n)%3===0;case _.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2===0;case _.Patterns.PATTERN101:return e*n%2+e*n%3===0;case _.Patterns.PATTERN110:return(e*n%2+e*n%3)%2===0;case _.Patterns.PATTERN111:return(e*n%3+(e+n)%2)%2===0;default:throw new Error("bad maskPattern:"+t)}}_.applyMask=function(e,n){let r=n.size;for(let i=0;i<r;i++)for(let o=0;o<r;o++)n.isReserved(o,i)||n.xor(o,i,Oo(e,o,i))};_.getBestMask=function(e,n){let r=Object.keys(_.Patterns).length,i=0,o=1/0;for(let a=0;a<r;a++){n(a),_.applyMask(a,e);let u=_.getPenaltyN1(e)+_.getPenaltyN2(e)+_.getPenaltyN3(e)+_.getPenaltyN4(e);_.applyMask(a,e),u<o&&(o=u,i=a)}return i}});var st=l(lt=>{var F=De(),Ne=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],je=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];lt.getBlocksCount=function(e,n){switch(n){case F.L:return Ne[(e-1)*4+0];case F.M:return Ne[(e-1)*4+1];case F.Q:return Ne[(e-1)*4+2];case F.H:return Ne[(e-1)*4+3];default:return}};lt.getTotalCodewordsCount=function(e,n){switch(n){case F.L:return je[(e-1)*4+0];case F.M:return je[(e-1)*4+1];case F.Q:return je[(e-1)*4+2];case F.H:return je[(e-1)*4+3];default:return}}});var Wn=l(ze=>{var _e=new Uint8Array(512),Ue=new Uint8Array(256);(function(){let e=1;for(let n=0;n<255;n++)_e[n]=e,Ue[e]=n,e<<=1,e&256&&(e^=285);for(let n=255;n<512;n++)_e[n]=_e[n-255]})();ze.log=function(e){if(e<1)throw new Error("log("+e+")");return Ue[e]};ze.exp=function(e){return _e[e]};ze.mul=function(e,n){return e===0||n===0?0:_e[Ue[e]+Ue[n]]}});var Zn=l(ye=>{var ft=Wn();ye.mul=function(e,n){let r=new Uint8Array(e.length+n.length-1);for(let i=0;i<e.length;i++)for(let o=0;o<n.length;o++)r[i+o]^=ft.mul(e[i],n[o]);return r};ye.mod=function(e,n){let r=new Uint8Array(e);for(;r.length-n.length>=0;){let i=r[0];for(let a=0;a<n.length;a++)r[a]^=ft.mul(n[a],i);let o=0;for(;o<r.length&&r[o]===0;)o++;r=r.slice(o)}return r};ye.generateECPolynomial=function(e){let n=new Uint8Array([1]);for(let r=0;r<e;r++)n=ye.mul(n,new Uint8Array([1,ft.exp(r)]));return n}});var nr=l((hd,tr)=>{var er=Zn();function dt(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}dt.prototype.initialize=function(e){this.degree=e,this.genPoly=er.generateECPolynomial(this.degree)};dt.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");let n=new Uint8Array(e.length+this.degree);n.set(e);let r=er.mod(n,this.genPoly),i=this.degree-r.length;if(i>0){let o=new Uint8Array(this.degree);return o.set(r,i),o}return r};tr.exports=dt});var ht=l(rr=>{rr.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}});var gt=l(j=>{var ir="[0-9]+",So="[A-Z $%*+\\-./:]+",me="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";me=me.replace(/u/g,"\\u");var Co="(?:(?![A-Z0-9 $%*+\\-./:]|"+me+`)(?:.|[\r
]))+`;j.KANJI=new RegExp(me,"g");j.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");j.BYTE=new RegExp(Co,"g");j.NUMERIC=new RegExp(ir,"g");j.ALPHANUMERIC=new RegExp(So,"g");var Ao=new RegExp("^"+me+"$"),To=new RegExp("^"+ir+"$"),Ro=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");j.testKanji=function(e){return Ao.test(e)};j.testNumeric=function(e){return To.test(e)};j.testAlphanumeric=function(e){return Ro.test(e)}});var G=l(b=>{var Io=ht(),pt=gt();b.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]};b.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]};b.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]};b.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]};b.MIXED={bit:-1};b.getCharCountIndicator=function(e,n){if(!e.ccBits)throw new Error("Invalid mode: "+e);if(!Io.isValid(n))throw new Error("Invalid version: "+n);return n>=1&&n<10?e.ccBits[0]:n<27?e.ccBits[1]:e.ccBits[2]};b.getBestModeForData=function(e){return pt.testNumeric(e)?b.NUMERIC:pt.testAlphanumeric(e)?b.ALPHANUMERIC:pt.testKanji(e)?b.KANJI:b.BYTE};b.toString=function(e){if(e&&e.id)return e.id;throw new Error("Invalid mode")};b.isValid=function(e){return e&&e.bit&&e.ccBits};function Mo(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return b.NUMERIC;case"alphanumeric":return b.ALPHANUMERIC;case"kanji":return b.KANJI;case"byte":return b.BYTE;default:throw new Error("Unknown mode: "+t)}}b.from=function(e,n){if(b.isValid(e))return e;try{return Mo(e)}catch{return n}}});var lr=l(W=>{var Fe=z(),Po=st(),or=De(),H=G(),vt=ht(),ur=7973,ar=Fe.getBCHDigit(ur);function Bo(t,e,n){for(let r=1;r<=40;r++)if(e<=W.getCapacity(r,n,t))return r}function cr(t,e){return H.getCharCountIndicator(t,e)+4}function Lo(t,e){let n=0;return t.forEach(function(r){let i=cr(r.mode,e);n+=i+r.getBitsLength()}),n}function ko(t,e){for(let n=1;n<=40;n++)if(Lo(t,n)<=W.getCapacity(n,e,H.MIXED))return n}W.from=function(e,n){return vt.isValid(e)?parseInt(e,10):n};W.getCapacity=function(e,n,r){if(!vt.isValid(e))throw new Error("Invalid QR Code version");typeof r>"u"&&(r=H.BYTE);let i=Fe.getSymbolTotalCodewords(e),o=Po.getTotalCodewordsCount(e,n),a=(i-o)*8;if(r===H.MIXED)return a;let u=a-cr(r,e);switch(r){case H.NUMERIC:return Math.floor(u/10*3);case H.ALPHANUMERIC:return Math.floor(u/11*2);case H.KANJI:return Math.floor(u/13);case H.BYTE:default:return Math.floor(u/8)}};W.getBestVersionForData=function(e,n){let r,i=or.from(n,or.M);if(Array.isArray(e)){if(e.length>1)return ko(e,i);if(e.length===0)return 1;r=e[0]}else r=e;return Bo(r.mode,r.getLength(),i)};W.getEncodedBits=function(e){if(!vt.isValid(e)||e<7)throw new Error("Invalid QR Code version");let n=e<<12;for(;Fe.getBCHDigit(n)-ar>=0;)n^=ur<<Fe.getBCHDigit(n)-ar;return e<<12|n}});var hr=l(dr=>{var _t=z(),fr=1335,Do=21522,sr=_t.getBCHDigit(fr);dr.getEncodedBits=function(e,n){let r=e.bit<<3|n,i=r<<10;for(;_t.getBCHDigit(i)-sr>=0;)i^=fr<<_t.getBCHDigit(i)-sr;return(r<<10|i)^Do}});var pr=l((md,gr)=>{var qo=G();function ne(t){this.mode=qo.NUMERIC,this.data=t.toString()}ne.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};ne.prototype.getLength=function(){return this.data.length};ne.prototype.getBitsLength=function(){return ne.getBitsLength(this.data.length)};ne.prototype.write=function(e){let n,r,i;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),i=parseInt(r,10),e.put(i,10);let o=this.data.length-n;o>0&&(r=this.data.substr(n),i=parseInt(r,10),e.put(i,o*3+1))};gr.exports=ne});var _r=l((wd,vr)=>{var No=G(),yt=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function re(t){this.mode=No.ALPHANUMERIC,this.data=t}re.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};re.prototype.getLength=function(){return this.data.length};re.prototype.getBitsLength=function(){return re.getBitsLength(this.data.length)};re.prototype.write=function(e){let n;for(n=0;n+2<=this.data.length;n+=2){let r=yt.indexOf(this.data[n])*45;r+=yt.indexOf(this.data[n+1]),e.put(r,11)}this.data.length%2&&e.put(yt.indexOf(this.data[n]),6)};vr.exports=re});var mr=l((Ed,yr)=>{var jo=G();function ie(t){this.mode=jo.BYTE,typeof t=="string"?this.data=new TextEncoder().encode(t):this.data=new Uint8Array(t)}ie.getBitsLength=function(e){return e*8};ie.prototype.getLength=function(){return this.data.length};ie.prototype.getBitsLength=function(){return ie.getBitsLength(this.data.length)};ie.prototype.write=function(t){for(let e=0,n=this.data.length;e<n;e++)t.put(this.data[e],8)};yr.exports=ie});var Er=l((bd,wr)=>{var Uo=G(),zo=z();function oe(t){this.mode=Uo.KANJI,this.data=t}oe.getBitsLength=function(e){return e*13};oe.prototype.getLength=function(){return this.data.length};oe.prototype.getBitsLength=function(){return oe.getBitsLength(this.data.length)};oe.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let n=zo.toSJIS(this.data[e]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),t.put(n,13)}};wr.exports=oe});var br=l((xd,mt)=>{"use strict";var we={single_source_shortest_paths:function(t,e,n){var r={},i={};i[e]=0;var o=we.PriorityQueue.make();o.push(e,0);for(var a,u,c,s,f,v,h,m,C;!o.empty();){a=o.pop(),u=a.value,s=a.cost,f=t[u]||{};for(c in f)f.hasOwnProperty(c)&&(v=f[c],h=s+v,m=i[c],C=typeof i[c]>"u",(C||m>h)&&(i[c]=h,o.push(c,h),r[c]=u))}if(typeof n<"u"&&typeof i[n]>"u"){var A=["Could not find a path from ",e," to ",n,"."].join("");throw new Error(A)}return r},extract_shortest_path_from_predecessor_list:function(t,e){for(var n=[],r=e,i;r;)n.push(r),i=t[r],r=t[r];return n.reverse(),n},find_path:function(t,e,n){var r=we.single_source_shortest_paths(t,e,n);return we.extract_shortest_path_from_predecessor_list(r,n)},PriorityQueue:{make:function(t){var e=we.PriorityQueue,n={},r;t=t||{};for(r in e)e.hasOwnProperty(r)&&(n[r]=e[r]);return n.queue=[],n.sorter=t.sorter||e.default_sorter,n},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){var n={value:t,cost:e};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};typeof mt<"u"&&(mt.exports=we)});var Ir=l(ae=>{var p=G(),Sr=pr(),Cr=_r(),Ar=mr(),Tr=Er(),Ee=gt(),Ge=z(),Fo=br();function xr(t){return unescape(encodeURIComponent(t)).length}function be(t,e,n){let r=[],i;for(;(i=t.exec(n))!==null;)r.push({data:i[0],index:i.index,mode:e,length:i[0].length});return r}function Rr(t){let e=be(Ee.NUMERIC,p.NUMERIC,t),n=be(Ee.ALPHANUMERIC,p.ALPHANUMERIC,t),r,i;return Ge.isKanjiModeEnabled()?(r=be(Ee.BYTE,p.BYTE,t),i=be(Ee.KANJI,p.KANJI,t)):(r=be(Ee.BYTE_KANJI,p.BYTE,t),i=[]),e.concat(n,r,i).sort(function(a,u){return a.index-u.index}).map(function(a){return{data:a.data,mode:a.mode,length:a.length}})}function wt(t,e){switch(e){case p.NUMERIC:return Sr.getBitsLength(t);case p.ALPHANUMERIC:return Cr.getBitsLength(t);case p.KANJI:return Tr.getBitsLength(t);case p.BYTE:return Ar.getBitsLength(t)}}function Go(t){return t.reduce(function(e,n){let r=e.length-1>=0?e[e.length-1]:null;return r&&r.mode===n.mode?(e[e.length-1].data+=n.data,e):(e.push(n),e)},[])}function Ho(t){let e=[];for(let n=0;n<t.length;n++){let r=t[n];switch(r.mode){case p.NUMERIC:e.push([r,{data:r.data,mode:p.ALPHANUMERIC,length:r.length},{data:r.data,mode:p.BYTE,length:r.length}]);break;case p.ALPHANUMERIC:e.push([r,{data:r.data,mode:p.BYTE,length:r.length}]);break;case p.KANJI:e.push([r,{data:r.data,mode:p.BYTE,length:xr(r.data)}]);break;case p.BYTE:e.push([{data:r.data,mode:p.BYTE,length:xr(r.data)}])}}return e}function $o(t,e){let n={},r={start:{}},i=["start"];for(let o=0;o<t.length;o++){let a=t[o],u=[];for(let c=0;c<a.length;c++){let s=a[c],f=""+o+c;u.push(f),n[f]={node:s,lastCount:0},r[f]={};for(let v=0;v<i.length;v++){let h=i[v];n[h]&&n[h].node.mode===s.mode?(r[h][f]=wt(n[h].lastCount+s.length,s.mode)-wt(n[h].lastCount,s.mode),n[h].lastCount+=s.length):(n[h]&&(n[h].lastCount=s.length),r[h][f]=wt(s.length,s.mode)+4+p.getCharCountIndicator(s.mode,e))}}i=u}for(let o=0;o<i.length;o++)r[i[o]].end=0;return{map:r,table:n}}function Or(t,e){let n,r=p.getBestModeForData(t);if(n=p.from(e,r),n!==p.BYTE&&n.bit<r.bit)throw new Error('"'+t+'" cannot be encoded with mode '+p.toString(n)+`.
 Suggested mode is: `+p.toString(r));switch(n===p.KANJI&&!Ge.isKanjiModeEnabled()&&(n=p.BYTE),n){case p.NUMERIC:return new Sr(t);case p.ALPHANUMERIC:return new Cr(t);case p.KANJI:return new Tr(t);case p.BYTE:return new Ar(t)}}ae.fromArray=function(e){return e.reduce(function(n,r){return typeof r=="string"?n.push(Or(r,null)):r.data&&n.push(Or(r.data,r.mode)),n},[])};ae.fromString=function(e,n){let r=Rr(e,Ge.isKanjiModeEnabled()),i=Ho(r),o=$o(i,n),a=Fo.find_path(o.map,"start","end"),u=[];for(let c=1;c<a.length-1;c++)u.push(o.table[a[c]].node);return ae.fromArray(Go(u))};ae.rawSplit=function(e){return ae.fromArray(Rr(e,Ge.isKanjiModeEnabled()))}});var Pr=l(Mr=>{var $e=z(),Et=De(),Vo=Hn(),Xo=Vn(),Jo=Xn(),Yo=Kn(),Ot=Qn(),St=st(),Ko=nr(),He=lr(),Qo=hr(),Wo=G(),bt=Ir();function Zo(t,e){let n=t.size,r=Yo.getPositions(e);for(let i=0;i<r.length;i++){let o=r[i][0],a=r[i][1];for(let u=-1;u<=7;u++)if(!(o+u<=-1||n<=o+u))for(let c=-1;c<=7;c++)a+c<=-1||n<=a+c||(u>=0&&u<=6&&(c===0||c===6)||c>=0&&c<=6&&(u===0||u===6)||u>=2&&u<=4&&c>=2&&c<=4?t.set(o+u,a+c,!0,!0):t.set(o+u,a+c,!1,!0))}}function ea(t){let e=t.size;for(let n=8;n<e-8;n++){let r=n%2===0;t.set(n,6,r,!0),t.set(6,n,r,!0)}}function ta(t,e){let n=Jo.getPositions(e);for(let r=0;r<n.length;r++){let i=n[r][0],o=n[r][1];for(let a=-2;a<=2;a++)for(let u=-2;u<=2;u++)a===-2||a===2||u===-2||u===2||a===0&&u===0?t.set(i+a,o+u,!0,!0):t.set(i+a,o+u,!1,!0)}}function na(t,e){let n=t.size,r=He.getEncodedBits(e),i,o,a;for(let u=0;u<18;u++)i=Math.floor(u/3),o=u%3+n-8-3,a=(r>>u&1)===1,t.set(i,o,a,!0),t.set(o,i,a,!0)}function xt(t,e,n){let r=t.size,i=Qo.getEncodedBits(e,n),o,a;for(o=0;o<15;o++)a=(i>>o&1)===1,o<6?t.set(o,8,a,!0):o<8?t.set(o+1,8,a,!0):t.set(r-15+o,8,a,!0),o<8?t.set(8,r-o-1,a,!0):o<9?t.set(8,15-o-1+1,a,!0):t.set(8,15-o-1,a,!0);t.set(r-8,8,1,!0)}function ra(t,e){let n=t.size,r=-1,i=n-1,o=7,a=0;for(let u=n-1;u>0;u-=2)for(u===6&&u--;;){for(let c=0;c<2;c++)if(!t.isReserved(i,u-c)){let s=!1;a<e.length&&(s=(e[a]>>>o&1)===1),t.set(i,u-c,s),o--,o===-1&&(a++,o=7)}if(i+=r,i<0||n<=i){i-=r,r=-r;break}}}function ia(t,e,n){let r=new Vo;n.forEach(function(c){r.put(c.mode.bit,4),r.put(c.getLength(),Wo.getCharCountIndicator(c.mode,t)),c.write(r)});let i=$e.getSymbolTotalCodewords(t),o=St.getTotalCodewordsCount(t,e),a=(i-o)*8;for(r.getLengthInBits()+4<=a&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);let u=(a-r.getLengthInBits())/8;for(let c=0;c<u;c++)r.put(c%2?17:236,8);return oa(r,t,e)}function oa(t,e,n){let r=$e.getSymbolTotalCodewords(e),i=St.getTotalCodewordsCount(e,n),o=r-i,a=St.getBlocksCount(e,n),u=r%a,c=a-u,s=Math.floor(r/a),f=Math.floor(o/a),v=f+1,h=s-f,m=new Ko(h),C=0,A=new Array(a),L=new Array(a),q=0,J=new Uint8Array(t.buffer);for(let x=0;x<a;x++){let Y=x<c?f:v;A[x]=J.slice(C,C+Y),L[x]=m.encode(A[x]),C+=Y,q=Math.max(q,Y)}let d=new Uint8Array(r),S=0,g,w;for(g=0;g<q;g++)for(w=0;w<a;w++)g<A[w].length&&(d[S++]=A[w][g]);for(g=0;g<h;g++)for(w=0;w<a;w++)d[S++]=L[w][g];return d}function aa(t,e,n,r){let i;if(Array.isArray(t))i=bt.fromArray(t);else if(typeof t=="string"){let s=e;if(!s){let f=bt.rawSplit(t);s=He.getBestVersionForData(f,n)}i=bt.fromString(t,s||40)}else throw new Error("Invalid data");let o=He.getBestVersionForData(i,n);if(!o)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=o;else if(e<o)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+o+`.
`);let a=ia(e,n,i),u=$e.getSymbolSize(e),c=new Xo(u);return Zo(c,e),ea(c),ta(c,e),xt(c,n,0),e>=7&&na(c,e),ra(c,a),isNaN(r)&&(r=Ot.getBestMask(c,xt.bind(null,c,n))),Ot.applyMask(r,c),xt(c,n,r),{modules:c,version:e,errorCorrectionLevel:n,maskPattern:r,segments:i}}Mr.create=function(e,n){if(typeof e>"u"||e==="")throw new Error("No input text");let r=Et.M,i,o;return typeof n<"u"&&(r=Et.from(n.errorCorrectionLevel,Et.M),i=He.from(n.version),o=Ot.from(n.maskPattern),n.toSJISFunc&&$e.setToSJISFunction(n.toSJISFunc)),aa(e,i,r,o)}});var Ct=l(Z=>{function Br(t){if(typeof t=="number"&&(t=t.toString()),typeof t!="string")throw new Error("Color should be defined as hex string");let e=t.slice().replace("#","").split("");if(e.length<3||e.length===5||e.length>8)throw new Error("Invalid hex color: "+t);(e.length===3||e.length===4)&&(e=Array.prototype.concat.apply([],e.map(function(r){return[r,r]}))),e.length===6&&e.push("F","F");let n=parseInt(e.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+e.slice(0,6).join("")}}Z.getOptions=function(e){e||(e={}),e.color||(e.color={});let n=typeof e.margin>"u"||e.margin===null||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,i=e.scale||4;return{width:r,scale:r?4:i,margin:n,color:{dark:Br(e.color.dark||"#000000ff"),light:Br(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}};Z.getScale=function(e,n){return n.width&&n.width>=e+n.margin*2?n.width/(e+n.margin*2):n.scale};Z.getImageWidth=function(e,n){let r=Z.getScale(e,n);return Math.floor((e+n.margin*2)*r)};Z.qrToImageData=function(e,n,r){let i=n.modules.size,o=n.modules.data,a=Z.getScale(i,r),u=Math.floor((i+r.margin*2)*a),c=r.margin*a,s=[r.color.light,r.color.dark];for(let f=0;f<u;f++)for(let v=0;v<u;v++){let h=(f*u+v)*4,m=r.color.light;if(f>=c&&v>=c&&f<u-c&&v<u-c){let C=Math.floor((f-c)/a),A=Math.floor((v-c)/a);m=s[o[C*i+A]?1:0]}e[h++]=m.r,e[h++]=m.g,e[h++]=m.b,e[h]=m.a}}});var Lr=l(Ve=>{var At=Ct();function ua(t,e,n){t.clearRect(0,0,e.width,e.height),e.style||(e.style={}),e.height=n,e.width=n,e.style.height=n+"px",e.style.width=n+"px"}function ca(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}Ve.render=function(e,n,r){let i=r,o=n;typeof i>"u"&&(!n||!n.getContext)&&(i=n,n=void 0),n||(o=ca()),i=At.getOptions(i);let a=At.getImageWidth(e.modules.size,i),u=o.getContext("2d"),c=u.createImageData(a,a);return At.qrToImageData(c.data,e,i),ua(u,o,a),u.putImageData(c,0,0),o};Ve.renderToDataURL=function(e,n,r){let i=r;typeof i>"u"&&(!n||!n.getContext)&&(i=n,n=void 0),i||(i={});let o=Ve.render(e,n,i),a=i.type||"image/png",u=i.rendererOpts||{};return o.toDataURL(a,u.quality)}});var qr=l(Dr=>{var la=Ct();function kr(t,e){let n=t.a/255,r=e+'="'+t.hex+'"';return n<1?r+" "+e+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function Tt(t,e,n){let r=t+e;return typeof n<"u"&&(r+=" "+n),r}function sa(t,e,n){let r="",i=0,o=!1,a=0;for(let u=0;u<t.length;u++){let c=Math.floor(u%e),s=Math.floor(u/e);!c&&!o&&(o=!0),t[u]?(a++,u>0&&c>0&&t[u-1]||(r+=o?Tt("M",c+n,.5+s+n):Tt("m",i,0),i=0,o=!1),c+1<e&&t[u+1]||(r+=Tt("h",a),a=0)):i++}return r}Dr.render=function(e,n,r){let i=la.getOptions(n),o=e.modules.size,a=e.modules.data,u=o+i.margin*2,c=i.color.light.a?"<path "+kr(i.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",s="<path "+kr(i.color.dark,"stroke")+' d="'+sa(a,o,i.margin)+'"/>',f='viewBox="0 0 '+u+" "+u+'"',h='<svg xmlns="http://www.w3.org/2000/svg" '+(i.width?'width="'+i.width+'" height="'+i.width+'" ':"")+f+' shape-rendering="crispEdges">'+c+s+`</svg>
`;return typeof r=="function"&&r(null,h),h}});var jr=l(xe=>{var fa=zn(),Rt=Pr(),Nr=Lr(),da=qr();function It(t,e,n,r,i){let o=[].slice.call(arguments,1),a=o.length,u=typeof o[a-1]=="function";if(!u&&!fa())throw new Error("Callback required as last argument");if(u){if(a<2)throw new Error("Too few arguments provided");a===2?(i=n,n=e,e=r=void 0):a===3&&(e.getContext&&typeof i>"u"?(i=r,r=void 0):(i=r,r=n,n=e,e=void 0))}else{if(a<1)throw new Error("Too few arguments provided");return a===1?(n=e,e=r=void 0):a===2&&!e.getContext&&(r=n,n=e,e=void 0),new Promise(function(c,s){try{let f=Rt.create(n,r);c(t(f,e,r))}catch(f){s(f)}})}try{let c=Rt.create(n,r);i(null,t(c,e,r))}catch(c){i(c)}}xe.create=Rt.create;xe.toCanvas=It.bind(null,Nr.render);xe.toDataURL=It.bind(null,Nr.renderToDataURL);xe.toString=It.bind(null,function(t,e,n){return da.render(t,n)})});var R=l(Mt=>{"use strict";Object.defineProperty(Mt,"__esModule",{value:!0});function ha(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var ga=function t(e,n){ha(this,t),this.data=e,this.text=n.text||e,this.options=n};Mt.default=ga});var Fr=l(Xe=>{"use strict";Object.defineProperty(Xe,"__esModule",{value:!0});Xe.CODE39=void 0;var pa=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),va=R(),_a=ya(va);function ya(t){return t&&t.__esModule?t:{default:t}}function ma(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function wa(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Ea(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var ba=function(t){Ea(e,t);function e(n,r){return ma(this,e),n=n.toUpperCase(),r.mod43&&(n+=Sa(Ca(n))),wa(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return pa(e,[{key:"encode",value:function(){for(var r=Pt("*"),i=0;i<this.data.length;i++)r+=Pt(this.data[i])+"0";return r+=Pt("*"),{data:r,text:this.text}}},{key:"valid",value:function(){return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)!==-1}}]),e}(_a.default),Ur=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],xa=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];function Pt(t){return Oa(zr(t))}function Oa(t){return xa[t].toString(2)}function Sa(t){return Ur[t]}function zr(t){return Ur.indexOf(t)}function Ca(t){for(var e=0,n=0;n<t.length;n++)e+=zr(t[n]);return e=e%43,e}Xe.CODE39=ba});var ue=l(E=>{"use strict";Object.defineProperty(E,"__esModule",{value:!0});var Oe;function Bt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Gr=E.SET_A=0,Hr=E.SET_B=1,$r=E.SET_C=2,Pd=E.SHIFT=98,Aa=E.START_A=103,Ta=E.START_B=104,Ra=E.START_C=105,Bd=E.MODULO=103,Ld=E.STOP=106,kd=E.FNC1=207,Dd=E.SET_BY_CODE=(Oe={},Bt(Oe,Aa,Gr),Bt(Oe,Ta,Hr),Bt(Oe,Ra,$r),Oe),qd=E.SWAP={101:Gr,100:Hr,99:$r},Nd=E.A_START_CHAR="\xD0",jd=E.B_START_CHAR="\xD1",Ud=E.C_START_CHAR="\xD2",zd=E.A_CHARS="[\0-_\xC8-\xCF]",Fd=E.B_CHARS="[ -\x7F\xC8-\xCF]",Gd=E.C_CHARS="(\xCF*[0-9]{2}\xCF*)",Hd=E.BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011]});var Se=l(Lt=>{"use strict";Object.defineProperty(Lt,"__esModule",{value:!0});var Ia=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Ma=R(),Pa=Ba(Ma),I=ue();function Ba(t){return t&&t.__esModule?t:{default:t}}function La(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ka(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Da(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var qa=function(t){Da(e,t);function e(n,r){La(this,e);var i=ka(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n.substring(1),r));return i.bytes=n.split("").map(function(o){return o.charCodeAt(0)}),i}return Ia(e,[{key:"valid",value:function(){return/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function(){var r=this.bytes,i=r.shift()-105,o=I.SET_BY_CODE[i];if(o===void 0)throw new RangeError("The encoding does not start with a start character.");this.shouldEncodeAsEan128()===!0&&r.unshift(I.FNC1);var a=e.next(r,1,o);return{text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:e.getBar(i)+a.result+e.getBar((a.checksum+i)%I.MODULO)+e.getBar(I.STOP)}}},{key:"shouldEncodeAsEan128",value:function(){var r=this.options.ean128||!1;return typeof r=="string"&&(r=r.toLowerCase()==="true"),r}}],[{key:"getBar",value:function(r){return I.BARS[r]?I.BARS[r].toString():""}},{key:"correctIndex",value:function(r,i){if(i===I.SET_A){var o=r.shift();return o<32?o+64:o-32}else return i===I.SET_B?r.shift()-32:(r.shift()-48)*10+r.shift()-48}},{key:"next",value:function(r,i,o){if(!r.length)return{result:"",checksum:0};var a=void 0,u=void 0;if(r[0]>=200){u=r.shift()-105;var c=I.SWAP[u];c!==void 0?a=e.next(r,i+1,c):((o===I.SET_A||o===I.SET_B)&&u===I.SHIFT&&(r[0]=o===I.SET_A?r[0]>95?r[0]-96:r[0]:r[0]<32?r[0]+96:r[0]),a=e.next(r,i+1,o))}else u=e.correctIndex(r,o),a=e.next(r,i+1,o);var s=e.getBar(u),f=u*i;return{result:s+a.result,checksum:f+a.checksum}}}]),e}(Pa.default);Lt.default=qa});var Kr=l(Dt=>{"use strict";Object.defineProperty(Dt,"__esModule",{value:!0});var $=ue(),Vr=function(e){return e.match(new RegExp("^"+$.A_CHARS+"*"))[0].length},Xr=function(e){return e.match(new RegExp("^"+$.B_CHARS+"*"))[0].length},Jr=function(e){return e.match(new RegExp("^"+$.C_CHARS+"*"))[0]};function kt(t,e){var n=e?$.A_CHARS:$.B_CHARS,r=t.match(new RegExp("^("+n+"+?)(([0-9]{2}){2,})([^0-9]|$)"));if(r)return r[1]+"\xCC"+Yr(t.substring(r[1].length));var i=t.match(new RegExp("^"+n+"+"))[0];return i.length===t.length?t:i+String.fromCharCode(e?205:206)+kt(t.substring(i.length),!e)}function Yr(t){var e=Jr(t),n=e.length;if(n===t.length)return t;t=t.substring(n);var r=Vr(t)>=Xr(t);return e+String.fromCharCode(r?206:205)+kt(t,r)}Dt.default=function(t){var e=void 0,n=Jr(t).length;if(n>=2)e=$.C_START_CHAR+Yr(t);else{var r=Vr(t)>Xr(t);e=(r?$.A_START_CHAR:$.B_START_CHAR)+kt(t,r)}return e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(i,o){return"\xCB"+o})}});var Wr=l(Nt=>{"use strict";Object.defineProperty(Nt,"__esModule",{value:!0});var Na=Se(),ja=Qr(Na),Ua=Kr(),za=Qr(Ua);function Qr(t){return t&&t.__esModule?t:{default:t}}function Fa(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function qt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Ga(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Ha=function(t){Ga(e,t);function e(n,r){if(Fa(this,e),/^[\x00-\x7F\xC8-\xD3]+$/.test(n))var i=qt(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,(0,za.default)(n),r));else var i=qt(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return qt(i)}return e}(ja.default);Nt.default=Ha});var ei=l(jt=>{"use strict";Object.defineProperty(jt,"__esModule",{value:!0});var $a=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Va=Se(),Xa=Ja(Va),Zr=ue();function Ja(t){return t&&t.__esModule?t:{default:t}}function Ya(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Ka(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Qa(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Wa=function(t){Qa(e,t);function e(n,r){return Ya(this,e),Ka(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,Zr.A_START_CHAR+n,r))}return $a(e,[{key:"valid",value:function(){return new RegExp("^"+Zr.A_CHARS+"+$").test(this.data)}}]),e}(Xa.default);jt.default=Wa});var ni=l(Ut=>{"use strict";Object.defineProperty(Ut,"__esModule",{value:!0});var Za=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),eu=Se(),tu=nu(eu),ti=ue();function nu(t){return t&&t.__esModule?t:{default:t}}function ru(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function iu(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function ou(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var au=function(t){ou(e,t);function e(n,r){return ru(this,e),iu(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,ti.B_START_CHAR+n,r))}return Za(e,[{key:"valid",value:function(){return new RegExp("^"+ti.B_CHARS+"+$").test(this.data)}}]),e}(tu.default);Ut.default=au});var ii=l(zt=>{"use strict";Object.defineProperty(zt,"__esModule",{value:!0});var uu=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),cu=Se(),lu=su(cu),ri=ue();function su(t){return t&&t.__esModule?t:{default:t}}function fu(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function du(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function hu(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var gu=function(t){hu(e,t);function e(n,r){return fu(this,e),du(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,ri.C_START_CHAR+n,r))}return uu(e,[{key:"valid",value:function(){return new RegExp("^"+ri.C_CHARS+"+$").test(this.data)}}]),e}(lu.default);zt.default=gu});var oi=l(k=>{"use strict";Object.defineProperty(k,"__esModule",{value:!0});k.CODE128C=k.CODE128B=k.CODE128A=k.CODE128=void 0;var pu=Wr(),vu=Je(pu),_u=ei(),yu=Je(_u),mu=ni(),wu=Je(mu),Eu=ii(),bu=Je(Eu);function Je(t){return t&&t.__esModule?t:{default:t}}k.CODE128=vu.default;k.CODE128A=yu.default;k.CODE128B=wu.default;k.CODE128C=bu.default});var ce=l(V=>{"use strict";Object.defineProperty(V,"__esModule",{value:!0});var Zd=V.SIDE_BIN="101",e0=V.MIDDLE_BIN="01010",t0=V.BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]},n0=V.EAN2_STRUCTURE=["LL","LG","GL","GG"],r0=V.EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"],i0=V.EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"]});var le=l(Ft=>{"use strict";Object.defineProperty(Ft,"__esModule",{value:!0});var xu=ce(),Ou=function(e,n,r){var i=e.split("").map(function(a,u){return xu.BINARIES[n[u]]}).map(function(a,u){return a?a[e[u]]:""});if(r){var o=e.length-1;i=i.map(function(a,u){return u<o?a+r:a})}return i.join("")};Ft.default=Ou});var Ht=l(Gt=>{"use strict";Object.defineProperty(Gt,"__esModule",{value:!0});var Su=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),se=ce(),Cu=le(),ai=ui(Cu),Au=R(),Tu=ui(Au);function ui(t){return t&&t.__esModule?t:{default:t}}function Ru(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Iu(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Mu(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Pu=function(t){Mu(e,t);function e(n,r){Ru(this,e);var i=Iu(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return i.fontSize=!r.flat&&r.fontSize>r.width*10?r.width*10:r.fontSize,i.guardHeight=r.height+i.fontSize/2+r.textMargin,i}return Su(e,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function(r,i){return this.text.substr(r,i)}},{key:"leftEncode",value:function(r,i){return(0,ai.default)(r,i)}},{key:"rightText",value:function(r,i){return this.text.substr(r,i)}},{key:"rightEncode",value:function(r,i){return(0,ai.default)(r,i)}},{key:"encodeGuarded",value:function(){var r={fontSize:this.fontSize},i={height:this.guardHeight};return[{data:se.SIDE_BIN,options:i},{data:this.leftEncode(),text:this.leftText(),options:r},{data:se.MIDDLE_BIN,options:i},{data:this.rightEncode(),text:this.rightText(),options:r},{data:se.SIDE_BIN,options:i}]}},{key:"encodeFlat",value:function(){var r=[se.SIDE_BIN,this.leftEncode(),se.MIDDLE_BIN,this.rightEncode(),se.SIDE_BIN];return{data:r.join(""),text:this.text}}}]),e}(Tu.default);Gt.default=Pu});var li=l($t=>{"use strict";Object.defineProperty($t,"__esModule",{value:!0});var Bu=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Ce=function t(e,n,r){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,n);if(i===void 0){var o=Object.getPrototypeOf(e);return o===null?void 0:t(o,n,r)}else{if("value"in i)return i.value;var a=i.get;return a===void 0?void 0:a.call(r)}},Lu=ce(),ku=Ht(),Du=qu(ku);function qu(t){return t&&t.__esModule?t:{default:t}}function Nu(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ju(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Uu(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var ci=function(e){var n=e.substr(0,12).split("").map(function(r){return+r}).reduce(function(r,i,o){return o%2?r+i*3:r+i},0);return(10-n%10)%10},zu=function(t){Uu(e,t);function e(n,r){Nu(this,e),n.search(/^[0-9]{12}$/)!==-1&&(n+=ci(n));var i=ju(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return i.lastChar=r.lastChar,i}return Bu(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{13}$/)!==-1&&+this.data[12]===ci(this.data)}},{key:"leftText",value:function(){return Ce(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function(){var r=this.data.substr(1,6),i=Lu.EAN13_STRUCTURE[this.data[0]];return Ce(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,r,i)}},{key:"rightText",value:function(){return Ce(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function(){var r=this.data.substr(7,6);return Ce(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,r,"RRRRRR")}},{key:"encodeGuarded",value:function(){var r=Ce(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(r.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(r.push({data:"00"}),r.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),r}}]),e}(Du.default);$t.default=zu});var fi=l(Vt=>{"use strict";Object.defineProperty(Vt,"__esModule",{value:!0});var Fu=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Ye=function t(e,n,r){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,n);if(i===void 0){var o=Object.getPrototypeOf(e);return o===null?void 0:t(o,n,r)}else{if("value"in i)return i.value;var a=i.get;return a===void 0?void 0:a.call(r)}},Gu=Ht(),Hu=$u(Gu);function $u(t){return t&&t.__esModule?t:{default:t}}function Vu(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Xu(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Ju(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var si=function(e){var n=e.substr(0,7).split("").map(function(r){return+r}).reduce(function(r,i,o){return o%2?r+i:r+i*3},0);return(10-n%10)%10},Yu=function(t){Ju(e,t);function e(n,r){return Vu(this,e),n.search(/^[0-9]{7}$/)!==-1&&(n+=si(n)),Xu(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return Fu(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{8}$/)!==-1&&+this.data[7]===si(this.data)}},{key:"leftText",value:function(){return Ye(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function(){var r=this.data.substr(0,4);return Ye(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,r,"LLLL")}},{key:"rightText",value:function(){return Ye(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function(){var r=this.data.substr(4,4);return Ye(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,r,"RRRR")}}]),e}(Hu.default);Vt.default=Yu});var hi=l(Xt=>{"use strict";Object.defineProperty(Xt,"__esModule",{value:!0});var Ku=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Qu=ce(),Wu=le(),Zu=di(Wu),ec=R(),tc=di(ec);function di(t){return t&&t.__esModule?t:{default:t}}function nc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function rc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function ic(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var oc=function(e){var n=e.split("").map(function(r){return+r}).reduce(function(r,i,o){return o%2?r+i*9:r+i*3},0);return n%10},ac=function(t){ic(e,t);function e(n,r){return nc(this,e),rc(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return Ku(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{5}$/)!==-1}},{key:"encode",value:function(){var r=Qu.EAN5_STRUCTURE[oc(this.data)];return{data:"1011"+(0,Zu.default)(this.data,r,"01"),text:this.text}}}]),e}(tc.default);Xt.default=ac});var pi=l(Jt=>{"use strict";Object.defineProperty(Jt,"__esModule",{value:!0});var uc=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),cc=ce(),lc=le(),sc=gi(lc),fc=R(),dc=gi(fc);function gi(t){return t&&t.__esModule?t:{default:t}}function hc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function gc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function pc(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var vc=function(t){pc(e,t);function e(n,r){return hc(this,e),gc(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return uc(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{2}$/)!==-1}},{key:"encode",value:function(){var r=cc.EAN2_STRUCTURE[parseInt(this.data)%4];return{data:"1011"+(0,sc.default)(this.data,r,"01"),text:this.text}}}]),e}(dc.default);Jt.default=vc});var Kt=l(Ke=>{"use strict";Object.defineProperty(Ke,"__esModule",{value:!0});var _c=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();Ke.checksum=Yt;var yc=le(),fe=vi(yc),mc=R(),wc=vi(mc);function vi(t){return t&&t.__esModule?t:{default:t}}function Ec(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function bc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function xc(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Oc=function(t){xc(e,t);function e(n,r){Ec(this,e),n.search(/^[0-9]{11}$/)!==-1&&(n+=Yt(n));var i=bc(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return i.displayValue=r.displayValue,r.fontSize>r.width*10?i.fontSize=r.width*10:i.fontSize=r.fontSize,i.guardHeight=r.height+i.fontSize/2+r.textMargin,i}return _c(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{12}$/)!==-1&&this.data[11]==Yt(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var r="";return r+="101",r+=(0,fe.default)(this.data.substr(0,6),"LLLLLL"),r+="01010",r+=(0,fe.default)(this.data.substr(6,6),"RRRRRR"),r+="101",{data:r,text:this.text}}},{key:"guardedEncoding",value:function(){var r=[];return this.displayValue&&r.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),r.push({data:"101"+(0,fe.default)(this.data[0],"L"),options:{height:this.guardHeight}}),r.push({data:(0,fe.default)(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),r.push({data:"01010",options:{height:this.guardHeight}}),r.push({data:(0,fe.default)(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),r.push({data:(0,fe.default)(this.data[11],"R")+"101",options:{height:this.guardHeight}}),this.displayValue&&r.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),r}}]),e}(wc.default);function Yt(t){var e=0,n;for(n=1;n<11;n+=2)e+=parseInt(t[n]);for(n=0;n<11;n+=2)e+=parseInt(t[n])*3;return(10-e%10)%10}Ke.default=Oc});var mi=l(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});var Sc=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Cc=le(),Ac=yi(Cc),Tc=R(),Rc=yi(Tc),Ic=Kt();function yi(t){return t&&t.__esModule?t:{default:t}}function Mc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Qt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Pc(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Bc=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],Lc=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],kc=function(t){Pc(e,t);function e(n,r){Mc(this,e);var i=Qt(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));if(i.isValid=!1,n.search(/^[0-9]{6}$/)!==-1)i.middleDigits=n,i.upcA=_i(n,"0"),i.text=r.text||""+i.upcA[0]+n+i.upcA[i.upcA.length-1],i.isValid=!0;else if(n.search(/^[01][0-9]{7}$/)!==-1)if(i.middleDigits=n.substring(1,n.length-1),i.upcA=_i(i.middleDigits,n[0]),i.upcA[i.upcA.length-1]===n[n.length-1])i.isValid=!0;else return Qt(i);else return Qt(i);return i.displayValue=r.displayValue,r.fontSize>r.width*10?i.fontSize=r.width*10:i.fontSize=r.fontSize,i.guardHeight=r.height+i.fontSize/2+r.textMargin,i}return Sc(e,[{key:"valid",value:function(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var r="";return r+="101",r+=this.encodeMiddleDigits(),r+="010101",{data:r,text:this.text}}},{key:"guardedEncoding",value:function(){var r=[];return this.displayValue&&r.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),r.push({data:"101",options:{height:this.guardHeight}}),r.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),r.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&r.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),r}},{key:"encodeMiddleDigits",value:function(){var r=this.upcA[0],i=this.upcA[this.upcA.length-1],o=Lc[parseInt(i)][parseInt(r)];return(0,Ac.default)(this.middleDigits,o)}}]),e}(Rc.default);function _i(t,e){for(var n=parseInt(t[t.length-1]),r=Bc[n],i="",o=0,a=0;a<r.length;a++){var u=r[a];u==="X"?i+=t[o++]:i+=u}return i=""+e+i,""+i+(0,Ic.checksum)(i)}Wt.default=kc});var wi=l(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.UPCE=T.UPC=T.EAN2=T.EAN5=T.EAN8=T.EAN13=void 0;var Dc=li(),qc=de(Dc),Nc=fi(),jc=de(Nc),Uc=hi(),zc=de(Uc),Fc=pi(),Gc=de(Fc),Hc=Kt(),$c=de(Hc),Vc=mi(),Xc=de(Vc);function de(t){return t&&t.__esModule?t:{default:t}}T.EAN13=qc.default;T.EAN8=jc.default;T.EAN5=zc.default;T.EAN2=Gc.default;T.UPC=$c.default;T.UPCE=Xc.default});var Ei=l(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});var p0=Ae.START_BIN="1010",v0=Ae.END_BIN="11101",_0=Ae.BINARIES=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"]});var en=l(Zt=>{"use strict";Object.defineProperty(Zt,"__esModule",{value:!0});var Jc=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Qe=Ei(),Yc=R(),Kc=Qc(Yc);function Qc(t){return t&&t.__esModule?t:{default:t}}function Wc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Zc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function el(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var tl=function(t){el(e,t);function e(){return Wc(this,e),Zc(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return Jc(e,[{key:"valid",value:function(){return this.data.search(/^([0-9]{2})+$/)!==-1}},{key:"encode",value:function(){var r=this,i=this.data.match(/.{2}/g).map(function(o){return r.encodePair(o)}).join("");return{data:Qe.START_BIN+i+Qe.END_BIN,text:this.text}}},{key:"encodePair",value:function(r){var i=Qe.BINARIES[r[1]];return Qe.BINARIES[r[0]].split("").map(function(o,a){return(o==="1"?"111":"1")+(i[a]==="1"?"000":"0")}).join("")}}]),e}(Kc.default);Zt.default=tl});var xi=l(tn=>{"use strict";Object.defineProperty(tn,"__esModule",{value:!0});var nl=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),rl=en(),il=ol(rl);function ol(t){return t&&t.__esModule?t:{default:t}}function al(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ul(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function cl(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var bi=function(e){var n=e.substr(0,13).split("").map(function(r){return parseInt(r,10)}).reduce(function(r,i,o){return r+i*(3-o%2*2)},0);return Math.ceil(n/10)*10-n},ll=function(t){cl(e,t);function e(n,r){return al(this,e),n.search(/^[0-9]{13}$/)!==-1&&(n+=bi(n)),ul(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return nl(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{14}$/)!==-1&&+this.data[13]===bi(this.data)}}]),e}(il.default);tn.default=ll});var Si=l(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.ITF14=he.ITF=void 0;var sl=en(),fl=Oi(sl),dl=xi(),hl=Oi(dl);function Oi(t){return t&&t.__esModule?t:{default:t}}he.ITF=fl.default;he.ITF14=hl.default});var ge=l(nn=>{"use strict";Object.defineProperty(nn,"__esModule",{value:!0});var gl=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),pl=R(),vl=_l(pl);function _l(t){return t&&t.__esModule?t:{default:t}}function yl(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ml(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function wl(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var El=function(t){wl(e,t);function e(n,r){return yl(this,e),ml(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return gl(e,[{key:"encode",value:function(){for(var r="110",i=0;i<this.data.length;i++){var o=parseInt(this.data[i]),a=o.toString(2);a=bl(a,4-a.length);for(var u=0;u<a.length;u++)r+=a[u]=="0"?"100":"110"}return r+="1001",{data:r,text:this.text}}},{key:"valid",value:function(){return this.data.search(/^[0-9]+$/)!==-1}}]),e}(vl.default);function bl(t,e){for(var n=0;n<e;n++)t="0"+t;return t}nn.default=El});var Te=l(We=>{"use strict";Object.defineProperty(We,"__esModule",{value:!0});We.mod10=xl;We.mod11=Ol;function xl(t){for(var e=0,n=0;n<t.length;n++){var r=parseInt(t[n]);(n+t.length)%2===0?e+=r:e+=r*2%10+Math.floor(r*2/10)}return(10-e%10)%10}function Ol(t){for(var e=0,n=[2,3,4,5,6,7],r=0;r<t.length;r++){var i=parseInt(t[t.length-1-r]);e+=n[r%n.length]*i}return(11-e%11)%11}});var Ci=l(rn=>{"use strict";Object.defineProperty(rn,"__esModule",{value:!0});var Sl=ge(),Cl=Tl(Sl),Al=Te();function Tl(t){return t&&t.__esModule?t:{default:t}}function Rl(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Il(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Ml(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Pl=function(t){Ml(e,t);function e(n,r){return Rl(this,e),Il(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n+(0,Al.mod10)(n),r))}return e}(Cl.default);rn.default=Pl});var Ai=l(on=>{"use strict";Object.defineProperty(on,"__esModule",{value:!0});var Bl=ge(),Ll=Dl(Bl),kl=Te();function Dl(t){return t&&t.__esModule?t:{default:t}}function ql(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Nl(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function jl(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Ul=function(t){jl(e,t);function e(n,r){return ql(this,e),Nl(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n+(0,kl.mod11)(n),r))}return e}(Ll.default);on.default=Ul});var Ri=l(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});var zl=ge(),Fl=Gl(zl),Ti=Te();function Gl(t){return t&&t.__esModule?t:{default:t}}function Hl(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function $l(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Vl(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Xl=function(t){Vl(e,t);function e(n,r){return Hl(this,e),n+=(0,Ti.mod10)(n),n+=(0,Ti.mod10)(n),$l(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return e}(Fl.default);an.default=Xl});var Mi=l(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});var Jl=ge(),Yl=Kl(Jl),Ii=Te();function Kl(t){return t&&t.__esModule?t:{default:t}}function Ql(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Wl(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Zl(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var es=function(t){Zl(e,t);function e(n,r){return Ql(this,e),n+=(0,Ii.mod11)(n),n+=(0,Ii.mod10)(n),Wl(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return e}(Yl.default);un.default=es});var Pi=l(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.MSI1110=P.MSI1010=P.MSI11=P.MSI10=P.MSI=void 0;var ts=ge(),ns=Re(ts),rs=Ci(),is=Re(rs),os=Ai(),as=Re(os),us=Ri(),cs=Re(us),ls=Mi(),ss=Re(ls);function Re(t){return t&&t.__esModule?t:{default:t}}P.MSI=ns.default;P.MSI10=is.default;P.MSI11=as.default;P.MSI1010=cs.default;P.MSI1110=ss.default});var Bi=l(Ze=>{"use strict";Object.defineProperty(Ze,"__esModule",{value:!0});Ze.pharmacode=void 0;var fs=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),ds=R(),hs=gs(ds);function gs(t){return t&&t.__esModule?t:{default:t}}function ps(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function vs(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function _s(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var ys=function(t){_s(e,t);function e(n,r){ps(this,e);var i=vs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return i.number=parseInt(n,10),i}return fs(e,[{key:"encode",value:function(){for(var r=this.number,i="";!isNaN(r)&&r!=0;)r%2===0?(i="11100"+i,r=(r-2)/2):(i="100"+i,r=(r-1)/2);return i=i.slice(0,-2),{data:i,text:this.text}}},{key:"valid",value:function(){return this.number>=3&&this.number<=131070}}]),e}(hs.default);Ze.pharmacode=ys});var Li=l(et=>{"use strict";Object.defineProperty(et,"__esModule",{value:!0});et.codabar=void 0;var ms=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),ws=R(),Es=bs(ws);function bs(t){return t&&t.__esModule?t:{default:t}}function xs(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Os(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Ss(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Cs=function(t){Ss(e,t);function e(n,r){xs(this,e),n.search(/^[0-9\-\$\:\.\+\/]+$/)===0&&(n="A"+n+"A");var i=Os(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n.toUpperCase(),r));return i.text=i.options.text||i.text.replace(/[A-D]/g,""),i}return ms(e,[{key:"valid",value:function(){return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)!==-1}},{key:"encode",value:function(){for(var r=[],i=this.getEncodings(),o=0;o<this.data.length;o++)r.push(i[this.data.charAt(o)]),o!==this.data.length-1&&r.push("0");return{text:this.text,data:r.join("")}}},{key:"getEncodings",value:function(){return{0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"1011011011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),e}(Es.default);et.codabar=Cs});var ki=l(tt=>{"use strict";Object.defineProperty(tt,"__esModule",{value:!0});tt.GenericBarcode=void 0;var As=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Ts=R(),Rs=Is(Ts);function Is(t){return t&&t.__esModule?t:{default:t}}function Ms(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Ps(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Bs(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Ls=function(t){Bs(e,t);function e(n,r){return Ms(this,e),Ps(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return As(e,[{key:"encode",value:function(){return{data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function(){return!0}}]),e}(Rs.default);tt.GenericBarcode=Ls});var qi=l(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});var ks=Fr(),nt=oi(),pe=wi(),Di=Si(),Ie=Pi(),Ds=Bi(),qs=Li(),Ns=ki();cn.default={CODE39:ks.CODE39,CODE128:nt.CODE128,CODE128A:nt.CODE128A,CODE128B:nt.CODE128B,CODE128C:nt.CODE128C,EAN13:pe.EAN13,EAN8:pe.EAN8,EAN5:pe.EAN5,EAN2:pe.EAN2,UPC:pe.UPC,UPCE:pe.UPCE,ITF14:Di.ITF14,ITF:Di.ITF,MSI:Ie.MSI,MSI10:Ie.MSI10,MSI11:Ie.MSI11,MSI1010:Ie.MSI1010,MSI1110:Ie.MSI1110,pharmacode:Ds.pharmacode,codabar:qs.codabar,GenericBarcode:Ns.GenericBarcode}});var Me=l(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});var js=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};ln.default=function(t,e){return js({},t,e)}});var Ni=l(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.default=Us;function Us(t){var e=[];function n(r){if(Array.isArray(r))for(var i=0;i<r.length;i++)n(r[i]);else r.text=r.text||"",r.data=r.data||"",e.push(r)}return n(t),e}});var ji=l(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.default=zs;function zs(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t}});var hn=l(dn=>{"use strict";Object.defineProperty(dn,"__esModule",{value:!0});dn.default=Fs;function Fs(t){var e=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var n in e)e.hasOwnProperty(n)&&(n=e[n],typeof t[n]=="string"&&(t[n]=parseInt(t[n],10)));return typeof t.displayValue=="string"&&(t.displayValue=t.displayValue!="false"),t}});var pn=l(gn=>{"use strict";Object.defineProperty(gn,"__esModule",{value:!0});var Gs={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(){}};gn.default=Gs});var Fi=l(vn=>{"use strict";Object.defineProperty(vn,"__esModule",{value:!0});var Hs=hn(),$s=zi(Hs),Vs=pn(),Ui=zi(Vs);function zi(t){return t&&t.__esModule?t:{default:t}}function Xs(t){var e={};for(var n in Ui.default)Ui.default.hasOwnProperty(n)&&(t.hasAttribute("jsbarcode-"+n.toLowerCase())&&(e[n]=t.getAttribute("jsbarcode-"+n.toLowerCase())),t.hasAttribute("data-"+n.toLowerCase())&&(e[n]=t.getAttribute("data-"+n.toLowerCase())));return e.value=t.getAttribute("jsbarcode-value")||t.getAttribute("data-value"),e=(0,$s.default)(e),e}vn.default=Xs});var _n=l(B=>{"use strict";Object.defineProperty(B,"__esModule",{value:!0});B.getTotalWidthOfEncodings=B.calculateEncodingAttributes=B.getBarcodePadding=B.getEncodingHeight=B.getMaximumHeightOfEncodings=void 0;var Js=Me(),Ys=Ks(Js);function Ks(t){return t&&t.__esModule?t:{default:t}}function Gi(t,e){return e.height+(e.displayValue&&t.text.length>0?e.fontSize+e.textMargin:0)+e.marginTop+e.marginBottom}function Hi(t,e,n){if(n.displayValue&&e<t){if(n.textAlign=="center")return Math.floor((t-e)/2);if(n.textAlign=="left")return 0;if(n.textAlign=="right")return Math.floor(t-e)}return 0}function Qs(t,e,n){for(var r=0;r<t.length;r++){var i=t[r],o=(0,Ys.default)(e,i.options),a;o.displayValue?a=ef(i.text,o,n):a=0;var u=i.data.length*o.width;i.width=Math.ceil(Math.max(a,u)),i.height=Gi(i,o),i.barcodePadding=Hi(a,u,o)}}function Ws(t){for(var e=0,n=0;n<t.length;n++)e+=t[n].width;return e}function Zs(t){for(var e=0,n=0;n<t.length;n++)t[n].height>e&&(e=t[n].height);return e}function ef(t,e,n){var r;if(n)r=n;else if(typeof document<"u")r=document.createElement("canvas").getContext("2d");else return 0;r.font=e.fontOptions+" "+e.fontSize+"px "+e.font;var i=r.measureText(t);if(!i)return 0;var o=i.width;return o}B.getMaximumHeightOfEncodings=Zs;B.getEncodingHeight=Gi;B.getBarcodePadding=Hi;B.calculateEncodingAttributes=Qs;B.getTotalWidthOfEncodings=Ws});var $i=l(mn=>{"use strict";Object.defineProperty(mn,"__esModule",{value:!0});var tf=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),nf=Me(),rf=of(nf),yn=_n();function of(t){return t&&t.__esModule?t:{default:t}}function af(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var uf=function(){function t(e,n,r){af(this,t),this.canvas=e,this.encodings=n,this.options=r}return tf(t,[{key:"render",value:function(){if(!this.canvas.getContext)throw new Error("The browser does not support canvas.");this.prepareCanvas();for(var n=0;n<this.encodings.length;n++){var r=(0,rf.default)(this.options,this.encodings[n].options);this.drawCanvasBarcode(r,this.encodings[n]),this.drawCanvasText(r,this.encodings[n]),this.moveCanvasDrawing(this.encodings[n])}this.restoreCanvas()}},{key:"prepareCanvas",value:function(){var n=this.canvas.getContext("2d");n.save(),(0,yn.calculateEncodingAttributes)(this.encodings,this.options,n);var r=(0,yn.getTotalWidthOfEncodings)(this.encodings),i=(0,yn.getMaximumHeightOfEncodings)(this.encodings);this.canvas.width=r+this.options.marginLeft+this.options.marginRight,this.canvas.height=i,n.clearRect(0,0,this.canvas.width,this.canvas.height),this.options.background&&(n.fillStyle=this.options.background,n.fillRect(0,0,this.canvas.width,this.canvas.height)),n.translate(this.options.marginLeft,0)}},{key:"drawCanvasBarcode",value:function(n,r){var i=this.canvas.getContext("2d"),o=r.data,a;n.textPosition=="top"?a=n.marginTop+n.fontSize+n.textMargin:a=n.marginTop,i.fillStyle=n.lineColor;for(var u=0;u<o.length;u++){var c=u*n.width+r.barcodePadding;o[u]==="1"?i.fillRect(c,a,n.width,n.height):o[u]&&i.fillRect(c,a,n.width,n.height*o[u])}}},{key:"drawCanvasText",value:function(n,r){var i=this.canvas.getContext("2d"),o=n.fontOptions+" "+n.fontSize+"px "+n.font;if(n.displayValue){var a,u;n.textPosition=="top"?u=n.marginTop+n.fontSize-n.textMargin:u=n.height+n.textMargin+n.marginTop+n.fontSize,i.font=o,n.textAlign=="left"||r.barcodePadding>0?(a=0,i.textAlign="left"):n.textAlign=="right"?(a=r.width-1,i.textAlign="right"):(a=r.width/2,i.textAlign="center"),i.fillText(r.text,a,u)}}},{key:"moveCanvasDrawing",value:function(n){var r=this.canvas.getContext("2d");r.translate(n.width,0)}},{key:"restoreCanvas",value:function(){var n=this.canvas.getContext("2d");n.restore()}}]),t}();mn.default=uf});var Vi=l(En=>{"use strict";Object.defineProperty(En,"__esModule",{value:!0});var cf=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),lf=Me(),sf=ff(lf),wn=_n();function ff(t){return t&&t.__esModule?t:{default:t}}function df(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var rt="http://www.w3.org/2000/svg",hf=function(){function t(e,n,r){df(this,t),this.svg=e,this.encodings=n,this.options=r,this.document=r.xmlDocument||document}return cf(t,[{key:"render",value:function(){var n=this.options.marginLeft;this.prepareSVG();for(var r=0;r<this.encodings.length;r++){var i=this.encodings[r],o=(0,sf.default)(this.options,i.options),a=this.createGroup(n,o.marginTop,this.svg);this.setGroupOptions(a,o),this.drawSvgBarcode(a,o,i),this.drawSVGText(a,o,i),n+=i.width}}},{key:"prepareSVG",value:function(){for(;this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);(0,wn.calculateEncodingAttributes)(this.encodings,this.options);var n=(0,wn.getTotalWidthOfEncodings)(this.encodings),r=(0,wn.getMaximumHeightOfEncodings)(this.encodings),i=n+this.options.marginLeft+this.options.marginRight;this.setSvgAttributes(i,r),this.options.background&&this.drawRect(0,0,i,r,this.svg).setAttribute("style","fill:"+this.options.background+";")}},{key:"drawSvgBarcode",value:function(n,r,i){var o=i.data,a;r.textPosition=="top"?a=r.fontSize+r.textMargin:a=0;for(var u=0,c=0,s=0;s<o.length;s++)c=s*r.width+i.barcodePadding,o[s]==="1"?u++:u>0&&(this.drawRect(c-r.width*u,a,r.width*u,r.height,n),u=0);u>0&&this.drawRect(c-r.width*(u-1),a,r.width*u,r.height,n)}},{key:"drawSVGText",value:function(n,r,i){var o=this.document.createElementNS(rt,"text");if(r.displayValue){var a,u;o.setAttribute("style","font:"+r.fontOptions+" "+r.fontSize+"px "+r.font),r.textPosition=="top"?u=r.fontSize-r.textMargin:u=r.height+r.textMargin+r.fontSize,r.textAlign=="left"||i.barcodePadding>0?(a=0,o.setAttribute("text-anchor","start")):r.textAlign=="right"?(a=i.width-1,o.setAttribute("text-anchor","end")):(a=i.width/2,o.setAttribute("text-anchor","middle")),o.setAttribute("x",a),o.setAttribute("y",u),o.appendChild(this.document.createTextNode(i.text)),n.appendChild(o)}}},{key:"setSvgAttributes",value:function(n,r){var i=this.svg;i.setAttribute("width",n+"px"),i.setAttribute("height",r+"px"),i.setAttribute("x","0px"),i.setAttribute("y","0px"),i.setAttribute("viewBox","0 0 "+n+" "+r),i.setAttribute("xmlns",rt),i.setAttribute("version","1.1"),i.setAttribute("style","transform: translate(0,0)")}},{key:"createGroup",value:function(n,r,i){var o=this.document.createElementNS(rt,"g");return o.setAttribute("transform","translate("+n+", "+r+")"),i.appendChild(o),o}},{key:"setGroupOptions",value:function(n,r){n.setAttribute("style","fill:"+r.lineColor+";")}},{key:"drawRect",value:function(n,r,i,o,a){var u=this.document.createElementNS(rt,"rect");return u.setAttribute("x",n),u.setAttribute("y",r),u.setAttribute("width",i),u.setAttribute("height",o),a.appendChild(u),u}}]),t}();En.default=hf});var Xi=l(bn=>{"use strict";Object.defineProperty(bn,"__esModule",{value:!0});var gf=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function pf(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var vf=function(){function t(e,n,r){pf(this,t),this.object=e,this.encodings=n,this.options=r}return gf(t,[{key:"render",value:function(){this.object.encodings=this.encodings}}]),t}();bn.default=vf});var Ji=l(On=>{"use strict";Object.defineProperty(On,"__esModule",{value:!0});var _f=$i(),yf=xn(_f),mf=Vi(),wf=xn(mf),Ef=Xi(),bf=xn(Ef);function xn(t){return t&&t.__esModule?t:{default:t}}On.default={CanvasRenderer:yf.default,SVGRenderer:wf.default,ObjectRenderer:bf.default}});var Tn=l(Pe=>{"use strict";Object.defineProperty(Pe,"__esModule",{value:!0});function Sn(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Cn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function An(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var xf=function(t){An(e,t);function e(n,r){Sn(this,e);var i=Cn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.name="InvalidInputException",i.symbology=n,i.input=r,i.message='"'+i.input+'" is not a valid input for '+i.symbology,i}return e}(Error),Of=function(t){An(e,t);function e(){Sn(this,e);var n=Cn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.name="InvalidElementException",n.message="Not supported type to render on",n}return e}(Error),Sf=function(t){An(e,t);function e(){Sn(this,e);var n=Cn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.name="NoElementException",n.message="No element to render on.",n}return e}(Error);Pe.InvalidInputException=xf;Pe.InvalidElementException=Of;Pe.NoElementException=Sf});var Ki=l(Mn=>{"use strict";Object.defineProperty(Mn,"__esModule",{value:!0});var Cf=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Af=Fi(),Rn=Yi(Af),Tf=Ji(),Be=Yi(Tf),Rf=Tn();function Yi(t){return t&&t.__esModule?t:{default:t}}function In(t){if(typeof t=="string")return If(t);if(Array.isArray(t)){for(var e=[],n=0;n<t.length;n++)e.push(In(t[n]));return e}else{if(typeof HTMLCanvasElement<"u"&&t instanceof HTMLImageElement)return Mf(t);if(t&&t.nodeName&&t.nodeName.toLowerCase()==="svg"||typeof SVGElement<"u"&&t instanceof SVGElement)return{element:t,options:(0,Rn.default)(t),renderer:Be.default.SVGRenderer};if(typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement)return{element:t,options:(0,Rn.default)(t),renderer:Be.default.CanvasRenderer};if(t&&t.getContext)return{element:t,renderer:Be.default.CanvasRenderer};if(t&&(typeof t>"u"?"undefined":Cf(t))==="object"&&!t.nodeName)return{element:t,renderer:Be.default.ObjectRenderer};throw new Rf.InvalidElementException}}function If(t){var e=document.querySelectorAll(t);if(e.length!==0){for(var n=[],r=0;r<e.length;r++)n.push(In(e[r]));return n}}function Mf(t){var e=document.createElement("canvas");return{element:e,options:(0,Rn.default)(t),renderer:Be.default.CanvasRenderer,afterRender:function(){t.setAttribute("src",e.toDataURL())}}}Mn.default=In});var Qi=l(Pn=>{"use strict";Object.defineProperty(Pn,"__esModule",{value:!0});var Pf=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function Bf(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Lf=function(){function t(e){Bf(this,t),this.api=e}return Pf(t,[{key:"handleCatch",value:function(n){if(n.name==="InvalidInputException")if(this.api._options.valid!==this.api._defaults.valid)this.api._options.valid(!1);else throw n.message;else throw n;this.api.render=function(){}}},{key:"wrapBarcodeCall",value:function(n){try{var r=n.apply(void 0,arguments);return this.api._options.valid(!0),r}catch(i){return this.handleCatch(i),this.api}}}]),t}();Pn.default=Lf});var oo=l((X0,io)=>{"use strict";var kf=qi(),ee=X(kf),Df=Me(),Le=X(Df),qf=Ni(),Zi=X(qf),Nf=ji(),Wi=X(Nf),jf=Ki(),Uf=X(jf),zf=hn(),Ff=X(zf),Gf=Qi(),Hf=X(Gf),eo=Tn(),$f=pn(),to=X($f);function X(t){return t&&t.__esModule?t:{default:t}}var U=function(){},it=function(e,n,r){var i=new U;if(typeof e>"u")throw Error("No element to render on was provided.");return i._renderProperties=(0,Uf.default)(e),i._encodings=[],i._options=to.default,i._errorHandler=new Hf.default(i),typeof n<"u"&&(r=r||{},r.format||(r.format=ro()),i.options(r)[r.format](n,r).render()),i};it.getModule=function(t){return ee.default[t]};for(Bn in ee.default)ee.default.hasOwnProperty(Bn)&&Vf(ee.default,Bn);var Bn;function Vf(t,e){U.prototype[e]=U.prototype[e.toUpperCase()]=U.prototype[e.toLowerCase()]=function(n,r){var i=this;return i._errorHandler.wrapBarcodeCall(function(){r.text=typeof r.text>"u"?void 0:""+r.text;var o=(0,Le.default)(i._options,r);o=(0,Ff.default)(o);var a=t[e],u=no(n,a,o);return i._encodings.push(u),i})}}function no(t,e,n){t=""+t;var r=new e(t,n);if(!r.valid())throw new eo.InvalidInputException(r.constructor.name,t);var i=r.encode();i=(0,Zi.default)(i);for(var o=0;o<i.length;o++)i[o].options=(0,Le.default)(n,i[o].options);return i}function ro(){return ee.default.CODE128?"CODE128":Object.keys(ee.default)[0]}U.prototype.options=function(t){return this._options=(0,Le.default)(this._options,t),this};U.prototype.blank=function(t){var e=new Array(t+1).join("0");return this._encodings.push({data:e}),this};U.prototype.init=function(){if(this._renderProperties){Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]);var t;for(var e in this._renderProperties){t=this._renderProperties[e];var n=(0,Le.default)(this._options,t.options);n.format=="auto"&&(n.format=ro()),this._errorHandler.wrapBarcodeCall(function(){var r=n.value,i=ee.default[n.format.toUpperCase()],o=no(r,i,n);Ln(t,o,n)})}}};U.prototype.render=function(){if(!this._renderProperties)throw new eo.NoElementException;if(Array.isArray(this._renderProperties))for(var t=0;t<this._renderProperties.length;t++)Ln(this._renderProperties[t],this._encodings,this._options);else Ln(this._renderProperties,this._encodings,this._options);return this};U.prototype._defaults=to.default;function Ln(t,e,n){e=(0,Zi.default)(e);for(var r=0;r<e.length;r++)e[r].options=(0,Le.default)(n,e[r].options),(0,Wi.default)(e[r].options);(0,Wi.default)(n);var i=t.renderer,o=new i(t.element,e,n);o.render(),t.afterRender&&t.afterRender()}typeof window<"u"&&(window.JsBarcode=it);typeof jQuery<"u"&&(jQuery.fn.JsBarcode=function(t,e){var n=[];return jQuery(this).each(function(){n.push(this)}),it(n,t,e)});io.exports=it});var so=jn(jr()),fo=jn(oo());var ao=`:host {
	display: flex;
	flex-direction: column;
	height: 100vh;
	min-height: 100vh;
	box-sizing: border-box;
}

.tabs {
	display: flex;
	justify-content: space-around;
	margin-top: 8px;
}
\r
.tab {\r
	flex: 1;\r
	padding: 0.5em;\r
	text-align: center;\r
	cursor: pointer;\r
	background: #333;\r
	color: #fff;\r
}\r
\r
.toolbar {
	display: flex;
	flex-direction: column;
	flex: 0 0 auto;
	gap: 0.75em;
}

.toolbar + div {
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	min-height: 0;
}

.type-filter {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 6px;\r
}\r
\r
.type-pill {\r
	min-height: 34px;\r
	padding: 0 8px;\r
	background: #efefef;\r
	color: #1f1f1f;\r
	border: 1px solid #d0d0d0;\r
}\r
\r
.type-pill.active {\r
	background: #2f5f8f;\r
	border-color: #2f5f8f;\r
	color: #fff;\r
	font-weight: 700;\r
}\r
\r
.action-row {\r
	display: flex;\r
	gap: 8px;\r
	align-items: center;\r
	margin-top: 0.75em;\r
}\r
\r
.filter-input {\r
	flex: 1;\r
	min-width: 0;\r
	padding: 8px;\r
	border: 1px solid #ccc;\r
	border-radius: 6px;\r
	background: #fff;\r
	color: #111;\r
	min-height: 40px;\r
	box-sizing: border-box;\r
}\r
\r
button {\r
	min-height: 40px;\r
	display: inline-flex;\r
	align-items: center;\r
	justify-content: center;\r
	gap: 6px;\r
	border: none;\r
	border-radius: 6px;\r
	background: #444;\r
	color: white;\r
	cursor: pointer;\r
	font: inherit;\r
	line-height: 1;\r
	box-sizing: border-box;\r
}\r
\r
button:hover {\r
	background: #555;\r
}\r
\r
button ha-icon {\r
	margin-right: 0;\r
}\r
\r
.toolbar button {\r
	flex: 0 0 auto;\r
	padding: 0;\r
}\r
\r
.toolbar .toolbar-icon-button {\r
	width: 40px;\r
	min-width: 40px;\r
	height: 40px;\r
}\r
\r
.tab.active {\r
	background: #555;\r
	font-weight: bold;\r
}\r
\r
.cardlist {
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	gap: 12px;
	min-height: 0;
	overflow-y: auto;
}
\r
.cardlist.grid-view {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	align-content: start;
	align-items: start;
	grid-auto-rows: min-content;
	gap: 8px;
}
\r
.card {\r
	display: flex;\r
	align-items: center;\r
	gap: 10px;\r
	padding: 0.5em;\r
	border: 1px solid #ccc;\r
	cursor: pointer;\r
	min-height: 3.5em;\r
}\r
\r
.grid-view .card {\r
	flex-direction: column;\r
	justify-content: center;\r
	gap: 3px;\r
	min-height: 0;\r
	padding: 6px 4px;\r
}\r
\r
.card-logo-wrap {\r
	flex: 0 0 40px;\r
	width: 40px;\r
	height: 40px;\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
}\r
\r
.card-logo,\r
.card-logo-placeholder {\r
	width: 36px;\r
	height: 36px;\r
	border-radius: 6px;\r
}\r
\r
.card-logo {\r
	object-fit: contain;\r
	background: #fff;\r
	border: 1px solid #ddd;\r
}\r
\r
.card-logo-placeholder {\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
	background: #444;\r
	color: #fff;\r
	font-weight: 700;\r
	font-size: 0.9em;\r
}\r
\r
.grid-view .card-logo-wrap {\r
	flex: 0 0 44px;\r
	width: 44px;\r
	height: 44px;\r
}\r
\r
.grid-view .card-logo,\r
.grid-view .card-logo-placeholder {\r
	width: 42px;\r
	height: 42px;\r
}\r
\r
.card-details {\r
	flex: 1;\r
	min-width: 0;\r
	display: flex;\r
	flex-direction: column;\r
	gap: 3px;\r
}\r
\r
.card-details strong {\r
	overflow: hidden;\r
	text-overflow: ellipsis;\r
	white-space: nowrap;\r
}\r
\r
.item-meta {\r
	display: flex;\r
	align-items: center;\r
	gap: 8px;\r
	min-width: 0;\r
	overflow: hidden;\r
	text-overflow: ellipsis;\r
	white-space: nowrap;\r
}\r
\r
.item-meta span {\r
	display: inline-flex;\r
	align-items: center;\r
	gap: 2px;\r
	min-width: 0;\r
}\r
\r
.grid-view .card-details {\r
	flex: 0 1 auto;\r
	width: 100%;\r
	align-items: center;\r
	gap: 0;\r
}\r
\r
.grid-view .card-details strong {\r
	max-width: 100%;\r
	font-size: 0.68em;\r
	font-weight: 600;\r
	line-height: 1.1;\r
	text-align: center;\r
}\r
\r
.grid-view .card-details small {\r
	display: none;\r
}\r
\r
.card small {\r
	font-size: 0.85em;\r
	color: #bbb;\r
}\r
\r
.popup {\r
	position: fixed;\r
	top: 10%;\r
	left: 50%;\r
	transform: translateX(-50%);\r
	background: white;\r
	padding: 1em;\r
	border: 2px solid #ccc;\r
	z-index: 1000;\r
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);\r
}\r
\r
.popup-header {\r
	display: flex;\r
	align-items: center;\r
	gap: 10px;\r
	padding-right: 28px;\r
}\r
\r
.popup-logo-wrap {\r
	flex: 0 0 48px;\r
	width: 48px;\r
	height: 48px;\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
}\r
\r
.popup-logo,\r
.popup-logo-placeholder {\r
	width: 44px;\r
	height: 44px;\r
}\r
\r
.card-title {\r
	font-weight: bold;\r
	font-size: 1.5em;\r
	color: black;\r
	margin: 0;\r
	min-width: 0;\r
	overflow: hidden;\r
	text-overflow: ellipsis;\r
}\r
\r
.popup-meta {\r
	display: flex;\r
	align-items: center;\r
	gap: 10px;\r
	margin-top: 8px;\r
	color: #444;\r
	font-size: 0.9em;\r
}\r
\r
.popup-meta span {\r
	display: inline-flex;\r
	align-items: center;\r
	gap: 3px;\r
}\r
\r
.popup .code {\r
	margin-top: 12px;\r
	display: flex;\r
	justify-content: center;\r
	align-items: center;\r
}\r
\r
.popup .code canvas {\r
	max-width: 90vw;\r
	height: auto;\r
}\r
\r
.button-group {\r
	display: flex;\r
	justify-content: center;\r
	align-items: center;\r
	gap: 10px;\r
	margin-top: 1em;\r
}\r
\r
.button-group button {\r
	min-height: 40px;\r
	background: #555;\r
	padding: 0 12px;\r
	font-size: 0.95em;\r
}\r
\r
.button-group button:hover {\r
	background: #444;\r
}\r
\r
ha-icon {\r
	vertical-align: middle;\r
	margin-right: 4px;\r
}\r
\r
.no-results {\r
	padding: 1em;\r
	text-align: center;\r
	color: #777;\r
}\r
\r
.dialog-overlay {\r
	position: fixed;\r
	top: 0;\r
	left: 0;\r
	right: 0;\r
	bottom: 0;\r
	background: rgba(0, 0, 0, 0.45);\r
	display: flex;\r
	align-items: center;\r
	justify-content: center;\r
	z-index: 1000;\r
}\r
\r
.dialog-content {\r
	background: #fff;\r
	padding: 1.2em;\r
	border-radius: 10px;\r
	max-width: 360px;\r
	width: 100%;\r
	box-sizing: border-box;\r
	box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);\r
}\r
\r
.popup-form {\r
	display: flex;\r
	flex-direction: column;\r
	gap: 0.8em;\r
}\r
\r
.popup-form input,\r
.popup-form select {\r
	width: 100%;\r
	padding: 10px;\r
	border: 1px solid #ccc;\r
	border-radius: 8px;\r
	box-sizing: border-box;\r
	background: #fff;\r
	color: #111;\r
}\r
\r
.btn-row {\r
	display: flex;\r
	justify-content: flex-end;\r
	align-items: center;\r
	gap: 8px;\r
}\r
\r
.btn-row button {\r
	min-height: 40px;\r
	padding: 0 12px;\r
}\r
\r
.btn-row button:hover {\r
	background: #555;\r
}\r
\r
.btn-row button#cancel-add-btn {\r
	background: #999;\r
}\r
\r
.btn-row button#cancel-add-btn:hover {
	background: #777;
}

.btn-row button.danger-button {
	background: #c62828;
}

.btn-row button.danger-button:hover {
	background: #a61b1b;
}

.close-btn {
	position: absolute;
	top: 8px;\r
	right: 8px;\r
	cursor: pointer;\r
	--mdc-icon-size: 24px;\r
	color: #888;\r
	transition: color 0.2s;\r
}\r
\r
.close-btn:hover {\r
	color: #e00;\r
}\r
`;var Jf=new Set(["EAN","EAN13","EAN8","UPC","ITF","ITF14","MSI","MSI10","MSI11","MSI1010","MSI1110","pharmacode"]),Yf="pk_Svpm4b4MRmC5bvOmTw9jdg",ke="wallet_assistant",Kf={loyalty:"Card",voucher:"Voucher",promotion:"Promo"},ot="wallet-assistant-card",at="barcode",Qf=new Set([at,"qr"]),ut="grid",Wf=new Set([ut,"list"]);window.customCards=window.customCards||[];window.customCards.some(t=>t.type===ot)||window.customCards.push({type:ot,name:"Wallet Assistant",description:"Manage loyalty cards, vouchers, and promotions.",preview:!1,documentationURL:"https://github.com/myTselection/Wallet-Assistant"});function Zf(t,e){let n=String(t??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]/g,"");return Jf.has(e)&&(n=n.replace(/\D/g,"")),n}function y(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function uo(t){return String(t||"?").trim().charAt(0).toUpperCase()||"?"}function co(t,e=64){let n=String(t??"").trim();return n?`https://img.logo.dev/${encodeURIComponent(n)}?token=${Yf}&size=${e}&format=webp&retina=true`:""}function O(t){return t?.item_id}function te(t){return t?.item_type||"loyalty"}function kn(t){return Kf[te(t)]||"Item"}function ho(t){return Qf.has(t)?t:at}function ed(t){return Wf.has(t)?t:ut}function lo(t){if(!t)return"";let e=new Date(`${t}T00:00:00`);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}function D(t){return{...t,item_id:O(t),item_type:te(t),format:t.format||"CODE128",default_view:ho(t.default_view),code:t.code||"",expires_on:t.expires_on||""}}function Dn(t,e,n,r={},i=null){let o=Zf(e,n);if(t instanceof HTMLCanvasElement){let a=t.getContext("2d");a&&a.clearRect(0,0,t.width,t.height)}else for(;t.firstChild;)t.removeChild(t.firstChild);i&&(i.style.display="none");try{return(0,fo.default)(t,o,{format:n,width:5,height:80,...r}),{ok:!0}}catch(a){let u=`Invalid input for ${n}.`+(a?.message?` (${a.message})`:"");if(i)i.textContent=u,i.style.display="block";else if(t&&t.parentElement){let c=document.createElement("div");c.className="error",c.style.cssText="color:red;font-size:0.9em;",c.textContent=u,t.replaceWith(c)}return{ok:!1,message:u}}}var qn=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.viewModes={},this.selectedCard=null,this.activeTab="own",this.activeType="all",this._inputState={name:"",code:"",logo_slug:"",item_type:"loyalty",expires_on:""},this.toolbarContainer=document.createElement("div"),this.toolbarContainer.className="toolbar",this.dynamicContainer=document.createElement("div"),this.filterText="",this.showAddDialog=!1,this.cardViewMode=ut;let e=document.createElement("style");e.textContent=ao,this.shadowRoot.appendChild(e),this.shadowRoot.appendChild(this.toolbarContainer),this.shadowRoot.appendChild(this.dynamicContainer),this.toolbarContainer.innerHTML=`
      <div class="tabs">
        <div class="tab active" id="tab-own">My Items</div>
        <div class="tab" id="tab-others">Others' Items</div>
      </div>
      <div class="type-filter">
        <button class="type-pill active" id="type-all" type="button">All</button>
        <button class="type-pill" id="type-loyalty" type="button">Cards</button>
        <button class="type-pill" id="type-voucher" type="button">Vouchers</button>
      </div>
      <div class="action-row">
        <input id="filter" class="filter-input" placeholder="Filter items..." value="" />
        <button id="toggle-card-view" class="toolbar-icon-button" title="List view" aria-label="List view"><ha-icon icon="mdi:view-list"></ha-icon></button>
        <button id="add-card" class="toolbar-icon-button" title="Add item"><ha-icon icon="mdi:plus"></ha-icon></button>
      </div>
    `,this.toolbarContainer.querySelector("#filter")?.addEventListener("input",n=>{this.filterText=n.target.value,this.render()}),this.toolbarContainer.querySelector("#add-card")?.addEventListener("click",()=>{this.showAddDialog=!0,this.render()}),this.toolbarContainer.querySelector("#toggle-card-view")?.addEventListener("click",()=>{this.cardViewMode=this.cardViewMode==="list"?"grid":"list",this.render()}),this.toolbarContainer.querySelector("#tab-own")?.addEventListener("click",()=>{this.activeTab="own",this.render()}),this.toolbarContainer.querySelector("#tab-others")?.addEventListener("click",()=>{this.activeTab="others",this.render()}),["all","loyalty","voucher"].forEach(n=>{this.toolbarContainer.querySelector(`#type-${n}`)?.addEventListener("click",()=>{this.activeType=n,this.render()})})}setConfig(e){this._config=e,this.cardViewMode=ed(e?.card_view_mode)}static getStubConfig(){return{card_view_mode:ut}}set hass(e){this._hass=e,this.loadCards()}async loadCards(){let e=this.shadowRoot.getElementById("add-name")||this.shadowRoot.getElementById("name"),n=this.shadowRoot.getElementById("add-code")||this.shadowRoot.getElementById("code"),r=this.shadowRoot.getElementById("add-logo-slug")||this.shadowRoot.getElementById("logo-slug"),i=this.shadowRoot.getElementById("add-type"),o=this.shadowRoot.getElementById("add-expires-on"),a=this.shadowRoot.activeElement?.id||document.activeElement?.id;(e||n||r||i||o)&&(this._inputState.name=e?.value||"",this._inputState.code=n?.value||"",this._inputState.logo_slug=r?.value||"",this._inputState.item_type=i?.value||"loyalty",this._inputState.expires_on=o?.value||"",this._inputState.focusId=a);let u=await this._hass.callApi("get",ke),c=this._hass.user.id,s=u.map(D);this.ownCards=s.filter(f=>f.user_id===c),this.otherCards=s.filter(f=>f.user_id!==c),this.render()}async toggleCodeType(e){let n=this.selectedCard||[...this.ownCards,...this.otherCards].find(i=>O(i)===e),r=(this.viewModes[e]||n?.default_view||at)==="barcode"?"qr":"barcode";if(this.viewModes[e]=r,n){let i=D({...n,default_view:r});this.ownCards=this.ownCards.map(o=>O(o)===e?D({...o,default_view:r}):o),this.otherCards=this.otherCards.map(o=>O(o)===e?D({...o,default_view:r}):o),this.selectedCard&&O(this.selectedCard)===e&&(this.selectedCard=i)}if(this.render(),!(!n||n.user_id!==this._hass.user.id))try{let i=await this._hass.callApi("put",`${ke}/${e}`,{default_view:r}),o=D({...n,...i||{},default_view:r});this.ownCards=this.ownCards.map(a=>O(a)===e?D({...a,...o}):a),this.selectedCard&&O(this.selectedCard)===e&&(this.selectedCard=D({...this.selectedCard,...o}))}catch(i){console.error("Unable to save Wallet Assistant default view:",i)}}openCard(e){this.selectedCard=[...this.ownCards,...this.otherCards].find(n=>O(n)===e),this.selectedCard&&!this.viewModes[e]&&(this.viewModes[e]=this.selectedCard.default_view),this.render()}closeCard(){this.selectedCard=null,this.render()}async addCard(e){e.preventDefault();let n=this.shadowRoot.getElementById("add-name")||this.shadowRoot.getElementById("name"),r=this.shadowRoot.getElementById("add-code")||this.shadowRoot.getElementById("code"),i=this.shadowRoot.getElementById("add-logo-slug")||this.shadowRoot.getElementById("logo-slug"),o=this.shadowRoot.getElementById("add-type"),a=this.shadowRoot.getElementById("add-expires-on"),u=n?.value?.trim(),c=r?.value?.trim(),s=i?.value?.trim()||"",f=o?.value||"loyalty",v=a?.value||"";if(!u||!c)return alert("Missing fields");await this._hass.callApi("post",ke,{name:u,code:c,logo_slug:s,owner:this._hass.user.name,user_id:this._hass.user.id,item_type:f,expires_on:f==="voucher"?v:"",format:"CODE128",default_view:at}),this._inputState={name:"",code:"",logo_slug:"",item_type:"loyalty",expires_on:""},n&&(n.value=""),r&&(r.value=""),i&&(i.value=""),o&&(o.value="loyalty"),a&&(a.value=""),this.showAddDialog=!1,this.loadCards()}closeAddDialog(){this.showAddDialog=!1,this.render()}async deleteCard(e){await this._hass.callApi("delete",`${ke}/${O(e)}`,{user_id:e.user_id}),this.closeCard(),this.loadCards()}async updateCard(e){let n=["CODE128","CODE128A","CODE128B","CODE128C","EAN13","EAN8","UPC","CODE39","ITF14","ITF","MSI","MSI10","MSI11","MSI1010","MSI1110","pharmacode","codabar","CODE93"],r=document.createElement("div");r.className="edit-dialog",r.innerHTML=`
      <div class="dialog-content">
        <label>Name</label>
        <input id="edit-name" type="text" value="${y(e.name)}" />
        <label>Barcode number</label>
        <input id="edit-code" type="text" value="${y(e.code)}" />
        <label>Logo.dev slug</label>
        <input id="edit-logo-slug" type="text" value="${y(e.logo_slug||"")}" placeholder="example.com" />
        <label>Type</label>
        <select id="edit-type">
          <option value="loyalty" ${te(e)==="loyalty"?"selected":""}>Loyalty card</option>
          <option value="voucher" ${te(e)==="voucher"?"selected":""}>Voucher</option>
          <option value="promotion" ${te(e)==="promotion"?"selected":""}>Promotion</option>
        </select>
        <label>Expiry date</label>
        <input id="edit-expires-on" type="date" value="${y(e.expires_on||"")}" />
        <label>Default barcode format</label>
        <select id="edit-format">
          ${n.map(m=>`<option value="${m}" ${m===(e.format||"CODE128")?"selected":""}>${m}</option>`).join("")}
        </select>

        <div id="preview-wrap" style="margin-top:10px; text-align:center;">
          <canvas id="preview-canvas"></canvas>
          <div id="preview-error" style="color:red; font-size:0.9em; display:none;"></div>
        </div>

        <div class="btn-row">
          <button id="delete-btn" class="danger-button"><ha-icon icon="mdi:delete"></ha-icon> Delete</button>
          <button id="save-btn"><ha-icon icon="mdi:content-save"></ha-icon> Save</button>
          <button id="cancel-btn"><ha-icon icon="mdi:close"></ha-icon> Cancel</button>
        </div>
      </div>
    `,r.style.cssText=`
      position: fixed; top:0; left:0; right:0; bottom:0;
      background:rgba(0,0,0,0.4);
      display:flex; align-items:center; justify-content:center;
      z-index:1000;
    `,r.querySelector(".dialog-content").style.cssText=`
      background:#fff; padding:1em; border-radius:8px; width:320px; max-width:90vw;
      display:flex; flex-direction:column; gap:0.5em;
    `,this.shadowRoot.appendChild(r);let i=r.querySelector("#edit-name"),o=r.querySelector("#edit-code"),a=r.querySelector("#edit-logo-slug"),u=r.querySelector("#edit-type"),c=r.querySelector("#edit-expires-on"),s=r.querySelector("#edit-format"),f=r.querySelector("#preview-canvas"),v=r.querySelector("#preview-error"),h=()=>{let m=s.value,C=o?.value?.trim()||e.code;Dn(f,C,m,{width:2,height:60},v)};s.addEventListener("change",h),o?.addEventListener("input",h),h(),r.querySelector("#cancel-btn").addEventListener("click",()=>r.remove()),r.querySelector("#delete-btn").addEventListener("click",async()=>{r.remove(),await this.deleteCard(e)}),r.querySelector("#save-btn").addEventListener("click",async()=>{let m=i.value,C=r.querySelector("#edit-code").value,A=a.value.trim(),L=u.value,q=c.value,J=s.value,d=await this._hass.callApi("put",`${ke}/${O(e)}`,{user_id:e.user_id,name:m,code:C,logo_slug:A,item_type:L,expires_on:L==="voucher"?q:"",format:J}),S={name:m,code:C,logo_slug:A,item_type:L,expires_on:L==="voucher"?q:"",format:J,...d||{}};if(this.ownCards=this.ownCards.map(g=>O(g)===O(e)?D({...g,...S}):g),this.otherCards=this.otherCards.map(g=>O(g)===O(e)?D({...g,...S}):g),this.selectedCard&&O(this.selectedCard)===O(e)){this.selectedCard=D({...this.selectedCard,...S});let g=this.dynamicContainer.querySelector("#code-preview");if(g){let x=document.createElement("canvas");g.innerHTML="",g.appendChild(x);let Y=this.selectedCard.format||"CODE128";Dn(x,this.selectedCard.code,Y)}let w=this.dynamicContainer.querySelector(".card-title");w&&(w.textContent=this.selectedCard.name)}r.remove(),this.render()})}render(){let e=this.dynamicContainer.querySelector(".cardlist"),n=e?e.scrollTop:0,r=this.shadowRoot.activeElement,i=r?.id,o=r?.selectionStart,a=r?.selectionEnd,u=this.activeTab==="own"?this.ownCards:this.otherCards,c=(this.filterText||"").trim().toLowerCase(),s=this.activeType==="all"?u:u.filter(d=>te(d)===this.activeType),f=c?s.filter(d=>d.name.toLowerCase().includes(c)||String(d.owner||"").toLowerCase().includes(c)||kn(d).toLowerCase().includes(c)):s,v=this.toolbarContainer.querySelector("#filter"),h=this.toolbarContainer.querySelector("#toggle-card-view"),m=this.toolbarContainer.querySelector("#tab-own"),C=this.toolbarContainer.querySelector("#tab-others");if(v&&(v.value=this.filterText),h){let d=this.cardViewMode==="grid";h.title=d?"List view":"Grid view",h.setAttribute("aria-label",h.title),h.innerHTML=`<ha-icon icon="${d?"mdi:view-list":"mdi:view-grid"}"></ha-icon>`}m&&m.classList.toggle("active",this.activeTab==="own"),C&&C.classList.toggle("active",this.activeTab==="others"),["all","loyalty","voucher"].forEach(d=>{this.toolbarContainer.querySelector(`#type-${d}`)?.classList.toggle("active",this.activeType===d)});let A=this.selectedCard?co(this.selectedCard.logo_slug,96):"",L=this.selectedCard?uo(this.selectedCard.name):"",q=this.selectedCard?.expires_on?lo(this.selectedCard.expires_on):"";if(this.dynamicContainer.innerHTML=`
      <div class="cardlist ${this.cardViewMode==="grid"?"grid-view":"list-view"}">
        ${f.length?f.map(d=>{let S=co(d.logo_slug,64),g=uo(d.name),w=kn(d),x=d.expires_on?lo(d.expires_on):"";return`
          <div class="card ${te(d)}" data-card-id="${y(O(d))}" title="${y(d.name)}">
            <div class="card-logo-wrap">
              ${S?`<img class="card-logo" src="${y(S)}" alt="" data-initial="${y(g)}" loading="lazy" />`:`<div class="card-logo-placeholder">${y(g)}</div>`}
            </div>
            <div class="card-details">
              <strong>${y(d.name)}</strong>
              <small class="item-meta">
                <span>${y(w)}</span>
                ${x?`<span class="expiry"><ha-icon icon="mdi:calendar-clock"></ha-icon>${y(x)}</span>`:""}
                ${this.activeTab==="others"?`<span><ha-icon icon="mdi:account"></ha-icon>${y(d.owner)}</span>`:""}
              </small>
            </div>
          </div>
        `}).join(""):'<div class="no-results">No matching items</div>'}
      </div>
      ${this.selectedCard?`
        <div class="popup">
          <div class="popup-header">
            <div class="popup-logo-wrap">
              ${A?`<img class="card-logo popup-logo" src="${y(A)}" alt="" data-initial="${y(L)}" loading="lazy" />`:`<div class="card-logo-placeholder popup-logo-placeholder">${y(L)}</div>`}
            </div>
            <h3 class="card-title">${y(this.selectedCard.name)}</h3>
          </div>
          <div class="popup-meta">
            <span>${y(kn(this.selectedCard))}</span>
            ${q?`<span><ha-icon icon="mdi:calendar-clock"></ha-icon>${y(q)}</span>`:""}
          </div>
          <div class="code" id="code-preview"></div>
          <div class="button-group">
            <button id="toggle-code"><ha-icon icon="mdi:cached"></ha-icon> QR/Barcode</button>
            ${this.selectedCard.user_id===this._hass.user.id?`
              <button id="edit"><ha-icon icon="mdi:pencil"></ha-icon> Edit</button>
            `:""}
          </div>
          <ha-icon icon="mdi:close" class="close-btn" id="close" title="Close"></ha-icon>
        </div>
      `:""}
      ${this.showAddDialog?`
        <div class="dialog-overlay" id="add-dialog">
          <div class="dialog-content">
            <h3>Add new item</h3>
            <form id="add-card-form" class="popup-form">
              <input id="add-name" placeholder="Name" value="${y(this._inputState.name||"")}" />
              <input id="add-code" placeholder="Code" value="${y(this._inputState.code||"")}" />
              <input id="add-logo-slug" placeholder="Logo.dev slug (optional)" value="${y(this._inputState.logo_slug||"")}" />
              <select id="add-type">
                <option value="loyalty" ${(this._inputState.item_type||"loyalty")==="loyalty"?"selected":""}>Loyalty card</option>
                <option value="voucher" ${this._inputState.item_type==="voucher"?"selected":""}>Voucher</option>
                <option value="promotion" ${this._inputState.item_type==="promotion"?"selected":""}>Promotion</option>
              </select>
              <input id="add-expires-on" type="date" value="${y(this._inputState.expires_on||"")}" />
              <div class="btn-row">
                <button type="submit" id="save-btn"><ha-icon icon="mdi:content-save"></ha-icon> Save</button>
                <button type="button" id="cancel-add-btn"><ha-icon icon="mdi:close"></ha-icon> Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `:""}
    `,this.dynamicContainer.querySelectorAll("[data-card-id]").forEach(d=>d.addEventListener("click",()=>this.openCard(d.getAttribute("data-card-id")))),this.dynamicContainer.querySelectorAll(".card-logo").forEach(d=>d.addEventListener("error",()=>{let S=document.createElement("div");S.className=d.classList.contains("popup-logo")?"card-logo-placeholder popup-logo-placeholder":"card-logo-placeholder",S.textContent=d.dataset.initial||"?",d.replaceWith(S)})),this.showAddDialog){this.dynamicContainer.querySelector("#add-card-form")?.addEventListener("submit",this.addCard.bind(this)),this.dynamicContainer.querySelector("#cancel-add-btn")?.addEventListener("click",()=>this.closeAddDialog());let S=this.shadowRoot.getElementById("add-name"),g=this.shadowRoot.getElementById("add-code"),w=this.shadowRoot.getElementById("add-logo-slug"),x=this.shadowRoot.getElementById("add-type"),Y=this.shadowRoot.getElementById("add-expires-on");S?.addEventListener("input",N=>{this._inputState.name=N.target.value}),g?.addEventListener("input",N=>{this._inputState.code=N.target.value}),w?.addEventListener("input",N=>{this._inputState.logo_slug=N.target.value}),x?.addEventListener("change",N=>{this._inputState.item_type=N.target.value}),Y?.addEventListener("input",N=>{this._inputState.expires_on=N.target.value})}if(this.selectedCard){let d=O(this.selectedCard),S=ho(this.viewModes[d]||this.selectedCard.default_view),g=this.dynamicContainer.querySelector("#code-preview");if(g.innerHTML="",S==="qr"){let w=document.createElement("canvas");g.appendChild(w),so.default.toCanvas(w,this.selectedCard.code,{width:160,margin:1},x=>{x&&console.error("QR generation error:",x)})}else{let w=document.createElement("canvas");g.appendChild(w);let x=this.selectedCard.format||"CODE128";Dn(w,this.selectedCard.code,x)}this.dynamicContainer.querySelector("#toggle-code")?.addEventListener("click",()=>this.toggleCodeType(d)),this.dynamicContainer.querySelector("#close")?.addEventListener("click",()=>this.closeCard()),this.selectedCard.user_id===this._hass.user.id&&this.dynamicContainer.querySelector("#edit")?.addEventListener("click",()=>this.updateCard(this.selectedCard))}let J=this.dynamicContainer.querySelector(".cardlist");J&&(J.scrollTop=n),i==="filter"&&v&&(v.focus(),typeof o=="number"&&typeof a=="number"&&v.setSelectionRange(o,a))}};customElements.get(ot)||customElements.define(ot,qn);
