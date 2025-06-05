import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/user'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabList:[] as MenuItem[],
    activeTab: "",
  }),
  actions: {
    addTab (tab:MenuItem) {
      if(!this.tabList.some(item=>item.url===tab.url)){
        this.tabList.push(tab)
      }
      this.activeTab = tab.url
    },
    removeTab (url:string) {
      if(this.activeTab === url){
        const index = this.tabList.findIndex(item=>item.url===url)
        this.activeTab = this.tabList[index-1]?.url || this.tabList[index+1]?.url || "" 
      }
      this.tabList = this.tabList.filter(item => item.url !== url) 
    }
  },
})
