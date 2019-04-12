<template>
  <div class="HouseShowMy" style="margin: auto;">
    <div class="table">

      <el-row :gutter="5">
        <el-col :span="15">
          <div class="searchWord" style="text-align: left;width: 80%">
            <div style="display: inline-block"> 信息搜索：</div>
            <el-input v-model="search" style="display: inline-block;width: 50%"
                      placeholder="请输入房屋信息" suffix-icon="el-icon-search">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="clearFilter" style="text-align: right;width: 60%">
            <el-button @click="clearFilter" size="small">清除筛选</el-button>
          </div>
        </el-col>
      </el-row>
      <!--.slice((currentPage-1)*pagesize,currentPage*pagesize)@sort-change='sort_change'@filter-change="filterChange"-->
      <el-table
        :data="housedata"
        ref="houseref"
        stripe
        style="width: 1500px"
        row-key="houseId"

        v-loading="loading"
      ><!---->

        <!--以下是--标题内容-->
        <el-table-column
          label="新房/二手"
          prop="houseType"
          :filters="[{ text: '新房', value: 'new' }, { text: '二手', value: 'second' }]"
          :filter-method="filterType"
          :column-key="'Type'"
          filter-placement="bottom-end"
          width="120">
          <template slot-scope="props">
            <el-tag type="success" v-if="props.row.houseType==='new'">新房</el-tag>
            <el-tag v-if="props.row.houseType==='second'">二手房</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="小区名称"
          prop="houseName"
          width="150">
        </el-table-column>
        <el-table-column
          label="门牌号"
          prop="houseAddr"
          width="150"
          :formatter="formatAddr"
        >
        </el-table-column>
        <el-table-column
          label="户型"
          prop="houseLayout"
          :filters="[{ text: '一室', value: 'one' }, { text: '二室', value: 'two' },{ text: '三室', value: 'three' },
                   { text: '四室', value: 'four' },{ text: '五室', value: 'five' },{ text: '五室以上', value: 'more' }]"
          :column-key="'Layout'"
          :filter-method="filterLayout"
          filter-placement="bottom-end"
          width="120">
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
          label="房屋面积（m2）"
          prop="houseArea"
          width="150"
          :formatter="formatArea"
        >
        </el-table-column>
        <el-table-column
          label="售价"
          prop="housePrice"
          width="150"
          :formatter="formatPrice"
        >
        </el-table-column>
        <el-table-column
          label="销售情况"
          prop="houseType"
          :filters="[{ text: '在售', value: 'onsale' }, { text: '已下架', value: 'canceled' }, { text: '已售出', value: 'sold' }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
          width="150">
          <template slot-scope="props">
            <el-tag type="success" v-if="props.row.houseStatus==='onsale'">在售</el-tag>
            <el-tag type="info" v-if="props.row.houseStatus==='canceled'">已下架</el-tag>
            <el-tag type="danger" v-if="props.row.houseStatus==='sold'">已售出</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="房屋描述"
          prop="houseDescribe"
          width="200"
        ></el-table-column>
        <el-table-column
          label="业务员姓名"
          prop="houseAgency"
          width="150"
        >
          <template slot-scope="props">
            <el-popover trigger="hover" placement="top">
              <p>业务员代码: {{ props.row.houseAgency }}</p>
              <p>业务员姓名: {{ props.row.agencyName }}</p>
              <p>业务员电话: {{ props.row.agencyPhone }}</p>
              <div slot="reference" class="name-wrapper">
                {{ props.row.agencyName }}
              </div>
            </el-popover>
          </template>

        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="150"
        >
          <template slot-scope="scope">
            <!-- update button -->
            <el-button
              :disabled="scope.row.houseStatus==='sold'"
              class="el-icon-edit"
              size="mini"
              type="primary"
              round
              @click="clickSetCurrent(scope.row)">
            </el-button>
            <el-button
              :disabled="scope.row.houseStatus==='sold'"
              class="el-icon-delete"
              size="mini"
              type="danger"
              round
              @click="clickSetCurrent(scope.row)">
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--   <div class="pages" style="text-align: center;padding-top: 3%">
             <el-pagination
                  background
                  layout="prev, pager, next,jumper"
                  :total="total"
                  @current-change="current_change"
                >&lt;!&ndash;分页&ndash;&gt;
                </el-pagination>
      </div>-->
    </div>

    <!-------------------------------------------------------------------------------------------------------------------------->
    <el-dialog
      title="修改房屋"

      width="500px"
      :visible.sync="dialogUpdateVisible"
    >
      <div style="margin: auto">
        <el-form :model="update" :ref="update" width="100%" :label-position="labelPosition" label-width="100px" :rules="updateRules">
          <el-form-item label="小区名称" style="width: 80%" prop="houseName">
            <el-input v-model="update.houseName" placeholder="请输入小区名称" disabled></el-input>
          </el-form-item>
          <el-form-item label="房屋地址" style="width: 80%">

            <el-form-item label="" prop="Addr.a_building">
              <el-input v-model="update.Addr.a_building" placeholder="楼栋号" disabled>
                <template slot="append">号楼</template>
              </el-input>
            </el-form-item>

            <el-form-item label="" prop="Addr.a_unit">
              <el-input v-model="update.Addr.a_unit" placeholder="单元号" disabled>
                <template slot="append">单元</template>
              </el-input>
            </el-form-item>

            <el-form-item label="" prop="Addr.a_doors">
              <el-input v-model="update.Addr.a_doors" placeholder="门牌号" disabled>
                <template slot="append">号</template>
              </el-input>
            </el-form-item>

          </el-form-item>

          <el-form-item label="房屋属性" prop="houseType" label-position="top">
            <el-select v-model="update.houseType" placeholder="新房/二手房">
              <el-option label="新房" value="new"></el-option>
              <el-option label="二手房" value="second"></el-option>
            </el-select>

          </el-form-item>

          <el-form-item label="户型" prop="houseLayout" status-icon>
            <el-select v-model="update.houseLayout" placeholder="一室/二室/三室/四室/...">
              <el-option label="一室" value="one"></el-option>
              <el-option label="二室" value="two"></el-option>
              <el-option label="三室" value="three"></el-option>
              <el-option label="四室" value="four"></el-option>
              <el-option label="五室" value="five"></el-option>
              <el-option label="五室以上" value="more"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="房屋面积" style="width: 80%" prop="houseArea">
            <el-input v-model.number="update.houseArea" placeholder="请输入该房屋的面积">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="期望售价" style="width: 80%" prop="housePrice">
            <el-input v-model.number="update.housePrice" placeholder="请输入您期望售出的价格">
              <template slot="append">万元/平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="房屋描述" style="width: 80%" prop="houseDescribe">
            <el-input maxlength="200" type="textarea" :autosize="{ minRows: 2}" v-model="update.houseDescribe"
                      placeholder="请输入您对房屋的简要描述（200字以内）">
            </el-input>
          </el-form-item>
          <el-form-item label="房屋属性" prop="houseType">
            <el-select v-model="update.houseStatus" placeholder="新房/二手房">
              <el-option label="在售" value="onsale"></el-option>
              <el-option label="下架" value="canceled"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="业务员代码" style="width: 80%" prop="houseAgency"
                        :rules="{required: true, message: '请选择业务员', trigger: 'blur'}">
            <el-autocomplete class="my-autocomplete"
                             v-model="update.houseAgency" value-key="agencyId"
                             :fetch-suggestions="querySearchAsync" @select="handleSelect"
                             :debounce=0
                             :trigger-on-focus=false
                             highlight-first-item=true
                             placement="top"
                             placeholder="请输入业务员代码" style="width: 100%">
              <i
                class="el-icon-search el-input__icon"
                slot="suffix"
              >
              </i>
              <template slot-scope="{ item }">
                <div class="id">代码：{{ item.agencyId }}</div>
                <span class="name">业务员：{{ item.agencyName }}</span>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item style="text-align: right;width: 100%">
            <el-button type="primary" @click="clickUpdate(updateRules)">提交修改</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>

  </div>
</template>


<script>
  export default {
    inject: ['reload'], // 引入方法 实现更新后自动刷新
    name: "HouseShowMy",
    data() {
      return {
        house: [],
        search: '',
        labelPosition: 'right',
        dialogUpdateVisible: false,
        loading: true,
        user: this.$store.getters.getRoles,
        owner: this.$store.getters.getUserId,
        agencies: [],
        update: {
          houseName: '',
          houseAddr: '',
          housePrice: '',
          houseType: '',
          houseArea: '',
          houseStatus: '',
          houseOwner: this.$store.getters.getUserId,
          houseAgency: '',
          houseLayout: '',
          houseDescribe: '',
          Addr: {
            a_building: '',
            a_unit: '',
            a_doors: ''
          }
        },
        updateRules: {
          houseAgency: [{required: true, message: '请选择业务员', trigger: 'blur'}],
          houseArea: [{required: true, message: '请输入房屋面积', trigger: 'blur'},
            {type: 'number', message: '面积用数字表示'}],
          housePrice: [{required: true, message: '请输入每平米期望售价', trigger: 'blur'},
            {type: 'number', message: '售价用数字表示'}],
        },
      }
    },
    computed: {
      // 模糊搜索
      housedata() {//housedata 返回表格的最终数据
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.house.filter(data => {
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
        return this.house//如不搜索，表格内显示house[]的数据
      }
    },
    mounted() {
      this.$axios.get("http://localhost:8080/House/myHouse/" + this.owner).then(response => {
        console.log(response);
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.house.push(response.data[i])//把后端返回的信息存如house[]
        }
        //this.total = response.data.length;//记录分页信息总条数
        this.loading = false;//loading end
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })

      /**返回所有agency*/
      this.$axios.get("http://localhost:8080/Agency/findAll").then(response => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          this.agencies.push(response.data[i]);
          // this.agencies.push({'value': response.data[i].agencyId})//value
        }
        console.log(this.agencies);
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })
    },
    methods: {
      //清除表单筛选
      clearFilter() {
        this.$message('清除筛选');
        this.$refs.houseref.clearFilter();
      },
      //筛选 新房二手
      filterType(value, row) {
        return row.houseType === value;
      },
      //筛选 户型
      filterLayout(value, row) {
        return row.houseLayout === value;
      },
      //筛选 交易状态
      filterStatus(value, row) {
        return row.houseStatus === value;
      },
      //房价格式
      formatPrice: function (row, column) {
        return row.housePrice + ' (万元/平方米)'
      },
      //面积格式
      formatArea: function (row, column) {
        return row.houseArea + ' (平方米)'
      },
      //门牌号格式
      formatAddr: function (row, column) {
        let addr = row.houseAddr.split('-')
        return addr[0] + '楼 ' + addr[1] + '单元 ' + addr[2] + '号 '
      },
      /**输入提示*/
      //queryString 为在框中输入的值
      //cb，callback 回调函数,将处理好的数据推回
      querySearchAsync(queryString, cb) {
        var agencies = this.agencies;
        console.log(this.agencies);
        var results = queryString ? agencies.filter(this.createStateFilter(queryString)) : agencies;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);//callback返回建议列表的数据
        }, 1000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.agencyId.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);//-1任意位置查询；0首字母
        };
      }, handleSelect(item) {
        console.log(item);
      },
      //设置更新表单中显示的数据
      clickSetCurrent(row) {
        let addr = row.houseAddr.split('-')
        this.update.houseId = row.houseId;
        this.update.houseName = row.houseName;
        this.update.houseType = row.houseType;
        this.update.houseLayout = row.houseLayout;
        this.update.houseAddr = row.houseAddr;
        this.update.houseArea = row.houseArea;
        this.update.housePrice = row.housePrice;
        this.update.houseOwner = row.houseOwner;
        this.update.houseAgency = row.houseAgency;
        this.update.houseStatus = row.houseStatus;
        this.update.houseDescribe = row.houseDescribe;
        this.update.Addr.a_building = addr[0];
        this.update.Addr.a_unit = addr[1];
        this.update.Addr.a_doors = addr[2];

        this.dialogUpdateVisible = true;//显示表单
      },
      //更新
      clickUpdate(updateRules) {
        this.$refs[updateRules].validate((valid) => {
          if (valid) {//如果输入验证通过
            //确认是否要修改
            this.$confirm('确认修改“' + this.update.houseName + '”小区“' + this.update.houseAddr + '”的信息吗？', '修改房屋信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              this.update.houseAddr = this.update.Addr.a_building + '-' + this.update.Addr.a_unit + '-' + this.update.Addr.a_doors;
              console.log(this.update.houseDescribe);
              let data = this.update;
              console.log(data);
              this.$axios.post('http://localhost:8080/House/Update', JSON.stringify(data),
                {
                  headers: {'Content-Type': 'application/json;charset=UTF-8'}
                }
              ).then(response => {
                console.log("RRRR")
                console.log(response);
                console.log(response.data);
                if (response.data === "success") {//提示成功
                  this.$message({
                    message: `更新成功 `,
                    type: 'success'
                  });
                  this.dialogUpdateVisible = false
                  this.reload()
                }
                else {//提示失败
                  this.$message({
                    message: `error `,
                    type: 'error'
                  });
                }
              }).catch(response => {//exception
                console.log(response);
                console.log(response.data);
                this.$message({
                  message: `error `,
                  type: 'warning'
                });
              })

            })


          } else {//输入验证不通过信息不足 提示
            console.log('error submit!!');
            this.$alert('请完善房屋信息', '信息不足', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  message: `请完善房屋信息`
                });
              }
            });
            return false;//结束
          }
        });


      }

    }


  }
</script>

<style>


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
