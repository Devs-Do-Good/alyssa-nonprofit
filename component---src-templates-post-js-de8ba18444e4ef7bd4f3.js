(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"6qSS":function(t,e,n){"use strict";n.r(e);var a=n("q1tI"),r=n.n(a),o=n("Wbzz"),l=n("/zyf"),u=n("OtEr"),m=n("tKV0"),i=n("/R/0"),c=n("S8eP");var s=n("Jmu9"),f=n("d+8V"),g=n("0qiq"),d=n("JTHd"),b=n("CvFZ");e.default=function(t){var e=Object(d.a)(),n=Object(b.a)(),a=t.data.markdownRemark,p={actions:[u.DeleteAction],fields:[{label:"Title",name:"rawFrontmatter.title",component:"text"},{label:"Authors",name:"rawFrontmatter.authors",component:"authors",authors:e},{name:"rawFrontmatter.draft",component:"toggle",label:"Draft"},{label:"Date",name:"rawFrontmatter.date",component:"date"},{label:"Hero Image",name:"rawFrontmatter.hero.image",component:"image",parse:function(t){return t?"../images/"+t.filename:""},uploadDir:function(){return"/content/images/"},previewSrc:function(t,e,n){return n.frontmatter.hero&&n.frontmatter.hero.image?n.frontmatter.hero.image.childImageSharp.fluid.src:""}},{label:"Tags",name:"rawFrontmatter.tags",component:"tags",tags:n}]},h=Object(u.useRemarkForm)(a,p),E=h[0],w=h[1];return Object(l.usePlugin)(w),r.a.createElement(m.InlineForm,{form:w},r.a.createElement(g.a,{page:E},r.a.createElement(c.k,null,r.a.createElement(c.g,null,r.a.createElement(c.i,null,E.frontmatter.date),E.frontmatter.authors&&E.frontmatter.authors.length>0&&r.a.createElement(c.i,null,r.a.createElement("em",null,"By")," ",r.a.createElement(s.b,{authorIDs:E.frontmatter.authors})),r.a.createElement(c.h,null,r.a.createElement(o.Link,{to:"/blog"},"← Back to Blog"))),r.a.createElement("h1",null,r.a.createElement(m.InlineTextField,{name:"rawFrontmatter.title"})),r.a.createElement("hr",null),r.a.createElement(i.InlineWysiwyg,{name:"rawMarkdownBody",format:"markdown"},r.a.createElement("div",{dangerouslySetInnerHTML:{__html:E.html}})),E.frontmatter.draft&&r.a.createElement(c.b,null,"Draft"),!1),E.frontmatter.tags&&E.frontmatter.tags.length>0&&r.a.createElement(c.g,null,r.a.createElement(c.i,null,r.a.createElement(f.a,{tagIDs:E.frontmatter.tags})))))}},CvFZ:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("Wbzz"),r=function(){return Object(a.useStaticQuery)("868887449").settingsJson.tags}},JTHd:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("Wbzz"),r=function(){return Object(a.useStaticQuery)("2928712368").settingsJson.authors}},Jmu9:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return o}));var a=n("JTHd"),r=function(t){var e=t.authorIDs,n=Object(a.a)().filter((function(t){return e.find((function(e){return e===t.id}))}));return n.map((function(t,e){return n.length===e+1?t.name:t.name+", "}))},o={label:"Authors",fields:[{label:"Authors",name:"rawJson.authors",component:"group-list",itemProps:function(t){return{key:t.id,label:t.name}},defaultItem:function(){return{name:"New Author",id:Math.random().toString(36).substr(2,9),email:"",link:""}},fields:[{label:"Name",name:"name",component:"text",parse:function(t){return t||""}},{label:"Email",name:"email",component:"text",parse:function(t){return t||""}},{label:"Link",name:"link",component:"text",parse:function(t){return t||""}}]}]}},"d+8V":function(t,e,n){"use strict";n.d(e,"a",(function(){return u})),n.d(e,"b",(function(){return i}));var a=n("q1tI"),r=n.n(a),o=n("Wbzz"),l=n("CvFZ"),u=function(t){var e=t.tagIDs,n=Object(l.a)().filter((function(t){return e.find((function(e){return e===t.id}))}));return n.map((function(t,e){var a=m(t.text);return n.length===e+1?r.a.createElement(r.a.Fragment,null,r.a.createElement(o.Link,{to:"/blog/tag/"+a},t.text)):r.a.createElement(r.a.Fragment,null,r.a.createElement(o.Link,{to:"/blog/tag/"+a},t.text),", ")}))},m=function(t){return t.toLowerCase().replace(" ","-")},i={label:"Tags",fields:[{label:"Tags",name:"rawJson.tags",component:"group-list",itemProps:function(t){return{key:t.id,label:t.text}},defaultItem:function(){return{name:"New Tag",id:Math.random().toString(36).substr(2,9),text:""}},fields:[{label:"Text",name:"text",component:"text",parse:function(t){return t||""}}]}]}}}]);
//# sourceMappingURL=component---src-templates-post-js-de8ba18444e4ef7bd4f3.js.map