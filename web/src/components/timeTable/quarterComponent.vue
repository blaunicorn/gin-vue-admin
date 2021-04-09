<template>
  <div>
    <mark
      style="
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0);
        z-index: 999;
      "
      v-show="showSeason"
      @click.stop="showSeason = false"
    ></mark>
    <el-input
      placeholder="请选择季度"
      size="mini"
      v-model="showValue"
      style="width: 138px"
      @focus="showSeason = true"
    >
      <i slot="prefix" class="el-input__icon el-icon-date"></i>
    </el-input>
    <el-card
      class="box-card"
      style="
        width: 322px;
        padding: 0 3px 20px;
        margin-top: 10px;
        position: fixed;
        z-index: 9999;
      "
      v-show="showSeason"
    >
      <div
        slot="header"
        class="clearfix"
        style="text-align: center; padding: 0"
      >
        <button
          type="button"
          aria-label="前一年"
          class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
          @click="prev"
        ></button>
        <span role="button" class="el-date-picker__header-label"
          >{{ year }}年</span
        >
        <button
          type="button"
          aria-label="后一年"
          @click="next"
          class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
        ></button>
      </div>
      <div class="text item" style="text-align: center">
        <el-button
          type="text"
          size="medium"
          style="width: 40%; color: #606266; float: left"
          @click="selectSeason(0)"
          >第一季度</el-button
        >
        <el-button
          type="text"
          size="medium"
          style="float: right; width: 40%; color: #606266"
          @click="selectSeason(1)"
          >第二季度</el-button
        >
      </div>
      <div class="text item" style="text-align: center">
        <el-button
          type="text"
          size="medium"
          style="width: 40%; color: #606266; float: left"
          @click="selectSeason(2)"
          >第三季度</el-button
        >
        <el-button
          type="text"
          size="medium"
          style="float: right; width: 40%; color: #606266"
          @click="selectSeason(3)"
          >第四季度</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script>
  import { parseTime } from '@/utils/index.js';
  const quarterArray = [
    {
      value: 1,
      list: ['01', '02', '03'],
    },
    {
      value: 2,
      list: ['04', '05', '06'],
    },
    {
      value: 3,
      list: ['07', '08', '09'],
    },
    {
      value: 4,
      list: ['10', '11', '12'],
    },
  ];
  export default {
    props: {
      getValue: {
        default: () => {},
        type: Function,
      },
      defaultValue: {
        default: '',
        type: String,
      },
    },
    data() {
      return {
        quarterArray: quarterArray,
        showSeason: false,
        season: '',
        year: new Date().getFullYear(),
        showValue: '',
      };
    },
    created() {
      const value = parseTime(new Date());
      const arr = value.split('-');
      this.year = arr[0];
      const month = arr[1];
      let quarter = 1;
      quarterArray.find((item, index) => {
        item.list.find((vo) => {
          if (vo === month) {
            quarter = item.value;
            return;
          }
        });
      });
      this.showValue = `${this.year}年 第${quarter}季度`;
    },
    methods: {
      one() {
        this.showSeason = false;
      },
      prev() {
        this.year = this.year * 1 - 1;
      },
      next() {
        this.year = this.year * 1 + 1;
      },
      selectSeason(i) {
        const that = this;
        that.season = i + 1;
        that.showSeason = false;
        this.showValue = `${this.year}年 第${this.season}季度`;
        var dateParam = '';
        if (this.season === 1) {
          dateParam = '-01-01';
        } else if (this.season === 2) {
          dateParam = '-04-01';
        } else if (this.season === 3) {
          dateParam = '-07-01';
        } else if (this.season === 4) {
          dateParam = '-10-01';
        }
        that.$emit('selectSeason', this.year + dateParam);
      },
      clearInput() {
        this.showValue = '';
      },
    },
  };
</script>