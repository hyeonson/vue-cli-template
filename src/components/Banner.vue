<template>
    <v-container fluid>
        <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
            class="">
            <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
            ></v-carousel-item>
        </v-carousel>
    </v-container>
</template>
<script>
export default {
  created() {
    
  },
  mounted() {},
  props: [],
  components: {
  },
  data() {
    return {
        items: [
            {
                src: 'https://project-hs.s3.ap-northeast-2.amazonaws.com/1585884265768.jpg',
            },
            {
                src: 'https://project-hs.s3.ap-northeast-2.amazonaws.com/1585884440208.jpg',
            },
            {
                src: 'https://project-hs.s3.ap-northeast-2.amazonaws.com/1585884619604.jpg',
            }
        ]
    };
  },
  methods: {
    
  }
};
</script>
<style lang="css">
</style>