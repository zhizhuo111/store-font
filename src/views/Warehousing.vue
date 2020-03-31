<template>
    <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="供应商" prop="supplier">
            <el-select v-model="ruleForm.supplierID" @change="changeVal(ruleForm.supplierMessage, ruleForm.supplierID)" placeholder="请选择供应商" style="width:180px">
                <el-option v-for="item in ruleForm.supplierMessage" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="入库货物" prop="goods">
            <el-select v-model="ruleForm.goodsID" @change="changeGoodsVal(ruleForm.goodsMessage, ruleForm.goodsID)" placeholder="请选择入库货物名称" style="width:180px">
                <el-option v-for="item in ruleForm.goodsMessage" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="入库仓库" prop="region">
            <el-select v-model="ruleForm.repositoryID" placeholder="请选择仓库" style="width:180px">
                <el-option v-for="item in ruleForm.repositoryMessage" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="入库数量" prop="desc">
            <el-input v-model="number" style="width:180px" placeholder="请输入入库数量" @blur="getFetchStorage()"></el-input>
        </el-form-item>
        <el-collapse style="padding: 0px 20px 30px 20px">
            <el-collapse-item title="供应商信息">
                <el-form-item label="供应商ID：">
                    <el-input v-model="this.ruleForm.supplierMessage.id" style="width:220px" placeholder="请输入供应商ID"></el-input>
                </el-form-item>
                <el-form-item label="负责人：">
                    <el-input v-model="this.ruleForm.supplierMessage.personInCharge" style="width:220px" placeholder="请输入负责人名称"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件:">
                    <el-input v-model="this.ruleForm.supplierMessage.email" style="width:330px" placeholder="请输入电子邮件"></el-input>
                </el-form-item>
                <el-form-item label="供应商名：">
                    <el-input v-model="this.ruleForm.supplierMessage.name" style="width:220px" placeholder="请输入供应商名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input v-model="this.ruleForm.supplierMessage.tel" style="width:220px" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="联系地址：">
                    <el-popover placement="top-start" title="联系地址：" width="200" trigger="hover" :content="this.ruleForm.supplierMessage.address">
                        <el-input v-model="this.ruleForm.supplierMessage.address" style="width:330px" placeholder="请输入联系地址" slot="reference"></el-input>
                    </el-popover>
                </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="货物信息">
                <el-form-item label="货物ID：">
                    <el-input v-model="this.ruleForm.goodsMessage.id" style="width:220px" placeholder="请输入货物ID"></el-input>
                </el-form-item>
                <el-form-item label="货物类型：">
                    <el-input v-model="this.ruleForm.goodsMessage.type" style="width:220px" placeholder="请输入货物类型"></el-input>
                </el-form-item>
                <el-form-item label="货物名：">
                    <el-input v-model="this.ruleForm.goodsMessage.name" style="width:220px" placeholder="请输入货物名"></el-input>
                </el-form-item>
                <el-form-item label="货物规格：">
                    <el-input v-model="this.ruleForm.goodsMessage.size" style="width:220px" placeholder="请输入货物规格"></el-input>
                </el-form-item>
                <el-form-item label="货物价值：">
                    <el-input v-model="this.ruleForm.goodsMessage.value" style="width:220px" placeholder="请输入货物价值"></el-input>
                </el-form-item>
            </el-collapse-item>
        </el-collapse>
        <el-footer style="background-color:#EFF2F7">
            <el-button style="margin-left:900px; margin-top:10px" type="primary" @click="onSubmit">提交入库</el-button>
            <el-button style="margin-left:50px; margin-bottom:20px" type="primary" @click="reSet">重置</el-button>
        </el-footer>
    </el-form>
</template>

<script>
import qs from 'qs'
import { validatorDate, validatorRange } from '@/utils/validator'

export default {
    data () {
        return {
            params:[],
            paramss:[],
            paramsss: [],
            supplier: [],
            number: '',
            ruleForm: {
                //供应商ID
                supplierID: '',
                //供应商信息
                supplierMessage: [
                    {
                        id: '',
                        name: '',
                        personInCharge: '',
                        tel: '',
                        email: '',
                        address: '',
                    }
                ],
                //仓库ID
                repositoryID: '',
                //仓库信息
                repositoryMessage: [],
                //商品ID
                goodsID: '',
                //商品信息
                goodsMessage: [
                    {
                        id: '',
                        name: '',
                        type: '',
                        size: '',
                        value: '',
                    }
                ],
            },
            rules: {
                supplier: [
                    { required: true, message: '必填项', trigger: 'blur' },
                ],
                goods: [
                    { required: true, message: '必填项', trigger: 'change' },
                ],
                region: [
                    { required: true, message: '必填项', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '必填项', trigger: 'blur' }, { validator: validatorRange(0, 99999999.99, '请输入[1,99999999.99]的数字'), trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        //选择供应商，提供详情信息
        changeVal (item, id) {
            for (var i in item) {
                if (id === item[i].id) {
                    this.ruleForm.supplierMessage.id = item[i].id;
                    this.ruleForm.supplierMessage.name = item[i].name;
                    this.ruleForm.supplierMessage.personInCharge = item[i].personInCharge;
                    this.ruleForm.supplierMessage.tel = item[i].tel;
                    this.ruleForm.supplierMessage.email = item[i].email;
                    this.ruleForm.supplierMessage.address = item[i].address;
                }
            }
        },
        //选择入库仓库，提供详情信息
        changeGoodsVal (item, id) {
            for (var i in item) {
                if (id === item[i].id) {
                    this.ruleForm.goodsMessage.id = item[i].id;
                    this.ruleForm.goodsMessage.name = item[i].name;
                    this.ruleForm.goodsMessage.type = item[i].type;
                    this.ruleForm.goodsMessage.size = item[i].size;
                    this.ruleForm.goodsMessage.value = item[i].value;
                }
            }
        },
        // 获取供应商
        getSupplierID () {
            var url = 'http://localhost:8888/supplierManage/getSupplierList';
            this.paramsss = {
                searchType: "searchAll",
                keyWord: "11",
            };
            var that = this;
            this.axios.post(url, qs.stringify(that.paramsss)).then(function (res) {
                if (res != undefined && res.data) {
                    that.ruleForm.supplierMessage = res.data.data;//差了一个所有查询所有数据库
                }
            });
        },
        // 获取商品信息
        getGoodsID () {
            var url = 'http://localhost:8888/goodsManage/getGoodsList';
            var params = 'searchByName';
            var that = this;
            this.axios.get(url, qs.stringify(this.params)).then(function (res) {
                if (res != undefined && res.data) {
                    that.ruleForm.goodsMessage = res.data;//差了一个所有查询所有数据库
                }
            });


        },
        // 获取仓库
        getRepositoryID () {
            var url = 'http://localhost:8888/repositoryManage/getRepositoryList';
            var params = 'repositoryName';
            var that = this;
            this.axios.get(url, qs.stringify(this.params)).then(function (res) {
                if (res != undefined && res.data) {
                    that.ruleForm.repositoryMessage = res.data;//差了一个所有查询所有数据库

                }
            });
        },
        getNumber () {

        },
        onSubmit () {
            var url = 'http://localhost:8888/stockRecordManage/stockIn';
            this.paramss = {
                supplierID: this.ruleForm.supplierID,
                repositoryID: this.ruleForm.repositoryID,
                goodsID: this.ruleForm.goodsID,
                number: this.number,
            };
            var that = this;
            this.axios.post(url, qs.stringify(this.paramss)).then(function (res) {
                if (res.data) {
                    that.$message({
                        type: 'success',
                        message: '入库成功'
                    });
                } else {
                    that.$message({
                        type: 'error',
                        message: '入库失败'
                    });
                }
            });
        },
        getFetchStorage () {
            console.log("入库数量")
        },
        reSet () {

        },
    },
    mounted () {
        this.getSupplierID();
        this.getGoodsID();
        this.getRepositoryID();

    }
}
</script>

<style >
</style>
