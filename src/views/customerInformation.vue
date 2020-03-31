<template>
    <el-form :inline="true" class="demo-form-inline">
        <el-row>
            <el-col :span="3">
                <el-form-item>
                    <el-select v-model="search" placeholder="查询条件" @change="Reset">
                        <el-option v-for="item in searchs" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item>
                    <el-select v-model="searchByID" placeholder="请选择客户ID" :disabled="this.search !== 'searchByID'">
                        <el-option v-for="item in searchByIDs" :key="item.id" :label="item.id" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item>
                    <el-select v-model="searchByName" placeholder="请选择客户姓名" :disabled="this.search !== 'searchByName'">
                        <el-option v-for="item in searchByNames" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="9">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(search)">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="edit">编辑</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="del(scope.$index, scope.row)">删除</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-button type="primary">添加客户</el-button>
                <el-button type="primary">导入</el-button>
                <el-button type="primary">导出</el-button>
            </el-col>
        </el-row>
        <el-form-item>
            <el-main style="max-height: 380px !important;border:solid 1px #E4E7ED;width:1200px;margin-top: 10px">
                <el-table @selection-change="handleSelectionChange" :data="tableData" style="width: 100%" @cell-dblclick="dblclickCell">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="客户ID" width="100"></el-table-column>
                    <el-table-column prop="name" label="客户名称" width="220"></el-table-column>
                    <el-table-column prop="personInCharge" label="负责人" width="100"></el-table-column>
                    <el-table-column prop="tel" label="联系电话" width="150"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址" width="350"></el-table-column>
                </el-table>
            </el-main>
        </el-form-item>
        <!-- 编辑 -->
        <el-dialog title="客户信息管理" :visible.sync="dialogTableVisible" :width="'90%'" >
            <v-edit-customer :tableData="tableData" @getSupplierID="getSupplierID"></v-edit-customer>
        </el-dialog>
        <!-- 新增 -->
        <el-dialog title="新增客户" :visible.sync="addDialogTableVisible" :width="'70%'">
            <v-add-customer ref="addSupplier" :ruleForm="ruleForm"></v-add-customer>
            <template slot="footer" style="text-align: center;">
                <el-button type="success" round @click="addSupplier">新增</el-button>
                <el-button type="info" round @click="doCel">取消</el-button>
            </template>
        </el-dialog>
    </el-form>
</template>
<script>
import qs from 'qs';
import vEditSupplier from '@/components/editSupplier';
import vAddSupplier from '@/components/addSupplier';
export default {
    components: { vAddSupplier, vEditSupplier },
    data () {
        return {
            customer: {},//新增客户
            ruleForm: '',
            params: [],
            search: '',//查询条件
            searchByIDs: [],
            searchByNames: [],
            searchByID: '',
            searchByName: '',
            dialogTableVisible: false,//用于显示编辑弹框
            addDialogTableVisible: false,//用于显示新增弹框
            searchs: [//查询方式
                {
                    label: '客户ID',
                    value: 'searchByID'
                },
                {
                    label: '客户姓名',
                    value: 'searchByName'
                },
                {
                    label: '所有',
                    value: 'searchAll'
                }
            ],
            value: '',
            tableData: [
                {
                    id: '',
                    name: '',
                    personInCharge: '',
                    tel: '',
                    email: '',
                    address: '',
                }
            ],
            params: [],//查询条件参数
            paramss: [],//获取查询条件
        }
    },
    methods: {
        //查询条件切换时，会重置查询条件
        Reset () {
            this.searchByName = '';
            this.searchByID = '';
        },
        //查询
        onSubmit (value) {
            var keyWordName;
            if (this.searchByName) {
                keyWordName = this.searchByName
            }
            if (this.searchByID) {
                keyWordName = this.searchByID
            }
            var url = 'http://localhost:8888/customerManage/getSupplierList';
            this.params = {
                searchType: value,
                keyWord: keyWordName,
            };
            var that = this;
            this.axios.post(url, qs.stringify(this.params)).then(function (res) {
                if (res != undefined && res.data) {
                    that.tableData = res.data.data;//差了一个所有查询所有数据库
                }
            });
        },
        // 触发编辑弹框
        edit (row) {
            this.dialogTableVisible = true;
        },
        // 触发新增弹框
        add () {
            this.addDialogTableVisible = true;
            this.ruleForm = '';
        },
        // 新增弹框中进行新增数据操作
        addSupplier () {
            this.getSupplierID();
            let customerName = this.$refs.addSupplier.ruleForm.customerName;
            let personInCharge = this.$refs.addSupplier.ruleForm.personInCharge;
            let tel = this.$refs.addSupplier.ruleForm.tel;
            let email = this.$refs.addSupplier.ruleForm.email;
            let address = this.$refs.addSupplier.ruleForm.address;
            var url = 'http://localhost:8888/customerManage/addSupplier';
            this.customer = {
                // id: customerID,// 客户ID
                name: customerName,// 客户名
                personInCharge: personInCharge,// 负责人
                tel: tel,// 联系电话
                email: email,// 电子邮件
                address: address,// 客户地址
            };
            console.log(this.customer)
            var that = this;
            this.axios.post(url, this.customer).then(function (res) {
                console.log(res)
                if (res.data == false) {
                    that.$message({
                        type: 'warning',
                        message: '客户已存在'
                    });
                } else {
                    that.$message({
                        type: 'success',
                        message: '新增客户成功'
                    });
                    that.$refs.addSupplier.ruleForm.customerID = '';
                    that.$refs.addSupplier.ruleForm.customerName = '';
                    that.$refs.addSupplier.ruleForm.personInCharge = '';
                    that.$refs.addSupplier.ruleForm.tel = '';
                    that.$refs.addSupplier.ruleForm.email = '';
                    that.$refs.addSupplier.ruleForm.address = '';
                    that.addDialogTableVisible = false;
                    that.getSupplierID();
                }
            });
        },
        // 新增弹框中进行新增数据操作
        doCel () {
            this.$refs.addSupplier.ruleForm.customerID = '';
            this.$refs.addSupplier.ruleForm.customerName = '';
            this.$refs.addSupplier.ruleForm.personInCharge = '';
            this.$refs.addSupplier.ruleForm.tel = '';
            this.$refs.addSupplier.ruleForm.email = '';
            this.$refs.addSupplier.ruleForm.address = '';
            this.addDialogTableVisible = false;
        },
        // 可以多选进行删除数据
        del (index, value) {
            console.log(index+"123");
            console.log(value+"456");
        },
        // 双击弹窗
        dblclickCell (row, column, cell, event) {
            this.dialogTableVisible = true;
        },
        handleSelectionChange () { },
        // 获取客户ID
        getSupplierID () {
            var url = 'http://localhost:8888/customerManage/getSupplierList';
            this.paramss = {
                searchType: "searchAll",
                keyWord: "random",
            };
            var that = this;
            this.axios.post(url, qs.stringify(this.paramss)).then(function (res) {
                if (res != undefined && res.data) {
                    res.data.data.forEach(element => {
                        that.searchByIDs.push(element);
                        that.searchByNames.push(element);
                    });
                }
                that.tableData = res.data.data;
            });
        },
        //获取客户Name 
        getSupplierName () {

        },
    },
    mounted () {
        this.getSupplierID();
        this.getSupplierName();
    }
}
</script>
<style scoped>
</style>