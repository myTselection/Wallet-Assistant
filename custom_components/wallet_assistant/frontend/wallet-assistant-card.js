var yo=Object.create;var jn=Object.defineProperty;var mo=Object.getOwnPropertyDescriptor;var wo=Object.getOwnPropertyNames;var Eo=Object.getPrototypeOf,bo=Object.prototype.hasOwnProperty;var c=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var xo=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of wo(e))!bo.call(t,i)&&i!==n&&jn(t,i,{get:()=>e[i],enumerable:!(r=mo(e,i))||r.enumerable});return t};var Un=(t,e,n)=>(n=t!=null?yo(Eo(t)):{},xo(e||!t||!t.__esModule?jn(n,"default",{value:t,enumerable:!0}):n,t));var zn=c((ud,Fn)=>{Fn.exports=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}});var H=c(Q=>{var ct,Oo=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];Q.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};Q.getSymbolTotalCodewords=function(e){return Oo[e]};Q.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e};Q.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');ct=e};Q.isKanjiModeEnabled=function(){return typeof ct<"u"};Q.toSJIS=function(e){return ct(e)}});var De=c(I=>{I.L={bit:1};I.M={bit:0};I.Q={bit:3};I.H={bit:2};function So(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return I.L;case"m":case"medium":return I.M;case"q":case"quartile":return I.Q;case"h":case"high":return I.H;default:throw new Error("Unknown EC Level: "+t)}}I.isValid=function(e){return e&&typeof e.bit<"u"&&e.bit>=0&&e.bit<4};I.from=function(e,n){if(I.isValid(e))return e;try{return So(e)}catch{return n}}});var $n=c((sd,Gn)=>{function Hn(){this.buffer=[],this.length=0}Hn.prototype={get:function(t){let e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let n=0;n<e;n++)this.putBit((t>>>e-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){let e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};Gn.exports=Hn});var Xn=c((fd,Vn)=>{function _e(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}_e.prototype.set=function(t,e,n,r){let i=t*this.size+e;this.data[i]=n,r&&(this.reservedBit[i]=!0)};_e.prototype.get=function(t,e){return this.data[t*this.size+e]};_e.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n};_e.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};Vn.exports=_e});var Yn=c(qe=>{var Co=H().getSymbolSize;qe.getRowColCoords=function(e){if(e===1)return[];let n=Math.floor(e/7)+2,r=Co(e),i=r===145?26:Math.ceil((r-13)/(2*n-2))*2,o=[r-7];for(let a=1;a<n-1;a++)o[a]=o[a-1]-i;return o.push(6),o.reverse()};qe.getPositions=function(e){let n=[],r=qe.getRowColCoords(e),i=r.length;for(let o=0;o<i;o++)for(let a=0;a<i;a++)o===0&&a===0||o===0&&a===i-1||o===i-1&&a===0||n.push([r[o],r[a]]);return n}});var Qn=c(Kn=>{var Ao=H().getSymbolSize,Jn=7;Kn.getPositions=function(e){let n=Ao(e);return[[0,0],[n-Jn,0],[0,n-Jn]]}});var Wn=c(p=>{p.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var W={N1:3,N2:3,N3:40,N4:10};p.isValid=function(e){return e!=null&&e!==""&&!isNaN(e)&&e>=0&&e<=7};p.from=function(e){return p.isValid(e)?parseInt(e,10):void 0};p.getPenaltyN1=function(e){let n=e.size,r=0,i=0,o=0,a=null,u=null;for(let l=0;l<n;l++){i=o=0,a=u=null;for(let f=0;f<n;f++){let d=e.get(l,f);d===a?i++:(i>=5&&(r+=W.N1+(i-5)),a=d,i=1),d=e.get(f,l),d===u?o++:(o>=5&&(r+=W.N1+(o-5)),u=d,o=1)}i>=5&&(r+=W.N1+(i-5)),o>=5&&(r+=W.N1+(o-5))}return r};p.getPenaltyN2=function(e){let n=e.size,r=0;for(let i=0;i<n-1;i++)for(let o=0;o<n-1;o++){let a=e.get(i,o)+e.get(i,o+1)+e.get(i+1,o)+e.get(i+1,o+1);(a===4||a===0)&&r++}return r*W.N2};p.getPenaltyN3=function(e){let n=e.size,r=0,i=0,o=0;for(let a=0;a<n;a++){i=o=0;for(let u=0;u<n;u++)i=i<<1&2047|e.get(a,u),u>=10&&(i===1488||i===93)&&r++,o=o<<1&2047|e.get(u,a),u>=10&&(o===1488||o===93)&&r++}return r*W.N3};p.getPenaltyN4=function(e){let n=0,r=e.data.length;for(let o=0;o<r;o++)n+=e.data[o];return Math.abs(Math.ceil(n*100/r/5)-10)*W.N4};function To(t,e,n){switch(t){case p.Patterns.PATTERN000:return(e+n)%2===0;case p.Patterns.PATTERN001:return e%2===0;case p.Patterns.PATTERN010:return n%3===0;case p.Patterns.PATTERN011:return(e+n)%3===0;case p.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2===0;case p.Patterns.PATTERN101:return e*n%2+e*n%3===0;case p.Patterns.PATTERN110:return(e*n%2+e*n%3)%2===0;case p.Patterns.PATTERN111:return(e*n%3+(e+n)%2)%2===0;default:throw new Error("bad maskPattern:"+t)}}p.applyMask=function(e,n){let r=n.size;for(let i=0;i<r;i++)for(let o=0;o<r;o++)n.isReserved(o,i)||n.xor(o,i,To(e,o,i))};p.getBestMask=function(e,n){let r=Object.keys(p.Patterns).length,i=0,o=1/0;for(let a=0;a<r;a++){n(a),p.applyMask(a,e);let u=p.getPenaltyN1(e)+p.getPenaltyN2(e)+p.getPenaltyN3(e)+p.getPenaltyN4(e);p.applyMask(a,e),u<o&&(o=u,i=a)}return i}});var ft=c(st=>{var G=De(),je=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Ue=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];st.getBlocksCount=function(e,n){switch(n){case G.L:return je[(e-1)*4+0];case G.M:return je[(e-1)*4+1];case G.Q:return je[(e-1)*4+2];case G.H:return je[(e-1)*4+3];default:return}};st.getTotalCodewordsCount=function(e,n){switch(n){case G.L:return Ue[(e-1)*4+0];case G.M:return Ue[(e-1)*4+1];case G.Q:return Ue[(e-1)*4+2];case G.H:return Ue[(e-1)*4+3];default:return}}});var Zn=c(ze=>{var ye=new Uint8Array(512),Fe=new Uint8Array(256);(function(){let e=1;for(let n=0;n<255;n++)ye[n]=e,Fe[e]=n,e<<=1,e&256&&(e^=285);for(let n=255;n<512;n++)ye[n]=ye[n-255]})();ze.log=function(e){if(e<1)throw new Error("log("+e+")");return Fe[e]};ze.exp=function(e){return ye[e]};ze.mul=function(e,n){return e===0||n===0?0:ye[Fe[e]+Fe[n]]}});var er=c(me=>{var dt=Zn();me.mul=function(e,n){let r=new Uint8Array(e.length+n.length-1);for(let i=0;i<e.length;i++)for(let o=0;o<n.length;o++)r[i+o]^=dt.mul(e[i],n[o]);return r};me.mod=function(e,n){let r=new Uint8Array(e);for(;r.length-n.length>=0;){let i=r[0];for(let a=0;a<n.length;a++)r[a]^=dt.mul(n[a],i);let o=0;for(;o<r.length&&r[o]===0;)o++;r=r.slice(o)}return r};me.generateECPolynomial=function(e){let n=new Uint8Array([1]);for(let r=0;r<e;r++)n=me.mul(n,new Uint8Array([1,dt.exp(r)]));return n}});var rr=c((yd,nr)=>{var tr=er();function ht(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}ht.prototype.initialize=function(e){this.degree=e,this.genPoly=tr.generateECPolynomial(this.degree)};ht.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");let n=new Uint8Array(e.length+this.degree);n.set(e);let r=tr.mod(n,this.genPoly),i=this.degree-r.length;if(i>0){let o=new Uint8Array(this.degree);return o.set(r,i),o}return r};nr.exports=ht});var gt=c(ir=>{ir.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}});var pt=c(U=>{var or="[0-9]+",Ro="[A-Z $%*+\\-./:]+",we="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";we=we.replace(/u/g,"\\u");var Io="(?:(?![A-Z0-9 $%*+\\-./:]|"+we+`)(?:.|[\r
]))+`;U.KANJI=new RegExp(we,"g");U.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");U.BYTE=new RegExp(Io,"g");U.NUMERIC=new RegExp(or,"g");U.ALPHANUMERIC=new RegExp(Ro,"g");var Mo=new RegExp("^"+we+"$"),Po=new RegExp("^"+or+"$"),Bo=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");U.testKanji=function(e){return Mo.test(e)};U.testNumeric=function(e){return Po.test(e)};U.testAlphanumeric=function(e){return Bo.test(e)}});var $=c(b=>{var Lo=gt(),vt=pt();b.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]};b.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]};b.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]};b.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]};b.MIXED={bit:-1};b.getCharCountIndicator=function(e,n){if(!e.ccBits)throw new Error("Invalid mode: "+e);if(!Lo.isValid(n))throw new Error("Invalid version: "+n);return n>=1&&n<10?e.ccBits[0]:n<27?e.ccBits[1]:e.ccBits[2]};b.getBestModeForData=function(e){return vt.testNumeric(e)?b.NUMERIC:vt.testAlphanumeric(e)?b.ALPHANUMERIC:vt.testKanji(e)?b.KANJI:b.BYTE};b.toString=function(e){if(e&&e.id)return e.id;throw new Error("Invalid mode")};b.isValid=function(e){return e&&e.bit&&e.ccBits};function ko(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return b.NUMERIC;case"alphanumeric":return b.ALPHANUMERIC;case"kanji":return b.KANJI;case"byte":return b.BYTE;default:throw new Error("Unknown mode: "+t)}}b.from=function(e,n){if(b.isValid(e))return e;try{return ko(e)}catch{return n}}});var sr=c(Z=>{var He=H(),No=ft(),ar=De(),V=$(),_t=gt(),lr=7973,ur=He.getBCHDigit(lr);function Do(t,e,n){for(let r=1;r<=40;r++)if(e<=Z.getCapacity(r,n,t))return r}function cr(t,e){return V.getCharCountIndicator(t,e)+4}function qo(t,e){let n=0;return t.forEach(function(r){let i=cr(r.mode,e);n+=i+r.getBitsLength()}),n}function jo(t,e){for(let n=1;n<=40;n++)if(qo(t,n)<=Z.getCapacity(n,e,V.MIXED))return n}Z.from=function(e,n){return _t.isValid(e)?parseInt(e,10):n};Z.getCapacity=function(e,n,r){if(!_t.isValid(e))throw new Error("Invalid QR Code version");typeof r>"u"&&(r=V.BYTE);let i=He.getSymbolTotalCodewords(e),o=No.getTotalCodewordsCount(e,n),a=(i-o)*8;if(r===V.MIXED)return a;let u=a-cr(r,e);switch(r){case V.NUMERIC:return Math.floor(u/10*3);case V.ALPHANUMERIC:return Math.floor(u/11*2);case V.KANJI:return Math.floor(u/13);case V.BYTE:default:return Math.floor(u/8)}};Z.getBestVersionForData=function(e,n){let r,i=ar.from(n,ar.M);if(Array.isArray(e)){if(e.length>1)return jo(e,i);if(e.length===0)return 1;r=e[0]}else r=e;return Do(r.mode,r.getLength(),i)};Z.getEncodedBits=function(e){if(!_t.isValid(e)||e<7)throw new Error("Invalid QR Code version");let n=e<<12;for(;He.getBCHDigit(n)-ur>=0;)n^=lr<<He.getBCHDigit(n)-ur;return e<<12|n}});var gr=c(hr=>{var yt=H(),dr=1335,Uo=21522,fr=yt.getBCHDigit(dr);hr.getEncodedBits=function(e,n){let r=e.bit<<3|n,i=r<<10;for(;yt.getBCHDigit(i)-fr>=0;)i^=dr<<yt.getBCHDigit(i)-fr;return(r<<10|i)^Uo}});var vr=c((Od,pr)=>{var Fo=$();function re(t){this.mode=Fo.NUMERIC,this.data=t.toString()}re.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};re.prototype.getLength=function(){return this.data.length};re.prototype.getBitsLength=function(){return re.getBitsLength(this.data.length)};re.prototype.write=function(e){let n,r,i;for(n=0;n+3<=this.data.length;n+=3)r=this.data.substr(n,3),i=parseInt(r,10),e.put(i,10);let o=this.data.length-n;o>0&&(r=this.data.substr(n),i=parseInt(r,10),e.put(i,o*3+1))};pr.exports=re});var yr=c((Sd,_r)=>{var zo=$(),mt=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function ie(t){this.mode=zo.ALPHANUMERIC,this.data=t}ie.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};ie.prototype.getLength=function(){return this.data.length};ie.prototype.getBitsLength=function(){return ie.getBitsLength(this.data.length)};ie.prototype.write=function(e){let n;for(n=0;n+2<=this.data.length;n+=2){let r=mt.indexOf(this.data[n])*45;r+=mt.indexOf(this.data[n+1]),e.put(r,11)}this.data.length%2&&e.put(mt.indexOf(this.data[n]),6)};_r.exports=ie});var wr=c((Cd,mr)=>{var Ho=$();function oe(t){this.mode=Ho.BYTE,typeof t=="string"?this.data=new TextEncoder().encode(t):this.data=new Uint8Array(t)}oe.getBitsLength=function(e){return e*8};oe.prototype.getLength=function(){return this.data.length};oe.prototype.getBitsLength=function(){return oe.getBitsLength(this.data.length)};oe.prototype.write=function(t){for(let e=0,n=this.data.length;e<n;e++)t.put(this.data[e],8)};mr.exports=oe});var br=c((Ad,Er)=>{var Go=$(),$o=H();function ae(t){this.mode=Go.KANJI,this.data=t}ae.getBitsLength=function(e){return e*13};ae.prototype.getLength=function(){return this.data.length};ae.prototype.getBitsLength=function(){return ae.getBitsLength(this.data.length)};ae.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let n=$o.toSJIS(this.data[e]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),t.put(n,13)}};Er.exports=ae});var xr=c((Td,wt)=>{"use strict";var Ee={single_source_shortest_paths:function(t,e,n){var r={},i={};i[e]=0;var o=Ee.PriorityQueue.make();o.push(e,0);for(var a,u,l,f,d,m,h,v,w;!o.empty();){a=o.pop(),u=a.value,f=a.cost,d=t[u]||{};for(l in d)d.hasOwnProperty(l)&&(m=d[l],h=f+m,v=i[l],w=typeof i[l]>"u",(w||v>h)&&(i[l]=h,o.push(l,h),r[l]=u))}if(typeof n<"u"&&typeof i[n]>"u"){var S=["Could not find a path from ",e," to ",n,"."].join("");throw new Error(S)}return r},extract_shortest_path_from_predecessor_list:function(t,e){for(var n=[],r=e,i;r;)n.push(r),i=t[r],r=t[r];return n.reverse(),n},find_path:function(t,e,n){var r=Ee.single_source_shortest_paths(t,e,n);return Ee.extract_shortest_path_from_predecessor_list(r,n)},PriorityQueue:{make:function(t){var e=Ee.PriorityQueue,n={},r;t=t||{};for(r in e)e.hasOwnProperty(r)&&(n[r]=e[r]);return n.queue=[],n.sorter=t.sorter||e.default_sorter,n},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){var n={value:t,cost:e};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};typeof wt<"u"&&(wt.exports=Ee)});var Mr=c(ue=>{var g=$(),Cr=vr(),Ar=yr(),Tr=wr(),Rr=br(),be=pt(),Ge=H(),Vo=xr();function Or(t){return unescape(encodeURIComponent(t)).length}function xe(t,e,n){let r=[],i;for(;(i=t.exec(n))!==null;)r.push({data:i[0],index:i.index,mode:e,length:i[0].length});return r}function Ir(t){let e=xe(be.NUMERIC,g.NUMERIC,t),n=xe(be.ALPHANUMERIC,g.ALPHANUMERIC,t),r,i;return Ge.isKanjiModeEnabled()?(r=xe(be.BYTE,g.BYTE,t),i=xe(be.KANJI,g.KANJI,t)):(r=xe(be.BYTE_KANJI,g.BYTE,t),i=[]),e.concat(n,r,i).sort(function(a,u){return a.index-u.index}).map(function(a){return{data:a.data,mode:a.mode,length:a.length}})}function Et(t,e){switch(e){case g.NUMERIC:return Cr.getBitsLength(t);case g.ALPHANUMERIC:return Ar.getBitsLength(t);case g.KANJI:return Rr.getBitsLength(t);case g.BYTE:return Tr.getBitsLength(t)}}function Xo(t){return t.reduce(function(e,n){let r=e.length-1>=0?e[e.length-1]:null;return r&&r.mode===n.mode?(e[e.length-1].data+=n.data,e):(e.push(n),e)},[])}function Yo(t){let e=[];for(let n=0;n<t.length;n++){let r=t[n];switch(r.mode){case g.NUMERIC:e.push([r,{data:r.data,mode:g.ALPHANUMERIC,length:r.length},{data:r.data,mode:g.BYTE,length:r.length}]);break;case g.ALPHANUMERIC:e.push([r,{data:r.data,mode:g.BYTE,length:r.length}]);break;case g.KANJI:e.push([r,{data:r.data,mode:g.BYTE,length:Or(r.data)}]);break;case g.BYTE:e.push([{data:r.data,mode:g.BYTE,length:Or(r.data)}])}}return e}function Jo(t,e){let n={},r={start:{}},i=["start"];for(let o=0;o<t.length;o++){let a=t[o],u=[];for(let l=0;l<a.length;l++){let f=a[l],d=""+o+l;u.push(d),n[d]={node:f,lastCount:0},r[d]={};for(let m=0;m<i.length;m++){let h=i[m];n[h]&&n[h].node.mode===f.mode?(r[h][d]=Et(n[h].lastCount+f.length,f.mode)-Et(n[h].lastCount,f.mode),n[h].lastCount+=f.length):(n[h]&&(n[h].lastCount=f.length),r[h][d]=Et(f.length,f.mode)+4+g.getCharCountIndicator(f.mode,e))}}i=u}for(let o=0;o<i.length;o++)r[i[o]].end=0;return{map:r,table:n}}function Sr(t,e){let n,r=g.getBestModeForData(t);if(n=g.from(e,r),n!==g.BYTE&&n.bit<r.bit)throw new Error('"'+t+'" cannot be encoded with mode '+g.toString(n)+`.
 Suggested mode is: `+g.toString(r));switch(n===g.KANJI&&!Ge.isKanjiModeEnabled()&&(n=g.BYTE),n){case g.NUMERIC:return new Cr(t);case g.ALPHANUMERIC:return new Ar(t);case g.KANJI:return new Rr(t);case g.BYTE:return new Tr(t)}}ue.fromArray=function(e){return e.reduce(function(n,r){return typeof r=="string"?n.push(Sr(r,null)):r.data&&n.push(Sr(r.data,r.mode)),n},[])};ue.fromString=function(e,n){let r=Ir(e,Ge.isKanjiModeEnabled()),i=Yo(r),o=Jo(i,n),a=Vo.find_path(o.map,"start","end"),u=[];for(let l=1;l<a.length-1;l++)u.push(o.table[a[l]].node);return ue.fromArray(Xo(u))};ue.rawSplit=function(e){return ue.fromArray(Ir(e,Ge.isKanjiModeEnabled()))}});var Br=c(Pr=>{var Ve=H(),bt=De(),Ko=$n(),Qo=Xn(),Wo=Yn(),Zo=Qn(),St=Wn(),Ct=ft(),ea=rr(),$e=sr(),ta=gr(),na=$(),xt=Mr();function ra(t,e){let n=t.size,r=Zo.getPositions(e);for(let i=0;i<r.length;i++){let o=r[i][0],a=r[i][1];for(let u=-1;u<=7;u++)if(!(o+u<=-1||n<=o+u))for(let l=-1;l<=7;l++)a+l<=-1||n<=a+l||(u>=0&&u<=6&&(l===0||l===6)||l>=0&&l<=6&&(u===0||u===6)||u>=2&&u<=4&&l>=2&&l<=4?t.set(o+u,a+l,!0,!0):t.set(o+u,a+l,!1,!0))}}function ia(t){let e=t.size;for(let n=8;n<e-8;n++){let r=n%2===0;t.set(n,6,r,!0),t.set(6,n,r,!0)}}function oa(t,e){let n=Wo.getPositions(e);for(let r=0;r<n.length;r++){let i=n[r][0],o=n[r][1];for(let a=-2;a<=2;a++)for(let u=-2;u<=2;u++)a===-2||a===2||u===-2||u===2||a===0&&u===0?t.set(i+a,o+u,!0,!0):t.set(i+a,o+u,!1,!0)}}function aa(t,e){let n=t.size,r=$e.getEncodedBits(e),i,o,a;for(let u=0;u<18;u++)i=Math.floor(u/3),o=u%3+n-8-3,a=(r>>u&1)===1,t.set(i,o,a,!0),t.set(o,i,a,!0)}function Ot(t,e,n){let r=t.size,i=ta.getEncodedBits(e,n),o,a;for(o=0;o<15;o++)a=(i>>o&1)===1,o<6?t.set(o,8,a,!0):o<8?t.set(o+1,8,a,!0):t.set(r-15+o,8,a,!0),o<8?t.set(8,r-o-1,a,!0):o<9?t.set(8,15-o-1+1,a,!0):t.set(8,15-o-1,a,!0);t.set(r-8,8,1,!0)}function ua(t,e){let n=t.size,r=-1,i=n-1,o=7,a=0;for(let u=n-1;u>0;u-=2)for(u===6&&u--;;){for(let l=0;l<2;l++)if(!t.isReserved(i,u-l)){let f=!1;a<e.length&&(f=(e[a]>>>o&1)===1),t.set(i,u-l,f),o--,o===-1&&(a++,o=7)}if(i+=r,i<0||n<=i){i-=r,r=-r;break}}}function la(t,e,n){let r=new Ko;n.forEach(function(l){r.put(l.mode.bit,4),r.put(l.getLength(),na.getCharCountIndicator(l.mode,t)),l.write(r)});let i=Ve.getSymbolTotalCodewords(t),o=Ct.getTotalCodewordsCount(t,e),a=(i-o)*8;for(r.getLengthInBits()+4<=a&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);let u=(a-r.getLengthInBits())/8;for(let l=0;l<u;l++)r.put(l%2?17:236,8);return ca(r,t,e)}function ca(t,e,n){let r=Ve.getSymbolTotalCodewords(e),i=Ct.getTotalCodewordsCount(e,n),o=r-i,a=Ct.getBlocksCount(e,n),u=r%a,l=a-u,f=Math.floor(r/a),d=Math.floor(o/a),m=d+1,h=f-d,v=new ea(h),w=0,S=new Array(a),B=new Array(a),N=0,K=new Uint8Array(t.buffer);for(let x=0;x<a;x++){let C=x<l?d:m;S[x]=K.slice(w,w+C),B[x]=v.encode(S[x]),w+=C,N=Math.max(N,C)}let z=new Uint8Array(r),D=0,s,_;for(s=0;s<N;s++)for(_=0;_<a;_++)s<S[_].length&&(z[D++]=S[_][s]);for(s=0;s<h;s++)for(_=0;_<a;_++)z[D++]=B[_][s];return z}function sa(t,e,n,r){let i;if(Array.isArray(t))i=xt.fromArray(t);else if(typeof t=="string"){let f=e;if(!f){let d=xt.rawSplit(t);f=$e.getBestVersionForData(d,n)}i=xt.fromString(t,f||40)}else throw new Error("Invalid data");let o=$e.getBestVersionForData(i,n);if(!o)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=o;else if(e<o)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+o+`.
`);let a=la(e,n,i),u=Ve.getSymbolSize(e),l=new Qo(u);return ra(l,e),ia(l),oa(l,e),Ot(l,n,0),e>=7&&aa(l,e),ua(l,a),isNaN(r)&&(r=St.getBestMask(l,Ot.bind(null,l,n))),St.applyMask(r,l),Ot(l,n,r),{modules:l,version:e,errorCorrectionLevel:n,maskPattern:r,segments:i}}Pr.create=function(e,n){if(typeof e>"u"||e==="")throw new Error("No input text");let r=bt.M,i,o;return typeof n<"u"&&(r=bt.from(n.errorCorrectionLevel,bt.M),i=$e.from(n.version),o=St.from(n.maskPattern),n.toSJISFunc&&Ve.setToSJISFunction(n.toSJISFunc)),sa(e,i,r,o)}});var At=c(ee=>{function Lr(t){if(typeof t=="number"&&(t=t.toString()),typeof t!="string")throw new Error("Color should be defined as hex string");let e=t.slice().replace("#","").split("");if(e.length<3||e.length===5||e.length>8)throw new Error("Invalid hex color: "+t);(e.length===3||e.length===4)&&(e=Array.prototype.concat.apply([],e.map(function(r){return[r,r]}))),e.length===6&&e.push("F","F");let n=parseInt(e.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+e.slice(0,6).join("")}}ee.getOptions=function(e){e||(e={}),e.color||(e.color={});let n=typeof e.margin>"u"||e.margin===null||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,i=e.scale||4;return{width:r,scale:r?4:i,margin:n,color:{dark:Lr(e.color.dark||"#000000ff"),light:Lr(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}};ee.getScale=function(e,n){return n.width&&n.width>=e+n.margin*2?n.width/(e+n.margin*2):n.scale};ee.getImageWidth=function(e,n){let r=ee.getScale(e,n);return Math.floor((e+n.margin*2)*r)};ee.qrToImageData=function(e,n,r){let i=n.modules.size,o=n.modules.data,a=ee.getScale(i,r),u=Math.floor((i+r.margin*2)*a),l=r.margin*a,f=[r.color.light,r.color.dark];for(let d=0;d<u;d++)for(let m=0;m<u;m++){let h=(d*u+m)*4,v=r.color.light;if(d>=l&&m>=l&&d<u-l&&m<u-l){let w=Math.floor((d-l)/a),S=Math.floor((m-l)/a);v=f[o[w*i+S]?1:0]}e[h++]=v.r,e[h++]=v.g,e[h++]=v.b,e[h]=v.a}}});var kr=c(Xe=>{var Tt=At();function fa(t,e,n){t.clearRect(0,0,e.width,e.height),e.style||(e.style={}),e.height=n,e.width=n,e.style.height=n+"px",e.style.width=n+"px"}function da(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}Xe.render=function(e,n,r){let i=r,o=n;typeof i>"u"&&(!n||!n.getContext)&&(i=n,n=void 0),n||(o=da()),i=Tt.getOptions(i);let a=Tt.getImageWidth(e.modules.size,i),u=o.getContext("2d"),l=u.createImageData(a,a);return Tt.qrToImageData(l.data,e,i),fa(u,o,a),u.putImageData(l,0,0),o};Xe.renderToDataURL=function(e,n,r){let i=r;typeof i>"u"&&(!n||!n.getContext)&&(i=n,n=void 0),i||(i={});let o=Xe.render(e,n,i),a=i.type||"image/png",u=i.rendererOpts||{};return o.toDataURL(a,u.quality)}});var qr=c(Dr=>{var ha=At();function Nr(t,e){let n=t.a/255,r=e+'="'+t.hex+'"';return n<1?r+" "+e+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function Rt(t,e,n){let r=t+e;return typeof n<"u"&&(r+=" "+n),r}function ga(t,e,n){let r="",i=0,o=!1,a=0;for(let u=0;u<t.length;u++){let l=Math.floor(u%e),f=Math.floor(u/e);!l&&!o&&(o=!0),t[u]?(a++,u>0&&l>0&&t[u-1]||(r+=o?Rt("M",l+n,.5+f+n):Rt("m",i,0),i=0,o=!1),l+1<e&&t[u+1]||(r+=Rt("h",a),a=0)):i++}return r}Dr.render=function(e,n,r){let i=ha.getOptions(n),o=e.modules.size,a=e.modules.data,u=o+i.margin*2,l=i.color.light.a?"<path "+Nr(i.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",f="<path "+Nr(i.color.dark,"stroke")+' d="'+ga(a,o,i.margin)+'"/>',d='viewBox="0 0 '+u+" "+u+'"',h='<svg xmlns="http://www.w3.org/2000/svg" '+(i.width?'width="'+i.width+'" height="'+i.width+'" ':"")+d+' shape-rendering="crispEdges">'+l+f+`</svg>
`;return typeof r=="function"&&r(null,h),h}});var Ur=c(Oe=>{var pa=zn(),It=Br(),jr=kr(),va=qr();function Mt(t,e,n,r,i){let o=[].slice.call(arguments,1),a=o.length,u=typeof o[a-1]=="function";if(!u&&!pa())throw new Error("Callback required as last argument");if(u){if(a<2)throw new Error("Too few arguments provided");a===2?(i=n,n=e,e=r=void 0):a===3&&(e.getContext&&typeof i>"u"?(i=r,r=void 0):(i=r,r=n,n=e,e=void 0))}else{if(a<1)throw new Error("Too few arguments provided");return a===1?(n=e,e=r=void 0):a===2&&!e.getContext&&(r=n,n=e,e=void 0),new Promise(function(l,f){try{let d=It.create(n,r);l(t(d,e,r))}catch(d){f(d)}})}try{let l=It.create(n,r);i(null,t(l,e,r))}catch(l){i(l)}}Oe.create=It.create;Oe.toCanvas=Mt.bind(null,jr.render);Oe.toDataURL=Mt.bind(null,jr.renderToDataURL);Oe.toString=Mt.bind(null,function(t,e,n){return va.render(t,n)})});var T=c(Pt=>{"use strict";Object.defineProperty(Pt,"__esModule",{value:!0});function _a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var ya=function t(e,n){_a(this,t),this.data=e,this.text=n.text||e,this.options=n};Pt.default=ya});var Hr=c(Ye=>{"use strict";Object.defineProperty(Ye,"__esModule",{value:!0});Ye.CODE39=void 0;var ma=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),wa=T(),Ea=ba(wa);function ba(t){return t&&t.__esModule?t:{default:t}}function xa(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Oa(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Sa(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Ca=function(t){Sa(e,t);function e(n,r){return xa(this,e),n=n.toUpperCase(),r.mod43&&(n+=Ra(Ia(n))),Oa(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return ma(e,[{key:"encode",value:function(){for(var r=Bt("*"),i=0;i<this.data.length;i++)r+=Bt(this.data[i])+"0";return r+=Bt("*"),{data:r,text:this.text}}},{key:"valid",value:function(){return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)!==-1}}]),e}(Ea.default),Fr=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],Aa=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];function Bt(t){return Ta(zr(t))}function Ta(t){return Aa[t].toString(2)}function Ra(t){return Fr[t]}function zr(t){return Fr.indexOf(t)}function Ia(t){for(var e=0,n=0;n<t.length;n++)e+=zr(t[n]);return e=e%43,e}Ye.CODE39=Ca});var le=c(E=>{"use strict";Object.defineProperty(E,"__esModule",{value:!0});var Se;function Lt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Gr=E.SET_A=0,$r=E.SET_B=1,Vr=E.SET_C=2,Dd=E.SHIFT=98,Ma=E.START_A=103,Pa=E.START_B=104,Ba=E.START_C=105,qd=E.MODULO=103,jd=E.STOP=106,Ud=E.FNC1=207,Fd=E.SET_BY_CODE=(Se={},Lt(Se,Ma,Gr),Lt(Se,Pa,$r),Lt(Se,Ba,Vr),Se),zd=E.SWAP={101:Gr,100:$r,99:Vr},Hd=E.A_START_CHAR="\xD0",Gd=E.B_START_CHAR="\xD1",$d=E.C_START_CHAR="\xD2",Vd=E.A_CHARS="[\0-_\xC8-\xCF]",Xd=E.B_CHARS="[ -\x7F\xC8-\xCF]",Yd=E.C_CHARS="(\xCF*[0-9]{2}\xCF*)",Jd=E.BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011]});var Ce=c(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});var La=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),ka=T(),Na=Da(ka),R=le();function Da(t){return t&&t.__esModule?t:{default:t}}function qa(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ja(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Ua(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Fa=function(t){Ua(e,t);function e(n,r){qa(this,e);var i=ja(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n.substring(1),r));return i.bytes=n.split("").map(function(o){return o.charCodeAt(0)}),i}return La(e,[{key:"valid",value:function(){return/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function(){var r=this.bytes,i=r.shift()-105,o=R.SET_BY_CODE[i];if(o===void 0)throw new RangeError("The encoding does not start with a start character.");this.shouldEncodeAsEan128()===!0&&r.unshift(R.FNC1);var a=e.next(r,1,o);return{text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:e.getBar(i)+a.result+e.getBar((a.checksum+i)%R.MODULO)+e.getBar(R.STOP)}}},{key:"shouldEncodeAsEan128",value:function(){var r=this.options.ean128||!1;return typeof r=="string"&&(r=r.toLowerCase()==="true"),r}}],[{key:"getBar",value:function(r){return R.BARS[r]?R.BARS[r].toString():""}},{key:"correctIndex",value:function(r,i){if(i===R.SET_A){var o=r.shift();return o<32?o+64:o-32}else return i===R.SET_B?r.shift()-32:(r.shift()-48)*10+r.shift()-48}},{key:"next",value:function(r,i,o){if(!r.length)return{result:"",checksum:0};var a=void 0,u=void 0;if(r[0]>=200){u=r.shift()-105;var l=R.SWAP[u];l!==void 0?a=e.next(r,i+1,l):((o===R.SET_A||o===R.SET_B)&&u===R.SHIFT&&(r[0]=o===R.SET_A?r[0]>95?r[0]-96:r[0]:r[0]<32?r[0]+96:r[0]),a=e.next(r,i+1,o))}else u=e.correctIndex(r,o),a=e.next(r,i+1,o);var f=e.getBar(u),d=u*i;return{result:f+a.result,checksum:d+a.checksum}}}]),e}(Na.default);kt.default=Fa});var Qr=c(Dt=>{"use strict";Object.defineProperty(Dt,"__esModule",{value:!0});var X=le(),Xr=function(e){return e.match(new RegExp("^"+X.A_CHARS+"*"))[0].length},Yr=function(e){return e.match(new RegExp("^"+X.B_CHARS+"*"))[0].length},Jr=function(e){return e.match(new RegExp("^"+X.C_CHARS+"*"))[0]};function Nt(t,e){var n=e?X.A_CHARS:X.B_CHARS,r=t.match(new RegExp("^("+n+"+?)(([0-9]{2}){2,})([^0-9]|$)"));if(r)return r[1]+"\xCC"+Kr(t.substring(r[1].length));var i=t.match(new RegExp("^"+n+"+"))[0];return i.length===t.length?t:i+String.fromCharCode(e?205:206)+Nt(t.substring(i.length),!e)}function Kr(t){var e=Jr(t),n=e.length;if(n===t.length)return t;t=t.substring(n);var r=Xr(t)>=Yr(t);return e+String.fromCharCode(r?206:205)+Nt(t,r)}Dt.default=function(t){var e=void 0,n=Jr(t).length;if(n>=2)e=X.C_START_CHAR+Kr(t);else{var r=Xr(t)>Yr(t);e=(r?X.A_START_CHAR:X.B_START_CHAR)+Nt(t,r)}return e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(i,o){return"\xCB"+o})}});var Zr=c(jt=>{"use strict";Object.defineProperty(jt,"__esModule",{value:!0});var za=Ce(),Ha=Wr(za),Ga=Qr(),$a=Wr(Ga);function Wr(t){return t&&t.__esModule?t:{default:t}}function Va(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function qt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Xa(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Ya=function(t){Xa(e,t);function e(n,r){if(Va(this,e),/^[\x00-\x7F\xC8-\xD3]+$/.test(n))var i=qt(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,(0,$a.default)(n),r));else var i=qt(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return qt(i)}return e}(Ha.default);jt.default=Ya});var ti=c(Ut=>{"use strict";Object.defineProperty(Ut,"__esModule",{value:!0});var Ja=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Ka=Ce(),Qa=Wa(Ka),ei=le();function Wa(t){return t&&t.__esModule?t:{default:t}}function Za(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function eu(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function tu(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var nu=function(t){tu(e,t);function e(n,r){return Za(this,e),eu(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,ei.A_START_CHAR+n,r))}return Ja(e,[{key:"valid",value:function(){return new RegExp("^"+ei.A_CHARS+"+$").test(this.data)}}]),e}(Qa.default);Ut.default=nu});var ri=c(Ft=>{"use strict";Object.defineProperty(Ft,"__esModule",{value:!0});var ru=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),iu=Ce(),ou=au(iu),ni=le();function au(t){return t&&t.__esModule?t:{default:t}}function uu(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function lu(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function cu(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var su=function(t){cu(e,t);function e(n,r){return uu(this,e),lu(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,ni.B_START_CHAR+n,r))}return ru(e,[{key:"valid",value:function(){return new RegExp("^"+ni.B_CHARS+"+$").test(this.data)}}]),e}(ou.default);Ft.default=su});var oi=c(zt=>{"use strict";Object.defineProperty(zt,"__esModule",{value:!0});var fu=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),du=Ce(),hu=gu(du),ii=le();function gu(t){return t&&t.__esModule?t:{default:t}}function pu(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function vu(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function _u(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var yu=function(t){_u(e,t);function e(n,r){return pu(this,e),vu(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,ii.C_START_CHAR+n,r))}return fu(e,[{key:"valid",value:function(){return new RegExp("^"+ii.C_CHARS+"+$").test(this.data)}}]),e}(hu.default);zt.default=yu});var ai=c(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});L.CODE128C=L.CODE128B=L.CODE128A=L.CODE128=void 0;var mu=Zr(),wu=Je(mu),Eu=ti(),bu=Je(Eu),xu=ri(),Ou=Je(xu),Su=oi(),Cu=Je(Su);function Je(t){return t&&t.__esModule?t:{default:t}}L.CODE128=wu.default;L.CODE128A=bu.default;L.CODE128B=Ou.default;L.CODE128C=Cu.default});var ce=c(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});var i0=Y.SIDE_BIN="101",o0=Y.MIDDLE_BIN="01010",a0=Y.BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]},u0=Y.EAN2_STRUCTURE=["LL","LG","GL","GG"],l0=Y.EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"],c0=Y.EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"]});var se=c(Ht=>{"use strict";Object.defineProperty(Ht,"__esModule",{value:!0});var Au=ce(),Tu=function(e,n,r){var i=e.split("").map(function(a,u){return Au.BINARIES[n[u]]}).map(function(a,u){return a?a[e[u]]:""});if(r){var o=e.length-1;i=i.map(function(a,u){return u<o?a+r:a})}return i.join("")};Ht.default=Tu});var $t=c(Gt=>{"use strict";Object.defineProperty(Gt,"__esModule",{value:!0});var Ru=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),fe=ce(),Iu=se(),ui=li(Iu),Mu=T(),Pu=li(Mu);function li(t){return t&&t.__esModule?t:{default:t}}function Bu(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Lu(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function ku(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Nu=function(t){ku(e,t);function e(n,r){Bu(this,e);var i=Lu(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return i.fontSize=!r.flat&&r.fontSize>r.width*10?r.width*10:r.fontSize,i.guardHeight=r.height+i.fontSize/2+r.textMargin,i}return Ru(e,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function(r,i){return this.text.substr(r,i)}},{key:"leftEncode",value:function(r,i){return(0,ui.default)(r,i)}},{key:"rightText",value:function(r,i){return this.text.substr(r,i)}},{key:"rightEncode",value:function(r,i){return(0,ui.default)(r,i)}},{key:"encodeGuarded",value:function(){var r={fontSize:this.fontSize},i={height:this.guardHeight};return[{data:fe.SIDE_BIN,options:i},{data:this.leftEncode(),text:this.leftText(),options:r},{data:fe.MIDDLE_BIN,options:i},{data:this.rightEncode(),text:this.rightText(),options:r},{data:fe.SIDE_BIN,options:i}]}},{key:"encodeFlat",value:function(){var r=[fe.SIDE_BIN,this.leftEncode(),fe.MIDDLE_BIN,this.rightEncode(),fe.SIDE_BIN];return{data:r.join(""),text:this.text}}}]),e}(Pu.default);Gt.default=Nu});var si=c(Vt=>{"use strict";Object.defineProperty(Vt,"__esModule",{value:!0});var Du=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Ae=function t(e,n,r){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,n);if(i===void 0){var o=Object.getPrototypeOf(e);return o===null?void 0:t(o,n,r)}else{if("value"in i)return i.value;var a=i.get;return a===void 0?void 0:a.call(r)}},qu=ce(),ju=$t(),Uu=Fu(ju);function Fu(t){return t&&t.__esModule?t:{default:t}}function zu(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Hu(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Gu(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var ci=function(e){var n=e.substr(0,12).split("").map(function(r){return+r}).reduce(function(r,i,o){return o%2?r+i*3:r+i},0);return(10-n%10)%10},$u=function(t){Gu(e,t);function e(n,r){zu(this,e),n.search(/^[0-9]{12}$/)!==-1&&(n+=ci(n));var i=Hu(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return i.lastChar=r.lastChar,i}return Du(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{13}$/)!==-1&&+this.data[12]===ci(this.data)}},{key:"leftText",value:function(){return Ae(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function(){var r=this.data.substr(1,6),i=qu.EAN13_STRUCTURE[this.data[0]];return Ae(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,r,i)}},{key:"rightText",value:function(){return Ae(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function(){var r=this.data.substr(7,6);return Ae(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,r,"RRRRRR")}},{key:"encodeGuarded",value:function(){var r=Ae(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(r.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(r.push({data:"00"}),r.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),r}}]),e}(Uu.default);Vt.default=$u});var di=c(Xt=>{"use strict";Object.defineProperty(Xt,"__esModule",{value:!0});var Vu=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Ke=function t(e,n,r){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,n);if(i===void 0){var o=Object.getPrototypeOf(e);return o===null?void 0:t(o,n,r)}else{if("value"in i)return i.value;var a=i.get;return a===void 0?void 0:a.call(r)}},Xu=$t(),Yu=Ju(Xu);function Ju(t){return t&&t.__esModule?t:{default:t}}function Ku(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Qu(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Wu(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var fi=function(e){var n=e.substr(0,7).split("").map(function(r){return+r}).reduce(function(r,i,o){return o%2?r+i:r+i*3},0);return(10-n%10)%10},Zu=function(t){Wu(e,t);function e(n,r){return Ku(this,e),n.search(/^[0-9]{7}$/)!==-1&&(n+=fi(n)),Qu(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return Vu(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{8}$/)!==-1&&+this.data[7]===fi(this.data)}},{key:"leftText",value:function(){return Ke(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function(){var r=this.data.substr(0,4);return Ke(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,r,"LLLL")}},{key:"rightText",value:function(){return Ke(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function(){var r=this.data.substr(4,4);return Ke(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,r,"RRRR")}}]),e}(Yu.default);Xt.default=Zu});var gi=c(Yt=>{"use strict";Object.defineProperty(Yt,"__esModule",{value:!0});var el=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),tl=ce(),nl=se(),rl=hi(nl),il=T(),ol=hi(il);function hi(t){return t&&t.__esModule?t:{default:t}}function al(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ul(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function ll(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var cl=function(e){var n=e.split("").map(function(r){return+r}).reduce(function(r,i,o){return o%2?r+i*9:r+i*3},0);return n%10},sl=function(t){ll(e,t);function e(n,r){return al(this,e),ul(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return el(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{5}$/)!==-1}},{key:"encode",value:function(){var r=tl.EAN5_STRUCTURE[cl(this.data)];return{data:"1011"+(0,rl.default)(this.data,r,"01"),text:this.text}}}]),e}(ol.default);Yt.default=sl});var vi=c(Jt=>{"use strict";Object.defineProperty(Jt,"__esModule",{value:!0});var fl=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),dl=ce(),hl=se(),gl=pi(hl),pl=T(),vl=pi(pl);function pi(t){return t&&t.__esModule?t:{default:t}}function _l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function yl(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function ml(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var wl=function(t){ml(e,t);function e(n,r){return _l(this,e),yl(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return fl(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{2}$/)!==-1}},{key:"encode",value:function(){var r=dl.EAN2_STRUCTURE[parseInt(this.data)%4];return{data:"1011"+(0,gl.default)(this.data,r,"01"),text:this.text}}}]),e}(vl.default);Jt.default=wl});var Qt=c(Qe=>{"use strict";Object.defineProperty(Qe,"__esModule",{value:!0});var El=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();Qe.checksum=Kt;var bl=se(),de=_i(bl),xl=T(),Ol=_i(xl);function _i(t){return t&&t.__esModule?t:{default:t}}function Sl(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Cl(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Al(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Tl=function(t){Al(e,t);function e(n,r){Sl(this,e),n.search(/^[0-9]{11}$/)!==-1&&(n+=Kt(n));var i=Cl(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return i.displayValue=r.displayValue,r.fontSize>r.width*10?i.fontSize=r.width*10:i.fontSize=r.fontSize,i.guardHeight=r.height+i.fontSize/2+r.textMargin,i}return El(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{12}$/)!==-1&&this.data[11]==Kt(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var r="";return r+="101",r+=(0,de.default)(this.data.substr(0,6),"LLLLLL"),r+="01010",r+=(0,de.default)(this.data.substr(6,6),"RRRRRR"),r+="101",{data:r,text:this.text}}},{key:"guardedEncoding",value:function(){var r=[];return this.displayValue&&r.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),r.push({data:"101"+(0,de.default)(this.data[0],"L"),options:{height:this.guardHeight}}),r.push({data:(0,de.default)(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),r.push({data:"01010",options:{height:this.guardHeight}}),r.push({data:(0,de.default)(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),r.push({data:(0,de.default)(this.data[11],"R")+"101",options:{height:this.guardHeight}}),this.displayValue&&r.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),r}}]),e}(Ol.default);function Kt(t){var e=0,n;for(n=1;n<11;n+=2)e+=parseInt(t[n]);for(n=0;n<11;n+=2)e+=parseInt(t[n])*3;return(10-e%10)%10}Qe.default=Tl});var wi=c(Zt=>{"use strict";Object.defineProperty(Zt,"__esModule",{value:!0});var Rl=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Il=se(),Ml=mi(Il),Pl=T(),Bl=mi(Pl),Ll=Qt();function mi(t){return t&&t.__esModule?t:{default:t}}function kl(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Wt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Nl(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Dl=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],ql=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],jl=function(t){Nl(e,t);function e(n,r){kl(this,e);var i=Wt(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));if(i.isValid=!1,n.search(/^[0-9]{6}$/)!==-1)i.middleDigits=n,i.upcA=yi(n,"0"),i.text=r.text||""+i.upcA[0]+n+i.upcA[i.upcA.length-1],i.isValid=!0;else if(n.search(/^[01][0-9]{7}$/)!==-1)if(i.middleDigits=n.substring(1,n.length-1),i.upcA=yi(i.middleDigits,n[0]),i.upcA[i.upcA.length-1]===n[n.length-1])i.isValid=!0;else return Wt(i);else return Wt(i);return i.displayValue=r.displayValue,r.fontSize>r.width*10?i.fontSize=r.width*10:i.fontSize=r.fontSize,i.guardHeight=r.height+i.fontSize/2+r.textMargin,i}return Rl(e,[{key:"valid",value:function(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var r="";return r+="101",r+=this.encodeMiddleDigits(),r+="010101",{data:r,text:this.text}}},{key:"guardedEncoding",value:function(){var r=[];return this.displayValue&&r.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),r.push({data:"101",options:{height:this.guardHeight}}),r.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),r.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&r.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),r}},{key:"encodeMiddleDigits",value:function(){var r=this.upcA[0],i=this.upcA[this.upcA.length-1],o=ql[parseInt(i)][parseInt(r)];return(0,Ml.default)(this.middleDigits,o)}}]),e}(Bl.default);function yi(t,e){for(var n=parseInt(t[t.length-1]),r=Dl[n],i="",o=0,a=0;a<r.length;a++){var u=r[a];u==="X"?i+=t[o++]:i+=u}return i=""+e+i,""+i+(0,Ll.checksum)(i)}Zt.default=jl});var Ei=c(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.UPCE=A.UPC=A.EAN2=A.EAN5=A.EAN8=A.EAN13=void 0;var Ul=si(),Fl=he(Ul),zl=di(),Hl=he(zl),Gl=gi(),$l=he(Gl),Vl=vi(),Xl=he(Vl),Yl=Qt(),Jl=he(Yl),Kl=wi(),Ql=he(Kl);function he(t){return t&&t.__esModule?t:{default:t}}A.EAN13=Fl.default;A.EAN8=Hl.default;A.EAN5=$l.default;A.EAN2=Xl.default;A.UPC=Jl.default;A.UPCE=Ql.default});var bi=c(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});var w0=Te.START_BIN="1010",E0=Te.END_BIN="11101",b0=Te.BINARIES=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"]});var tn=c(en=>{"use strict";Object.defineProperty(en,"__esModule",{value:!0});var Wl=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),We=bi(),Zl=T(),ec=tc(Zl);function tc(t){return t&&t.__esModule?t:{default:t}}function nc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function rc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function ic(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var oc=function(t){ic(e,t);function e(){return nc(this,e),rc(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return Wl(e,[{key:"valid",value:function(){return this.data.search(/^([0-9]{2})+$/)!==-1}},{key:"encode",value:function(){var r=this,i=this.data.match(/.{2}/g).map(function(o){return r.encodePair(o)}).join("");return{data:We.START_BIN+i+We.END_BIN,text:this.text}}},{key:"encodePair",value:function(r){var i=We.BINARIES[r[1]];return We.BINARIES[r[0]].split("").map(function(o,a){return(o==="1"?"111":"1")+(i[a]==="1"?"000":"0")}).join("")}}]),e}(ec.default);en.default=oc});var Oi=c(nn=>{"use strict";Object.defineProperty(nn,"__esModule",{value:!0});var ac=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),uc=tn(),lc=cc(uc);function cc(t){return t&&t.__esModule?t:{default:t}}function sc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function fc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function dc(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var xi=function(e){var n=e.substr(0,13).split("").map(function(r){return parseInt(r,10)}).reduce(function(r,i,o){return r+i*(3-o%2*2)},0);return Math.ceil(n/10)*10-n},hc=function(t){dc(e,t);function e(n,r){return sc(this,e),n.search(/^[0-9]{13}$/)!==-1&&(n+=xi(n)),fc(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return ac(e,[{key:"valid",value:function(){return this.data.search(/^[0-9]{14}$/)!==-1&&+this.data[13]===xi(this.data)}}]),e}(lc.default);nn.default=hc});var Ci=c(ge=>{"use strict";Object.defineProperty(ge,"__esModule",{value:!0});ge.ITF14=ge.ITF=void 0;var gc=tn(),pc=Si(gc),vc=Oi(),_c=Si(vc);function Si(t){return t&&t.__esModule?t:{default:t}}ge.ITF=pc.default;ge.ITF14=_c.default});var pe=c(rn=>{"use strict";Object.defineProperty(rn,"__esModule",{value:!0});var yc=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),mc=T(),wc=Ec(mc);function Ec(t){return t&&t.__esModule?t:{default:t}}function bc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function xc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Oc(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Sc=function(t){Oc(e,t);function e(n,r){return bc(this,e),xc(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return yc(e,[{key:"encode",value:function(){for(var r="110",i=0;i<this.data.length;i++){var o=parseInt(this.data[i]),a=o.toString(2);a=Cc(a,4-a.length);for(var u=0;u<a.length;u++)r+=a[u]=="0"?"100":"110"}return r+="1001",{data:r,text:this.text}}},{key:"valid",value:function(){return this.data.search(/^[0-9]+$/)!==-1}}]),e}(wc.default);function Cc(t,e){for(var n=0;n<e;n++)t="0"+t;return t}rn.default=Sc});var Re=c(Ze=>{"use strict";Object.defineProperty(Ze,"__esModule",{value:!0});Ze.mod10=Ac;Ze.mod11=Tc;function Ac(t){for(var e=0,n=0;n<t.length;n++){var r=parseInt(t[n]);(n+t.length)%2===0?e+=r:e+=r*2%10+Math.floor(r*2/10)}return(10-e%10)%10}function Tc(t){for(var e=0,n=[2,3,4,5,6,7],r=0;r<t.length;r++){var i=parseInt(t[t.length-1-r]);e+=n[r%n.length]*i}return(11-e%11)%11}});var Ai=c(on=>{"use strict";Object.defineProperty(on,"__esModule",{value:!0});var Rc=pe(),Ic=Pc(Rc),Mc=Re();function Pc(t){return t&&t.__esModule?t:{default:t}}function Bc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Lc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function kc(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Nc=function(t){kc(e,t);function e(n,r){return Bc(this,e),Lc(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n+(0,Mc.mod10)(n),r))}return e}(Ic.default);on.default=Nc});var Ti=c(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});var Dc=pe(),qc=Uc(Dc),jc=Re();function Uc(t){return t&&t.__esModule?t:{default:t}}function Fc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function zc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Hc(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Gc=function(t){Hc(e,t);function e(n,r){return Fc(this,e),zc(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n+(0,jc.mod11)(n),r))}return e}(qc.default);an.default=Gc});var Ii=c(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});var $c=pe(),Vc=Xc($c),Ri=Re();function Xc(t){return t&&t.__esModule?t:{default:t}}function Yc(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Jc(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Kc(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Qc=function(t){Kc(e,t);function e(n,r){return Yc(this,e),n+=(0,Ri.mod10)(n),n+=(0,Ri.mod10)(n),Jc(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return e}(Vc.default);un.default=Qc});var Pi=c(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});var Wc=pe(),Zc=es(Wc),Mi=Re();function es(t){return t&&t.__esModule?t:{default:t}}function ts(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ns(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function rs(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var is=function(t){rs(e,t);function e(n,r){return ts(this,e),n+=(0,Mi.mod11)(n),n+=(0,Mi.mod10)(n),ns(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return e}(Zc.default);ln.default=is});var Bi=c(M=>{"use strict";Object.defineProperty(M,"__esModule",{value:!0});M.MSI1110=M.MSI1010=M.MSI11=M.MSI10=M.MSI=void 0;var os=pe(),as=Ie(os),us=Ai(),ls=Ie(us),cs=Ti(),ss=Ie(cs),fs=Ii(),ds=Ie(fs),hs=Pi(),gs=Ie(hs);function Ie(t){return t&&t.__esModule?t:{default:t}}M.MSI=as.default;M.MSI10=ls.default;M.MSI11=ss.default;M.MSI1010=ds.default;M.MSI1110=gs.default});var Li=c(et=>{"use strict";Object.defineProperty(et,"__esModule",{value:!0});et.pharmacode=void 0;var ps=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),vs=T(),_s=ys(vs);function ys(t){return t&&t.__esModule?t:{default:t}}function ms(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ws(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Es(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var bs=function(t){Es(e,t);function e(n,r){ms(this,e);var i=ws(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r));return i.number=parseInt(n,10),i}return ps(e,[{key:"encode",value:function(){for(var r=this.number,i="";!isNaN(r)&&r!=0;)r%2===0?(i="11100"+i,r=(r-2)/2):(i="100"+i,r=(r-1)/2);return i=i.slice(0,-2),{data:i,text:this.text}}},{key:"valid",value:function(){return this.number>=3&&this.number<=131070}}]),e}(_s.default);et.pharmacode=bs});var ki=c(tt=>{"use strict";Object.defineProperty(tt,"__esModule",{value:!0});tt.codabar=void 0;var xs=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Os=T(),Ss=Cs(Os);function Cs(t){return t&&t.__esModule?t:{default:t}}function As(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Ts(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Rs(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Is=function(t){Rs(e,t);function e(n,r){As(this,e),n.search(/^[0-9\-\$\:\.\+\/]+$/)===0&&(n="A"+n+"A");var i=Ts(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n.toUpperCase(),r));return i.text=i.options.text||i.text.replace(/[A-D]/g,""),i}return xs(e,[{key:"valid",value:function(){return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)!==-1}},{key:"encode",value:function(){for(var r=[],i=this.getEncodings(),o=0;o<this.data.length;o++)r.push(i[this.data.charAt(o)]),o!==this.data.length-1&&r.push("0");return{text:this.text,data:r.join("")}}},{key:"getEncodings",value:function(){return{0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"1011011011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),e}(Ss.default);tt.codabar=Is});var Ni=c(nt=>{"use strict";Object.defineProperty(nt,"__esModule",{value:!0});nt.GenericBarcode=void 0;var Ms=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Ps=T(),Bs=Ls(Ps);function Ls(t){return t&&t.__esModule?t:{default:t}}function ks(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Ns(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Ds(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var qs=function(t){Ds(e,t);function e(n,r){return ks(this,e),Ns(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,r))}return Ms(e,[{key:"encode",value:function(){return{data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function(){return!0}}]),e}(Bs.default);nt.GenericBarcode=qs});var qi=c(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});var js=Hr(),rt=ai(),ve=Ei(),Di=Ci(),Me=Bi(),Us=Li(),Fs=ki(),zs=Ni();cn.default={CODE39:js.CODE39,CODE128:rt.CODE128,CODE128A:rt.CODE128A,CODE128B:rt.CODE128B,CODE128C:rt.CODE128C,EAN13:ve.EAN13,EAN8:ve.EAN8,EAN5:ve.EAN5,EAN2:ve.EAN2,UPC:ve.UPC,UPCE:ve.UPCE,ITF14:Di.ITF14,ITF:Di.ITF,MSI:Me.MSI,MSI10:Me.MSI10,MSI11:Me.MSI11,MSI1010:Me.MSI1010,MSI1110:Me.MSI1110,pharmacode:Us.pharmacode,codabar:Fs.codabar,GenericBarcode:zs.GenericBarcode}});var Pe=c(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});var Hs=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};sn.default=function(t,e){return Hs({},t,e)}});var ji=c(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.default=Gs;function Gs(t){var e=[];function n(r){if(Array.isArray(r))for(var i=0;i<r.length;i++)n(r[i]);else r.text=r.text||"",r.data=r.data||"",e.push(r)}return n(t),e}});var Ui=c(dn=>{"use strict";Object.defineProperty(dn,"__esModule",{value:!0});dn.default=$s;function $s(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t}});var gn=c(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.default=Vs;function Vs(t){var e=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var n in e)e.hasOwnProperty(n)&&(n=e[n],typeof t[n]=="string"&&(t[n]=parseInt(t[n],10)));return typeof t.displayValue=="string"&&(t.displayValue=t.displayValue!="false"),t}});var vn=c(pn=>{"use strict";Object.defineProperty(pn,"__esModule",{value:!0});var Xs={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(){}};pn.default=Xs});var Hi=c(_n=>{"use strict";Object.defineProperty(_n,"__esModule",{value:!0});var Ys=gn(),Js=zi(Ys),Ks=vn(),Fi=zi(Ks);function zi(t){return t&&t.__esModule?t:{default:t}}function Qs(t){var e={};for(var n in Fi.default)Fi.default.hasOwnProperty(n)&&(t.hasAttribute("jsbarcode-"+n.toLowerCase())&&(e[n]=t.getAttribute("jsbarcode-"+n.toLowerCase())),t.hasAttribute("data-"+n.toLowerCase())&&(e[n]=t.getAttribute("data-"+n.toLowerCase())));return e.value=t.getAttribute("jsbarcode-value")||t.getAttribute("data-value"),e=(0,Js.default)(e),e}_n.default=Qs});var yn=c(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.getTotalWidthOfEncodings=P.calculateEncodingAttributes=P.getBarcodePadding=P.getEncodingHeight=P.getMaximumHeightOfEncodings=void 0;var Ws=Pe(),Zs=ef(Ws);function ef(t){return t&&t.__esModule?t:{default:t}}function Gi(t,e){return e.height+(e.displayValue&&t.text.length>0?e.fontSize+e.textMargin:0)+e.marginTop+e.marginBottom}function $i(t,e,n){if(n.displayValue&&e<t){if(n.textAlign=="center")return Math.floor((t-e)/2);if(n.textAlign=="left")return 0;if(n.textAlign=="right")return Math.floor(t-e)}return 0}function tf(t,e,n){for(var r=0;r<t.length;r++){var i=t[r],o=(0,Zs.default)(e,i.options),a;o.displayValue?a=of(i.text,o,n):a=0;var u=i.data.length*o.width;i.width=Math.ceil(Math.max(a,u)),i.height=Gi(i,o),i.barcodePadding=$i(a,u,o)}}function nf(t){for(var e=0,n=0;n<t.length;n++)e+=t[n].width;return e}function rf(t){for(var e=0,n=0;n<t.length;n++)t[n].height>e&&(e=t[n].height);return e}function of(t,e,n){var r;if(n)r=n;else if(typeof document<"u")r=document.createElement("canvas").getContext("2d");else return 0;r.font=e.fontOptions+" "+e.fontSize+"px "+e.font;var i=r.measureText(t);if(!i)return 0;var o=i.width;return o}P.getMaximumHeightOfEncodings=rf;P.getEncodingHeight=Gi;P.getBarcodePadding=$i;P.calculateEncodingAttributes=tf;P.getTotalWidthOfEncodings=nf});var Vi=c(wn=>{"use strict";Object.defineProperty(wn,"__esModule",{value:!0});var af=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),uf=Pe(),lf=cf(uf),mn=yn();function cf(t){return t&&t.__esModule?t:{default:t}}function sf(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var ff=function(){function t(e,n,r){sf(this,t),this.canvas=e,this.encodings=n,this.options=r}return af(t,[{key:"render",value:function(){if(!this.canvas.getContext)throw new Error("The browser does not support canvas.");this.prepareCanvas();for(var n=0;n<this.encodings.length;n++){var r=(0,lf.default)(this.options,this.encodings[n].options);this.drawCanvasBarcode(r,this.encodings[n]),this.drawCanvasText(r,this.encodings[n]),this.moveCanvasDrawing(this.encodings[n])}this.restoreCanvas()}},{key:"prepareCanvas",value:function(){var n=this.canvas.getContext("2d");n.save(),(0,mn.calculateEncodingAttributes)(this.encodings,this.options,n);var r=(0,mn.getTotalWidthOfEncodings)(this.encodings),i=(0,mn.getMaximumHeightOfEncodings)(this.encodings);this.canvas.width=r+this.options.marginLeft+this.options.marginRight,this.canvas.height=i,n.clearRect(0,0,this.canvas.width,this.canvas.height),this.options.background&&(n.fillStyle=this.options.background,n.fillRect(0,0,this.canvas.width,this.canvas.height)),n.translate(this.options.marginLeft,0)}},{key:"drawCanvasBarcode",value:function(n,r){var i=this.canvas.getContext("2d"),o=r.data,a;n.textPosition=="top"?a=n.marginTop+n.fontSize+n.textMargin:a=n.marginTop,i.fillStyle=n.lineColor;for(var u=0;u<o.length;u++){var l=u*n.width+r.barcodePadding;o[u]==="1"?i.fillRect(l,a,n.width,n.height):o[u]&&i.fillRect(l,a,n.width,n.height*o[u])}}},{key:"drawCanvasText",value:function(n,r){var i=this.canvas.getContext("2d"),o=n.fontOptions+" "+n.fontSize+"px "+n.font;if(n.displayValue){var a,u;n.textPosition=="top"?u=n.marginTop+n.fontSize-n.textMargin:u=n.height+n.textMargin+n.marginTop+n.fontSize,i.font=o,n.textAlign=="left"||r.barcodePadding>0?(a=0,i.textAlign="left"):n.textAlign=="right"?(a=r.width-1,i.textAlign="right"):(a=r.width/2,i.textAlign="center"),i.fillText(r.text,a,u)}}},{key:"moveCanvasDrawing",value:function(n){var r=this.canvas.getContext("2d");r.translate(n.width,0)}},{key:"restoreCanvas",value:function(){var n=this.canvas.getContext("2d");n.restore()}}]),t}();wn.default=ff});var Xi=c(bn=>{"use strict";Object.defineProperty(bn,"__esModule",{value:!0});var df=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),hf=Pe(),gf=pf(hf),En=yn();function pf(t){return t&&t.__esModule?t:{default:t}}function vf(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var it="http://www.w3.org/2000/svg",_f=function(){function t(e,n,r){vf(this,t),this.svg=e,this.encodings=n,this.options=r,this.document=r.xmlDocument||document}return df(t,[{key:"render",value:function(){var n=this.options.marginLeft;this.prepareSVG();for(var r=0;r<this.encodings.length;r++){var i=this.encodings[r],o=(0,gf.default)(this.options,i.options),a=this.createGroup(n,o.marginTop,this.svg);this.setGroupOptions(a,o),this.drawSvgBarcode(a,o,i),this.drawSVGText(a,o,i),n+=i.width}}},{key:"prepareSVG",value:function(){for(;this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);(0,En.calculateEncodingAttributes)(this.encodings,this.options);var n=(0,En.getTotalWidthOfEncodings)(this.encodings),r=(0,En.getMaximumHeightOfEncodings)(this.encodings),i=n+this.options.marginLeft+this.options.marginRight;this.setSvgAttributes(i,r),this.options.background&&this.drawRect(0,0,i,r,this.svg).setAttribute("style","fill:"+this.options.background+";")}},{key:"drawSvgBarcode",value:function(n,r,i){var o=i.data,a;r.textPosition=="top"?a=r.fontSize+r.textMargin:a=0;for(var u=0,l=0,f=0;f<o.length;f++)l=f*r.width+i.barcodePadding,o[f]==="1"?u++:u>0&&(this.drawRect(l-r.width*u,a,r.width*u,r.height,n),u=0);u>0&&this.drawRect(l-r.width*(u-1),a,r.width*u,r.height,n)}},{key:"drawSVGText",value:function(n,r,i){var o=this.document.createElementNS(it,"text");if(r.displayValue){var a,u;o.setAttribute("style","font:"+r.fontOptions+" "+r.fontSize+"px "+r.font),r.textPosition=="top"?u=r.fontSize-r.textMargin:u=r.height+r.textMargin+r.fontSize,r.textAlign=="left"||i.barcodePadding>0?(a=0,o.setAttribute("text-anchor","start")):r.textAlign=="right"?(a=i.width-1,o.setAttribute("text-anchor","end")):(a=i.width/2,o.setAttribute("text-anchor","middle")),o.setAttribute("x",a),o.setAttribute("y",u),o.appendChild(this.document.createTextNode(i.text)),n.appendChild(o)}}},{key:"setSvgAttributes",value:function(n,r){var i=this.svg;i.setAttribute("width",n+"px"),i.setAttribute("height",r+"px"),i.setAttribute("x","0px"),i.setAttribute("y","0px"),i.setAttribute("viewBox","0 0 "+n+" "+r),i.setAttribute("xmlns",it),i.setAttribute("version","1.1"),i.setAttribute("style","transform: translate(0,0)")}},{key:"createGroup",value:function(n,r,i){var o=this.document.createElementNS(it,"g");return o.setAttribute("transform","translate("+n+", "+r+")"),i.appendChild(o),o}},{key:"setGroupOptions",value:function(n,r){n.setAttribute("style","fill:"+r.lineColor+";")}},{key:"drawRect",value:function(n,r,i,o,a){var u=this.document.createElementNS(it,"rect");return u.setAttribute("x",n),u.setAttribute("y",r),u.setAttribute("width",i),u.setAttribute("height",o),a.appendChild(u),u}}]),t}();bn.default=_f});var Yi=c(xn=>{"use strict";Object.defineProperty(xn,"__esModule",{value:!0});var yf=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function mf(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var wf=function(){function t(e,n,r){mf(this,t),this.object=e,this.encodings=n,this.options=r}return yf(t,[{key:"render",value:function(){this.object.encodings=this.encodings}}]),t}();xn.default=wf});var Ji=c(Sn=>{"use strict";Object.defineProperty(Sn,"__esModule",{value:!0});var Ef=Vi(),bf=On(Ef),xf=Xi(),Of=On(xf),Sf=Yi(),Cf=On(Sf);function On(t){return t&&t.__esModule?t:{default:t}}Sn.default={CanvasRenderer:bf.default,SVGRenderer:Of.default,ObjectRenderer:Cf.default}});var Rn=c(Be=>{"use strict";Object.defineProperty(Be,"__esModule",{value:!0});function Cn(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function An(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t}function Tn(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var Af=function(t){Tn(e,t);function e(n,r){Cn(this,e);var i=An(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.name="InvalidInputException",i.symbology=n,i.input=r,i.message='"'+i.input+'" is not a valid input for '+i.symbology,i}return e}(Error),Tf=function(t){Tn(e,t);function e(){Cn(this,e);var n=An(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.name="InvalidElementException",n.message="Not supported type to render on",n}return e}(Error),Rf=function(t){Tn(e,t);function e(){Cn(this,e);var n=An(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.name="NoElementException",n.message="No element to render on.",n}return e}(Error);Be.InvalidInputException=Af;Be.InvalidElementException=Tf;Be.NoElementException=Rf});var Qi=c(Pn=>{"use strict";Object.defineProperty(Pn,"__esModule",{value:!0});var If=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Mf=Hi(),In=Ki(Mf),Pf=Ji(),Le=Ki(Pf),Bf=Rn();function Ki(t){return t&&t.__esModule?t:{default:t}}function Mn(t){if(typeof t=="string")return Lf(t);if(Array.isArray(t)){for(var e=[],n=0;n<t.length;n++)e.push(Mn(t[n]));return e}else{if(typeof HTMLCanvasElement<"u"&&t instanceof HTMLImageElement)return kf(t);if(t&&t.nodeName&&t.nodeName.toLowerCase()==="svg"||typeof SVGElement<"u"&&t instanceof SVGElement)return{element:t,options:(0,In.default)(t),renderer:Le.default.SVGRenderer};if(typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement)return{element:t,options:(0,In.default)(t),renderer:Le.default.CanvasRenderer};if(t&&t.getContext)return{element:t,renderer:Le.default.CanvasRenderer};if(t&&(typeof t>"u"?"undefined":If(t))==="object"&&!t.nodeName)return{element:t,renderer:Le.default.ObjectRenderer};throw new Bf.InvalidElementException}}function Lf(t){var e=document.querySelectorAll(t);if(e.length!==0){for(var n=[],r=0;r<e.length;r++)n.push(Mn(e[r]));return n}}function kf(t){var e=document.createElement("canvas");return{element:e,options:(0,In.default)(t),renderer:Le.default.CanvasRenderer,afterRender:function(){t.setAttribute("src",e.toDataURL())}}}Pn.default=Mn});var Wi=c(Bn=>{"use strict";Object.defineProperty(Bn,"__esModule",{value:!0});var Nf=function(){function t(e,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function Df(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var qf=function(){function t(e){Df(this,t),this.api=e}return Nf(t,[{key:"handleCatch",value:function(n){if(n.name==="InvalidInputException")if(this.api._options.valid!==this.api._defaults.valid)this.api._options.valid(!1);else throw n.message;else throw n;this.api.render=function(){}}},{key:"wrapBarcodeCall",value:function(n){try{var r=n.apply(void 0,arguments);return this.api._options.valid(!0),r}catch(i){return this.handleCatch(i),this.api}}}]),t}();Bn.default=qf});var ao=c((W0,oo)=>{"use strict";var jf=qi(),te=J(jf),Uf=Pe(),ke=J(Uf),Ff=ji(),eo=J(Ff),zf=Ui(),Zi=J(zf),Hf=Qi(),Gf=J(Hf),$f=gn(),Vf=J($f),Xf=Wi(),Yf=J(Xf),to=Rn(),Jf=vn(),no=J(Jf);function J(t){return t&&t.__esModule?t:{default:t}}var F=function(){},ot=function(e,n,r){var i=new F;if(typeof e>"u")throw Error("No element to render on was provided.");return i._renderProperties=(0,Gf.default)(e),i._encodings=[],i._options=no.default,i._errorHandler=new Yf.default(i),typeof n<"u"&&(r=r||{},r.format||(r.format=io()),i.options(r)[r.format](n,r).render()),i};ot.getModule=function(t){return te.default[t]};for(Ln in te.default)te.default.hasOwnProperty(Ln)&&Kf(te.default,Ln);var Ln;function Kf(t,e){F.prototype[e]=F.prototype[e.toUpperCase()]=F.prototype[e.toLowerCase()]=function(n,r){var i=this;return i._errorHandler.wrapBarcodeCall(function(){r.text=typeof r.text>"u"?void 0:""+r.text;var o=(0,ke.default)(i._options,r);o=(0,Vf.default)(o);var a=t[e],u=ro(n,a,o);return i._encodings.push(u),i})}}function ro(t,e,n){t=""+t;var r=new e(t,n);if(!r.valid())throw new to.InvalidInputException(r.constructor.name,t);var i=r.encode();i=(0,eo.default)(i);for(var o=0;o<i.length;o++)i[o].options=(0,ke.default)(n,i[o].options);return i}function io(){return te.default.CODE128?"CODE128":Object.keys(te.default)[0]}F.prototype.options=function(t){return this._options=(0,ke.default)(this._options,t),this};F.prototype.blank=function(t){var e=new Array(t+1).join("0");return this._encodings.push({data:e}),this};F.prototype.init=function(){if(this._renderProperties){Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]);var t;for(var e in this._renderProperties){t=this._renderProperties[e];var n=(0,ke.default)(this._options,t.options);n.format=="auto"&&(n.format=io()),this._errorHandler.wrapBarcodeCall(function(){var r=n.value,i=te.default[n.format.toUpperCase()],o=ro(r,i,n);kn(t,o,n)})}}};F.prototype.render=function(){if(!this._renderProperties)throw new to.NoElementException;if(Array.isArray(this._renderProperties))for(var t=0;t<this._renderProperties.length;t++)kn(this._renderProperties[t],this._encodings,this._options);else kn(this._renderProperties,this._encodings,this._options);return this};F.prototype._defaults=no.default;function kn(t,e,n){e=(0,eo.default)(e);for(var r=0;r<e.length;r++)e[r].options=(0,ke.default)(n,e[r].options),(0,Zi.default)(e[r].options);(0,Zi.default)(n);var i=t.renderer,o=new i(t.element,e,n);o.render(),t.afterRender&&t.afterRender()}typeof window<"u"&&(window.JsBarcode=ot);typeof jQuery<"u"&&(jQuery.fn.JsBarcode=function(t,e){var n=[];return jQuery(this).each(function(){n.push(this)}),ot(n,t,e)});oo.exports=ot});var ho=Un(Ur()),go=Un(ao());var uo=`:host {
	display: flex;
	flex-direction: column;
	height: 100vh;
	min-height: 100vh;
	box-sizing: border-box;
}

.toolbar {
	display: flex;
	flex-direction: column;
	flex: 0 0 auto;
	gap: 8px;
	padding-bottom: 8px;
}

.toolbar + div {
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	min-height: 0;
}

.action-row {
	display: flex;
	gap: 8px;
	align-items: center;
}
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
button:hover {
	background: #555;
}

button.active {
	background: #2f5f8f;
}

button.active:hover {
	background: #284f77;
}
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
.filter-panel {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.filter-panel[hidden] {
	display: none;
}

.filter-group {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 6px;
}

.filter-chip {
	min-height: 34px;
	padding: 0 8px;
	background: #efefef;
	color: #1f1f1f;
	border: 1px solid #d0d0d0;
	font-size: 0.95em;
}

.filter-chip.active {
	background: #2f5f8f;
	border-color: #2f5f8f;
	color: #fff;
	font-weight: 700;
}

.filter-chip:hover {
	background: #dedede;
}

.filter-chip.active:hover {
	background: #284f77;
}
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
`;var Wf=new Set(["EAN","EAN13","EAN8","UPC","ITF","ITF14","MSI","MSI10","MSI11","MSI1010","MSI1110","pharmacode"]),Zf="pk_Svpm4b4MRmC5bvOmTw9jdg",Ne="wallet_assistant",ed={loyalty:"Card",voucher:"Voucher",promotion:"Promo"},at="wallet-assistant-card",ut="barcode",td=new Set([ut,"qr"]),lt="grid",nd=new Set([lt,"list"]);window.customCards=window.customCards||[];window.customCards.some(t=>t.type===at)||window.customCards.push({type:at,name:"Wallet Assistant",description:"Manage loyalty cards, vouchers, and promotions.",preview:!1,documentationURL:"https://github.com/myTselection/Wallet-Assistant"});function rd(t,e){let n=String(t??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]/g,"");return Wf.has(e)&&(n=n.replace(/\D/g,"")),n}function y(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function lo(t){return String(t||"?").trim().charAt(0).toUpperCase()||"?"}function co(t,e=64){let n=String(t??"").trim();return n?`https://img.logo.dev/${encodeURIComponent(n)}?token=${Zf}&size=${e}&format=webp&retina=true`:""}function O(t){return t?.item_id}function ne(t){return t?.item_type||"loyalty"}function Nn(t){return ed[ne(t)]||"Item"}function po(t,e){return String(t?.name||"").localeCompare(String(e?.name||""),void 0,{numeric:!0,sensitivity:"base"})}function so(t){if(!t?.expires_on)return Number.POSITIVE_INFINITY;let e=new Date(`${t.expires_on}T00:00:00`).getTime();return Number.isNaN(e)?Number.POSITIVE_INFINITY:e}function id(t,e){return so(t)-so(e)||po(t,e)}function vo(t){return td.has(t)?t:ut}function od(t){return nd.has(t)?t:lt}function fo(t){if(!t)return"";let e=new Date(`${t}T00:00:00`);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}function k(t){return{...t,item_id:O(t),item_type:ne(t),format:t.format||"CODE128",default_view:vo(t.default_view),code:t.code||"",expires_on:t.expires_on||""}}function Dn(t,e,n,r={},i=null){let o=rd(e,n);if(t instanceof HTMLCanvasElement){let a=t.getContext("2d");a&&a.clearRect(0,0,t.width,t.height)}else for(;t.firstChild;)t.removeChild(t.firstChild);i&&(i.style.display="none");try{return(0,go.default)(t,o,{format:n,width:5,height:80,...r}),{ok:!0}}catch(a){let u=`Invalid input for ${n}.`+(a?.message?` (${a.message})`:"");if(i)i.textContent=u,i.style.display="block";else if(t&&t.parentElement){let l=document.createElement("div");l.className="error",l.style.cssText="color:red;font-size:0.9em;",l.textContent=u,t.replaceWith(l)}return{ok:!1,message:u}}}var qn=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.viewModes={},this.selectedCard=null,this.filtersEnabled=!1,this.activeOwner="all",this.activeType="all",this._inputState={name:"",code:"",logo_slug:"",item_type:"loyalty",expires_on:""},this.toolbarContainer=document.createElement("div"),this.toolbarContainer.className="toolbar",this.dynamicContainer=document.createElement("div"),this.filterText="",this.showAddDialog=!1,this.cardViewMode=lt;let e=document.createElement("style");e.textContent=uo,this.shadowRoot.appendChild(e),this.shadowRoot.appendChild(this.toolbarContainer),this.shadowRoot.appendChild(this.dynamicContainer),this.toolbarContainer.innerHTML=`
      <div class="action-row">
        <input id="filter" class="filter-input" placeholder="Filter items..." value="" />
        <button id="toggle-filters" class="toolbar-icon-button" title="Show filters" aria-label="Show filters"><ha-icon icon="mdi:filter-outline"></ha-icon></button>
        <button id="toggle-card-view" class="toolbar-icon-button" title="List view" aria-label="List view"><ha-icon icon="mdi:view-list"></ha-icon></button>
        <button id="add-card" class="toolbar-icon-button" title="Add item"><ha-icon icon="mdi:plus"></ha-icon></button>
      </div>
      <div class="filter-panel" hidden>
        <div class="filter-group owner-filter" aria-label="Owner filter">
          <button class="filter-chip active" id="owner-all" type="button">All</button>
          <button class="filter-chip" id="owner-own" type="button">Mine</button>
          <button class="filter-chip" id="owner-others" type="button">Others</button>
        </div>
        <div class="filter-group type-filter" aria-label="Type filter">
          <button class="filter-chip active" id="type-all" type="button">All</button>
          <button class="filter-chip" id="type-loyalty" type="button">Cards</button>
          <button class="filter-chip" id="type-voucher" type="button">Vouchers</button>
        </div>
      </div>
    `,this.toolbarContainer.querySelector("#filter")?.addEventListener("input",n=>{this.filterText=n.target.value,this.render()}),this.toolbarContainer.querySelector("#add-card")?.addEventListener("click",()=>{this.showAddDialog=!0,this.render()}),this.toolbarContainer.querySelector("#toggle-filters")?.addEventListener("click",()=>{this.filtersEnabled=!this.filtersEnabled,this.render()}),this.toolbarContainer.querySelector("#toggle-card-view")?.addEventListener("click",()=>{this.cardViewMode=this.cardViewMode==="list"?"grid":"list",this.render()}),["all","own","others"].forEach(n=>{this.toolbarContainer.querySelector(`#owner-${n}`)?.addEventListener("click",()=>{this.activeOwner=n,this.render()})}),["all","loyalty","voucher"].forEach(n=>{this.toolbarContainer.querySelector(`#type-${n}`)?.addEventListener("click",()=>{this.activeType=n,this.render()})})}setConfig(e){this._config=e,this.cardViewMode=od(e?.card_view_mode)}static getStubConfig(){return{card_view_mode:lt}}set hass(e){this._hass=e,this.loadCards()}async loadCards(){let e=this.shadowRoot.getElementById("add-name")||this.shadowRoot.getElementById("name"),n=this.shadowRoot.getElementById("add-code")||this.shadowRoot.getElementById("code"),r=this.shadowRoot.getElementById("add-logo-slug")||this.shadowRoot.getElementById("logo-slug"),i=this.shadowRoot.getElementById("add-type"),o=this.shadowRoot.getElementById("add-expires-on"),a=this.shadowRoot.activeElement?.id||document.activeElement?.id;(e||n||r||i||o)&&(this._inputState.name=e?.value||"",this._inputState.code=n?.value||"",this._inputState.logo_slug=r?.value||"",this._inputState.item_type=i?.value||"loyalty",this._inputState.expires_on=o?.value||"",this._inputState.focusId=a);let u=await this._hass.callApi("get",Ne),l=this._hass.user.id,f=u.map(k);this.ownCards=f.filter(d=>d.user_id===l),this.otherCards=f.filter(d=>d.user_id!==l),this.render()}async toggleCodeType(e){let n=this.selectedCard||[...this.ownCards,...this.otherCards].find(i=>O(i)===e),r=(this.viewModes[e]||n?.default_view||ut)==="barcode"?"qr":"barcode";if(this.viewModes[e]=r,n){let i=k({...n,default_view:r});this.ownCards=this.ownCards.map(o=>O(o)===e?k({...o,default_view:r}):o),this.otherCards=this.otherCards.map(o=>O(o)===e?k({...o,default_view:r}):o),this.selectedCard&&O(this.selectedCard)===e&&(this.selectedCard=i)}if(this.render(),!(!n||n.user_id!==this._hass.user.id))try{let i=await this._hass.callApi("put",`${Ne}/${e}`,{default_view:r}),o=k({...n,...i||{},default_view:r});this.ownCards=this.ownCards.map(a=>O(a)===e?k({...a,...o}):a),this.selectedCard&&O(this.selectedCard)===e&&(this.selectedCard=k({...this.selectedCard,...o}))}catch(i){console.error("Unable to save Wallet Assistant default view:",i)}}openCard(e){this.selectedCard=[...this.ownCards,...this.otherCards].find(n=>O(n)===e),this.selectedCard&&!this.viewModes[e]&&(this.viewModes[e]=this.selectedCard.default_view),this.render()}closeCard(){this.selectedCard=null,this.render()}async addCard(e){e.preventDefault();let n=this.shadowRoot.getElementById("add-name")||this.shadowRoot.getElementById("name"),r=this.shadowRoot.getElementById("add-code")||this.shadowRoot.getElementById("code"),i=this.shadowRoot.getElementById("add-logo-slug")||this.shadowRoot.getElementById("logo-slug"),o=this.shadowRoot.getElementById("add-type"),a=this.shadowRoot.getElementById("add-expires-on"),u=n?.value?.trim(),l=r?.value?.trim(),f=i?.value?.trim()||"",d=o?.value||"loyalty",m=a?.value||"";if(!u||!l)return alert("Missing fields");await this._hass.callApi("post",Ne,{name:u,code:l,logo_slug:f,owner:this._hass.user.name,user_id:this._hass.user.id,item_type:d,expires_on:d==="voucher"?m:"",format:"CODE128",default_view:ut}),this._inputState={name:"",code:"",logo_slug:"",item_type:"loyalty",expires_on:""},n&&(n.value=""),r&&(r.value=""),i&&(i.value=""),o&&(o.value="loyalty"),a&&(a.value=""),this.showAddDialog=!1,this.loadCards()}closeAddDialog(){this.showAddDialog=!1,this.render()}async deleteCard(e){await this._hass.callApi("delete",`${Ne}/${O(e)}`,{user_id:e.user_id}),this.closeCard(),this.loadCards()}async updateCard(e){let n=["CODE128","CODE128A","CODE128B","CODE128C","EAN13","EAN8","UPC","CODE39","ITF14","ITF","MSI","MSI10","MSI11","MSI1010","MSI1110","pharmacode","codabar","CODE93"],r=document.createElement("div");r.className="edit-dialog",r.innerHTML=`
      <div class="dialog-content">
        <label>Name</label>
        <input id="edit-name" type="text" value="${y(e.name)}" />
        <label>Barcode number</label>
        <input id="edit-code" type="text" value="${y(e.code)}" />
        <label>Logo.dev slug</label>
        <input id="edit-logo-slug" type="text" value="${y(e.logo_slug||"")}" placeholder="example.com" />
        <label>Type</label>
        <select id="edit-type">
          <option value="loyalty" ${ne(e)==="loyalty"?"selected":""}>Loyalty card</option>
          <option value="voucher" ${ne(e)==="voucher"?"selected":""}>Voucher</option>
          <option value="promotion" ${ne(e)==="promotion"?"selected":""}>Promotion</option>
        </select>
        <label>Expiry date</label>
        <input id="edit-expires-on" type="date" value="${y(e.expires_on||"")}" />
        <label>Default barcode format</label>
        <select id="edit-format">
          ${n.map(v=>`<option value="${v}" ${v===(e.format||"CODE128")?"selected":""}>${v}</option>`).join("")}
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
    `,this.shadowRoot.appendChild(r);let i=r.querySelector("#edit-name"),o=r.querySelector("#edit-code"),a=r.querySelector("#edit-logo-slug"),u=r.querySelector("#edit-type"),l=r.querySelector("#edit-expires-on"),f=r.querySelector("#edit-format"),d=r.querySelector("#preview-canvas"),m=r.querySelector("#preview-error"),h=()=>{let v=f.value,w=o?.value?.trim()||e.code;Dn(d,w,v,{width:2,height:60},m)};f.addEventListener("change",h),o?.addEventListener("input",h),h(),r.querySelector("#cancel-btn").addEventListener("click",()=>r.remove()),r.querySelector("#delete-btn").addEventListener("click",async()=>{r.remove(),await this.deleteCard(e)}),r.querySelector("#save-btn").addEventListener("click",async()=>{let v=i.value,w=r.querySelector("#edit-code").value,S=a.value.trim(),B=u.value,N=l.value,K=f.value,z=await this._hass.callApi("put",`${Ne}/${O(e)}`,{user_id:e.user_id,name:v,code:w,logo_slug:S,item_type:B,expires_on:B==="voucher"?N:"",format:K}),D={name:v,code:w,logo_slug:S,item_type:B,expires_on:B==="voucher"?N:"",format:K,...z||{}};if(this.ownCards=this.ownCards.map(s=>O(s)===O(e)?k({...s,...D}):s),this.otherCards=this.otherCards.map(s=>O(s)===O(e)?k({...s,...D}):s),this.selectedCard&&O(this.selectedCard)===O(e)){this.selectedCard=k({...this.selectedCard,...D});let s=this.dynamicContainer.querySelector("#code-preview");if(s){let x=document.createElement("canvas");s.innerHTML="",s.appendChild(x);let C=this.selectedCard.format||"CODE128";Dn(x,this.selectedCard.code,C)}let _=this.dynamicContainer.querySelector(".card-title");_&&(_.textContent=this.selectedCard.name)}r.remove(),this.render()})}render(){let e=this.dynamicContainer.querySelector(".cardlist"),n=e?e.scrollTop:0,r=this.shadowRoot.activeElement,i=r?.id,o=r?.selectionStart,a=r?.selectionEnd,u=[...this.ownCards||[],...this.otherCards||[]],l=this.filtersEnabled&&this.activeOwner!=="all"?u.filter(s=>this.activeOwner==="own"?s.user_id===this._hass.user.id:s.user_id!==this._hass.user.id):u,f=(this.filterText||"").trim().toLowerCase(),d=!this.filtersEnabled||this.activeType==="all"?l:l.filter(s=>ne(s)===this.activeType),h=[...f?d.filter(s=>s.name.toLowerCase().includes(f)||String(s.owner||"").toLowerCase().includes(f)||Nn(s).toLowerCase().includes(f)):d].sort(this.filtersEnabled&&this.activeType==="voucher"?id:po),v=this.toolbarContainer.querySelector("#filter"),w=this.toolbarContainer.querySelector("#toggle-filters"),S=this.toolbarContainer.querySelector("#toggle-card-view"),B=this.toolbarContainer.querySelector(".filter-panel");if(v&&(v.value=this.filterText),w&&(w.classList.toggle("active",this.filtersEnabled),w.title=this.filtersEnabled?"Hide filters":"Show filters",w.setAttribute("aria-label",w.title),w.setAttribute("aria-pressed",String(this.filtersEnabled)),w.innerHTML=`<ha-icon icon="${this.filtersEnabled?"mdi:filter":"mdi:filter-outline"}"></ha-icon>`),S){let s=this.cardViewMode==="grid";S.title=s?"List view":"Grid view",S.setAttribute("aria-label",S.title),S.innerHTML=`<ha-icon icon="${s?"mdi:view-list":"mdi:view-grid"}"></ha-icon>`}B&&(B.hidden=!this.filtersEnabled),["all","own","others"].forEach(s=>{this.toolbarContainer.querySelector(`#owner-${s}`)?.classList.toggle("active",this.activeOwner===s)}),["all","loyalty","voucher"].forEach(s=>{this.toolbarContainer.querySelector(`#type-${s}`)?.classList.toggle("active",this.activeType===s)});let N=this.selectedCard?co(this.selectedCard.logo_slug,96):"",K=this.selectedCard?lo(this.selectedCard.name):"",z=this.selectedCard?.expires_on?fo(this.selectedCard.expires_on):"";if(this.dynamicContainer.innerHTML=`
      <div class="cardlist ${this.cardViewMode==="grid"?"grid-view":"list-view"}">
        ${h.length?h.map(s=>{let _=co(s.logo_slug,64),x=lo(s.name),C=Nn(s),q=s.expires_on?fo(s.expires_on):"";return`
          <div class="card ${ne(s)}" data-card-id="${y(O(s))}" title="${y(s.name)}">
            <div class="card-logo-wrap">
              ${_?`<img class="card-logo" src="${y(_)}" alt="" data-initial="${y(x)}" loading="lazy" />`:`<div class="card-logo-placeholder">${y(x)}</div>`}
            </div>
            <div class="card-details">
              <strong>${y(s.name)}</strong>
              <small class="item-meta">
                <span>${y(C)}</span>
                ${q?`<span class="expiry"><ha-icon icon="mdi:calendar-clock"></ha-icon>${y(q)}</span>`:""}
                ${s.user_id!==this._hass.user.id?`<span><ha-icon icon="mdi:account"></ha-icon>${y(s.owner)}</span>`:""}
              </small>
            </div>
          </div>
        `}).join(""):'<div class="no-results">No matching items</div>'}
      </div>
      ${this.selectedCard?`
        <div class="popup">
          <div class="popup-header">
            <div class="popup-logo-wrap">
              ${N?`<img class="card-logo popup-logo" src="${y(N)}" alt="" data-initial="${y(K)}" loading="lazy" />`:`<div class="card-logo-placeholder popup-logo-placeholder">${y(K)}</div>`}
            </div>
            <h3 class="card-title">${y(this.selectedCard.name)}</h3>
          </div>
          <div class="popup-meta">
            <span>${y(Nn(this.selectedCard))}</span>
            ${z?`<span><ha-icon icon="mdi:calendar-clock"></ha-icon>${y(z)}</span>`:""}
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
    `,this.dynamicContainer.querySelectorAll("[data-card-id]").forEach(s=>s.addEventListener("click",()=>this.openCard(s.getAttribute("data-card-id")))),this.dynamicContainer.querySelectorAll(".card-logo").forEach(s=>s.addEventListener("error",()=>{let _=document.createElement("div");_.className=s.classList.contains("popup-logo")?"card-logo-placeholder popup-logo-placeholder":"card-logo-placeholder",_.textContent=s.dataset.initial||"?",s.replaceWith(_)})),this.showAddDialog){this.dynamicContainer.querySelector("#add-card-form")?.addEventListener("submit",this.addCard.bind(this)),this.dynamicContainer.querySelector("#cancel-add-btn")?.addEventListener("click",()=>this.closeAddDialog());let _=this.shadowRoot.getElementById("add-name"),x=this.shadowRoot.getElementById("add-code"),C=this.shadowRoot.getElementById("add-logo-slug"),q=this.shadowRoot.getElementById("add-type"),_o=this.shadowRoot.getElementById("add-expires-on");_?.addEventListener("input",j=>{this._inputState.name=j.target.value}),x?.addEventListener("input",j=>{this._inputState.code=j.target.value}),C?.addEventListener("input",j=>{this._inputState.logo_slug=j.target.value}),q?.addEventListener("change",j=>{this._inputState.item_type=j.target.value}),_o?.addEventListener("input",j=>{this._inputState.expires_on=j.target.value})}if(this.selectedCard){let s=O(this.selectedCard),_=vo(this.viewModes[s]||this.selectedCard.default_view),x=this.dynamicContainer.querySelector("#code-preview");if(x.innerHTML="",_==="qr"){let C=document.createElement("canvas");x.appendChild(C),ho.default.toCanvas(C,this.selectedCard.code,{width:160,margin:1},q=>{q&&console.error("QR generation error:",q)})}else{let C=document.createElement("canvas");x.appendChild(C);let q=this.selectedCard.format||"CODE128";Dn(C,this.selectedCard.code,q)}this.dynamicContainer.querySelector("#toggle-code")?.addEventListener("click",()=>this.toggleCodeType(s)),this.dynamicContainer.querySelector("#close")?.addEventListener("click",()=>this.closeCard()),this.selectedCard.user_id===this._hass.user.id&&this.dynamicContainer.querySelector("#edit")?.addEventListener("click",()=>this.updateCard(this.selectedCard))}let D=this.dynamicContainer.querySelector(".cardlist");D&&(D.scrollTop=n),i==="filter"&&v&&(v.focus(),typeof o=="number"&&typeof a=="number"&&v.setSelectionRange(o,a))}};customElements.get(at)||customElements.define(at,qn);
