import Vue from "vue";
import {customAxios}from "./apiConfig";
import { mapState } from "vuex";
import api from './api';
Vue.mixin({
  data() {
    return {
      API:api,
      //       export const webSocketUrl = process.env.NODE_ENV == 'development' ? 'ws://23.91.100.214:8686/sub' : window.webSocketUrl ? window.webSocketUrl : 'wss://market-api.rdb.one/sub';
      // export const webSocketUrl2 = process.env.NODE_ENV == 'development' ? 'ws://23.91.100.214:8687/sub' : window.webSocketUrl2 ? window.webSocketUrl2 : 'wss://market-api.rdb.one/sub';
      webSocketUrl:
        process.env.NODE_ENV == "development"
          ? "ws://xx"
          : window.webSocketUrl
          ? window.webSocketUrl
          : "wss://xx",
      passwordRules: [
        v => !!v || this.lang.login.passwordEmpty,
        v => (/^.{6,16}$/g.test(v) ? true : this.lang.tradePaw.tradePassword17),
        v =>
          /^[a-zA-Z0-9@#$%^&*.!|+]{6,16}$/g.test(v)
            ? true
            : this.lang.tradePaw.tradePassword18
      ],
      codeRules: [
        v => !!v || this.lang.login.codeEmpty,
        v => (/^[0-9]{6}$/g.test(v) ? true : this.lang.login.codeError)
      ],
    };
  },
  computed: {
    ...mapState(['test']),
  },
  methods: {
    // 获取到底部的高度
    offsetTop (el){
      try {
        if(typeof  el != 'object') return 0;
        var t = 0;
        t = el.offsetTop;
        if(el.offsetParent){
          return t + this.offsetTop(el.offsetParent);
        };
        return t;
      }catch (e) {

      }
    },
    imgUrl(url) {
      //   let origin = process.env.NODE_ENV == 'development' ? ' https://www.del.plus' : window.location.origin;
      //  APP离线包URL
      if((/file/gi.test(location.href))){
        return customAxios.defaults.baseURL + "/" + url;
      };
      let origin =
        process.env.NODE_ENV == "development"
          ? "http://heyueplus.vroot.win"
          : window.location.origin;

      return origin + "/" + url;
    },
    // 数目2位小数
    numDecimalsInt(num) {
      // return Number.parseFloat(num * 1 || 0).toFixed(4)
      return this.toDecimals(num, 2);
    },
    // 数目3位小数
    numDecimalsInt2(num) {
      // return Number.parseFloat(num * 1 || 0).toFixed(4)
      return this.toDecimals(num, 3);
    },
    // 价格小数
    priceDecimals(price) {
      // return Number.parseFloat(price * 1 || 0).toFixed(8)
      return this.toDecimals(price, 4);
    },
    // 价格小数
    priceDecimals22(price) {
      // return Number.parseFloat(price * 1 || 0).toFixed(8)
      return this.toDecimals(price, 6);
    },

    // 数量小数
    numDecimals(num) {
      // return Number.parseFloat(num * 1 || 0).toFixed(4)
      return this.toDecimals(num, 4);
    },
    // 数量小数
    numDecimals1(num) {
      // return Number.parseFloat(num * 1 || 0).toFixed(4)
      return this.toDecimals(num, 1);
    },

    // 百分号小数
    perCentDecimals(perCent) {
      // return Number.parseFloat(perCent * 1 || 0).toFixed(2)
      return this.toDecimals(perCent, 2);
    },
    numSplit (num, len){
      num = num + '';
      if(/\./.test(num)){
        return num.replace(eval('/([0-9]+\\.[0-9]{1,' + len + '})(.*)/g'),"$1");
      };
      return num;
    },
    // decimals (val){
    //   return (val + '').replace(/\./, '?').replace(/[^0-9\?]*/g, "").replace(/\?/g, ".");
    // },
    // 人民币小数
    rmbDecimals(perCent) {
      return this.toDecimals(perCent, 2);
      // return Number.parseFloat(perCent * 1 || 0).toFixed(2)
    },

    totalDecimals(total) {
      return this.toDecimals(total, 8);
    },

    rmbTotalDecimals(perCent) {
      return this.toDecimals(perCent, 6);
      // return Number.parseFloat(perCent * 1 || 0).toFixed(2)
    },
    upperCase(val) {
      return (val + "").toUpperCase();
    },

    toDecimals(val, len) {
      if (val) {
        len = len || 4;
        if (/e-/gi.test(val.toString())) {
          val = val.toString().replace(/e-/gi, "e-");
          let e = val.split("e-");
          e[0] = e[0].replace(/\./, "");
          let l = "0.";
          for (let i = 0; i < e[1] * 1; i++) {
            l = l + "0";
          }
          val = l + e[0];
        } else {
          val = (val + "").replace(
            eval("/(-?)([0-9]*)(.?)([0-9]{1," + len + "})(.*)/"),
            "$1$2$3$4"
          );
        }
        if (/\./.test(val)) {
          val = val.split(".");
          var s = "";
          for (var i = 0; i < len; i++) {
            if (val[1][i]) {
              s += val[1][i];
            }
          }
          return val[0] + "." + s;
        } else {
          val = val + ".";
          for (var i = 1; i <= len; i++) {
            val = val + "0";
          }
          return val;
        }
      } else {
        return val;
      }
    },
    localDate(date, day, split = "-") {
      if (date) {
        day = day || false;
        date = date + "";
        if (/\./.test(date)) {
          date = date * 1000 + "";
        }
        if (date.length == 10) {
          date = date * 1000;
        }
        var d = new Date(Math.floor(date * 1));
        d = d ? d : new Date();
        if (day) {
          if (day == -1) {
            return (
              this.twoLen(d.getMonth() + 1) +
              split +
              this.twoLen(d.getDate()) +
              " " +
              this.twoLen(d.getHours()) +
              ":" +
              this.twoLen(d.getMinutes()) +
              ":" +
              this.twoLen(d.getSeconds())
            );
          } else {
            return (
              this.twoLen(d.getHours()) +
              ":" +
              this.twoLen(d.getMinutes()) +
              ":" +
              this.twoLen(d.getSeconds())
            );
          }
        } else {
          return (
            d.getFulldate() +
            split +
            this.twoLen(d.getMonth() + 1) +
            split +
            this.twoLen(d.getDate()) +
            " " +
            this.twoLen(d.getHours()) +
            ":" +
            this.twoLen(d.getMinutes()) +
            ":" +
            this.twoLen(d.getSeconds())
          );
        }
      } else {
        return "";
      }
    }
  }
});
