<template>
  <el-form label-position="left" label-width="auto" style="max-width: 600px">
    <el-form-item
      label="Activity name"
      :label-tooltip="{
        content: 'The name is displayed to all participants.',
        iconColor: '#409eff',
        effect: 'light',
        popperClass: 'form-label-tooltip',
      }"
    >
      <el-input />
    </el-form-item>
    <el-form-item
      label="Activity zone"
      :label-tooltip="{
        content: 'Choose the zone where the activity takes place.',
        position: 'before',
      }"
    >
      <el-input />
    </el-form-item>
  </el-form>
</template>

<style>
.form-label-tooltip {
  max-width: 240px;
}
</style>
