<template>
    <div class="container">
        <el-form ref="form" :model="form" label-width="100px" class="login-page" :rules="rules">
            <h2 style="text-align:center">用户信息修改</h2>
            <el-form-item label="用  户:" prop="userName">
                <el-input v-model="form.userName" placeholder="请输入用户名">
                    <el-button slot="prepend" icon="el-icon-user"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="密 码:" prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码">
                    <el-button slot="prepend" icon="el-icon-key"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="密 码 确 认:" prop="password2">
                <el-input v-model="form.password2" type="password" placeholder="请确认密码">
                    <el-button slot="prepend" icon="el-icon-key"></el-button>
                </el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-user-solid" @click="register" style="margin-left: 150px">完 成</el-button>
        </el-form>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data () {
        return {
            form: {
                userName: "",
                password: "", 
                password2: "",
            },
            rules: {
                userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                password2: [{ required: true, message: "请再次输入密码", trigger: "blur" }]
            },
            params: [],
        };
    },
    methods: {
        register () {
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
            } else if (this.form.password2 == '') {
                this.$message({
                    type: 'warning',
                    message: '请再次输入密码'
                });
            } else if (this.form.password != this.form.password2) {
                this.$message({
                    type: 'warning',
                    message: '密码不一致'
                });
            }
            if (this.form.password == this.form.password2 && this.form.userName != null && this.form.password!='' && this.form.password2 != '') {
                var url = 'http://localhost:8888/user/register';
                this.params = {
                    userName: this.form.userName,
                    password: this.form.password,
                };
                let that = this;
                this.axios.post(url, qs.stringify(this.params)).then(function (res) {
                    console.log(res.data)
                    if (res.data !== "") {
                        that.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        that.$router.push('/');
                    } else {
                        that.$message({
                            type: 'warning',
                            message: '请正确输入密码或用户名'
                        });
                    }
                });
            } 
        },
    },
    mounted(){
        this.form.userName = localStorage.getItem("userName")
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