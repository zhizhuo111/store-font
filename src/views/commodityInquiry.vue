<template>
    <div>
        <el-row>
            <el-col :span="4">
                <el-select v-model="searchType" placeholder="查询条件" style="width:150px" @blur>
                    <el-option v-for="item in searchs" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-input v-model="searchTypeInput" placeholder="请输入" style="width:180px" :disabled="show"></el-input>
            </el-col>
            <el-col :span="6">
                <el-select v-model="repositoryBelong" clearable placeholder="选择仓库">
                    <el-option v-for="item in store" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-col>
        </el-row>
        <!-- <el-row style="padding-top:10px">
            <el-col :span="6">
                <el-button type="primary" @click="onSubmit">添加库存信息</el-button>
                <el-button type="primary" @click="onSubmit">导入</el-button>
                <el-button type="primary" @click="onSubmit">导出</el-button>
            </el-col>
        </el-row> -->
        <el-main style="max-height: 380px !important;border:solid 1px #E4E7ED;width:1200px;margin-top: 10px">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="goodsID" label="记录ID" width="180">
                </el-table-column>
                <el-table-column prop="goodsName" label="商品名称">
                </el-table-column>
                <el-table-column prop="goodsSize" label="商品型号">
                </el-table-column>
                <el-table-column prop="goodsType" label="商品类型">
                </el-table-column>
                <el-table-column prop="goodsValue" label="商品值">
                </el-table-column>
                <el-table-column prop="repositoryID" label="出/入库仓库ID" width="180">
                </el-table-column>
                <el-table-column prop="number" label="数量" width="180">
                </el-table-column>
            </el-table>
        </el-main>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data () {
        return {
            show: false,
            searchType: '',
            repositoryBelong: '',
            searchTypeInput: '',
            store: [{
                value: '1003',
                label: '仓库1',
            }, {
                value: '1004',
                label: '仓库2',
            }],
            searchs: [{
                value: 'searchByGoodsID',
                label: '货物ID'
            }, {
                value: 'searchByGoodsType',
                label: '货物类型'
            }, {
                value: 'searchByGoodsName',
                label: '货物名称'
            }, {
                value: 'searchAll',
                label: '所有'
            },],
            tableData: [{
                goodsID: "",
                goodsName: "",
                goodsSize: "",
                goodsType: "",
                goodsValue: "",
                repositoryID: "",
                number: "",
            }],
            params: [],
        }
    },
    methods: {
        blur(){
            if (this.searchType == "searchAll") {
                this.show = true;
            }
        },
        onSubmit () {
            this.tableData = [];
            this.params = {
                searchType: this.searchType,
                repositoryBelong: this.repositoryBelong,
                searchTypeInput: this.searchTypeInput
            };
            var url = 'http://localhost:8888/storageManage/commodityInquiry';
            var that = this;
            if (this.searchType == '' && this.repositoryBelong == '' && this.searchTypeInput == '') {
                that.$message({
                            type: 'warning',
                            message: '请选择查询类型'
                        });
            }else{
                const res = this.axios.post(url, qs.stringify(this.params)).then(function (res) {
                    if (res.data !== "") {
                        res.data.forEach(element => {
                            that.tableData.push(element);
                        });
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
        }
    },
    created(){
        this.onSubmit();
    }
}
</script>
<style scoped>
</style>