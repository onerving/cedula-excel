(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,a){},39:function(e,a,t){e.exports=t(75)},44:function(e,a,t){},45:function(e,a,t){},72:function(e,a){},73:function(e,a){},75:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),l=t(26),o=t.n(l),c=(t(44),t(45),t(16)),s=t.n(c),i=t(27),u=t(28),m=t(29),d=t(30),p=t(36),h=t(31),E=t(11),f=t(37),v=t(47);function w(e){return function(e){return v.get("https://cors-anywhere.herokuapp.com/http://search.sep.gob.mx/solr/cedulasCore/select?'",{params:{fl:"*,score",rows:1,wt:"json",q:e},crossDomain:!0})}(e).then(function(e){return e.data.response.docs[0]})}var C=t(35);var b=function(e){var a=Object(C.a)({accept:".xls,.xlsx",multiple:!1,onDropAccepted:e.onDropAccepted}),t=a.acceptedFiles,n=a.getRootProps,l=a.getInputProps,o=t.map(function(e){return r.a.createElement("li",{key:e.path},e.path," - ",e.size," bytes")});return r.a.createElement("section",{className:"container"},r.a.createElement("div",n({className:"dropzone"}),r.a.createElement("input",l()),"Arrastra tu archivo aqu\xed, o da click para seleccionarlo."),r.a.createElement("aside",null,r.a.createElement("ul",null,o)))},k=t(76),g=t(77),y=t(78),x=t(79),j=t(80),S=t(81),A=t(82),L=t(83),N=t(84),O=t(85),I=t(86),P=t(9),M=t.n(P),_=t(13),q=t(34);function D(e){return r.a.createElement(y.a,null,r.a.createElement(x.a,null,r.a.createElement(j.a,null,r.a.createElement("h4",null,"Paso 1: Sube tu archivo de Excel")),r.a.createElement(q.a,null,"La primera hoja de trabajo debe de tener las c\xe9dulas que quieres verificar.",r.a.createElement("br",null),"Se crear\xe1 una copia de la primera hoja y se le a\xf1adir\xe1n los resultados de tu consulta."),r.a.createElement(b,{onDropAccepted:e.onExcelUploaded})))}function U(e){var a=e.newColumnLetter?r.a.createElement("option",{key:e.newColumnLetter,value:e.newColumnLetter},e.newColumnLetter," - (nueva columna) "):null;return r.a.createElement(N.a,{className:"mb-2 mr-sm-2 mb-sm-0"},r.a.createElement(_.a,{className:"mr-sm-2"},e.title),r.a.createElement(O.a,{name:e.name,onChange:e.onChange,type:"select",defaultValue:0},r.a.createElement("option",{disabled:!0,value:0}," Selecciona una columna "),e.columns.map(function(e){return r.a.createElement("option",{key:e[0],value:e[0]},e[0]," - ",e[1]," ")}),a))}var V=function(e){function a(){var e,t;Object(m.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(t=Object(p.a)(this,(e=Object(h.a)(a)).call.apply(e,[this].concat(r)))).state={query:"1629426",result:{},columns:[],worksheet:null,validationState:!1},t.handleInputChange=function(e){var a=e.target,n=a.name,r=a.value;t.setState(Object(u.a)({},n,r))},t.excelUploaded=function(e){var a=e[0],n=new FileReader,r=Object(E.a)(t);n.onload=function(e){var a=new Uint8Array(e.target.result),t=M.a.read(a,{type:"array"}),n=t.Sheets[t.SheetNames[0]],l=M.a.utils.sheet_to_json(n,{header:"A"}),o=Object.entries(l[0]),c=o.slice(-1)[0][0],s=String.fromCharCode(c.charCodeAt(0)+1);r.setState({workbook:t,columns:o,worksheet:l,newColumnLetter:s})},n.readAsArrayBuffer(a)},t.validateLicenses=function(e){e.preventDefault(),t.setState({validationState:!0});var a=t.state,n=a.worksheet,r=a.licenseCol,l=a.validationCol,o=a.validMark,c=a.invalidMark,u=n.map(function(){var e=Object(i.a)(s.a.mark(function e(a,t){var n,i;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==t){e.next=2;break}return e.abrupt("return",a);case 2:return n=a[r],e.next=5,w(n);case 5:return i=e.sent,a[l]=i&&n===parseInt(i.numCedula)?o:c,e.abrupt("return",a);case 8:case"end":return e.stop()}},e)}));return function(a,t){return e.apply(this,arguments)}}());Promise.all(u).then(function(e){var a=M.a.utils.json_to_sheet(e,{skipHeader:!0}),n=t.state.workbook;M.a.utils.book_append_sheet(n,a,"c\xe9dulas validadas"),M.a.writeFile(n,"editado.xlsx"),t.setState({validationState:!1})})},t}return Object(f.a)(a,e),Object(d.a)(a,[{key:"render",value:function(){var e=this.state,a=e.licenseCol,t=e.validationCol,n=e.validMark,l=e.invalidMark,o=a&&t&&n&&l,c=r.a.createElement(k.a,{color:"primary",type:"submit",disabled:!o,onClick:this.validateLicenses},"Verificar c\xe9dulas"),s=r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{type:"grow",color:"primary"}),r.a.createElement("p",null,"Verificando. Esto puede tardar unos segundos.")),i=this.state.validationState?s:c,u=this.state.worksheet?r.a.createElement(y.a,null,r.a.createElement(x.a,null,r.a.createElement(j.a,null,r.a.createElement("h4",null,"Paso 2: Configura de acuerdo a tu documento")),r.a.createElement(S.a,null,r.a.createElement(A.a,{form:!0},r.a.createElement(L.a,{md:6},r.a.createElement(U,{columns:this.state.columns,name:"licenseCol",onChange:this.handleInputChange,title:"Columna donde est\xe1n las c\xe9dulas"})),r.a.createElement(L.a,{md:6},r.a.createElement(U,{columns:this.state.columns,name:"validationCol",onChange:this.handleInputChange,title:"Columna donde se marcar\xe1 la verificaci\xf3n",newColumnLetter:this.state.newColumnLetter}))),r.a.createElement(A.a,{form:!0},r.a.createElement(L.a,{md:6},r.a.createElement(N.a,{className:"mb-2 mr-sm-2 mb-sm-0"},r.a.createElement(_.a,{className:"mr-sm-2"},"Poner en la fila de una c\xe9dula verificada:"),r.a.createElement(O.a,{name:"validMark",onChange:this.handleInputChange,placeholder:"V\xe1lida, 1, o, etc.",type:"text"}))),r.a.createElement(L.a,{md:6},r.a.createElement(N.a,{className:"mb-2 mr-sm-2 mb-sm-0"},r.a.createElement(_.a,{className:"mr-sm-2"},"Poner en la fila de una c\xe9dula rechazada:"),r.a.createElement(O.a,{name:"invalidMark",onChange:this.handleInputChange,placeholder:"Inv\xe1lida, 0, x, etc.",type:"text"})))),r.a.createElement(A.a,null,r.a.createElement(L.a,null,i))))):null;return r.a.createElement(I.a,null,r.a.createElement("h3",null,"Verificador de c\xe9dulas profesionales"),r.a.createElement(D,{onExcelUploaded:this.excelUploaded}),u)}}]),a}(n.Component);var F=function(){return r.a.createElement(I.a,{fluid:!0,className:"App d-flex justify-items-center align-items-center"},r.a.createElement(V,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(74);o.a.render(r.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[39,1,2]]]);
//# sourceMappingURL=main.3ddfc839.chunk.js.map