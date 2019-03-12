<template>
  <div class="msg-con">
    <h1>留言板</h1>
    <div class="msg-list">
      <button class="btn btn-primary" @click="handleAddContent">添加留言</button>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>姓名</th>
            <th>留言内容</th>
            <th>发表时间</th>
          </tr>
        </thead>
        <tbody v-for="msg in list" :key="msg.id">
          <th scope="row">{{msg.id}}</th>
          <td>{{msg.username}}</td>
          <td>{{msg.content}}</td>
          <td>{{msg.created_at}}</td>
          <button class="btn btn-success" id="editBtn" @click="handleEditClick(msg.username, msg.content, msg.id)">编辑</button>
          <button class="btn btn-success"  id="deleteBtn" @click="handleDeleteClick(msg.id)">删除</button>
        </tbody>
      </table>
    </div>
    <msg-add
    :ifAddBtnClick="ifAddBtnClick"
    :msg="editMsg"
    @submit="submit"
    :username="username"
    :content="content"
    @handleCancelClick="handleCancelClick"
    ref="msgAdd"></msg-add>
    <div class="delete-confirm" v-show="ifDeleteBtnClick">
      <p>删除数据，将不能恢复，你确定删除吗？</p>
      <p>
        <button class="cancel-btn btn btn-primary" @click="handleQuitDelete">取消</button>
        <button class="confirm-btn btn btn-primary" @click="handleConfirmDelete">确定</button>
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MsgAdd from './MsgAdd'
export default {
  name: 'Msg',
  data () {
    return {
      list: [],
      username: '',
      content: '',
      ifAddBtnClick: false,
      action: '',
      editMsg: {},
      method: '',
      ifDeleteBtnClick: false
    }
  },
  components: {
    'msg-add': MsgAdd
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      fetch('http://localhost:3000/msg')
        .then(response => response.json())
        .then(list => {
          this.list = list
        })
    },
    handleSubmitClick () {
      console.log(this.username)
      console.log(this.content)
      let username = this.username
      let content = this.content
      var data = {
        username,
        content
      }
      var method = 'POST'
      if (this.action === 'edit') {
        data.id = this.editId
        method = 'PUT'
      }
      fetch('http://localhost:3000/msg', {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: method
      })
        .then(response => response.json())
        .then((res) => {
          if (res.code === 0) {
            this.getList()
          } else {
            alert(res.error)
          }
        })
    },
    handleConfirmDelete () {
      console.log(this.id)
      fetch('http://localhost:3000/msg?id=' + this.id, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then((res) => {
          if (res.code === 0) {
            this.getList()
          } else {
            alert(res.error)
          }
        })
      this.ifDeleteBtnClick = false
    },
    handleEditClick (name, text, id) {
      this.ifAddBtnClick = true
      this.editMsg = {
        username: name,
        content: text
      }
      this.username = name
      this.content = text
      // this.content = text
      this.action = 'edit'
      this.editId = id
      this.handleSubmitClick()
      // this.$refs.msgAdd.handleSubmitClick()
    },
    handleAddContent () {
      this.ifAddBtnClick = !this.ifAddBtnClick
      this.action = ''
      this.username = ''
      this.content = ''
      this.editMsg = {
        username: '',
        content: ''
      }
    },
    handleCancelClick () {
      this.ifAddBtnClick = false
    },
    handleDeleteClick (id) {
      this.ifDeleteBtnClick = !this.ifDeleteBtnClick
      this.id = id
      console.log(this.id)
    },
    handleQuitDelete () {
      this.ifDeleteBtnClick = false
    },
    submit (username, content) {
      this.username = username
      this.content = content
      console.log(username)
      console.log(this.username)
      this.ifAddBtnClick = false
      this.handleSubmitClick()
    }
  }
}
</script>

<style scoped>
div {
  text-align: left;
}
h1{
  text-align: center;
}
.msg-con {
  width: 800px;
  margin: auto;
}
.launchContent {
  background: #66afe9;;
  position: absolute;
  display: block;
  width: 300px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -100px;
  text-align: center;
}
.delete-confirm{
  background: #66afe9;;
  position: absolute;
  width: 300px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -100px;
}
</style>
