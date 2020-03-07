<template>
    <div class="container">
        <el-form ref="form" :model="form" label-width="80px" class="login-page" :rules="rules">
            <h2 style="text-align:center">登录</h2>
            <el-form-item label="用  户:" prop="userName">
                <el-input v-model="form.userName" placeholder="请输入用户名">
                    <el-button slot="prepend" icon="el-icon-user"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="密 码:">
                <el-input v-model="form.password" type="password" placeholder="请输入密码">
                    <el-button slot="prepend" icon="el-icon-key"></el-button>
                </el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-user-solid" @click="login">登 录</el-button>
        </el-form>
    </div>
</template>
<script>
import Home from '@/views/Home.vue';
import qs from 'qs'
export default {
    data () {
        return {
            form: {
                userName: "",
                password: ""
            },
            rules: {
                userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            },
            params: [],
        };
    },
    components: {
        Home
    },
    methods: {
        login () {
            let status = "0";
            if (this.form.userName == '') {
                this.$message({
                    type: 'warning',
                    message: '请输入用户名'
                });
            } else if (this.form.password == '') {
                this.$message({
                    type: 'warning',
                    message: '请输入密码'
                });
            } else if (this.password != '' && this.userName != '') {
                var url = 'http://localhost:8080/user/login';
                this.params = {
                    userName: this.form.userName,
                    password: this.form.password,
                };
                let that = this;
                this.axios.post(url, qs.stringify(this.params)).then(function (res) {
                    if (res.data !== "") {
                        that.$router.push({ name: 'home', query:{userName:res.data}});
                    } else {
                        that.$message({
                            type: 'warning',
                            message: '密码或用户名错误'
                        });
                    }
                });
            }
        }
    }
}

</script>
<style scoped>
.container {
    margin-top: 200px;
    width: 100%;
    height: 100%;
}
.login-page {
    border-radius: 5px;
    margin: auto;
    width: 350px;
    padding: 35px 55px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>