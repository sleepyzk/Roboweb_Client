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
                index: 'model',
                title: 'ModelBase',
            },
            {
                icon: 'el-icon-picture',
                index: 'visual',
                title: 'Visualization'
            },
            {
                icon: 'el-icon-s-data',
                index: 'analysis',
                title: 'Analysis'
            },
            {
                icon: 'el-icon-s-tools',
                index: '',
                title: 'System',
                subs: [
                    {index: 'admin', title: 'Users', icon: 'el-icon-user-solid'},
                    {index: 'log', title: 'Logs', icon: 'el-icon-s-order'}
                ]
            }
        ]
    }
}
