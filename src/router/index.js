import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

// router.beforeEach((to, from, next)=>{
//   console.log('路由变化：', to, from, next);

//   // 从detail页跳
//   if(from.name === 'detail' && to.name === 'home'){
//     const id = from.params.id;
//     const vt = document.startViewTransition(async ()=>{
//       next();
//       await new Promise((res, rej)=>{
//         setTimeout(()=>{
//           const dom = document.getElementById(id);
//           console.log('dom:', dom);
//           if(dom){
//             dom.style.viewTransitionName = 'pic';
//           }
//           res();
//         });
//       });

//       // const dom = document.getElementById(id);
//       // console.log('有dom吗：', dom);
//       // if(dom){
//       //   dom.style.viewTransitionName = 'pic';
//       // }
      
//     });
//     vt.finished.finally(()=>{
//       const dom = document.getElementById(id);
//       if(dom){
//         dom.style.viewTransitionName = '';
//       }
//     });

//   }else{
//     next();
//   }
// });

export default router
