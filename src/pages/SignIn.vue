<template lang="html">
    <v-app>
        <vue-headful title="슥삭 로그인" description="슥삭 로그인" />
        <navbar></navbar>
        <v-container fluid style="height:100%">
            <v-layout row wrap style="height:100%">
                <v-col cols="12" sm="8" class="bg-image">
                    <v-container fluid>
                        <v-layout row wrap class="mt-200 mx-auto" style="width: 30%">
                            <v-img src="/images/partners_ssgsag_logo.png"></v-img>
                        </v-layout>
                        <v-row>
                            <span class="rem-2_5 mt-5 mx-auto">누적 앱 다운로드 10K+</span>
                        </v-row>
                        <v-row>
                            <span class="rem-1_5 mt-5 mx-auto">손쉬운 대학생 타켓광고</span>
                        </v-row>
                        <v-row>
                            <span class="rem-1_5 mt-1 mx-auto">광고 성과 제공</span>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col v-if="isSignUp == false" cols="12" sm="4">
                    <v-container fluid>
                        <v-row class="mt-200">
                            <span class="rem-1_5"> 슥삭 파트너스 로그인</span>
                        </v-row>
                        <v-text-field label="이메일" outlined class="mt-5" :rules="[rules.required]" v-model="inputEmail"></v-text-field>
                        <v-layout row wrap class="mt-2">
                            <span class="ml-auto mr-0 rem-1 text-3 pointer-cursor" @click="goTempPassword()">비밀번호를 잊어버리셨나요?</span>
                        </v-layout>
                        <v-text-field label="비밀번호" outlined type="password" :rules="[rules.required]" v-model="inputPassword" v-on:keyup.enter="login"></v-text-field>
                        <v-row v-if="userinfo.errMsg" class="mt-2 text-left">
                            <span class="caption red--text">{{userinfo.errMsg}}</span>
                        </v-row>

                        <v-row>
                            <v-btn large block class="bg-main-dark text-white" v-on:click="login">로그인</v-btn>
                            <v-btn large block class="mt-3 bg-main-dark-opac-15 text-main" v-on:click="pageChange">회원가입</v-btn>
                            <span class="ml-auto mr-0 rem-1 text-3 mt-2 pointer-cursor" v-on:click="goMain">돌아가기</span>
                        </v-row>
    
                        <v-row class="mt-100 text-left">
                            <span class="rem-1 text-grey-2">(주)이십사점오<br/>대표이사 김신우<br/>서울시 서대문구 연세로 50<br/>연세대학교 공학원 212호 (주)이십사점오<br/>ssgsag.univ@gmail.com</span>
                        </v-row>
    
    
                    </v-container>
                </v-col>
                <v-col v-else cols="12" sm="4">
                    <v-container fluid>
                        <v-row class="mt-100">
                            <span class="rem-1_5"> 슥삭 파트너스 회원가입</span>
                        </v-row>
                        <v-row class="mt-5">
                            <span class="rem-1_5 font-weight-bold">기본정보</span>
                        </v-row>
                        <v-text-field label="이메일" outlined :rules="[rules.required]" hint="이메일을 입력해주세요" class="mt-3" v-model="signUpEmail"></v-text-field>
                        <v-text-field label="비밀번호" type="password" outlined :rules="[rules.required]" hint="비밀번호를 입력해주세요" class="mt-1" v-model="signUpPassword"></v-text-field>
                        <v-text-field label="비밀번호 재입력" type="password" outlined :rules="[rules.required]" hint="비밀번호를 다시 입력해주세요" class="mt-1" v-model="signUpPassword2"></v-text-field>
    
                        <v-row class="mt-5">
                            <span class="rem-1_5 font-weight-bold">소속정보</span>
    
                        </v-row>
                        <v-text-field label="소속기관명" outlined class="mt-3" :rules="[rules.required]" hint="소속기관명을 입력해주세요" v-model="signUpHostName"></v-text-field>
                        <v-text-field label="담당자명" outlined class="mt-1" :rules="[rules.required]" hint="담당자명을 입력해주세요" v-model="signUpChargerName"></v-text-field>
                        <v-text-field label="담당자 연락처" outlined class="mt-1" :rules="[rules.required]" hint="담당자 연락처를 입력해주세요" v-model="signUpPartnerPhone"></v-text-field>
    

                        <v-row v-if="errMsg" class="mt-2 text-left">
                            <span class="caption red--text">{{errMsg}}</span>
                        </v-row>
                        <v-row>
                            <v-btn large block class="bg-main-dark text-white" v-on:click="signUp">회원가입 완료</v-btn>
                            <v-btn large block class="mt-3 bg-main-dark-opac-15 text-main" v-on:click="pageChange">회원가입 취소</v-btn>
                            <span class="ml-auto mr-0 rem-1 text-3 mt-2 pointer-cursor" v-on:click="goMain">돌아가기</span>
                        </v-row>
    
                    </v-container>
                </v-col>
            </v-layout>
    
        </v-container>
    
    
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed:{
        ...mapGetters({
            userinfo: 'getUserInfo',
            errMsg: 'getErrMsg'
        })
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize()
        this.$store.dispatch('clearErrMsg')
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    data() {
        return {
            isSignUp: false,
            window: {
                width: 0,
                height: 0
            },
            ismobile: false,
            drawer: false,
            group: null,
            rules: {
                required: value => !!value || 'Required.',
            },
            inputEmail: null,
            inputPassword: null,

            signUpEmail: null,
            signUpPassword: null,
            signUpPassword2: null,
            signUpHostName: null,
            signUpChargerName: null,
            signUpPartnerPhone: null
        }
    },
    components: {},
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
            this.window.height = window.innerHeight
        },
        pageChange() {
            this.isSignUp = !this.isSignUp
            this.signUpMsg = null
        },
        login(){
            const object = {
                inputEmail: this.inputEmail,
                inputPassword: this.inputPassword
            }
            this.$store.dispatch('postLogin', object)
        },
        goMain(){
            window.location.href='/'
        },
        goTempPassword(){
            window.location.href='/temppassword'
        },
        signUp(){
            if(this.signUpEmail == null || this.signUpEmail.length == 0){
                this.$store.dispatch('setErrMsg', '이메일을 입력해주세요.')
            }
            else if(this.signUpPassword == null || this.signUpPassword.length == 0){
                this.$store.dispatch('setErrMsg', '비밀번호를 입력해주세요.')
            }
            else if(this.signUpPassword2 == null || this.signUpPassword2.length == 0){
                this.$store.dispatch('setErrMsg', '비밀번호를 입력해주세요.')
            }
            else if(this.signUpPassword != this.signUpPassword2){
                this.$store.dispatch('setErrMsg', '비밀번호가 일치하지 않습니다.')
            }
            else if(this.signUpHostName == null || this.signUpHostName.length == 0){
                this.$store.dispatch('setErrMsg', '소속기관명을 입력해주세요.')
            }
            else if(this.signUpChargerName == null || this.signUpChargerName.length == 0){
                this.$store.dispatch('setErrMsg', '담당자명을 입력해주세요.')
            }
            else if(this.signUpPartnerPhone == null || this.signUpPartnerPhone.length == 0){
                this.$store.dispatch('setErrMsg', '담당자 연락처를 입력해주세요.')
            }
            else{
                const object = {
                    partnerEmail: this.signUpEmail,
                    partnerPw: this.signUpPassword,
                    hostName: this.signUpHostName,
                    chargerName: this.signUpChargerName,
                    partnerPhone: this.signUpPartnerPhone
                }
                this.$store.dispatch('postSignUp', object)
            }
            
        }
    }
}
</script>

<style lang="css">
.bg-image {
    background-image: url("/images/bg_frontpage.png") !important;
    height: 100% !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
}
</style>