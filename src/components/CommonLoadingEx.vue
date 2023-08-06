/**
* Created by Lv Cheng on 2022/7/1
* Notes
*/
<template>
  <div class="loading">
  </div>
</template>

<script>
export default {
  name: 'CommonLoadingEx',
  components: {},
  data() {
    return {
      charts: '',
    }
  },
  methods: {
    drawLoading(_cssSelector) {
      this.charts = this.$echarts.init(document.querySelector(_cssSelector))
      this.charts.setOption({
        graphic: {
          elements: [
            {
              type: 'group',
              left: 'center',
              top: 'center',
              children: new Array(7).fill(0).map((val, i) => ({
                type: 'rect',
                x: i * 20,
                shape: {
                  x: 0,
                  y: -40,
                  width: 10,
                  height: 80
                },
                style: {
                  fill: '#409EFF'
                },
                keyframeAnimation: {
                  duration: 1000,
                  delay: i * 200,
                  loop: true,
                  keyframes: [
                    {
                      percent: 0.5,
                      scaleY: 0.3,
                      easing: 'cubicIn'
                    },
                    {
                      percent: 1,
                      scaleY: 1,
                      easing: 'cubicOut'
                    }
                  ]
                }
              }))
            }
          ]
        }
      })
    },
  },
  created() {
    this.$nextTick(() => {
      this.drawLoading(".loading");
    })
  }
}
</script>

<style scoped lang="less">

.loading {
  z-index: 10000;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(171, 220, 255, .1);
}
</style>
