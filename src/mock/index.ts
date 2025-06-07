import Mock from 'mockjs'
Mock.setup({
  timeout: '200-600', // 设置延迟时间
})
//管理员权限菜单
const adminMenuList = [
  {
    name: '数据看板',
    url: '/dashboard',
    icon: 'DataLine',
  },
  {
    name: '充电站管理',
    url: '/chargingstation',
    icon: 'Lightning',
    children: [
      {
        name: '充电站监控',
        url: '/chargingstation/monitor',
        icon: 'VideoCamera',
      },
      {
        name: '营收统计',
        url: '/chargingstation/revenue',
        icon: 'DataAnalysis',
      },
      {
        name: '充电桩管理',
        url: '/chargingstation/fault',
        icon: 'Warning',
      },
    ],
  },
  {
    name: '电子地图',
    url: '/map',
    icon: 'MapLocation',
  },
  {
    name: '运营管理',
    url: '/operations',
    icon: 'Files',
    children: [
      {
        name: '订单管理',
        url: '/operations/orders',
        icon: 'DocumentCopy',
      },
      {
        name: '订单详情',
        url: '/operations/detail',
        icon: 'Share',
      },
      {
        name: '计费管理',
        url: '/operations/total',
        icon: 'Money',
      },
    ],
  },
  {
    name: '报警管理',
    url: '/alarm',
    icon: 'Phone',
  },
  {
    name: '会员卡管理',
    url: '/equipment',
    icon: 'Magnet',
  },
  {
    name: '招商管理',
    url: '/document',
    icon: 'Document',
  },
  {
    name: '系统设置',
    url: '/system',
    icon: 'Setting',
  },

  {
    name: '个人中心',
    url: '/personal',
    icon: 'User',
  },
]
//运营专员权限菜单
const manageMenuList = [
  {
    name: '数据看板',
    url: '/dashboard',
    icon: 'DataLine',
  },
  {
    name: '充电站管理',
    url: '/chargingstation',
    icon: 'Lightning',
    children: [
      {
        name: '充电站监控',
        url: '/chargingstation/monitor',
        icon: 'VideoCamera',
      },
      {
        name: '营收统计',
        url: '/chargingstation/revenue',
        icon: 'DataAnalysis',
      },
      {
        name: '充电桩管理',
        url: '/chargingstation/fault',
        icon: 'Warning',
      },
    ],
  },
  {
    name: '电子地图',
    url: '/map',
    icon: 'MapLocation',
  },
  {
    name: '运营管理',
    url: '/operations',
    icon: 'Files',
    children: [
      {
        name: '订单管理',
        url: '/operations/orders',
        icon: 'DocumentCopy',
      },
      {
        name: '订单详情',
        url: '/operations/detail',
        icon: 'Share',
      },
      {
        name: '计费管理',
        url: '/operations/total',
        icon: 'Money',
      },
    ],
  },
  {
    name: '报警管理',
    url: '/alarm',
    icon: 'Phone',
  },
  {
    name: '会员卡管理',
    url: '/equipment',
    icon: 'Magnet',
  },
  {
    name: '个人中心',
    url: '/personal',
    icon: 'User',
  },
]
//登录接口
Mock.mock('https://www.demo.com/login', 'post', (options: any) => {
  const { username, password } = JSON.parse(options.body)
  if (username === 'admin' && password === 'admin666') {
    return {
      code: 200,
      message: '登陆成功',
      data: {
        token: 'admintokenkkljbuo2w9xla2',
        user: {
          username: '赖军',
          roles: ['admin'],
        },
        menulist: adminMenuList,
      },
    }
  } else if (username === 'user' && password === 'user666') {
    return {
      code: 200,
      message: '登陆成功',
      data: {
        token: 'usertokenlkg55dws5ch4ew97cl',
        user: {
          username: '江霞',
          roles: ['user'],
        },
        menulist: manageMenuList,
      },
    }
  } else {
    return {
      code: 401,
      message: '用户名或者密码有误',
    }
  }
})

//echarts图表数据接口
Mock.mock('https://www.demo.com/getLineStatistic', 'get', () => {
  return {
    code: 200,
    message: '登陆成功',
    data: {
      list: [
        { name: '充电量', data: [20, 50, 30, 70, 60, 80, 40, 60, 50] },
        { name: '充电时长', data: [40, 60, 50, 80, 70, 90, 60, 70, 80] },
        { name: '充电功率', data: [30, 40, 60, 50, 70, 20, 30, 40, 60] },
      ],
    },
  }
})

////echarts图表数据接口2 饼图
Mock.mock('https://www.demo.com/getGraphStatistic', 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: {
      list: [
        { value: 35, name: '充电桩' }, // 数据值和名称
        { value: 30, name: '充电站' },
        { value: 25, name: '充电杆' },
      ],
    },
  }
})

//echarts图表数据接口3 雷达图
Mock.mock('https://www.demo.com/leidaGraph', 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: {
      list: [42, 30, 200, 350, 500, 180],
    },
  }
})

//echarts图表数据接口3 雷达图
Mock.mock('https://www.demo.com/topCityRank', 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: {
      list: [
        { rank: 1, city: '广州', amount: 52457, percentage: 24, trend: 'up' },
        { rank: 2, city: '上海', amount: 323234, percentage: 24, trend: 'down' },
        { rank: 3, city: '佛山', amount: 192255, percentage: 24, trend: 'down' },
        { rank: 4, city: '珠海', amount: 17540, percentage: 24, trend: 'up' },
        { rank: 5, city: '深圳', amount: 662337, percentage: 24, trend: 'down' },
        { rank: 6, city: '厦门', amount: 22941, percentage: 24, trend: 'up' },
        { rank: 7, city: '长沙', amount: 565221, percentage: 24, trend: 'up' },
      ],
    },
  }
})
