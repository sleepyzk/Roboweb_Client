<template>
    <el-row>
        <el-col :lg="24">
            <div id="box" style="position: absolute; left: 80%"></div>
            <div id="container" style="height: 837px;width: 100%"></div>
        </el-col>
    </el-row>
</template>

<script>
    import * as THREE from 'three';
    import * as dat from 'dat.gui';
    import Stats from "three/examples/jsm/libs/stats.module.js";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import {STLLoader} from "three/examples/jsm/loaders/STLLoader.js";
    import {TransformControls} from 'three/examples/jsm/controls/TransformControls';
    import {DragControls} from 'three/examples/jsm/controls/DragControls';

    const Kinematics = require('kinematics').default

    export default {
        name: "Simulation",
        data() {
            return {
                scene: '',
                camera: '',
                renderer: '',
                controls: '',
                light1: '',
                light2: '',
                light3: '',
                grid: '',
                axes: '',
                gui: '',
                objects: [],
                transformControls: '',
                baseUrl: '/model/modelFile/abb1200stl/',
                modelUrls: ['base', 'link1', 'link2', 'link3', 'link4', 'link5', 'link6'],
                inputDH: {
                    d1: 399,
                    a2: 0,
                    d2: 0,
                    a3: 350,
                    a4: 42,
                    d4: 351,
                    d6: 82,
                },
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
            }
        },
        methods: {
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
                this.camera.position.set(200, 150, 100);
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
                container.appendChild(this.stats.dom);
                //加载模型
                this.loadModel(this.baseUrl, this.modelUrls);
            },
            loadModel(baseUrl, modelUrl) {
                this.loading = true;
                let model = {};
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
                model[this.modelUrls[0]].position.set(0, 0, 0);
                model[this.modelUrls[0]].userData['type'] = this.modelType;
                this.scene.add(model[this.modelUrls[0]]);
                this.objects.push(model[this.modelUrls[6]]);
                this.initDragControls(model);
                this.initGui(model);
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
                for (let i = 0; i < this.modelUrls.length; i++) {
                    model[this.modelUrls[i]].applyMatrix4(matrix[i]);
                }
            },
            //初始化拖拽控制器
            initDragControls() {
                let self = this;
                // self.transformControls.detach();
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
            initGui(model) {
                this.gui = new dat.GUI();
                let box = document.getElementById('box');
                box.appendChild(this.gui.domElement);

                let joint1Controller = this.gui.add(this.robot, 'joint1', -165, 165).step(1).name('轴一');
                joint1Controller.onChange(val => {
                    model.link1.rotation.y = THREE.MathUtils.degToRad(val);
                });
                let joint2Controller = this.gui.add(this.robot, 'joint2', -110, 110).step(1).name('轴二');
                joint2Controller.onChange(val => {
                    model.link2.rotation.z = THREE.MathUtils.degToRad(val);
                });
                let joint3Controller = this.gui.add(this.robot, 'joint3', -110, 75).step(1).name('轴三');
                joint3Controller.onChange(val => {
                    model.link3.rotation.z = THREE.MathUtils.degToRad(val);
                });
                let joint4Controller = this.gui.add(this.robot, 'joint4', -160, 160).step(1).name('轴四');
                joint4Controller.onChange(val => {
                    model.link4.rotation.x = THREE.MathUtils.degToRad(val);
                });
                let joint5Controller = this.gui.add(this.robot, 'joint5', -120, 120).step(1).name('轴五');
                joint5Controller.onChange(val => {
                    model.link5.rotation.z = THREE.MathUtils.degToRad(val);
                });
                let joint6Controller = this.gui.add(this.robot, 'joint6', -400, 400).step(1).name('轴六');
                joint6Controller.onChange(val => {
                    model.link6.rotation.x = THREE.MathUtils.degToRad(val);
                });
            },
            //运动学
            kinematic(){
                const geo = [
                    [0,39.9,0],
                    [0,0,0],
                    [0,35,0],
                    [35.1,0,0],
                    [0,0,0],
                ];
                const RobotKin = new Kinematics(geo);
                // console.log(RobotKin);
                let angles = [0,0,0,0,0,0];
                const pose = RobotKin.forward(...angles)[5];
                console.log(pose);
                angles = RobotKin.inverse(...pose);
                console.log(angles);
            },
            animate() {
                this.controls.update();
                this.stats.update();
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(this.animate);
            },
            //渲染窗口自适应
            resize() {
                let container = document.getElementById('container');
                this.renderer.setSize(container.clientWidth, container.clientHeight);
                this.camera.aspect = container.clientWidth / container.clientHeight;
                this.camera.updateProjectionMatrix();
            },
        },
        mounted() {
            this.initScene();
            this.animate();
            this.kinematic();
            window.onresize = () => this.resize();
        }
    }
</script>

<style scoped>

</style>
