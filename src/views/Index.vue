<template>
    <div>
        <el-image style="width: 600px; height: 400px;padding-left:300px" :src="url" :preview-src-list="srcList">
        </el-image>
    </div>
</template>

<script>
export default {
    data () {
        return {
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            url: 'static/img/p4.png',
            srcList: [
                'static/img/p1.jpg',
                'static/img/p2.jpg',
                'static/img/p3.jpg',
            ]
        }
    },
    components: {

    }
}
</script>

<style scoped>
.h1 {
    color: red;
    font-size: 30px;
}
.span {
    color: grey;
    font-size: 30px;
    display: block;
    margin: 0;
    padding-top: 50px;
}
</style>
