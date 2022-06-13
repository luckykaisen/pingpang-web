<template>
  <div>
    <el-table
        :data="list"
        height="620"
        border
        style="width: 100%;"
        router>
      <el-table-column
          prop="name"
          label="名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="participantLimit"
          label="限制人数"
          width="180">
      </el-table-column>
      <el-table-column
          prop="signUpPrice"
          label="报名费"
          width="100">
      </el-table-column>
      <el-table-column
          prop="dinnerPrice"
          label="聚餐费"
          width="100">
      </el-table-column>
      <el-table-column
          prop="date"
          label="比赛日期">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="1000">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)" type="button" size="small">编辑</el-button>
          <el-button @click="getDetail(scope.row)" type="button" size="small">查看</el-button>
          <el-button @click="toGroup(scope.row)" type="button" size="small">分组</el-button>
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
  </div>

</template>

<script>

import MyPagination from '@/components/common/pagination/index'

import {searchCompetition} from '@/network/api/competition.js'

export default {
  name: "index",
  components: {
    MyPagination
  },
  data() {
    return {
      listLoading: false,
      searchParams: {
        pageSize: 10,
        pageNumber: 1
      },
      total: 0,
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {

  },
  methods: {
    fetchData() {
      this.listLoading = true
      searchCompetition(this.searchParams)
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
    getDetail(row) {
      this.$router.push('/competition/detail/' + row.id)
    },

    modify(row) {
      this.$router.push('/competition/edit/' + row.id)
    },

    toGroup(row) {
      this.$router.push('/competition/group/detail/' + row.id)
    }
  }
}
</script>

<style scoped>
</style>
