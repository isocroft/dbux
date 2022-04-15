"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[943],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=u(n),m=i,h=p["".concat(s,".").concat(m)]||p[m]||d[m]||r;return n?a.createElement(h,l(l({ref:t},c),{},{components:n})):a.createElement(h,l({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var u=2;u<r;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},2012:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(7462),i=n(3366),r=n(7294),l=n(4342),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function s(e){var t=e.toc,n=e.className,a=e.linkClassName,i=e.isChild;return t.length?r.createElement("ul",{className:i?void 0:n},t.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(s,{isChild:!0,toc:e.children,className:n,linkClassName:a}))}))):null}function u(e){var t=e.toc,n=e.className,u=void 0===n?"table-of-contents table-of-contents__left-border":n,c=e.linkClassName,d=void 0===c?"table-of-contents__link":c,p=e.linkActiveClassName,m=void 0===p?void 0:p,h=e.minHeadingLevel,k=e.maxHeadingLevel,f=(0,i.Z)(e,o),b=(0,l.LU)(),y=null!=h?h:b.tableOfContents.minHeadingLevel,g=null!=k?k:b.tableOfContents.maxHeadingLevel,v=(0,l.DA)({toc:t,minHeadingLevel:y,maxHeadingLevel:g}),N=(0,r.useMemo)((function(){if(d&&m)return{linkClassName:d,linkActiveClassName:m,minHeadingLevel:y,maxHeadingLevel:g}}),[d,m,y,g]);return(0,l.Si)(N),r.createElement(s,(0,a.Z)({toc:v,className:u,linkClassName:d},f))}},3755:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(7462),i=n(3366),r=n(7294),l=n(9700),o=["path","children","title"];function s(e){var t=e.path,n=e.children,s=e.title,u=(0,i.Z)(e,o);if(!t)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var c=(0,l.B)(t);n=n||c,s=s||n;var d="https://github.com/Domiii/dbux/tree/master/"+t;return r.createElement("a",(0,a.Z)({title:s,href:d},u),n)}},5506:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(7294),i="tableOfContentsInline_wHUc",r=n(2012);var l=function(e){var t=e.toc,n=e.minHeadingLevel,l=e.maxHeadingLevel;return a.createElement("div",{className:i},a.createElement(r.Z,{toc:t,minHeadingLevel:n,maxHeadingLevel:l,className:"table-of-contents",linkClassName:null}))},o={display:"none"};function s(e){var t=e.toc;return a.createElement("div",{style:o},a.createElement(l,{toc:t}))}},5479:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(7462),i=n(3366),r=n(7294),l=n(9700),o=n(8767),s=["name","children","title"];function u(e){var t=e.name,n=e.children,u=e.title,c=(0,i.Z)(e,s);if(null==t||!t.includes)throw new Error('Invalid ToolLink does not have a "name" of type string. - props: '+JSON.stringify(e,null,2));if(t.includes("/"))throw new Error('ToolLink\'s "name" must not be a path. - props: '+JSON.stringify(e,null,2));if(!t)throw new Error('invalid <ToolLink /> missing "name". - props: '+JSON.stringify(e,null,2));var d=(0,l.B)(t);n=n||d,u=u||n;var p=(0,o.Z)()+"tools-and-configuration/"+t;return r.createElement("a",(0,a.Z)({title:u,href:p},c),n)}},8767:function(e,t,n){n.d(t,{Z:function(){return i}});var a=n(2263);function i(){return(0,a.Z)().siteConfig.baseUrl}},9700:function(e,t,n){n.d(t,{B:function(){return i}});var a={"dbux-code":"Dbux VSCode Extension"};function i(e){var t=a[e];return t||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}},9006:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return d},default:function(){return k},frontMatter:function(){return c},metadata:function(){return p},toc:function(){return m}});var a=n(7462),i=n(3366),r=(n(7294),n(3905)),l=n(5479),o=n(3755),s=n(5506),u=["components"],c={},d="Known Limitations and Future Work",p={unversionedId:"advanced/future-work",id:"advanced/future-work",title:"Known Limitations and Future Work",description:"Syntax Limitations",source:"@site/content/advanced/02-future-work.mdx",sourceDirName:"advanced",slug:"/advanced/future-work",permalink:"/dbux/advanced/future-work",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/advanced/02-future-work.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Dbux Runtime",permalink:"/dbux/tools-and-configuration/dbux-runtime"},next:{title:"Contributing",permalink:"/dbux/advanced/contributing"}},m=[{value:"Syntax Limitations",id:"syntax-limitations",children:[],level:2},{value:"Problems with Values",id:"problems-with-values",children:[],level:2},{value:"Calling <code>process.exit</code> as well as uncaught exceptions are not always handled properly",id:"calling-processexit-as-well-as-uncaught-exceptions-are-not-always-handled-properly",children:[],level:2},{value:"Remote Analysis without VSCode server",id:"remote-analysis-without-vscode-server",children:[],level:2},{value:"Observer Effect",id:"observer-effect",children:[],level:2},{value:"<code>eval</code> and dynamically loaded code",id:"eval-and-dynamically-loaded-code",children:[],level:2},{value:"Function.prototype.toString and Function.name do not behave as expected",id:"functionprototypetostring-and-functionname-do-not-behave-as-expected",children:[],level:2},{value:"File Path Issues on Windows",id:"file-path-issues-on-windows",children:[],level:2},{value:"Future Work: Missing Features",id:"future-work-missing-features",children:[],level:2},{value:"Future Work: Crazy Ideas",id:"future-work-crazy-ideas",children:[],level:2}],h={toc:m};function k(e){var t=e.components,n=(0,i.Z)(e,u);return(0,r.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"known-limitations-and-future-work"},"Known Limitations and Future Work"),(0,r.kt)(s.Z,{toc:m,mdxType:"TOC"}),(0,r.kt)("h2",{id:"syntax-limitations"},"Syntax Limitations"),(0,r.kt)("p",null,"Some JS syntax constructs are not supported at all or support is limited:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Generator functions",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Untested and not properly traced."))),(0,r.kt)("li",{parentName:"ul"},"Some es6 features are traced correctly, but data flow analysis is limited.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"We do not currently connect data flow through es6 deconstruction."),(0,r.kt)("li",{parentName:"ul"},"In verbose mode, ",(0,r.kt)("inlineCode",{parentName:"li"},"Dbux"),' raises some warnings tagged with "',(0,r.kt)("inlineCode",{parentName:"li"},"[NYI]"),'" to notify you of those missing connections.')))),(0,r.kt)("p",null,"NOTE: The code should still work fine, but some of Dbux's analysis tools (especially ",(0,r.kt)("a",{parentName:"p",href:"/dbux/dynamic-analysis/data-flow"},"Data Flow"),") will not be able to provide all actual connections."),(0,r.kt)("h2",{id:"problems-with-values"},"Problems with Values"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Big objects, arrays and strings are truncated because trying to record ",(0,r.kt)("strong",{parentName:"li"},"all values")," might severely impact ",(0,r.kt)("a",{parentName:"li",href:"/dbux/guides/performance"},"performance"),"."),(0,r.kt)("li",{parentName:"ul"},"We currently do not properly trace all built-in data types. This is tracked in: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/Domiii/dbux/issues/543"},"https://github.com/Domiii/dbux/issues/543"),"."),(0,r.kt)("li",{parentName:"ul"},"We also plan to make the currently hardcoded thresholds configurable, if there is sufficient demand for this.")),(0,r.kt)("h2",{id:"calling-processexit-as-well-as-uncaught-exceptions-are-not-always-handled-properly"},"Calling ",(0,r.kt)("inlineCode",{parentName:"h2"},"process.exit")," as well as uncaught exceptions are not always handled properly"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},'You might see a message along the lines of "',(0,r.kt)("inlineCode",{parentName:"li"},"Process shutdown but not all data has been sent out. Analysis will be incomplete. This is probably because of a crash or process.exit was called manually."),'"'),(0,r.kt)("li",{parentName:"ul"},"That is because ",(0,r.kt)("inlineCode",{parentName:"li"},"process.exit")," and uncaught exceptions kill the process, even if not all recorded data has been sent out yet. As a result, not all runtime data could be recorded properly. That is why Dbux tries to stall upon process.exit and uncaught exceptions and also issues a warning.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"NOTE: some frameworks that kill your process by can be configured not to do so (e.g. for ",(0,r.kt)("inlineCode",{parentName:"li"},"Mocha")," you want to add the ",(0,r.kt)("inlineCode",{parentName:"li"},"--no-exit")," flag)."))),(0,r.kt)("li",{parentName:"ul"},"This was tracked in: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/Domiii/dbux/issues/201"},"https://github.com/Domiii/dbux/issues/201"),".")),(0,r.kt)("h2",{id:"remote-analysis-without-vscode-server"},"Remote Analysis without VSCode server"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"@dbux/runtime")," is currently hard-coded to connect to a ",(0,r.kt)("inlineCode",{parentName:"p"},"localhost")," server (see ",(0,r.kt)(o.Z,{path:"dbux-runtime/src/client/Client.js",mdxType:"CodeLink"}),"), and additionally the extension expects to be able to access the file paths reported in the execution trace locally. Thus, the only way to use Dbux remotely is currently ",(0,r.kt)("a",{parentName:"p",href:"/dbux/faq#how-can-i-debug-code-remotely"},"using a VSCode remote session"),". However, one can ",(0,r.kt)("a",{parentName:"p",href:"/dbux/advanced/data-analysis#art-vandelay"},"export + import trace log files")," on different machines."),(0,r.kt)("p",null,"Tracked in: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Domiii/dbux/issues/639"},"https://github.com/Domiii/dbux/issues/639"),"."),(0,r.kt)("h2",{id:"observer-effect"},"Observer Effect"),(0,r.kt)("p",null,"By trying to observe a program, while not intending to, you will inevitably change its behavior due to the ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Observer_effect_(physics)"},"observer effect"),". Here are a few examples:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Property getters with ",(0,r.kt)("a",{parentName:"li",href:"https://softwareengineering.stackexchange.com/questions/40297/what-is-a-side-effect"},"side effects")," will be called automatically by ",(0,r.kt)("inlineCode",{parentName:"li"},"Dbux")," (to get all that juicy runtime data) and potentially break things",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Dbux tracks data in real-time, by reading and recording variables, objects, arrays etc."),(0,r.kt)("li",{parentName:"ul"},"It also reads all (or at least many) properties of objects, thereby unwittingly causing property side-effects."),(0,r.kt)("li",{parentName:"ul"},"Examples:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"class A { count = 0; get x() { return ++this.count; } }; const a = new A();"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"When Dbux reads ",(0,r.kt)("inlineCode",{parentName:"li"},"x")," (when tracing the constructor call) it will unwittingly change ",(0,r.kt)("inlineCode",{parentName:"li"},"this.count"),"."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"const o = { get z() { console.log('z called'); return 42; } }"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"When Dbux reads ",(0,r.kt)("inlineCode",{parentName:"li"},"z"),', and you will see an unwanted "z called" in your console.'))))),(0,r.kt)("li",{parentName:"ul"},"The only way to prevent these bugs is (currently) by writing side-effect-free getters (in most cases, getters are supposed to be side-effect-free anyway)."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy"},"Proxies"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"As explained in the previous point, ","[@dbux/runtime]","(dbux-runtime] iterates over and collects values of object properties automatically in its quest for gathering runtime data."),(0,r.kt)("li",{parentName:"ul"},"As discussed ",(0,r.kt)("a",{parentName:"li",href:"https://stackoverflow.com/questions/36372611/how-to-test-if-an-object-is-a-proxy"},"here"),", ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy"},"Proxies")," are transparent by design; meaning there is no general way to determine if something is a proxy or not."),(0,r.kt)("li",{parentName:"ul"},"At the same time, Proxy property access, also very much by design, often has side effects."),(0,r.kt)("li",{parentName:"ul"},"-> This means that in many scenarios where Proxies (with side effects) are in play, you might just not be able to use Dbux properly.")))),(0,r.kt)("p",null,"You can completely disable tracing of any sensitive AST nodes by preceding them with a ",(0,r.kt)("inlineCode",{parentName:"p"},"/* dbux disable */")," comment. Tracked in issue ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Domiii/dbux/issues/209"},"#209"),"."),(0,r.kt)("h2",{id:"eval-and-dynamically-loaded-code"},(0,r.kt)("inlineCode",{parentName:"h2"},"eval")," and dynamically loaded code"),(0,r.kt)("p",null,"As a general rule of thumb - Any dynamically loaded code will currently not be traced. That is because we are not proactively scanning the application for code injections or outside code references."),(0,r.kt)("p",null,"This includes:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Calling ",(0,r.kt)("inlineCode",{parentName:"p"},"eval")," on non-instrumented code")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Any kind of ",(0,r.kt)("inlineCode",{parentName:"p"},"<script>")," tags containing or referencing non-instrumented code")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"If it is not generated dynamically: instrument that code beforehand.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"If the code is generated dynamically, Dbux cannot be of help right now, as we would have to ship and inject ",(0,r.kt)("inlineCode",{parentName:"p"},"@dbux/babel-plugin")," dynamically. While this is not impossible, it is not at all a priority to us. Contact us if you really need this to work."))),(0,r.kt)("h2",{id:"functionprototypetostring-and-functionname-do-not-behave-as-expected"},"Function.prototype.toString and Function.name do not behave as expected"),(0,r.kt)("p",null,"Because we instrument the function body, and sometimes even change the structure of functions, to allow better tracing their behavior, their ",(0,r.kt)("inlineCode",{parentName:"p"},"myFunc.toString()")," is not what you expect it to be. ",(0,r.kt)("inlineCode",{parentName:"p"},"name")," on the other hand should always survive (please ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Domiii/dbux/issues/new/choose"},"report an issue")," if not)."),(0,r.kt)("p",null,"(This is only of concern to those who rely on serializing and deserializing functions. E.g. for sending functions of to run in a ",(0,r.kt)("inlineCode",{parentName:"p"},"webworker"),(0,r.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/11354992/why-cant-web-worker-call-a-function-directly"},"*")," etc.)"),(0,r.kt)("h2",{id:"file-path-issues-on-windows"},"File Path Issues on Windows"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A bug unrelated to Dbux occurs ",(0,r.kt)("strong",{parentName:"li"},"very rarely"),", when running things in VSCode's built-in terminal: it might change ",(0,r.kt)("inlineCode",{parentName:"li"},"require")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"import")," paths to lower- or upper-case drive letter.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"NOTE: Luckily, we have not seen this bug occur in quite some time."),(0,r.kt)("li",{parentName:"ul"},"The bug causes a mixture of lower-case and upper-case drive letters to start appearing in ",(0,r.kt)("inlineCode",{parentName:"li"},"require")," paths",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"=> this makes ",(0,r.kt)("inlineCode",{parentName:"li"},"babel")," unhappy (",(0,r.kt)("a",{parentName:"li",href:"https://github.com/webpack/webpack/issues/2815"},"github issue"),")"))),(0,r.kt)("li",{parentName:"ul"},"Official bug report: ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/microsoft/vscode/issues/9448"},"https://github.com/microsoft/vscode/issues/9448")),(0,r.kt)("li",{parentName:"ul"},"Workaround: Restart your computer (can help!), run command in external ",(0,r.kt)("inlineCode",{parentName:"li"},"cmd")," or find a better behaving shell/terminal.")))),(0,r.kt)("h2",{id:"future-work-missing-features"},"Future Work: Missing Features"),(0,r.kt)("p",null,"This list serves to keep track of features that could prove very valuable for dynamic analysis and debugging purposes. "),(0,r.kt)("p",null,'In addition to the issue tracker, we have some more "exotic items" that we can only add slowly over time, and we encourage Dbux users to talk to us about and vote in favor of.\nSo many things that can be done... So little time...'),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Fix ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/Domiii/dbux/issues/640"},"#640"),": tracing the internals of ",(0,r.kt)("inlineCode",{parentName:"li"},"react")," is currently (01/2022) bugged."),(0,r.kt)("li",{parentName:"ul"},"Change ",(0,r.kt)(l.Z,{name:"dbux-runtime",mdxType:"ToolLink"})," to evict unused data.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"NOTE: It currently keeps almost all data in memory, since it will need ",(0,r.kt)("em",{parentName:"li"},"some of it")," to keep track of and/or establish connections between reads, writes, interrupted functions and more."))),(0,r.kt)("li",{parentName:"ul"},"Typescript support."),(0,r.kt)("li",{parentName:"ul"},"Properly test and provide recipes for all environments, e.g.:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Node's ",(0,r.kt)("inlineCode",{parentName:"li"},"vm")," (Jest uses that also)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"WebWorker")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"WebContainer")),(0,r.kt)("li",{parentName:"ul"},"more..."))),(0,r.kt)("li",{parentName:"ul"},"Config file support for instrumentation + ",(0,r.kt)("inlineCode",{parentName:"li"},"runtime"),"."),(0,r.kt)("li",{parentName:"ul"},"Configurable stats display for ",(0,r.kt)("inlineCode",{parentName:"li"},"CallGraph")," stats (see ",(0,r.kt)("inlineCode",{parentName:"li"},"ContextNode._addStats"),")"),(0,r.kt)("li",{parentName:"ul"},"Proper ",(0,r.kt)("inlineCode",{parentName:"li"},"stats")," screen where one can easily analyze all kinds of program execution statistics"),(0,r.kt)("li",{parentName:"ul"},"Better loop comprehension (tracked in ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/Domiii/dbux/issues/222"},"#222"),")."),(0,r.kt)("li",{parentName:"ul"},"Advanced analysis of code along the dependency tree(s)"),(0,r.kt)("li",{parentName:"ul"},"Support web-based VSCode ",(0,r.kt)("a",{parentName:"li",href:"https://vscode.dev/"},"https://vscode.dev/")),(0,r.kt)("li",{parentName:"ul"},"Support ",(0,r.kt)("a",{parentName:"li",href:"https://yarnpkg.com/features/pnp"},"Yarn PnP")," - considerations include:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/yarnpkg/berry/issues/558"},"Using Traditional Debugger with PNP"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"NOTE: file paths could look a little like this: ",(0,r.kt)("inlineCode",{parentName:"li"},"repo/.yarn/virtual/webpack-dev-server-virtual-98c281437e/0/cache/webpack-dev-server-npm-3.9.0-e9c2d8aa12.zip/node_modules/webpack-dev-server/bin/webpack-dev-server.js")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/yarnpkg/berry/issues/638"},"ESM Support"))))))),(0,r.kt)("h2",{id:"future-work-crazy-ideas"},"Future Work: Crazy Ideas"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Dynamic, adaptive runtime recording, to reduce noise and improve performance.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Currently, a loop of 1 million iterations already stretches Dbux to its limits. We want to improve that."),(0,r.kt)("li",{parentName:"ul"},"Adaptive trace logging would be advantageous. It should:",(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},'Only log traces that are "relevant", and:'),(0,r.kt)("li",{parentName:"ol"},'Allow user to easily select or change what is "relevant".'))))),(0,r.kt)("li",{parentName:"ul"},"More advanced search/filter analysis features, such as...",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"searching for arrays/objects that contain certain values"),(0,r.kt)("li",{parentName:"ul"},"searching/filtering of/by all (or subset of) ",(0,r.kt)("inlineCode",{parentName:"li"},"node_modules"),", package names"),(0,r.kt)("li",{parentName:"ul"},"enabling/disabling/grouping of/by modules/files etc. in call graph"),(0,r.kt)("li",{parentName:"ul"},"searching/filtering only system calls or sub-systems (e.g. all ",(0,r.kt)("inlineCode",{parentName:"li"},"HTTP")," calls)"),(0,r.kt)("li",{parentName:"ul"},"complex search queries (and, or, parentheses etc.)"))),(0,r.kt)("li",{parentName:"ul"},"Advanced ",(0,r.kt)("strong",{parentName:"li"},"context-sensitive")," keymap support to expand/collapse/click all buttons (e.g. similar to ",(0,r.kt)("a",{parentName:"li",href:"https://www.google.com/search?q=aoe4+grid+keys"},'AOE4\'s "grid keys"'),")",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"provide a single ",(0,r.kt)("inlineCode",{parentName:"li"},"Toggle Dbux Keymap")," shortcut/command. When enabled:"),(0,r.kt)("li",{parentName:"ul"},"show relevant shortcut key next to each button (if possible?)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"vscode.commands.executeCommand('setContext', 'dbux.keyboardMode.enabled', true);"))),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-jsonc"},'{ "keybindings": [\n  {\n    "command": "dbux.selectTrace",\n    "key": "q",\n    "when": "dbux.keyboardMode.enabled"\n  },\n  // ...\n  { \n    // this command toggle expands/collapses the first "expandable" button of TraceDetails (usually `Value`)\n    "command": "dbux.traceDetails.btns.toggle.first"\n    // ...\n  },\n  // ...\n  { \n    // this command clicks the first "meaningfully clickable" button of TraceDetails (which is the first navigation button?)\n    "command": "dbux.traceDetails.btns.click.first"\n    // ...\n  }\n]}\n')))))}k.isMDXComponent=!0}}]);