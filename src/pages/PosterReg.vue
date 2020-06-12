<template lang="html">
    <v-app>
        <div>
            <vue-headful title="슥삭" description="포스터 등록" />
            <Navbar></Navbar>
            <v-container fluid>
                <v-layout row wrap>
                    <v-flex xs12 sm2>
                        <Tabbar :ismobile="ismobile" :pagename="pagename" :drawer="drawer" :userinfo="userinfo"></Tabbar>
                    </v-flex>
                    <v-flex :class="isMobile ? 'mx-auto mt-5 xs12': 'mx-auto mt-5 xs12 sm10'">
                        <v-container fluid class="pl-10 pr-5">
                            <v-row>
                                <span class="col-12 mt-5 text-left rem-2 m_title">1. 포스터 분야 선택</span>
                                <span class="col-12 pt-0 text-left rem-1 m_subtitle">포스터의 분야를 입력해주세요</span>
                            </v-row>
                            <v-row>
                                <v-btn :class="posterCategoryIdx == 0 ? 'mt-3 mr-2 px-10 py-5 bg-main-dark-opac-15 text-main': 'mt-3 mr-2 px-10 py-5 text-grey-2 border-grey-3'" outlined v-on:click="posterCategoryIdx = 0">공모전</v-btn>
                                <v-btn :class="posterCategoryIdx == 1 ? 'mt-3 mx-2 px-10 py-5 bg-main-dark-opac-15 text-main': 'mt-3 mx-2 px-10 py-5 text-grey-2 border-grey-3'" outlined v-on:click="posterCategoryIdx = 1">대외활동</v-btn>
                                <v-btn :class="posterCategoryIdx == 2 ? 'mt-3 mx-2 px-10 py-5 bg-main-dark-opac-15 text-main': 'mt-3 mx-2 px-10 py-5 text-grey-2 border-grey-3'" outlined v-on:click="posterCategoryIdx = 2">동아리</v-btn>
                                <v-btn :class="posterCategoryIdx == 4 ? 'mt-3 mx-2 px-10 py-5 bg-main-dark-opac-15 text-main': 'mt-3 mx-2 px-10 py-5 text-grey-2 border-grey-3'" outlined v-on:click="posterCategoryIdx = 4">인턴</v-btn>
                                <v-btn :class="posterCategoryIdx == 7 ? 'mt-3 mx-2 px-10 py-5 bg-main-dark-opac-15 text-main': 'mt-3 mx-2 px-10 py-5 text-grey-2 border-grey-3'" outlined v-on:click="posterCategoryIdx = 7">교육/강연</v-btn>
                                <v-btn :class="posterCategoryIdx == 5 ? 'mt-3 mx-2 px-10 py-5 bg-main-dark-opac-15 text-main': 'mt-3 mx-2 px-10 py-5 text-grey-2 border-grey-3'" outlined v-on:click="posterCategoryIdx = 5">기타</v-btn>
                            </v-row>
                            <v-row v-if="posterCategoryIdx == null" style="height: 1200px">
                            </v-row>
    
                            <div v-if="posterCategoryIdx != null">
                                <v-row class="mt-5">
                                    <span class="col-12 rem-2 mt-5 text-left m_title">2. 포스터 정보</span>
                                    <span class="col-12 rem-1 pt-0 text-left m_subtitle">포스터의 제목, 모집일, 홍보기간 등 기본 정보를 입력해주세요</span>
    
                                    <div class="horizon-scroll col-md-4 col-sm-12 col-12 text-center mt-4">
                                        <v-row>
                                            <croppa class="mx-auto" v-model="croppa" :width="285" :height="400" :outputWidth="570" :outputHeigh="800" :quality="8" :file-size-limit="2048 * 4092" :prevent-white-space="true" accept=".jpg,.jpeg,.png" :placeholder="'이미지를 등록해주세요'" @file-choose="alert('file choose')"
                                                @file-size-exceed="alert('file size exceeds')" @file-type-mismatch="alert('file type mismatches')" @new-image="alert('new image attatched')" @image-remove="alert('image removed')">
                                            </croppa>
                                            <v-btn v-if="photoUrl == ''" class="mt-2 mx-auto bg-main-dark text-white" :width="285" :height="50" v-on:click="upload()"><span class="rem-1">포스터 업로드<span class="rem-0_8"><br/>(800x1120 권장)</span></span></v-btn>
                                            
                                            <v-btn v-else class="mt-2 mx-auto bg-main-dark-opac-15 text-main" :width="285" outlined v-on:click="uploadInit()">포스터 초기화</v-btn>
                                        </v-row>
                                    </div>
                                    <div class="col-md-8 col-sm-12 col-12 mt-4">
                                        <v-text-field label="포스터 제목"  placeholder="제목을 입력해주세요." class="mt-2 ml-2" v-model="posterName" block></v-text-field>
                                        <v-row>
                                            <span class="col-12 rem-1 mt-2 text-left m_subtitle pb-0">홍보 시작일 당일에 대다수의 학생에게 노출됩니다</span>
                                            <v-col cols="6" class="px-1">
                                                <v-dialog
                                                    ref="dialog1"
                                                    v-model="menu1"
                                                    persistent
                                                    :return-value.sync="publicOpenStartDate"
                                                    width="290px"
                                                    
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        v-model="publicOpenStartDate"
                                                        label="희망 홍보시작일"
                                                        prepend-icon="event"
                                                        readonly
                                                        v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="publicOpenStartDate" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.dialog1.save(publicOpenStartDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-dialog>
                                            </v-col>

                                            <v-col cols="6" class="px-1">
                                                <v-dialog
                                                    ref="dialog2"
                                                    v-model="menu2"
                                                    persistent
                                                    :return-value.sync="publicOpenEndDate"
                                                    width="290px"
                                                    
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        v-model="publicOpenEndDate"
                                                        label="희망 홍보마감일"
                                                        prepend-icon="event"
                                                        readonly
                                                        v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="publicOpenEndDate" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.dialog2.save(publicOpenEndDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-dialog>
                                            </v-col>

                                            <v-col cols="6" class="px-1">
                                                <v-dialog
                                                    ref="dialog3"
                                                    v-model="menu3"
                                                    
                                                    :return-value.sync="posterStartDate"
                                                    persistent
                                                    width="290px"
                                                    
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        v-model="posterStartDate"
                                                        label="모집시간 시작일(선택)"
                                                        prepend-icon="event"
                                                        readonly
                                                        v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="posterStartDate" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.dialog3.save(posterStartDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-dialog>
                                            </v-col>

                                            <v-col cols="6" class="px-1">
                                                <v-dialog
                                                    ref="dialog4"
                                                    v-model="menu4"
                                                    :return-value.sync="posterEndDate"
                                                    persistent
                                                    width="290px"
                                                    
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                        v-model="posterEndDate"
                                                        label="모집시간 마감일"
                                                        prepend-icon="event"
                                                        readonly
                                                        v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="posterEndDate" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.dialog4.save(posterEndDate)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-dialog>
                                            </v-col>

                                            <v-col cols="6" class="px-1">
                                                <v-dialog
                                                ref="dialog5"
                                                v-model="timeModal"
                                                :return-value.sync="documentDate"
                                                persistent
                                                width="290px"
                                                >
                                                
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="documentDate"
                                                        label="지원 마감시간(선택)"
                                                        prepend-icon="access_time"
                                                        readonly
                                                        v-on="on"
                                                    >
                                                    
                                                    </v-text-field>
                                                </template>
                                                <v-time-picker
                                                    v-if="timeModal"
                                                    v-model="documentDate"
                                                    full-width
                                                >
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="timeModal = false">Cancel</v-btn>
                                                    <v-btn text color="primary" @click="$refs.dialog5.save(documentDate)">OK</v-btn>
                                                </v-time-picker>
                                                </v-dialog>
                                            </v-col>
                                            
                                        </v-row>
                                    </div>
    
    
                                </v-row>
    
                                <v-row class="mt-5">
                                    <span class="col-12 rem-2 mt-5 text-left m_title">3. 포스터 요약 정보</span>
                                    <span class="col-12 rem-1 pt-0 text-left m_subtitle">학생들이 한 눈에 읽을 수 있도록 정보를 3줄 이내로 짧게 요약하여 입력해주세요</span>
                                    <div class="col-xl-3 col-sm-3 col-xs-12 text-center mt-4">
                                        <img src="/images/preview1_1.jpg" width="100%" />
                                    </div>
                                    <div v-if="posterCategoryIdx == 0" class="col-xl-9 col-sm-9 col-xs-12 mt-4">
                                        <v-row>
                                            <!-- 공모전 -->
                                            <v-textarea
                                                v-model="outline"
                                                counter
                                                outlined
                                                label="주제"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="target"
                                                counter
                                                outlined
                                                label="지원자격"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="benefit"
                                                counter
                                                outlined
                                                label="시상내역"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                        </v-row>
                                    </div>
                                    <div v-if="posterCategoryIdx == 1" class="col-xl-9 col-sm-9 col-xs-12 mt-4">
                                        <v-row>
                                            <!-- 대외활동 -->
                                            <v-textarea
                                                v-model="outline"
                                                counter
                                                outlined
                                                label="지원자격"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="target"
                                                counter
                                                outlined
                                                label="활동내용"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="benefit"
                                                counter
                                                outlined
                                                label="혜택"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                        </v-row>
                                    </div>
                                    <div v-if="posterCategoryIdx == 2" class="col-xl-9 col-sm-9 col-xs-12 mt-4">
                                        <v-row>
                                            <!-- 동아리 -->
                                            <v-textarea
                                                v-model="outline"
                                                counter
                                                outlined
                                                label="활동분야"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="period"
                                                counter
                                                outlined
                                                label="활동시간"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="benefit"
                                                counter
                                                outlined
                                                label="혜택"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                        </v-row>
                                    </div>
                                    <div v-if="posterCategoryIdx == 4" class="col-xl-9 col-sm-9 col-xs-12 mt-4">
                                        <v-row>
                                            <!-- 인턴 -->
                                            <v-textarea
                                                v-model="outline"
                                                counter
                                                outlined
                                                label="모집분야"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="target"
                                                counter
                                                outlined
                                                label="지원자격"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="benefit"
                                                counter
                                                outlined
                                                label="근무조건"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                        </v-row>
                                    </div>
                                    <div v-if="posterCategoryIdx == 7" class="col-xl-9 col-sm-9 col-xs-12 mt-4">
                                        <v-row>
                                            <!-- 교육/강연 -->
                                            <v-textarea
                                                v-model="outline"
                                                counter
                                                outlined
                                                label="주제"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="target"
                                                counter
                                                outlined
                                                label="내용/커리큘럼"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-textarea
                                                v-model="period"
                                                counter
                                                outlined
                                                label="일정/기간"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                        </v-row>
                                    </div>
                                    <div v-if="posterCategoryIdx == 5" class="col-xl-9 col-sm-9 col-xs-12 mt-4">
                                        <v-row>
                                            <v-text-field label="항목이름1" outlined hint="항목이름을 입력해주세요." class="mt-2" v-model="columnName1" block></v-text-field>
                                            <!-- 기타 -->
                                            <v-textarea
                                                v-model="columnContent1"
                                                counter
                                                outlined
                                                label="항목내용1"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-text-field label="항목이름2" outlined hint="항목이름을 입력해주세요." class="mt-2" v-model="columnName2" block></v-text-field>
                                            <v-textarea
                                                v-model="columnContent2"
                                                counter
                                                outlined
                                                label="항목내용2"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-text-field label="항목이름3" outlined hint="항목이름을 입력해주세요." class="mt-2" v-model="columnName3" block></v-text-field>
                                            <v-textarea
                                                v-model="columnContent3"
                                                counter
                                                outlined
                                                label="항목내용3"
                                                rows="4"
                                                auto-grow
                                                :rules="columnRules"
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                        </v-row>
                                    </div>
                                </v-row>
    
                                
    
                                <v-row class="mt-5">
                                    <span class="col-12 rem-2 mt-5 text-left m_title">4. 포스터 상세 정보</span>
                                    <span class="col-12 rem-1 pt-0 text-left m_subtitle">자세한 정보를 확인할 수 있도록 자세한 행사/모집 정보를 입력해주세요</span>
                                    <v-col cols="4" class="mt-2">
                                        <img src="/images/preview1_2.jpg" width="100%"/>
                                    </v-col>
                                    <v-col cols="8" class="mt-2">
                                        <v-row>
                                            <v-textarea
                                                v-model="posterDetail"
                                                outlined
                                                label="자세히 보기 내용"
                                                rows="20"
                                                auto-grow
                                                class="col-12 mt-2"
                                            ></v-textarea>
                                            <v-text-field label="포스터 관련 사이트 주소" outlined hint="사이트 주소를 입력해주세요." class="mt-2 col-12" v-model="posterWebsite"></v-text-field>
                                            <v-text-field label="바로 지원 사이트 주소" outlined hint="사이트 주소를 입력해주세요." class="mt-2 col-12" v-model="posterWebsite2"></v-text-field>
                                        </v-row>
                                    </v-col>
                                </v-row>

                                <v-row class="mt-5">
                                    <span class="col-12 rem-2 mt-5 text-left m_title">4-2. 포스터 추가 이미지(선택)</span>
                                    <span class="col-12 rem-1 pt-0 text-left m_subtitle">추가로 삽입하실 이미지를 업로드 해주세요</span>
                                    <v-col cols="6" md="3" class="mt-2">
                                        <img src="/images/preview_detail.jpg" width="100%"/>
                                    </v-col>
                                    <v-col cols="6" md="9" class="mt-2">
                                        <v-row>
                                            <v-file-input accept="image/*" dense label="File input" class="col-12 col-md-4 mt-2" v-model="file"></v-file-input>
                                            <v-col v-if="photoUrl2 == '' || photoUrl2 == null" cols="12" md="4">
                                                <v-btn class="px-1 bg-main-dark text-white" block outlined v-on:click="upload2()">이미지 저장</v-btn>
                                            </v-col>
                                            <v-col v-else cols="12" md="4">
                                                <v-btn class="px-1 bg-main-dark-opac-15 text-main" block outlined v-on:click="uploadInit2()">이미지 초기화</v-btn>
                                            </v-col>
                                            <img v-if="photoUrl2 != ''" :src="photoUrl2" width="100%" class="col-12 col-md-8"/>
                                        </v-row>
                                    </v-col>
                                </v-row>
    
                                <v-row class="mt-5">
                                    <span class="col-12 rem-2 mt-5 text-left m_title">5. 분야 설정 및 타겟팅</span>
                                    <span class="col-12 rem-1 pt-0 pb-0 text-left m_subtitle">타겟팅을 위한 상세 정보 및 분야를 입력해주세요</span>
                                    <span class="col-12 rem-1 pt-0 text-left m_subtitle">유저가 회원가입 시 설정해 놓은 관심 분야를 기반으로 해당 포스터가 추천됩니다</span>
                                </v-row>
    

                                <v-row v-if="userinfo.authAdmin == 2" class="mt-2">
                                    <label class="col-12 text-left mt-2 rem-1" for="mandatoryChecked"><b>무조건 공개</b>(관리자전용)</label>
                                    <input class="col-12 text-left" type="checkbox" id="mandatoryChecked" v-model="mandatoryChecked">
                                </v-row>

                                <v-row v-if="posterCategoryIdx != 2" class="mt-2">
                                    <span class="col-12 rem-1 mt-2 pb-1 text-left">주최기관</span>
                                    <v-col cols="12" sm="4" md="2" class="p-1">
                                        <v-btn :class="hostIdx == 10000 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="hostIdx = 10000">대기업</v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="2" class="p-1">
                                        <v-btn :class="hostIdx == 20000 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="hostIdx = 20000">중견기업</v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="2" class="p-1">
                                        <v-btn :class="hostIdx == 30000 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="hostIdx = 30000">강소기업</v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="2" class="p-1">
                                        <v-btn :class="hostIdx == 40000 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="hostIdx = 40000">스타트업</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="4" md="2" class="pt-0">
                                        <v-btn :class="hostIdx == 50000 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="hostIdx = 50000">공사/공기업</v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="2" class="pt-0">
                                        <v-btn :class="hostIdx == 60000 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="hostIdx = 60000">외국계기업</v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="2" class="pt-0">
                                        <v-btn :class="hostIdx == 95000 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="hostIdx = 95000">기타</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row v-if="posterCategoryIdx == 2" class="mt-2">
                                    <v-col cols="12" sm="4" class="p-1">
                                        <v-btn :class="posterSubCategoryIdx == 0 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="clickSub(0)">연합 동아리</v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="4" class="p-1">
                                        <v-btn :class="posterSubCategoryIdx == 1 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="clickSub(1)">교내 동아리</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-2">
                                    <span class="col-12 rem-1 mt-2 pb-1 text-left">타겟 대학 설정</span>
                                    <v-col cols="12" sm="4" class="p-1">
                                        <v-btn :class="isOnlyUniv == 0 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="clickIsOnlyUniv(0)">지역별</v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="4" class="p-1">
                                        <v-btn :class="isOnlyUniv == 1 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="clickIsOnlyUniv(1)">직접입력</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row v-if="isOnlyUniv == 0" class="mt-2 px-2">
                                    <!-- <span class="col-12 subtitle-2 mt-2 pb-1 text-left">활동지역(중복 선택)</span> -->
                                    <v-btn :class="interestList.indexOf(900) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(900)">전국</v-btn>
                                    <v-btn :class="interestList.indexOf(901) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(901)">서울</v-btn>
                                    <v-btn :class="interestList.indexOf(902) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(902)">부산</v-btn>
                                    <v-btn :class="interestList.indexOf(903) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(903)">대구</v-btn>
                                    <v-btn :class="interestList.indexOf(904) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(904)">인천</v-btn>
                                    <v-btn :class="interestList.indexOf(905) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(905)">광주</v-btn>
                                    <v-btn :class="interestList.indexOf(906) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(906)">대전</v-btn>
                                    <v-btn :class="interestList.indexOf(907) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(907)">울산</v-btn>
                                    <v-btn :class="interestList.indexOf(908) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(908)">경기</v-btn>
                                    <v-btn :class="interestList.indexOf(909) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(909)">강원</v-btn>
                                    <v-btn :class="interestList.indexOf(910) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(910)">충남</v-btn>
                                    <v-btn :class="interestList.indexOf(911) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(911)">충북</v-btn>
                                    <v-btn :class="interestList.indexOf(912) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(912)">전남</v-btn>
                                    <v-btn :class="interestList.indexOf(913) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(913)">전북</v-btn>
                                    <v-btn :class="interestList.indexOf(914) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(914)">경남</v-btn>
                                    <v-btn :class="interestList.indexOf(915) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(915)">경북</v-btn>
                                    <v-btn :class="interestList.indexOf(916) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(916)">제주</v-btn>
                                    <v-btn :class="interestList.indexOf(917) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(917)">세종</v-btn>
                                </v-row>
                                <v-row v-if="isOnlyUniv == 1" class="mt-2">
                                    <v-col cols="8">
                                        <autocomplete ref="autocomplete" :source="univData" results-display="univName" placeholder="대학교 검색 후 아래에서 선택해주세요" input-class="form-control" @selected="addUnivList">
                                        </autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <span v-for="(univ, index) in univList" class="mt-1 ml-1 mr-1 border-main-rounded text-main">{{univ}}<button type="button" v-on:click="deleteUniv(index)" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    </span>
                                </v-row>
    
                                <v-row class="mt-2">
                                    <span class="col-12 rem-1 mt-2 pb-1 text-left">타겟 학과 설정</span>
                                    <v-col sm="4" class="p-1">
                                        <v-btn :class="isOnlyMajor == 0 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="clickIsOnlyMajor(0)">모든 계열</v-btn>
                                    </v-col>
                                    <v-col sm="4" class="p-1">
                                        <v-btn :class="isOnlyMajor == 1 ? 'px-1 bg-main-dark-opac-15 text-main': 'px-1 text-grey-2 border-grey-3'" block outlined v-on:click="clickIsOnlyMajor(1)">특정 계열</v-btn>
                                    </v-col>
                                </v-row>
    
                                <v-row v-if="isOnlyMajor == 1" class="mt-2 px-2">
                                    <v-btn :class="majorCategorySelected[0] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory1(0)">공학계열</v-btn>
                                    <div v-if="majorCategorySelected[0] == 1" class="col-12"></div>
                                    <v-btn v-if="majorCategorySelected[0] == 1" v-for="(major2, index) in majorList[0].majorCategory2" :class="majorList[0].selected[index] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory2(0, index)">{{major2}}</v-btn>
                                    <div v-if="majorCategorySelected[0] == 1" class="col-12"></div>
    
                                    <div v-if="majorCategorySelected[1] == 1" class="col-12"></div>
                                    <v-btn :class="majorCategorySelected[1] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory1(1)">자연과학계열</v-btn>
                                    <div v-if="majorCategorySelected[1] == 1" class="col-12"></div>
                                    <v-btn v-if="majorCategorySelected[1] == 1" v-for="(major2, index) in majorList[1].majorCategory2" :class="majorList[1].selected[index] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory2(1, index)">{{major2}}</v-btn>
                                    <div v-if="majorCategorySelected[1] == 1" class="col-12"></div>
    
                                    <div v-if="majorCategorySelected[2] == 1" class="col-12"></div>
                                    <v-btn :class="majorCategorySelected[2] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory1(2)">인문사회계열</v-btn>
                                    <div v-if="majorCategorySelected[2] == 1" class="col-12"></div>
                                    <v-btn v-if="majorCategorySelected[2] == 1" v-for="(major2, index) in majorList[2].majorCategory2" :class="majorList[2].selected[index] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory2(2, index)">{{major2}}</v-btn>
                                    <div v-if="majorCategorySelected[2] == 1" class="col-12"></div>
    
                                    <div v-if="majorCategorySelected[3] == 1" class="col-12"></div>
                                    <v-btn :class="majorCategorySelected[3] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory1(3)">예체능계열</v-btn>
                                    <div v-if="majorCategorySelected[3] == 1" class="col-12"></div>
                                    <v-btn v-if="majorCategorySelected[3] == 1" v-for="(major2, index) in majorList[3].majorCategory2" :class="majorList[3].selected[index] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory2(3, index)">{{major2}}</v-btn>
                                    <div v-if="majorCategorySelected[3] == 1" class="col-12"></div>
    
                                    <div v-if="majorCategorySelected[4] == 1" class="col-12"></div>
                                    <v-btn :class="majorCategorySelected[4] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory1(4)">의학계열</v-btn>
                                    <div v-if="majorCategorySelected[4] == 1" class="col-12"></div>
                                    <v-btn v-if="majorCategorySelected[4] == 1" v-for="(major2, index) in majorList[4].majorCategory2" :class="majorList[4].selected[index] == 1 ? 'mx-1 bg-main-dark-opac-15 text-main': 'mx-1 text-grey-2 border-grey-3'" outlined v-on:click="clickMajorCategory2(4, index)">{{major2}}</v-btn>
                                    <div v-if="majorCategorySelected[4] == 1" class="col-12"></div>
                                </v-row>
    
                                <v-row class="mt-2">
                                    <span v-if="posterCategoryIdx == 0 || posterCategoryIdx == 1 || posterCategoryIdx == 2" class="col-12 rem-1 mt-2 pb-1 text-left">카테고리(중복 선택)</span>
                                </v-row>

                                <v-row  class="px-2">
                                    <v-btn v-if="posterCategoryIdx == 0 || posterCategoryIdx == 1" :class="interestList.indexOf(201) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(201)">기획/아이디어</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 0 || posterCategoryIdx == 1" :class="interestList.indexOf(202) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(202)">광고/마케팅</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 0 || posterCategoryIdx == 1" :class="interestList.indexOf(206) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(206)">영상/콘텐츠</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 0 || posterCategoryIdx == 1" :class="interestList.indexOf(205) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(205)">디자인</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 0 || posterCategoryIdx == 1" :class="interestList.indexOf(207) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(207)">IT/SW</v-btn>
    
                                    <v-btn v-if="posterCategoryIdx == 0" :class="interestList.indexOf(204) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(204)">문학/시나리오</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 0" :class="interestList.indexOf(208) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(208)">스타트업/창업</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 0" :class="interestList.indexOf(215) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(215)">금융/경제</v-btn>
    
                                    <v-btn v-if="posterCategoryIdx == 0" :class="interestList.indexOf(299) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(299)">기타</v-btn>
    
                                    <v-btn v-if="posterCategoryIdx == 1" :class="interestList.indexOf(213) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(213)">뷰티/패션</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 1" :class="interestList.indexOf(217) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(217)">스포츠/레저</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 1" :class="interestList.indexOf(253) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(253)">해외탐방</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 1" :class="interestList.indexOf(218) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(218)">봉사활동</v-btn>
    
                                    <v-btn v-if="posterCategoryIdx == 1" :class="interestList.indexOf(999) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(999)">기타</v-btn>
    
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(401) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(401)">문화생활</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(402) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(402)">스포츠</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(403) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(403)">여행</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(404) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(404)">음악/예술</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(405) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(405)">봉사</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(406) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(406)">스터디/학회</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(407) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(407)">어학</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(408) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(408)">창업</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(409) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(409)">친목</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(410) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(410)">IT/공학</v-btn>
                                    <v-btn v-if="posterCategoryIdx == 2" :class="interestList.indexOf(411) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(411)">기타</v-btn>
                                </v-row>
    
                                <v-row v-if="posterCategoryIdx == 1" class="mt-2">
                                    <span class="col-12 rem-1 mt-5 pb-1 text-left">대외활동 분류</span>
                                </v-row>
                                <v-row v-if="posterCategoryIdx == 1" class="px-2">
                                    <v-btn :class="interestList.indexOf(251) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(251)">서포터즈</v-btn>
                                    <v-btn :class="interestList.indexOf(252) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(252)">봉사활동</v-btn>
                                    <v-btn :class="interestList.indexOf(255) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(255)">리뷰/체험단</v-btn>
                                    <v-btn :class="interestList.indexOf(254) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(254)">해외봉사/탐방</v-btn>
                                    <v-btn :class="interestList.indexOf(299) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(299)">기타</v-btn>
                                </v-row>
    
                                <v-row v-if="posterCategoryIdx == 4" class="mt-2">
                                    <span class="col-12 rem-1 mt-5 pb-1 text-left">관심직무(중복 선택)</span>
                                </v-row>

                                <v-row v-if="posterCategoryIdx == 4" class="px-2">
                                    <v-btn :class="interestList.indexOf(101) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(101)">경영/비즈니스</v-btn>
                                    <v-btn :class="interestList.indexOf(102) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(102)">영업</v-btn>
                                    <v-btn :class="interestList.indexOf(103) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(103)">제조/생산</v-btn>
                                    <v-btn :class="interestList.indexOf(104) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(104)">개발</v-btn>
                                    <v-btn :class="interestList.indexOf(106) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(106)">인사/교육</v-btn>
                                    <v-btn :class="interestList.indexOf(107) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(107)">미디어</v-btn>
                                    <v-btn :class="interestList.indexOf(109) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(109)">엔지니어링/설계</v-btn>
                                    <v-btn :class="interestList.indexOf(110) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(110)">마케팅/광고</v-btn>
                                    <v-btn :class="interestList.indexOf(111) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(111)">고객서비스/리테일</v-btn>
                                    <v-btn :class="interestList.indexOf(112) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(112)">디자인</v-btn>
                                    <v-btn :class="interestList.indexOf(199) != -1 ? 'mx-1 mt-1 bg-main-dark-opac-15 text-main': 'mx-1 mt-1 text-grey-2 border-grey-3'" outlined v-on:click="clickInterest(199)">기타</v-btn>
                                </v-row>
    
                                <v-row class="mt-2">
                                    <span class="col-12 rem-1 mt-2 pb-1 text-left">해시태그 입력</span>
                                    <v-text-field label="해시태그" outlined dense hint="띄어쓰기 없이 단어만 입력해주세요. 예시) 빅데이터" class="mt-2 col-4 ml-2" v-model="tempKeyword" v-on:keyup.enter="registerKeyword()"></v-text-field>
                                    <v-btn class="ml-2 mt-2 bg-main-dark text-white" v-on:click="registerKeyword()">입력</v-btn>
                                </v-row>
    
                                <v-row>
                                    <span v-for="(keyword, index) in keywordList" class="mt-2 ml-1 mr-1 border-main-rounded text-main">#{{keyword}}<button type="button" v-on:click="deleteKeyword(index)" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    </span>
                                </v-row>
    
                                <v-row v-if="userinfo.authAdmin == 0" class="mt-2">
                                    <span class="col-12 rem-1 mt-2 pb-1 text-left">비회원 담당자 등록</span>
                                </v-row>

                                <v-row v-if="userinfo.authAdmin == 0" class="px-2">
                                    <v-text-field label="주최기관명" outlined hint="주최기관명을 입력해주세요." class="mt-2 col-8" v-model="hostName" block></v-text-field>
                                    <v-text-field label="담당자명" outlined hint="담당자명을 입력해주세요." class="mt-2 col-8" v-model="chargerName" block></v-text-field>
                                    <v-text-field label="연락처" outlined hint="연락처를 입력해주세요." class="mt-2 col-8" v-model="partnerPhone" block></v-text-field>
                                    <v-text-field label="담당자 이메일" outlined hint="담당자 이메일을 입력해주세요." class="mt-2 col-8" v-model="partnerEmail" block></v-text-field>
                                </v-row>


                                <v-row>
                                    <v-col cols="4" class="ml-0 mr-auto">
                                        <v-btn class="bg-main-dark text-white border-main-rounded5 rem-1_2" block :height="60" outlined v-on:click="registerPoster">포스터 등록</v-btn>
                                    </v-col>
                                </v-row>
    
                            </div>
    
                        </v-container>
                        <Footer class="mt-5"></Footer>
    
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
import Autocomplete from 'vuejs-auto-complete'
import majorCategory from '../assets/data/2019MajorCategory1and2.js'
import univData from '../assets/data/2019OnlyUniv.js'

export default {
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize()

        this.majorList = this.majorCategory
        for (var i = 0; i < this.majorCategory.length; i++) {
            let tmpSelected = []
            for (var j = 0; j < this.majorCategory[i].majorCategory2.length; j++) {
                tmpSelected.push(0)
            }
            this.majorList[i]['selected'] = tmpSelected
        }
        this.publicOpenStartDate = this.getNowDate
        this.publicOpenEndDate = this.getNowDate
        this.posterEndDate = this.getNowDate
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    data() {
        return {
            pagename: 0,
            window: {
                width: 0,
                height: 0
            },
            ismobile: false,

            drawer: false,
            group: null,

            posterCategoryIdx: null,
            posterSubCategoryIdx: 0,
            hostIdx: 10000,

            keywordList: [],
            tempKeyword: '',

            croppa: {},

            hostName: '',
            chargerName: '',
            partnerPhone: '',
            partnerEmail: '',
            interestList: [900],
            photoUrl: '',
            thumbPhotoUrl: '',
            photoUrl2: '',
            posterName: '',
            publicOpenStartDate: '',
            publicOpenEndDate: '',
            posterStartDate: '',
            posterEndDate: '',
            documentDate: '',
            posterDetail: '',
            posterWebsite: '',
            posterWebsite2: '',


            outline: '',
            target: '',
            benefit: '',
            period: '',

            columnName1: '',
            columnContent1: '',
            columnName2: '',
            columnContent2: '',
            columnName3: '',
            columnContent3: '',

            isOnlyUniv: 0,
            isOnlyMajor: 0,
            univList: [],
            majorList: null,

            majorCategorySelected: [
                0, 0, 0, 0, 0
            ],

            univData: univData,

            mandatoryShow: 0,
            mandatoryChecked: false,

            majorCategory: majorCategory,

            menu1: false,
            menu2: false,
            menu3: false,
            menu4: false,
            timeModal: false,
            file: null,

            columnRules: [v => v.length <= 66 || '* 글자 수 초과 시 기종에 따라 내용 일부가 표시되지 않을 수 있습니다']

        }
    },
    computed: {
        ...mapGetters({
            userinfo: 'getUserInfo'
        }),
        getNowDate: function(){
            var timezoneOffset = new Date().getTimezoneOffset() * 60000
            return (new Date(Date.now() - timezoneOffset)).toISOString().substr(0, 10)
        }
    },

    components: {
        Navbar,
        Tabbar,
        Footer,
        Autocomplete
    },
    watch: {
        group() {
            this.drawer = false
        },
        posterCategoryIdx: function(newVal, oldVal) {
            if (newVal == 2) {
                hostIdx = 90000
            }
        },
        mandatoryChecked: function(newVal, oldVal) {
            if (newVal) {
                this.mandatoryShow = 1
            } else {
                this.mandatoryShow = 0
            }
        },
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
        addUnivList(obj) {
            this.univList.push(obj['display'])
        },
        countup: function() {
            if (this.posterCategoryIdx == 5) {

                this.hasError1 = this.columnContent1.length > this.maxCount;
                this.hasError2 = this.columnContent2.length > this.maxCount;
                this.hasError3 = this.columnContent3.length > this.maxCount;

                this.curCount1 = this.columnContent1.length;
                this.curCount2 = this.columnContent2.length;
                this.curCount3 = this.columnContent3.length;

            } else {
                this.hasError1 = this.outline.length > this.maxCount;
                this.hasError2 = this.target.length > this.maxCount;
                this.hasError3 = this.benefit.length > this.maxCount;
                this.hasError4 = this.period.length > this.maxCount;

                this.curCount1 = this.outline.length;
                this.curCount2 = this.target.length;
                this.curCount3 = this.benefit.length;
                this.curCount4 = this.period.length;
            }
        },
        upload() {
            if (!this.croppa.hasImage()) {
                alert('사진을 등록해주세요')
                return
            }

            this.croppa.generateBlob((blob) => {
                var fd = new FormData()
                fd.append('imgFile', blob, 'filename.jpg')

                this.$http.post(`/api/posters/reg/photo1`, fd)
                    .then((response) => {
                        if (response.data.status == 200) {
                            console.log(response.data.data);
                            this.photoUrl = response.data.data.photoUrl.original
                            this.thumbPhotoUrl = response.data.data.photoUrl.thumbnail
                            alert('사진 업로드 완료')

                        } else {
                            console.log(response)
                        }
                    }).catch(error => {
                        console.log(error)
                    })

            })
        },
        upload2() {
            if (this.file == null) {
                alert('사진을 등록해주세요')
                return
            }

            var fd = new FormData()
            fd.append('imgFile', this.file, 'filename.jpg')

            this.$http.post(`/api/posters/reg/photo2`, fd)
                .then((response) => {
                    if (response.data.status == 200) {
                        console.log(response.data.data);
                        this.photoUrl2 = response.data.data.photoUrl.original
                        alert('상세이미지 업로드 완료!')
                    } else {
                        console.log(response)
                    }
                }).catch(error => {
                    console.log(error)
                })
        },
        uploadInit() {
            this.photoUrl = ''
            this.croppa.remove()
        },
        uploadInit2() {
            this.photoUrl2 = ''
            this.file = null
        },
        clickSub(subIdx) {
            if (subIdx != this.posterSubCategoryIdx) {
                if (subIdx == 0) {
                    this.univList = []
                } else if (subIdx == 1) {
                    for (var i = 0; i < this.interestList.length; i++) {
                        if (this.interestList[i] >= 900 && this.interestList[i] <= 918) {
                            this.interestList.splice(i, 1)
                            i--
                        }
                    }
                }
                this.posterSubCategoryIdx = subIdx
                this.isOnlyUniv = subIdx
            }
        },

        clickInterest(interestIdx) {
            const targetIdx = this.interestList.indexOf(interestIdx)
            let interestName = null

            if (targetIdx != -1) {
                this.interestList.splice(targetIdx, 1)
                if (interestName != null) {
                    let delIdx = this.keywordList.indexOf(interestName)
                    if (delIdx != -1)
                        this.keywordList.splice(delIdx, 1)
                }
            } else {
                if (interestIdx == 900) {
                    for (var i = 0; i < this.interestList.length; i++) {
                        if (this.interestList[i] >= 901 && this.interestList[i] <= 918) {
                            this.interestList.splice(i, 1)
                            i--
                        }
                    }
                } else if (interestIdx >= 901 && interestIdx <= 918) {
                    let deleteIdx = this.interestList.indexOf(900)
                    if (deleteIdx != -1) {
                        this.interestList.splice(deleteIdx, 1)
                    }
                } else if (interestIdx == 251 || interestIdx == 252 || interestIdx == 255 || interestIdx == 254 || interestIdx == 299) {
                    let deleteIdx = this.interestList.indexOf(251)
                    if (deleteIdx != -1) {
                        this.interestList.splice(deleteIdx, 1)
                    }
                    deleteIdx = this.interestList.indexOf(252)
                    if (deleteIdx != -1) {
                        this.interestList.splice(deleteIdx, 1)
                    }
                    deleteIdx = this.interestList.indexOf(255)
                    if (deleteIdx != -1) {
                        this.interestList.splice(deleteIdx, 1)
                    }
                    deleteIdx = this.interestList.indexOf(254)
                    if (deleteIdx != -1) {
                        this.interestList.splice(deleteIdx, 1)
                    }
                    deleteIdx = this.interestList.indexOf(299)
                    if (deleteIdx != -1) {
                        this.interestList.splice(deleteIdx, 1)
                    }
                }
                this.interestList.push(interestIdx)
                if (interestName != null) {
                    this.keywordList.push(interestName)
                }
            }
        },
        registerPoster() {
            var isValidInterest = false
            for (var i = 0; i < this.interestList.length; i++) {
                if (this.interestList[i] >= 201 && this.interestList[i] <= 299) {
                    isValidInterest = true
                    break;
                }
            }
            if ((this.posterCategoryIdx == 0 ||
                    this.posterCategoryIdx == 1) &&
                isValidInterest == false) {
                alert('카테고리를 선택해주세요(중복가능)')
            } else if (this.photoUrl.trim() == '') {
                alert('2. 포스터 정보 - 이미지 저장 버튼을 눌러주세요')
            } else if (this.posterName.trim() == '') {
                alert('포스터 제목을 입력해주세요')
            } else if (this.publicOpenStartDate.trim() == '') {
                alert('희망 홍보시작일을 입력해주세요')
            } else if (this.publicOpenEndDate.trim() == '') {
                alert('희망 홍보마감일을 입력해주세요')
            } else if (this.posterEndDate.trim() == '') {
                alert('모집시간 마감일을 입력해주세요')
            }
            //카테고리별 항목 검사
            else if (this.posterDetail.trim() == '') {
                alert('포스터 자세히보기 내용을 입력해주세요')
            } else {
                let keywordStr = '';
                let keywordListLeng = this.keywordList.length;
                for (var i = 0; i < keywordListLeng; i++) {
                    if (i == keywordListLeng - 1) keywordStr += '#' + this.keywordList[i]
                    else keywordStr += '#' + this.keywordList[i] + ' '
                }
                this.$http.post('/api/posters', {
                        headers: { 'Content-type': 'application/x-www-form-urlencoded', },
                        posterCategoryIdx: this.posterCategoryIdx,
                        posterSubCategoryIdx: this.posterSubCategoryIdx,
                        hostIdx: this.hostIdx,
                        hostName: this.hostName,
                        chargerName: this.chargerName,
                        partnerPhone: this.partnerPhone,
                        partnerEmail: this.partnerEmail,
                        interestList: this.interestList,
                        photoUrl: this.photoUrl,
                        thumbPhotoUrl: this.thumbPhotoUrl,
                        photoUrl2: this.photoUrl2,
                        posterName: this.posterName,
                        publicOpenStartDate: this.publicOpenStartDate,
                        publicOpenEndDate: this.publicOpenEndDate,
                        posterStartDate: this.posterStartDate,
                        posterEndDate: this.posterEndDate,
                        documentDate: this.documentDate,
                        outline: this.outline,
                        target: this.target,
                        benefit: this.benefit,
                        period: this.period,
                        posterDetail: this.posterDetail,
                        posterWebsite: this.posterWebsite,
                        posterWebsite2: this.posterWebsite2,
                        isOnlyUniv: this.isOnlyUniv,
                        univList: this.univList,

                        isOnlyMajor: this.isOnlyMajor,
                        majorList: this.majorList,

                        columnName1: this.columnName1,
                        columnContent1: this.columnContent1,
                        columnName2: this.columnName2,
                        columnContent2: this.columnContent2,
                        columnName3: this.columnName3,
                        columnContent3: this.columnContent3,

                        keywordStr: keywordStr,
                        mandatoryShow: this.mandatoryShow
                    })
                    .then(response => {
                        if (response.data.status == 200) {
                            window.location.href = '/'
                            alert('포스터 등록 완료')
                        } else {
                            alert('포스터 등록 실패')
                        }
                    })
                    .catch(error => {
                        console.log('register failed', error)
                    })
            }

        },
        registerKeyword() {
            this.tempKeyword = this.tempKeyword.split(' ').join('')
            if (this.tempKeyword.length < 1) {
                alert('키워드를 한글자 이상 입력해주세요')
            } else if (this.tempKeyword.indexOf('#') != -1) {
                alert('\'#\'은 입력할 수 없습니다')
            } else {
                this.keywordList.push(this.tempKeyword)
                this.tempKeyword = ''
            }
        },
        deleteKeyword(index) {
            this.keywordList.splice(index, 1)
        },
        deleteUniv(index) {
            this.univList.splice(index, 1)
        },
        clickIsOnlyUniv(only) {
            if (this.isOnlyUniv != only) {
                this.isOnlyUniv = only
                this.univList = []
                for (var i = 0; i < this.interestList.length; i++) {
                    if (this.interestList[i].interestIdx >= 900 && this.interestList[i].interestIdx <= 918) {
                        this.interestList.splice(i, 1)
                        i--
                    }
                }
                if (only == 0) {
                    this.univList.push(900)
                }
            }
        },
        clickIsOnlyMajor(only) {
            if (this.isOnlyMajor != only) {
                this.isOnlyMajor = only
                for (var i = 0; i < this.majorList.length; i++) {
                    for (var j = 0; j < this.majorList[i].selected.length; j++) {
                        this.$set(this.majorList[i].selected, j, 0)
                    }
                    this.majorCategorySelected.splice(i, 1, 0)
                }

            }
        },
        clickMajorCategory1(idx) {
            if (this.majorCategorySelected[idx] == 0) {
                this.majorCategorySelected.splice(idx, 1, 1)

                for (var i = 0; i < this.majorList[idx].selected.length; i++) {
                    this.$set(this.majorList[idx].selected, i, 1)
                }

            } else {
                this.majorCategorySelected.splice(idx, 1, 0)
                for (var i = 0; i < this.majorList[idx].selected.length; i++) {
                    this.$set(this.majorList[idx].selected, i, 0)
                }
            }

        },
        clickMajorCategory2(idx, idx2) {
            if (this.majorList[idx].selected[idx2] == 0) {
                this.$set(this.majorList[idx].selected, idx2, 1)

            } else {
                this.$set(this.majorList[idx].selected, idx2, 0)
            }
            let tmp = this.majorCategorySelected[idx]
            this.majorCategorySelected.splice(idx, tmp, tmp)

        },

    }
}
</script>

<style lang="css">

</style>