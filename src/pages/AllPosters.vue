<template lang="html">
    <v-app>
        <div>
            <vue-headful title="슥삭" description="슥삭" />
            <Navbar>
            </navbar>
            <!-- <Banner></Banner> -->
            <v-container fluid>
                <v-layout row wrap>
                    <v-flex xs12 sm2>
                        <Tabbar :ismobile="ismobile" :pagename="pagename" :drawer="drawer" :userinfo="userinfo"></Tabbar>
                    </v-flex>
                    <v-flex :class="isMobile ? 'mx-auto mt-5 xs12': 'mx-auto mt-5 xs12 sm10'">
                        <v-container fluid class="px-5" style="min-height:1200px">
                            <v-row class="mt-5">
                                <span class="col-12 rem-2 text-left">게재 중인 포스터 현황(모바일)</span>
                            </v-row>
                            <v-row class="mt-2">
                                <v-tabs v-model="tab" background-color="primary" dark>
                                    <v-tab v-for="item in items" :key="item.tab" v-on:click="goCategory(item.href)">
                                        {{ item.tab }}
                                    </v-tab>

                                </v-tabs>
                            </v-row>

                            <v-row class="">
                                <v-text-field label="검색어" height="40" outlined hint="검색어를 입력해주세요." class="ml-auto mr-0 col-xs-6 col-sm-4 mt-1" v-model="query" block v-on:keyup.enter="searchEnter()"></v-text-field>
                                <v-btn height="40" class="bg-main text-white mt-3" @click="searchEnter()"><v-icon>mdi-magnify</v-icon></v-btn>
                            </v-row>

                            <v-row v-if="errMsg != null" class="mt-5">
                                <span class="col-12 display-1 text-left">{{errMsg}}</span>
                            </v-row>
                            <v-row v-if="errMsg == null && posters != null && posters.length == 0" class="mt-5">
                                <span class="col-12 display-1 text-left">업로드된 포스터가 없습니다.</span>
                            </v-row>
                            
                            <v-row class="mt-5">

                                <v-col cols="12" md="6" v-for="poster in posters">
                                    <v-card
                                        height="300"
                                        outlined
                                        elevation="5"
                                        class=""
                                        :href="'/posters/' + poster.posterIdx"
                                    >

                                        <v-list-item class="px-0">
                                            <v-list-item-avatar
                                                height="300"
                                                width="195"
                                                tile
                                            >
                                                <img :src="poster.thumbPhotoUrl">
                                            </v-list-item-avatar>
                                
                                            <v-list-item-content>
                                                <v-list-item-title class="">{{poster.posterName}}</v-list-item-title>
                                                <v-list-item-title class="">~{{poster.publicOpenEndDate.substring(0, 10)}}</v-list-item-title>

                                                <v-list-item-subtitle class="">
                                                    <span v-if="poster.adminAccept == 0">승인안됨</span>
                                                    <span v-else-if="poster.adminAccept == 1">승인됨</span>
                                                    <span v-else>광고 포함 승인됨</span>
                                                </v-list-item-subtitle>

                                                <v-list-item-subtitle class="">
                                                    <span v-if="poster.isEnded == 1">기간지남</span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            
                                        </v-list-item>

                                    </v-card>
                                </v-col>


                            </v-row>
                            <v-row v-if="tableInfo" class="mt-5 mb-5">
                                <v-col cols="12" class="text-center">
                                    <v-btn v-if="tableInfo.curSet > 1" class="bg-main text-white mt-1" @click="getSetPageHref(-1)"><v-icon>mdi-chevron-left</v-icon></v-btn>
                                    <v-btn v-for="pageNum in pageList" :class="cur == pageNum ? 'mx-1 mt-1 blue darken-2 text-white' : 'mx-1 mt-1 white text-black'" elevation="5" @click="getPageHref(pageNum)">{{pageNum}}</v-btn>
                                    <v-btn v-if="tableInfo.curSet < tableInfo.totalSet" class="bg-main text-white mt-1" @click="getSetPageHref(1)"><v-icon>mdi-chevron-right</v-icon></v-btn>
                                </v-col>
                                
                            </v-row>
                        </v-container>
                        <Footer></Footer>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-app>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Tabbar from '../components/Tabbar.vue'
import Footer from '../components/Footer.vue'
import { mapGetters } from 'vuex'

export default {
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()

        this.cur = this.$route.query.curPage
        if(this.cur == null || this.cur < 1){
            this.cur = 1
        }

        this.category = this.$route.query.category
        if(!(this.category == 11 || this.category == 0 || this.category == 1 || this.category == 2 || this.category == 4
        || this.category == 7 || this.category == 5)){
            this.category = null
        }
        
        this.query = this.$route.query.query
        if(this.query == ''){
            this.query = null
        }
        if(this.query != null){
            this.query = this.query.trim()
            if(this.query.length < 2){
                this.query = null
            }
        }

        if(this.category == 11){
            this.tab = 0
        }
        else if(this.category == null){
            this.tab = 1
        }
        else if(this.category == 0){
            this.tab = 2
        }
        else if(this.category == 1){
            this.tab = 3
        }
        else if(this.category == 2){
            this.tab = 4
        }
        else if(this.category == 4){
            this.tab = 5
        }
        else if(this.category == 7){
            this.tab = 6
        }
        else if(this.category == 5){
            this.tab = 7
        }
        else{
            this.tab = 1
        }

        if(this.query == null){
            this.getPosters()
        }
        else{
            this.search()
        }
        
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    data() {
        return {
            pagename: 1,
            window: {
                width: 0,
                height: 0
            },
            ismobile: false,

            drawer: false,
            group: null,

            category: null,
            tab: null,
            items: [
                { tab: '나의 포스터', tabIdx: 11, href:'/posters?category=11&curPage=1' },
                { tab: '전체', tabIdx: -1, href:'/posters?curPage=1'},
                { tab: '공모전', tabIdx: 0, href:'/posters?category=0&curPage=1' },
                { tab: '대외활동', tabIdx: 1, href:'/posters?category=1&curPage=1' },
                { tab: '동아리', tabIdx: 2, href:'/posters?category=2&curPage=1' },
                { tab: '인턴', tabIdx: 4, href:'/posters?category=4&curPage=1' },
                { tab: '교육/강연', tabIdx: 7, href:'/posters?category=7&curPage=1' },
                { tab: '기타', tabIdx: 5, href:'/posters?category=5&curPage=1' },
            ],
            cur: null,
            posters: null,
            tableInfo: null,
            errMsg: null,

            cur: 1,
            totalPage: null,
            startPage: null,
            pageList: [],
            query: null,
        }
    },
    computed: {
        ...mapGetters({
            userinfo: 'getUserInfo'
        })
    },
    components: {
        Navbar,
        Tabbar,
        Footer,
        //Banner
    },
    watch: {
        group() {
            this.drawer = false
        }
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            if (this.window.width <= 500) {
                this.ismobile = true
            } else {
                this.ismobile = false
            }
            this.window.height = window.innerHeight;
        },
        goCategory(href){
            window.location.href=href
        },
        getPageHref(page){
            if(this.query == ''){
                this.query = null
            }
            if(this.query != null){
                this.query = this.query.trim()
                if(this.query.length < 2){
                    this.query = null
                }
            }
            

            if(this.query == null){
                let queryParam = `/posters?curPage=${page}`
                if(this.category != null){
                    queryParam += `&category=${this.category}`
                }
                
                window.location.href=queryParam
                
                
            }
            
            else{
                let queryParam = `/posters?curPage=${page}&query=${this.query}`
                if(this.category != null){
                    queryParam += `&category=${this.category}`
                }
                window.location.href=queryParam
            }
        },
        getSetPageHref(next){
            let firstPage = (Math.ceil(this.cur / 10) - 1) * 10 + 1
            let nextPage;
            if(next == -1){
                nextPage = firstPage - 1
            }
            else{
                nextPage = firstPage + 10
            }
            this.getPageHref(nextPage)
        },
        getPosters(){
            let queryParam = '?cur=' + this.cur
            if(this.category != null){
                queryParam += '&category=' + this.category
                if(this.category == 11 && this.userinfo.authAdmin == 0){
                    this.errMsg = '로그인을 해주세요.'
                    return;
                }
            }

            this.$http.get('/api/posters' + queryParam)
                .then((response) => {
                    console.log(response)
                    if (response.data.status == 200) {
                        this.posters = response.data.data.posters
                        this.tableInfo = response.data.data.tableInfo
                        
                        this.pageList = []
                        for(var i = this.tableInfo.startPage; i <= this.tableInfo.endPage; i++){
                            this.pageList.push(i)
                        }
                    }
                    else if(response.data.status == 400){
                        alert('로그아웃 되었습니다. 다시 로그인해주세요.')
                        this.$store.dispatch('postLogout')
                    }
                    else{
                        alert('로그아웃 되었습니다. 다시 로그인해주세요.')
                        this.$store.dispatch('postLogout')
                    }
                })
        },
        search(){
            //나의포스터일때
            if(this.category == 11){
                this.category = null
                this.tab = 1
            }
            
            let queryParam = `?cur=${this.cur}`
            if(this.category != null){
                queryParam += `&category=${this.category}`
            }
            
            queryParam += `&query=${this.query}`
            this.$http.get('/api/posters/search' + queryParam)
                .then((response) => {
                    console.log(response)
                    if (response.data.status == 200) {
                        this.posters = response.data.data.posters
                        this.tableInfo = response.data.data.tableInfo

                        this.pageList = []
                        for(var i = this.tableInfo.startPage; i <= this.tableInfo.endPage; i++){
                            this.pageList.push(i)
                        }
                    }
                    else {
                        console.log('nothing')
                    }
                })
        },
        searchEnter(){
            if(this.query == null || (this.query != null && this.query.trim().length < 2)){
                alert('검색어를 두글자 이상 입력해주세요.')
                return
            }
            else{
                this.query = this.query.trim()
                queryParam += '&query=' + this.query
            }
            let queryParam = `/posters?curPage=1&query=${this.query}`
            if(this.category == 11){
                this.category = null;
            }
            
            if(this.category != null){
                queryParam += `&category=${this.category}`
            }
            window.location.href=queryParam
        }
    }
}
</script>

<style lang="css">

</style>