<template>
  <div class="container">
    <div v-show="!preview">
      <el-row v-for="rowGroup in rowGroups">
        <el-col :span="6" style="margin-top: 10px" v-for="colGroup in rowGroup.colGroups">
          <div class="table-content">
<!--            <span>{{colGroup.name}}</span>-->
            <el-input v-model="colGroup.name" placeholder="请输入姓名" style="width: 200px" @change="onModifyGroupName(colGroup)"></el-input>
            <el-table
                border
                :data="colGroup.players">
              <el-table-column
                  label="姓名">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      type="danger"
                      @click="onDeletePlayer(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="success" size="mini" style="margin-top: 5px" @click="onAddPlayer(colGroup.id)">添加</el-button>
            <el-button type="danger" size="mini" style="margin-top: 5px" @click="onDeleteGroup(colGroup)">删除</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-show="preview">
      <el-row v-for="rowGroup in rowGroups">
        <el-col :span="6" style="margin-top: 10px" v-for="colGroup in rowGroup.colGroups">
          <div class="table-content">
            <span style="font-size: 26px; color: red">{{colGroup.name}}</span>
            <el-table
                empty-text=" "
                :show-header="false"
                border
                :data="colGroup.players"
                style="font-size: 23px; width: 200px; font-weight: bold; margin-top: 10px">
              <el-table-column
                  label="姓名" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>

    <div style="position: fixed; bottom: 50px; right: 10px">
      <el-button type="primary" @click="addGroupDialogFormVisible = true" v-show="rowGroups.length === 0">创建分组</el-button>
      <el-button type="primary" @click="clickPreview" >{{!preview ? '预览' : '编辑'}}</el-button>
      <el-button type="primary" @click="onAddOneGroup()">添加小组</el-button>
      <el-button type="primary" @click="downloadExcelFormVisible = true" v-show="rowGroups.length !== 0">下载对阵表</el-button>
    </div>

    <el-dialog title="添加参赛人员" :visible.sync="dialogFormVisible" @close="onResetPlayerParams">
      <el-form :model="addPlayerData" :rules="rules" ref="addPlayerData" >
        <el-form-item label="参赛人员" label-width="200px" prop="playerId">
          <el-select v-model="addPlayerData.playerId" placeholder="请选择参赛人员">
            <el-option :label="player.name" :value="player.id" v-for="player in notGroupPlayers"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitAddPlayer('addPlayerData')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="创建分组" :visible.sync="addGroupDialogFormVisible" @close="onResetGroupParams">
      <el-form :model="addGroupData" :rules="addGroupRules" ref="addGroupForm" >
        <el-form-item label="分组数量" label-width="200px" prop="count">
          <el-select v-model="addGroupData.count" placeholder="请选择分组数量">
            <el-option :label="i" :value="i" v-for="i in 36"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGroupDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitAddGroup('addGroupForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="下载分组对阵表" :visible.sync="downloadExcelFormVisible" @close="onResetGroupParams">
      <el-form :model="downloadGroupAgainstData" :rules="downloadGroupAgainstRules" ref="downloadGroupAgainstExcelForm">
        <el-form-item label="对阵类型" label-width="120px" prop="typeId">
          <el-select v-model="downloadGroupAgainstData.typeId" placeholder="请选择对阵类型">
            <el-option label="小组循环" value="1"></el-option>
            <el-option label="小组顺序循环" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="downloadExcelFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitDownloadGroupAgainstExcel('downloadGroupAgainstExcelForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {
  getCompetitionDetail,
  deleteGroupPlayer,
  addGroupPlayer,
  deleteGroup,
  addGroup,
  addOneGroup,
  modifyGroup, downloadGroupAgainstExcel
} from '@/network/api/competition.js'

import {getNotGroupPlayers} from '@/network/api/resource.js'

export default {
  name: "index",
  data() {
    return {
      preview: false,
      competitionId: null,
      dialogFormVisible: false,
      addGroupDialogFormVisible: false,
      downloadExcelFormVisible: false,
      rules: {
        playerId: [
          { required: true, message: '请选择参赛人姓名', trigger: 'blur' }
        ],
      },
      addGroupRules: {
        count: [
          { required: true, message: '请选择分组数量', trigger: 'blur' }
        ]
      },
      downloadGroupAgainstRules: {
        typeId: [
          { required: true, message: '请选择对阵类型', trigger: 'blur' }
        ]
      },
      groups: [
        {
          id: null,
          name: null,
          players: []
        }
      ],
      rowGroups: [
      ],
      notGroupPlayers: [],
      addPlayerData: {
        playerId: null,
        groupId: null
      },
      addGroupData: {
        id: null,
        count: null
      },
      downloadGroupAgainstData : {
        id : null,
        typeId : null
      },
      timerNumber: null
    }
  },
  created() {
    this.competitionId = this.$route.params.id
    this.fetchData()
  },
  methods: {

    clickPreview() {
      this.preview = !this.preview

      if (this.preview) {
        this.timerNumber = this.addTimer()
      } else {
        this.clearTimer(this.timerNumber)
      }
    },

    addTimer() {
      return setInterval(() => {
        this.fetchData()
      }, 10000)
    },

    clearTimer(timerNumber) {
      clearInterval(timerNumber)
    },

    fetchData() {

      this.rowGroups = []

      getCompetitionDetail({id: this.competitionId}).then((res) => {
        this.groups = res.groups

        let rowGroup = {}
        let colGroups = []
        for (let i = 0; i < this.groups.length; i++) {

          if (i % 4 === 0) {

            rowGroup = {}
            colGroups = []

            rowGroup.colGroups = colGroups
            this.rowGroups.push(rowGroup)
          }

          let group = this.groups[i]

          colGroups.push({
            id: group.id,
            name: group.name,
            players: group.players
          })
        }
      })
    },

    onAddPlayer(id){
      this.dialogFormVisible = true
      this.addPlayerData.groupId = id

      getNotGroupPlayers({competitionId : this.competitionId}).then((result) => {
        this.notGroupPlayers = result.list
      })
    },

    onDeleteGroup(group){
      this.$alert("确认要删除" + group.name + "吗？", "提示", {
        type: "warning",
      }).then((res) => {
        deleteGroup({ id: group.id }).then((result) => {
          this.$message({
            showClose: true,
            message: result.resultMessage,
            type: 'success'
          });
          this.fetchData()
        });
      });
    },

    onDeletePlayer(index, row){
      deleteGroupPlayer({id: row.id}).then((result) => {
        this.fetchData()
      })
    },

    onResetPlayerParams() {
      this.dialogFormVisible = false
      this.addPlayerData.playerId = null
      this.addPlayerData.groupId = null
    },

    onResetGroupParams() {
      this.addGroupDialogFormVisible = false
      this.addGroupData.id = null
      this.addGroupData.count = null
    },

    onSubmitAddPlayer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = !this.dialogFormVisible
          addGroupPlayer(this.addPlayerData).then((result) => {
            this.$message({
              showClose: true,
              message: result.resultMessage,
              type: 'success'
            });
            this.fetchData();
          })
        } else {
          return false;
        }
      });
    },

    onSubmitAddGroup(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addGroupDialogFormVisible = !this.addGroupDialogFormVisible
          this.addGroupData.id = this.competitionId
          addGroup(this.addGroupData).then((result) => {
            this.$message({
              showClose: true,
              message: result.resultMessage,
              type: 'success'
            });
            this.fetchData();
          })
        } else {
          return false;
        }
      });
    },

    onSubmitDownloadGroupAgainstExcel(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.downloadExcelFormVisible = !this.downloadExcelFormVisible
          this.downloadGroupAgainstData.id = this.competitionId
          downloadGroupAgainstExcel(this.downloadGroupAgainstData).then((result) => {
            this.downLoad(result.url)
          })
        } else {
          return false;
        }
      });
    },

    onAddOneGroup() {
      addOneGroup({id : this.competitionId}).then((result) => {
        this.fetchData();
      })
    },

    onModifyGroupName(group) {
      modifyGroup({id : group.id, name : group.name}).then((result) => {
        this.$message({
          showClose: true,
          message: result.resultMessage,
          type: 'success'
        });
      })
    },

    downLoad(fileUrl) {
      window.location.href = fileUrl
    }
  }
}
</script>

<style scoped>
  .table-content{
    display:table-cell;
    text-align: center;
    border: 1px black solid;
  }
</style>
