import router from './index'
import { useUserStore } from '@/stores/userStore'


router.beforeEach((to) => {
  const userStore = useUserStore()
  const isLogin = userStore.token
  // 用户未登录的情况
  if (!isLogin) {
    if (to.path !== '/login') {
      return { path: '/login' }
    }
  } else {
    // 用户已登录但尝试访问登录页面的情况
    if (to.path === '/login') {
      return { path: '/' } // 阻止导航,让他跳回首页
    }
    //权限控制
    if (to.meta?.needAuth && getIntersection(userStore.roles, to.meta.needAuth as string[]).length === 0) {
      return { path: '/forbidden' } // 阻止导航
    }
  }
})


function getIntersection<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter(item => set.has(item));
}
