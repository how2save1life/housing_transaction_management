<template>
  <div class="header">
    <!--<el-header style="display:flex;justify-content:flex-end;align-items:center;padding:20px;">

    </el-header>-->
{{this.$store.getters.getRoles}}
    {{this.$store.getters.getUserId}}
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onclick(){

    }
  }
};
</script>

<style lang="sass" scoped>

</style>

