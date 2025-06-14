import { ref, computed, watch, onMounted } from 'vue'

// ================== 类型定义 ==================

/**
 * 查询参数类型：表单数据 + 分页信息
 */
type QueryParams<T> = Record<string, any> & {
  page: number
  pageSize: number
} & T

/**
 * 分页响应结果（支持泛型）
 */
interface PaginationResult<T = any> {
  total: number
  list: T[]
}

/**
 * 配置选项
 */
interface UseFormOptions {
  defaultPageSize?: number // 默认每页数量
  autoLoad?: boolean // 初始化是否自动加载
  autoQueryOnFieldChange?: boolean // 表单字段变化是否自动查询
}

// ================== Hooks 实现 ==================

/**
 * 通用表单 + 分页 + 查询 hooks
 * @param initialValues 表单初始值
 * @param queryFn 自定义查询函数
 * @param options 配置项
 */
export function useForm<T extends Record<string, any>, D = any>(
  initialValues: T,
  queryFn: (params: QueryParams<T>) => Promise<PaginationResult<D>>,
  options: UseFormOptions = {},
) {
  const { defaultPageSize = 10, autoLoad = false, autoQueryOnFieldChange = false } = options
  console.log('options', options)

  // ------------------ 状态管理 ------------------

  // 表单数据
  const formData = ref<T>({ ...initialValues })

  // 分页数据
  const currentPage = ref(1)
  const pageSize = ref(defaultPageSize)
  const total = ref(0)

  // 列表数据
  const list = ref<D[]>([])

  // 加载状态
  const loading = ref(false)

  // 错误状态（可选）
  const error = ref<Error | null>(null)

  // ------------------ 计算属性 ------------------

  // 查询参数
  const queryParams = computed(
    () =>
      ({
        ...formData.value,
        page: currentPage.value,
        pageSize: pageSize.value,
      }) as QueryParams<T>,
  )

  // ------------------ 核心方法 ------------------

  // 执行查询
  const executeQuery = async () => {
    if (!queryFn) return

    try {
      loading.value = true
      error.value = null
      const result = await queryFn(queryParams.value)
      total.value = result.total
      list.value = result.list // ✅ 更新列表数据
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error')
    } finally {
      loading.value = false
    }
  }

  // 触发查询
  const handleQuery = async () => {
    await executeQuery()
  }

  // 切换页码
  const handlePageChange = async (page: number) => {
    currentPage.value = page
    await executeQuery()
  }

  // 切换每页大小
  const handlePageSizeChange = async (size: number) => {
    pageSize.value = size
    currentPage.value = 1
    await executeQuery()
  }

  // 重置表单并查询
  const resetForm = async () => {
    formData.value = { ...initialValues }
    currentPage.value = 1
    pageSize.value = defaultPageSize
    await executeQuery()
  }

  // ------------------ 副作用逻辑 ------------------

  // 自动查询 - 表单字段变化
  if (autoQueryOnFieldChange) {
    watch(
      () => formData.value,
      async () => {
        if (currentPage.value !== 1) {
          currentPage.value = 1
        }
        await executeQuery()
      },
      { deep: true },
    )
  }

  // 初始化加载
  onMounted(async () => {
    if (autoLoad) {
      await executeQuery()
    }
  })

  // ------------------ 返回值结构 ------------------

  return {
    // 表单相关
    formData,

    // 列表数据
    list, // ✅ 暴露 list 数据

    // 分页相关
    pagination: {
      currentPage,
      pageSize,
      total,
      handlePageChange,
      handlePageSizeChange,
    },

    // 操作方法
    actions: {
      handleQuery,
      resetForm,
    },

    // 状态
    loading,
    error,
  }
}