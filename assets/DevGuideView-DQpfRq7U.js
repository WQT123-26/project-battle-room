import{Jt as e,Kt as t,U as n,V as r,Yt as i,a,d as o,f as s,h as c,m as l,pt as u,t as d,v as f,y as p}from"./_plugin-vue_export-helper-CXDp2KR3.js";import{d as m}from"./runtime-dom.esm-bundler-B4cRQRjO.js";var h={class:`dg-root`},g={class:`dg-top`},_={class:`dg-top-r`},v={class:`dg-prog`},y={class:`dg-prog-text`},b={class:`dg-steps`},x=[`onClick`],S={class:`dg-step-num`},C={class:`dg-step-label`},w={class:`dg-content`},T={key:0,class:`dg-step`},E={key:1,class:`dg-step`},D={key:2,class:`dg-step`},O={class:`dg-code`},k={key:3,class:`dg-step`},A={class:`dg-comp-table`},j={class:`dg-comp-name`},M={class:`dg-comp-api`},N={key:4,class:`dg-step`},P={key:5,class:`dg-step`},F={key:6,class:`dg-step`},I={key:7,class:`dg-step`},L={key:8,class:`dg-step`},R={class:`dg-nav`},z=d({__name:`DevGuideView`,setup(d){let z=u([{title:`项目结构`,done:!1},{title:`创建引擎`,done:!1},{title:`创建视图`,done:!1},{title:`引入组件`,done:!1},{title:`EChart主题`,done:!1},{title:`注册路由`,done:!1},{title:`加入白名单`,done:!1},{title:`构建验证`,done:!1},{title:`冒烟测试`,done:!1}]),B=u(0),V=u(!1),H=o(()=>z.value.filter(e=>e.done).length),U=o(()=>Math.round(H.value/9*100));function W(e){z.value[e].done=!0}function G(){z.value[B.value].done=!0,B.value<8&&B.value++}function K(){V.value=!0}let q=[{name:`SimKpis`,use:`KPI 卡片行`,api:`:items="[{k,v,d,c}]"`},{name:`EChart`,use:`一切图表`,api:`:option :height`},{name:`TicketTable`,use:`数据表格`,api:`:rows :cols #cell-{key}`},{name:`DraggablePanel`,use:`浮动面板`,api:`v-model panel-id`},{name:`MovieBar`,use:`回放控制条`,api:`:total v-model:idx`},{name:`Pager`,use:`独立分页`,api:`:total :page @go`},{name:`StarsRating`,use:`星级评分`,api:`v-model mode`},{name:`ImageLightbox`,use:`图片灯箱`,api:`:urls v-model:open`},{name:`PageHeatBar`,use:`TopN 横条`,api:`:items @click`},{name:`ExcelImporter`,use:`Excel导入`,api:`@imported`}];return(o,u)=>(r(),c(`div`,h,[s(`div`,g,[u[5]||=s(`div`,null,[s(`h1`,null,`📚 Vue3 页面开发实战指南`),s(`p`,{class:`dg-sub`},`从 0 到 1 · 9 步完成一个专业 Vue3 页面 · 每步含可复制代码 + 常见坑`)],-1),s(`div`,_,[s(`div`,v,[s(`div`,{class:`dg-prog-bar`,style:e({width:U.value+`%`})},null,4)]),s(`span`,y,i(H.value)+`/9`,1)])]),s(`div`,b,[(r(!0),c(a,null,n(z.value,(e,n)=>(r(),c(`button`,{key:n,class:t([`dg-step-btn`,{done:e.done,active:B.value===n}]),onClick:e=>B.value=n},[s(`span`,S,i(e.done?`✓`:n+1),1),s(`span`,C,i(e.title),1)],10,x))),128))]),s(`div`,w,[B.value===0?(r(),c(`div`,T,[...u[6]||=[f(`<h2 data-v-42ea7066>1️⃣ 了解项目结构</h2><p class="dg-desc" data-v-42ea7066>项目基于 Vue3 + Pinia + vue-router(hash) + Element Plus。核心目录分工明确：</p><div class="dg-tree" data-v-42ea7066><div class="dg-tree-line" data-v-42ea7066><span class="dg-folder" data-v-42ea7066>src/</span></div><div class="dg-tree-line dg-indent1" data-v-42ea7066><span class="dg-folder" data-v-42ea7066>sim/</span> <span class="dg-cmt" data-v-42ea7066>纯 JS 引擎（零 Vue 依赖）</span></div><div class="dg-tree-line dg-indent1" data-v-42ea7066><span class="dg-folder" data-v-42ea7066>views/</span> <span class="dg-cmt" data-v-42ea7066>页面视图（template + script + scoped style）</span></div><div class="dg-tree-line dg-indent1" data-v-42ea7066><span class="dg-folder" data-v-42ea7066>components/</span> <span class="dg-cmt" data-v-42ea7066>公共组件（EChart / SimKpis / TicketTable 等）</span></div><div class="dg-tree-line dg-indent1" data-v-42ea7066><span class="dg-folder" data-v-42ea7066>stores/</span> <span class="dg-cmt" data-v-42ea7066>Pinia store（useUISettingsStore 管主题）</span></div><div class="dg-tree-line dg-indent1" data-v-42ea7066><span class="dg-folder" data-v-42ea7066>router/</span> <span class="dg-cmt" data-v-42ea7066>路由配置 index.js</span></div><div class="dg-tree-line dg-indent1" data-v-42ea7066><span class="dg-file" data-v-42ea7066>App.vue</span> <span class="dg-cmt" data-v-42ea7066>根组件 + 主题变量定义</span></div></div><div class="dg-tip" data-v-42ea7066><span class="dg-tip-ic" data-v-42ea7066>💡</span><span data-v-42ea7066><b data-v-42ea7066>铁律</b>：引擎（sim/）不能 import Vue 或操作 DOM；视图（views/）只做渲染和交互转发。这样引擎可被 node 直接 import 冒烟测试。</span></div>`,4)]])):l(``,!0),B.value===1?(r(),c(`div`,E,[...u[7]||=[f(`<h2 data-v-42ea7066>2️⃣ 创建引擎文件</h2><p class="dg-desc" data-v-42ea7066>在 <code data-v-42ea7066>src/sim/</code> 下新建 <code data-v-42ea7066>xxxEngine.js</code>，包含状态结构、CRUD、持久化、统计算法。</p><div class="dg-code" data-v-42ea7066><pre data-v-42ea7066><code data-v-42ea7066>// src/sim/myEngine.js

// ① localStorage key（独立隔离）
export const MY_KEY = &#39;my_vue_v1&#39;

// ② 状态工厂（含示例数据）
export function defaultState() {
  return {
    items: [
      { id: &#39;T001&#39;, name: &#39;示例任务&#39;, status: &#39;待处理&#39;, created: &#39;2026-03-01&#39; }
    ],
    config: { categories: [&#39;技术&#39;, &#39;商务&#39;] }
  }
}

// ③ CRUD 函数（全部显式接收 state 参数）
export function saveItem(state, item) {
  state.items.push(item)
  return item
}

export function removeItem(state, id) {
  const i = state.items.findIndex(x =&gt; x.id === id)
  if (i &gt;= 0) state.items.splice(i, 1)
}

// ④ 统计/筛选算法
export function filterItems(state, keyword) {
  return state.items.filter(x =&gt; x.name.includes(keyword))
}

// ⑤ 持久化
export function serialize(state) { return JSON.stringify(state) }
export function restoreInto(raw) {
  try { return JSON.parse(raw) || defaultState() }
  catch { return defaultState() }
}
</code></pre></div><div class="dg-tip dg-tip-warn" data-v-42ea7066><span class="dg-tip-ic" data-v-42ea7066>⚠️</span><span data-v-42ea7066><b data-v-42ea7066>常见坑</b>：引擎函数漏传 state 参数 → 在视图层调用时才报错，难排查。所有函数必须 <code data-v-42ea7066>function fn(state, ...)</code> 显式接收。</span></div>`,4)]])):l(``,!0),B.value===2?(r(),c(`div`,D,[u[8]||=s(`h2`,null,`3️⃣ 创建视图文件`,-1),u[9]||=s(`p`,{class:`dg-desc`},[p(`在 `),s(`code`,null,`src/views/`),p(` 下新建 `),s(`code`,null,`MyView.vue`),p(`，使用 `),s(`code`,null,`<script setup>`),p(` + `),s(`code`,null,`reactive`),p(`。`)],-1),s(`div`,O,[s(`pre`,null,[s(`code`,null,`<template>
  <div class="my-root">
    <h1>我的页面</h1>
    <div v-for="item in state.items" :key="item.id" class="my-item">
      `+i(o.item.name)+` - `+i(o.item.status)+`
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { defaultState, restoreInto, serialize, MY_KEY } from '../sim/myEngine'

// ① 从 localStorage 恢复状态
const state = reactive(restoreInto(localStorage.getItem(MY_KEY)) || defaultState())

// ② 防抖持久化
let timer
watch(state, () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    try { localStorage.setItem(MY_KEY, serialize(state)) }
    catch(e) { console.warn('存储已满') }
  }, 300)
})
<\/script>

<style scoped>
.my-root {
  /* ③ 变量映射（跟随全局主题） */
  --card: var(--bg-card);
  --line: var(--border);
  --txt: var(--text-main);
  padding: 16px;
  color: var(--txt);
}
</style>
`,1)])]),u[10]||=s(`div`,{class:`dg-tip`},[s(`span`,{class:`dg-tip-ic`},`💡`),s(`span`,null,[s(`b`,null,`根类隔离`),p(`：根元素挂专属类（如 `),s(`code`,null,`.my-root`),p(`），所有 CSS 变量映射在 scoped style 内定义，防止样式互相污染。`)])],-1)])):l(``,!0),B.value===3?(r(),c(`div`,k,[u[12]||=s(`h2`,null,`4️⃣ 引入公共组件`,-1),u[13]||=s(`p`,{class:`dg-desc`},`项目已有 12 个公共组件，优先复用而非自造。`,-1),s(`div`,A,[u[11]||=s(`div`,{class:`dg-comp-h`},[s(`span`,null,`组件`),s(`span`,null,`用途`),s(`span`,null,`关键 API`)],-1),(r(),c(a,null,n(q,e=>s(`div`,{key:e.name,class:`dg-comp-r`},[s(`span`,j,i(e.name),1),s(`span`,null,i(e.use),1),s(`code`,M,i(e.api),1)])),64))]),u[14]||=s(`div`,{class:`dg-code`},[s(`pre`,null,[s(`code`,null,`// 引入示例
import SimKpis from '../components/sim/SimKpis.vue'
import EChart from '../components/EChart.vue'

// 使用
<SimKpis :items="[{k:'总数', v:'10', d:'条', c:'good'}]" />
<EChart :option="chartOpt" height="300px" />
`)])],-1),u[15]||=s(`div`,{class:`dg-tip dg-tip-warn`},[s(`span`,{class:`dg-tip-ic`},`⚠️`),s(`span`,null,[s(`b`,null,`禁止`),p(`直接 `),s(`code`,null,`import echarts`),p(`。必须用 `),s(`code`,null,`EChart.vue`),p(` 公共组件，否则主题切换不生效。`)])],-1)])):l(``,!0),B.value===4?(r(),c(`div`,N,[...u[16]||=[s(`h2`,null,`5️⃣ EChart 主题适配`,-1),s(`p`,{class:`dg-desc`},`EChart 是 canvas 渲染，不吃 CSS 变量。必须用 computed 响应式重建 option 颜色。`,-1),s(`div`,{class:`dg-code`},[s(`pre`,null,[s(`code`,null,`import { computed } from 'vue'
import { useUISettingsStore } from '../stores/useUISettingsStore'

const ui = useUISettingsStore()
const isDark = computed(() => ui.theme === 'dark')

// 颜色板随主题切换
const C = computed(() => isDark.value
  ? { brand: '#4080FF', success: '#3DD66F', danger: '#FF6B6B',
      text: '#E2E8F0', axis: '#334155', split: '#1E293B' }
  : { brand: '#165DFF', success: '#00B42A', danger: '#F53F3F',
      text: '#303133', axis: '#E4E7ED', split: '#F0F2F5' })

// option 引用 C.value，自动响应
const chartOpt = computed(() => ({
  xAxis: { axisLine: { lineStyle: { color: C.value.axis } } },
  yAxis: { splitLine: { lineStyle: { color: C.value.split } } },
  series: [{ data: [10, 20, 30], itemStyle: { color: C.value.brand } }]
}))
`)])],-1),s(`div`,{class:`dg-tip`},[s(`span`,{class:`dg-tip-ic`},`💡`),s(`span`,null,[s(`b`,null,`三板斧`),p(`：① 根元素映射 CSS 变量 → ② EChart 用 computed C 响应 → ③ Teleport 面板需自带变量映射（传不进去）。`)])],-1)]])):l(``,!0),B.value===5?(r(),c(`div`,P,[...u[17]||=[f(`<h2 data-v-42ea7066>6️⃣ 注册路由</h2><p class="dg-desc" data-v-42ea7066>在 <code data-v-42ea7066>src/router/index.js</code> 末尾追加路由配置：</p><div class="dg-code" data-v-42ea7066><pre data-v-42ea7066><code data-v-42ea7066>// src/router/index.js

  // 在 routes 数组末尾追加：
  {
    path: &#39;/my-page&#39;,
    name: &#39;myPage&#39;,
    component: () =&gt; import(&#39;../views/MyView.vue&#39;),
    meta: {
      title: &#39;我的页面&#39;,
      icon: &#39;📌&#39;,
      desc: &#39;页面功能描述&#39;
    }
  }
]  // ← routes 数组结束
</code></pre></div><div class="dg-tip dg-tip-warn" data-v-42ea7066><span class="dg-tip-ic" data-v-42ea7066>⚠️</span><span data-v-42ea7066><b data-v-42ea7066>路由 name 必须唯一</b>。如果 name 已被占用（如 <code data-v-42ea7066>cockpit</code>），新路由会覆盖旧路由，导致原页面丢失。</span></div>`,4)]])):l(``,!0),B.value===6?(r(),c(`div`,F,[...u[18]||=[f(`<h2 data-v-42ea7066>7️⃣ 加入侧边栏白名单</h2><p class="dg-desc" data-v-42ea7066>在 <code data-v-42ea7066>src/components/AppLayout.vue</code> 第 93 行 <code data-v-42ea7066>extraRoutes</code> 数组追加路由 name：</p><div class="dg-code" data-v-42ea7066><pre data-v-42ea7066><code data-v-42ea7066>// src/components/AppLayout.vue 第93行

const extraRoutes = computed(() =&gt;
  allRoutes.filter(r =&gt;
    [&#39;replay&#39;, &#39;trace&#39;, ...其他name..., &#39;myPage&#39;
    ].includes(r.name)
  )
)
</code></pre></div><div class="dg-tip dg-tip-warn" data-v-42ea7066><span class="dg-tip-ic" data-v-42ea7066>⚠️</span><span data-v-42ea7066><b data-v-42ea7066>两处必须同步</b>：路由文件加路由 + 白名单加 name，缺一不可。漏白名单 → 侧边栏不显示入口（但 <code data-v-42ea7066>#/my-page</code> 仍可直接访问）。</span></div>`,4)]])):l(``,!0),B.value===7?(r(),c(`div`,I,[...u[19]||=[f(`<h2 data-v-42ea7066>8️⃣ 构建验证</h2><p class="dg-desc" data-v-42ea7066>PowerShell 下执行 <code data-v-42ea7066>npm run build</code>：</p><div class="dg-code" data-v-42ea7066><pre data-v-42ea7066><code data-v-42ea7066># cwd = vue3 项目根目录
npm run build

# 成功标志
✓ built in 1.78s

# 噪声（可忽略）
NativeCommandError     ← 无害
chunk size &gt; 500KB     ← gzip 后通常 &lt; 500KB
</code></pre></div><div class="dg-tip dg-tip-warn" data-v-42ea7066><span class="dg-tip-ic" data-v-42ea7066>⚠️</span><span data-v-42ea7066><b data-v-42ea7066>常见构建错误</b>：① <code data-v-42ea7066>)</code> 写成 <code data-v-42ea7066>})</code> → JS 语法错误 ② 模板里 <code data-v-42ea7066>Math.round()</code> 某些版本不支持 ③ <code data-v-42ea7066>import reactive</code> 未使用不影响构建。看错误行号精确定位。</span></div>`,4)]])):l(``,!0),B.value===8?(r(),c(`div`,L,[...u[20]||=[f(`<h2 data-v-42ea7066>9️⃣ 引擎冒烟测试</h2><p class="dg-desc" data-v-42ea7066>用 node 直接 import 引擎，验证核心算法无需浏览器即可运行：</p><div class="dg-code" data-v-42ea7066><pre data-v-42ea7066><code data-v-42ea7066>// smoke_test.mjs
import { defaultState, saveItem, filterItems,
         serialize, restoreInto } from &#39;./src/sim/myEngine.js&#39;

// 1. 状态初始化
const s = defaultState()
console.log(&#39;初始数据:&#39;, s.items.length, &#39;条&#39;)

// 2. CRUD 往返
saveItem(s, { id: &#39;T002&#39;, name: &#39;新任务&#39;, status: &#39;待处理&#39; })
console.log(&#39;新增后:&#39;, s.items.length, &#39;条&#39;)

// 3. 筛选
const found = filterItems(s, &#39;新&#39;)
console.log(&#39;筛选结果:&#39;, found.length, &#39;条&#39;)

// 4. 序列化往返
const raw = serialize(s)
const s2 = restoreInto(raw)
console.log(&#39;往返一致:&#39;, s2.items.length === s.items.length)

// 运行: node smoke_test.mjs
</code></pre></div><div class="dg-tip" data-v-42ea7066><span class="dg-tip-ic" data-v-42ea7066>✅</span><span data-v-42ea7066><b data-v-42ea7066>全部通过后</b>：浏览器访问 <code data-v-42ea7066>http://localhost:5173/#/my-page</code> 或打包后访问 <code data-v-42ea7066>dist/index.html#/my-page</code>，确认页面渲染正常、交互无误、localStorage 数据独立。</span></div>`,4)]])):l(``,!0),s(`div`,R,[B.value>0?(r(),c(`button`,{key:0,class:`dg-nav-btn`,onClick:u[0]||=e=>B.value--},`← 上一步`)):l(``,!0),u[21]||=s(`div`,{class:`dg-nav-spacer`},null,-1),z.value[B.value].done?l(``,!0):(r(),c(`button`,{key:1,class:`dg-nav-btn dg-nav-mark`,onClick:u[1]||=e=>W(B.value)},`✓ 标记完成`)),B.value<8?(r(),c(`button`,{key:2,class:`dg-nav-btn dg-nav-next`,onClick:G},`下一步 →`)):l(``,!0),B.value===8&&H.value===9?(r(),c(`button`,{key:3,class:`dg-nav-btn dg-nav-finish`,onClick:K},`🎉 完成！`)):l(``,!0)])]),V.value?(r(),c(`div`,{key:0,class:`dg-finish-overlay`,onClick:u[4]||=e=>V.value=!1},[s(`div`,{class:`dg-finish-card`,onClick:u[3]||=m(()=>{},[`stop`])},[u[22]||=s(`div`,{class:`dg-finish-emoji`},`🎉`,-1),u[23]||=s(`h2`,null,`恭喜！9 步全部完成`,-1),u[24]||=s(`p`,null,`你现在可以从 0 开始创建一个专业 Vue3 页面了！`,-1),u[25]||=s(`p`,{class:`dg-finish-tip`},[p(`记忆口诀：`),s(`b`,null,`引擎→视图→路由→白名单→构建→冒烟`)],-1),s(`button`,{class:`dg-finish-btn`,onClick:u[2]||=e=>V.value=!1},`关闭`)])])):l(``,!0)]))}},[[`__scopeId`,`data-v-42ea7066`]]);export{z as default};