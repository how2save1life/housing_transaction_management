<template>
  <div class="HouseSave" style="margin: auto;width: 80%">
    <!--<h1>??????????????????</h1>-->
    <el-form v-loading="loading" :model="house" :ref="house" status-icon :rules="houseRules" label-width="80px"
             width="100px">
      <div style="width: 100%;">
        <div class="grid-content bg-purple-light">
          <el-form-item label="小区名称" style="width: 77%" prop="houseName">
            <el-input v-model="house.houseName" placeholder="请输入小区名称"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="房屋地址" style="width: 100%" required>
          <el-row :gutter="1">
            <el-col :span="3">
              <el-form-item label="" prop="Addr.a_building">
                <el-input v-model="house.Addr.a_building" placeholder="楼栋号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="" prop="Addr.a_unit">
                <el-input v-model="house.Addr.a_unit" placeholder="单元号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="" prop="Addr.a_doors">
                <el-input v-model="house.Addr.a_doors" placeholder="门牌号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="房屋属性" prop="houseType">
          <el-select v-model="house.houseType" placeholder="新房/二手房">
            <el-option label="新房" value="new"></el-option>
            <el-option label="二手房" value="second"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户型" prop="houseLayout" status-icon>
          <el-select v-model="house.houseLayout" placeholder="一室/二室/三室/四室/...">
            <el-option label="一室" value="one"></el-option>
            <el-option label="二室" value="two"></el-option>
            <el-option label="三室" value="three"></el-option>
            <el-option label="四室" value="four"></el-option>
            <el-option label="五室" value="five"></el-option>
            <el-option label="五室以上" value="more"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋面积" style="width: 53%" prop="houseArea">
          <el-input v-model.number="house.houseArea" placeholder="请输入该房屋的面积">
            <template slot="append">平方米</template>
          </el-input>
        </el-form-item>

        <el-form-item label="期望售价" style="width: 53%" prop="housePrice">
          <el-input v-model.number="house.housePrice" placeholder="请输入您期望售出的价格">
            <template slot="append">万元/平方米</template>
          </el-input>
        </el-form-item>
        <el-form-item label="房屋描述" style="width: 53%" prop="houseDescribe">
          <el-input maxlength="200" type="textarea" :autosize="{ minRows: 2}" v-model="house.houseDescribe"
                    placeholder="请输入您对房屋的简要描述（200字以内）">
          </el-input>
        </el-form-item>
        <el-form-item label="业务员" style="width: 80%" prop="radioA">
          <el-row :gutter="1">
            <el-col :span="4">
              <el-radio v-model="house.radioA" label="1">随机分配</el-radio>
            </el-col>
            <el-col :span="3">
              <el-radio v-model="house.radioA" label="2">自主选择
                <!--
                :trigger-on-focus="false" 输入后出现
                highlight-first-item="true" 第一项高光
                value-key="agencyId" 用agencyId
                -->
              </el-radio>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="houseAgency" v-if="house.radioA==='2'"
                            :rules="{required: true, message: '请选择业务员', trigger: 'change'}">
                <el-autocomplete class="my-autocomplete"
                                 v-model="house.houseAgency" value-key="agencyId"
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
            </el-col>


          </el-row>
        </el-form-item>

        <el-form-item>

        </el-form-item>
        <el-form-item style="text-align: right;width: 77%">
          <el-button type="primary" @click="submit(houseRules)">上传信息</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "HouseSave",
    data() {
      return {
        //表单
        house: {
          houseName: '',
          houseAddr: '',
          housePrice: '',
          houseType: '',
          houseArea: '',
          houseStatus: 'onsale',
          houseOwner: this.$store.getters.getUserId,
          houseAgency: '',
          randomAgency: '',
          houseLayout: '',
          houseDescribe: '',
          Addr: {
            a_building: '',
            a_unit: '',
            a_doors: ''
          },
          radioA: ''
        },
        //规则
        houseRules: {
          houseName: [{required: true, message: '请输入小区名', trigger: 'blur'}],
          houseAgency: [{required: true, message: '请选择业务员', trigger: 'blur'}],
          houseAddr: [{required: true, message: '请输入房屋地址', trigger: 'blur'}],
          'Addr.a_building': [{required: true, message: '请输入楼栋号', trigger: 'blur'}],
          'Addr.a_unit': [{required: true, message: '请输入单元号', trigger: 'blur'}],
          'Addr.a_doors': [{required: true, message: '请输入门牌号', trigger: 'blur'}],
          radioA: [{required: true, message: '请选择业务员分配方式', trigger: 'blur'}],
          houseLayout: [{required: true, message: '请输入户型', trigger: 'change'}],
          houseType: [{required: true, message: '请选择房屋属性', trigger: 'change'}],
          houseArea: [{required: true, message: '请输入房屋面积', trigger: 'blur'},
            {type: 'number', message: '面积用数字表示'}],
          housePrice: [{required: true, message: '请输入每平米期望售价', trigger: 'blur'},
            {type: 'number', message: '售价用数字表示'}],
        },
        //临时存放获取的agency信息
        agencies: [],
        loading: false

      }

    },
    mounted() {
      /**得到一个随机agency*/
      this.$axios.get("http://localhost:8080/Agency/findRandomOne").then(response => {
        console.log(response);
        console.log(response.data, '???', this.house.houseAgency);
        if (response.data == null) {
          console.log("fail get random agency");
        } else {

          this.house.randomAgency = response.data.agencyId;
          console.log(this.house.houseAgency, "有没有");

        }
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
      },
      handleSelect(item) {
        console.log(item);
      },
      /*      handleIconClick(ev) {
              console.log(ev);
            },*/
      /*输入提示结束*/
      /**上传信息*/
      submit(houseRules) {
        if (this.$store.getters.getRoles !== 'Owner') {
          this.$confirm('请登录房主账号', '权限不足', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            this.$router.push("/login")
          })
        } else {
          this.$refs[houseRules].validate((valid) => {
            if (valid) {//如果输入验证通过
              this.loading = true;//loading效果
              //将格式改为统一，方便存入后台
              this.house.houseAddr = this.house.Addr.a_building + '-' + this.house.Addr.a_unit + '-' + this.house.Addr.a_doors;
              if (this.house.radioA === "1") {
                this.house.houseAgency = this.house.randomAgency;
              }
              console.log(this.house);

              let data = this.house;
              console.log(data, '!!!');
              this.$axios.post('http://localhost:8080/House/Save', JSON.stringify(data),
                {
                  headers: {'Content-Type': 'application/json;charset=UTF-8'}
                }
              ).then(response => {
                console.log(response);
                console.log(response.data);
                if (response.data === "success") {
                  this.loading = false
                  this.$message({
                    message: `上传成功`,
                    type: 'success'
                  });
                  this.$router.push('../myhouse')
                } else if (response.data === "existed") {
                  this.$alert('该房屋正在销售', '房屋存在', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                      this.$message({
                        message: `请检查所填信息或联系业务员处理`
                      });
                    }
                  });
                  this.loading = false
                } else if (response.data === "failed") {
                  this.$alert('房屋注册出错', '错误', {
                    confirmButtonText: '确定',
                    type: 'error',
                    callback: action => {
                      this.$message({
                        message: `请再试一遍或联系客服人员`
                      });
                    }
                  });
                  this.loading = false
                } else if (response.data === "info_needed") {
                  this.$alert('请完善信息', '错误', {
                    confirmButtonText: '确定',
                    type: 'error',
                    callback: action => {
                      this.$message({
                        message: `请检查房主信息和中介信息`
                      });
                    }
                  });
                  this.loading = false
                }
              }).catch(response => {
                console.log(response);
                console.log(response.data);
                this.$message({
                  message: `error `,
                  type: 'error'
                });
                this.loading = false
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


      },


    }


  }
</script>

<style>
  li {
    line-height: normal;
    padding: 7px;
  }

  .id {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .name {
    font-size: 12px;
    color: #b4b4b4;
  }

  .highlighted .Addr {
    color: #ddd;
  }


</style>
