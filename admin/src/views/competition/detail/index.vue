<template>
  <div class="container">
    <div v-if="edit">
      <el-form ref="form" :model="detail" label-width="80px">
        <el-form-item label="比赛名称">
          <el-input v-model="detail.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="detail.description"></el-input>
        </el-form-item>
        <el-form-item label="报名费:">
          <el-input v-model="detail.signUpPrice"></el-input>
        </el-form-item>
        <el-form-item label="限制人数">
          <el-input v-model="detail.participantLimit" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col style="width: 200px">
            <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="detail.date"
                style="width: 100%;"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="报名选项:">
          <el-checkbox v-model="isDinner">聚餐</el-checkbox>
        </el-form-item>
        <el-form-item label="聚餐费:" v-show="isDinner">
          <el-input v-model="detail.dinnerPrice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-else>
      <el-form ref="form" :model="detail" label-width="80px">
        <el-form-item label="比赛名称:">
          {{detail.name}}
        </el-form-item>
        <el-form-item label="描述:">
          {{detail.description}}
        </el-form-item>
        <el-form-item label="报名费:">
          {{detail.signUpPrice}}
        </el-form-item>
        <el-form-item label="限制人数:">
          {{detail.participantLimit}}
        </el-form-item>
        <el-form-item label="活动时间:">
          <el-col style="width: 200px">
            {{detail.date}}
          </el-col>
        </el-form-item>
        <el-form-item label="报名选项:" prop="participantLimit">
          <el-checkbox v-model="isDinner" disabled>聚餐</el-checkbox>
        </el-form-item>
        <el-form-item label="聚餐费:" v-show="isDinner">
          {{detail.dinnerPrice}}
        </el-form-item>
      </el-form>

      <el-table
         :data="detail.players"
         style="width: 500px">
       <el-table-column
           label="ID"
           width="180">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.id }}</span>
         </template>
       </el-table-column>
       <el-table-column
           label="姓名"
           width="180">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.name }}</span>
         </template>
       </el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button
               size="mini"
               type="danger"
               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
      </el-table>
      <el-button type="primary" style="margin-top: 10px" @click="onAddPlayer()">添加</el-button>
    </div>

    <el-dialog title="添加参赛人员" :visible.sync="dialogFormVisible" @close="onResetPlayerParams">
      <el-form :model="addPlayerData" :rules="rules" ref="addPlayerData">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="playerId">
          <el-select v-model="addPlayerData.playerId" placeholder="请选择参赛人员">
            <el-option :label="player.name" :value="player.id" v-for="player in notCompetitionPlayers"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="聚餐" v-show="detail.isDinner" :label-width="formLabelWidth" >
          <el-checkbox v-model="addPlayerData.dinner"></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitAddPlayer('addPlayerData')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import {
  getCompetitionDetail,
  modifyCompetition,
  deleteCompetitionPlayer,
  joinCompetitionPlayer
} from '@/network/api/competition.js'

import { getNotCompetitionPlayers } from '@/network/api/resource.js'

export default {
  name: "index",
  data() {
    return {
      edit: false,
      competitionId: null,
      notCompetitionPlayers: [],
      detail: {
        name: '',
        description: '',
        participantLimit: '',
        date: '',
        isDinner: false,
        players: [],
        signUpPrice: null,
        dinnerPrice: null
      },

      isDinner: false,

      addPlayerData: {
        playerId: '',
        dinner: false
      },
      rules: {
        name: [
          { required: true, message: '请输入参赛人姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      modifyData: {
        id: null,
        name: '',
        description: '',
        participantLimit: '',
        date: '',
        signUpOptionIds: []
      }
    }
  },
  created() {
    this.edit = window.location.hash.includes('edit')
    this.competitionId = this.$route.params.id

    this.getDetail()
  },
  methods: {

    getDetail() {
      getCompetitionDetail({id: this.competitionId}).then((res) => {
        const {
          id,
          name,
          description,
          participantLimit,
          date,
          players,
          signUpPrice,
          dinnerPrice

        } = res

        this.detail = {
          id,
          name,
          description,
          participantLimit,
          date,
          players,
          signUpPrice,
          dinnerPrice
        }

        for (let i = 0; i < res.signUpOptionIds.length; i++) {
          if (res.signUpOptionIds[i] === 1) {
            this.detail.isDinner = true
            this.isDinner = true
          }
        }
      })
    },
    onSubmit() {

      if (this.isDinner) {
        this.modifyData.signUpOptionIds.push(1)
        this.modifyData.dinnerPrice = this.detail.dinnerPrice
      } else {
        this.modifyData.dinnerPrice = '0'
      }

      this.modifyData.id = this.detail.id
      this.modifyData.name = this.detail.name
      this.modifyData.description = this.detail.description
      this.modifyData.participantLimit = this.detail.participantLimit
      this.modifyData.date = this.detail.date
      this.modifyData.signUpPrice = this.detail.signUpPrice


      modifyCompetition(this.modifyData).then((res) => {
        this.$alert(res.resultMessage, '提示', {
          type: 'success'
        }).then(() => {
          this.getDetail()
        })
      })
    },

    handleDelete(index, row) {
      this.$alert("确认要删除该人员吗？", "提示", {
        type: "warning",
      }).then((res) => {
        deleteCompetitionPlayer({ id: row.id }).then((result) => {
          this.$message({
            showClose: true,
            message: result.resultMessage,
            type: 'success'
          });
          this.getDetail();
        });
      });
    },

    onAddPlayer() {
      this.dialogFormVisible = true
      this.addPlayerData.id = this.competitionId

      getNotCompetitionPlayers({competitionId : this.competitionId}).then((result) => {
        this.notCompetitionPlayers = result.list
      })
    },

    onSubmitAddPlayer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = !this.dialogFormVisible
          joinCompetitionPlayer(this.addPlayerData).then((result) => {
            this.$message({
              showClose: true,
              message: result.resultMessage,
              type: 'success'
            });
            this.getDetail()
          })
        } else {
          return false;
        }
      });
    },

    onResetPlayerParams() {
      this.dialogFormVisible = false
      this.addPlayerData.id = null
      this.addPlayerData.playerId = null
    }
  }
}
</script>

<style scoped>
  .container{
    width: 1000px;
  }
</style>
