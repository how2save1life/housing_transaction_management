<template>
  <div class="AgencyShow" style="margin: auto;">
    <div class="table">

      <el-row :gutter="5">
        <el-col :span="15">
          <div class="searchWord" style="text-align: left;width: 80%">
            <div style="display: inline-block"> 业务员搜索：</div>
            <el-input v-model="search" style="display: inline-block;width: 50%"
                      placeholder="请输入业务员代号/姓名/联系方式" suffix-icon="el-icon-search">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">

        </el-col>
      </el-row>
      <!--:data="housedata.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
      <el-table
        :data="agencydata"
        ref="agencyref"
        stripe
        style="width: 100%"
        row-key="agencyId"
        @sort-change='sort_change'
        @filter-change="filterChange"
        v-loading="loading"
      >
        <el-table-column
          label="业务员代号"
          prop="agencyId"
        >
        </el-table-column>
        <el-table-column
          label="业务员姓名"
          prop="agencyName"
        >
        </el-table-column>
        <el-table-column
          label="通信地址"
          prop="agencyAddr"
        ></el-table-column>
        <el-table-column
          label="电话号码"
          prop="agencyPhone"
        ></el-table-column>

      </el-table>
      <div class="pages" style="text-align: center;padding-top: 3%">
        <el-pagination
          background
          layout="total,prev, pager, next,jumper"
          :total="total"
          @current-change="current_change"
        ><!--分页-->
        </el-pagination>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: "AgencyShow",
    data() {
      return {
        agency: [],
        search: '',
        pagesize: 10,//每页条数
        currentPage: 1,//当前页码，默认第一页开始
        total: 0,//信息总条数
        loading:true,
      }
    },
    computed: {
      // 模糊搜索
      agencydata() {//agencydata 返回表格的最终数据
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.agency.filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.agency//如不搜索，表格内显示house[]的数据
      }
    },
    mounted() {
      //返回所有业务员
      this.$axios.get("http://localhost:8080/Agency/findAll").then(response => {
        console.log(response);
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.agency.push(response.data[i])//把后端返回的信息存如agency[]
        }
        this.total = response.data.length;//记录分页信息总条数
        this.loading = false;//loading end
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })
    },
    methods: {
      //分页 切换页面
      current_change: function (currentPage) {
        this.currentPage = currentPage;
      },
    }


  }
</script>

<style>
/*  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }*/
</style>
