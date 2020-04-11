<template>
    <el-form :model="ruleForm" ref="ruleForm" clearValidate>
        <el-row>
            <el-col :span="11">
                <el-form-item label="货物名称" prop="name" label-width="100px">
                    <el-input v-model="ruleForm.name" width="100px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="货物类型" prop="type" label-width="100px" width="300px !important">
                    <el-input v-model="ruleForm.type"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="11">
                <el-form-item label="货物规格" prop="size" label-width="100px">
                    <el-input v-model="ruleForm.size" width="100px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="货物价格" prop="value" label-width="100px">
                    <el-input v-model="ruleForm.value"></el-input>
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
                goodID: '',
                name: '',
                type: '',
                size: '',
                value: '',
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
