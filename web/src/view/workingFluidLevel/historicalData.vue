<template>
  <div class="dashboard-editor-container">
    <el-row style="background: #fff; padding: 10px 10px 0; margin-bottom: 10px">
      <!--部门数据-->
      <el-col :span="5" :xs="24">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入设备名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            default-expand-all
            style="min-width: 155px"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="19" :xs="24">
        <el-form
          :model="queryParams"
          ref="queryForm"
          :inline="true"
          v-show="showSearch"
          label-width="68px"
        >
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
              >重置</el-button
            >
            <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              >导出</el-button
            >
          </el-form-item>
        </el-form>
        <el-table
          v-loading="loading"
          :data="userList"
          height="240"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="设备名称" align="center" min-width="150px">
            <template slot-scope="{ row }">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采集时间" width="160px" align="center">
            <template slot-scope="{ row }">
              <span>{{
                row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="液面深度(m)" width="110px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.liquid_level }}</span>
            </template>
          </el-table-column>
          <el-table-column label="回波时间(s)" align="center" width="95">
            <template slot-scope="{ row }">
              <span
                v-if="row.echo_time"
                class="link-type"
                @click="handleFetchPv(row.echo_time)"
                >{{ row.echo_time }}</span
              >
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="声速(m/s)" align="center" width="95">
            <template slot-scope="{ row }">
              <span>{{ row.sound_velocity }}</span>
            </template>
          </el-table-column>
          <el-table-column label="套压(Mpa)" align="center" width="95">
            <template slot-scope="{ row }">
              <span>{{ row.casing_pressure }}</span>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :style="{ float: 'right', padding: '20px' }"
          :total="total"
          :pager-count="Number(5)"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
        <div class="clear">
          <line-chart :width="'100%'" :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { treeselect, fetchList } from '@/api/article';
  import { parseTime } from '@/utils/index.js';
  import LineChart from './components/LineChart';
  import RaddarChart from './components/RaddarChart';
  import PieChart from './components/PieChart';
  import BarChart from './components/BarChart';
  import TransactionTable from './components/TransactionTable';
  import TodoList from './components/TodoList';
  import BoxCard from './components/BoxCard';
  import infoList from '@/mixins/infoList';

  const lineChartData = {
    newVisitis: {
      yData: [100, 120, 161, 134, 105, 160, 165],
      xData: [120, 82, 91, 154, 162, 140, 145],
    },
  };

  export default {
    name: 'HistoricalData',
    mixins: [infoList],
    components: {
      LineChart,
      RaddarChart,
      PieChart,
      BarChart,
      TransactionTable,
      TodoList,
      BoxCard,
    },
    filters: {
      parseTime(item) {
        return parseTime(item);
      },
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis,
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 用户表格数据
        userList: null,
        // 部门树选项
        deptOptions: undefined,
        defaultProps: {
          children: 'children',
          label: 'label',
        },

        // 部门名称
        deptName: undefined,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 用户表格数据
        userList: null,
        // 日期范围
        dateRange: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          userName: undefined,
          phonenumber: undefined,
          status: undefined,
          deptId: undefined,
        },
      };
    },
    created() {
      this.getList();
      this.getTreeselect();
    },
    methods: {
      /** 查询用户列表 */
      getList() {
        this.loading = true;
        fetchList(this.queryParams, this.dateRange).then((response) => {
          this.userList = response.data.items;
          this.total = response.data.total;
          this.loading = false;
        });
      },
      /** 查询部门下拉树结构 */
      getTreeselect() {
        treeselect().then((response) => {
          this.deptOptions = response.data;
        });
      },
      // 筛选节点
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 节点单击事件
      handleNodeClick(data) {
        this.queryParams.deptId = data.id;
        this.getList();
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.page = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = [];
        this.resetForm('queryForm');
        this.handleQuery();
      },
      /** 导出按钮操作 */
      handleExport() {
        //   const queryParams = this.queryParams;
        //   this.$confirm('是否确认导出所有用户数据项?', "警告", {
        //       confirmButtonText: "确定",
        //       cancelButtonText: "取消",
        //       type: "warning"
        //     }).then(function() {
        //       return exportUser(queryParams);
        //     }).then(response => {
        //       this.download(response.msg);
        //     })
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.lineChartData.xData = selection.map((item) =>
          parseTime(item.timestamp, '{y}-{m}-{d} {h}:{i}')
        );
        this.lineChartData.yData = selection.map((item) => item.liquid_level);
        this.single = selection.length != 1;
        this.multiple = !selection.length;
        console.log(selection, this.ids);
      },
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type];
      },
      getSortClass: function (key) {
        const sort = this.queryParams.sort;
        return sort === `+${key}` ? 'ascending' : 'descending';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .head-container {
      width: 150px;
    }
    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
