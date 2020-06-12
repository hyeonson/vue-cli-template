<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card
          elevation="0"
        >
          <v-img
            class="white--text ml-3 mr-auto mt-3 mb-3 pointer-cursor"
            max-width="190px"
            src="/images/partners_logo2.png"
            @click="gomain"
          >
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
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
    };
  },
  methods: {
    gomain(){
      window.location.href='/'
    }
  }
};
</script>
<style lang="css">
</style>