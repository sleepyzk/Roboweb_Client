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
                                                <el-color-picker v-show="showColor" v-model="color" class="picker"
                                                                 @change="changeBackColor"></el-color-picker>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div id="gui" class="control_box">
                                    <div class="ele_box"><span>名称</span><span style="margin-left: 20%">{{chosenObject.name}}</span>
                                    </div>
                                    <div class="ele_box"><span>ID</span>
                                        <el-input style="width: 75%;margin-left: 25px"
                                                  v-model="chosenObject.uuid"></el-input>
                                    </div>
                                    <div class="ele_box"><span>类型</span><span style="margin-left: 20%">{{chosenObject.type}}</span>
                                    </div>
                                    <div class="ele_box"><span>位置</span>
                                        <span style="margin-left: 3%">X:</span>
                                        <el-input style="width: 15%"
                                                  v-model="chosenObject.position.x"></el-input>
                                        <span style="margin-left: 8%">Y:</span>
                                        <el-input style="width: 15%"
                                                  v-model="chosenObject.position.y"></el-input>
                                        <span style="margin-left: 8%">Z:</span>
                                        <el-input style="width: 15%"
                                                  v-model="chosenObject.position.z"></el-input>
                                    </div>
                                    <div class="ele_box"><span>旋转</span>
                                        <span style="margin-left: 3%">X:</span>
                                        <el-input style="width: 15%"
                                                  v-model="chosenObject.rotation.x"></el-input>
                                        <span style="margin-left: 8%">Y:</span>
                                        <el-input style="width: 15%"
                                                  v-model="chosenObject.rotation.y"></el-input>
                                        <span style="margin-left: 8%">Z:</span>
                                        <el-input style="width: 15%"
                                                  v-model="chosenObject.rotation.z"></el-input>
                                    </div>
                                    <div class="ele_box"><span>缩放</span>
                                        <span style="margin-left: 3%">X:</span>
                                        <el-input style="width: 15%"
                                                  v-model="chosenObject.scale.x"></el-input>
                                        <span style="margin-left: 8%">Y:</span>
                                        <el-input style="width: 15%"
                                                  v-model="chosenObject.scale.y"></el-input>
                                        <span style="margin-left: 8%">Z:</span>
                                        <el-input style="width: 15%"
                                                  v-model="chosenObject.scale.z"></el-input>
                                    </div>
                                </div>
                                <div style="text-align: center;padding-top: 20px">
                                    <el-button type="primary" style="width: 65%" @click="sceneNameDialog = true">保存场景
                                    </el-button>
                                    <el-dialog
                                            top="30vh"
                                            title="请输入场景名"
                                            :visible.sync="sceneNameDialog"
                                            width="15%"
                                            center
                                            :close-on-click-modal="false">
                                        <div v-loading="sceneLoading"
                                             element-loading-text="拼命保存中"
                                             element-loading-spinner="el-icon-loading">
                                        <el-input v-model="sceneName" placeholder="场景名"></el-input>
                                        </div>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="sceneNameDialog = false">取 消</el-button>
                                            <el-button type="primary" @click="saveScene">确 定</el-button>
                                        </span>
                                    </el-dialog>
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
                            <el-tab-pane label="设置">
                                <div style="color: #606266">视窗</div>
                                <div class="view_box">
                                    <el-checkbox v-model="gridChecked" @change="showGrid">网格</el-checkbox>
                                    <el-checkbox v-model="axesChecked" @change="showAxes" style="margin-left: 50px">
                                        坐标
                                    </el-checkbox>
                                </div>
                                <el-divider></el-divider>
                                <div style="color: #606266">辅助工具</div>
                                <div class="fps_box">
                                    <el-checkbox v-model="fpsChecked" @change="showFps">帧率监控</el-checkbox>
                                </div>
                                <div class="drag_box">
                                    <el-checkbox v-model="dragChecked" @change="freeDrag">自由拖拽</el-checkbox>
                                </div>
                                <el-divider></el-divider>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
                <el-col :xs="24" :md="16" :lg="19">
                    <div id="box" style="position: absolute; left: 80%"></div>
                    <div class="space" style="" id="container"></div>
                </el-col>
            </el-row>
        </div>
    </el-scrollbar>
</template>

<script>
    import * as THREE from 'three';
    import * as dat from 'dat.gui';
    import Stats from "three/examples/jsm/libs/stats.module.js";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
    import {STLLoader} from "three/examples/jsm/loaders/STLLoader.js";
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
                showNum: 10,
                currentPage: 1,

                //场景
                loadSceneUrl: '',
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
                modelType: '',
                gui1: null,
                gui2: null,
                gui3: null,
                stats: null,
                moveRobotFlag: true,
                moveBeltFlag: true,
                moveMachineFlag: true,
                robot: {
                    joint1: 0,
                    joint2: 0,
                    joint3: 0,
                    joint4: 0,
                    joint5: 0,
                    joint6: 0,
                },
                links: {
                    link1: null,
                    link2: null,
                    link3: null,
                    link4: null,
                    link5: null,
                    link6: null,
                },
                inputDH: {
                    d1: 399,
                    a2: 0,
                    d2: 0,
                    a3: 350,
                    a4: 42,
                    d4: 351,
                    d6: 82,
                },
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
                sceneLoading: false,

                //3D渲染
                scene: '',
                camera: '',
                renderer: '',
                controls: '',
                light1: '',
                light2: '',
                light3: '',
                grid: '',
                axes: '',
                sceneNameDialog: false,
                sceneName: '',
                //地面mesh
                groundMesh: '',
                //是否显示网格和坐标轴
                gridChecked: true,
                axesChecked: true,
                fpsChecked: true,
                dragChecked: true,
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
                transformControls: '',
                dragControls: '',
            }
        },
        computed: {
            username() {
                return localStorage.getItem('ms_username');
            }
        },
        watch: {
            'loadSceneUrl': {
                handler(newUrl, oldUrl) {
                    // console.log(newUrl);
                    this.scene = new THREE.Scene();
                    this.$http.get('scene/sceneFile/' + newUrl + '.json').then(res => {
                        console.log(res);
                        let sceneLoader = new THREE.ObjectLoader();
                        this.scene = sceneLoader.parse(res.data);
                        console.log(this.scene);
                        this.sceneObjs = {};
                        this.getChild();
                        this.objects = [];
                        for (let i = 0; i < this.scene.children.length; i++) {
                            if (this.scene.children[i].type === 'Mesh') {
                                this.objects.push(this.scene.children[i]);
                            }
                        }
                        this.scene.children[3] = this.transformControls;
                        this.scene.children[4] = this.grid;
                        this.scene.children[5] = this.axes;
                        this.initDragControls();
                    })
                }
            }
        },
        methods: {
            //加载场景
            loadScene() {
                this.bus.$on('edit', data => {
                    this.loadSceneUrl = data;
                    console.log(this.loadSceneUrl);
                })
            },
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
                this.showPanel(this.chosenObject);
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
            //3D渲染
            initScene() {
                //获取dom节点
                let container = document.getElementById('container');
                //初始化场景
                this.scene = new THREE.Scene();
                this.light1 = new THREE.AmbientLight('#999999');//添加环境光
                this.light1.name = 'AmbientLight';
                this.scene.add(this.light1);
                this.light2 = new THREE.DirectionalLight(0xdfebff, 0.45);//从正上方（不是位置）照射过来的平行光，0.45的强度
                this.light2.position.set(50, 200, 100);
                this.light2.name = 'DirectionalLight1';
                this.scene.add(this.light2);
                this.light3 = new THREE.DirectionalLight(0xdfebff, 0.45);
                this.light3.position.set(-50, 200, -100);
                this.light3.name = 'DirectionalLight2'
                this.scene.add(this.light3);
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
                //初始化平移控件
                this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
                this.transformControls.name = 'TransformControls'
                this.scene.add(this.transformControls);
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
                //初始化帧率检测
                this.stats = new Stats();
                this.stats.domElement.style.position = 'absolute';
                this.stats.domElement.style.left = '21%';
                container.appendChild(this.stats.dom);
            },
            animate() {
                this.controls.update();
                this.stats.update();
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(this.animate);
            },
            //保存场景
            saveScene() {
                this.sceneLoading = true;
                let formData = new FormData();
                this.renderer.render(this.scene, this.camera);
                let sceneImg = this.renderer.domElement.toDataURL('image/jpeg');
                sceneImg = sceneImg.replace('data:image/jpeg;base64,', '');
                // console.log(sceneImg);
                let scene = JSON.stringify(this.scene.toJSON());
                // console.log(scene);
                formData.append('sceneName', this.sceneName);
                formData.append('createUser', this.username);
                formData.append('sceneCover', sceneImg);
                formData.append('scene', scene);
                this.$http.post('http://localhost:8080/scene/add', formData).then(res => {
                    console.log(res);
                    this.cleanSceneName();
                })
            },
            cleanSceneName() {
                this.sceneName = '';
                this.sceneLoading = false;
                this.sceneNameDialog = false;
            },
            // 加载模型
            loadFbxModel(baseUrl, modelUrl) {
                this.loading = true;
                let model = {};
                // let fbxLoader = new FBXLoader;
                let stlLoader = new STLLoader();
                stlLoader.setPath(baseUrl);
                new Promise(resolve => {
                    modelUrl.forEach(a => {
                        stlLoader.load(a + '.stl', fbx => {
                                console.log(a);
                                // console.log(fbx);
                                let geo = fbx
                                let mat = new THREE.MeshPhysicalMaterial({color: '#DDD9D9'});
                                model[a] = new THREE.Mesh(geo, mat);
                                // model[a] = fbx;
                                // this.scene.add(fbx);
                                if (Object.keys(model).length !== modelUrl.length) return;
                                resolve(model);
                            }
                        )
                    })
                }).then(model => {
                    console.log(model);
                    this.setModel(model);
                })

            },
            //配置模型
            setModel(model) {
                for (let i = 0; i < this.modelUrls.length - 1; i++) {
                    model[this.modelUrls[i]].add(model[this.modelUrls[i + 1]]);
                }
                console.log(model);
                this.setDH(model);
                model[this.modelUrls[0]].position.set(this.position.x, this.position.y, this.position.z);
                model[this.modelUrls[0]].scale.set(this.scale.x, this.scale.y, this.scale.z);
                model[this.modelUrls[0]].name = this.modelName;
                model[this.modelUrls[0]].userData['type'] = this.modelType;
                this.scene.add(model[this.modelUrls[0]]);
                this.objects.push(model[this.modelUrls[0]]);
                this.cleanData();
                this.getChild();
                this.initDragControls(model);
            },
            //更具DH参数设置position
            setDH(model) {
                let matrix = {};
                matrix[0] = new THREE.Matrix4().set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                matrix[1] = new THREE.Matrix4().set(1, 0, 0, 0, 0, 1, 0, this.inputDH.d1 * 0.1, 0, 0, 1, 0, 0, 0, 0, 1);
                matrix[2] = new THREE.Matrix4().set(1, 0, 0, this.inputDH.a2 * 0.1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                matrix[3] = new THREE.Matrix4().set(1, 0, 0, 0, 0, 1, 0, this.inputDH.a3 * 0.1, 0, 0, 1, 0, 0, 0, 0, 1);
                matrix[4] = new THREE.Matrix4().set(1, 0, 0, this.inputDH.d4 * 0.1, 0, 1, 0, this.inputDH.a4 * 0.1, 0, 0, 1, 0, 0, 0, 0, 1);
                matrix[5] = new THREE.Matrix4().set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                matrix[6] = new THREE.Matrix4().set(1, 0, 0, this.inputDH.d6 * 0.1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                console.log(matrix);
                for (let i = 0; i < this.modelUrls.length; i++) {
                    model[this.modelUrls[i]].applyMatrix4(matrix[i]);
                }
            },
            //选择要控制的模型种类，显示相应手动控制面板
            showPanel(model) {
                const modelType = model.userData.type;
                const container = document.getElementById('box');
                if (modelType === '机械臂') {
                    container.appendChild(this.gui1.domElement);
                    this.gui2.hide();
                    this.gui3.hide();
                    this.robotArmSet();
                    if (this.moveRobotFlag) {
                        this.moveRobotArm();
                        this.moveRobotFlag = false;
                    }
                    this.gui1.show();
                }
                if (modelType === '传送带') {
                    container.appendChild(this.gui2.domElement);
                    this.gui1.hide();
                    this.gui3.hide();
                    this.gui2.show();
                    this.beltSet();
                    if (this.moveBeltFlag) {
                        this.moveBelt();
                        this.moveBeltFlag = false;
                    }
                }
                if (modelType === '机床') {
                    container.appendChild(this.gui3.domElement);
                    this.gui1.hide();
                    this.gui2.hide();
                    this.gui3.show();
                    this.machineSet();
                    if (this.moveMachineFlag) {
                        this.moveMachine();
                        this.moveMachineFlag = false;
                    }
                }
            },
            //初始化模型运动手动控制面板
            initGui() {
                this.gui1 = new dat.GUI();
                this.gui1.hide();
                this.gui2 = new dat.GUI();
                this.gui2.hide();
                this.gui3 = new dat.GUI();
                this.gui3.hide();
            },
            //设置机械臂运动
            robotArmSet() {
                this.links.link1 = this.chosenObject.children[0];
                this.links.link2 = this.links.link1.children[0];
                this.links.link3 = this.links.link2.children[0];
                this.links.link4 = this.links.link3.children[0];
                this.links.link5 = this.links.link4.children[0];
                this.links.link6 = this.links.link5.children[0];
            },
            //运动机械臂
            moveRobotArm() {
                let joint1Controller = this.gui1.add(this.robot, 'joint1', -165, 165).step(1).name('轴一');
                joint1Controller.onChange(val => {
                    this.links.link1.rotation.y = THREE.MathUtils.degToRad(val);
                });
                let joint2Controller = this.gui1.add(this.robot, 'joint2', -110, 110).step(1).name('轴二');
                joint2Controller.onChange(val => {
                    this.links.link2.rotation.z = THREE.MathUtils.degToRad(val);
                });
                let joint3Controller = this.gui1.add(this.robot, 'joint3', -110, 75).step(1).name('轴三');
                joint3Controller.onChange(val => {
                    this.links.link3.rotation.z = THREE.MathUtils.degToRad(val);
                });
                let joint4Controller = this.gui1.add(this.robot, 'joint4', -160, 160).step(1).name('轴四');
                joint4Controller.onChange(val => {
                    this.links.link4.rotation.x = THREE.MathUtils.degToRad(val);
                });
                let joint5Controller = this.gui1.add(this.robot, 'joint5', -120, 120).step(1).name('轴五');
                joint5Controller.onChange(val => {
                    this.links.link5.rotation.z = THREE.MathUtils.degToRad(val);
                });
                let joint6Controller = this.gui1.add(this.robot, 'joint6', -400, 400).step(1).name('轴六');
                joint6Controller.onChange(val => {
                    this.links.link6.rotation.x = THREE.MathUtils.degToRad(val);
                });
            },
            //设置传送带运动关节
            beltSet() {
                console.log('设置传送带运动关节');
            },
            //运动传送带
            moveBelt() {
                let folder = this.gui2.addFolder('传送带');
            },
            //设置机床运动关节
            machineSet() {
                console.log('设置机床运动关节');
            },
            //运动机床
            moveMachine() {
                let folder = this.gui3.addFolder('机床')
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

                self.dragControls = new DragControls(self.objects, self.camera, self.renderer.domElement);
                // 鼠标略过事件
                self.dragControls.addEventListener('hoveron', function (event) {
                    // 让变换控件对象和选中的对象绑定
                    self.transformControls.attach(event.object);
                });
                // 开始拖拽
                self.dragControls.addEventListener('dragstart', function (event) {
                    self.controls.enabled = false;
                });
                // 拖拽结束
                self.dragControls.addEventListener('dragend', function (event) {
                    self.controls.enabled = true;
                });
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
            //是否显示帧率
            showFps(showFps) {
                let container = document.getElementById('container');
                if (showFps) {
                    container.appendChild(this.stats.dom);
                } else {
                    container.removeChild(this.stats.dom);
                }
            },
            //是否开启自由拖拽
            freeDrag(dragFlag) {
                this.transformControls.enabled = dragFlag;
                this.dragControls.enabled = dragFlag;
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
                this.modelType = row.modelType;
                this.dialogVisible = true;
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
            this.loadScene();
            this.searchModelByKeyword('');
            this.initScene();
            this.animate();
            this.getChild();
            this.initGui();
            window.onresize = () => this.resize();
        },
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

    .background_set {
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

    /deep/ .el-input__inner {
        padding: 5px;
    }

    .view_box {
        margin-top: 25px;
    }

    .fps_box {
        margin-top: 25px;
    }

    .drag_box {
        margin-top: 25px;
    }

    /*渲染空间*/
    .space {
        height: 700px;
        background-color: gray;
    }
</style>
