export default {
    com: {
        sysName: 'Simulation Analysis System',
        fullscreen: 'FullScreen',
        quitFull: 'Quit',
        switch: 'Language',
        doc: 'Document',
        logout: 'Logout',
        home: 'Home',
        modelBase: 'ModelBase',
        visualization: 'Visualization',
        analysis: 'Analysis',
        sysFunction: 'System',
        users: 'Users',
        logs: 'Logs',
        labelOptions: 'Options',
        others: 'CloseOthers',
        all: 'CloseAll',
        items: [
            {
                icon: 'el-icon-s-home',
                index: 'home',
                title: 'Home',
            },
            {
                icon: 'el-icon-s-cooperation',
                index: 'modelPage',
                title: 'ModelSimulation',
                subs: [
                    {index: 'model', title: 'ModelBase', icon: 'el-icon-menu'},
                    {index: 'simulation', title: 'MotionSimulation', icon: 'el-icon-s-operation'},
                ]
            },
            {
                icon: 'el-icon-picture',
                index: 'scenePage',
                title: 'Visualization',
                subs: [
                    {index: 'visual', title: 'SceneBase', icon: 'el-icon-menu'},
                    {index: 'scene', title: 'SceneEditor', icon: 'el-icon-edit'},
                    {index: 'dataScreen', title: 'DataScreen', icon: 'el-icon-s-data'},
                    {index: 'digitalTwin', title: 'DigitalLine', icon: 'el-icon-s-platform'},
                ]
            },
            {
                icon: 'el-icon-s-marketing',
                index: 'analysis',
                title: 'Analysis'
            },
            {
                icon: 'el-icon-s-tools',
                index: 'systemPage',
                title: 'System',
                subs: [
                    {index: 'admin', title: 'Users', icon: 'el-icon-user-solid'},
                    {index: 'log', title: 'Logs', icon: 'el-icon-s-order'}
                ]
            }
        ]
    }
}
