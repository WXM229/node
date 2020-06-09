export default[
    {
        path:'/table',
        name:'table',
        // @符号 就代表了 /src这一级  node_modules 中的 item-vue 中的 base.js
        component:()=>import('@/views/list/list.vue')
    },
    {
        path:'/info',
        name:'info',
        component:()=>import('@/views/info/info.vue'),
        views:true
    }
]