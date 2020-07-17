<!-- 富文本编辑器 -->
<template>
  <div>
    <script id="editor" type="text/plain" />
  </div>
</template>

<script>
import '../../../static/ueditor/ueditor.config.js'
import '../../../static/ueditor/ueditor.all.js'
import '../../../static/ueditor/lang/zh-cn/zh-cn.js'
import '../../../static/ueditor/jquery-2.2.3.min.js'
import Editor from 'wangeditor'

export default {
  name: 'UEditor',
  props: {
    id: {
      type: String
    },
    config: {
      type: Object
    },
    editorValue: {
      type: String
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch:{
     editorValue:function (newVal,oldVal) {
          this.editor.txt.html(newVal)
     }
  },
  mounted() {
    // 初始化UE
    this.editor = UE.delEditor('editor')
    this.editor = UE.getEditor('editor', this.config)
    this.editor.addListener('ready', () => {
      this.ready = true
      this.$emit('ready', this.editor)
      this.editor.setContent(this.editorValue)
    })
    // this.editor = new Editor('#editor')
    //  this.editor.create()
    // console.log("this.editorValue")
    //  this.editor.txt.html('<H1>用 JS 设置的内容</H1>')
    // console.log(this.editorValue)
    // this.editor.txt.html(this.editorValue)
  },
  destoryed() {
    this.editor.destory()
  },
  methods: {
    getUEContent: function() {
      return this.editor.getContent()
    },
    getContentTxt: function() {
      return this.editor.getContentTxt()
    },
    setUEContent(value) {
      this.editor.setContent(value)
    },
    initEditor() {
      // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
      // 所以，我们只能在 nextTick 里面初始化 UEditor
      this.$nextTick(() => {
        this.editor = window.UE.getEditor('editor', this.config)
        // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
        this.editor.addListener('ready', () => {
          this.$emit('ready', this.editor)
        })
      })
    }
  }
}
</script>
