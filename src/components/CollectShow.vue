<template>
  <div class="CollectShow" style="margin: auto;">
    <div class="table">
      <el-row :gutter="5">
        <el-col :span="15">
          <div class="searchWord" style="text-align: left;width: 80%">
            <div style="display: inline-block"> 小区搜索：</div>
            <el-input v-model="search" style="display: inline-block;width: 50%"
                      placeholder="请输入小区名称" suffix-icon="el-icon-search">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="clearFilter" style="text-align: right;width: 95%">
            <el-button @click="clearFilter" size="small">清除筛选</el-button>
          </div>
        </el-col>
      </el-row>
      <!--.slice((currentPage-1)*pagesize,currentPage*pagesize)@sort-change='sort_change'@filter-change="filterChange"-->
      <el-table
        :data="collectdata"
        ref="collectref"
        stripe
        style="width: 100%"
        row-key="houseId"


        v-loading="loading"
      ><!--:default-sort="{prop: 'housePrice', order: 'descending'}"-->
        <el-table-column type="expand"><!--展开内容-->
          <template slot-scope="props">
            <el-form label-position="right" class="demo-table-expand">
              <el-row>
              <el-col :span="12">
                <el-form-item label="具体位置">
                  <span>{{ props.row.houseAddr}}</span>
                </el-form-item>
                <el-form-item label="房屋面积">
                  <span>{{ props.row.houseArea}} （平方米）</span>
                </el-form-item>
                <el-form-item label="房屋描述" style="width: 100%">
                  <span style="width: 80%;">{{props.row.houseDescribe}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="业务员代码">
                  <span>{{ props.row.houseAgency}}</span>
                </el-form-item>
                <el-form-item label="业务员姓名">
                  <span>{{ props.row.agencyName}}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ props.row.agencyPhone}}</span>
                </el-form-item>
              </el-col>
              </el-row>
              <el-row>
                <el-carousel :interval="4000" height="300px" width="90%">
                  <el-carousel-item v-for="item in imagebox(props.row)" :key="item.id">
                    <div style="text-align: center;width: 100%">
                      <img :src="item.idView" :onerror="errorpic" style=" height: 300px;">
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <!--以下是--标题内容-->
        <el-table-column
          label="新房/二手"
          prop="houseType"
          :filters="[{ text: '新房', value: 'new' }, { text: '二手', value: 'second' }]"
          :filter-method="filterType"
          :column-key="'Type'"
          filter-placement="bottom-end">
          <template slot-scope="props">
            <el-tag type="success" v-if="props.row.houseType==='new'">新房</el-tag>
            <el-tag v-if="props.row.houseType==='second'">二手房</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="小区名称"
          prop="houseName">
        </el-table-column>
        <el-table-column
          label="户型"
          prop="houseLayout"
          :filters="[{ text: '一室', value: 'one' }, { text: '二室', value: 'two' },{ text: '三室', value: 'three' },
                   { text: '四室', value: 'four' },{ text: '五室', value: 'five' },{ text: '五室以上', value: 'more' }]"
          :column-key="'Layout'"
          :filter-method="filterLayout"
          filter-placement="bottom-end">
          <template slot-scope="props">
            <span v-if="props.row.houseLayout==='one'">一室</span>
            <span v-if="props.row.houseLayout==='two'">二室</span>
            <span v-if="props.row.houseLayout==='three'">三室</span>
            <span v-if="props.row.houseLayout==='four'">四室</span>
            <span v-if="props.row.houseLayout==='five'">五室</span>
            <span v-if="props.row.houseLayout==='more'">五室以上</span>
          </template>
        </el-table-column>

        <el-table-column
          label="每平米售价（万元）"
          prop="housePrice"
          sortable>
        </el-table-column>
        <el-table-column
          label="销售情况"
          prop="houseType"
          :filters="[{ text: '在售', value: 'onsale' }, { text: '已下架', value: 'canceled' }, { text: '已售出', value: 'sold' }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end">
          <template slot-scope="props">
            <el-tag type="success" v-if="props.row.houseStatus==='onsale'">在售</el-tag>
            <el-tag type="info" v-if="props.row.houseStatus==='canceled'">已下架</el-tag>
            <el-tag type="danger" v-if="props.row.houseStatus==='sold'">已售出</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.houseStatus!=='onsale'"
              size="mini"
              type="primary"
              round
              @click="clickAppointment(scope.row)">看房
            </el-button>
            <el-button
              class="el-icon-delete"
              size="mini"
              type="danger"
              round
              @click="clickDelete(scope.row)">
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--<div class="pages" style="text-align: center;padding-top: 3%">
        <el-pagination
          background
          layout="total,prev, pager, next,jumper"
          :total="total"
          @current-change="current_change"
        >&lt;!&ndash;分页&ndash;&gt;
        </el-pagination>
      </div>-->
    </div>

  </div>
</template>


<script>
  export default {
    name: "AgencyShow",
    inject: ['reload'], // 引入方法 实现删除后自动刷新
    data() {
      return {
        errorpic: 'this.src="' + require('../../static/pics/house/nopic.jpg') + '"',
        collect: [],
        search: '',
        pagesize: 10,//每页条数
        currentPage: 1,//当前页码，默认第一页开始
        total: 0,//信息总条数
        loading: true,
        user: this.$store.getters.getRoles,
        buyer: this.$store.getters.getUserId
      }
    },
    computed: {
      // 模糊搜索
      collectdata() {//collectdata 返回表格的最终数据
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.collect.filter(data => {
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
        return this.collect//如不搜索，表格内显示house[]的数据
      }
    },
    /*    created(){
          this.buyer = this.$store.getters.getUserId
        },*/
    mounted() {
      this.$axios.get("http://localhost:8080/Collect/findCollect/" + this.buyer).then(response => {
        console.log(response);
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.collect.push(response.data[i])//把后端返回的信息存如house[]
        }
        this.total = response.data.length;//记录分页信息总条数
        this.loading = false;//loading动画结束
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })
    },
    /**
     buyer
     */
    methods: {
      imagebox(row) {
        console.log(row.housePic)
        var pics = [];
        for (var i = 1; i < 6; i++) {
          pics.push({id: i, idView: "../../static" + row.housePic + i.toString() + ".jpg"});
        }
        return pics
      },
      clickDelete(row) {
        console.log(row)
        this.$confirm('此操作删除该条房屋收藏, 是否继续?', '删除收藏', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          let data = {
            collectHouse: row.houseId,
            collectBuyer: this.buyer
          }
          this.$axios.post("http://localhost:8080/Collect/Delete", JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response);
            console.log(response.data);

            this.$message({
              type: 'success',
              message: '删除成功!'
            });

            this.reload();//刷新

          })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      clickAppointment(row) {
        this.$confirm('是否需要预约中介看房?', '预约看房', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          let data = {
            dealOwner:row.houseOwner,
            dealHouse: row.houseId,
            dealAgency: row.houseAgency,
            dealBuyer: this.buyer,
            dealStatus: 'ing'
          };
          console.log(data);
          this.$axios.post("http://localhost:8080/Deal/saveDeal", JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response);
            console.log(response.data);
            if (response.data === 'info_needed') {
              this.$message({
                showClose: true,
                message: '信息有误',
                type: 'warning'
              });
            } else if (response.data === "success") {
              this.$confirm('业务员 ' + row.agencyName + '将与您联系。欢迎致电' + row.agencyPhone, '预约成功', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
              }).then(() => {
                this.$message({
                  showClose: true,
                  message: '预约成功 业务员将与您联系',
                  type: 'success'
                });
              })
            } else if (response.data === "deal_existed") {
              this.$message({
                showClose: true,
                message: '房屋已售出',
                type: 'warning'
              });
            } else if (response.data === "deal_ing") {
              this.$message({
                showClose: true,
                message: '已经预约过了',
                type: 'warning'
              });
            } else {//其他情况全部联系业务员
              this.$message({
                showClose: true,
                message: '预约失败 请联系业务员了解',
                type: 'error'
              });
            }


          })

        })
      },
      clearFilter() {//清除表单筛选
        this.$message('清除筛选');
        this.$refs.collectref.clearFilter();
      },
      //筛选 新房二手
      filterType(value, row) {
        return row.houseType === value;
      },
      //筛选 户型
      filterLayout(value, row) {
        return row.houseLayout === value;
      },
      //筛选 房屋状态信息
      filterStatus(value, row) {
        return row.houseStatus === value;
      },
    }


  }
</script>

<style>
  .demo-table-expand {
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
  }
</style>
