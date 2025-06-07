import * as echarts from 'echarts';
import { markRaw, onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';

export function useChart(chartRef: Ref<HTMLElement | null>, setChartData: any) {
  const chartInstance = ref<echarts.ECharts | null>(null);

  const initChart = async () => {
    if (chartRef.value) {
        const option = await setChartData(); 
        chartInstance.value = markRaw(echarts.init(chartRef.value));
        chartInstance.value.setOption(option.value);
    }
  }
  
  const resize = () => {
    chartInstance.value?.resize();
  }

  onMounted(() => {
    initChart();
    window.addEventListener('resize', resize);
  });

  onUnmounted(() => {
    chartInstance.value?.dispose(); 
    window.removeEventListener('resize', resize);
  })

}