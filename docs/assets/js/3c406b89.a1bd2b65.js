/*! For license information please see 3c406b89.a1bd2b65.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[714],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return s},kt:function(){return d}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),f=l(r),d=a,b=f["".concat(c,".").concat(d)]||f[d]||p[d]||o;return r?n.createElement(b,i(i({ref:t},s),{},{components:r})):n.createElement(b,i({ref:t},s))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var u={};for(var c in t)hasOwnProperty.call(t,c)&&(u[c]=t[c]);u.originalType=e,u.mdxType="string"==typeof e?e:a,i[1]=u;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5679:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(7294),a=r(633);function o(e){var t=Object.assign({},e);return"darkLight"in t||(t.darkLight=!0),n.createElement(a.Z,t)}},633:function(e,t,r){"use strict";r.d(t,{Z:function(){return b}});var n=r(7462),a=r(3366),o=r(7294),i=r(4184),u=r.n(i),c=r(7037),l=r.n(c),s=r(5350),p=r(8767);var f=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","mb","style"];function d(e){return e.startsWith("/")||e.includes("://")}function b(e){var t=e.src,r=e.title,i=e.zoomable,c=e.darkLight,b=e.screen,m=e.concept,h=e.className,y=e.maxWidth,g=e.mb,x=e.style,v=(0,a.Z)(e,f);m&&(t.startsWith("concept")||d(t)||(t="concepts/"+t)),b&&(t.startsWith("screen")||d(t)||(t="screens/"+t));var k=m||b||i;k&&void 0===i&&(i=!0);var O=function(e){var t=e.src,r=e.darkLight,n=(0,s.Z)().isDarkTheme;return(0,p.Z)()+(r?n?"dark/":"light/":"")+t}({src:t,darkLight:c}),j=r=r||t;h=u()(h,{"border-screen":k,"img-crisp":k,zoomable:i});var w=o.createElement("img",(0,n.Z)({className:h,style:x,src:O,alt:j,title:r},v));if(y){y=l()(y)?y:y+"px",g=void 0===g?"mb-2":g;var N=u()(g),D={display:"inline-block",maxWidth:y,lineHeight:0};w=o.createElement("div",{className:N,style:D},w)}return w}},8767:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(2263);function a(){return(0,n.Z)().siteConfig.baseUrl}},4716:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return d}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=r(5679),u=["components"],c={},l="Enable Dbux",s={unversionedId:"features/enable-dbux",id:"features/enable-dbux",title:"Enable Dbux",description:"\x3c!-- import TOC from '@src/components/TOC';",source:"@site/content/features/02-enable-dbux.mdx",sourceDirName:"features",slug:"/features/enable-dbux",permalink:"/dbux/features/enable-dbux",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/features/02-enable-dbux.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Using Dbux",permalink:"/dbux/features"},next:{title:"The Run Button",permalink:"/dbux/features/the-run-button"}},p=[],f={toc:p};function d(e){var t=e.components,r=(0,a.Z)(e,u);return(0,o.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"enable-dbux"},"Enable Dbux"),(0,o.kt)("p",null,"Before you can ",(0,o.kt)("a",{parentName:"p",href:"/dbux/features"},"analyze")," an application, you must first execute it with Dbux enabled. This means, the application must be instrumented by ",(0,o.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-babel-plugin"},"@dbux/babel-plugin")," and injected with the ",(0,o.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-runtime"},"@dbux/runtime"),"."),(0,o.kt)("p",null,"These are the different ways for achieving that:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"/dbux/features/the-run-button"},"The Run Button")," ",(0,o.kt)(i.Z,{src:"play.svg",mdxType:"DarkLightImg"})," allows you to easily run a simple Node application with Dbux enabled."),(0,o.kt)("li",{parentName:"ol"},"The ",(0,o.kt)("a",{parentName:"li",href:"/dbux/tools-and-configuration/dbux-cli"},"Dbux CLI")," provides the magic behind ",(0,o.kt)("a",{parentName:"li",href:"/dbux/features/the-run-button"},"The Run Button"),". You can use it directly in order to run Node applications from a terminal or command-line window."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"../dbux-practice"},"Dbux Practice")," allows the user to execute a curated list of real-world applications (some with real-world bugs) at the click of a single button."),(0,o.kt)("li",{parentName:"ol"},"In order to enable Dbux for frontend and other bundled applications, the developer needs to manually ",(0,o.kt)("a",{parentName:"li",href:"/dbux/guides/build-pipeline-integration"},"integrate Dbux into the project's build pipeline"),".")),(0,o.kt)("p",null,"Once running, an instrumented target application will try to record and send all runtime data to the ",(0,o.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-code#runtime-server"},"runtime server")," where the developer can commence with ",(0,o.kt)("a",{parentName:"p",href:"/dbux/features"},"dynamic analysis"),"."))}d.isMDXComponent=!0},4184:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var i=a.apply(null,r);i&&e.push(i)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var u in r)n.call(r,u)&&r[u]&&e.push(u);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(r=function(){return a}.apply(t,[]))||(e.exports=r)}()},2705:function(e,t,r){var n=r(5639).Symbol;e.exports=n},4239:function(e,t,r){var n=r(2705),a=r(9607),o=r(2333),i=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?a(e):o(e)}},1957:function(e,t,r){var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=n},9607:function(e,t,r){var n=r(2705),a=Object.prototype,o=a.hasOwnProperty,i=a.toString,u=n?n.toStringTag:void 0;e.exports=function(e){var t=o.call(e,u),r=e[u];try{e[u]=void 0;var n=!0}catch(c){}var a=i.call(e);return n&&(t?e[u]=r:delete e[u]),a}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,r){var n=r(1957),a="object"==typeof self&&self&&self.Object===Object&&self,o=n||a||Function("return this")();e.exports=o},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,t,r){var n=r(4239),a=r(1469),o=r(7005);e.exports=function(e){return"string"==typeof e||!a(e)&&o(e)&&"[object String]"==n(e)}}}]);