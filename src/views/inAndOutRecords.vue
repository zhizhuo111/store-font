<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
            <el-col :span="4">
                <el-form-item label="仓库编号">
                    <el-select v-model="repositoryID" placeholder="请选择仓库" style="width:125px ">
                        <el-option v-for="item in search_repository_ID" :key="item.value" :label="item.label" :value="item.value" > 
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="记录过滤">
                    <el-select v-model="records" placeholder="过滤条件" style="width:150px">
                        <el-option v-for="item in search_type" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label="日期范围">
                    <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
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
                    <el-table-column prop="date" label="记录ID" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="供应商/客户名称" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="date" label="出/入库仓库ID" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="数量" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="日期">
                    </el-table-column>
                    <el-table-column prop="address" label="经手人">
                    </el-table-column>
                    <el-table-column prop="address" label="记录类型">
                    </el-table-column>
                </el-table>
            </el-main>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data () {
        return {
            repositoryID: '',
            records: '',
            date: '',
            formInline: {
                user: '',
                region: ''
            },
            search_repository_ID: [{
                value: '选项1',
                label: '所有仓库'
            }],
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
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        onSubmit () {
            console.log('submit!');
        }
    }
}
</script>

<style scoped>
</style>
