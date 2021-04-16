<template>
    <div class="homepage-hero-module">
        <div class="video-container">
            <div :style="fixStyle" class="filter">
                <!--登录框-->
                <div class="ms-login">
                    <div class="ms-title">仿真分析系统</div>
                    <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                        <el-form-item prop="username">
                            <el-input v-model="param.username" placeholder="用户名">
                                <el-button slot="prepend" icon="el-icon-user"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                    type="password"
                                    placeholder="密码"
                                    v-model="param.password"
                                    @keyup.enter.native="submitForm()"
                            >
                                <el-button slot="prepend" icon="el-icon-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm">登录</el-button>
                        </div>
                        <p class="login-tips">Tips : 请使用认证账户登录。</p>
                    </el-form>
                </div>
            </div>
            <video :style="fixStyle" autoplay loop muted="muted" class="fillWidth" v-on:canplay="canplay">
                <source src="../assets/video/video3.mp4" type="video/mp4"/>
                浏览器不支持 video 标签，建议升级浏览器。
            </video>
            <div class="poster hidden" v-if="!videoCanPlay">
                <img :style="fixStyle" src="没有播放时的图片路径" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                videoCanPlay: false,
                fixStyle: '',
                param: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },

            }
        },
        methods: {
            canplay() {
                this.videoCanPlay = true
            },
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        this.$message.success('登录成功');
                        localStorage.setItem('ms_username', this.param.username);
                        this.$router.push('/home');
                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        },
        mounted: function () {
            window.onresize = () => {
                const windowWidth = document.body.clientWidth
                const windowHeight = document.body.clientHeight
                const windowAspectRatio = windowHeight / windowWidth
                let videoWidth
                let videoHeight
                if (windowAspectRatio < 0.5625) {
                    videoWidth = windowWidth
                    videoHeight = videoWidth * 0.5625
                    this.fixStyle = {
                        height: windowWidth * 0.5625 + 'px',
                        width: windowWidth + 'px',
                        'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
                        'margin-left': 'initial'
                    }
                } else {
                    videoHeight = windowHeight
                    videoWidth = videoHeight / 0.5625
                    this.fixStyle = {
                        height: windowHeight + 'px',
                        width: windowHeight / 0.5625 + 'px',
                        'margin-left': (windowWidth - videoWidth) / 2 + 'px',
                        'margin-bottom': 'initial'
                    }
                }
            }
            window.onresize()
        }
    }
</script>

<style scoped>
    .homepage-hero-module,
    .video-container {
        position: relative;
        height: 100vh;
        overflow: hidden;
    }

    .video-container .poster img,
    .video-container video {
        z-index: 0;
        position: absolute;
    }

    .video-container .filter {
        z-index: 1;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
    }
    /*登录框*/
    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }
    .ms-content {
        padding: 30px 30px;
    }
    .login-btn {
        text-align: center;

    }
    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }
    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }

</style>
