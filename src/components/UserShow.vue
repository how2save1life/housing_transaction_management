<template>
  <div class="UserShow" style="margin: auto;width: 100%">
    <div class="UserInfo">
      <el-col :span="14">
        <div class="UserForm" v-if="this.roles==='Owner'">
          <el-form :model="user" label-width="100px" label-position="left"
                   style="width: 60%;margin-left: 10%;margin-top:5%">
            <el-form-item label="用户名">
              {{this.user.ownerId}}
            </el-form-item>

            <el-form-item label="真实姓名">
              {{this.user.ownerName}}
            </el-form-item>
            <el-form-item label="身份证号">
              {{this.user.ownerSelfid}}
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="user.ownerSex" placeholder="怎么称呼您" autocomplete="off">
                <el-option label="男" value="m">男</el-option>
                <el-option label="女" value="f">女</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="ownerAge" :rules="[{type:'number', message: '请输入数字', trigger: 'blur'}]">
              <el-input v-model.number="user.ownerAge">
                <template slot="append">岁</template>
              </el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="user.ownerPhone">
              </el-input>
            </el-form-item>
            <el-form-item label="联络地址">
              <el-input v-model="user.ownerAddr">
              </el-input>
            </el-form-item>
          </el-form>


        </div>
        <div class="UserForm" v-if="this.roles==='Agency'">
          <el-form :model="user" label-width="100px" label-position="left"
                   style="width: 60%;margin-left: 10%;margin-top:5%">
            <el-form-item label="用户名">
              {{this.user.agencyId}}
            </el-form-item>

            <el-form-item label="真实姓名">
              {{this.user.agencyName}}
            </el-form-item>
            <el-form-item label="身份证号">
              {{this.user.agencySelfid}}
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="user.agencySex" placeholder="怎么称呼您" autocomplete="off">
                <el-option label="男" value="m">男</el-option>
                <el-option label="女" value="f">女</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="agencyAge" :rules="[{type:'number', message: '请输入数字', trigger: 'blur'}]">
              <el-input v-model.number="user.agencyAge">
                <template slot="append">岁</template>
              </el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="user.agencyPhone">
              </el-input>
            </el-form-item>
            <el-form-item label="联络地址">
              <el-input v-model="user.agencyAddr">
              </el-input>
            </el-form-item>
          </el-form>


        </div>
        <div class="UserForm" v-if="this.roles==='Buyer'">
          <el-form :model="user" label-width="100px" label-position="left"
                   style="width: 60%;margin-left: 10%;margin-top:5%">
            <el-form-item label="用户名">
              {{this.user.buyerId}}
            </el-form-item>

            <el-form-item label="真实姓名">
              {{this.user.buyerName}}
            </el-form-item>
            <el-form-item label="身份证号">
              {{this.user.buyerSelfid}}
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="user.buyerSex" placeholder="怎么称呼您" autocomplete="off">
                <el-option label="男" value="m">男</el-option>
                <el-option label="女" value="f">女</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="buyerAge" :rules="[{type:'number', message: '请输入数字', trigger: 'blur'}]">
              <el-input v-model.number="user.buyerAge">
                <template slot="append">岁</template>
              </el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="user.buyerPhone">
              </el-input>
            </el-form-item>
            <el-form-item label="联络地址">
              <el-input v-model="user.buyerAddr">
              </el-input>
            </el-form-item>
          </el-form>


        </div>
      </el-col>
      <!--用户头像-->
      <el-col :span="5">
        <div class="userHead" style="width:100%;height: 100%;text-align: center;margin: 50%">
          <el-upload
            class="avatar-uploader"
            :action=headData.imgAction
            :data=headData.userId
            :show-file-list="false"
            :auto-upload="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>我的头像（点击修改）</p>
        </div>
      </el-col>
      <!--  <img v-if="imageUrl" :src="imageUrl" class="avatar">-->

    </div>
    <div style="text-align:right;width: 100%">
      <el-button type="primary" @click="updateUser">确认修改</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "UserShow",
    data() {
      return {
        userId: this.$store.getters.getUserId,
        roles: this.$store.getters.getRoles,
        //接收相应用户信息
        user: {},
        //upload组件传值
        headData: {
          //额外参数 用户id
          userId: this.$store.getters.getUserId,
          //后台路径
          imgAction: 'http://localhost:8080/Pic/' + this.$store.getters.getRoles + '/myHead/' + this.$store.getters.getUserId
        },
        //头像显示路径
        imageUrl: '',


      }
    },
    mounted() {
      //返回用户信息
      this.$axios.get("http://localhost:8080/" + this.roles + "/findMe/" + this.userId).then(response => {
        console.log(response);
        console.log(response.data);
        this.user = response.data;
        //返回头像路径
        switch (this.roles) {
          case "Owner":
            // '../static/pics/head/Owner/123123.jpg' 存前端文件夹 '..' + response.data.ownerHead.substring(response.data.ownerHead.indexOf("/static/"));
            // 'http://localhost:8080/123123.jpg' 存后端文件夹 http://localhost:8080' + response.data.ownerHead.substring(response.data.ownerHead.indexOf("/static/"));
            this.imageUrl ='../static' + response.data.ownerHead;
            console.log(this.imageUrl)
            break;
          case "Agency":
            this.imageUrl = '../static' + response.data.agencyHead;console.log(this.imageUrl)
            break;
          case "Buyer":
            this.imageUrl = '../static' + response.data.buyerHead;console.log(this.imageUrl)
            break;
          default:
            console.log("visitor?")
        }

        console.log(this.user);
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })
    },
    methods: {
      //成功后 返回图片
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      //验证是否为图片，图片大小
      beforeAvatarUpload(file, id) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        /*
        使用了封装接口，不使用这个了 不然会发送两次post
        let fd = new FormData();
        fd.append('file', file);//传文件
       // fd.append('id',id);//传其他参数
        this.$axios.post('http://localhost:8080/Pic/' + this.$store.getters.getRoles + '/myHead/'+this.userId, fd, {
          //headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).then(function (res) {
          alert('成功');
          console.log(fd)
        })*/
        return isJPG && isLt2M;
      },
      updateUser() {
        this.$confirm('确认修改个人信息', '修改个人信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          let data = this.user;
          console.log(data,"kjkjkj");
          this.$axios.post('http://localhost:8080/' + this.roles + '/Update', JSON.stringify(data),
            {
              headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }
          ).then(response => {
            console.log(response);
            console.log(response.data);
            if (response.data === "failed") {
              this.$message({
                message: `error `,
                type: 'error'
              });
            }
            else if (response.data === "success") {
              this.$message({
                message: `更新成功 `,
                type: 'success'
              });
            }
          })
        })
      }


    }
  }

</script>

<style>
  .UserForm {
    border-right: 1px solid #C3C7CB
  }

  .UserInfo {
    border-right: 1px solid #C3C7CB
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
