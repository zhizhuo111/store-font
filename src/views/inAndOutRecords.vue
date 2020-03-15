<template>
    <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-row>
            <el-col :span="4">
                <el-form-item label="仓库编号">
                    <el-select v-model="form.repositoryIDStr" placeholder="请选择" style="width:125px">
                        <el-option v-for="item in search_repository_ID" @change="changeVal" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="记录过滤">
                    <el-select v-model="form.searchType" placeholder="过滤条件" style="width:150px">
                        <el-option v-for="item in search_type" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label="日期范围">
                    <el-date-picker type="date" v-model="form.beginDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px"></el-date-picker>
                    <span style="padding: 0px 1px 0px 5px"> - </span>
                    <el-date-picker @change="changeDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.endDate" style="width: 150px"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="reSet">重置</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
            <el-main style="max-height: 380px !important;border:solid 1px #E4E7ED;width: 1200px;">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="recordID" label="记录ID" width="180">
                    </el-table-column>
                    <el-table-column prop="supplierOrCustomerName" label="供应商/客户名称" width="180">
                    </el-table-column>
                    <el-table-column prop="goodsName" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="searchType" label="出/入库仓库ID" width="180">
                    </el-table-column>
                    <el-table-column prop="number" label="数量" width="180">
                    </el-table-column>
                    <el-table-column prop="time" label="日期">
                    </el-table-column>
                    <el-table-column prop="personInCharge" label="经手人">
                    </el-table-column>
                    <el-table-column prop="type" label="记录类型">
                    </el-table-column>
                </el-table>
            </el-main>
        </el-form-item>
    </el-form>
</template>

<script>
import qs from 'qs'
export default {
    data () {
        return {
            repositoryID: '',//仓库名称
            form: {
                repositoryIDStr: '',//仓库编号
                searchType: '',//记录过滤条件
                beginDate: '',//开始时间
                endDate: ''//结束时间
            },
            date: '',
            name: '',
            search_repository_ID: [],
            search_type: [{
                value: 'all',
                label: '显示所有'
            }, {
                value: 'stockInOnly',
                label: '仅显示入库记录'
            }, {
                value: 'stockOutOnly',
                label: '仅显示出库记录'
            }],
            value: '',
            tableData: [{
                recordID: "",
                type: "",
                supplierOrCustomerName: "",
                goodsName: "",
                repositoryID:"",
                number: "",
                time: "",
                personInCharge: "",
            }]
        }
    },
    methods: {
        setSecurityData () {
            var url = 'http://localhost:8888/repositoryManage/getRepositoryList';
            var that = this;
            this.axios.get(url, qs.stringify(this.params)).then(function (res) {
                console.log(res)
                if (res != undefined && res.data) {
                    that.search_repository_ID = res.data;//差了一个所有查询所有数据库
                    // console.log(res.data[0])
                }
            });

        },
        changeVal (value) {

        },
        changeDate (date) {
            let startYear = this.form.beginDate.substr(0, 4);
            let startMonth = parseFloat(this.form.beginDate.substr(5, 2)) - 1;
            let startDate = this.form.beginDate.substr(8, 2);
            let starTime = new Date(startYear, startMonth, startDate).getTime();
            let endYear = this.form.endDate.substr(0, 4);
            let endMonth = parseFloat(this.form.endDate.substr(5, 2)) - 1;
            let endDate = this.form.endDate.substr(8, 2);
            let endTime = new Date(endYear, endMonth, endDate).getTime();
            if (starTime > endTime) {
                this.$confirm('结束日期应大于开始日期', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '',
                    closeOnClickModal: false,
                    type: 'warning'
                })
                this.form.endDate = this.form.beginDate;
            }
        },
        onSubmit () {
            this.tableData = [];
            this.params = {
                searchType: this.form.searchType,
                repositoryIDStr: this.form.repositoryIDStr,
                beginDate: this.form.beginDate,
                endDate: this.form.endDate,
            };
            console.log(this.params)
            var url = 'http://localhost:8888/storageManage/searchStockRecord';
            var that = this;
            if (this.form.searchType == '' && this.form.repositoryIDStr == '' && this.form.beginDate == '' && this.form.endDate == '') {
                that.$message({
                    type: 'warning',
                    message: '请选择查询类型'
                });
            } else {
                this.axios.post(url, qs.stringify(this.params)).then(function (res) {
                    if (res.data !== "" || res.data !== 'null') {
                        console.log(res.data.data);
                        that.tableData = res.data.data;
                        // res.data.forEach(element => {
                        //     that.tableData.push(element);
                        // });
                        console.log(that.tableData)
                    } else {
                        that.tableData = []
                        that.$message({
                            type: 'warning',
                            message: '数据不存在'
                        });
                    }

                });
            }
        },
        reSet () {

        }
    },
    mounted () {
        this.setSecurityData();
    }
}
</script>

<style scoped>
</style>
