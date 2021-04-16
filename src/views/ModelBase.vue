<template>
    <el-scrollbar style="height: 100%">
        <div>
            <el-row class="top">
                <div class="title">所有模型</div>
                <el-col class="search_box" :xs="12" :sm="8" :lg="5">
                    <el-input v-model="keyWord" placeholder="请输入关键字" @keyup.enter.native="searchByKeyWord(keyWord)">
                        <template slot="append">
                            <el-button type="primary" plain @click="searchByKeyWord(keyWord)">搜索</el-button>
                        </template>
                    </el-input>
                </el-col>
            </el-row>
            <div class="nav">
                <el-row>
                    <el-col class="nav_text" :xs="16" :sm="16" :lg="12">
                        <span>类别：</span>
                        <el-radio-group v-model="modelClass" size="mini" @change="searchByKeyWord">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="机械臂"></el-radio-button>
                            <el-radio-button label="传送带"></el-radio-button>
                            <el-radio-button label="机床"></el-radio-button>
                        </el-radio-group>
                    </el-col>
                    <el-col class="nav_upload" :xs="8" :sm="5" :lg="3">
                        <el-button type="success" style="width: 100%" @click="uploadBox=true"><i
                                class="el-icon-folder-add"></i> 模型上传
                        </el-button>
                        <el-dialog :visible.sync="uploadBox" title="模型上传" :close-on-click-modal=false width="30%">
                            <el-form :model="uploadModelForm" :rules="uploadRules" ref="uploadModelForm"
                                     label-width="30%">
                                <el-form-item label="模型名称" class="form_item" prop="name">
                                    <el-input v-model="uploadModelForm.name" placeholder="请输入模型名称"></el-input>
                                </el-form-item>
                                <el-form-item label="模型类别" class="form_item" prop="type">
                                    <el-select v-model="uploadModelForm.type" placeholder="请选择模型类别">
                                        <el-option label="机械臂" value="机械臂"></el-option>
                                        <el-option label="传送带" value="传动带"></el-option>
                                        <el-option label="机床" value="机床"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="模型格式" class="form_item" prop="format">
                                    <el-select v-model="uploadModelForm.format"
                                               placeholder="请选择模型文件格式">
                                        <el-option label="fbx" value="fbx"></el-option>
                                        <el-option label="gltf" value="gltf"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="fileList" label="模型上传" class="form_item">
                                    <el-upload
                                            class="upload-demo"
                                            ref="modelUpload"
                                            action="#"
                                            multiple
                                            accept=".fbx,.gltf"
                                            :file-list="uploadModelForm.fileList"
                                            :on-change="modelFileChange"
                                            :on-remove="modelFileRemove"
                                            :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                        <div slot="tip" class="el-upload__tip">请上传规范命名模型文件</div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item prop="imgList" label="封面上传" class="form_item">
                                    <el-upload
                                            class="upload-demo"
                                            ref="imgUpload"
                                            action="#"
                                            :limit="1"
                                            accept=".jpg,.png"
                                            :file-list="uploadModelForm.imgList"
                                            :on-change="imgFileChange"
                                            :on-remove="imgFileRemove"
                                            :auto-upload="false"
                                            list-type="picture">
                                        <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
                                        <div slot="tip" class="el-upload__tip">请上传jpg/png格式图片(限一张)</div>
                                    </el-upload>
                                </el-form-item>
                            </el-form>
                            <div style="text-align: center">
                                <el-button type="primary" @click="submitForm('uploadModelForm')">上传</el-button>
                                <el-button @click="resetForm('uploadModelForm')">取消</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                </el-row>
            </div>
            <div class="base">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" class="base_box" v-for="(item,index) in showModels"
                            :key="item.index">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <el-image
                                    :src="'http://model.3dmomoda.com/models/b407539f4a734223bec484e80d9d7058/1/screenshot.jpg'"
                                    class="image" @click="getInfo(item.id)"></el-image>
                            <div class="card_sub">
                                <div class="sub_title">
                                    <span>{{item.modelName}}</span>
                                </div>
                                <div class="sub_button">
                                    <el-button size="mini" type="primary" @click="getInfo(item.id)">详情</el-button>
                                    <el-button size="mini" type="success" @click="downloadModel(item.modelName)">下载
                                    </el-button>
                                </div>
                            </div>
                        </el-card>
                        <el-dialog :title="modelDetail.modelName" :visible.sync="detailBox"
                                   :fullscreen="detailBoxFullScreen" :close-on-click-modal=false destroy-on-close>
                            <el-row :gutter="10">
                                <el-col :xs="18" :sm="18">
                                    <div class="model_box" id="container"></div>
                                </el-col>
                                <el-col :xs="6" :sm="6">
                                    <div class="para_box">
                                        <div class="detail_title"><span>{{modelDetail.modelName}}</span></div>
                                        <el-divider></el-divider>
                                        <div class="detail_info">
                                            <span>模型类别：</span><span>{{modelDetail.modelType}}</span></div>
                                        <div class="detail_info">
                                            <span>上传用户：</span><span>{{modelDetail.uploadUser}}</span>
                                        </div>
                                        <div class="detail_info">
                                            <span>上传时间：</span><span>{{modelDetail.uploadTime}}</span>
                                        </div>
                                        <div class="detail_info">
                                            <span>模型格式：</span><span>{{modelDetail.fileFormat}}</span>
                                        </div>
                                        <div class="detail_info"><span>文件大小：</span><span>{{modelDetail.fileSize}}</span>
                                        </div>
                                        <div class="detail_info">
                                            <span>下载次数：</span><span>{{modelDetail.downloadTimes}}</span>
                                        </div>
                                        <el-button type="primary" @click="preview">预览</el-button>
                                        <el-button class="detail_button" type="success"
                                                   @click="downloadModel(modelDetail.modelName)">下载
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-dialog>
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

    import * as THREE from 'three';
    import * as dat from 'dat.gui';
    import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

    export default {
        name: "ModelBase",
        data() {
            return {
                //搜索栏
                keyWord: '',

                //导航栏
                modelClass: '',
                uploadBox: false,
                formDate: new FormData(),
                uploadModelForm: {
                    name: '',
                    type: '',
                    format: '',
                    fileList: [],
                    imgList: [],
                    uploadFile: [],
                    uploadImg: []
                },
                uploadRules: {
                    name: [
                        {required: true, message: '模型名称不能为空', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '模型类别不能为空', trigger: 'change'}
                    ],
                    format: [
                        {required: true, message: '模型文件格式不能为空', trigger: 'change'}
                    ],
                },

                //分页栏
                total: null,
                showNum: 8,
                currentPage: 1,
                showModels: [],
                modelList: [],
                modelDetail: {
                    modelName: '',
                    modelType: '',
                    uploadUser: '',
                    uploadTime: '',
                    fileFormat: '',
                    fileSize: '',
                    downloadTimes: ''
                },

                //模型预览框
                detailBox: false,
                detailBoxFullScreen: false,
                scene: '',
                camera: '',
                renderer: '',
                light: '',
                controls: '',
                baseUrl: '',
                modelUrls: []
            }
        },
        computed: {
            username() {
                return localStorage.getItem('ms_username');
            }
        },
        methods: {
            //按关键字搜索，无关键字则查所有
            searchByKeyWord(key) {
                console.log('搜索关键字：' + key);
                this.$http.get('http://localhost:8080/model/find', {params: {keyword: key}}).then(res => {
                    console.log(res.data.data);
                    this.modelList = res.data.data;
                    console.log(this.modelList);
                    this.total = this.modelList.length;
                    this.updateShowModel();
                });
            },
            //获取模型信息
            getInfo(id) {
                console.log(id);
                this.$http.get('http://localhost:8080/model/findOne', {params: {id: id}}).then(res => {
                    this.modelDetail = res.data.data;
                    console.log(this.modelDetail);
                })
                this.detailBox = true;
            },
            //预览模型
            preview() {
                this.initModel();
                this.animate();
            },
            //初始化场景预览模型
            initModel() {
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
                this.camera.position.set(10, 90, 500);
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
                //加载模型
                // this.loadModel();
                //渲染
                // this.animate();
                console.log(container);
            },
            //模型加载器
            loadModel() {
                let fbxLoader = new FBXLoader();
                fbxLoader.setPath(this.baseUrl);
            },
            //渲染
            animate() {
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(this.animate);
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
                this.showModels = this.modelList.slice(startPage, endPage);
                console.log(this.showModels);
            },

            //模型文件改变
            modelFileChange(file, fileList) {
                this.uploadModelForm.uploadFile.push(file.raw);
                console.log(this.uploadModelForm.uploadFile);
            },
            //图片文件改变
            imgFileChange(file, fileList) {
                this.uploadModelForm.uploadImg.push(file.raw);
                console.log(this.uploadModelForm.uploadImg);
            },
            //删除模型文件
            modelFileRemove(file, fileList) {
                this.uploadModelForm.uploadFile.splice(this.uploadModelForm.uploadFile.indexOf(file.raw), 1);
                console.log(this.uploadModelForm.uploadFile);
            },
            //删除封面文件
            imgFileRemove(file, fileList) {
                this.uploadModelForm.uploadImg.pop();
                console.log(this.uploadModelForm.uploadImg);
            },
            //表单提交
            submitForm(formName) {
                let fileCheck = false;
                if (this.uploadModelForm.uploadFile.length !== 0 && this.uploadModelForm.uploadImg.length !== 0) {
                    fileCheck = true;
                } else {
                    this.$message({
                        type: 'warning',
                        message: '上传文件/封面不能为空'
                    })
                }
                this.$refs[formName].validate((valid) => {
                    if (valid && fileCheck) {
                        //封装数据
                        this.formDate.append('userName', this.username);
                        this.formDate.append('modelName', this.uploadModelForm.name);
                        this.formDate.append('modelType', this.uploadModelForm.type);
                        this.formDate.append('fileFormat', this.uploadModelForm.format);
                        this.formDate.append('coverImg', this.uploadModelForm.uploadImg[0]);
                        this.uploadModelForm.uploadFile.forEach(file => {
                            this.formDate.append('modelFiles', file);
                        })
                        //axios上传
                        this.$http.post('http://localhost:8080/model/add', this.formDate).then(res => {
                            console.log(res.data.msg);
                            if (res.data.code === 1000) {
                                this.resetForm('uploadModelForm');
                                this.$message({
                                    type: 'success',
                                    message: '上传成功'
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '上传失败'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //表单重置
            resetForm(formName) {
                this.formDate = new FormData();
                this.uploadModelForm.uploadFile = [];
                this.uploadModelForm.uploadImg = [];
                this.$refs[formName].resetFields();
                console.log(this.uploadModelForm.uploadFile);
                console.log(this.uploadModelForm.uploadImg);
            },

            //下载模型
            downloadModel(modelName) {
                console.log('下载模型' + modelName);
                this.$http.get('http://localhost:8080/model/downloadZip',
                    {params: {modelName: modelName}, responseType: 'blob'}).then(res => {
                    console.log(res);
                    const blob = new Blob([res.data], {type: 'application/zip'})
                    let fileName = modelName;
                    if ('download' in document.createElement('a')) {
                        // 非IE下载
                        const eLink = document.createElement('a')
                        eLink.download = fileName;
                        eLink.style.display = 'none';
                        eLink.href = URL.createObjectURL(blob);
                        document.body.appendChild(eLink);
                        eLink.click();
                        URL.revokeObjectURL(eLink.href); // 释放URL 对象
                        document.body.removeChild(eLink);
                    } else {
                        // IE10+下载
                        navigator.msSaveBlob(blob, fileName);
                    }
                }).catch((error) => {
                    console.log(error);
                })

            },
        },
        mounted() {
            this.searchByKeyWord('');
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

    .form_item {
        width: 80%;
    }

    /deep/ .el-upload--text {
        width: 80px;
        height: 32px;
        border: none;
        border-radius: 3px;
        box-sizing: unset;
        margin-bottom: -10px;

    }

    /deep/ .el-upload__tip {
        margin-top: -5px;
        margin-bottom: -10px;
    }

    /deep/ .el-upload-list__item-name {
        margin-bottom: -10px;
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

    .model_box {
        background-color: #434a50;
        height: 50vh;
        width: 100%;
        margin-top: -30px;
        position: relative;
    }

    /* canvas /deep/{*/
    /*    position: absolute;*/
    /*    z-index:3;*/
    /*}*/
    .para_box {
        background-color: #f5f7fa;
        height: 50vh;
        margin-top: -30px;
        position: relative;
    }

    .detail_title {
        font-size: 20px;
        padding: 20px 0 0 20px;
    }

    .detail_info {
        margin: 20px 0 0 20px;
        font-size: 10px;
    }

    .detail_button {
        width: 80%;
        position: absolute;
        bottom: 5%;
        left: 10%;
    }

    /*分页栏*/
    .block {
        float: right;
        margin: 0 5% 20px 0;
    }

</style>
