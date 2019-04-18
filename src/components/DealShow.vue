<template>
  <div class="DealShow" style="margin: auto">
    <div class="DealInfo">
      <el-row :gutter="5">
        <el-col :span="15">
          <div class="searchWord" style="text-align: left;width: 80%">
            <div style="display: inline-block"> 快速搜索：</div>
            <el-input v-model="search" style="display: inline-block;width: 50%"
                      placeholder="请输入相关信息" suffix-icon="el-icon-search">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="clearFilter" style="text-align: right;width: 82%">
            <el-button @click="clearFilter" size="small">清除筛选</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="dealdata"
        ref="dealref"
        stripe
        style="width: 100%"
        row-key="dealId"
        v-loading="loading">
        <!--houseType-->
        <el-table-column
          label="新房/二手"
          width="110"
          prop="houseType"
          :filters="[{ text: '新房', value: 'new' }, { text: '二手', value: 'second' }]"
          :filter-method="filterType"
          filter-placement="bottom-end">
          <template slot-scope="props">
            <el-tag type="success" v-if="props.row.houseType==='new'">新房</el-tag>
            <el-tag v-if="props.row.houseType==='second'">二手房</el-tag>
          </template>
        </el-table-column>

        <!--houseName-->
        <el-table-column
          label="小区名称"
          prop="houseName">
        </el-table-column>
        <!--houseAddr-->
        <el-table-column
          label="门牌号"
          prop="houseAddr"
          width="150"
          :formatter="formatAddr"
        ></el-table-column>
        <!--houseLayout-->
        <el-table-column
          label="户型"
          prop="houseLayout"
          :filters="[{ text: '一室', value: 'one' }, { text: '二室', value: 'two' },{ text: '三室', value: 'three' },
                   { text: '四室', value: 'four' },{ text: '五室', value: 'five' },{ text: '五室以上', value: 'more' }]"
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
        <!--housePrice-->
        <el-table-column
          label="售价"
          prop="housePrice"
          width="150"
          :formatter="formatPrice"
        >
        </el-table-column>
        <!--houseArea-->
        <el-table-column
          label="房屋面积"
          prop="houseArea"
          width="150"
          :formatter="formatArea"
        ></el-table-column>
        <!--buyer-->
        <el-table-column
          label="买家姓名"
          prop="houseBuyer"
          width="150"
        >
          <template slot-scope="props">
            <el-popover trigger="hover" placement="top">
              <p>买家姓名: {{ props.row.buyerName }}</p>
              <p>买家电话: {{ props.row.buyerPhone }}</p>
              <div slot="reference" class="name-wrapper">
                {{ props.row.buyerName }}
              </div>
            </el-popover>
          </template>

        </el-table-column>
        <!--owner-->
        <el-table-column
          label="房主姓名"
          prop="houseOwner"
          width="150"
        >
          <template slot-scope="props">
            <el-popover trigger="hover" placement="top">
              <p>房主姓名: {{ props.row.ownerName }}</p>
              <p>房主电话: {{ props.row.ownerPhone }}</p>
              <div slot="reference" class="name-wrapper">
                {{ props.row.ownerName }}
              </div>
            </el-popover>
          </template>

        </el-table-column>
        <!--agency-->
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
        <!--dealPrice-->
        <el-table-column
          label="成交价"
          prop="dealPrice"
          width="150"
          :formatter="formatPrice"
        ></el-table-column>
        <!--dealTime-->
        <el-table-column
          label="成交时间"
          prop="dealTime"
          width="150"
          :formatter="formatTime"
        >
        </el-table-column>
        <!--houseStatus-->
        <el-table-column
          label="房屋情况"
          width="100"
          prop="houseStatus"
          fixed="right"
          :filters="[{ text: '在售', value: 'onsale' },{ text: '已下架', value: 'canceled' }, { text: '已售出', value: 'sold' }]"
          :filter-method="filterHouseStatus"
          filter-placement="bottom-end">
          <template slot-scope="props">
            <el-tag type="success" v-if="props.row.houseStatus==='onsale'">在售</el-tag>
            <el-tag type="info" v-if="props.row.houseStatus==='canceled'">已下架</el-tag>
            <el-tag type="danger" v-if="props.row.houseStatus==='sold'">已售出</el-tag>
          </template>
        </el-table-column>
        <!--dealStatus-->
        <el-table-column
          label="交易情况"
          width="100"
          prop="dealStatus"
          fixed="right"
          :filters="[{ text: '看房中', value: 'ing' },{ text: '交易中止', value: 'failed' }, { text: '成交', value: 'done' }]"
          :filter-method="filterDealStatus"
          filter-placement="bottom-end">
          <template slot-scope="props">
            <el-tag type="warning" v-if="props.row.dealStatus==='ing'">看房中</el-tag>
            <el-tag type="info" v-if="props.row.dealStatus==='failed'">交易中止</el-tag>
            <el-tag type="success" v-if="props.row.dealStatus==='done'">成交</el-tag>
          </template>
        </el-table-column>
        <!--edit-->
        <el-table-column
          label="修改信息"
          fixed="right"
          width="80"
          v-if="roles==='Agency'"
        >
          <template slot-scope="scope">
            <!-- update button -->
            <el-button
              class="el-icon-edit"
              size="mini"
              type="primary"
              round
              @click="clickSetCurrent(scope.row)">
            </el-button>
            <!--<el-button
              :disabled="scope.row.houseStatus==='sold'"
              class="el-icon-delete"
              size="mini"
              type="danger"
              round
              @click="clickSetCurrent(scope.row)">
            </el-button>-->

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!------------------------------------------------------------------------------------------------------------------------>
    <div class="DealUpdate">
      <el-dialog title="交易更新"
                 width="500px"
                 :visible.sync="dialogUpdateVisible">
        <div style="margin: auto"><!--:rules="updateRules"-->
          <el-form :model="update" :ref="update" width="100%" :label-position="labelPosition" label-width="100px"
          >
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
              <el-select v-model="update.houseType" placeholder="新房/二手房" disabled>
                <el-option label="新房" value="new"></el-option>
                <el-option label="二手房" value="second"></el-option>
              </el-select>

            </el-form-item>

            <el-form-item label="户型" prop="houseLayout" status-icon>
              <el-select v-model="update.houseLayout" placeholder="一室/二室/三室/四室/..." disabled>
                <el-option label="一室" value="one"></el-option>
                <el-option label="二室" value="two"></el-option>
                <el-option label="三室" value="three"></el-option>
                <el-option label="四室" value="four"></el-option>
                <el-option label="五室" value="five"></el-option>
                <el-option label="五室以上" value="more"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="房屋面积" style="width: 80%" prop="houseArea">
              <el-input v-model.number="update.houseArea" placeholder="请输入该房屋的面积" disabled>
                <template slot="append">平方米</template>
              </el-input>
            </el-form-item>
            <el-form-item label="期望售价" style="width: 80%" prop="housePrice"
                          :rules="{type: 'number', message: '售价用数字表示'}">
              <el-input v-model.number="update.housePrice" placeholder="请输入您期望售出的价格" disabled>
                <template slot="append">万元/平方米</template>
              </el-input>
            </el-form-item>
            <!--            <el-form-item label="房屋属性" prop="houseType">
                          <el-select v-model="update.houseStatus" placeholder="新房/二手房">
                            <el-option label="在售" value="onsale"></el-option>
                            <el-option label="下架" value="canceled"></el-option>
                          </el-select>
                        </el-form-item>-->
            <el-form-item label="房主姓名" style="width: 80%" prop="houseAgency">
              <el-input v-model="update.ownerName" disabled></el-input>
            </el-form-item>
            <el-form-item label="买家姓名" style="width: 80%" prop="houseAgency">
              <el-input v-model="update.buyerName" disabled></el-input>
            </el-form-item>
            <el-form-item label="业务员姓名" style="width: 80%" prop="houseAgency">
              <el-input v-model="update.agencyName" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="roles==='Agency'" label="交易情况" style="width: 80%" prop="dealPrice">
              <el-select v-model="update.dealStatus" placeholder="交易状态">
                <el-option :disabled="update.houseStatus!=='onsale'" label="看房中" value="ing"></el-option>
                <el-option :disabled="update.houseStatus!=='onsale'" label="成交" value="done"></el-option>
                <el-option :disabled="update.houseStatus==='sold'"   label="交易中止" value="failed"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="update.dealStatus==='done'" label="成交价" style="width: 80%" prop="dealPrice" required
                          :rules="{type: 'number', message: '价格用数字表示'}"
            >
              <el-input v-model.number="update.dealPrice"
                        :disabled="update.houseStatus!=='onsale'">
                <template slot="append">万元/平方米</template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="update.dealStatus!=='ing'" label="交易时间" style="width: 80%" prop="dealTime">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                  :disabled="update.houseStatus!=='onsale'"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="update.dealTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item style="text-align: right;width: 100%">
              <el-button type="primary" @click="clickUpdate">提交修改</el-button>
            </el-form-item>

          </el-form>

        </div>

      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DealShow",
    inject: ['reload'], // 引入方法 实现更新后自动刷新
    data() {
      return {
        labelPosition: 'right',
        loading: true,
        userId: this.$store.getters.getUserId,
        roles: this.$store.getters.getRoles,
        search: '',
        deal: [],
        update: {
          dealId: '',
          dealHouse: '',
          houseName: '',
          houseAddr: '',
          housePrice: '',
          houseType: '',
          houseArea: '',
          houseStatus: '',
          dealBuyer: '',
          dealOwner: '',
          dealAgency: '',
          houseLayout: '',
          houseDescribe: '',
          dealPrice: '',
          dealStatus: '',
          dealTime: '',
          Addr: {
            a_building: '',
            a_unit: '',
            a_doors: ''
          }
        },
        dialogUpdateVisible: false,
      }
    },
    computed: {
      // 模糊搜索
      dealdata() {//housedata 返回表格的最终数据
        const search = this.search
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.deal.filter(data => {
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
        return this.deal//如不搜索，deal[]的数据
      }
    },
    mounted() {
      this.$axios.get("http://localhost:8080/Deal/findByUser?User=" + this.roles + "&userId=" + this.userId)
        .then(response => {
          console.log(response);
          console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            this.deal.push(response.data[i])//把后端返回的信息存如deal[]
          }
          this.loading = false;
        }).catch(response => {
        console.log(response);
        console.log(response.data);
      })
    },
    methods: {
      //清除表单筛选
      clearFilter() {
        this.$message('清除筛选');
        this.$refs.dealref.clearFilter();
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
      filterHouseStatus(value, row) {
        return row.houseStatus === value;
      },
      //筛选 房屋状态信息
      filterDealStatus(value, row) {
        return row.dealStatus === value;
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
      //时间显示格式
      formatTime(row, column) {
        if(row.dealStatus==="done"){
          let time = row.dealTime.split("T");
          let realTime = time[0].split("-");
          return realTime[0]+'年'+realTime[1]+'月'+realTime[2]+'日';
        }
        else{
          return "未成交"
        }
      },
      clickSetCurrent(row) {
        this.dealId = row.dealId;
        let addr = row.houseAddr.split('-')
        this.update.dealHouse = row.dealHouse;
        this.update.dealBuyer = row.dealBuyer;
        this.update.dealOwner = row.dealOwner;
        this.update.dealAgency = row.houseAgency;
        this.update.dealPrice = row.dealPrice;
        this.update.dealStatus = row.dealStatus;
        this.update.dealTime = row.dealTime;

        this.update.houseStatus = row.houseStatus;
        this.update.houseName = row.houseName;
        this.update.houseType = row.houseType;
        this.update.houseLayout = row.houseLayout;
        this.update.houseAddr = row.houseAddr;
        this.update.houseArea = row.houseArea;
        this.update.housePrice = row.housePrice;
        this.update.agencyName = row.agencyName;
        this.update.ownerName = row.ownerName;
        this.update.buyerName = row.buyerName;

        this.update.Addr.a_building = addr[0];//楼
        this.update.Addr.a_unit = addr[1];//单元
        this.update.Addr.a_doors = addr[2];//门牌号

        this.dialogUpdateVisible = true;//显示表单
      },
      clickUpdate() {
        this.$confirm('确认修改此条交易信息吗？', '修改交易信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          let data = {
            dealId: this.update.dealId,
            dealHouse: this.update.dealHouse,
            dealAgency: this.update.dealAgency,
            dealBuyer: this.update.dealBuyer,
            dealOwner: this.update.dealOwner,
            dealPrice: this.update.dealPrice,
            dealStatus: this.update.dealStatus,
            dealTime: this.update.dealTime,
          }
          console.log(this.update.dealTime)
          console.log(data);
          this.$axios.post('http://localhost:8080/Deal/Update', JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            //console.log("RRRR")
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
      }


    }
  }
</script>

<style scoped>

</style>
