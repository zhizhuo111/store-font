<template>
    <div>
        <el-table :data="tableData" height="450">
            <el-table-column prop="id" label="仓库ID" width="100"></el-table-column>
            <el-table-column prop="address" label="仓库地址" width="220"></el-table-column>
            <el-table-column prop="adminName" label="仓库管理员" width="100"></el-table-column>
            <el-table-column prop="status" label="仓库状态" width="130"></el-table-column>
            <el-table-column prop="area" label="仓库面积" width="180"></el-table-column>
            <el-table-column prop="desc" label="仓库描述" width="150"></el-table-column>
            <el-table-column prop="todo" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="90%" append-to-body title="编辑供应商" :visible.sync="editDialogTableVisible" :width="'70%'">
            <el-form :model="ruleForm" :rules="rulesList" ref="ruleForm">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="仓库ID" prop="value" label-width="100px" width="300px !important">
                            <el-input v-model="ruleForm.id" width="150px !important"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="仓库地址" prop="value" label-width="100px" width="300px !important">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="仓库管理员" prop="value" label-width="100px">
                            <el-input v-model="ruleForm.adminName" width="100px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="仓库状态" prop="value" label-width="100px">
                            <el-input v-model="ruleForm.status"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="仓库面积" prop="value" label-width="100px">
                            <el-input v-model="ruleForm.area" width="100px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="仓库描述" prop="value" label-width="100px">
                            <el-input v-model="ruleForm.desc"></el-input>
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
export default {
    props: ['tableData'],
    data () {
        return {
            params: {},//删除传递供应商ID
            supplier: {},//供应商信息
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
            var url = 'http://localhost:8888/repositoryManage/deleteRepository';
            this.params = { repositoryID: value.id };
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
                        message: '删除供应商信息成功'
                    });
                }
            });
            this.$emit('getSupplierID');
            this.editDialogTableVisible=false;
        },
        // 编辑提交
        onSubmit () {
            let supplierID = this.ruleForm.id;
            let supplierName = this.ruleForm.name;
            let personInCharge = this.ruleForm.personInCharge;
            let tel = this.ruleForm.tel;
            let email = this.ruleForm.email;
            let address = this.ruleForm.address;
            var url = 'http://localhost:8888/supplierManage/updateSupplier';
            this.supplier = {
                id: supplierID,// 供应商ID
                name: supplierName,// 供应商名
                personInCharge: personInCharge,// 负责人
                tel: tel,// 联系电话
                email: email,// 电子邮件
                address: address,// 供应商地址
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
                        message: '更新供应商信息成功'
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
