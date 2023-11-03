const nt="ENTRIES",V="KEYS",T="VALUES",F="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===F)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==F).join("")}value(){return E(this._path).node.get(F)}result(){switch(this._type){case T:return this.value();case V:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ot=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return R(e,t,s,n,i,1,o,""),n},R=(e,t,s,n,o,u,i,r)=>{const d=u*i;t:for(const l of e.keys())if(l===F){const a=o[d-1];a<=s&&n.set(r,[e.get(l),a])}else{let a=u;for(let h=0;h<l.length;++h,++a){const m=l[h],p=i*a,f=p-i;let c=o[p];const g=Math.max(0,a-s-1),_=Math.min(i-1,a+s);for(let y=g;y<_;++y){const b=m!==t[y],z=o[f+y]+ +b,A=o[f+y+1]+1,w=o[p+y]+1,L=o[p+y+1]=Math.min(z,A,w);L<c&&(c=L)}if(c>s)continue t}R(e.get(l),t,s,n,o,a,i,r+l)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=O(n);for(const i of o.keys())if(i!==F&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ut(this._tree,t)}entries(){return new D(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ot(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(F):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(F)}keys(){return new D(this,V)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,M(this._tree,t).set(F,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);return n.set(F,s(n.get(F))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);let o=n.get(F);return o===void 0&&n.set(F,o=s()),o}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==F&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==F&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},M=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==F&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const d=e.get(u);if(r===u.length)e=d;else{const l=new Map;l.set(u.slice(r),d),e.set(t.slice(n,n+r),l),e.delete(u),e=l}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ut=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(F),s.size===0)W(n);else if(s.size===1){const[o,u]=s.entries().next().value;$(n,o,u)}}},W=e=>{if(e.length===0)return;const[t,s]=O(e);if(t.delete(s),t.size===0)W(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==F&&$(e.slice(0,-1),n,o)}},$=(e,t,s)=>{if(e.length===0)return;const[n,o]=O(e);n.set(o+t,s),n.delete(o)},O=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},rt=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",q="and",ct="and_not",lt=(e,t)=>{e.includes(t)||e.push(t)},P=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},G=({score:e},{score:t})=>t-e,ht=()=>new Map,k=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},N=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),P(n.terms,u)}}return e},[q]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);P(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[ct]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},at=(e,t,s,n,o,u)=>{const{k:i,b:r,d}=u;return Math.log(1+(s-t+.5)/(t+.5))*(d+e*(i+1)/(e+i*(1-r+r*n/o)))},ft=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},gt=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,ht),u=o.get(t);u==null||u.get(s)==null?H(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},pt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(rt),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof console?.[e]=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},Ft={combineWith:q,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},yt={..._t,...U},Y=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(dt[s])||new Map},B=(e,t,s,n,o,u,i,r,d=new Map)=>{if(o==null)return d;for(const l of Object.keys(u)){const a=u[l],h=e._fieldIds[l],m=o.get(h);if(m==null)continue;let p=m.size;const f=e._avgFieldLength[h];for(const c of m.keys()){if(!e._documentIds.has(c)){gt(e,h,c,s),p-=1;continue}const g=i?i(e._documentIds.get(c),s,e._storedFields.get(c)):1;if(!g)continue;const _=m.get(c),y=e._fieldLength.get(c)[h],b=at(_,p,e._documentCount,y,f,r),z=n*a*g*b,A=d.get(c);if(A){A.score+=z,lt(A.terms,t);const w=N(A.match,s);w?w.push(l):A.match[s]=[l]}else d.set(c,{score:z,terms:[t],match:{[s]:[l]}})}}return d},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((c,g)=>({...c,[g]:N(n.boost,g)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:d}=n,{fuzzy:l,prefix:a}={...J.weights,...i},h=e._index.get(t.term),m=B(e,t.term,t.term,1,h,o,u,d);let p,f;if(t.prefix&&(p=e._index.atPrefix(t.term)),t.fuzzy){const c=t.fuzzy===!0?.2:t.fuzzy,g=c<1?Math.min(r,Math.round(t.term.length*c)):c;g&&(f=e._index.fuzzyGet(t.term,g))}if(p)for(const[c,g]of p){const _=c.length-t.term.length;if(!_)continue;f?.delete(c);const y=a*c.length/(c.length+.3*_);B(e,t.term,c,y,g,o,u,d,m)}if(f)for(const c of f.keys()){const[g,_]=f.get(c);if(!_)continue;const y=l*c.length/(c.length+_);B(e,t.term,c,y,g,o,u,d,m)}return m},X=(e,t,s={})=>{if(typeof t!="string"){const a={...s,...t,queries:void 0},h=t.queries.map(m=>X(e,m,a));return Y(h,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:d}=i,l=r(t).flatMap(a=>d(a)).filter(a=>!!a).map(ft(i)).map(a=>At(e,a,i));return Y(l,i.combineWith)},K=(e,t,s={})=>{const n=X(e,t,s),o=[];for(const[u,{score:i,terms:r,match:d}]of n){const l=r.length,a={id:e._documentIds.get(u),score:i*l,terms:Object.keys(d),match:d};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return o.sort(G),o},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of K(e,t,s)){const r=i.join(" "),d=n.get(r);d!=null?(d.score+=u,d.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:d}]of n)o.push({suggestion:u,terms:r,score:i/d});return o.sort(G),o};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(t?.fields==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...pt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...Ft,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:d,serializationVersion:l},a)=>{if(l!==1&&l!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const h=new Et(a);h._documentCount=t,h._nextId=s,h._documentIds=k(n),h._idToShortId=new Map,h._fieldIds=o,h._fieldLength=k(u),h._avgFieldLength=i,h._storedFields=k(r),h._dirtCount=d||0,h._index=new C;for(const[m,p]of h._documentIds)h._idToShortId.set(p,m);for(const[m,p]of e){const f=new Map;for(const c of Object.keys(p)){let g=p[c];l===1&&(g=g.ds),f.set(parseInt(c,10),k(g))}h._index.set(m,f)}return h},Q=Object.entries,wt=Object.fromEntries,j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(l,a=!1)=>{let h="";i===0?h=l.length>20?`… ${l.slice(-20)}`:l:a?h=l.length+i>100?`${l.slice(0,100-i)}… `:l:h=l.length>20?`${l.slice(0,20)} … ${l.slice(-20)}`:l,h&&o.push(h),i+=h.length,a||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let d=s.indexOf(n,u);if(d===-1)return null;for(;d>=0;){const l=d+n.length;if(r(e.slice(u,d)),u=l,i>100)break;d=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},Z=/[\u4e00-\u9fa5]/g,tt=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(Z)||[],n=t.replace(Z,"").toLowerCase();return n?[n,...s]:[...s]},...e}),xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),kt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),et=(e,t,s={})=>{const n={};return K(t,e,tt({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,d=u.includes("@"),l=u.includes("#"),[a,h]=u.split(/[#@]/),m=i.sort((f,c)=>f.length-c.length).filter((f,c)=>i.slice(c+1).every(g=>!g.includes(f))),{contents:p}=n[a]??={title:"",contents:[]};if(d)p.push([{type:"customField",key:a,index:h,display:m.map(f=>o.c.map(c=>j(c,f))).flat().filter(f=>f!==null)},r]);else{const f=m.map(c=>j(o.h,c)).filter(c=>c!==null);if(f.length&&p.push([{type:l?"heading":"title",key:a,...l&&{anchor:h},display:f},r]),"t"in o)for(const c of o.t){const g=m.map(_=>j(c,_)).filter(_=>_!==null);g.length&&p.push([{type:"text",key:a,...l&&{anchor:h},display:g},r])}}}),Q(n).sort(([,o],[,u])=>"max"==="total"?xt(o,u):kt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=it(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},st=(e,t,s={})=>Ct(t,e,tt(s)).map(({suggestion:n})=>n),v=wt(Q(JSON.parse("{\"/\":{\"documentCount\":48,\"nextId\":48,\"documentIds\":{\"0\":\"v-8daa1a0e\",\"1\":\"v-184f4da6\",\"2\":\"v-2e3eac9e\",\"3\":\"v-2e3eac9e#幻灯片演示\",\"4\":\"v-2e3eac9e#标注幻灯片\",\"5\":\"v-2e3eac9e#标注幻灯片-1\",\"6\":\"v-2e3eac9e#markdown\",\"7\":\"v-2e3eac9e#markdown-1\",\"8\":\"v-2e3eac9e#这是一个-h3\",\"9\":\"v-2e3eac9e#markdown-2\",\"10\":\"v-2e3eac9e#markdown-3\",\"11\":\"v-2e3eac9e#markdown-4\",\"12\":\"v-2e3eac9e#markdown-5\",\"13\":\"v-2e3eac9e#布局\",\"14\":\"v-2e3eac9e#布局-1\",\"15\":\"v-2e3eac9e#布局-2\",\"16\":\"v-2e3eac9e#布局-3\",\"17\":\"v-2e3eac9e#背景\",\"18\":\"v-2e3eac9e#动画片段\",\"19\":\"v-2e3eac9e#动画片段-1\",\"20\":\"v-2e3eac9e#动画片段-2\",\"21\":\"v-2e3eac9e#动画-class\",\"22\":\"v-2e3eac9e#动画片段-3\",\"23\":\"v-2e3eac9e#动画-class-1\",\"24\":\"v-2e3eac9e#动画片段-4\",\"25\":\"v-2e3eac9e#多个动画片段\",\"26\":\"v-2e3eac9e#动画片段-5\",\"27\":\"v-2e3eac9e#顺序\",\"28\":\"v-2e3eac9e#渐变\",\"29\":\"v-2e3eac9e#渐变-1\",\"30\":\"v-2e3eac9e#渐变-2\",\"31\":\"v-2e3eac9e#过渡动画\",\"32\":\"v-2e3eac9e#功能\",\"33\":\"v-2e3eac9e#功能-1\",\"34\":\"v-2e3eac9e#代码\",\"35\":\"v-2e3eac9e#功能-2\",\"36\":\"v-2e3eac9e#预览模式\",\"37\":\"v-2e3eac9e#功能-3\",\"38\":\"v-2e3eac9e#全屏模式\",\"39\":\"v-2e3eac9e#功能-4\",\"40\":\"v-2e3eac9e#缩放\",\"41\":\"v-2e3eac9e#结束\",\"42\":\"v-423739d0\",\"43\":\"v-423739d0#项目构建\",\"44\":\"v-423739d0#部署到gitpages\",\"45\":\"v-423739d0@0\",\"46\":\"v-423739d0@1\",\"47\":\"v-145ac574\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1],\"1\":[1,2],\"2\":[1,2],\"3\":[1,5],\"4\":[1,2],\"5\":[1,12],\"6\":[1,4],\"7\":[1,4],\"8\":[2,11],\"9\":[1,11],\"10\":[1,12],\"11\":[1,18],\"12\":[1,8],\"13\":[1,1],\"14\":[1,7],\"15\":[1,8],\"16\":[1],\"17\":[1,5],\"18\":[1,1],\"19\":[1,6],\"20\":[1],\"21\":[2,10],\"22\":[1],\"23\":[2,9],\"24\":[1],\"25\":[1,8],\"26\":[1],\"27\":[1,9],\"28\":[1,1],\"29\":[1,15],\"30\":[1],\"31\":[1,8],\"32\":[1,1],\"33\":[1],\"34\":[1,20],\"35\":[1],\"36\":[1,6],\"37\":[1],\"38\":[1,6],\"39\":[1],\"40\":[1,9],\"41\":[1,2],\"42\":[1,6],\"43\":[1,2],\"44\":[1,28],\"45\":[null,null,1],\"46\":[null,null,2],\"47\":[1]},\"averageFieldLength\":[1.0652777777777778,7.245362425580955,0.06382978723404255],\"storedFields\":{\"0\":{\"h\":\"主页\"},\"1\":{\"h\":\"介绍页\",\"t\":[\"将你的个人介绍和档案放置在此处。\"]},\"2\":{\"h\":\"幻灯片页\",\"t\":[\"@slidestart\"]},\"3\":{\"h\":\"幻灯片演示\",\"t\":[\"一个简单的幻灯片演示与各种小贴士。\",\"作者 Mr.Hope. 请滚动鼠标滚轮进入下一页\"]},\"4\":{\"h\":\"标注幻灯片\",\"t\":[\"👇\",\"--\"]},\"5\":{\"h\":\"标注幻灯片\",\"t\":[\"使用 --- 标注水平幻灯片\",\"在水平幻灯片中使用 -- 分割垂直幻灯片\",\"使用 <!-- .slide: ... --> 在幻灯片上添加属性\",\"使用 <!-- .element: ... --> 在前一个 HTML 元素上添加属性\"]},\"6\":{\"h\":\"Markdown\",\"t\":[\"你可以在幻灯片中使用 Markdown 语法的各种标记.\",\"--\"]},\"7\":{\"h\":\"Markdown\",\"t\":[\"你可以在幻灯片中使用 Markdown 语法的各种标记.\"]},\"8\":{\"h\":\"这是一个 H3\",\"t\":[\"标题默认会自动转换为大写。\",\"这是一个有着 粗体, 斜体, 删除线 文字并包含 一个链接 的段落，并且它会自动换行。所以你无需担心它的长度。\",\"--\"]},\"9\":{\"h\":\"Markdown\",\"t\":[\"你可以在幻灯片中使用 Markdown 语法的各种标记.\",\"列表默认为 inline-block\",\"项目\",\"项目\",\"项目\",\"项目 1\",\"项目 2\",\"项目 3\",\"--\"]},\"10\":{\"h\":\"Markdown\",\"t\":[\"你可以在幻灯片中使用 Markdown 语法的各种标记.\",\"在你启用 highlight 插件后，代码块会自动高亮。\",\"const a = 1; \",\"--\"]},\"11\":{\"h\":\"Markdown\",\"t\":[\"你可以在幻灯片中使用 Markdown 语法的各种标记.\",\"在你启用 math 插件后，你也可以使用 TEX 格式使用数学公式。\",\"$$ J(\\\\theta_0,\\\\theta_1) = \\\\sum_{i=0} $$\",\"--\"]},\"12\":{\"h\":\"Markdown\",\"t\":[\"你可以在幻灯片中使用 Markdown 语法的各种标记.\",\"⚠请注意: 表格和分割线，以及所有不在 Markdown 标准语法中的内容均不受支持。\"]},\"13\":{\"h\":\"布局\",\"t\":[\"--\"]},\"14\":{\"h\":\"布局\",\"t\":[\"👆 r-fit-text class 会让文字在不超出幻灯片范围的情况下尽可能大。\",\"--\"]},\"15\":{\"h\":\"布局\",\"t\":[\"Logo\",\"👆 r-stretch class 帮助你控制注入图片或视频的大小，使它们填充满幻灯片垂直方向上的剩余空间。\",\"--\"]},\"16\":{\"h\":\"布局\"},\"17\":{\"h\":\"背景\",\"t\":[\"你可以通过向特定幻灯片添加 data-background 属性自定义幻灯片背景.\"]},\"18\":{\"h\":\"动画片段\",\"t\":[\"--\"]},\"19\":{\"h\":\"动画片段\",\"t\":[\"动画片段用于高亮或显隐幻灯片中的元素。\",\"你需要在元素上添加 fragment 和动画 class。\",\"--\"]},\"20\":{\"h\":\"动画片段\"},\"21\":{\"h\":\"动画 class\",\"t\":[\"fade-in\",\"fade-out\",\"fade-up\",\"fade-down\",\"fade-left\",\"fade-right\",\"fade-in-then-out\",\"fade-in-then-semi-out\",\"--\"]},\"22\":{\"h\":\"动画片段\"},\"23\":{\"h\":\"动画 class\",\"t\":[\"grow\",\"shrink\",\"strike\",\"highlight-red\",\"highlight-green\",\"highlight-blue\",\"highlight-current-red\",\"highlight-current-green\",\"highlight-current-blue\",\"--\"]},\"24\":{\"h\":\"动画片段\"},\"25\":{\"h\":\"多个动画片段\",\"t\":[\"你可以按照顺序包裹一个 HTML 元素使其拥有多个动画片段 渐入 > 变红 > 渐出 \",\"--\"]},\"26\":{\"h\":\"动画片段\"},\"27\":{\"h\":\"顺序\",\"t\":[\"你可以使用 data-fragment-index 属性改变元素的动画顺序。\",\"不同元素可以有相同的动画顺序。\",\"最后显示\",\"第二个显示\",\"第一个显示\",\"第二个显示\"]},\"28\":{\"h\":\"渐变\",\"t\":[\"--\"]},\"29\":{\"h\":\"渐变\",\"t\":[\"Transition 可以通过配置中的 transition 选项全局设置，也可以通过在特定幻灯片添加 data-transition 属性局部设置.\",\"可能的值:\",\"none\",\"fade\",\"slide\",\"convex\",\"concave\",\"zoom\",\"--\"]},\"30\":{\"h\":\"渐变\"},\"31\":{\"h\":\"过渡动画\",\"t\":[\"你可以在相邻的幻灯片上添加 data-auto-animate 使相同的 HTML 元素产生过渡动画效果。\"]},\"32\":{\"h\":\"功能\",\"t\":[\"--\"]},\"33\":{\"h\":\"功能\"},\"34\":{\"h\":\"代码\",\"t\":[\"通过启用 highlight 插件，你可以对代码块进行高亮。\",\"你可以使用 [a-b|c-d] 语法来分布高亮特定行。\",\"let a = 1; let b = 2; let c = (x) => 1 + 2 + x; c(3); \",\"--\"]},\"35\":{\"h\":\"功能\"},\"36\":{\"h\":\"预览模式\",\"t\":[\"按下 Esc 或 O 即可在幻灯片获得焦点时进入预览模式。\",\"--\"]},\"37\":{\"h\":\"功能\"},\"38\":{\"h\":\"全屏模式\",\"t\":[\"按下 F 或 F11 即可在幻灯片获得焦点时进入全屏模式。\",\"--\"]},\"39\":{\"h\":\"功能\"},\"40\":{\"h\":\"缩放\",\"t\":[\"按下 alt (Linux 上使用 ctrl) 的同时点击幻灯片的任何元素，即可以向此元素进行放大。\",\"再次点击即可缩小。\"]},\"41\":{\"h\":\"结束\",\"t\":[\"@slideend\"]},\"42\":{\"h\":\"使用vuePress搭建博客并部署到gitpages上\",\"t\":[\"这里使用的是theme-hope主题，项目环境、构建、本地运行指令可参考下面这个链接。\"]},\"43\":{\"h\":\"项目构建\",\"t\":[\"参考链接 小白教程\"]},\"44\":{\"h\":\"部署到gitpages\",\"t\":[\"若参考上面项目构建链接，此时本地git仓库已初始化\",\"1.创建本地分支\",\"查看本地分支\",\"git branch \",\"创建本地分支\",\"git checkout -b master \",\"2.连接远程分支\",\"添加远程仓库的引用\",\"git remote add origin https://github.com/yourusername/myrepo.git \",\"3.提交本地分支到远程分支\",\"git push origin <local_branch>:<remote_branch> \"]},\"45\":{\"c\":[\"使用指南\"]},\"46\":{\"c\":[\"VuePress\",\"使用指南\"]},\"47\":{\"h\":\"Blog\"}},\"dirtCount\":0,\"index\":[[\"vuepress\",{\"2\":{\"46\":1}}],[\"push\",{\"1\":{\"44\":1}}],[\"提交本地分支到远程分支\",{\"1\":{\"44\":1}}],[\"yourusername\",{\"1\":{\"44\":1}}],[\"添加远程仓库的引用\",{\"1\":{\"44\":1}}],[\"连接远程分支\",{\"1\":{\"44\":1}}],[\"github\",{\"1\":{\"44\":1}}],[\"git\",{\"1\":{\"44\":5}}],[\"green\",{\"1\":{\"23\":2}}],[\"grow\",{\"1\":{\"23\":1}}],[\"查看本地分支\",{\"1\":{\"44\":1}}],[\"创建本地分支\",{\"1\":{\"44\":2}}],[\"此时本地git仓库已初始化\",{\"1\":{\"44\":1}}],[\"若参考上面项目构建链接\",{\"1\":{\"44\":1}}],[\"部署到gitpages\",{\"0\":{\"44\":1}}],[\"小白教程\",{\"1\":{\"43\":1}}],[\"参考链接\",{\"1\":{\"43\":1}}],[\"本地运行指令可参考下面这个链接\",{\"1\":{\"42\":1}}],[\"构建\",{\"1\":{\"42\":1}}],[\"这里使用的是theme\",{\"1\":{\"42\":1}}],[\"这是一个有着\",{\"1\":{\"8\":1}}],[\"这是一个\",{\"0\":{\"8\":1}}],[\"结束\",{\"0\":{\"41\":1}}],[\"再次点击即可缩小\",{\"1\":{\"40\":1}}],[\"即可以向此元素进行放大\",{\"1\":{\"40\":1}}],[\"即可在幻灯片获得焦点时进入全屏模式\",{\"1\":{\"38\":1}}],[\"即可在幻灯片获得焦点时进入预览模式\",{\"1\":{\"36\":1}}],[\"的同时点击幻灯片的任何元素\",{\"1\":{\"40\":1}}],[\"的段落\",{\"1\":{\"8\":1}}],[\"上使用\",{\"1\":{\"40\":1}}],[\"缩放\",{\"0\":{\"40\":1}}],[\"全屏模式\",{\"0\":{\"38\":1}}],[\"origin\",{\"1\":{\"44\":2}}],[\"o\",{\"1\":{\"36\":1}}],[\"out\",{\"1\":{\"21\":3}}],[\"或\",{\"1\":{\"36\":1,\"38\":1}}],[\"esc\",{\"1\":{\"36\":1}}],[\"element\",{\"1\":{\"5\":1}}],[\"按下\",{\"1\":{\"36\":1,\"38\":1,\"40\":1}}],[\"预览模式\",{\"0\":{\"36\":1}}],[\"+\",{\"1\":{\"34\":2}}],[\"x\",{\"1\":{\"34\":2}}],[\"语法来分布高亮特定行\",{\"1\":{\"34\":1}}],[\"语法的各种标记\",{\"1\":{\"6\":1,\"7\":1,\"9\":1,\"10\":1,\"11\":1,\"12\":1}}],[\"插件\",{\"1\":{\"34\":1}}],[\"插件后\",{\"1\":{\"10\":1,\"11\":1}}],[\"通过启用\",{\"1\":{\"34\":1}}],[\"代码\",{\"0\":{\"34\":1}}],[\"代码块会自动高亮\",{\"1\":{\"10\":1}}],[\"功能\",{\"0\":{\"32\":1,\"33\":1,\"35\":1,\"37\":1,\"39\":1}}],[\"过渡动画\",{\"0\":{\"31\":1}}],[\"zoom\",{\"1\":{\"29\":1}}],[\"none\",{\"1\":{\"29\":1}}],[\"可能的值\",{\"1\":{\"29\":1}}],[\"可以通过配置中的\",{\"1\":{\"29\":1}}],[\"也可以通过在特定幻灯片添加\",{\"1\":{\"29\":1}}],[\"选项全局设置\",{\"1\":{\"29\":1}}],[\"第一个显示\",{\"1\":{\"27\":1}}],[\"第二个显示\",{\"1\":{\"27\":2}}],[\"最后显示\",{\"1\":{\"27\":1}}],[\"不同元素可以有相同的动画顺序\",{\"1\":{\"27\":1}}],[\"属性局部设置\",{\"1\":{\"29\":1}}],[\"属性改变元素的动画顺序\",{\"1\":{\"27\":1}}],[\"属性自定义幻灯片背景\",{\"1\":{\"17\":1}}],[\"顺序\",{\"0\":{\"27\":1}}],[\"渐变\",{\"0\":{\"28\":1,\"29\":1,\"30\":1}}],[\"渐出\",{\"1\":{\"25\":1}}],[\"渐入\",{\"1\":{\"25\":1}}],[\"变红\",{\"1\":{\"25\":1}}],[\"元素产生过渡动画效果\",{\"1\":{\"31\":1}}],[\"元素使其拥有多个动画片段\",{\"1\":{\"25\":1}}],[\"元素上添加属性\",{\"1\":{\"5\":1}}],[\"多个动画片段\",{\"0\":{\"25\":1}}],[\"linux\",{\"1\":{\"40\":1}}],[\"let\",{\"1\":{\"34\":3}}],[\"left\",{\"1\":{\"21\":1}}],[\"logo\",{\"1\":{\"15\":1}}],[\"d\",{\"1\":{\"34\":1}}],[\"down\",{\"1\":{\"21\":1}}],[\"data\",{\"1\":{\"17\":1,\"27\":1,\"29\":1,\"31\":1}}],[\"up\",{\"1\":{\"21\":1}}],[\"动画\",{\"0\":{\"21\":1,\"23\":1}}],[\"动画片段用于高亮或显隐幻灯片中的元素\",{\"1\":{\"19\":1}}],[\"动画片段\",{\"0\":{\"18\":1,\"19\":1,\"20\":1,\"22\":1,\"24\":1,\"26\":1}}],[\"和动画\",{\"1\":{\"19\":1}}],[\"f11\",{\"1\":{\"38\":1}}],[\"f\",{\"1\":{\"38\":1}}],[\"fade\",{\"1\":{\"21\":8,\"29\":1}}],[\"fragment\",{\"1\":{\"19\":1,\"27\":1}}],[\"fit\",{\"1\":{\"14\":1}}],[\"branch>\",{\"1\":{\"44\":2}}],[\"branch\",{\"1\":{\"44\":1}}],[\"b\",{\"1\":{\"34\":1,\"44\":1}}],[\"b|c\",{\"1\":{\"34\":1}}],[\"blog\",{\"0\":{\"47\":1}}],[\"block\",{\"1\":{\"9\":1}}],[\"blue\",{\"1\":{\"23\":2}}],[\"background\",{\"1\":{\"17\":1}}],[\"背景\",{\"0\":{\"17\":1}}],[\"使相同的\",{\"1\":{\"31\":1}}],[\"使它们填充满幻灯片垂直方向上的剩余空间\",{\"1\":{\"15\":1}}],[\"使用指南\",{\"2\":{\"45\":1,\"46\":1}}],[\"使用vuepress搭建博客并部署到gitpages上\",{\"0\":{\"42\":1}}],[\"使用\",{\"1\":{\"5\":3}}],[\"帮助你控制注入图片或视频的大小\",{\"1\":{\"15\":1}}],[\"会让文字在不超出幻灯片范围的情况下尽可能大\",{\"1\":{\"14\":1}}],[\"com\",{\"1\":{\"44\":1}}],[\"concave\",{\"1\":{\"29\":1}}],[\"convex\",{\"1\":{\"29\":1}}],[\"const\",{\"1\":{\"10\":1}}],[\"checkout\",{\"1\":{\"44\":1}}],[\"ctrl\",{\"1\":{\"40\":1}}],[\"c\",{\"1\":{\"34\":2}}],[\"current\",{\"1\":{\"23\":3}}],[\"class\",{\"0\":{\"21\":1,\"23\":1},\"1\":{\"14\":1,\"15\":1,\"19\":1}}],[\"remote\",{\"1\":{\"44\":1}}],[\"red\",{\"1\":{\"23\":2}}],[\"right\",{\"1\":{\"21\":1}}],[\"r\",{\"1\":{\"14\":1,\"15\":1}}],[\"👆\",{\"1\":{\"14\":1,\"15\":1}}],[\"👇\",{\"1\":{\"4\":1}}],[\"布局\",{\"0\":{\"13\":1,\"14\":1,\"15\":1,\"16\":1}}],[\"以及所有不在\",{\"1\":{\"12\":1}}],[\"表格和分割线\",{\"1\":{\"12\":1}}],[\"⚠请注意\",{\"1\":{\"12\":1}}],[\"index\",{\"1\":{\"27\":1}}],[\"in\",{\"1\":{\"21\":3}}],[\"inline\",{\"1\":{\"9\":1}}],[\"i=0\",{\"1\":{\"11\":1}}],[\"strike\",{\"1\":{\"23\":1}}],[\"stretch\",{\"1\":{\"15\":1}}],[\"shrink\",{\"1\":{\"23\":1}}],[\"semi\",{\"1\":{\"21\":1}}],[\"sum\",{\"1\":{\"11\":1}}],[\"slideend\",{\"1\":{\"41\":1}}],[\"slide\",{\"1\":{\"5\":1,\"29\":1}}],[\"slidestart\",{\"1\":{\"2\":1}}],[\"0\",{\"1\":{\"11\":1}}],[\"transition\",{\"1\":{\"29\":3}}],[\"then\",{\"1\":{\"21\":2}}],[\"theta\",{\"1\":{\"11\":2}}],[\"text\",{\"1\":{\"14\":1}}],[\"tex\",{\"1\":{\"11\":1}}],[\"j\",{\"1\":{\"11\":1}}],[\"$$\",{\"1\":{\"11\":2}}],[\"格式使用数学公式\",{\"1\":{\"11\":1}}],[\"你需要在元素上添加\",{\"1\":{\"19\":1}}],[\"你可以对代码块进行高亮\",{\"1\":{\"34\":1}}],[\"你可以在相邻的幻灯片上添加\",{\"1\":{\"31\":1}}],[\"你可以在幻灯片中使用\",{\"1\":{\"6\":1,\"7\":1,\"9\":1,\"10\":1,\"11\":1,\"12\":1}}],[\"你可以使用\",{\"1\":{\"27\":1,\"34\":1}}],[\"你可以按照顺序包裹一个\",{\"1\":{\"25\":1}}],[\"你可以通过向特定幻灯片添加\",{\"1\":{\"17\":1}}],[\"你也可以使用\",{\"1\":{\"11\":1}}],[\"=>\",{\"1\":{\"34\":1}}],[\"=\",{\"1\":{\"10\":1,\"11\":1,\"34\":3}}],[\"add\",{\"1\":{\"44\":1}}],[\"alt\",{\"1\":{\"40\":1}}],[\"animate\",{\"1\":{\"31\":1}}],[\"auto\",{\"1\":{\"31\":1}}],[\"a\",{\"1\":{\"10\":1,\"34\":2}}],[\"3\",{\"1\":{\"9\":1,\"34\":1,\"44\":1}}],[\"2\",{\"1\":{\"9\":1,\"34\":2,\"44\":1}}],[\"1\",{\"1\":{\"9\":1,\"10\":1,\"11\":1,\"34\":2,\"44\":1}}],[\"项目构建\",{\"0\":{\"43\":1}}],[\"项目环境\",{\"1\":{\"42\":1}}],[\"项目\",{\"1\":{\"9\":6}}],[\"列表默认为\",{\"1\":{\"9\":1}}],[\"所以你无需担心它的长度\",{\"1\":{\"8\":1}}],[\"并且它会自动换行\",{\"1\":{\"8\":1}}],[\"一个链接\",{\"1\":{\"8\":1}}],[\"一个简单的幻灯片演示与各种小贴士\",{\"1\":{\"3\":1}}],[\"文字并包含\",{\"1\":{\"8\":1}}],[\"删除线\",{\"1\":{\"8\":1}}],[\"斜体\",{\"1\":{\"8\":1}}],[\"粗体\",{\"1\":{\"8\":1}}],[\"标准语法中的内容均不受支持\",{\"1\":{\"12\":1}}],[\"标题默认会自动转换为大写\",{\"1\":{\"8\":1}}],[\"标注水平幻灯片\",{\"1\":{\"5\":1}}],[\"标注幻灯片\",{\"0\":{\"4\":1,\"5\":1}}],[\"myrepo\",{\"1\":{\"44\":1}}],[\"master\",{\"1\":{\"44\":1}}],[\"math\",{\"1\":{\"11\":1}}],[\"markdown\",{\"0\":{\"6\":1,\"7\":1,\"9\":1,\"10\":1,\"11\":1,\"12\":1},\"1\":{\"6\":1,\"7\":1,\"9\":1,\"10\":1,\"11\":1,\"12\":2}}],[\"mr\",{\"1\":{\"3\":1}}],[\"https\",{\"1\":{\"44\":1}}],[\"html\",{\"1\":{\"5\":1,\"25\":1,\"31\":1}}],[\"highlight\",{\"1\":{\"10\":1,\"23\":6,\"34\":1}}],[\"h3\",{\"0\":{\"8\":1}}],[\"hope主题\",{\"1\":{\"42\":1}}],[\"hope\",{\"1\":{\"3\":1}}],[\"在你启用\",{\"1\":{\"10\":1,\"11\":1}}],[\"在前一个\",{\"1\":{\"5\":1}}],[\"在幻灯片上添加属性\",{\"1\":{\"5\":1}}],[\"在水平幻灯片中使用\",{\"1\":{\"5\":1}}],[\">\",{\"1\":{\"5\":2,\"25\":2}}],[\"<remote\",{\"1\":{\"44\":1}}],[\"<local\",{\"1\":{\"44\":1}}],[\"<\",{\"1\":{\"5\":2}}],[\"分割垂直幻灯片\",{\"1\":{\"5\":1}}],[\"请滚动鼠标滚轮进入下一页\",{\"1\":{\"3\":1}}],[\"作者\",{\"1\":{\"3\":1}}],[\"幻灯片演示\",{\"0\":{\"3\":1}}],[\"幻灯片页\",{\"0\":{\"2\":1}}],[\"将你的个人介绍和档案放置在此处\",{\"1\":{\"1\":1}}],[\"介绍页\",{\"0\":{\"1\":1}}],[\"主页\",{\"0\":{\"0\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(st(t,v[s],n)):e==="search"?self.postMessage(et(t,v[s],n)):self.postMessage({suggestions:st(t,v[s],n),results:et(t,v[s],n)})};
//# sourceMappingURL=index.js.map
