import { ref, reactive } from 'vue';
import type { Ref } from 'vue';

/**
 * 适配 Element Plus 分页组件的 Hook
 * @param fetchData 获取数据的异步函数
 * @param initialPageSize 初始每页条数，默认为 10
 * @param initialQueryParams 初始查询参数，默认为空对象
 */
export function usePagination<T, Q extends Record<string, any> = Record<string, any>>(
  fetchData: (params: { pageNo: number; pageSize: number } & Q) => Promise<T>,
  initialPageSize: number = 10,
  initialQueryParams: Q = {} as Q
) {
  // 当前页码，初始为 1
  const currentPage = ref(1);
  // 每页条数，初始为传入的 initialPageSize
  const pageSize = ref(initialPageSize);
  // 总数据量，初始为 0
  const total = ref(0);
  // 加载状态，初始为 false
  const loading = ref(false);
  // 获取到的数据
  const data = ref<T | null>(null) as Ref<T>;
  // 使用 reactive 管理查询参数，方便响应式更新
  const queryParams = reactive<Q>({ ...initialQueryParams });

  /**
   * 获取数据
   */
  const loadData = async () => {
    loading.value = true;
    try {
      const params = {
        pageNo: currentPage.value,
        pageSize: pageSize.value,
        ...queryParams
      };
      const result = await fetchData(params);
      data.value = result;
      // 这里假设接口返回的数据中包含 total 字段，实际使用时根据接口调整
      // 如果接口返回的结构不同，需要修改获取 total 的逻辑
      // 例如：如果返回的是 { data: [], total: 100 }，可以这样写 total.value = result.total;
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      loading.value = false;
    }
  };

  /**
   * 页码改变时的回调
   * @param page 当前页码
   */
  const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    loadData();
  };

  /**
   * 每页条数改变时的回调
   * @param size 当前每页条数
   */
  const handleSizeChange = (size: number) => {
    pageSize.value = size;
    currentPage.value = 1; // 重置到第一页
    loadData();
  };

  /**
   * 更新查询参数并重新加载数据
   * @param newParams 新的查询参数
   */
  const updateQueryParams = (newParams: Partial<Q>) => {
    Object.assign(queryParams, newParams);
    currentPage.value = 1; // 重置到第一页
    loadData();
  };

  return {
    currentPage,
    pageSize,
    total,
    loading,
    data,
    queryParams,
    loadData,
    handleCurrentChange,
    handleSizeChange,
    updateQueryParams
  };
}