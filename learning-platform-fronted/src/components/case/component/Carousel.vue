<template>
    <a-carousel :after-change="onChange" autoplay style="padding-bottom: 20px">
        <div v-for="item in img">
            <img :key="item" :src="item"/>
        </div>
    </a-carousel>
</template>

<script>
    import img1 from "@/assets/news/plice-1.jpg"
    import img2 from "@/assets/news/plice-2.jpg"
    import img3 from "@/assets/news/img-1.jpg"
    import img4 from "@/assets/news/img-2.jpg"


    export default {
        name: "Carousel",
        data() {
            return {
                img: [img1, img3, img4, img2]
            }
        },
        methods: {
            onChange(a, b, c) {
                console.log(a, b, c);
            },
        },
    }
</script>

<style scoped>

    img {
        width: 100%;
        height: 350px;
    }

    .ant-carousel >>> .slick-slide {
        text-align: center;
        height: 300px;
        line-height: 160px;
        background: #364d79;
        overflow: hidden;
    }

    .ant-carousel >>> .slick-slide h3 {
        color: #fff;
    }
</style>