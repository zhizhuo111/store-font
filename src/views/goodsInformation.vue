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
                    <el-select v-model="searchByID" placeholder="请选择货物ID" :disabled="this.search !== 'searchByID'">
                        <el-option v-for="item in searchByIDs" :key="item.id" :label="item.id" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item>
                    <el-select v-model="searchByName" placeholder="请选择货物姓名" :disabled="this.search !== 'searchByName'">
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
            </el-col>
        </el-row>
        <!-- <el-row>
            <el-col :span="12">
                <el-button type="primary">添加货物</el-button>
                <el-button type="primary">导入</el-button>
                <el-button type="primary">导出</el-button>
            </el-col>
        </el-row> -->
        <el-form-item>
            <el-main style="max-height: 380px !important;border:solid 1px #E4E7ED;width:1200px;margin-top: 10px">
                <el-table @selection-change="handleSelectionChange" :data="tableData" style="width: 100%" @cell-dblclick="dblclickCell">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="货物ID" width="150"></el-table-column>
                    <el-table-column prop="name" label="货物名称" width="270"></el-table-column>
                    <el-table-column prop="type" label="货物类型" width="150"></el-table-column>
                    <el-table-column prop="size" label="货物规格" width="200"></el-table-column>
                    <el-table-column prop="value" label="货物价格" width="230"></el-table-column>
                </el-table>
            </el-main>
        </el-form-item>
        <!-- 编辑 -->
        <el-dialog title="货物信息管理" :visible.sync="dialogTableVisible" :width="'70%'">
            <v-edit-supplier :tableData="tableData" @getSupplierID="getSupplierID"></v-edit-supplier>
        </el-dialog>
        <!-- 新增 -->
        <el-dialog title="新增货物" :visible.sync="addDialogTableVisible" :width="'70%'">
            <v-add-supplier ref="addSupplier" :ruleForm="ruleForm"></v-add-supplier>
            <template slot="footer" style="text-align: center;">
                <el-button type="success" round @click="addSupplier">新增</el-button>
                <el-button type="info" round @click="doCel">取消</el-button>
            </template>
        </el-dialog>
    </el-form>
</template>
<script>
import qs from 'qs';
import vEditSupplier from '@/components/editGood';
import vAddSupplier from '@/components/addGood';
export default {
    components: { vAddSupplier, vEditSupplier },
    data () {
        return {
            supplier: {},//新增货物
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
                    label: '货物ID',
                    value: 'searchByID'
                },
                {
                    label: '货物姓名',
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
                    type: '',
                    size: '',
                    value: '',
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
                keyWordName = this.searchByName;
            }
            if (this.searchByID) {
                keyWordName = this.searchByID;
            }
            var url = 'http://localhost:8888/goodsManage/getGoodsList';
            this.params = {
                searchType: value,
                keyWord: keyWordName,
            };
            console.log(this.params)
            var that = this;
            this.axios.post(url, qs.stringify(that.params)).then(function (res) {
                if (res != undefined && res.data) {
                    that.tableData = res.data;//差了一个所有查询所有数据库
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
            let name = this.$refs.addSupplier.ruleForm.name;
            let type = this.$refs.addSupplier.ruleForm.type;
            let size = this.$refs.addSupplier.ruleForm.size;
            let value = this.$refs.addSupplier.ruleForm.value;
            var url = 'http://localhost:8888/goodsManage/addGoods';
            this.supplier = {
                // id: supplierID,// 货物ID
                name: name,// 货物名
                type: type,// 负责人
                size: size,// 联系电话
                value: value,// 电子邮件
            };
            console.log(this.supplier)
            var that = this;
            this.axios.post(url, this.supplier).then(function (res) {
                console.log(res)
                if (res.data == false) {
                    that.$message({
                        type: 'warning',
                        message: '货物已存在'
                    });
                } else {
                    that.$message({
                        type: 'success',
                        message: '新增货物成功'
                    });
                    that.$refs.addSupplier.ruleForm.name = '';
                    that.$refs.addSupplier.ruleForm.type = '';
                    that.$refs.addSupplier.ruleForm.size = '';
                    that.$refs.addSupplier.ruleForm.value = '';
                    that.addDialogTableVisible = false;
                    that.getSupplierID();
                }
            });
        },
        // 新增弹框中进行新增数据操作
        doCel () {
            this.$refs.addSupplier.ruleForm.name = '';
            this.$refs.addSupplier.ruleForm.type = '';
            this.$refs.addSupplier.ruleForm.size = '';
            this.$refs.addSupplier.ruleForm.value = '';
            this.addDialogTableVisible = false;
        },
        // 可以多选进行删除数据
        del (index, value) {
            console.log(index + "123");
            console.log(value + "456");
        },
        // 双击弹窗
        dblclickCell (row, column, cell, event) {
            this.dialogTableVisible = true;
        },
        handleSelectionChange () { },
        // 获取货物ID
        getSupplierID () {
            var url = 'http://localhost:8888/goodsManage/getGoodsList';
            this.paramss = {
                searchType: "searchAll",
                keyWord: "random",
            };
            var that = this;
            this.axios.post(url, qs.stringify(this.paramss)).then(function (res) {
                if (res != undefined && res.data) {
                    res.data.forEach(element => {
                        that.searchByIDs.push(element);
                        that.searchByNames.push(element);
                    });
                }
                that.tableData = res.data;
            });
        },
        //获取货物Name 
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