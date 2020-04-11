<template>
    <el-form :model="ruleForm" ref="ruleForm" clearValidate>
        <el-row>
            <el-col :span="11">
                <el-form-item label="仓库地址" prop="name" label-width="100px">
                    <el-input v-model="ruleForm.address" width="100px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="仓库描述" prop="size" label-width="100px">
                    <el-input v-model="ruleForm.desc" width="100px"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="11">
                <el-form-item label="仓库状态" prop="size" label-width="100px">
                    <el-input v-model="ruleForm.status" width="100px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="仓库面积" prop="value" label-width="100px">
                    <el-input v-model="ruleForm.area"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
export default {
    data () {
        return {
            goodID: '',
            name: '',
            type: '',
            size: '',
            value: '',
            ruleForm: {
                address: '',
                status: '',
                area: '',
                desc: '',
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
