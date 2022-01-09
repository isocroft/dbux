/*! For license information please see 8bfcb8a9.f8536d89.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[772],{3905:function(t,e,n){"use strict";n.d(e,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var s=r.createContext({}),l=function(t){var e=r.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):o(o({},e),t)),n},u=function(t){var e=l(t.components);return r.createElement(s.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,i=t.originalType,s=t.parentName,u=c(t,["components","mdxType","originalType","parentName"]),m=l(n),d=a,f=m["".concat(s,".").concat(d)]||m[d]||p[d]||i;return n?r.createElement(f,o(o({ref:e},u),{},{components:n})):r.createElement(f,o({ref:e},u))}));function d(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var s in e)hasOwnProperty.call(e,s)&&(c[s]=e[s]);c.originalType=t,c.mdxType="string"==typeof t?t:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5679:function(t,e,n){"use strict";n.d(e,{Z:function(){return i}});var r=n(7294),a=n(633);function i(t){var e=Object.assign({},t);return"darkLight"in e||(e.darkLight=!0),r.createElement(a.Z,e)}},633:function(t,e,n){"use strict";n.d(e,{Z:function(){return d}});var r=n(7462),a=n(3366),i=n(7294),o=n(4184),c=n.n(o),s=n(7037),l=n.n(s),u=n(5350),p=n(8767);var m=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","mb","style"];function d(t){var e=t.src,n=t.title,o=t.zoomable,s=t.darkLight,d=t.screen,f=t.concept,v=t.className,g=t.maxWidth,h=t.mb,y=t.style,b=(0,a.Z)(t,m);f&&(e.startsWith("concept")||e.startsWith("/")||e.includes("://")||(e="concepts/"+e)),d&&(e.startsWith("screen")||e.startsWith("/")||e.includes("://")||(e="screens/"+e));var k=f||d||o;k&&void 0===o&&(o=!0);var w=function(t){var e=t.src,n=t.darkLight,r=(0,u.Z)().isDarkTheme;return(0,p.Z)()+(n?r?"dark/":"light/":"")+e}({src:e,darkLight:s}),x=n=n||e;v=c()(v,{"border-screen":k,"img-crisp":k,zoomable:o});var N=i.createElement("img",(0,r.Z)({className:v,style:y,src:w,alt:x,title:n},b));if(g){g=l()(g)?g:g+"px",h=void 0===h?"mb-2":h;var O=c()(h),j={display:"inline-block",maxWidth:g,lineHeight:0};N=i.createElement("div",{className:O,style:j},N)}return N}},1333:function(t,e,n){"use strict";n.d(e,{Z:function(){return u}});var r=n(7294),a=n(8767),i="runtime-analysis/asynchronous-call-graph",o="background/debugging",c={"call graph":"runtime-analysis/call-graph",acg:i,"asynchronous call graph":i,cgr:i,ae:i,aes:i,"asynchronous event":i,"asynchronous events":i,"dynamic runtime analysis":o,idbe:o},s="ae",l={trace:"trace",statictrace:"trace",context:"context",staticcontext:"staticContext","call graph":"call-graph",acg:"","asynchronous call graph":"",cgr:"cgr",ae:s,aes:s,"asynchronous event":s,"asynchronous events":s,"dynamic runtime analysis":"",idbe:""};function u(t){var e=t.term,n=t.children,i=void 0===n?e:n,o=function(t){var e=t.toLowerCase(),n=c[e]||"advanced/terminology",r=l[e];return void 0===r?null:(r="#"+r,""+(0,a.Z)()+n+r)}(e);return o?r.createElement("a",{href:o,title:'lookup term: "'+e+'"'},i,r.createElement("sup",null,"\u2754")):r.createElement(r.Fragment,null,"$",i,r.createElement("span",{className:"color-gray border-gray round",title:'(could not look up "'+i+'")'},r.createElement("sup",null,"\u2753")))}},8767:function(t,e,n){"use strict";n.d(e,{Z:function(){return a}});var r=n(2263);function a(){return(0,r.Z)().siteConfig.baseUrl}},8669:function(t,e,n){"use strict";n.r(e),n.d(e,{frontMatter:function(){return u},contentTitle:function(){return p},metadata:function(){return m},toc:function(){return d},default:function(){return v}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=n(1333),c=n(633),s=n(5679),l=["components"],u={},p="Application View",m={unversionedId:"runtime-analysis/applications",id:"runtime-analysis/applications",title:"Application View",description:"This view lists all recorded applications. Applications of the same entry point are grouped together:",source:"@site/content/runtime-analysis/06-applications.mdx",sourceDirName:"runtime-analysis",slug:"/runtime-analysis/applications",permalink:"/dbux/runtime-analysis/applications",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/runtime-analysis/06-applications.mdx",tags:[],version:"current",sidebarPosition:6,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Select Trace",permalink:"/dbux/runtime-analysis/select-trace"},next:{title:"Global View",permalink:"/dbux/runtime-analysis/global"}},d=[],f={toc:d};function v(t){var e=t.components,n=(0,a.Z)(t,l);return(0,i.kt)("wrapper",(0,r.Z)({},f,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"application-view"},"Application View"),(0,i.kt)("p",null,"This view lists all recorded applications. Applications of the same entry point are grouped together:"),(0,i.kt)(c.Z,{screen:!0,src:"sample-applications-view.png",mdxType:"Img"}),(0,i.kt)("br",null),(0,i.kt)("br",null),(0,i.kt)("p",null,"You can use this view in several ways:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Use the ",(0,i.kt)(s.Z,{src:"nextTrace.svg",mdxType:"DarkLightImg"})," button to the right of an application to go to its entry point."),(0,i.kt)("li",{parentName:"ul"},"Click an application to enable/disable it.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"If an application is disabled (no checkmark), you cannot interact with it: its code is not augmented, its traces cannot be selected or searched, and it does not show up in the call graph."),(0,i.kt)("li",{parentName:"ul"},"NOTE: Activating multiple applications at once can be useful for full-stack debugging purposes.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"When multiple applications are enabled at the same time, their ",(0,i.kt)(o.Z,{term:"cgr",mdxType:"Term"},"call graph roots")," are merged onto a single timeline, allowing their data to be inspected together.")))))),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"If your application does not show up here, you cannot analyze it. If that happens to you, please ",(0,i.kt)("a",{parentName:"p",href:"/dbux/faq#my-applications-dont-show-up"},"refer to our FAQ"),"."))),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This view is not crucial for most analysis tasks. We recommend minimizing it when you don't need it."))))}v.isMDXComponent=!0},4184:function(t,e){var n;!function(){"use strict";var r={}.hasOwnProperty;function a(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var i=typeof n;if("string"===i||"number"===i)t.push(n);else if(Array.isArray(n)){if(n.length){var o=a.apply(null,n);o&&t.push(o)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var c in n)r.call(n,c)&&n[c]&&t.push(c);else t.push(n.toString())}}return t.join(" ")}t.exports?(a.default=a,t.exports=a):void 0===(n=function(){return a}.apply(e,[]))||(t.exports=n)}()},2705:function(t,e,n){var r=n(5639).Symbol;t.exports=r},4239:function(t,e,n){var r=n(2705),a=n(9607),i=n(2333),o=r?r.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":o&&o in Object(t)?a(t):i(t)}},1957:function(t,e,n){var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;t.exports=r},9607:function(t,e,n){var r=n(2705),a=Object.prototype,i=a.hasOwnProperty,o=a.toString,c=r?r.toStringTag:void 0;t.exports=function(t){var e=i.call(t,c),n=t[c];try{t[c]=void 0;var r=!0}catch(s){}var a=o.call(t);return r&&(e?t[c]=n:delete t[c]),a}},2333:function(t){var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},5639:function(t,e,n){var r=n(1957),a="object"==typeof self&&self&&self.Object===Object&&self,i=r||a||Function("return this")();t.exports=i},1469:function(t){var e=Array.isArray;t.exports=e},7005:function(t){t.exports=function(t){return null!=t&&"object"==typeof t}},7037:function(t,e,n){var r=n(4239),a=n(1469),i=n(7005);t.exports=function(t){return"string"==typeof t||!a(t)&&i(t)&&"[object String]"==r(t)}}}]);