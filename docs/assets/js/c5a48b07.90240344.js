/*! For license information please see c5a48b07.90240344.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[264],{3905:function(t,e,r){"use strict";r.d(e,{Zo:function(){return l},kt:function(){return d}});var n=r(7294);function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}var u=n.createContext({}),s=function(t){var e=n.useContext(u),r=e;return t&&(r="function"==typeof t?t(e):a(a({},e),t)),r},l=function(t){var e=s(t.components);return n.createElement(u.Provider,{value:e},t.children)},f={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},p=n.forwardRef((function(t,e){var r=t.components,o=t.mdxType,i=t.originalType,u=t.parentName,l=c(t,["components","mdxType","originalType","parentName"]),p=s(r),d=o,v=p["".concat(u,".").concat(d)]||p[d]||f[d]||i;return r?n.createElement(v,a(a({ref:e},l),{},{components:r})):n.createElement(v,a({ref:e},l))}));function d(t,e){var r=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var i=r.length,a=new Array(i);a[0]=p;var c={};for(var u in e)hasOwnProperty.call(e,u)&&(c[u]=e[u]);c.originalType=t,c.mdxType="string"==typeof t?t:o,a[1]=c;for(var s=2;s<i;s++)a[s]=r[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},3755:function(t,e,r){"use strict";r.d(e,{Z:function(){return u}});var n=r(7462),o=r(3366),i=r(7294),a=r(9700),c=["path","children","title"];function u(t){var e=t.path,r=t.children,u=t.title,s=(0,o.Z)(t,c);if(!e)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(t,null,2));var l=(0,a.B)(e);r=r||l,u=u||r;var f="https://github.com/Domiii/dbux/tree/master/"+e;return i.createElement("a",(0,n.Z)({title:u,href:f},s),r)}},633:function(t,e,r){"use strict";r.d(e,{Z:function(){return d}});var n=r(7462),o=r(3366),i=r(7294),a=r(4184),c=r.n(a),u=r(7037),s=r.n(u),l=r(5350),f=r(8767);var p=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","mb","style"];function d(t){var e=t.src,r=t.title,a=t.zoomable,u=t.darkLight,d=t.screen,v=t.concept,b=t.className,g=t.maxWidth,m=t.mb,h=t.style,y=(0,o.Z)(t,p);v&&(e.startsWith("concept")||e.startsWith("/")||e.includes("://")||(e="concepts/"+e)),d&&(e.startsWith("screen")||e.startsWith("/")||e.includes("://")||(e="screens/"+e));var x=v||d||a;x&&void 0===a&&(a=!0);var O=function(t){var e=t.src,r=t.darkLight,n=(0,l.Z)().isDarkTheme;return(0,f.Z)()+(r?n?"dark/":"light/":"")+e}({src:e,darkLight:u}),j=r=r||e;b=c()(b,{"border-screen":x,"img-crisp":x,zoomable:a});var w=i.createElement("img",(0,n.Z)({className:b,style:h,src:O,alt:j,title:r},y));if(g){g=s()(g)?g:g+"px",m=void 0===m?"mb-2":m;var k=c()(m),T={display:"inline-block",maxWidth:g,lineHeight:0};w=i.createElement("div",{className:k,style:T},w)}return w}},8767:function(t,e,r){"use strict";r.d(e,{Z:function(){return o}});var n=r(2263);function o(){return(0,n.Z)().siteConfig.baseUrl}},9700:function(t,e,r){"use strict";r.d(e,{B:function(){return o}});var n={"dbux-code":"Dbux VSCode Extension"};function o(t){var e=n[t];return e||(t.startsWith("dbux-")&&!t.startsWith("dbux-code")?"@dbux/"+t.substring(5):t)}},597:function(t,e,r){"use strict";r.r(e),r.d(e,{frontMatter:function(){return u},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return f},default:function(){return d}});var n=r(7462),o=r(3366),i=(r(7294),r(3905)),a=r(633),c=(r(3755),["components"]),u={slug:"/tools-and-configuration"},s="Tools and Configuration Overview",l={unversionedId:"tools-and-configuration/overview",id:"tools-and-configuration/overview",title:"Tools and Configuration Overview",description:"The Dbux Overview explains Dbux's tools and architecture at the higher level.",source:"@site/content/tools-and-configuration/00-overview.mdx",sourceDirName:"tools-and-configuration",slug:"/tools-and-configuration",permalink:"/dbux/tools-and-configuration",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/tools-and-configuration/00-overview.mdx",tags:[],version:"current",sidebarPosition:0,frontMatter:{slug:"/tools-and-configuration"},sidebar:"tutorialSidebar",previous:{title:"Build Pipeline Integration",permalink:"/dbux/guides/build-pipeline-integration"},next:{title:"Dbux VSCode Extension",permalink:"/dbux/tools-and-configuration/dbux-code"}},f=[],p={toc:f};function d(t){var e=t.components,r=(0,o.Z)(t,c);return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"tools-and-configuration-overview"},"Tools and Configuration Overview"),(0,i.kt)(a.Z,{zoomable:!0,src:"dbux-architecture.png",mdxType:"Img"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/dbux/runtime-analysis"},"The Dbux Overview")," explains Dbux's tools and architecture at the higher level."),(0,i.kt)("p",null,"This chapter documents the individual tools involved in this architecture."))}d.isMDXComponent=!0},4184:function(t,e){var r;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var i=typeof r;if("string"===i||"number"===i)t.push(r);else if(Array.isArray(r)){if(r.length){var a=o.apply(null,r);a&&t.push(a)}}else if("object"===i)if(r.toString===Object.prototype.toString)for(var c in r)n.call(r,c)&&r[c]&&t.push(c);else t.push(r.toString())}}return t.join(" ")}t.exports?(o.default=o,t.exports=o):void 0===(r=function(){return o}.apply(e,[]))||(t.exports=r)}()},2705:function(t,e,r){var n=r(5639).Symbol;t.exports=n},4239:function(t,e,r){var n=r(2705),o=r(9607),i=r(2333),a=n?n.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":a&&a in Object(t)?o(t):i(t)}},1957:function(t,e,r){var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;t.exports=n},9607:function(t,e,r){var n=r(2705),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,c=n?n.toStringTag:void 0;t.exports=function(t){var e=i.call(t,c),r=t[c];try{t[c]=void 0;var n=!0}catch(u){}var o=a.call(t);return n&&(e?t[c]=r:delete t[c]),o}},2333:function(t){var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},5639:function(t,e,r){var n=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=n||o||Function("return this")();t.exports=i},1469:function(t){var e=Array.isArray;t.exports=e},7005:function(t){t.exports=function(t){return null!=t&&"object"==typeof t}},7037:function(t,e,r){var n=r(4239),o=r(1469),i=r(7005);t.exports=function(t){return"string"==typeof t||!o(t)&&i(t)&&"[object String]"==n(t)}}}]);