<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
            <el-col :span="3">
                <el-form-item>
                    <el-select v-model="search" placeholder="查询条件" @change="Reset">
                        <el-option v-for="item in searchs" :key="item.id" :label="item.id" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item>
                    <el-select v-model="searchByID" placeholder="请选择仓库管理员ID" :disabled="this.search !== 'searchByID'">
                        <el-option v-for="item in searchByIDs" :key="item.id" :label="item.id" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item>
                    <el-select v-model="searchByName" placeholder="请选择仓库管理员姓名" :disabled="this.search !== 'searchByName'">
                        <el-option v-for="item in searchByNames" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item>
                    <el-select v-model="searchByRepositoryID" placeholder="请选择仓库ID" :disabled="this.search !== 'searchByRepositoryID'">
                        <el-option v-for="item in searchByRepositoryIDs" :key="item.id" :label="item.repositoryBelongID" :value="item.repositoryBelongID">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(search)">查询</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-button type="primary">添加仓库管理员信息</el-button>
                <el-button type="primary">导入</el-button>
                <el-button type="primary">导出</el-button>
            </el-col>
        </el-row>
        <el-form-item>
            <el-main style="max-height: 380px !important;border:solid 1px #E4E7ED;width:1200px;margin-top: 10px">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="id" label="仓库管理员ID" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="仓库管理员姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别">
                    </el-table-column>
                    <el-table-column prop="tel" label="联系电话">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                    <el-table-column prop="birth" label="出生日期">
                    </el-table-column>
                    <el-table-column prop="repositoryBelongID" label="所属仓库ID" width="180">
                    </el-table-column>
                    <!-- <el-table-column prop="name" label="操作" width="180">
                    </el-table-column> -->
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
            search: '',
            searchByIDs: [],
            searchByNames: [],
            searchByRepositoryIDs: [],
            searchByID: '',
            searchByName: '',
            searchByRepositoryID: '',
            searchs: [
                {
                    id: '仓库管理员ID',
                    name: 'searchByID'
                },
                {
                    id: '仓库管理员姓名',
                    name: 'searchByName'
                },
                {
                    id: '仓库ID',
                    name: 'searchByRepositoryID'
                },
                {
                    id: '所有',
                    name: 'searchAll'
                }
            ],
            customers: [{
                id: '',
                name: '',
                personInCharge: '',
                tel: '',
                email: '',
            }],
            formInline: {
                user: '',
                region: ''
            },
            value: '',
            tableData: [{
                id: '',
                name: '',
                sex: '',
                tel: '',
                address: '',
                birth: '',
                repositoryBelongID: ''
            }],
            params: [],
            paramss: [],
        }
    },
    methods: {
        Reset () {
            this.searchByID = '';
            this.searchByName = '';
            this.searchByRepositoryID = '';
        },
        searchSelections () {
            var url = 'http://localhost:8888/repositoryAdminManage/getRepositoryAdminList';
            this.params = {
                searchType: "searchAll",
                keyWord: "sy"
            }
            // console.log(this.params);
            var that = this;
            this.axios.post(url, qs.stringify(that.params)).then(function (res) {
                if (res != undefined && res.data) {
                    res.data.forEach(element => {
                        that.searchByIDs.push(element);
                        that.searchByNames.push(element);
                        that.searchByRepositoryIDs.push(element);
                    });
                }
                // console.log(that.searchByIDs)
            });
        },
        onSubmit (value) {
            var keyWordName;
            if (this.searchByRepositoryID) {
                keyWordName = this.searchByRepositoryID
                console.log(keyWordName)
            }
            if (this.searchByName) {
                keyWordName = this.searchByName
                console.log(keyWordName)
            }
            if (this.searchByID) {
                keyWordName = this.searchByID
                console.log(keyWordName)
            }
            this.tableData = [];
            var url = 'http://localhost:8888/repositoryAdminManage/getRepositoryAdminList';
            var that = this;
            this.paramss = {
                searchType: value,
                keyWord: keyWordName
            }
            console.log(this.paramss)
            this.axios.post(url, qs.stringify(this.paramss)).then(function (res) {
                if (res != undefined && res.data) {
                    res.data.forEach(element => {
                        that.tableData.push(element);
                    });
                }
            });
        },
        getCustomers () {
            var url = 'http://localhost:8888/customerManage/getCustomerList';
            var that = this;
            this.axios.get(url, qs.stringify(this.params)).then(function (res) {
                // console.log(".......")
                // console.log(res.data)
                // console.log(".......")
                if (res != undefined && res.data) {
                    that.customers = res.data;//
                    // console.log(res.data[0])
                }
            });

        },
    },
    mounted () {
        this.getCustomers();
        this.searchSelections();
    }
}
</script>
<style scoped>
</style>