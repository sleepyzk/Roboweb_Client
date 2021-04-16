<template>
    <el-scrollbar style="height: 100%">
        <div class="main_box">
            <el-row :gutter="0">
                <el-col :xs="24" :sm="8" :md="6">
                    <div class="panel">
                        <el-tabs type="border-card">
                            <el-tab-pane label="场景">场景</el-tab-pane>
                            <el-tab-pane label="模型">
                                <div class="select_box">
                                    <el-dropdown style="margin-top: 5px" @command="handleCommand">
                                        <span class="el-dropdown-link">
                                            选择类型<i class="el-icon-caret-bottom el-icon--right"></i>
                                         </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command="">全部</el-dropdown-item>
                                            <el-dropdown-item command="机械臂">机械臂</el-dropdown-item>
                                            <el-dropdown-item command="传送带">传送带</el-dropdown-item>
                                            <el-dropdown-item command="机床">机床</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    <el-input v-model="keyword" placeholder="请输入关键字"
                                              @keyup.enter.native="searchModelByKeyword(keyword)"
                                              class="search_input">
                                        <template slot="append">
                                            <el-button type="primary" plain @click="searchModelByKeyword(keyword)">搜索
                                            </el-button>
                                        </template>
                                    </el-input>
                                </div>
                                <div class="table_box">
                                    <el-table
                                            :data="showModels"
                                            style="width: 100%">
                                        <el-table-column
                                                align="center"
                                                prop="modelName"
                                                label="模型名"
                                                min-width="35%">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                prop="modelType"
                                                label="类型"
                                                min-width="35%">
                                        </el-table-column>
                                        <el-table-column
                                                align="center"
                                                label="操作"
                                                min-width="30%">
                                            <template slot-scope="scope">
                                                <el-button type="primary" @click="addModelToSceneById(scope.row)">添加
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="page_box">
                                        <el-pagination
                                                @current-change="handleCurrentChange"
                                                :page-size="this.showNum"
                                                layout="total, prev, pager, next"
                                                :total="total">
                                        </el-pagination>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="设置">设置</el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="16" :md="18">
                    <div class="space" id="container"></div>
                </el-col>
            </el-row>
        </div>
    </el-scrollbar>
</template>

<script>
    import * as THREE from "three";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";

    export default {
        name: "CreateScene",
        data() {
            return {
                //查找关键词
                keyword: '',

                //模型表格
                models: [],
                showModels: [],
                //分页栏
                total: null,
                showNum: 8,
                currentPage: 1,

                //3D渲染
                scene: '',
                camera: '',
                renderer: '',
                controls: '',
                light: '',
                baseUrl: '/public/model/modelFile/myABB/',
                modelUrls: ['base', 'link1', 'link2', 'link3', 'link4', 'link5', 'link6']
            }
        },
        methods: {
            //处理下拉菜单点击
            handleCommand(command) {
                this.searchModelByKeyword(command);
            },
            //根据关键词查找模型
            searchModelByKeyword(keyword) {
                this.$http.get('http://localhost:8080/model/find', {params: {keyword: keyword}}).then(res => {
                    this.models = res.data.data;
                    this.total = this.models.length;
                    this.updateShowModel();
                })
                console.log('关键词：' + keyword);
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
                this.showModels = this.models.slice(startPage, endPage);
                console.log(this.showModels);
            },
            //添加模型
            addModelToSceneById(row) {
                console.log(row, row.id);
                // this.loadFbxModel(this.baseUrl, this.modelUrls);
                this.loadDemo();
            },
            //3D渲染
            initScene() {
                //获取dom节点
                let container = document.getElementById('container');
                //初始化场景
                this.scene = new THREE.Scene();
                this.scene.add(new THREE.AmbientLight(0x999999));//添加环境光
                this.light = new THREE.DirectionalLight(0xdfebff, 0.45);//从正上方（不是位置）照射过来的平行光，0.45的强度
                this.light.position.set(50, 200, 100);
                this.light.position.multiplyScalar(0.3);
                this.scene.add(this.light);
                //初始化相机
                this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 10000);
                this.camera.position.set(100, 300, 400);
                this.camera.lookAt(this.scene.position);
                //初始化渲染器
                this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
                this.renderer.setClearColor(0x00000);
                this.renderer.setPixelRatio(window.devicePixelRatio);//为了兼容高清屏幕
                this.renderer.setSize(container.clientWidth, container.clientHeight);
                container.appendChild(this.renderer.domElement);
                //初始化控制器
                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                this.controls.enableDamping = true;//惯性
                this.controls.dampingFactor = 0.25;//动态阻尼系数
                this.controls.target.set(0, 0, 0);
                this.controls.zoomSpeed = 2;
                this.controls.update();
                //初始化网格
                let grid = new THREE.GridHelper(2000, 100);
                grid.material.opacity = 0.5;
                grid.material.transparent = true;
                this.scene.add(grid);
                //初始化坐标轴
                let axes = new THREE.AxesHelper(100);
                this.scene.add(axes);
            },
            animate() {
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(this.animate);
            },
            //加载模型
            loadDemo(){
                let fbxLoader = new FBXLoader;
                fbxLoader.load('/public/model/modelFile/base.fbx',fbx =>{
                    this.scene.add(fbx.scene);
                })
            },
            loadFbxModel(baseUrl, modelUrls) {
                console.log(baseUrl);
                console.log(modelUrls);
                let fbxLoader = new FBXLoader;
                fbxLoader.setPath(baseUrl);
                this.modelUrls.forEach(e => {
                    console.log(e);
                    fbxLoader.load(e + '.fbx', fbx => {
                            this.scene.add(fbx);
                            console.log(fbx);
                        }, onProgress => {
                            console.log('模型加载中');
                        }, onerror => {
                            console.log('模型加载出错');
                        }
                    )
                })
            },
            //渲染窗口自适应
            resize() {
                let container = document.getElementById('container');
                this.renderer.setSize(container.clientWidth, container.clientHeight);
                this.camera.aspect = container.clientWidth / container.clientHeight;
                this.camera.updateProjectionMatrix();
            }
        },
        mounted() {
            this.searchModelByKeyword('');
            this.initScene();
            this.animate();
            window.onresize = () => this.resize()
        }
    }
</script>

<style scoped>

    .main_box {
        width: 90%;
        margin: 50px auto 0;
    }

    /*控制面板*/
    .panel {
        height: 700px;
        background-color: white;
    }

    /*/deep/.el-tabs--border-card>.el-tabs__header{*/
    /*    border: none;*/
    /*    background-color: #cccccc;*/
    /*}*/
    /deep/ .el-tabs--border-card {
        /*background: #cccccc;*/
        border: none;
        box-shadow: none;
    }

    .select_box {

    }

    .el-dropdown-link {
        cursor: pointer;
        color: #888;
    }

    .search_input {
        width: 65%;
        float: right;
    }

    .table_box {
        width: 100%;
        margin-top: 25px;
    }

    .page_box {
        float: right;
        margin-top: 10px;
    }


    /*渲染空间*/
    .space {
        height: 700px;
        background-color: gray;
    }
</style>
