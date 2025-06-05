import { defineStore } from 'pinia';
import {login} from "@/api/loginApi"
import type {LoginParams} from "@/api/loginApi"
import type {MenuItem} from "@/types/user"

export const useUserStore=defineStore("user",{
    state:()=>({
        token: sessionStorage.getItem("token") || "",
        roles: JSON.parse(sessionStorage.getItem("roles") || "[]"),
        username: sessionStorage.getItem("username") || "",
        menu: JSON.parse(sessionStorage.getItem("menu") || "[]")
    }),
    actions:{
        async login(data:LoginParams){
            try {
                const {data:{token,user:{username,roles},menulist}} = await login(data);
                this.token=token;
                this.roles=roles;
                this.menu=menulist;
                // //既存到pinia中又存到本地存储中是因为第一pinia中数据是响应式第二存取速度要比本地存储快
                sessionStorage.setItem("token",token);
                sessionStorage.setItem("roles",JSON.stringify(roles))
                sessionStorage.setItem("username",username)
                sessionStorage.setItem("menu",JSON.stringify(menulist))
            } catch (error) {
                console.log("登录失败:", error);
            }
        },
        logout(){
           this.token="";
           this.roles=[];
           this.username="";
           this.menu=[];
           sessionStorage.clear();
        },
        //递归遍历菜单列表找到对应的菜单项
        getMenuByUrl(url:string,menuList:MenuItem[]): MenuItem | undefined {
            for(const item of menuList){
                if(item.url===url){
                    return item;
                }else if(item.children){
                    const result=this.getMenuByUrl(url,item.children);
                    if(result){
                        return result;
                    }
                }
            }
            
        }
    }

})