"use strict";(self.webpackChunkdbux_docs=self.webpackChunkdbux_docs||[]).push([[246],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return m}});var i=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},l=Object.keys(e);for(i=0;i<l.length;i++)t=l[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)t=l[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=i.createContext({}),d=function(e){var n=i.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},s=function(e){var n=d(e.components);return i.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},c=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=d(t),m=r,b=c["".concat(u,".").concat(m)]||c[m]||p[m]||l;return t?i.createElement(b,a(a({ref:n},s),{},{components:t})):i.createElement(b,a({ref:n},s))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,a=new Array(l);a[0]=c;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:r,a[1]=o;for(var d=2;d<l;d++)a[d]=t[d];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5002:function(e,n,t){t.d(n,{Z:function(){return d}});var i=t(7462),r=t(3366),l=t(7294),a=t(3616),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function u(e){var n=e.toc,t=e.className,i=e.linkClassName,r=e.isChild;return n.length?l.createElement("ul",{className:r?void 0:t},n.map((function(e){return l.createElement("li",{key:e.id},l.createElement("a",{href:"#"+e.id,className:null!=i?i:void 0,dangerouslySetInnerHTML:{__html:e.value}}),l.createElement(u,{isChild:!0,toc:e.children,className:t,linkClassName:i}))}))):null}function d(e){var n=e.toc,t=e.className,d=void 0===t?"table-of-contents table-of-contents__left-border":t,s=e.linkClassName,p=void 0===s?"table-of-contents__link":s,c=e.linkActiveClassName,m=void 0===c?void 0:c,b=e.minHeadingLevel,f=e.maxHeadingLevel,h=(0,r.Z)(e,o),g=(0,a.LU)(),k=null!=b?b:g.tableOfContents.minHeadingLevel,v=null!=f?f:g.tableOfContents.maxHeadingLevel,x=(0,a.DA)({toc:n,minHeadingLevel:k,maxHeadingLevel:v}),y=(0,l.useMemo)((function(){if(p&&m)return{linkClassName:p,linkActiveClassName:m,minHeadingLevel:k,maxHeadingLevel:v}}),[p,m,k,v]);return(0,a.Si)(y),l.createElement(u,(0,i.Z)({toc:x,className:d,linkClassName:p},h))}},3755:function(e,n,t){t.d(n,{Z:function(){return u}});var i=t(7462),r=t(3366),l=t(7294),a=t(9700),o=["path","children","title"];function u(e){var n=e.path,t=e.children,u=e.title,d=(0,r.Z)(e,o);if(!n)throw new Error('invalid <CodeLink /> missing "path". - props: '+JSON.stringify(e,null,2));var s=(0,a.B)(n);t=t||s,u=u||t;var p="https://github.com/Domiii/dbux/tree/master/"+n;return l.createElement("a",(0,i.Z)({title:u,href:p},d),t)}},8640:function(e,n,t){t.d(n,{Z:function(){return u}});var i=t(7294),r="tableOfContentsInline_0DDH",l=t(5002);var a=function(e){var n=e.toc,t=e.minHeadingLevel,a=e.maxHeadingLevel;return i.createElement("div",{className:r},i.createElement(l.Z,{toc:n,minHeadingLevel:t,maxHeadingLevel:a,className:"table-of-contents",linkClassName:null}))},o={display:"none"};function u(e){var n=e.toc;return i.createElement("div",{style:o},i.createElement(a,{toc:n}))}},9700:function(e,n,t){t.d(n,{B:function(){return r}});var i={"dbux-code":"Dbux VSCode Extension"};function r(e){var n=i[e];return n||(e.startsWith("dbux-")&&!e.startsWith("dbux-code")?"@dbux/"+e.substring(5):e)}},4771:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return m},default:function(){return h}});var i,r=t(7462),l=t(3366),a=(t(7294),t(3905)),o=t(3755),u=t(8640),d=["components"],s={},p="Build Pipeline Integration",c={unversionedId:"guides/build-pipeline-integration",id:"guides/build-pipeline-integration",title:"Build Pipeline Integration",description:'As explained in the "Runtime Analysis" chapter you need to "babel your program" with @dbux/babel-plugin enabled).',source:"@site/content/guides/03-build-pipeline-integration.mdx",sourceDirName:"guides",slug:"/guides/build-pipeline-integration",permalink:"/dbux/guides/build-pipeline-integration",editUrl:"https://github.com/Domiii/dbux/blob/master/docs/content/guides/03-build-pipeline-integration.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Performance",permalink:"/dbux/guides/performance"},next:{title:"Tools and Configuration Overview",permalink:"/dbux/tools-and-configuration"}},m=[{value:"Setup",id:"setup",children:[],level:2},{value:"Config",id:"config",children:[],level:2},{value:"Node Applications",id:"node-applications",children:[],level:2},{value:"Webpack",id:"webpack",children:[],level:2},{value:"Rollup",id:"rollup",children:[],level:2},{value:"Storybook",id:"storybook",children:[],level:2},{value:"Create-React-App",id:"create-react-app",children:[],level:2},{value:"Next.js",id:"nextjs",children:[],level:2},{value:"ng",id:"ng",children:[],level:2},{value:"Other Bundlers or Bundler Wrappers",id:"other-bundlers-or-bundler-wrappers",children:[],level:2}],b=(i="ToolLink",function(e){return console.warn("Component "+i+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.kt)("div",e)}),f={toc:m};function h(e){var n=e.components,t=(0,l.Z)(e,d);return(0,a.kt)("wrapper",(0,r.Z)({},f,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"build-pipeline-integration"},"Build Pipeline Integration"),(0,a.kt)(u.Z,{toc:m,mdxType:"TOC"}),(0,a.kt)("p",null,"As explained in ",(0,a.kt)("a",{parentName:"p",href:"/dbux/runtime-analysis/enable-dbux"},'the "Runtime Analysis" chapter'),": for Dbux to work, it first needs to record JavaScript application behavior. To that end, your program must be instrumented with ",(0,a.kt)(o.Z,{path:"dbux-babel-plugin",mdxType:"CodeLink"}),' (i.e.: you need to "',(0,a.kt)("a",{parentName:"p",href:"https://babeljs.io/"},"babel"),' your program" with ',(0,a.kt)("inlineCode",{parentName:"p"},"@dbux/babel-plugin")," enabled)."),(0,a.kt)("p",null,"Once running, the injected ",(0,a.kt)("inlineCode",{parentName:"p"},"@dbux/runtime")," will send collected data to the ",(0,a.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-code#runtime-server"},"runtime server"),"."),(0,a.kt)("h2",{id:"setup"},"Setup"),(0,a.kt)("p",null,"First ",(0,a.kt)("inlineCode",{parentName:"p"},"npm install")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn add")," the necessary ",(0,a.kt)("inlineCode",{parentName:"p"},"@dbux")," packages to the project you want to trace:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"@dbux/babel-plugin")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"@dbux/runtime"))),(0,a.kt)("p",null,"Alternatively, simply install ",(0,a.kt)(b,{name:"dbux-cli",mdxType:"ToolLink"}),". That will also install the other necessary dependencies."),(0,a.kt)("p",null,"Important: Make sure, that they match the version of ",(0,a.kt)(b,{name:"dbux-code",mdxType:"ToolLink"})," that you installed."),(0,a.kt)("h2",{id:"config"},"Config"),(0,a.kt)("p",null,"You can find configuration options for the different tools in the ",(0,a.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration"},'"Tools and Configuration" chapter'),"."),(0,a.kt)("p",null,"In addition to configuring the individual tools, you want to make sure you ",(0,a.kt)("a",{parentName:"p",href:"/dbux/guides/runtime-trace-filtering"},"configure the module filter to trace the right files"),"."),(0,a.kt)("h2",{id:"node-applications"},"Node Applications"),(0,a.kt)("p",null,"For Node applications that do not need bundling or building, refer to ",(0,a.kt)("a",{parentName:"p",href:"/dbux/tools-and-configuration/dbux-cli"},"the Dbux CLI")," documentation."),(0,a.kt)("h2",{id:"webpack"},"Webpack"),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const shouldInclude = require('@dbux/babel-plugin/dist/include').default;\n\n// ...\n\nmodule.exports = {\n  // ...\n  module: {\n    rules: [\n      // ...\n      {\n        test: /\\.jsx?$/,\n        include: [\n          shouldInclude(moduleFilterOptions)\n        ],\n        use: {\n          loader: 'babel-loader',\n          options: {\n            plugins: [\n              // other plugins, running **after** Dbux...\n              '@dbux/babel-plugin'\n              // other plugins, running **before** Dbux...\n            ]\n          }\n        }\n      }\n    ]\n  }\n};\n")),(0,a.kt)("p",null,"NOTE: We use the (configurable/flexible/complicated) ",(0,a.kt)(o.Z,{path:"dbux-projects/assets/sharedAssets/webpack/dbux.webpack.config.base.js",mdxType:"CodeLink"},"dbux.webpack.config.base.js")," for ",(0,a.kt)("a",{parentName:"p",href:"/dbux/dbux-practice/"},"Dbux Practice")," projects."),(0,a.kt)("h2",{id:"rollup"},"Rollup"),(0,a.kt)("p",null,"TODO: We have not tested this in a while. Need to verify and set it in stone. Test with the previously working ",(0,a.kt)("inlineCode",{parentName:"p"},"Chart.js")," practice exercises (which uses Rollup)."),(0,a.kt)("p",null,"Rollup requires use of ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@rollup/plugin-babel"},"@rollup/plugin-babel"),"."),(0,a.kt)("p",null,"Example - something like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const shouldInclude = require('@dbux/babel-plugin/dist/include').default;\n\nconst config = {\n  ...\n  plugins: [\n    babel({\n      babelHelpers: 'inline',\n      filter: shouldInclude(moduleFilterOptions),\n      /**\n       * WARNING: if not skipped, we saw some serious memory leaks (in 2020), but might already be fixed in 2022.\n       * TODO: we need to test this again.\n       */\n      skipPreflightCheck: true\n    })\n  ]\n};\n")),(0,a.kt)("h2",{id:"storybook"},"Storybook"),(0,a.kt)("p",null,"TODO"),(0,a.kt)("h2",{id:"create-react-app"},"Create-React-App"),(0,a.kt)("p",null,"TODO"),(0,a.kt)("h2",{id:"nextjs"},"Next.js"),(0,a.kt)("p",null,"TODO"),(0,a.kt)("h2",{id:"ng"},"ng"),(0,a.kt)("p",null,"TODO"),(0,a.kt)("h2",{id:"other-bundlers-or-bundler-wrappers"},"Other Bundlers or Bundler Wrappers"),(0,a.kt)("p",null,"TODO"))}h.isMDXComponent=!0}}]);