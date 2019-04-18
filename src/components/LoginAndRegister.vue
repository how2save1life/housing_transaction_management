<template>
  <div style="width: 100%">
    <div style="width: 45%; text-align:center; margin:auto ;border: midnightblue">

      <h1 v-if="this.form.user==='Owner'">房主{{msg}}</h1>
      <h1 v-else-if="this.form.user==='Agency'">业务员{{msg}}</h1>
      <h1 v-else-if="this.form.user==='Buyer'">买家{{msg}}</h1>
      <h1 v-else>{{msg}}</h1>
      <!--登录框-->
      <el-form ref="form" :model="form" label-width="80px" style="text-align: center">
        <el-form-item label="用户名">
          <el-input prefix-icon="el-icon-edit" v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密 码">
          <el-input prefix-icon="el-icon-edit" v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <!--选择登录角色-->
        <el-form-item label="我 是" style="text-align: left">

          <el-radio-group v-model="form.user" size="medium">
            <el-radio-button label="Owner">房主</el-radio-button>
            <el-radio-button label="Buyer">买家</el-radio-button>
            <el-radio-button label="Agency">中介</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item style="text-align: right">
          <el-button type="primary" plain @click="getRegister">注册</el-button>
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>

      </el-form>
      <!--登陆结束-->


      <!--注册 房主-->
      <el-dialog v-if="form.user==='Owner'" title="房主注册" :visible.sync="dialogFormVisible" width="45%"
                 v-loading="loading">
        <div style=" margin: auto;width:80%">
          <el-form :model="Owner" :rules="ownerRules" :ref="Owner" text-align="center">

            <el-form-item label="用户名" prop="ownerId">
              <el-input v-model="Owner.ownerId" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="输入密码" prop="ownerPasswd">
              <el-input v-model="Owner.ownerPasswd" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="ownerPasswd1">
              <el-input type="password" v-model="Owner.ownerPasswd1" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="ownerSelfid">
              <el-input v-model="Owner.ownerSelfid" placeholder="请输入身份证号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="ownerPhone">
              <el-input v-model="Owner.ownerPhone" placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联络地址" prop="ownerAddr">
              <el-input v-model="Owner.ownerAddr" placeholder="请输入联络地址" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名" prop="ownerName">
              <el-input v-model="Owner.ownerName" placeholder="请输入姓名" prop="ownerName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="怎么称呼您" prop="ownerSex">
              <el-select v-model="Owner.ownerSex" placeholder="怎么称呼您" autocomplete="off">
                <el-option label="先生" value="m">先生</el-option>
                <el-option label="女士" value="f">女士</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="register(ownerRules)">确 定</el-button>
        </div>
      </el-dialog>
      <!--注册 房主 结束-->

      <!--注册 买家-->
      <el-dialog v-else-if="form.user==='Buyer'" title="买家注册" :visible.sync="dialogFormVisible" width="45%"
                 v-loading="loading">
        <div style=" margin: auto;width:80%">
          <el-form :model="Buyer" :rules="buyerRules" :ref="Buyer" text-align="center">

            <el-form-item label="用户名" prop="buyerId">
              <el-input v-model="Buyer.buyerId" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="输入密码" prop="buyerPasswd">
              <el-input v-model="Buyer.buyerPasswd" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="buyerPasswd1">
              <el-input type="password" v-model="Buyer.buyerPasswd1" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="buyerSelfid">
              <el-input v-model="Buyer.buyerSelfid" placeholder="请输入身份证号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="buyerPhone">
              <el-input v-model="Buyer.buyerPhone" placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联络地址" prop="buyerAddr">
              <el-input v-model="Buyer.buyerAddr" placeholder="请输入联络地址" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名" prop="buyerName">
              <el-input v-model="Buyer.buyerName" placeholder="请输入姓名" prop="buyerName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="怎么称呼您" prop="buyerSex">
              <el-select v-model="Buyer.buyerSex" placeholder="怎么称呼您" autocomplete="off">
                <el-option label="先生" value="m">先生</el-option>
                <el-option label="女士" value="f">女士</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="register(buyerRules)">确 定</el-button>
        </div>
      </el-dialog>
      <!--注册 买家 结束-->

      <!--注册 中介-->
      <el-dialog v-else-if="form.user==='Agency'" title="中介注册" :visible.sync="dialogFormVisible" width="45%"
                 v-loading="loading">
        <div style=" margin: auto;width:80%">
          <el-form :model="Agency" :rules="agencyRules" :ref="Agency" text-align="center">

            <el-form-item label="用户名" prop="agencyId">
              <el-input v-model="Agency.agencyId" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="输入密码" prop="agencyPasswd">
              <el-input v-model="Agency.agencyPasswd" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="agencyPasswd1">
              <el-input type="password" v-model="Agency.agencyPasswd1" placeholder="请输入密码"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="agencySelfid">
              <el-input v-model="Agency.agencySelfid" placeholder="请输入身份证号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="agencyPhone">
              <el-input v-model="Agency.agencyPhone" placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联络地址" prop="agencyAddr">
              <el-input v-model="Agency.agencyAddr" placeholder="请输入联络地址" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名" prop="agencyName">
              <el-input v-model="Agency.agencyName" placeholder="请输入姓名" prop="agencyName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="怎么称呼您" prop="agencySex">
              <el-select v-model="Agency.agencySex" placeholder="怎么称呼您" autocomplete="off">
                <el-option label="先生" value="m">先生</el-option>
                <el-option label="女士" value="f">女士</el-option>
              </el-select>
            </el-form-item>
            <!--            <el-form-item label="目标代理费" prop="agencyFee">
                          <el-input v-model="Agency.agencyFee" placeholder="请输入您的目标代理收费" prop="agencyFee" autocomplete="off">
                            <template slot="append">元</template>
                          </el-input>
                        </el-form-item>-->
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="register(buyerRules)">确 定</el-button>
        </div>
      </el-dialog>
      <!--注册 中介 结束-->
      <!--{{$store.getters.getRoles}}-->
    </div>
  </div>
</template>

<script>
  import $store from "../store";

  export default {
    inject:["reload"],
    name: "LoginAndRegister",
    data() {
      //判定两次输入的密码是否一致
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.form.user === "Owner" && value !== this.Owner.ownerPasswd) {
          callback(new Error('两次输入密码不一致!'));
        } else if (this.form.user === "Buyer" && value !== this.Buyer.buyerPasswd) {
          callback(new Error('两次输入密码不一致!'));
        } else if (this.form.user === "Agency" && value !== this.Agency.agencyPasswd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        //登陆数据
        test: '',
        form: {
          username: '',
          password: '',
          user: '',
        },
        //注册表单是否可见
        dialogFormVisible: false,
        //注册表单提交后loading效果
        loading: false,
        //房主数据
        Owner: {
          ownerId: '',
          ownerPasswd: '',
          ownerPasswd1: '',
          ownerAddr: '',
          ownerAge: '',
          ownerName: '',
          ownerSelfid: '',
          ownerSex: '',
          //ownerType: '',
          ownerPhone: '',
        },
        //房主注册表单规则
        ownerRules: {
          ownerId: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          ownerPasswd: [{required: true, message: '请输入密码', trigger: 'blur'}, {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }],
          ownerPasswd1: [{required: true, message: '请再次输入密码'}, {
            validator: validatePass1,
            trigger: 'blur'
          }],
          ownerAddr: [{required: true, message: '请输入联络地址', trigger: 'blur'}],
          ownerName: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          ownerSex: [{required: true, message: '怎么称呼您', trigger: 'change'}],
          ownerPhone: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
          ownerSelfid: [{required: true, message: '请输入身份证号', trigger: 'blur'}],
        },
        //买家数据
        Buyer: {
          buyerId: '',
          buyerPasswd: '',
          buyerPasswd1: '',
          buyerAddr: '',
          buyerAge: '',
          buyerName: '',
          buyerSelfid: '',
          buyerSex: '',
          buyerPhone: '',
        },
        //买家注册表单规则
        buyerRules: {
          buyerId: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          buyerPasswd: [{required: true, message: '请输入密码', trigger: 'blur'}, {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }],
          buyerPasswd1: [{required: true, message: '请再次输入密码'},
            {validator: validatePass1, trigger: 'blur'}],
          buyerAddr: [{required: true, message: '请输入联络地址', trigger: 'blur'}],
          buyerName: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          buyerSex: [{required: true, message: '怎么称呼您', trigger: 'change'}],
          buyerPhone: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
          buyerSelfid: [{required: true, message: '请输入身份证号', trigger: 'blur'}],
        },
        Agency: {
          agencyId: '',
          agencyPasswd: '',
          agencyPasswd1: '',
          agencyAddr: '',
          agencyAge: '',
          agencyName: '',
          agencySelfid: '',
          agencySex: '',
          agencyPhone: '',
          //agencyFee: ''
        },
        agencyRules: {
          agencyId: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          agencyPasswd: [{required: true, message: '请输入密码', trigger: 'blur'}, {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }],
          agencyPasswd1: [{required: true, message: '请再次输入密码'},
            {validator: validatePass1, trigger: 'blur'}],
          agencyAddr: [{required: true, message: '请输入联络地址', trigger: 'blur'}],
          agencyName: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          agencySex: [{required: true, message: '怎么称呼您', trigger: 'change'}],
          agencyPhone: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
          agencySelfid: [{required: true, message: '请输入身份证号', trigger: 'blur'}],
          agencyFee: [{required: true, message: '请输入代理费用', trigger: 'blur'}],
        },
        msg: '登录',

      }

    },
    computed: {
      show() {
        return this.$store.getters.getRoles
      }
    },
    methods: {
      //根据注册后台返回值响应
      onRegMessage: function (info) {
        if (info === "success") {
          this.loading = false;//结束loading效果
          this.dialogFormVisible = false;//令注册表单不可见
          this.$message({
            showClose: true,
            message: '注册成功',
            type: 'success'
          });
          this.reload()
        } else if (info === "registered") {
          this.$message({
            showClose: true,
            message: '用户名重复',
            type: 'error'
          });
        } else if (info === "selfid_used") {
          this.$message({
            showClose: true,
            message: '身份证号已注册过',
            type: 'error'
          });
        } else if (info === "failed") {
          this.$message({
            showClose: true,
            message: '出错了 请重试',
            type: 'error'
          });
        }
      },
      //根据登陆返回值响应
      onLogMessage: function (info) {
        if (info === "success") {
          this.loading = false;
          this.dialogFormVisible = false;
          this.$message({
            showClose: true,
            message: '登陆成功',
            type: 'success'
          });
          this.$store.commit('storeRoles', this.form.user);//修改vuex中roles
          this.$store.commit('storeUserId', this.form.username);////修改vuex中用户账号
          this.$axios.get("http://localhost:8080/" + this.form.user + /findMe/ + this.form.username).then(response => {
            console.log(response.data)
            switch (this.form.user) {
              case"Agency":
                this.$store.commit('storeUserHead', response.data.agencyHead);////修改vuex中用户头像
                //console.log(this.$store.getters.getUserHead)
                break;
              case "Buyer":
                this.$store.commit('storeUserHead', response.data.buyerHead);////修改vuex中用户头像
                //console.log(this.$store.getters.getUserHead)
                break;
              case "Owner":
                this.$store.commit('storeUserHead', response.data.ownerHead);////修改vuex中用户头像
                //console.log(this.$store.getters.getUserHead)
                break;
            }
          })
          setTimeout(() =>{
            window.location.reload()
          },500);
          this.$router.push('/showhouse')
          //this.test=this.$store.getters.getRoles
          //console.log(this.show)
          //console.log(this.$store.getters.getRoles)
        } else if (info === "failed") {
          this.$message({
            showClose: true,
            message: '密码或账号有误',
            type: 'error'
          });
        }
      },
      //登陆按钮事件
      submit: function () {
        console.log(this.form.user)
        if (this.form.user === "") {//判断是否选择身份
          this.$message({
            showClose: true,
            message: '请选择您的身份类型'
          });
        }
        else if (this.form.user === "Owner") {//owner login
          let data = {
            ownerId: this.form.username,
            ownerPasswd: this.form.password
          };
          this.$axios.post('http://localhost:8080/' + this.form.user + '/Login/', JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response);
            console.log(response.data);
            this.onLogMessage(response.data)//响应
          }).catch(response => {
            console.log(response);
            console.log(response.data);
            this.$message({
              message: `error`,
              type: 'error'
            });
          })
        }
        else if (this.form.user === "Buyer") {//buyer login
          let data = {
            buyerId: this.form.username,
            buyerPasswd: this.form.password
          };
          this.$axios.post('http://localhost:8080/' + this.form.user + '/Login/', JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response);
            console.log(response.data);
            this.onLogMessage(response.data)//响应
          }).catch(response => {
            console.log(response);
            console.log(response.data);
            this.$message({
              message: `error`,
              type: 'error'
            });
          })
        }
        else if (this.form.user === "Agency") {//agency login
          let data = {
            agencyId: this.form.username,
            agencyPasswd: this.form.password
          };
          this.$axios.post('http://localhost:8080/' + this.form.user + '/Login/', JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response);
            console.log(response.data);
            this.onLogMessage(response.data)//响应
          }).catch(response => {
            console.log(response);
            console.log(response.data);
            this.$message({
              message: `error`,
              type: 'error'
            });
          })
        }
        /*
            后台接受到null？？？？？？？？？？？？？？？？？
            this.$axios({
            url: 'http://localhost:8080/Buyer/Login',
            data: JSON.stringify({
              ownerId: this.form.username,
              ownerPasswd: this.form.password
            }),
            method: "post",
            headers: { 'Content-Type': 'application/json;charset=UTF-8'},
          }).then((res) => {
            console.log(res.data);
          })*/
      },

      //注册按钮点击判断
      getRegister() {
        if (this.form.user === "") {
          this.$message({
            showClose: true,
            message: '请选择您的身份类型'
          });
        }
        else {
          this.dialogFormVisible = true;//显示注册表单
        }
      },

      //注册表单提交
      register: function (rule) {
        var flag = false;//标记表单数据输入情况
        //输入信息是否正确
        this.$refs[rule].validate((valid) => {
          if (valid) {//没有问题
            //alert('提交中!');
            this.loading = true;//loading
            flag = true;//
          }
          else {//信息不足 提示
            console.log('error submit!!');
            this.$alert('请完善所需信息', '注册失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  message: `请完善信息`
                });
              }
            });
            return false;//结束
          }
        });
        /***********************************************************************************************/
        //信息全部输入，上传信息
        var url = "";//后台地址
        var data = "";//数据

        if (this.form.user === "Owner" && flag === true) {//输入无误，房主信息
          data = this.Owner;
          url = 'http://localhost:8080/Owner/Register'
        }
        else if (this.form.user === "Buyer" && flag === true) {//输入无误，买家信息
          data = this.Buyer;
          url = 'http://localhost:8080/Buyer/Register'
        }
        else if (this.form.user === "Agency" && flag === true) {//输入无误，买家信息
          data = this.Agency;
          url = 'http://localhost:8080/Agency/Register'
        }
        else {
          return;
        }
        console.log(data)
        //像后台传参数
        this.$axios.post(url, JSON.stringify(data),
          {
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
          }
        ).then(response => {
          console.log(response);
          console.log(response.data);
          this.onRegMessage(response.data)//就返回值作出反应
        }).catch(response => {
          console.log(response);
          console.log(response.data);
          this.$message({
            message: `error`,
            type: 'error'
          });
        })
      }

    }


  }
</script>

<style scoped>

</style>
