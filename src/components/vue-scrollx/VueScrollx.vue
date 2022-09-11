/**
* Created by Lv Cheng on 2022/6/9
* Notes vuescroll组件，无下拉刷新和上拉加载，仅仅有垂直滚动效果
*/
<template>
  <vuescroll :ops="ops">
    <slot name="default"></slot>
  </vuescroll>
</template>

<script>
import vuescroll from 'vuescroll'

export default {
  name: 'VueScrollx',
  components: {vuescroll},
  props: {
    scrollingX: {
      type: Boolean,
      required: false,
      default: false
    },
    scrollingY: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      ops: {
        vuescroll: {
          mode: 'native',
          pullRefresh: {
            enable: false,
          },
          pushLoad: {
            enable: false,
          },
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: this.scrollingX,
          scrollingY: this.scrollingY,
          speed: 300,
          easing: 'easeInQuad',
          verticalNativeBarPos: 'right',
          maxHeight: undefined,
          maxWidth: undefined,
        },
        bar: {
          background: '#999',
          opacity: 1,
          size: '6px',
        },
        rail:{
          gutterOfSide: '0px',
        },
      }, // 在这里设置全局默认配置
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
