<template>
  <div class="container">
    <div class="content-header">
      <span>{{detail.name}}</span>
    </div>
    <div class="content-body">
      <el-form :model="joinCompetitionData" ref="joinCompetitionForm">
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
        <el-form-item label="聚餐" v-show="detail.isDinner">
          <el-checkbox v-model="joinCompetitionData.dinner"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('joinCompetitionForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div :class="{'content-join-player360': detail.isDinner, 'content-join-player180' : !detail.isDinner}">
      <el-table :data="detail.players">
        <el-table-column
            prop="name"
            label="已报名" width="180px">
        </el-table-column>

          <el-table-column
              prop="dinner"
              label="聚餐"
              :formatter="booleanFormatter"
              v-if="detail.isDinner" width="180px">
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
        players: [],
        isDinner: false
      },
      joinCompetitionData: {
        id: null,
        name: null,
        dinner: false
      }
    };
  },
  created() {
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

        for (let i = 0; i < result.signUpOptionIds.length; i++) {
          if (result.signUpOptionIds[i] === 1) {
            this.$set(this.detail, 'isDinner', true)
            this.$set(this.joinCompetitionData, 'dinner', true)
          }
        }

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
    },

    booleanFormatter(row, column) {
      return row.dinner ? '是' : '否';
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
    line-height: 100px;
    color: #ffffff;
    background-color: #6495ED;
  }

  .content-body{
    display: flex;
    margin: 20px auto;
    justify-content: center;
  }

  .content-join-player180{
    width: 180px;
    margin:auto
    /*text-align: center;*/
    /*justify-content: center;*/
    /*width: 360px;*/
  }

  .content-join-player360{
    width: 360px;
    margin:auto
    /*text-align: center;*/
    /*justify-content: center;*/
    /*width: 360px;*/
  }
</style>
