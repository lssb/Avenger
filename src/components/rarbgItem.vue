<template>
  <li
    class="text-info"
  >
    <b-link :href="item.download" @click.prevent="$emit('downloadML',item.download)">{{item.title}}</b-link>
    <b-badge
      variant="primary"
      v-for="_category in item.category.split('/')"
      :key="_category"
      style="margin-right: 5px"
    >{{_category}}
    </b-badge>
    <b-badge
      variant="dark">
      {{(item.size/1024/1024/1024).toFixed(2)}} GB
    </b-badge>
    <b-badge
      variant="info">
      {{item.seeders}}/{{item.leechers}}
    </b-badge>
  </li>
</template>

<script>
export default {
  name: 'rarbgItem',
  props: {
    item: {
      type: Object,
      required: false
    }
  }
}
</script>

<style scoped>
  li {
    list-style: none;
    text-align: left;
  }
</style>
