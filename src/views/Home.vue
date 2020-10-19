<template>
  <div class="home-container">
    <div class="box">
      Test
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
  .box{
    height: 100px;
    width: 100px;
    transition: all 0.5s ease-in-out;
    background: #49f;
  }
  .box:hover {
    transform: scale(1.5, 1.5)
  }
</style>
