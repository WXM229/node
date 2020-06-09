<template>
  <div class="listBox">
    <el-card class="box-card">
      <el-button class="top-button" @click="add()" type="primary" size="small">添加</el-button>
      <el-table :data="tableData" border style="width: 100%" class="tableBox">
        <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row)" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>是否确认删除</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDel">确 定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {getList, del} from "@/api/getData.js";

  export default {
    created() {
      this.initList()
    },
    methods: {
      initList() {
        let p = getList();
        p.then(data => {
          this.tableData = data.data.data;
        });
      },
      handleClick(row) {
        this.$router.push({path: '/info', query: row});

      },
      del(row) {
        this.row = row;
        // this.dialogVisible = true;

        this.$confirm(`是否删除该条${row.id}的数据`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sureDel()
        }).catch(() => {
       
        });
      },
      sureDel() {
        // this.dialogVisible = false;
        let p = del({id: this.row.id});
        p.then(data => {
          if (data.data.errorCode == 0) {
            this.initList();
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        });
      },
      add() {
        this.$router.push({path: "/info"})

      }
    },

    data() {
      return {
        tableData: [],
        dialogVisible: false,
        row: null,
        loading: true
      };
    }
  };
</script>
<style lang="less">
  .tableBox,
  .listBox {
    line-height: 30px;
  }

  .top-button {
    float: right;
    margin-bottom: 20px;
  }
</style>

