<template>
    <el-scrollbar style="height: 100%">
        <div>
            <el-row class="top">
                <div class="title">所有场景</div>
                <el-col class="search_box" :xs="12" :sm="8" :lg="5">
                    <el-input v-model="keyword" placeholder="请输入关键字" @keyup.enter.native="searchByKeyword(keyword)">
                        <template slot="append">
                            <el-button type="primary" plain @click="searchByKeyword(keyword)">搜索</el-button>
                        </template>
                    </el-input>
                </el-col>
            </el-row>
            <div class="nav">
                <el-row>
                    <!--                    <el-col class="nav_text" :xs="16" :sm="16" :lg="12">-->
                    <!--                        <span>类别：</span>-->
                    <!--                        <el-radio-group v-model="sceneClass" size="mini" @change="searchByKeyWord">-->
                    <!--                            <el-radio-button label="">全部</el-radio-button>-->
                    <!--                            <el-radio-button label="机械臂"></el-radio-button>-->
                    <!--                            <el-radio-button label="传送带"></el-radio-button>-->
                    <!--                            <el-radio-button label="机床"></el-radio-button>-->
                    <!--                        </el-radio-group>-->
                    <!--                    </el-col>-->
                    <el-col class="nav_upload" :xs="8" :sm="5" :lg="3">
                        <el-button type="success" style="width: 100%" @click="toCreateScene"><i
                                class="el-icon-upload"></i> 创建场景
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="base">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" class="base_box" v-for="(item,index) in showScene"
                            :key="item.index">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <el-image
                                    :src="'http://model.3dmomoda.com/models/b407539f4a734223bec484e80d9d7058/1/screenshot.jpg'"
                                    class="image" @click=""></el-image>
                            <div class="card_sub">
                                <div class="sub_title">
                                    <span>{{item.sceneName}}</span>
                                </div>
                                <div class="sub_button">
                                    <el-button size="mini" type="success" @click="">下载
                                    </el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="showNum"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
    export default {
        name: "Visual",
        data() {
            return {
                //搜索栏
                keyword: '',

                //导航栏
                sceneClass: '',

                //分页栏
                currentPage: 1,
                showNum: 8,
                total: null,
                showScene: [],
                sceneList: [],
            }
        },
        methods: {
            //关键字搜索
            searchByKeyword(keyword) {
                console.log('搜索关键字' + keyword);
            },

            //每页显示记录条数改变
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //当前页改变
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.updateShowModel();
            },
            //从总记录中选出符合分页条件数据
            updateShowModel() {
                let startPage = (this.currentPage - 1) * this.showNum;
                let endPage = startPage + this.showNum;
                this.showScene = this.sceneList.slice(startPage, endPage);
                console.log(this.showScene);
            },

            //新建场景
            toCreateScene(){
                this.$router.push('/scene')
            }
        },
        mounted() {
            this.searchByKeyword('');
        }
    }
</script>

<style scoped>

    /*搜索栏*/
    .top {
        width: 90%;
        margin: 20px auto 20px;
    }

    .title {
        font-size: 20px;
        font-weight: bold;
        float: left;
        padding-top: 5px;
    }

    .search_box {
        float: right;
    }

    /*导航栏*/
    .nav {
        width: 90%;
        height: 50px;
        margin: auto;
        background-color: white;
        border-radius: 5px;
        box-shadow: #666666;
    }

    .nav_text {
        padding: 10px 0 0 20px;
    }

    .nav_upload {
        float: right;
        padding: 10px 20px 0 0;
    }

    /*卡片*/
    .base {
        width: 90%;
        margin: 0 auto 20px;

    }

    .base_box {
        margin-top: 20px;
    }

    .image {
        width: 100%;
        height: 200px;
        display: block;
        cursor: pointer;
    }

    .card_sub {
        margin-top: 10px;
    }

    .sub_title {
        padding: 10px;
        float: left;
        font-size: 15px;
    }

    .sub_button {
        padding: 10px;
        float: right;
    }

    /*分页栏*/
    .block {
        float: right;
        margin: 0 5% 20px 0;
    }
</style>
