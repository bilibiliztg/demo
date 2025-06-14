<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { listMapPosition } from '@/api/map'
import icon from "../../assets/flashIcon.png";
import stationPic from "@/assets/station.jpg"
import { ref } from 'vue';

let map: any = null;
const positionList = ref([])

onMounted(() => {
  AMapLoader.load({
    key: "33a7e68177264e2e34c04ed6992e164d", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 5, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
      });

      //创建信息窗体
      const infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -30),
      })

      listMapPosition(null).then((res: any) => {
        positionList.value = res.data
        positionList.value.forEach((item: any) => {
          const marker = new AMap.Marker({
            position: item.position,
            offset: new AMap.Pixel(-10, -10),
            icon: icon, //添加 icon 图标 URL
            title: item.title,
          });
          map.add(marker);

          marker.on("click", () => {
            infoWindow.setContent(`
                        <div style="display:flex;padding:10px;align-items:center">
                            <div>
                                <img src="${stationPic}" width="200px"/>    
                            </div>
                            <div style="width:180px;line-height:30px;margin-left:20px">
                                <h3>${item.title}</h3>
                                <p>充电桩数量：${item.count}</p>   
                                <p>充电站状态：<span style="color:blue">${item.status == 1 ? "使用中" : "维护中"}</span></p>    
                            </div>
                        </div>

                    `)
            infoWindow.open(map, marker.getPosition())
          })
        })


      })
    })


})

onBeforeUnmount(() => {
  map?.destroy();
})

</script>

<style scoped lang="less">
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 85vh;
}
</style>