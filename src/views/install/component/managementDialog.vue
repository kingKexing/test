<template>
  <div>
    <!-- 模态框 -->
    <el-dialog :visible.sync="change" :title="title" @close="close('form')">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item :label-width="formLabelWidth" label="用户名" prop="userName">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="手机" prop="userTel">
          <el-input v-model="form.userTel" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="身份">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in adminType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('cancel')">取 消</el-button>
        <el-button type="primary" @click="changeDia(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "managementDialog",
  props: {
    title: {
      type: String
    },
    form: {
      type: Object
    },
    change: {
      type: Boolean,
      default: false
    },
    formLabelWidth: {
      type: String,
      default: "100px"
    },
    adminType: {
      type: Array
    }
  },
  data() {
    return {
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 5 到 16 个字符", trigger: "blur" }
        ],
        userTel: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为 11 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 弹出框确定 后返回数据
    changeDia(val) {
      this.$emit("changeDia", val);
    },
    close(ref) {
      this.$refs[ref].resetFields();
    }
  }
};
</script>