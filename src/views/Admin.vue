<template>
    <div>
        <h1>用户管理</h1>
        <el-button @click="getUsers">获取用户</el-button>
    </div>
</template>

<script>
    export default {
        name: "admin",
        data() {
            return {}
        },
        methods: {
            getUsers(){
                this.$http.get('http://localhost:8080/user/all').then(res=>{
                    console.log(res.data);
                })
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
