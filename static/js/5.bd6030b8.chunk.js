(this["webpackJsonpsocial-network"]=this["webpackJsonpsocial-network"]||[]).push([[5],{301:function(e,s,n){e.exports={inner:"users_inner__8zw3D",user:"users_user__35VOC",usersLoading:"users_usersLoading__1Z-K5",name:"users_name__Or0kG",photo:"users_photo__Z_NMi",status:"users_status__HnLT-",button:"users_button__2U6vF",followed:"users_followed__1INXW",pages:"users_pages__2zuKX",pagesLoading:"users_pagesLoading__zGKft",page:"users_page__1VGXq",pageSelected:"users_pageSelected__3AnPR"}},305:function(e,s,n){"use strict";n.r(s);var t=n(29),o=n(30),r=n(32),a=n(31),i=n(13),u=n(109),c=n(1),l=n.n(c),g=n(56),p=n(301),d=n.n(p),f=n(19),h=n(45),j=n(33),b=n(0),_=function(e){for(var s=e.totalUsersCount,n=e.pageSize,t=e.isLoading,o=e.currentPage,r=e.onPageChanged,a=e.users,i=e.followingProgress,u=e.follow,l=e.unfollow,p=Math.ceil(s/n),_=Math.ceil(p/15),w=Object(c.useState)(1),O=Object(g.a)(w,2),P=O[0],m=O[1],x=15*(P-1)+1,C=15*P,v=[],L=1;L<=p;L++)v.push(L);return Object(b.jsxs)("div",{className:d.a.inner,children:[t?Object(b.jsx)(j.a,{}):null,Object(b.jsxs)("div",{className:t?d.a.pagesLoading:d.a.pages,children:[P>1&&Object(b.jsx)("button",{className:d.a.page,onClick:function(){m(P-1)},children:"<"}),v.filter((function(e){return e>=x&&e<=C})).map((function(e){return Object(b.jsx)("div",{className:o===e?d.a.pageSelected:d.a.page,onClick:function(){r(e)},children:e},e)})),_>P&&Object(b.jsx)("button",{className:d.a.page,onClick:function(){m(P+1)},children:">"})]}),a.map((function(e){return Object(b.jsxs)("div",{className:t?d.a.usersLoading:d.a.user,children:[Object(b.jsx)("div",{className:d.a.name,children:Object(b.jsx)("h1",{children:e.name.toLowerCase()})}),Object(b.jsx)("div",{className:d.a.photo,children:Object(b.jsx)(f.b,{to:"/profile/"+e.id,children:Object(b.jsx)("img",{src:null!==e.photos.large?e.photos.large:h.a,alt:"User avatar"})})}),Object(b.jsx)("div",{className:d.a.status,children:Object(b.jsx)("h3",{children:null!==e.status?e.status:"There could be a status here, but..."})}),Object(b.jsx)("div",{className:d.a.button,children:e.followed?Object(b.jsx)("button",{disabled:i.some((function(s){return s===e.id})),onClick:function(){l(e.id)},className:d.a.followed,children:"Followed"}):Object(b.jsx)("button",{disabled:i.some((function(s){return s===e.id})),onClick:function(){u(e.id)},children:"Follow"})})]},e.id)}))]})},w=function(e){return e.usersPage.users},O=function(e){return e.usersPage.pageSize},P=function(e){return e.usersPage.totalUsersCount},m=function(e){return e.usersPage.currentPage},x=function(e){return e.usersPage.isLoading},C=function(e){return e.usersPage.followingProgress},v=function(e){Object(r.a)(n,e);var s=Object(a.a)(n);function n(){var e;Object(t.a)(this,n);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(e=s.call.apply(s,[this].concat(r))).onPageChanged=function(s){e.props.getUsers(s,e.props.pageSize)},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.props.getUsers(this.props.currentPage,this.props.pageSize)}},{key:"render",value:function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(_,{users:this.props.users,pageSize:this.props.pageSize,totalUsersCount:this.props.totalUsersCount,currentPage:this.props.currentPage,isLoading:this.props.isLoading,followingProgress:this.props.followingProgress,onPageChanged:this.onPageChanged,follow:this.props.follow,unfollow:this.props.unfollow})})}}]),n}(l.a.Component);s.default=Object(i.b)((function(e){return{users:w(e),pageSize:O(e),totalUsersCount:P(e),currentPage:m(e),isLoading:x(e),followingProgress:C(e)}}),{setCurrentPage:u.e,followSuccess:u.c,unfollowSuccess:u.h,toggleFollowingProgress:u.f,getUsers:u.d,follow:u.b,unfollow:u.g})(v)}}]);
//# sourceMappingURL=5.bd6030b8.chunk.js.map