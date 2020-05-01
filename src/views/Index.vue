<template>
    <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in srcList" :key="item">
            <el-image style="width: 400px; height: 400px;padding-left:160px" :src="item">
            </el-image>
        </el-carousel-item>
    </el-carousel>
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
                'static/img/p4.png',
            ]
        }
    },
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
  .el-carousel__item .el-image {
    opacity: 0.75;
    line-height: 200px;
    margin-right: 100px;

  }
</style>
