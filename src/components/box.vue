<template>
    <section class="box" :style="`${_style};height:${height}px;width:100%`">
        <span :style="`${Corner}`"></span><span :style="`${Corner}`"></span><span
            :style="`${Corner}`"></span><span :style="`${Corner}`"></span>
        <div class="box-ele">
            <div class="title" :style="`${titleStyle}`">
                <slot name="title"></slot>
            </div>
            <div class="content" :style="`${contentStyle}`">
                <slot name="content"></slot>
            </div>
        </div>
    </section>
</template>

<script>
  export default {
    name: "box",
    props: {
      height: {
        type: String | Number,
        default: 254
      },
      // width:{
      //   type:String|Number,
      //   default: 440
      // },
      _style: {
        type: String,
        default: ''
      },
      Corner: {
        type: String,
        default: ""
      },
      contentStyle: {
        type: String,
        default: ""
      },
      titleStyle: {
        type: String,
        default: ""
      }

    }
  }
</script>

<style scoped lang="scss">
    .box {
        position: relative;
        box-sizing: border-box;
        height: 200px;
        width: 440px;
        border: 1px solid $box-border-color;
        background: $box-linear-bg-color;

        & > span {
            position: absolute;
            border-style: solid;
            border-color: rgba(0, 52, 255, 1);
            padding: 7.5px;
        }

        .box-ele {
            height: 100%;
            display: flex;
            flex-direction: column;

        }

        .title {
            padding: {
                top: 20px;
                left: 20px;
            };
            font-size: 18px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
        }

        .content {
            overflow: hidden;
            height: 100%;
            /*display: flex; !*flex容器*!*/
        }

    }

    .box span:nth-child(1) {
        left: -2px;
        top: -2px;
        border-width: 2px 0 0 2px;
    }

    .box span:nth-child(2) {
        right: -2px;
        top: -2px;
        border-width: 2px 2px 0 0;
    }

    .box span:nth-child(3) {
        right: -2px;
        bottom: -2px;
        border-width: 0 2px 2px 0;
    }

    .box span:nth-child(4) {
        left: -2px;
        bottom: -2px;
        border-width: 0 0 2px 2px;
    }
</style>