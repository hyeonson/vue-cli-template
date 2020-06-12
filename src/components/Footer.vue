<template>
    <v-container fluid>
        <v-footer
            color="primary lighten-1"
            padless
        >
            <v-row
                justify="center"
                no-gutters
            >
                <v-btn
                    color="white"
                    text
                    rounded
                    class="my-2"
                >
                    <a href="https://www.ssgsag.kr" target="_blank" class="text-white no-uline">Introduce</a>
                </v-btn>
                <v-btn
                    color="white"
                    text
                    rounded
                    class="my-2"
                >
                    <a href="https://www.facebook.com/ssgsag/" target="_blank" class="text-white no-uline">Facebook</a>
                </v-btn>
                <v-btn
                    color="white"
                    text
                    rounded
                    class="my-2"
                >
                    <a href="https://www.instagram.com/ssgsag_app/" target="_blank" class="text-white no-uline">Instragram</a>
                </v-btn>
                <v-btn
                    color="white"
                    text
                    rounded
                    class="my-2"
                >
                    <a href="http://admin.ssgsag.kr" target="_blank" class="text-white no-uline">Register</a>
                </v-btn>
                <v-btn
                    color="white"
                    text
                    rounded
                    class="my-2"
                >
                    <a href="https://bit.ly/2VnSAuX" target="_blank" class="text-white no-uline">Download</a>
                </v-btn>

                <v-col
                    class="primary lighten-2 py-4 text-center white--text"
                    cols="12"
                >
                    <span>서울시 서대문구 연세로 50 공학원 212호<br/>
                    문의사항 — ssgsag.univ@gmail.com<br/>
                    {{ new Date().getFullYear() }} — <strong>(주)이십사점오</strong></span>
                </v-col>
            </v-row>
        </v-footer>
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
        links: [
            'Home',
            'About Us',
            'Team',
            'Services',
            'Blog',
            'Contact Us'
        ]
    };
  },
  methods: {
    
  }
};
</script>
<style lang="css">
</style>