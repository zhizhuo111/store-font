<template>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rulesList" clearValidate>
        <el-row>
            <el-col :span="11">
                <el-form-item label="负责人" prop="personInCharge" label-width="100px">
                    <el-input v-model="ruleForm.personInCharge" width="100px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="供应商名称" prop="supplierName" label-width="100px" width="300px !important">
                    <el-input v-model="ruleForm.supplierName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="11">
                <el-form-item label="邮箱" prop="email" label-width="100px" :rules="[
                { required: true, message: '邮箱不能为空', trigger: 'blur'},
                { type: 'email', message: '请输入有效邮箱', trigger: ['blur', 'change']}
                ]">
                    <el-input v-model="ruleForm.email" width="100px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系电话" prop="tel" label-width="100px">
                    <el-input v-model.number="ruleForm.tel"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>

            <el-col :span="12">
                <el-form-item label="地址" prop="address" label-width="100px">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import { isvalidPhone } from '@/utils/rulesfomatter'
var validPhone = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入电话号码'))
    } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
    } else {
        callback()
    }
}
export default {
    data () {
        return {
            supplierID: '',
            supplierName: '',
            personInCharge: '',
            tel: '',
            email: '',
            address: '',
            rulesList: {
                tel: [
                    { required: true, trigger: 'blur', validator: validPhone }//这里需要用到全局变量
                ]
            },
            ruleForm: {
                supplierID: '',
                supplierName: '',
                personInCharge: '',
                tel: '',
                email: '',
                address: '',
            },
        }
    },
    components: {

    },
    methods: {
    },
}
</script>

<style>
.el-form-item__content {
    margin-left: 20px !important;
}
</style>
