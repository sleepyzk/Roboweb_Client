<template>
    <el-scrollbar style="height: 100%">
        <div class="main_box">
            <el-row :gutter="0">
                <el-col :xs="24" :md="8" :lg="5">
                    <div class="panel">
                        <el-tabs type="border-card">
                            <el-tab-pane label="场景">
                                <div class="in_box">
                                    <el-scrollbar style="height: 100%">
                                        <div v-if="doReload" v-for="(item,index) in sceneObjs">
                                            <div class="render_ele" @click="getObjectById(item.id)">{{item.name}}</div>
                                        </div>
                                    </el-scrollbar>
                                </div>
                                <div class="background_set">
                                    <el-row>
                                        <el-col :sm="20" :md="20" :lg="20">
                                            <div class="select_box"><span style="color: #606266">背景</span>
                                                <el-select v-model="backValue" placeholder="请选择背景" @change="getBack"
                                                           style="width: 75%;margin-left: 5%">
                                                    <el-option
                                                            v-for="item in backOption"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                            <div class="select_box"><span style="color: #606266">地面</span>
                                                <el-select v-model="groundValue" placeholder="请选择地面" @change="getGround"
                                                           style="width: 75%;margin-left: 5%">
                                                    <el-option
                                                            v-for="item in groundOption"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </el-col>
                                        <el-col :sm="4" :md="4" :lg="4">
                                            <div class="color_box">
                                                <el-color-picker v-show="showColor" v-model="color" class="picker" @change="changeBackColor"></el-color-picker>
                                            </div>
                                            <div>
                                                <el-checkbox v-model="gridChecked" @change="showGrid">网格</el-checkbox>
                                            </div>
                                            <div>
                                                <el-checkbox v-model="axesChecked" @change="showAxes">坐标</el-checkbox>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div id="gui" class="control_box">
                                    <div class="ele_box"><span>名称</span><span style="margin-left: 15%">{{chosenObject.name}}</span></div>
                                    <div class="ele_box"><span>ID</span>
                                        <el-input style="width: 61%;margin-left: 25px" v-model="chosenObject.uuid"></el-input>
                                    </div>
                                    <div class="ele_box"><span>类型</span><span style="margin-left: 15%">{{chosenObject.type}}</span></div>
                                    <div class="ele_box"><span>位置</span>
                                        <el-input style="width: 15%;margin: 0 0 0 3%" v-model="chosenObject.position.x"></el-input>
                                        <el-input style="width: 15%;margin: 0 0 0 8%" v-model="chosenObject.position.y"></el-input>
                                        <el-input style="width: 15%;margin: 0 0 0 8%" v-model="chosenObject.position.z"></el-input>
                                        <el-button type="primary" style="margin-left: 10px;padding: 9px 8px">重置</el-button>
                                    </div>
                                    <div class="ele_box"><span>旋转</span>
                                        <el-input style="width: 15%;margin: 0 0 0 3%" v-model="chosenObject.rotation.x"></el-input>
                                        <el-input style="width: 15%;margin: 0 0 0 8%" v-model="chosenObject.rotation.y"></el-input>
                                        <el-input style="width: 15%;margin: 0 0 0 8%" v-model="chosenObject.rotation.z"></el-input>
                                        <el-button type="primary" style="margin-left: 10px;padding: 9px 8px">重置</el-button>
                                    </div>
                                    <div class="ele_box"><span>缩放</span>
                                        <el-input style="width: 15%;margin: 0 0 0 3%" v-model="chosenObject.scale.x"></el-input>
                                        <el-input style="width: 15%;margin: 0 0 0 8%" v-model="chosenObject.scale.y"></el-input>
                                        <el-input style="width: 15%;margin: 0 0 0 8%" v-model="chosenObject.scale.z"></el-input>
                                        <el-button type="primary" style="margin-left: 10px;padding: 9px 8px">重置</el-button>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="模型">
                                <div>
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
                                                <el-button type="primary" @click="selectModelToSceneById(scope.row)">添加
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-dialog
                                            top="30vh"
                                            title="模型设置"
                                            :visible.sync="dialogVisible"
                                            width="30%"
                                            center
                                            :destroy-on-close="true"
                                            :close-on-click-modal="false">
                                        <div class="set_box"
                                             v-loading="loading"
                                             element-loading-text="拼命加载中"
                                             element-loading-spinner="el-icon-loading">
                                            <div class="position_box">
                                                <span style="font-weight: bold">位置</span>
                                                <span style="margin-left: 5%">X：</span>
                                                <el-input style="width: 15%" v-model="position.x"></el-input>
                                                <span style="margin-left: 10%">Y：</span>
                                                <el-input style="width: 15%" v-model="position.y"></el-input>
                                                <span style="margin-left: 10%">Z：</span>
                                                <el-input style="width: 15%" v-model="position.z"></el-input>
                                            </div>
                                            <div class="scale_box">
                                                <span style="font-weight: bold">缩放</span>
                                                <span style="margin-left: 5%">X：</span>
                                                <el-input style="width: 15%" v-model="scale.x"></el-input>
                                                <span style="margin-left: 10%">Y：</span>
                                                <el-input style="width: 15%" v-model="scale.y"></el-input>
                                                <span style="margin-left: 10%">Z：</span>
                                                <el-input style="width: 15%" v-model="scale.z"></el-input>
                                            </div>
                                            <!--<div class="color_box">-->
                                            <!--<span style="font-weight: bold">颜色</span>-->
                                            <!--<el-color-picker v-model="color" style="margin-left: 10%"></el-color-picker>-->
                                            <!--</div>-->
                                        </div>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="cleanData">取 消</el-button>
                                            <el-button type="primary"
                                                       @click="loadFbxModel(baseUrl + modelName + '/',modelUrls)"
                                                       @keyup.enter="loadFbxModel(baseUrl + modelName + '/',modelUrls)">确 定</el-button>
                                        </span>
                                    </el-dialog>
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
                <el-col :xs="24" :md="16" :lg="19">
                    <div class="space" id="container"></div>
                </el-col>
            </el-row>
        </div>
    </el-scrollbar>
</template>

<script>
    import * as THREE from 'three';
    import * as dat from 'dat.gui';
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
    import {TransformControls} from 'three/examples/jsm/controls/TransformControls';
    import {DragControls} from 'three/examples/jsm/controls/DragControls';

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

                //场景
                sceneObjs: {},
                doReload: true,//更新显示场景包含对象的div
                chosenObject: {
                    name: '',
                    uuid: '',
                    type: '',
                    position: '',
                    rotation: '',
                    scale: ''
                },//选中对象
                backValue: '',//选择背景模式
                groundValue: '',//选择地面模式
                backOption: [
                    {
                        value: 1,
                        label: '默认',
                    },
                    {
                        value: 2,
                        label: '颜色',
                    },
                    {
                        value: 3,
                        label: '贴图',
                    }],
                groundOption: [
                    {
                        value: 1,
                        label: '默认',
                    },
                    {
                        value: 2,
                        label: '贴图1',
                    },
                    {
                        value: 3,
                        label: '贴图2',
                    }
                ],
                color: '#888',
                showColor: false,

                //3D渲染
                scene: '',
                camera: '',
                renderer: '',
                controls: '',
                light1: '',
                light2: '',
                grid: '',
                axes: '',
                //地面mesh
                groundMesh: '',
                //是否显示网格和坐标轴
                gridChecked: true,
                axesChecked: true,
                baseUrl: '/model/modelFile/',
                modelUrls: ['base', 'link1', 'link2', 'link3', 'link4', 'link5', 'link6'],
                //模型添加设置
                dialogVisible: false,
                loading: false,
                modelName: '',
                position: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                scale: {
                    x: 1,
                    y: 1,
                    z: 1,
                },
                //拖拽控制器
                objects: [],
                transformControls: ''
            }
        },
        methods: {
            //初始化gui面板
            // initGui(){
            //     const gui = new dat.GUI();
            //     gui.add(this,'gridChecked');
            //     let guiDom = gui.domElement;
            //     console.log(guiDom);
            //     let dom = document.getElementById('gui')
            //     dom.appendChild(guiDom);
            // },
            //查看模型
            getChild() {
                // console.log(this.scene);
                let length = this.scene.children.length;
                for (let i = 0; i < length; i++) {
                    this.sceneObjs[this.scene.children[i].id] = this.scene.children[i];
                }
                console.log(this.sceneObjs);
                this.reload();
            },
            //选中模型
            getObjectById(id) {
                this.chosenObject = this.sceneObjs[id];
                console.log(this.chosenObject);
            },
            //刷新模型显示栏
            reload() {
                this.doReload = false;
                this.$nextTick(() => {
                    this.doReload = true;
                })
            },
            //选择背景样式
            getBack(val) {
                console.log(val);
                if (val === 1) {
                    this.showColor = false;
                    this.scene.background = null;
                    this.renderer.setClearColor('#000', 1.0)
                }
                if (val === 2) {
                    this.showColor = true;
                }
                if (val === 3) {
                    this.showColor = false;
                    this.scene.background = new THREE.CubeTextureLoader().setPath('skyCube/').load([
                        'px.png',
                        'nx.png',
                        'py.png',
                        'ny.png',
                        'pz.png',
                        'nz.png'
                    ])
                }
            },
            //选择背景颜色
            changeBackColor() {
                console.log(this.color);
                this.scene.background = null;
                this.renderer.setClearColor(this.color, 1.0)
            },
            //选择地板样式
            getGround(val) {
                if (val === 1) {
                    this.scene.remove(this.groundMesh);
                    this.scene.add(this.grid);
                }
                if (val === 2) {
                    this.scene.remove(this.groundMesh);
                    this.scene.remove(this.grid);
                    this.loadGround('texture2.jpg');
                }
                if (val === 3) {
                    this.scene.remove(this.groundMesh);
                    this.scene.remove(this.grid);
                    this.loadGround('texture3.jpg');
                }
            },
            //加载地版贴图
            loadGround(groundUrl) {
                let textureLoader = new THREE.TextureLoader();
                textureLoader.load('groundTexture/' + groundUrl, texture => {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                    texture.repeat.set(5 / 5, 5 / 5)
                    texture.anisotropy = 16
                    texture.encoding = THREE.sRGBEncoding
                    let groundMaterial = new THREE.MeshLambertMaterial({map: texture});
                    this.groundMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), groundMaterial);
                    this.groundMesh.rotation.x = -Math.PI / 2
                    this.groundMesh.position.y = 0
                    this.groundMesh.receiveShadow = true
                    this.groundMesh.name = 'Ground'
                    this.scene.add(this.groundMesh);
                    // this.getChild();
                })
            },
            //是否显示网格
            showGrid(showGrid) {
                if (showGrid) {
                    this.scene.add(this.grid);
                } else {
                    this.scene.remove(this.grid);
                }

            },
            //是否显示坐标轴
            showAxes(showAxes) {
                if (showAxes) {
                    this.scene.add(this.axes);
                } else {
                    this.scene.remove(this.axes);
                }
            },
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
            selectModelToSceneById(row) {
                console.log(row, row.id);
                this.modelName = row.modelName;
                this.dialogVisible = true;
            },
            //3D渲染
            initScene() {
                //获取dom节点
                let container = document.getElementById('container');
                //初始化场景
                this.scene = new THREE.Scene();
                this.light1 = new THREE.AmbientLight(0x999999);//添加环境光
                this.light1.name = 'AmbientLight';
                this.scene.add(this.light1);
                this.light2 = new THREE.DirectionalLight(0xdfebff, 0.45);//从正上方（不是位置）照射过来的平行光，0.45的强度
                // let  light3 = new THREE.DirectionalLight(0xdfebff, 0.45);
                // light3.position.set(-50, 200, -100);
                // light3.position.multiplyScalar(0.3);
                // light3.name = 'DirectionalLight2'
                // this.scene.add(light3);
                this.light2.position.set(50, 200, 100);
                this.light2.name = 'DirectionalLight1';
                this.scene.add(this.light2);
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
                //初始化网格
                this.grid = new THREE.GridHelper(2000, 100);
                this.grid.material.opacity = 0.5;
                this.grid.material.transparent = true;
                this.grid.name = 'Grid';
                this.scene.add(this.grid);
                //初始化坐标轴
                this.axes = new THREE.AxesHelper(100);
                this.axes.name = 'Axes';
                this.scene.add(this.axes);
                //初始化平移控件
                this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
                this.transformControls.name = 'TransformControls';
                this.scene.add(this.transformControls);
            },
            animate() {
                this.controls.update();
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(this.animate);
            },
            // 加载模型
            loadFbxModel(baseUrl, modelUrl) {
                this.loading = true;
                let model = {};
                let fbxLoader = new FBXLoader;
                fbxLoader.setPath(baseUrl);
                new Promise(resolve => {
                    modelUrl.forEach(a => {
                        fbxLoader.load(a + '.fbx', fbx => {
                                console.log(a);
                                // console.log(fbx);
                                // let geo = fbx.children[0].geometry
                                // let mat = new THREE.MeshBasicMaterial({color: '#409eff'});
                                model[a] = fbx;
                                // this.scene.add(fbx);
                                if (Object.keys(model).length !== modelUrl.length) return;
                                resolve(model);
                            }
                        )
                    })
                }).then(model => {
                    this.setModel(model);
                })

            },
            //配置模型
            setModel(model) {
                for (let i = 0; i < this.modelUrls.length - 1; i++) {
                    model[this.modelUrls[i]].add(model[this.modelUrls[i + 1]]);
                }
                console.log(model);
                model[this.modelUrls[0]].position.set(this.position.x, this.position.y, this.position.z);
                model[this.modelUrls[0]].scale.set(this.scale.x, this.scale.y, this.scale.z);
                model[this.modelUrls[0]].name = this.modelName;
                this.scene.add(model[this.modelUrls[0]]);
                this.objects.push(model[this.modelUrls[0]]);
                this.cleanData();
                this.getChild();
                this.initDragControls(model);
            },
            //清除模型数据
            cleanData() {
                this.position.x = 0;
                this.position.y = 0;
                this.position.z = 0;
                this.scale.x = 1;
                this.scale.y = 1;
                this.scale.z = 1;
                this.loading = false;
                this.dialogVisible = false
            },
            //初始化拖拽控制器
            initDragControls(model) {
                let self = this;
                self.scene.add(self.transformControls);

                let dragControls = new DragControls(this.objects, this.camera, this.renderer.domElement);
                // 鼠标略过事件
                dragControls.addEventListener('hoveron', function (event) {
                    // 让变换控件对象和选中的对象绑定
                    self.transformControls.attach(event.object);
                });
                // 开始拖拽
                dragControls.addEventListener('dragstart', function (event) {
                    self.controls.enabled = false;
                });
                // 拖拽结束
                dragControls.addEventListener('dragend', function (event) {
                    self.controls.enabled = true;
                });
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
            this.getChild();
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

    /*模型添加参数设置*/
    .set_box {
        margin-top: -20px;
    }

    .position_box {
        margin-top: 10px;
    }

    .scale_box {
        margin-top: 10px;
    }

    .color_box {
        padding: 9px 0 0 8px;
    }

    /*场景选卡*/
    .in_box {
        width: 93%;
        height: 200px;
        background-color: #f0f0f0;
        padding: 10px 10px 0 10px;
        /*overflow: scroll;*/
    }

    .render_ele {
        background: white;
        padding: 5px;
        font-size: 14px;
    }

    .render_ele:hover {
        background: #f5f7fa;
        padding: 5px;
        cursor: pointer;
        color: #409eff;
    }

    .select_box {
        padding: 10px 0 0 0;
    }

    /deep/ .el-color-picker__trigger {
        bottom: 0;
        padding: 0;
    }

    .background_set{
        margin-top: 10px;
    }

    .control_box {
        margin-top: 10px;
        color: #606266;
    }

    .ele_box {
        margin-top: 15px;
        margin-right: -15px;
    }

    /deep/.el-input__inner{
        padding: 5px;
    }

    /*渲染空间*/
    .space {
        height: 700px;
        background-color: gray;
    }
</style>
