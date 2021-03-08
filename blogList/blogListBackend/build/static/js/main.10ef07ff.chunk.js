(this.webpackJsonpphoneBook=this.webpackJsonpphoneBook||[]).push([[0],{21:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(1),o=n(15),i=n.n(o),a=(n(21),n(6)),u=n(3),l=function(e){var t=e.addBlog,n=e.newTitle,c=e.handleTitleChange,o=e.newAuthor,i=e.handleAuthorChange,a=e.newUrl,u=e.handleUrlChange,l=e.newLikes,s=e.handleLikesChange;return Object(r.jsxs)("form",{onSubmit:t,children:[Object(r.jsxs)("div",{children:["title: ",Object(r.jsx)("input",{value:n,onChange:c})]}),Object(r.jsxs)("div",{children:["author:",Object(r.jsx)("input",{value:o,onChange:i})]}),Object(r.jsxs)("div",{children:["url:",Object(r.jsx)("input",{value:a,onChange:u})]}),Object(r.jsxs)("div",{children:["likes:",Object(r.jsx)("input",{value:l,onChange:s})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"update Blog list"})})]})},s=function(e){var t=e.blog,n=e.removeEntry;return Object(r.jsxs)("li",{children:[t.title," ",t.author," ",t.url," ",t.likes," ",Object(r.jsx)("button",{onClick:n,value:t.id,children:"Delete"})," "]})},d=function(e){return Object(r.jsxs)("div",{children:["search:",Object(r.jsx)("input",{value:e.newSearch,onChange:e.handleSearchChange})]})},h=function(e){var t=e.Blog,n=e.blogsToShow,c=e.removeEntry;return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Blogs"}),Object(r.jsx)("ul",{children:n.map((function(e){return Object(r.jsx)(t,{blog:e,removeEntry:c},e.title)}))})]})},j=n(4),b=n.n(j),f="/api/blogs",g={getAll:function(){return b.a.get(f).then((function(e){return e.data}))},create:function(e){return b.a.post(f,e).then((function(e){return e.data}))},update:function(e,t){return b.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data}))},removeEntry:function(e){return b.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))}},O={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},v=function(e){var t=e.message;return null===t?null:Object(r.jsx)("div",{style:O,className:"error",children:t})},m={color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},x=function(e){var t=e.message;return null===t?null:Object(r.jsx)("div",{style:m,className:"error",children:t})},p=function(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],i=Object(c.useState)(""),j=Object(u.a)(i,2),b=j[0],f=j[1],O=Object(c.useState)(""),m=Object(u.a)(O,2),p=m[0],w=m[1],y=Object(c.useState)(""),S=Object(u.a)(y,2),C=S[0],k=S[1],B=Object(c.useState)(""),T=Object(u.a)(B,2),L=T[0],E=T[1],A=Object(c.useState)(""),U=Object(u.a)(A,2),D=U[0],z=U[1],J=Object(c.useState)(null),N=Object(u.a)(J,2),R=N[0],I=N[1],q=Object(c.useState)(null),F=Object(u.a)(q,2),G=F[0],H=F[1];Object(c.useEffect)((function(){g.getAll().then((function(e){o(e)})).catch((function(e){H("unable to connect to server"),setTimeout((function(){H(null)}),5e3)}))}),[]);var K=n.filter((function(e){return!0===e.title.toLowerCase().includes(D)}));return Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:"Blog List"}),Object(r.jsx)(x,{message:G}),Object(r.jsx)(v,{message:R}),Object(r.jsx)("h3",{children:"Search"}),Object(r.jsx)(d,{newSearch:D,handleSearchChange:function(e){z(e.target.value)}}),Object(r.jsx)("h3",{children:"Update Blog List"}),Object(r.jsx)(l,{addBlog:function(e){e.preventDefault(),n.filter((function(e){return e.title.toLocaleLowerCase()===b.toLowerCase()})).length?function(){var e=window.confirm("".concat(b," is already added to blog list, replace the old blog entry with new one?")),t=n.find((function(e){return e.title===b})),r=Object(a.a)(Object(a.a)({},t),{},{author:p,url:C,likes:L});e&&g.update(r.id,r).then((function(e){I("Updated ".concat(r.title,"'s entry")),setTimeout((function(){I(null)}),5e3),o(n.map((function(t){return t.id===e.id?e:t})))})).catch((function(e){H("'".concat(r.title,"' was removed by another user")),setTimeout((function(){H(null)}),5e3),o(n.filter((function(e){return e.id!==r.id})))}))}():function(){var e={title:b,author:p,url:C,likes:L};g.create(e).then((function(e){I("Added ".concat(e.title," to the server")),setTimeout((function(){I(null)}),5e3),o(n.concat(e)),f(""),w(""),k(""),E("")})).catch((function(e){console.log("error:",e.response.data.error),H(e.response.data.error||"unable to connect to server"),setTimeout((function(){H(null)}),5e3)}))}(),f(""),w(""),k(""),E("")},newTitle:b,handleTitleChange:function(e){f(e.target.value)},newAuthor:p,handleAuthorChange:function(e){w(e.target.value)},newUrl:C,handleUrlChange:function(e){k(e.target.value)},newLikes:L,handleLikesChange:function(e){E(e.target.value)}}),Object(r.jsx)(h,{blogsToShow:K,Blog:s,removeEntry:function(e){e.preventDefault();var t=e.target.value,r=window.confirm("are you sure?"),c=n.find((function(e){return e.id===t}));r&&g.removeEntry(c.id).then((function(e){console.log(c.title),I("Deleted ".concat(c.title,"'s entry")),setTimeout((function(){I(null)}),5e3),o(n.filter((function(e){return e.id!==t})))})).catch((function(e){H("'".concat(n[t-1].title,"' was removed by another user")),setTimeout((function(){H(null)}),5e3),o(n.filter((function(e){return e.id!==n[t-1].id})))}))}})]})};i.a.render(Object(r.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.10ef07ff.chunk.js.map