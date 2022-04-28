/*! For license information please see 6feae079.2f3739bc.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[879],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(n),f=o,m=p["".concat(s,".").concat(f)]||p[f]||d[f]||i;return n?r.createElement(m,a(a({ref:t},u),{},{components:n})):r.createElement(m,a({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3755:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(7462),o=n(3366),i=n(7294),a=n(9700),c=["path","children","title"];function s(e){var t=e.path,n=e.children,s=e.title,l=(0,o.Z)(e,c);if(!t)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var u=(0,a.B)(t);n=n||u,s=s||n;var d="https://github.com/Domiii/dbux/tree/master/"+t;return i.createElement("a",(0,r.Z)({title:s,href:d},l),n)}},5679:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(7294),o=n(633);function i(e){var t=Object.assign({},e);return"darkLight"in t||(t.darkLight=!0),r.createElement(o.Z,t)}},633:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var r=n(7462),o=n(3366),i=n(7294),a=n(4184),c=n.n(a),s=n(7037),l=n.n(s),u=n(5350),d=n(8767);var p=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","mb","style"];function f(e){return e.startsWith("/")||e.includes("://")}function m(e){var t=e.src,n=e.title,a=e.zoomable,s=e.darkLight,m=e.screen,b=e.concept,y=e.className,g=e.maxWidth,h=e.mb,v=e.style,x=(0,o.Z)(e,p);b&&(t.startsWith("concept")||f(t)||(t="concepts/"+t)),m&&(t.startsWith("screen")||f(t)||(t="screens/"+t));var k=b||m||a;k&&void 0===a&&(a=!0);var O=function(e){var t=e.src,n=e.darkLight,r=(0,u.Z)().isDarkTheme;return(0,d.Z)()+(n?r?"dark/":"light/":"")+t}({src:t,darkLight:s}),j=n=n||t;y=c()(y,{"border-screen":k,"img-crisp":k,zoomable:a});var w=i.createElement("img",(0,r.Z)({className:y,style:v,src:O,alt:j,title:n},x));if(g){g=l()(g)?g:g+"px",h=void 0===h?"mb-2":h;var N=c()(h),D={display:"inline-block",maxWidth:g,lineHeight:0};w=i.createElement("div",{className:N,style:D},w)}return w}},8767:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(2263);function o(){return(0,r.Z)().siteConfig.baseUrl}},9700:function(e,t,n){"use strict";n.d(t,{B:function(){return o}});var r={"dbux-code":"Dbux VSCode Extension"};function o(e){var t=r[e];return t||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}},1870:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return d},toc:function(){return p},default:function(){return m}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=n(633),c=n(3755),s=(n(5679),["components"]),l={sidebar_class_name:"sidebar-code-decorations"},u="Code Decorations",d={unversionedId:"dynamic-analysis/code-decorations",id:"dynamic-analysis/code-decorations",title:"Code Decorations",description:"After executing an application with Dbux enabled, all executed code is decorated with \u21b3 \u21b1 \u21b3 \u0192 etc.",source:"@site/content/dynamic-analysis/04-code-decorations.mdx",sourceDirName:"dynamic-analysis",slug:"/dynamic-analysis/code-decorations",permalink:"/dbux/dynamic-analysis/code-decorations",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/dynamic-analysis/04-code-decorations.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_class_name:"sidebar-code-decorations"},sidebar:"tutorialSidebar",previous:{title:"The Run Button",permalink:"/dbux/dynamic-analysis/the-run-button"},next:{title:"Select Trace",permalink:"/dbux/dynamic-analysis/select-trace"}},p=[{value:"Interpreting Decorations",id:"interpreting-decorations",children:[],level:2},{value:"Examples",id:"examples",children:[],level:2}],f={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,s);return(0,i.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"code-decorations"},"Code Decorations"),(0,i.kt)("p",null,"After ",(0,i.kt)("a",{parentName:"p",href:"/dbux/dynamic-analysis/enable-dbux"},"executing an application with Dbux enabled"),", all executed code is decorated with ",(0,i.kt)("span",{className:"color-red"},"\u21b3 \u21b1")," ",(0,i.kt)("span",{className:"color-gray"},"\u21b3")," ",(0,i.kt)("span",{className:"color-orange"},"\u0192")," etc."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"These decorations allow us to better understand which parts of the code actually executed, and covey some basic properties of how the code executed."),(0,i.kt)("li",{parentName:"ul"},"You can toggle decorations via the ",(0,i.kt)("inlineCode",{parentName:"li"},"Dbux: Hide Decorations")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"Dbux: Show Decorations")," commands:",(0,i.kt)(a.Z,{screen:!0,src:"toggle-deco.png",mdxType:"Img"}))),(0,i.kt)("h2",{id:"interpreting-decorations"},"Interpreting Decorations"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Example: ",(0,i.kt)("code",null,"f()",(0,i.kt)("span",{className:"color-red"},"\u21b1"),";")," - the function ",(0,i.kt)("inlineCode",{parentName:"li"},"f")," was executed and recorded, and we can step into it."),(0,i.kt)("li",{parentName:"ul"},"Example: ",(0,i.kt)("code",null,"g()",(0,i.kt)("span",{className:"color-gray"},"\u21b1"),";")," - the function ",(0,i.kt)("inlineCode",{parentName:"li"},"g")," was executed but not recorded, and we cannot step into it. This means that ",(0,i.kt)("inlineCode",{parentName:"li"},"g")," is a native function or ",(0,i.kt)("a",{parentName:"li",href:"/dbux/guides/runtime-trace-filtering"},"not recorded for other reasons"),"."),(0,i.kt)("li",{parentName:"ul"},"All code decorations and their meanings are defined in ",(0,i.kt)(c.Z,{path:"dbux-code/src/codeDeco/traceDecoConfig.js",mdxType:"CodeLink"}),".")),(0,i.kt)("h2",{id:"examples"},"Examples"),(0,i.kt)("p",null,"In this buggy code, we can see that line 6 never executed, just from the code decorations:"),(0,i.kt)(a.Z,{screen:!0,src:"code-deco1.png",mdxType:"Img"}),(0,i.kt)("p",null,"TODO: more examples"))}m.isMDXComponent=!0},4184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var a=o.apply(null,n);a&&e.push(a)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var c in n)r.call(n,c)&&n[c]&&e.push(c);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},2705:function(e,t,n){var r=n(5639).Symbol;e.exports=r},4239:function(e,t,n){var r=n(2705),o=n(9607),i=n(2333),a=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":a&&a in Object(e)?o(e):i(e)}},1957:function(e,t,n){var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},9607:function(e,t,n){var r=n(2705),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,c=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,c),n=e[c];try{e[c]=void 0;var r=!0}catch(s){}var o=a.call(e);return r&&(t?e[c]=n:delete e[c]),o}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,n){var r=n(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,t,n){var r=n(4239),o=n(1469),i=n(7005);e.exports=function(e){return"string"==typeof e||!o(e)&&i(e)&&"[object String]"==r(e)}}}]);