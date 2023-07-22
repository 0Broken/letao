<template>
    <div>
        <van-popup :overlay-style="{ backgroundColor: '#ccc' }" v-model:show="show" :close-on-click-overlay="false"
            position="top" :style="{ height: '50%' }">
            <van-search v-model="value" shape="round" show-action placeholder="请输入搜索关键词" @clear="onClear" @search="onSearch"
                @cancel="onCancel" />
            <div class="searchWrap">
                <div class="header">
                    <h3>搜索历史</h3>
                    <i @click="clearHistory" class="iconfont icon-trash"></i>
                </div>
                <div class="footer">
                    <span v-for="(item, index) in historyData" @click="searchData(item)" :key="index">{{ item }}</span>
                </div>
            </div>
            <van-divider />
            <div class="searchWrap">
                <div class="header">
                    <h3>热门搜索</h3>
                    <i @click="eyeChange" :class="['iconfont', eyeOpen ? eyeOpenClass : eyeCloseClass]"></i>
                </div>
                <div class="footer" v-if="eyeOpen">
                    <span>手机</span>
                    <span>iphone</span>
                    <span>电脑</span>
                    <span>充电宝</span>
                    <span>apple</span>
                </div>
                <div class="text-center" v-if="!eyeOpen">已隐藏热门搜索</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Toast, Dialog } from 'vant';

export default {
    data() {
        return {
            value: '',
            show: true,
            eyeOpen: true,
            eyeOpenClass: 'icon-yanjing',
            eyeCloseClass: 'icon-guanbi-yanjing',
            historyData: JSON.parse(localStorage.getItem('historyData') || "[]"),
            gray: "#ccc"
        };
    },
    methods: {
        onSearch() {
            if (this.value === "") {
                Toast('请输入关键词！！')
                return;
            }
            if (!this.historyData.includes(this.value)) {
                this.historyData.unshift(this.value);
                localStorage.setItem('historyData', JSON.stringify(this.historyData));
            }
            this.$router.push('/search-result/' + this.value);
        },
        onCancel() {
            this.$router.push('/home');
        },
        onClear() {
            Toast('删除');
        },
        eyeChange() {
            this.eyeOpen = !this.eyeOpen;
        },
        clearHistory() {
            if (this.historyData == "") {
                return;
            }
            Dialog.confirm({
                title: '搜索历史',
                message: '确定清空吗?',
            }).then(() => {
                this.historyData = [];
                localStorage.setItem('historyData', "");
                Toast('删除成功！');
            }).catch(() => {
                Toast('已取消！');
            });
        },
        searchData(value) {
            this.value = value;
            this.$router.push('/search-result/' + this.value);
        },
        // async _fetchSearch(value) {
        //     let option = {
        //         value,
        //         sort: 'buy',
        //         order: 'desc',
        //         page: 1,
        //         pagesize: 10
        //     }
        //     let data = await fetchSearch(option);
        //     console.log(data);
        // }
    }
}
</script>

<style lang="scss" scoped>
:deep(.van-popup) {
    border-radius: 0 0 10px 10px;
}



:deep(.van-divider) {
    margin: 5px 0;
}

.searchWrap {
    padding: 0 10px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
            color: rgb(92, 90, 90);
        }
    }

    .footer {
        display: flex;
        flex-wrap: wrap;

        span {
            height: 30px;
            line-height: 30px;
            padding: 0px 10px;
            text-align: center;
            background-color: #f4f2f1;
            margin-right: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            font-size: 14px;
        }
    }
}
</style>