<template>
  <div class="listBox">
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
          <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import { getList } from "@/api/getData.js";
import { del } from "@/api/getData.js";
export default {
  created() {
    this.initList()
  },
  methods: {
    initList() {
      let p = getList();
      p.then(data => {
        console.log(data);
        this.tableData = data.data.data;
        this.loading = false
      });
    },
    handleClick(row) {
      console.log(row);

    // 1、 只传id 把从后台获取到的数据 存储到localStorage中
    // 2、点击的时候 把整条的数据存储到localStorage
    // 3、只传id 然后根据id去后台请求数据
    // 4、点击编辑的时候 进行query传参和跳转到info这一页，带着参数过去，
      this.$router.push({path:'/info',query:row});
      
    },
    del(row) {
      this.row = row;
      this.dialogVisible = true;
    },
    sureDel() {
      this.dialogVisible = false;
      // 删除 需要告诉后台删除数据的ID
      let p = del({ id:this.row.id }); // 这个del执行值得是axios的del，不是methods中的del
      // 删除成功就提示 用户删除成功，失败就提示删除失败
      p.then(data => {
        if (data.data.errorCode == 0) {
          // 删除成功，重新请求列表数据
          this.initList();
          this.$message.success('删除成功')
        }else{
          this.$message.error('删除失败')
        }
      });
    },
    add(){
      this.$router.push({path:"/info"})

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
.top-button{
  float:right;
  margin-bottom: 20px;
}
</style>

