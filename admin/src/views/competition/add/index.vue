<template>
  <div class="container">
    <el-form ref="form" :rules="rules" :model="addCompetitionData" label-width="80px">
      <el-form-item label="比赛名称" prop="name">
        <el-input v-model="addCompetitionData.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="addCompetitionData.description"></el-input>
      </el-form-item>
      <el-form-item label="报名费" prop="signUpPrice">
        <el-input v-model="addCompetitionData.signUpPrice"></el-input>
      </el-form-item>
      <el-form-item label="参赛人数" prop="participantLimit">
        <el-input v-model="addCompetitionData.participantLimit" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="date">
        <el-col style="width: 200px">
          <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="addCompetitionData.date"
              style="width: 100%;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="报名选项" prop="participantLimit">
        <el-checkbox v-model="isDinner">聚餐</el-checkbox>
      </el-form-item>
      <el-form-item label="聚餐费" prop="dinnerPrice" v-show="isDinner">
        <el-input v-model="addCompetitionData.dinnerPrice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>

import {
  addCompetition
} from '@/network/api/competition.js'

export default {
  name: "index",
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入比赛名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入比赛描述', trigger: 'blur' }
        ],
        participantLimit: [
          { required: true, message: '请输入参赛人数', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请输入比赛日期', trigger: 'blur' }
        ],
        signUpPrice: [
          { required: true, message: '请输入报名费', trigger: 'blur' }
        ],
      },
      isDinner: false,
      addCompetitionData:{
        signUpOptionIds: [],
        signUpPrice: null,
        dinnerPrice: null
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = !this.dialogFormVisible

          if (this.isDinner) {
            this.addCompetitionData.signUpOptionIds.push(1)
          } else {
            this.addCompetitionData.dinnerPrice = '0'
          }

          addCompetition(this.addCompetitionData).then((result) => {
            this.$message({
              showClose: true,
              message: result.resultMessage,
              type: 'success'
            });
            this.$router.push('/competition/list')
          })
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
  .container{
    width: 1000px;
  }
</style>
