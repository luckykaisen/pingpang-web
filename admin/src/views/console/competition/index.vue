<template>
  <div class="container">
    <div class="content-header">
      <span>{{detail.name}}</span>
    </div>
    <div class="content-body">
      <el-form :model="joinCompetitionData" ref="joinCompetitionForm" class="demo-ruleForm">
        <el-form-item
            label="姓名"
            prop="name"
            :rules="[
            { required: true, message: '姓名不能为空', trigger: 'change'},
            { message: '姓名过长', trigger: 'change', max: 6}
          ]"
        >
          <el-input type="text" v-model.trim="joinCompetitionData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('joinCompetitionForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-join-player">
      <el-table
          :data="detail.players"
          style="width: 100%">
        <el-table-column
            prop="name"
            label="已报名"
            width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import {getConsoleCompetitionDetail, JoinConsoleCompetitionPlayer} from '@/network/api/competition.js'

export default {
  name: "index",
  data() {
    return {
      competitionId: null,
      detail: {
        id: null,
        name: null,
        players: []
      },
      joinCompetitionData: {
        id: null,
        name: null
      }
    };
  },
  created() {
    this.$store.dispatch('menu/hidNavMenu')
    this.competitionId = this.$route.params.id
    this.fetchData()
  },
  methods: {

    fetchData() {
      getConsoleCompetitionDetail({id : this.competitionId}).then((result) => {
        const {
          id,
          name,
          players
        } = result

        this.$set(this.detail, 'id', id)
        this.$set(this.detail, 'name', name)
        this.$set(this.detail, 'players', players)
      })
    },

    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.joinCompetitionData.id = this.detail.id
          JoinConsoleCompetitionPlayer(this.joinCompetitionData).then((result) => {
            this.$message({
              showClose: true,
              message: result.resultMessage,
              type: 'success'
            });
            this.$refs[formName].resetFields()
            this.fetchData()
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
  .container{
    text-align: center;
  }

  .content-header{
    font-size: 48px;
    font-weight: 600;
    line-height: 240px;
    color: #ffffff;
    background-color: #6495ED;
  }

  .content-body{
    display: flex;
    margin: 20px auto;
    justify-content: center;
  }

  .demo-ruleForm{
    width: 300px;
  }

  .content-join-player{
    display: flex;
    justify-content: center;
    margin: 20px auto;
    width: 180px;
  }
</style>
