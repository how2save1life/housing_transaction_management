<template>
  <div class="UserShow" style="margin: auto;width: 100%">
    <div class="UserInfo">
      <el-col :span="14">
        <div class="UserForm">
          <el-form :model="user" label-width="100px" label-position="left"
                   style="width: 60%;margin-left: 10%;margin-top:5%">
            <el-form-item label="用户名">
              {{this.user.ownerId}}
            </el-form-item>

            <el-form-item label="实名">
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
      </el-col>

      <el-col :span="5">
        <div class="userHead" style="width:100%;height: 100%;text-align: center;margin: 50%">
          <el-upload
            class="avatar-uploader"
            :action=imgAction
            :data=headData.userId
            :show-file-list="false"
            :auto-upload="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>

    </div>
    <div style="text-align:right;width: 100%">
      <el-button type="primary">确认修改</el-button>
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
        user: {},
        //imgAction: 'http://localhost:8080/' + this.$store.getters.getRoles + '/myHead/',
        headData: {
          userId: this.$store.getters.getUserId,
        },
        imageUrl: '',
        imgAction: 'http://localhost:8080/Pic/' + this.$store.getters.getRoles + '/myHead/' + this.$store.getters.getUserId
      }
    },
    mounted() {
      this.$axios.get("http://localhost:8080/" + this.roles + "/findMe/" + this.userId).then(response => {
        console.log(response);
        console.log(response.data);
        this.user = response.data;
        console.log(this.user);
      }).catch(response => {
        console.log(response);
        console.log(response.data);
      })
    },
    methods: {

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
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
        /*let fd = new FormData();
        fd.append('file', file);//传文件
       // fd.append('id',id);//传其他参数
        this.$axios.post('http://localhost:8080/Pic/' + this.$store.getters.getRoles + '/myHead/'+this.userId, fd, {
          //headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).then(function (res) {
          alert('成功');
          console.log(fd)
        })*/
        return isJPG && isLt2M;
      }, newSubmitForm() {//确定上传
        this.$refs.newupload.submit();
      },
      myUpload(content) {
        console.log('myUpload...');
        this.$axios({
          method: 'post',
          url: content.action,
          timeout: 20000,
          data: content.file
        }).then(res => {
          content.onSuccess('配时文件上传成功')
        }).catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            content.onError('配时文件上传失败(' + error.response.status + ')，' + error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            content.onError('配时文件上传失败，服务器端无响应');
          } else {
            // Something happened in setting up the request that triggered an Error
            content.onError('配时文件上传失败，请求封装失败');
          }
        });
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
