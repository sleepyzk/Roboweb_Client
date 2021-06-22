<template>
    <el-scrollbar style="height: 100%">
        <div class="container_box">
            <el-row :gutter="20">
                <el-col :lg="8">
                    <div class="user_box">
                        <el-row :gutter="20">
                            <el-col :lg="10">
                                <el-avatar
                                        src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3305298991,2024211813&fm=26&gp=0.jpg"
                                        :size="160" style="margin: 20px 0 0 50px"></el-avatar>
                            </el-col>
                            <el-col :lg="14">
                                <div style="padding-top: 25px">
                                    <span style="font-size: 35px;">欢迎你：admin</span>
                                </div>
                                <el-divider></el-divider>
                                <div>
                                    <span style="color: gray">用户权限：管理员</span>
                                </div>
                                <div style="margin-top: 10px">
                                    <span style="color: gray">登陆地点：浙江杭州</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="login_box">
                        <el-scrollbar style="height: 100%">
                            <el-table
                                    :data="tableData"
                                    style="border-radius: 10px;"
                                    stripe>
                                <el-table-column
                                        prop="date"
                                        label="日期"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="用户名"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="登录地点">
                                </el-table-column>
                            </el-table>
                        </el-scrollbar>
                    </div>
                </el-col>
                <el-col :lg="16">
                    <el-row :gutter="20">
                        <el-col :lg="8" class="gradient--0">
                            <div class="gradient">
                                <span style="font-size: 30px">系统访问量：3221</span>
                            </div>
                        </el-col>
                        <el-col :lg="8" class="gradient--1">
                            <div class="gradient" style="font-size: 30px">当前用户量：123</div>
                        </el-col>
                        <el-col :lg="8" class="gradient--2">
                            <div class="gradient" style="font-size: 30px">当前日志量：153</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :lg="8">
                            <div class="timeline_box">
                                <div style="margin-top: 30px">
                                    <el-timeline>
                                        <el-timeline-item timestamp="2021/6/12" placement="top" color="#0bbd87">
                                            <el-card>
                                                <h4>用户 admin 上传模型成功</h4>
                                            </el-card>
                                        </el-timeline-item>
                                        <el-timeline-item timestamp="2021/6/3" placement="top" color="#0bbd87">
                                            <el-card>
                                                <h4>用户 admin 保存场景成功</h4>
                                            </el-card>
                                        </el-timeline-item>
                                        <el-timeline-item timestamp="2021/5/22" placement="top" color="#0bbd87">
                                            <el-card>
                                                <h4>用户 admin 上传模型成功</h4>
                                            </el-card>
                                        </el-timeline-item>
                                    </el-timeline>
                                </div>
                            </div>
                        </el-col>
                        <el-col :lg="16">
                            <div class="video_box">
                                <video width="100%" height="100%" controls preload="metadata">
                                    <source src="../assets/video/video3.mp4" type="video/mp4"/>
                                </video>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="12">
                    <div class="table_box1">
                        <div style="width: 60%;height: 100%;float: left">
                            <dv-charts :option="option0"/>
                        </div>
                        <div style="width: 40%;height: 100%;float: left">
                            <dv-charts :option="option1"/>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="12">
                    <div class="table_box2">
                        <dv-charts :option="option2"/>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-scrollbar>
</template>

<script>

    export default {
        name: "Home",
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: 'admin',
                    address: '浙江杭州',
                }, {
                    date: '2016-05-04',
                    name: 'admin',
                    address: '浙江杭州'
                }, {
                    date: '2016-05-01',
                    name: 'admin',
                    address: '江苏苏州',
                }, {
                    date: '2016-05-03',
                    name: 'admin',
                    address: '广东深圳'
                }, {
                    date: '2016-05-03',
                    name: 'admin',
                    address: '广东深圳'
                }, {
                    date: '2016-05-03',
                    name: 'admin',
                    address: '浙江杭州'
                }, {
                    date: '2016-05-03',
                    name: 'admin',
                    address: '浙江杭州'
                }],
                option0:{
                    title: {
                        text: '用户归属地柱状图'
                    },
                    xAxis: {
                        name: '归属地',
                        data: ['杭州', '苏州', '深圳', '哈尔滨', '广州']
                    },
                    yAxis: {
                        name: '用户数量',
                        data: 'value'
                    },
                    series: [
                        {
                            data: [93, 32, 65, 44, 52],
                            type: 'bar',
                            gradient: {
                                color: ['#37a2da', '#67e0e3']
                            }
                        }
                    ]
                },
                option1:{
                    title: {
                        text: '用户归属地饼状图'
                    },
                    series: [
                        {
                            type: 'pie',
                            data: [
                                { name: '杭州', value: 93 },
                                { name: '苏州', value: 32 },
                                { name: '深圳', value: 65 },
                                { name: '哈尔滨', value: 44 },
                                { name: '广州', value: 52 },
                            ],
                            insideLabel: {
                                show: true
                            }
                        }
                    ]
                },
                option2: {
                    title: {
                        text: '周登录用户量'
                    },
                    xAxis: {
                        name: '第二周',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        name: '用户量',
                        data: 'value'
                    },
                    series: [
                        {
                            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                            type: 'line',
                            lineArea: {
                                show: true,
                                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
                            }
                        }
                    ]
                }
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped>

    .container_box {
        padding: 50px 50px 0 50px;
    }

    .user_box {
        height: 200px;
        background-color: #ffffff;
        border: 1px solid #EBEEF5;
        border-radius: 10px;
    }


    .login_box {
        height: 300px;
        background-color: #ffffff;
        border: 1px solid #EBEEF5;
        border-radius: 10px;
        margin-top: 20px;
    }

    .timeline_box {
        height: 400px;
        background-color: #ffffff;
        border: 1px solid #EBEEF5;
        border-radius: 10px;
        margin-top: 20px;
        padding: 0 20px 0 20px;
    }

    .video_box {
        height: 400px;
        margin-top: 20px;
    }

    .table_box1 {
        height: 200px;
        background-color: #ffffff;
        border: 1px solid #EBEEF5;
        border-radius: 10px;
        margin-top: 20px;
    }

    .table_box2 {
        height: 200px;
        background-color: #ffffff;
        border: 1px solid #EBEEF5;
        border-radius: 10px;
        margin-top: 20px;
    }

    .gradient--0 {
        --gradient-start: #6DE195;
        --gradient-end: #C4E759;
    }

    .gradient--1 {
        --gradient-start: #5583EE;
        --gradient-end: #41D8DD;
    }

    .gradient--2 {
        --gradient-start: #A16BFE;
        --gradient-end: #DEB0DF;
    }

    .gradient {
        display: inline-block;
        height: 100px;
        width: 100%;
        background: linear-gradient(33deg, var(--gradient-start), var(--gradient-end));
        border-radius: 10px;
        box-shadow: 0 5px 10px #0002;
        text-align: center;
        color: white;
        line-height: 100px;
    }
</style>
