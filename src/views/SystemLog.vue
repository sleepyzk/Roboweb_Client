<template>
<div>
    <div style="padding: 10px">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i> 设备日志
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="baseBox">
            <el-table
                    :data="tableData1"
                    style="width: 95%;margin: 30px auto 0"
                    :border="true"
                    :stripe="true"
                    size="medium">
                <el-table-column
                        align="center"
                        prop="machineName"
                        label="设备名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="location"
                        label="设备地址">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="date"
                        label="生成时间">
                </el-table-column>
                <el-table-column
                        width="250"
                        align="center"
                        prop="manage"
                        label="管理">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                        <el-button
                                size="mini"
                                type="success"
                                @click="handleEdit(scope.$index, scope.row)">下载</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        style="margin-right: 31px"
                        background
                        layout="total, prev, pager, next"
                        :current-page="query1.pageIndex"
                        :page-size="query1.pageSize"
                        :total="pageTotal1"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <div class="crumbs" style="margin-top: 10px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-document"></i> 登录日志
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="baseBox">
            <el-table
                    :data="tableData2"
                    style="width: 95%;margin: 30px auto 0"
                    :border="true"
                    :stripe="true"
                    size="medium">
                <el-table-column
                        align="center"
                        prop="userName"
                        label="登陆用户名">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="userRole"
                        label="用户角色">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="date"
                        label="登陆时间">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="location"
                        label="登陆地点">
                </el-table-column>
                <el-table-column
                        width="180"
                        align="center"
                        prop="manage"
                        label="管理">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        style="margin-right: 31px"
                        background
                        layout="total, prev, pager, next"
                        :current-page="query2.pageIndex"
                        :page-size="query2.pageSize"
                        :total="pageTotal2"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'SystemLog',
        data(){
            return{
                //table数据
                tableData1: [{
                    date: '2020-07-02 19:03:22',
                    machineName: 'UR5',
                    location: '浙江省杭州市',
                }, {
                    date: '2020-07-03 13:45:18',
                    machineName: 'ABB',
                    location: '浙江省杭州市',
                }, {
                    date: '2020-07-07 10:11:57',
                    machineName: 'KUKA',
                    location: '浙江省杭州市',
                }],
                tableData2: [{
                    date: '2020-07-12 12:01:15',
                    userName: 'admin',
                    userRole:'admin',
                    location: '浙江省杭州市',
                }, {
                    date: '2020-07-12 11:10:25',
                    userName: 'user1',
                    userRole:'admin',
                    location: '浙江省杭州市',
                }, {
                    date: '2020-07-11 09:01:10',
                    userName: 'user2',
                    userRole:'admin',
                    location: '浙江省杭州市',
                }, {
                    date: '2020-07-08 14:11:12',
                    userName: 'user3',
                    userRole:'admin',
                    location: '江苏省苏州市',
                }],
                query1: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 4
                },
                pageTotal1: 4,

                query2: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 4
                },
                pageTotal2: 10,
            }
        },
        methods:{
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>

    .baseBox {
        background-color: white;
        border-radius: 5px;
        padding: 20px 0 10px 0;
    }

</style>
