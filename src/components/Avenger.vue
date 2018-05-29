<template>
  <b-container style="margin-top: 20px;">
    <b-jumbotron header="Avenger Torrent"
                 lead="A torrent Finder and Downloader By Kwlic"
                 border-variant="dark">
      <hr/>
      <div role="tablist">
        <b-input-group prepend="电影名" style="margin-bottom: 10px">
          <b-input-group-text slot="append" :class="'text-'+statusInfo[status][0]">{{statusInfo[status][1]}}
          </b-input-group-text>
          <b-form-input
            id="InputName"
            v-model="InputName"
            placeholder="输入电影名"
          ></b-form-input>
        </b-input-group>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion1 variant="info">电影名字搜索结果-by name</b-btn>
          </b-card-header>
          <b-collapse id="accordion1" accordion="my-accordion" :visible="visible[0]" role="tabpanel">
            <b-card-body>
              <div v-if="!showRes">现在这里还没有东西</div>
              <b-container v-else class="pre-scrollable border-success">
                <b-row>
                  <mediaItem
                    v-for="item in res.subjects"
                    v-bind:key="item.id"
                    :item="item"
                    @searchRaRbg="searchRaRbg"
                  ></mediaItem>
                </b-row>
              </b-container>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion2 variant="info">RARBG 结果</b-btn>
          </b-card-header>
          <b-collapse id="accordion2" accordion="my-accordion" :visible="visible[1]" role="tabpanel">
            <b-card-body>
              <div v-if="!showRarbg">现在这里还没有东西</div>
              <ul v-else>
                <rarbgItem
                  v-for="rarbgItem in rarbgRes"
                  :key="rarbgItem.title"
                  :item="rarbgItem"
                  @downloadML="downloadML"
                ></rarbgItem>
              </ul>
            </b-card-body>
          </b-collapse>
        </b-card>
        <transition name="slide-fade">
        </transition>
      </div>
    </b-jumbotron>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import mediaItem from './mediaItem'
import rarbgItem from './rarbgItem'

export default {
  components: {
    mediaItem,
    rarbgItem
  },
  name: 'FindNames',
  data: function () {
    return {
      trURL: 'http://172.17.128.23:9091/transmission/rpc',
      showRes: false,
      showRarbg: false,
      res: {},
      InputName: '',
      rarbgRes: {},
      status: 0,
      tmpMsg: 'unknow',
      statusInfo: {
        0: ['dark', '尚无输入'],
        1: ['dark', '等待输入结束'],
        2: ['warning', '正在搜索豆瓣'],
        3: ['success', '✓'],
        4: ['danger', '与 rarbg 的通讯出现问题'],
        5: ['warning', '正在向 transmission 发送请求'],
        6: ['danger', this.tmpMsg],
        7: ['danger', '已完成搜索，但是没有结果'],
        8: ['warning', '正在搜索rarbg']
      },
      visible: [false, false]
    }
  },
  watch: {
    InputName: function (newV, oldV) {
      this.status = 1
      this.debouncedGetDouban()
    }
  },
  created: function () {
    this.debouncedGetDouban = this.lodash.debounce(this.getDouban, 1200)
  },
  methods: {
    getDouban: function () {
      this.status = 2
      let vm = this
      this.$jsonp('http://api.douban.com/v2/movie/search?q=' + this.InputName)
        .then(function (response) {
          console.log(response)
          if (response.total > 0) {
            vm.status = 3
            vm.showRes = true
            vm.res = response
            vm.visible = [true, false]
          } else {
            vm.status = 7
          }
          console.log()
        })
    },
    searchRaRbg: function (item) {
      // this.showRes = false
      this.status = 8
      let vm = this
      console.log(item)
      this.axios.get('/api/searchRarbg?q=' + item)
        .then(function (response) {
          vm.rarbgRes = response.data
          vm.status = 3
          vm.visible = [false, true]
          vm.showRarbg = true
          console.log(response.data)
        })
        .catch(function () {
          vm.status = 4
        })
    },
    downloadML: function (link) {
      let vm = this
      // todo  这里暂时把transmission的授权登陆关掉了，， 用axios拦截器搞定之后再开
      // todo 构建之后的跨域问题， 因为要从header中取得seddion id， 可是jsonp似乎不能实现， 再看看吧，要不再试试后端
      this.tmpMsg = '正在获取 transmission 的授权'
      this.status = 6
      // this.axios.post(this.trURL, {}).then((res) => {
      //   console.log(res.headers)
      // })
      //   .catch((err) => {
      //     vm.status = 5
      //     vm.axios.post(vm.trURL, {
      //       'method': 'torrent-add',
      //       'arguments': {'filename': link}
      //     }, {
      //       'headers': {'x-transmission-session-id': err.response.headers['x-transmission-session-id']}
      //     }).then(res => {
      //       console.log('get info')
      //       vm.status = 3
      //     }).catch(err => {
      //       vm.tmpMsg = '未知错误'
      //       vm.status = 6
      //       console.log(err)
      //     })
      //   })
      this.axios.post('/api/download?q=' + encodeURI(link), {q: link})
        .then((res) => {
          // console.log(res)
          vm.status = 3
        })
      console.log(encodeURI(link))
    }
  }
}
</script>

<style scoped>

</style>
