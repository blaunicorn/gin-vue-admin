<template>
  <div class="upload">
    <iframe
      style="width: 100%; height: calc(100vh - 200px)"
      class="iframe"
      src="http://baidu.com"
      frameborder="0"
      width="100%"
      height="200px"
    />
    <iframe
      style="height: calc(100vh - 200px)"
      class="iframe"
      :src="url2"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </div>
</template>
<script>
  const path = process.env.VUE_APP_BASE_API;
  import { mapGetters } from 'vuex';
  import infoList from '@/mixins/infoList';
  import { exportExcel, loadExcelData, downloadTemplate } from '@/api/excel';
  import { getMenuList } from '@/api/menu';
  export default {
    name: 'Excel',
    mixins: [infoList],
    data() {
      return {
        listApi: getMenuList,
        path: path,
        url2: 'http://127.0.0.1:8888/swagger/index.html',
      };
    },
    computed: {
      ...mapGetters('user', ['userInfo', 'token']),
    },
    methods: {
      handleExcelExport(fileName) {
        if (!fileName || typeof fileName !== 'string') {
          fileName = 'ExcelExport.xlsx';
        }
        exportExcel(this.tableData, fileName);
      },
      loadExcel() {
        this.listApi = loadExcelData;
        this.getTableData();
      },
      downloadExcelTemplate() {
        downloadTemplate('ExcelTemplate.xlsx');
      },
    },
    created() {
      this.pageSize = 999;
      this.getTableData();
    },
  };
</script>