"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[309],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return c}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),m=u(n),c=i,k=m["".concat(s,".").concat(c)]||m[c]||p[c]||l;return n?a.createElement(k,r(r({ref:t},d),{},{components:n})):a.createElement(k,r({ref:t},d))}));function c(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,r=new Array(l);r[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var u=2;u<l;u++)r[u]=n[u];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5002:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(7462),i=n(3366),l=n(7294),r=n(3616),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function s(e){var t=e.toc,n=e.className,a=e.linkClassName,i=e.isChild;return t.length?l.createElement("ul",{className:i?void 0:n},t.map((function(e){return l.createElement("li",{key:e.id},l.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),l.createElement(s,{isChild:!0,toc:e.children,className:n,linkClassName:a}))}))):null}function u(e){var t=e.toc,n=e.className,u=void 0===n?"table-of-contents table-of-contents__left-border":n,d=e.linkClassName,p=void 0===d?"table-of-contents__link":d,m=e.linkActiveClassName,c=void 0===m?void 0:m,k=e.minHeadingLevel,h=e.maxHeadingLevel,b=(0,i.Z)(e,o),f=(0,r.LU)(),N=null!=k?k:f.tableOfContents.minHeadingLevel,v=null!=h?h:f.tableOfContents.maxHeadingLevel,g=(0,r.DA)({toc:t,minHeadingLevel:N,maxHeadingLevel:v}),x=(0,l.useMemo)((function(){if(p&&c)return{linkClassName:p,linkActiveClassName:c,minHeadingLevel:N,maxHeadingLevel:v}}),[p,c,N,v]);return(0,r.Si)(x),l.createElement(s,(0,a.Z)({toc:g,className:u,linkClassName:p},b))}},3755:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(7462),i=n(3366),l=n(7294),r=n(9700),o=["path","children","title"];function s(e){var t=e.path,n=e.children,s=e.title,u=(0,i.Z)(e,o);if(!t)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var d=(0,r.B)(t);n=n||d,s=s||n;var p="https://github.com/Domiii/dbux/tree/master/"+t;return l.createElement("a",(0,a.Z)({title:s,href:p},u),n)}},8640:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(7294),i="tableOfContentsInline_0DDH",l=n(5002);var r=function(e){var t=e.toc,n=e.minHeadingLevel,r=e.maxHeadingLevel;return a.createElement("div",{className:i},a.createElement(l.Z,{toc:t,minHeadingLevel:n,maxHeadingLevel:r,className:"table-of-contents",linkClassName:null}))},o={display:"none"};function s(e){var t=e.toc;return a.createElement("div",{style:o},a.createElement(r,{toc:t}))}},9700:function(e,t,n){n.d(t,{B:function(){return i}});var a={"dbux-code":"Dbux VSCode Extension"};function i(e){var t=a[e];return t||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}},738:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return d},metadata:function(){return p},toc:function(){return m},default:function(){return k}});var a=n(7462),i=n(3366),l=(n(7294),n(3905)),r=n(8640),o=n(3755),s=["components"],u={title:"Dbux CLI"},d="Dbux CLI",p={unversionedId:"tools-and-configuration/dbux-cli",id:"tools-and-configuration/dbux-cli",title:"Dbux CLI",description:"is a tool for easily running Node applications with Dbux enabled.",source:"@site/content/tools-and-configuration/02-dbux-cli.mdx",sourceDirName:"tools-and-configuration",slug:"/tools-and-configuration/dbux-cli",permalink:"/dbux/tools-and-configuration/dbux-cli",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/tools-and-configuration/02-dbux-cli.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Dbux CLI"},sidebar:"tutorialSidebar",previous:{title:"Dbux VSCode Extension",permalink:"/dbux/tools-and-configuration/dbux-code"},next:{title:"Dbux Babel Plugin",permalink:"/dbux/tools-and-configuration/dbux-babel-plugin"}},m=[{value:"Getting Started",id:"getting-started",children:[],level:2},{value:"Run",id:"run",children:[],level:2},{value:"Run Recipes",id:"run-recipes",children:[{value:"esnext + verbose + cache + pw",id:"esnext--verbose--cache--pw",children:[],level:3},{value:"Mocha",id:"mocha",children:[],level:3},{value:"Jest",id:"jest",children:[],level:3}],level:2},{value:"Instrument",id:"instrument",children:[],level:2},{value:"Config",id:"config",children:[],level:2}],c={toc:m};function k(e){var t=e.components,n=(0,i.Z)(e,s);return(0,l.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"dbux-cli"},"Dbux CLI"),(0,l.kt)(r.Z,{toc:m,mdxType:"TOC"}),(0,l.kt)(o.Z,{path:"dbux-cli",mdxType:"CodeLink"})," is a tool for easily running Node applications [with Dbux enabled](/dbux/dynamic-analysis/enable-dbux).",(0,l.kt)("h2",{id:"getting-started"},"Getting Started"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Install ",(0,l.kt)("inlineCode",{parentName:"li"},"@dbux/cli")," locally:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"npm install -D @dbux/cli")," or"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"yarn add --dev @dbux/cli")),(0,l.kt)("li",{parentName:"ul"},"NOTE: this also installs several other tools that it depends on, such as ",(0,l.kt)("inlineCode",{parentName:"li"},"@dbux/babel-plugin")," and several ",(0,l.kt)("inlineCode",{parentName:"li"},"babel")," packages."))),(0,l.kt)("li",{parentName:"ol"},"Run",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"E.g.: ",(0,l.kt)("inlineCode",{parentName:"li"},"npx dbux run ./test.js"))))),(0,l.kt)("p",null,"The CLI currently supports two commands: ",(0,l.kt)("a",{parentName:"p",href:"#run"},(0,l.kt)("inlineCode",{parentName:"a"},"run"))," and ",(0,l.kt)("a",{parentName:"p",href:"#instrument"},(0,l.kt)("inlineCode",{parentName:"a"},"instrument"))," (",(0,l.kt)(o.Z,{path:"dbux-cli/src/commands",mdxType:"CodeLink"},"code here"),")."),(0,l.kt)("h2",{id:"run"},"Run"),(0,l.kt)("p",null,"This command executes a given JavaScript application with Dbux enabled."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Usage: ",(0,l.kt)("inlineCode",{parentName:"li"},"npx dbux run app.js"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Alias = ",(0,l.kt)("inlineCode",{parentName:"li"},"r"),": ",(0,l.kt)("inlineCode",{parentName:"li"},"npx dbux r ..."))))),(0,l.kt)("p",null,"Run ",(0,l.kt)("inlineCode",{parentName:"p"},"someFile.js")," with Dbux enabled:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"npx dbux r ./someFile.js"))),(0,l.kt)("h2",{id:"run-recipes"},"Run Recipes"),(0,l.kt)("h3",{id:"esnext--verbose--cache--pw"},"esnext + verbose + cache + pw"),(0,l.kt)("p",null,"These are some useful default settings."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"The ",(0,l.kt)("inlineCode",{parentName:"p"},"--esnext")," flag adds all kinds of ",(0,l.kt)("inlineCode",{parentName:"p"},"esnext")," syntax support and proposals."),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"(TODO: We need to review and better explain this. We also might want to replace our self-maintained list of plugins with ",(0,l.kt)("inlineCode",{parentName:"li"},"preset-env")," (now that ",(0,l.kt)("inlineCode",{parentName:"li"},"preset-env")," is a lot more mature), or at least update the list of added plugins.)"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"The ",(0,l.kt)("inlineCode",{parentName:"p"},"--verbose")," flag adds more verbose information about what Dbux does.")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"The ",(0,l.kt)("inlineCode",{parentName:"p"},"--cache")," flag provides big performance benefits when running large applications multiple times."),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"(NOTE: We forked (copied) ",(0,l.kt)("inlineCode",{parentName:"li"},"@babel/register")," and implemented our own caching for this, as explained ",(0,l.kt)("a",{parentName:"li",href:"https://github.com/babel/babel/issues/5667#issuecomment-888339734"},"in this comment"),".)"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"The ",(0,l.kt)("inlineCode",{parentName:"p"},"--pw")," flag is one type of ",(0,l.kt)("strong",{parentName:"p"},(0,l.kt)("em",{parentName:"strong"},"module filter")),". It whitelists 3rd party packages (from ",(0,l.kt)("inlineCode",{parentName:"p"},"node_modules"),") to also be instrumented and traced."),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"More explanations on module filters can be found ",(0,l.kt)("a",{parentName:"li",href:"/dbux/guides/runtime-trace-filtering"},"in the trace guide"),"."))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"npx dbux r --esnext --verbose=1 --cache --pw=* ./someFile.js")))),(0,l.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Caution: --pw=*")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},(0,l.kt)("inlineCode",{parentName:"p"},"pw=*")," leads to ",(0,l.kt)("strong",{parentName:"p"},"all")," packages being traced. While this can work in many settings, it can also wreak havoc on performance, or even lead to some really naughty behavior, where libraries are instrumented which themselves aim to instrument, such as ",(0,l.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/v8-compile-cache"},"v8-compile-cache"),". For example, we came across bugs caused by Dbux trying to instrument the instrumenters when tracing ",(0,l.kt)("inlineCode",{parentName:"p"},"webpack")," as well as ",(0,l.kt)("inlineCode",{parentName:"p"},"Jest"),"."))),(0,l.kt)("h3",{id:"mocha"},"Mocha"),(0,l.kt)("p",null,"Run a ",(0,l.kt)("inlineCode",{parentName:"p"},"mocha")," test files ",(0,l.kt)("inlineCode",{parentName:"p"},"myTest1.js")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"myTest2.js"),":"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},'node --stack-trace-limit=100 --enable-source-maps "./node_modules/@dbux/cli/bin/dbux.js" run --esnext --verbose=1 --cache --pw=* ./node_modules/mocha/bin/_mocha -- --no-exit -- myTest1.js myTest2.js'))),(0,l.kt)("p",null,"Explanations:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"node")," options: ",(0,l.kt)("inlineCode",{parentName:"li"},"--stack-trace-limit=100 --enable-source-maps")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"dbux")," options: ",(0,l.kt)("inlineCode",{parentName:"li"},"--verbose=1 --esnext")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"mocha")," options: ",(0,l.kt)("inlineCode",{parentName:"li"},"--no-exit")," (between the two ",(0,l.kt)("inlineCode",{parentName:"li"},"--"),"'s)"),(0,l.kt)("li",{parentName:"ul"},"Target files: ",(0,l.kt)("inlineCode",{parentName:"li"},"myTest1.js myTest2.js")," (following the last ",(0,l.kt)("inlineCode",{parentName:"li"},"--"),")")),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"While of course entirely possible, we generally do not recommend running *",(0,l.kt)("em",{parentName:"p"},"all tests")," with ",(0,l.kt)("inlineCode",{parentName:"p"},"Dbux")," enabled, since that can be extremely slow. What you want to do instead is only run failing tests with Dbux."),(0,l.kt)("p",{parentName:"div"},"We already know about the importance of being able to do so, and hopefully will provide an easier solution in the near future. Please contact us on Discord, if better test-/CI-integration is of great import to you or your team."))),(0,l.kt)("h3",{id:"jest"},"Jest"),(0,l.kt)("p",null,"TODO"),(0,l.kt)("h2",{id:"instrument"},"Instrument"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Usage: ",(0,l.kt)("inlineCode",{parentName:"li"},"npx dbux instrument app.js"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Alias: ",(0,l.kt)("inlineCode",{parentName:"li"},"npx dbux i ..."))))),(0,l.kt)("p",null,"This is mostly used for internal development purposes. It allows developers to inspect the instrumented version of their applications."),(0,l.kt)("p",null,"Examples:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Show instrumented code result of ",(0,l.kt)("inlineCode",{parentName:"li"},"someFile.js")," in a new VSCode window: ",(0,l.kt)("inlineCode",{parentName:"li"},"npx dbux i someFile.js | code -"))),(0,l.kt)("h2",{id:"config"},"Config"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"run")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"instrument")," commands both share (for the most part) ",(0,l.kt)(o.Z,{path:"dbux-cli/src/util/commandCommons.js",mdxType:"CodeLink"},"these command options"),"."),(0,l.kt)("p",null,"TODO: extract a pretty table of configuration options here."))}k.isMDXComponent=!0}}]);