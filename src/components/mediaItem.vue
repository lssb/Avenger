<template>
  <b-col cols="6" align="left">
    <b-container>
      <b-row>
        <b-col cols="2">
          <b-img-lazy
            slot="aside"
            :src="item.images.small"
            width="67"
            height="100"
            col="3"
          ></b-img-lazy>
        </b-col>
        <b-col>
          <h6>
            <b>{{ item.title }}</b>
            <small>
              <b-badge
                pill
                style="margin-left: 5px"
                variant="primary"
                v-for="genre in item.genres"
                :key="genre"
              >{{genre}}
              </b-badge>
            </small>
          </h6>
          <h6>
            上映时间：{{item.year}} <br>
            其他名字：{{item.original_title}}<br>
            <b-button
              :href="item.alt"
              size="sm"
              variant="primary"
            >豆瓣链接</b-button>
            <b-button
              size="sm"
              variant="success"
              @click="$emit('searchRaRbg',item.original_title+' '+item.year)"
            >搜RARBG</b-button>
          </h6>
        </b-col>
      </b-row>
    </b-container>
  </b-col>
</template>

<script>
export default {
  name: 'mediaItem',
  props: {
    item: {
      type: Object,
      required: false
    }
  }
}
</script>

<style scoped>

</style>
