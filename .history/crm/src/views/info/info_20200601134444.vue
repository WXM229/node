<template>
  <div class="infoBox">
    <el-card>
      <div class="block">
        <el-date-picker
          v-model="date"
          align="right"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
        ></el-date-picker>
        <br>
        <el-input style="width:220px;margin-top:10px" v-model="name" placeholder="请输入姓名"></el-input>
        <br>
        <el-input style="width:220px;margin-top:10px" v-model="province" placeholder="请输入省份"></el-input>
        <br>
        <el-input style="width:220px;margin-top:10px" v-model="city" placeholder="请输入市区"></el-input>
        <br>
        <el-input style="width:220px;margin-top:10px" v-model="address" placeholder="请输入地址"></el-input>
        <br>
        <el-input style="width:220px;margin-top:10px" v-model="zip" placeholder="请输入邮编"></el-input>
        <br>
        <el-button
          style="width:220px;margin-top:10px"
          autofocus
          type="primary"
          round
          @click="submit"
        >提交
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {add} from '@/api/getData.js'

  export default {
    data() {
      return {
        date: "",
        name: "",
        province: "",
        city: "",
        address: "",
        zip: ""
      };
    },
    created() {
      console.log(this.$route.query);
      // 获取到query中的数据之后 判断是否有的数据，有的话就赋值给data中的属性
      let obj = this.$route.query;
      if (obj.id != undefined) {
        for (let k in obj) {
          if (k != 'id') {
            this[k] = obj[k]
          }
        }
      }
    },
    methods: {
      submit() {
        let {date, name, province, city, zip, address} = this;
        if (!date || !name || !province || !city || !zip || !address) {
          this.$message({
            message: '所有输入框不能为空',
            type: 'warning'
          });
        } else {
          let obj = {
            date, name, province, city, zip, address
          }
          if (this.$route.query.id != undefined) {
            obj.id = this.$route.query.id
          }
          console.log(obj)
          add(obj).then((data) => {
            if (data.data.errorCode == 0) {
              this.$router.push('/table')
            } else {
              let str = obj.id === undefined ? '添加失败' : '编辑失败'
              this.$message.error(str)
            }
          })
        }

      }

    }
  };
</script>
<style lang="less">
  .infoBox {
    line-height: 40px;
  }
</style>
