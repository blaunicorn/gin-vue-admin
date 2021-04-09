<template>
  <div class="tpl-select-group">
    <el-button-group>
      <el-button
        v-for="item in timeDime"
        :type="item.type"
        :key="item.id"
        size="mini"
        @click="selectTimeDime(item.id, item.dateType)"
        >{{ item.name }}</el-button
      >
    </el-button-group>
    <span v-show="isShow">
      <span style="margin-left: 20px; font-size: 14px">{{ lable }}:</span>
      <el-date-picker
        v-model="dateParam"
        :type="dateType"
        :format="dateType == 'week' ? 'yyyy 第 WW 周' : ''"
        placeholder="请选择时段"
        :picker-options="{ firstDayOfWeek: 1 }"
        size="mini"
        v-if="dateType != ''"
        @change="selectDateParam"
      >
      </el-date-picker>
      <quarter-component
        ref="quarterComponent"
        v-if="dateType == ''"
        @selectSeason="selectSeason"
        style="display: inline-block; position: relative"
      ></quarter-component>
    </span>
  </div>
</template>
<script>
  import QuarterComponent from './quarterComponent.vue';
  import { parseTime } from '@/utils/index.js';

  const timeDime = [
    {
      id: 1,
      value: 'YEAR',
      name: '年',
      type: '',
      dateType: 'year',
    },
    {
      id: 2,
      value: 'QUARTER',
      name: '季',
      type: '',
      dateType: '',
    },
    {
      id: 3,
      value: 'MONTH',
      name: '月',
      type: '',
      dateType: 'month',
    },
    {
      id: 4,
      value: 'WEEK',
      name: '周',
      type: '',
      dateType: 'week',
    },
    {
      id: 5,
      value: 'DAY',
      name: '日',
      type: '',
      dateType: 'date',
    },
  ];
  export default {
    components: {
      QuarterComponent,
    },
    props: {
      lable: {
        default: '查询时间',
        type: String,
      },
      isShow: {
        // 是否显示时间选择框
        default: true,
        type: Boolean,
      },
    },
    data() {
      return {
        dateType: 'week',
        dateParam: '',
        timeType: '', // 时间维度
        timeDime: JSON.parse(JSON.stringify(timeDime)),
        evalutionTime: '',
      };
    },
    created() {
      this.timeDime.map((item, index) => {
        if (this.dateType === item.dateType) {
          this.timeDime[index].type = 'primary';
          this.timeType = this.timeDime[index].value;
        }
      });
      this.dateParam = parseTime(new Date(), '{y}-{m}-{d}');
      this.evalutionTime = this.dateParam;
      this.selectTimeAndType();
    },
    methods: {
      // 选择时间
      selectDateParam(val) {
        this.evalutionTime = parseTime(val);
        console.log('selectDateParam', this.evalutionTime);
        this.selectTimeAndType();
      },
      // 选择季度
      selectSeason(val) {
        this.evalutionTime = val;
        this.selectTimeAndType();
      },
      // 选择时间维度
      selectTimeDime(id, dateType) {
        this.timeDime = JSON.parse(JSON.stringify(timeDime)); // 清空
        this.dateType = dateType;
        this.timeDime.map((item, index) => {
          if (id === item.id) {
            this.timeDime[index].type = 'primary';
            this.timeType = this.timeDime[index].value;
          }
        });
        this.evalutionTime = parseTime(new Date());
        console.log('selectTimeDime', this.evalutionTime);
        this.selectTimeAndType();
      },
      clearSelTime() {
        // 清空选择
        if (this.dateType === '') {
          this.$refs.quarterComponent.clearInput();
        } else {
          this.dateParam = '';
        }
      },
      selectTimeAndType() {
        this.$emit('selectTimeAndType', {
          time: this.evalutionTime,
          type: this.timeType,
        });
      },
    },
  };
</script>