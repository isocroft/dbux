"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[591],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return p}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=a.createContext({}),s=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(u.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,u=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),m=s(n),p=i,f=m["".concat(u,".").concat(p)]||m[p]||c[p]||r;return n?a.createElement(f,l(l({ref:t},d),{},{components:n})):a.createElement(f,l({ref:t},d))}));function p(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var s=2;s<r;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5002:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(7462),i=n(3366),r=n(7294),l=n(3616),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function u(e){var t=e.toc,n=e.className,a=e.linkClassName,i=e.isChild;return t.length?r.createElement("ul",{className:i?void 0:n},t.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(u,{isChild:!0,toc:e.children,className:n,linkClassName:a}))}))):null}function s(e){var t=e.toc,n=e.className,s=void 0===n?"table-of-contents table-of-contents__left-border":n,d=e.linkClassName,c=void 0===d?"table-of-contents__link":d,m=e.linkActiveClassName,p=void 0===m?void 0:m,f=e.minHeadingLevel,k=e.maxHeadingLevel,b=(0,i.Z)(e,o),g=(0,l.LU)(),N=null!=f?f:g.tableOfContents.minHeadingLevel,h=null!=k?k:g.tableOfContents.maxHeadingLevel,v=(0,l.DA)({toc:t,minHeadingLevel:N,maxHeadingLevel:h}),x=(0,r.useMemo)((function(){if(c&&p)return{linkClassName:c,linkActiveClassName:p,minHeadingLevel:N,maxHeadingLevel:h}}),[c,p,N,h]);return(0,l.Si)(x),r.createElement(u,(0,a.Z)({toc:v,className:s,linkClassName:c},b))}},3755:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(7462),i=n(3366),r=n(7294),l=n(9700),o=["path","children","title"];function u(e){var t=e.path,n=e.children,u=e.title,s=(0,i.Z)(e,o);if(!t)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var d=(0,l.B)(t);n=n||d,u=u||n;var c="https://github.com/Domiii/dbux/tree/master/"+t;return r.createElement("a",(0,a.Z)({title:u,href:c},s),n)}},8640:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(7294),i="tableOfContentsInline_0DDH",r=n(5002);var l=function(e){var t=e.toc,n=e.minHeadingLevel,l=e.maxHeadingLevel;return a.createElement("div",{className:i},a.createElement(r.Z,{toc:t,minHeadingLevel:n,maxHeadingLevel:l,className:"table-of-contents",linkClassName:null}))},o={display:"none"};function u(e){var t=e.toc;return a.createElement("div",{style:o},a.createElement(l,{toc:t}))}},9700:function(e,t,n){n.d(t,{B:function(){return i}});var a={"dbux-code":"Dbux VSCode Extension"};function i(e){var t=a[e];return t||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}},6433:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return d},contentTitle:function(){return c},metadata:function(){return m},toc:function(){return p},default:function(){return b}});var a,i=n(7462),r=n(3366),l=(n(7294),n(3905)),o=n(3755),u=n(8640),s=["components"],d={},c="Runtime Trace Filtering",m={unversionedId:"guides/runtime-trace-filtering",id:"guides/runtime-trace-filtering",title:"Runtime Trace Filtering",description:"This article explains how Dbux determines which files and lines of code to trace.",source:"@site/content/guides/01-runtime-trace-filtering.mdx",sourceDirName:"guides",slug:"/guides/runtime-trace-filtering",permalink:"/dbux/guides/runtime-trace-filtering",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/guides/01-runtime-trace-filtering.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Tutorial",permalink:"/dbux/dbux-practice/tutorial"},next:{title:"Performance",permalink:"/dbux/guides/performance"}},p=[{value:"Whitelists and Blacklists",id:"whitelists-and-blacklists",children:[{value:"Run Button + @dbux/cli",id:"run-button--dbuxcli",children:[],level:3},{value:"Babel Config",id:"babel-config",children:[],level:3}],level:2},{value:"/*<em> dbux disable </em>/",id:"dbux-disable",children:[],level:2}],f=(a="Term",function(e){return console.warn("Component "+a+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.kt)("div",e)}),k={toc:p};function b(e){var t=e.components,n=(0,r.Z)(e,s);return(0,l.kt)("wrapper",(0,i.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"runtime-trace-filtering"},"Runtime Trace Filtering"),(0,l.kt)(u.Z,{toc:p,mdxType:"TOC"}),(0,l.kt)("p",null,"This article explains how Dbux determines which files and lines of code to trace."),(0,l.kt)("p",null,"When ",(0,l.kt)("a",{parentName:"p",href:"/dbux/runtime-analysis/enable-dbux"},"Dbux is enabled"),", it automatically records execution of all files that are not in ",(0,l.kt)("inlineCode",{parentName:"p"},"node_modules"),(0,l.kt)("sup",{parentName:"p",id:"fnref-1"},(0,l.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1")),". This can be configured. However, it is a balancing act to determine the optimal set of files to trace. Often times it is easiest to tell Dbux to just trace everything, but tracing ",(0,l.kt)("em",{parentName:"p"},"everything")," can slow things down significantly."),(0,l.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"If you know that some packages do not contribute to your runtime analysis, do not ",(0,l.kt)("inlineCode",{parentName:"p"},"whitelist")," them or explicitly ",(0,l.kt)("inlineCode",{parentName:"p"},"blacklist")," them. This can improve ",(0,l.kt)("a",{parentName:"p",href:"/dbux/guides/performance"},"performance"),", especially if they contain many lines of code or many ",(0,l.kt)(f,{term:"trace",mdxType:"Term"})," event records."))),(0,l.kt)("h2",{id:"whitelists-and-blacklists"},"Whitelists and Blacklists"),(0,l.kt)("p",null,"Dbux currently offers several configuration options to tell Dbux which files to trace:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"packageWhitelist")," (",(0,l.kt)("inlineCode",{parentName:"li"},"pw"),")"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"packageBlacklist")," (",(0,l.kt)("inlineCode",{parentName:"li"},"pb"),")"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"fileWhitelist")," (",(0,l.kt)("inlineCode",{parentName:"li"},"fw"),")"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"fileBlacklist")," (",(0,l.kt)("inlineCode",{parentName:"li"},"fb"),")")),(0,l.kt)("p",null,"Some notes:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Each one of these settings supports comma-separated lists of file or package names or regexes."),(0,l.kt)("li",{parentName:"ul"},"All paths are normalized to use ",(0,l.kt)("inlineCode",{parentName:"li"},"/"),", so don't use backslashes on Windows."),(0,l.kt)("li",{parentName:"ul"},"Implementation of the filter is in ",(0,l.kt)(o.Z,{path:"dbux-babel-plugin/src/external/moduleFilter.js",mdxType:"CodeLink"}),"."),(0,l.kt)("li",{parentName:"ul"},"-> ",(0,l.kt)("inlineCode",{parentName:"li"},"packageName")," is determined via ",(0,l.kt)(o.Z,{path:"dbux-common-node/src/util/moduleUtil.js",mdxType:"CodeLink"},(0,l.kt)("code",null,"parsePackageName")),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"NOTE: ",(0,l.kt)("inlineCode",{parentName:"li"},"packageName")," supports namespaces."),(0,l.kt)("li",{parentName:"ul"},"Examples of ",(0,l.kt)("inlineCode",{parentName:"li"},"packageName")," detection for different module paths:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"my/app/node_modules/a")," -> ",(0,l.kt)("inlineCode",{parentName:"li"},"a")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"my/app/node_modules/a/b/c.js")," -> ",(0,l.kt)("inlineCode",{parentName:"li"},"a")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"my/app/node_modules/a/b/node_modules/c/d")," -> ",(0,l.kt)("inlineCode",{parentName:"li"},"c")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"my/app/node_modules/@a/b/c.js")," -> ",(0,l.kt)("inlineCode",{parentName:"li"},"@a/b")),(0,l.kt)("li",{parentName:"ul"},"etc.")))))),(0,l.kt)("h3",{id:"run-button--dbuxcli"},"Run Button + @dbux/cli"),(0,l.kt)("p",null,"When using ",(0,l.kt)("a",{parentName:"p",href:"/dbux/runtime-analysis/the-run-button"},"the Run Button")," and/or ",(0,l.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-cli"},"@dbux/cli"),", you can configure this via the ",(0,l.kt)("inlineCode",{parentName:"p"},"--pw"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"--pb"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"--fw")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"--fb")," flags."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Example: ",(0,l.kt)("inlineCode",{parentName:"li"},"npx dbux run --pw=.* --pb=lodash ./test.js"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"-> Traces all libraries, but ",(0,l.kt)("inlineCode",{parentName:"li"},"lodash"),".")))),(0,l.kt)("h3",{id:"babel-config"},"Babel Config"),(0,l.kt)("p",null,"When ",(0,l.kt)("a",{parentName:"p",href:"/dbux/guides/build-pipeline-integration"},"manually integrating Dbux into your build pipeline"),", you generally want to make use of the ",(0,l.kt)("inlineCode",{parentName:"p"},"moduleFilter")," API (",(0,l.kt)(o.Z,{path:"dbux-babel-plugin/src/external",mdxType:"CodeLink"}),") in your config file and manually adjust your global Babel ",(0,l.kt)("inlineCode",{parentName:"p"},"include")," ",(0,l.kt)("strong",{parentName:"p"},"or")," ",(0,l.kt)("inlineCode",{parentName:"p"},"ignore")," settings to make sure that you are tracing and recording the files that you want."),(0,l.kt)("p",null,"NOTE: The ",(0,l.kt)("inlineCode",{parentName:"p"},"moduleFilter")," functions return ",(0,l.kt)("inlineCode",{parentName:"p"},"function")," (not ",(0,l.kt)("inlineCode",{parentName:"p"},"string")," or ",(0,l.kt)("inlineCode",{parentName:"p"},"RegExp"),")."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"const shouldInclude = require('@dbux/babel-plugin/dist/include').default;\n\n// ...\n\nconst moduleFilterOptions = {\n  packageWhitelist: 'interestingPackage1,@interesting/package2',\n  // packageBlacklist: '',\n  fileBlacklist: '.*bad_file1\\.js,.*/unwanted_dir1/.*'\n};\n\nmodule.exports = {\n  include: [\n    shouldInclude(moduleFilterOptions)\n  ]\n};\n")),(0,l.kt)("h2",{id:"dbux-disable"},"/*",(0,l.kt)("em",{parentName:"h2"}," dbux disable "),"/"),(0,l.kt)("p",null,"You can disable tracing of individual traces and/or expressions by adding a comment containing a line of ",(0,l.kt)("inlineCode",{parentName:"p"},"dbux disable"),", (e.g. ",(0,l.kt)("inlineCode",{parentName:"p"},"/** dbux disable */"),") in front of it."),(0,l.kt)("p",null,"E.g., in the following sample code, a long-running (but unimportant) loop will not get instrumented, thus largely improving ",(0,l.kt)("a",{parentName:"p",href:"/dbux/guides/performance"},"performance"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"f();\n/* dbux disable */\nfor (const i = 0; i < 1e6; ++i) {\n  // ...\n}\ng();\n")),(0,l.kt)("div",{className:"footnotes"},(0,l.kt)("hr",{parentName:"div"}),(0,l.kt)("ol",{parentName:"div"},(0,l.kt)("li",{parentName:"ol",id:"fn-1"},"Support for PnP and other module systems are ",(0,l.kt)("a",{parentName:"li",href:"/dbux/advanced/future-work"},"future-work"),".",(0,l.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}b.isMDXComponent=!0}}]);