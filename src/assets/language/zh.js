export default {
    com: {
        sysName: '仿真分析系统',
        fullscreen: '全屏',
        quitFull: '取消全屏',
        switch: '切换语言',
        doc: '操作文档',
        logout: '退出登录',
        home: '首页',
        modelBase: '仿真模型库',
        visualization: '生产可视化',
        analysis: '数据分析',
        sysFunction: '系统功能',
        users: '用户管理',
        logs: '系统日志',
        labelOptions: '标签选项',
        others: '关闭其他',
        all: '关闭所有',
        items: [
            {
                icon: 'el-icon-s-home',
                index: 'home',
                title: '首页',
            },
            {
                icon: 'el-icon-s-cooperation',
                index: 'modelPage',
                title: '仿真模型库',
                subs: [
                    {index: 'model', title: '工业模型库', icon: 'el-icon-menu'},
                    {index: 'simulation', title: '运动仿真', icon: 'el-icon-s-operation'},
                ]
            },
            {
                icon: 'el-icon-picture',
                index: 'scenePage',
                title: '生产可视化',
                subs: [
                    {index: 'visual', title: '工业场景库', icon: 'el-icon-menu'},
                    {index: 'scene', title: '场景编辑器', icon: 'el-icon-edit'},
                    {index: 'dataScreen', title: '数据可视化', icon: 'el-icon-s-data'},
                    {index: 'digitalTwin', title: '数字孪生产线', icon: 'el-icon-s-platform'},
                ]
            },
            {
                icon: 'el-icon-s-marketing',
                index: 'analysis',
                title: '数据分析'
            },
            {
                icon: 'el-icon-s-tools',
                index: 'systemPage',
                title: '系统功能',
                subs: [
                    {index: 'admin', title: '用户管理', icon: 'el-icon-user-solid'},
                    {index: 'log', title: '系统日志', icon: 'el-icon-s-order'}
                ]
            }
        ]
    }
}
