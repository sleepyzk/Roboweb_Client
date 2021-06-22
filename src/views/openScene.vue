<template>
    <div id="container" style="width: 100%;height: 100%"></div>
</template>

<script>
    import * as THREE from 'three';
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import {TransformControls} from "three/examples/jsm/controls/TransformControls";
    import Stats from "three/examples/jsm/libs/stats.module";

    export default {
        name: "openScene",
        data() {
            return {
                openSceneName: '',
                scene: '',
                camera: '',
                renderer: '',
                controls: '',
                light1: '',
                light2: '',
                light3: '',
                stats: null,
            }
        },
        methods: {
            //获取传递过来的场景名作为路径参数
            getSceneName() {
                this.openSceneName = this.$route.query.sceneName;
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
                //初始化帧率检测
                this.stats = new Stats();
                container.appendChild(this.stats.dom);
            },
            animate() {
                this.controls.update();
                this.stats.update();
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(this.animate);
            },
            importScene() {
                this.$http.get('scene/sceneFile/' + this.openSceneName + '.json').then(res => {
                    let sceneLoader = new THREE.ObjectLoader();
                    this.scene = sceneLoader.parse(res.data);
                    console.log(this.scene);
                })
            }
        },
        created() {
            this.getSceneName();
        },
        mounted() {
            this.importScene();
            this.initScene();
            this.animate();
        }
    }
</script>

<style scoped>

</style>
