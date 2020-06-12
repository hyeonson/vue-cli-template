<template>
    <v-container fluid style="height: 100%">
        <v-app-bar v-if="ismobile" class="bg-main">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" class="bg-main" :src="bg" absolute temporary dark>
            <v-list v-if="userinfo.authAdmin == 0" dense nav class="py-0">
                <v-list-item v-if="userinfo.authAdmin == 0" class="px-0">
                    <v-list-item-avatar
						size="100"
					>
                        <img src="/images/marketer.png">
                    </v-list-item-avatar>
    
                    <v-list-item-content>
                        <v-list-item-subtitle>광고 성과 조회를 원하시면</v-list-item-subtitle>
                        <v-list-item-subtitle>로그인을 해주세요</v-list-item-subtitle>
                        <v-btn small class="bg-main-light text-white" v-on:click="goLogin">로그인</v-btn>
                    </v-list-item-content>
                    
                </v-list-item>
    
                <v-divider></v-divider>
    
                <v-list-item v-for="item in items" :key="item.text" link :href="item.href">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
    
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                
            </v-list>

            <v-list v-else dense nav class="py-0">

                <v-list-item class="px-0">
                    <v-list-item-avatar
						size="100"
					>
                        <img src="/images/developer.png">
                    </v-list-item-avatar>
    
                    <v-list-item-content>
                        <v-list-item-title>{{userinfo.authName}}님</v-list-item-title>
                        <v-list-item-subtitle>환영합니다.</v-list-item-subtitle>
                        <v-btn small class="bg-main-light text-white mt-1" v-on:click="goMypage()">마이페이지</v-btn>
                        <v-btn small class="bg-main-light text-white mt-1" v-on:click="logout">로그아웃</v-btn>
                    </v-list-item-content>
                    
                </v-list-item>
    
                <v-divider></v-divider>
    
                <v-list-item v-for="item in items" :key="item.text" link :href="item.href">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
    
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                
            </v-list>
        </v-navigation-drawer>
    
    
        <v-card v-if="!ismobile && userinfo.authAdmin == 0" class="bg-main" style="height: 100%">
            <v-list-item class="px-0">
                <v-list-item-avatar
					size="100"
                >
                    <img src="/images/marketer.png">
                </v-list-item-avatar>
    
                <v-list-item-content>
                    <v-list-item-subtitle class="white--text">광고 성과 조회를 원하시면</v-list-item-subtitle>
                    <v-list-item-subtitle class="white--text">로그인을 해주세요</v-list-item-subtitle>
                    <v-btn small class="bg-main-light text-white" v-on:click="goLogin">로그인</v-btn>
                </v-list-item-content>
                
            </v-list-item>
            <v-list class="bg-main-light">
                <v-list-item-group v-model="pagename">
                    <v-list-item v-for="(item, i) in items" :key="i" :href="item.href">
                        <v-list-item-icon>
                            <v-icon class="white--text" v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text" v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="userinfo.authAdmin == 2" href="/admin">
                        <v-list-item-icon>
                            <v-icon class="white--text" v-text="'mdi-lock-outline'"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text" v-text="'관리자 전용'"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>

        <v-card v-if="!ismobile && userinfo.authAdmin != 0" class="bg-main" style="height: 100%">
            <v-list-item class="px-0">
                <v-list-item-avatar
					size="100"
                >
                    <img src="/images/developer.png">
                </v-list-item-avatar>
    
                <v-list-item-content>
                    <v-list-item-title class="white--text">{{userinfo.authName}}님</v-list-item-title>
                    <v-list-item-subtitle class="white--text">환영합니다.</v-list-item-subtitle>
                    <v-btn small class="bg-main-light text-white mt-1" v-on:click="goMypage()">마이페이지</v-btn>
                    <v-btn small class="bg-main-light text-white mt-1" v-on:click="logout">로그아웃</v-btn>
                </v-list-item-content>
                
            </v-list-item>
            <v-list class="bg-main">
                <v-list-item-group v-model="pagename">
                    <v-list-item v-for="(item, i) in items" :key="i" :href="item.href">
                        <v-list-item-icon>
                            <v-icon class="white--text" v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text" v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="userinfo.authAdmin == 2" href="/admin">
                        <v-list-item-icon>
                            <v-icon class="white--text" v-text="'mdi-lock-outline'"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text" v-text="'관리자 전용'"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                
            </v-list>
        </v-card>
    
    </v-container>
</template>

<script>
export default {
    created() {

    },
    mounted() {},
    props: ['ismobile', 'drawer', 'pagename', 'userinfo'],
    components: {},
    data() {
        return {
            items: [
                { text: '포스터 등록', icon: 'mdi-note-text-outline', href: '/'},
                { text: '포스터 현황', icon: 'mdi-cellphone-iphone', href: '/posters?curPage=1'},
            ],
            color: 'primary',
            colors: [
                'primary',
                'blue',
                'success',
                'red',
                'teal',
            ],
            background: false,
        };
    },
    methods: {
        logout(){
            this.$store.dispatch('postLogout')
        },
        goLogin(){
            this.$store.dispatch('goLogin')
        },
        goMypage(){
            window.location.href = '/mypage'
        }
    },
    watch: {

    },
    computed: {
        bg() {
            return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
        },
    }
};
</script>

<style lang="css">

</style>