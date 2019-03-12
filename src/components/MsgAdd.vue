<template>
  <div class="launchContent" v-show="ifAddBtnClick">
    <!-- <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)">组件上使用v-model -->
      <div class="form-field">
        用户名：
        <input name="username" v-model="username">
      </div>
      <div class="form-field" id="content">
        <span style="padding-left: 14px">内容：</span>
        <textarea style="width:150px" v-model="content"></textarea>
      </div>
      <div class="btn-list">
        <button class="cancel-submit-btn btn btn-primary" @click="handleCancelClick">取消</button>
        <button class="submit-btn btn btn-primary" @click="handleSubmitClick">提交</button>
      </div>
      <slot></slot><!-- 插槽 -->
    </div>
</template>

<script>
export default {
  props: {
    ifAddBtnClick: {
      type: Boolean,
      default: false
    },
    msg: Object,
    // username: {
    //   type: String,
    //   default: null
    // },
    // content: {
    //   type: String,
    //   default: null
    // },
    submit: Function,
    value: String
  },
  data () {
    return {
      username: '',
      content: ''
    }
  },
  watch: {
    msg (val, oldVal) {
      if (val.username !== oldVal.username) {
        this.username = val.username
      }
      this.content = val.content
    }
  },
  methods: {
    handleCancelClick () {
      this.$emit('handleCancelClick')
    },
    handleSubmitClick () {
      this.$emit('submit', this.username, this.content)
    }
  }
}
</script>

<style scoped>
</style>
