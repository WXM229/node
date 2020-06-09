<template>
  <div class="nav_height">
    <el-container style="height: 500px; border: 1px solid #eee;">
      <el-aside width="200px" style="height: 600px">
        <el-menu default-active="1-1" style="height: 600px"  background-color="#001133" text-color="#fff">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>导航一
            </template>
            <el-menu-item-group>
              <router-link to="/table">
                <el-menu-item index="1-1">人物列表</el-menu-item>
              </router-link>
              <router-link to="/info">
                <el-menu-item index="1-2">人物管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav_height {
  height: 100%;
  color: #f2f2f2;
}
a {
  text-decoration: none;
}
/*.tac .is-active {*/
/*  color: #333;*/
/*  i {*/
/*    color: #999;*/
/*  }*/
/*}*/
/*.tac .router-link-active {*/
/*  .el-menu-item,*/
/*  i {*/
/*    color: sandybrown;*/
/*  }*/
/*}*/
</style>
