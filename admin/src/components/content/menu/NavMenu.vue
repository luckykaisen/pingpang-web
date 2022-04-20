<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

      <el-submenu index="1">
        <template slot="title">工作台</template>
        <el-submenu index="1-1">
          <template slot="title">比赛管理</template>
          <el-menu-item index="1-1-1">比赛列表</el-menu-item>
          <el-menu-item index="1-1-2">添加比赛</el-menu-item>
        </el-submenu>

        <el-submenu index="2-1">
          <template slot="title">会员管理</template>
          <el-menu-item index="2-1-1">会员列表</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-menu-item index="3">森杨晟茂乒乓球俱乐部</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if ('1-1-1' === key) {
        this.$router.push('/competition/list')
      } else if ('1-1-2' === key) {
        this.$router.push('/competition/add')
      } else if ('2-1-1' === key) {
        this.$router.push('/player/list')
      } else if ('3' === key) {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped>

</style>
