/*! For license information please see e34b24fb.4c3dd6dd.js.LICENSE.txt */
(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[107],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return l},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,f=d["".concat(c,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(f,o(o({ref:t},l),{},{components:n})):r.createElement(f,o({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5679:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(7294),a=n(633);function i(e){var t=Object.assign({},e);return"darkLight"in t||(t.darkLight=!0),r.createElement(a.Z,t)}},633:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var r=n(7462),a=n(3366),i=n(7294),o=n(4184),s=n.n(o),c=n(7037),u=n.n(c),l=n(5350),p=n(8767);var d=["src","title","zoomable","darkLight","screen","concept","className","maxWidth","mb","style"];function m(e){var t=e.src,n=e.title,o=e.zoomable,c=e.darkLight,m=e.screen,f=e.concept,b=e.className,h=e.maxWidth,v=e.mb,g=e.style,y=(0,a.Z)(e,d);f&&(t.startsWith("concept")||t.startsWith("/")||t.includes("://")||(t="concepts/"+t)),m&&(t.startsWith("screen")||t.startsWith("/")||t.includes("://")||(t="screens/"+t));var x=f||m||o;x&&void 0===o&&(o=!0);var k=function(e){var t=e.src,n=e.darkLight,r=(0,l.Z)().isDarkTheme;return(0,p.Z)()+(n?r?"dark/":"light/":"")+t}({src:t,darkLight:c}),N=n=n||t;b=s()(b,{"border-screen":x,"img-crisp":x,zoomable:o});var w=i.createElement("img",(0,r.Z)({className:b,style:g,src:k,alt:N,title:n},y));if(h){h=u()(h)?h:h+"px",v=void 0===v?"mb-2":v;var O=s()(v),j={display:"inline-block",maxWidth:h,lineHeight:0};w=i.createElement("div",{className:O,style:j},w)}return w}},8767:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(2263);function a(){return(0,r.Z)().siteConfig.baseUrl}},7753:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return d},default:function(){return f}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=n(633),s=n(5679),c=["components"],u={sidebar_class_name:"run-button"},l="The Run Button",p={unversionedId:"runtime-analysis/the-run-button",id:"runtime-analysis/the-run-button",title:"The Run Button",description:"The Run Button  allows the user to easily run a simple Node application with Dbux enabled.",source:"@site/content/runtime-analysis/03-the-run-button.mdx",sourceDirName:"runtime-analysis",slug:"/runtime-analysis/the-run-button",permalink:"/dbux/runtime-analysis/the-run-button",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/runtime-analysis/03-the-run-button.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_class_name:"run-button"},sidebar:"tutorialSidebar",previous:{title:"Enable Dbux",permalink:"/dbux/runtime-analysis/enable-dbux"},next:{title:"Code Decorations",permalink:"/dbux/runtime-analysis/code-decorations"}},d=[{value:"Results",id:"results",children:[{value:"Example Output",id:"example-output",children:[],level:3}],level:2}],m={toc:d};function f(e){var t=e.components,n=(0,a.Z)(e,c);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"the-run-button"},"The Run Button"),(0,i.kt)("p",null,"The Run Button ",(0,i.kt)(s.Z,{src:"play.svg",mdxType:"DarkLightImg"})," allows the user to easily run a simple Node application ",(0,i.kt)("a",{parentName:"p",href:"./"},"with Dbux enabled"),"."),(0,i.kt)("p",null,"You can find it in the top right of opened ",(0,i.kt)("inlineCode",{parentName:"p"},"*.js")," files:"),(0,i.kt)(o.Z,{src:"screens/run-button.png",className:"border-screenshot",mdxType:"Img"}),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The Run button simply calls the ",(0,i.kt)("inlineCode",{parentName:"p"},"Dbux: Run Current File")," command. You can also access it via ",(0,i.kt)("a",{parentName:"p",href:"https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette"},"VSCode's command palette"),", and (like ",(0,i.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-code#commands"},"all commands"),") can be key-bound."))),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Dbux: Debug Current File")," command does the same thing as the Run button but with ",(0,i.kt)("inlineCode",{parentName:"p"},"--inspect-brk")," enabled."))),(0,i.kt)("h2",{id:"results"},"Results"),(0,i.kt)("p",null,"When pressed, a Terminal opens and starts executing the active ",(0,i.kt)("inlineCode",{parentName:"p"},"*.js")," file with ",(0,i.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-cli"},"@dbux/cli"),", e.g.:"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("inlineCode",{parentName:"p"},'$ node --stack-trace-limit=1000 --enable-source-maps -r ./my-code/node_modules/@dbux/cli/dist/linkOwnDependencies.js "./my-code/node_modules/@dbux/cli/bin/dbux.js" run --esnext --pw=.* "./my-code/firstDuplicate/find-bad.js"'))),(0,i.kt)("h3",{id:"example-output"},"Example Output"),(0,i.kt)("p",null,"In the terminal you will see (a potentially verbose) log of things that Dbux does, interleaved with the program's own console output, e.g.:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"FAILURE. Not all tests passed:\n  Test 0  FAILED \u274c\n      inputs: [[2,1,3,5,3,4]]\n      actual: -1\n    expected: 3\n  Test 1  FAILED \u274c\n      inputs: [[8,4,6,2,6,4,7,9,5,8]]\n      actual: -1\n    expected: 6\n  Test 2  PASSED \u2714\ufe0f\n      inputs: [[2,1,6,5,3,4]]\n      actual: -1\n    expected: -1\n  Test 3  PASSED \u2714\ufe0f\n      inputs: [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,...]\n      actual: -1\n    expected: -1\n[Dbux Runtime Client] <- connecting...\n[Dbux Runtime Client] <- data (n = 64,482): 114 staticProgramContexts (1~114), 225 staticContexts (1~225), 6365 staticTraces (1~6365), 2357 executionContexts (1~2357), 29399 traces (1~29399), 852 values (1~852), 25170 dataNodes (1~25170)\n[Dbux Runtime Client] ACK 1\n[Dbux Runtime Client] -> disconnected\n")))}f.isMDXComponent=!0},4184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var o=a.apply(null,n);o&&e.push(o)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var s in n)r.call(n,s)&&n[s]&&e.push(s);else e.push(n.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n)}()},2705:function(e,t,n){var r=n(5639).Symbol;e.exports=r},4239:function(e,t,n){var r=n(2705),a=n(9607),i=n(2333),o=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":o&&o in Object(e)?a(e):i(e)}},1957:function(e,t,n){var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},9607:function(e,t,n){var r=n(2705),a=Object.prototype,i=a.hasOwnProperty,o=a.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,s),n=e[s];try{e[s]=void 0;var r=!0}catch(c){}var a=o.call(e);return r&&(t?e[s]=n:delete e[s]),a}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,n){var r=n(1957),a="object"==typeof self&&self&&self.Object===Object&&self,i=r||a||Function("return this")();e.exports=i},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},7037:function(e,t,n){var r=n(4239),a=n(1469),i=n(7005);e.exports=function(e){return"string"==typeof e||!a(e)&&i(e)&&"[object String]"==r(e)}}}]);