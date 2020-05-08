<template>
    <div>
        <el-table :data="tableData" height="450">
            <el-table-column prop="id" label="货物ID" width="150"></el-table-column>
            <el-table-column prop="name" label="货物名称" width="270"></el-table-column>
            <el-table-column prop="type" label="货物类型" width="150"></el-table-column>
            <el-table-column prop="size" label="货物规格" width="140"></el-table-column>
            <el-table-column prop="value" label="货物价格" width="100"></el-table-column>
            <el-table-column prop="todo" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="90%" append-to-body title="编辑货物" :visible.sync="editDialogTableVisible" :width="'70%'">
            <el-form :model="ruleForm" :rules="rulesList" ref="ruleForm">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="货物ID" prop="value" label-width="100px" width="300px !important">
                            <el-input v-model="ruleForm.id" width="150px !important"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="货物名称" prop="value" label-width="100px" width="300px !important">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="货物类型" prop="value" label-width="100px">
                            <el-input v-model="ruleForm.type" width="100px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="货物规格" prop="value" label-width="100px">
                            <el-input v-model="ruleForm.size"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="货物价格" prop="value" label-width="100px">
                            <el-input v-model="ruleForm.value" width="100px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template slot="footer" style="text-align: center;">
                <el-button type="success" round @click="onSubmit">提交</el-button>
                <el-button type="info" round @click="cancel">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'
import vAddSupplier from '@/components/addSupplier'
export default {
    components: { vAddSupplier },
    props: ['tableData'],
    data () {
        return {
            params: {},//删除传递货物ID
            supplier: {},//货物信息
            visible: false,
            supplierID: '',
            value: '',
            rulesList: {},
            ruleForm: {},
            editDialogTableVisible: false
        }
    },
    components: {

    },
    methods: {
        // 编辑
        handleEdit (index, value) {
            this.editDialogTableVisible = true;
            this.ruleForm = value;
            console.log(index);
            console.log(value);
        },
        // 删除
        handleDelete (index, value) {
            var url = 'http://localhost:8888/goodsManage/deleteGoods';
            this.params = { supplierID: value.id };
            console.log(this.params);
            var that = this;
            this.axios.post(url, qs.stringify(that.params)).then(function (res) {
                console.log(res)
                if (res.data == false) {
                    that.$message({
                        type: 'warning',
                        message: '删除失败，请重试'
                    });
                } else {
                    that.$message({
                        type: 'success',
                        message: '删除货物信息成功'
                    });
                }
            });
            this.$emit('getGoodID');
            this.editDialogTableVisible = false;
        },
        // 编辑提交
        onSubmit () {
            let id = this.ruleForm.id;
            let name = this.ruleForm.name;
            let type = this.ruleForm.type;
            let size = this.ruleForm.size;
            let value = this.ruleForm.value;
            var url = 'http://localhost:8888/goodsManage/updateGoods';
            this.supplier = {
                id: id,
                name: name,
                type: type,
                size: size,
                value: value,
            };
            var that = this;
            this.axios.post(url, that.supplier).then(function (res) {
                console.log(res)
                if (res.data == false) {
                    that.$message({
                        type: 'warning',
                        message: '更新失败，请重试'
                    });
                } else {
                    that.$message({
                        type: 'success',
                        message: '更新货物信息成功'
                    });
                    that.editDialogTableVisible = false;
                }
            });
        },
        // 编辑取消
        cancel () {
            this.editDialogTableVisible = false;
        }
    }
}
</script>

<style>
</style>
