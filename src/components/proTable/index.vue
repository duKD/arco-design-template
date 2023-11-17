<template>
  <div>
    <a-table :columns="columns" :data="data" />
  </div>
</template>
<script setup lang="ts" name="proTable">
import { ColumnProps, BreakPoint } from "./types";

export interface ProTableProps {
  columns: ColumnProps[]; // 列配置项  ==> 必传
  data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
  requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
  requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
  requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
  dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
  pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
  toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}
import { reactive } from "vue";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Salary",
    dataIndex: "salary",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
const data = reactive([
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com",
  },
  {
    key: "4",
    name: "Ed Hellen",
    salary: 17000,
    address: "42 Park Road, London",
    email: "ed.hellen@example.com",
  },
  {
    key: "5",
    name: "William Smith",
    salary: 27000,
    address: "62 Park Road, London",
    email: "william.smith@example.com",
  },
]);
</script>

<style lang=""></style>
