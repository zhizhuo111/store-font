<template>
    <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户" prop="customer">
            <el-select v-model="ruleForm.customerID" @change="changeVal(ruleForm.customerMessage, ruleForm.customerID)" placeholder="请输入客户名称" style="width:180px">
                <el-option v-for="item in ruleForm.customerMessage" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出库货物" prop="goods">
            <el-select v-model="ruleForm.goodsID" @change="changeGoodsVal(ruleForm.goodsMessage, ruleForm.goodsID)" placeholder="请选择出库货物名称" style="width:180px">
                <el-option v-for="item in ruleForm.goodsMessage" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出库仓库" prop="region">
            <el-select v-model="ruleForm.repositoryID" placeholder="请出库仓库" style="width:180px">
                <el-option v-for="item in ruleForm.repositoryMessage" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出库数量" prop="desc">
            <el-input v-model="number" style="width:180px" placeholder="请输入出库数量" @blur="getFetchStorage()"></el-input>
        </el-form-item>
        <el-collapse style="padding: 0px 20px 30px 20px">
            <el-collapse-item title="客户信息">
                <el-form-item label="客户ID：">
                    <el-input v-model="this.ruleForm.customerMessage.id" style="width:220px" placeholder="请输入客户ID"></el-input>
                </el-form-item>
                <el-form-item label="负责人：">
                    <el-input v-model="this.ruleForm.customerMessage.personInCharge" style="width:220px" placeholder="请输入负责人名称"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件:">
                    <el-input v-model="this.ruleForm.customerMessage.email" style="width:330px" placeholder="请输入电子邮件"></el-input>
                </el-form-item>
                <el-form-item label="客户名：">
                    <el-input v-model="this.ruleForm.customerMessage.name" style="width:220px" placeholder="请输入客户名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input v-model="this.ruleForm.customerMessage.tel" style="width:220px" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="联系地址：">
                    <el-popover placement="top-start" title="联系地址：" width="200" trigger="hover" :content="this.ruleForm.customerMessage.address">
                        <el-input v-model="this.ruleForm.customerMessage.address" style="width:330px" placeholder="请输入联系地址" slot="reference"></el-input>
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
            <el-button style="margin-left:900px; margin-top:10px" type="primary" @click="onSubmit">提交出库</el-button>
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
            paramss: [],
            customer: [],
            number: '',
            ruleForm: {
                //客户ID
                customerID: '',
                //客户信息
                customerMessage: [
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
                customer: [
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
        //选择客户，提供详情信息
        changeVal (item, id) {
            for (var i in item) {
                if (id === item[i].id) {
                    this.ruleForm.customerMessage.id = item[i].id;
                    this.ruleForm.customerMessage.name = item[i].name;
                    this.ruleForm.customerMessage.personInCharge = item[i].personInCharge;
                    this.ruleForm.customerMessage.tel = item[i].tel;
                    this.ruleForm.customerMessage.email = item[i].email;
                    this.ruleForm.customerMessage.address = item[i].address;
                }
            }
        },
        //选择出库仓库，提供详情信息
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
        // 获取客户
        getCustomerID () {
            var url = 'http://localhost:8888/customerManage/getCustomerList';
            var params = 'searchByName';
            var that = this;
            this.axios.get(url, qs.stringify(this.params)).then(function (res) {
                console.log(res.data)
                if (res != undefined && res.data) {
                    that.ruleForm.customerMessage = res.data;//差了一个所有查询所有数据库
                }
            });
        },
        // 获取商品信息
        getGoodsID () {
            var url = 'http://localhost:8888/goodsManage/getGoodsList';
            var params = 'searchByName';
            var that = this;
            this.axios.get(url, qs.stringify(this.params)).then(function (res) {
                // console.log("aaaaaaaaaaaaa")
                // console.log(res.data)
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
                console.log(res.data[0].id)

                if (res != undefined && res.data) {
                    that.ruleForm.repositoryMessage = res.data;//差了一个所有查询所有数据库

                }
            });
        },
        getNumber () {

        },
        onSubmit () {
            var url = 'http://localhost:8888/stockRecordManage/stockOut';
            this.paramss = {
                customerID: this.ruleForm.customerID,
                repositoryID: this.ruleForm.repositoryID,
                goodsID: this.ruleForm.goodsID,
                number: this.number,
            };
            console.log(this.paramss)
            var that = this;
            this.axios.post(url, qs.stringify(this.paramss)).then(function (res) {
                console.log(res.data)
                if (res.data) {
                    that.$message({
                        type: 'success',
                        message: '出库成功'
                    });
                } else {
                    that.$message({
                        type: 'error',
                        message: '出库失败'
                    });
                }
            });
        },
        getFetchStorage () {
            console.log("出库数量")
        },
        reSet () {

        },
    },
    mounted () {
        this.getCustomerID();
        this.getGoodsID();
        this.getRepositoryID();

    }
}
</script>

<style >
</style>
