<template>
  <div>
   <div>
     <el-input v-model="searchParams.name" placeholder="请输入姓名" style="width: 200px" :clearable="true"></el-input>
     <el-button type="primary" style="margin-left: 10px" @click="fetchData">查询</el-button>
     <el-button type="success" style="margin-left: 10px" @click="addPlayerDialogFormVisible = true">添加</el-button>
   </div>
    <el-table
        :data="list"
        height="620"
        border
        style="width: 561px;margin-top: 10px"
        router>
      <el-table-column
          prop="id"
          label="ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200px">
        <template slot-scope="scope">
          <el-button @click="onUpdatePlayer(scope.row)" type="button" size="small">编辑</el-button>
          <el-button @click="onDeletePlayer(scope.row)" type="button" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <my-pagination
        v-show="total > 0"
        :total="total"
        :page.sync="searchParams.pageNumber"
        :limit.sync="searchParams.pageSize"
        @pagination="fetchData"
    />

    <el-dialog title="添加会员" :visible.sync="addPlayerDialogFormVisible" @close="onResetAddPlayerParams">
      <el-form :model="addPlayerData" :rules="rules" ref="addPlayerForm" >
        <el-form-item label="姓名" label-width="200px" prop="name">
          <el-input v-model="addPlayerData.name" placeholder="请输入姓名" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPlayerDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitAddPlayer('addPlayerForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑姓名" :visible.sync="dialogFormVisible" @close="onResetPlayerParams">
      <el-form :model="updatePlayerData" :rules="rules" ref="updatePlayerForm" >
        <el-form-item label="姓名" label-width="200px" prop="name">
          <el-input v-model="updatePlayerData.name" placeholder="请输入姓名" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitUpdatePlayer('updatePlayerForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import MyPagination from '@/components/common/pagination/index'
import {searchPlayer, updatePlayer, deletePlayer, addPlayer} from "@/network/api/player.js";

export default {
  name: "index",
  components: {
    MyPagination
  },
  data() {
    return {
      listLoading: false,
      dialogFormVisible: false,
      addPlayerDialogFormVisible: false,
      searchParams: {
        pageSize: 10,
        pageNumber: 1
      },
      updatePlayerData: {
        id: null,
        name: null
      },
      addPlayerData: {
        name: null
      },
      total: 0,
      list: [],
      rules: {
        name: [
          { required: true, message: '请输入参赛人姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      searchPlayer(this.searchParams)
          .then((res) => {
            console.log(res);
            this.list = res.list
            this.listLoading = false
            this.total = res.recordNumber
          })
          .catch(() => {
            this.listLoading = false
          })
    },

    onResetPlayerParams() {
      this.dialogFormVisible = false
      this.updatePlayerData.id = null
    },

    onResetAddPlayerParams() {
      this.addPlayerDialogFormVisible = false
      this.addPlayerData.name = null
    },

    onUpdatePlayer(row) {
      this.dialogFormVisible = true
      this.updatePlayerData.id = row.id
      this.updatePlayerData.name = row.name
    },

    onDeletePlayer(row) {
      console.log(row.id)
      this.$alert("确认要删除" + row.name + "吗？", "提示", {
        type: "warning",
      }).then((res) => {
        deletePlayer({ id: row.id }).then((result) => {
          this.$message({
            showClose: true,
            message: result.resultMessage,
            type: 'success'
          });
          this.fetchData()
        });
      });
    },

    onSubmitUpdatePlayer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = !this.dialogFormVisible
          updatePlayer(this.updatePlayerData).then((result) => {
            this.$message({
              showClose: true,
              message: result.resultMessage,
              type: 'success'
            });
            this.fetchData()
          })
        } else {
          return false;
        }
      });
    },

    onSubmitAddPlayer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addPlayerDialogFormVisible = !this.addPlayerDialogFormVisible
          addPlayer(this.addPlayerData).then((result) => {
            this.$message({
              showClose: true,
              message: result.resultMessage,
              type: 'success'
            });
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

</style>
