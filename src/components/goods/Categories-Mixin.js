export default {
  name: 'Categories',
  data () {
    return {
      // 列表数据相关
      reqParams: {
        pagenum: 1,
        pagesize: 5
      },
      categories: [],
      total: 0,
      // 添加分类相关的数据
      addDialogFormVisible: false,
      form: {},
      addForm: {
        // 如果父级的ID的等级是第一级 子一级 1
        // 字段 需要后台接口保持一致
        // cat_level数据会依赖父级数据的值
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      addRules: {
        cat_name: {
          required: true, message: '分类名称必填', trigger: 'blur'
        }
      },
      // 级联相关数据
      categoryList: [],
      // 选择了练级控件后的值
      categoryValues: [],
      // 编辑相关的数据
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        cat_name: {
          required: true, message: '分类名称必填', trigger: 'blur'
        }
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 删除数据
    delCategory (id) {
      this.$confirm('是否删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发请求去删除
        const { data: { meta } } = await this.$http.delete(`categories/ ${id}`)
        if (meta.status !== 200) return this.$message.error('删除分类失败')
        this.$message.success('删除分类成功')
        this.getData()
      }).catch(() => {
      })
    },
    async showEditDialog (id) {
      // 重置表单
      this.$nextTick(() => {
        this.$refs.editForm.resetFields()
      })
      // 填充表单的时候在重置之后
      // 获取数据
      const { data: { data, meta } } = await this.$http.get(`categories/${id}`)
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      // 填充数据
      this.editForm = data
      this.editDialogFormVisible = true
    },
    // 编辑事件
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const { data: { meta } } = await this.$http.put(`categories/${this.editForm.cat_id}`, { cat_name: this.editForm.cat_name })
          if (meta.status !== 200) return this.$message.error('编辑分类失败')
          this.$message.success('编辑分类成功')
          this.getData()
          this.editDialogFormVisible = false
        }
      })
    },
    // 添加事件
    addSubmit () {
      // 提前做校验.
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 提交数据
          // cat_name 通过v-model绑定好的
          // cat_pid cat_level 都和父级分类有关系 categoryValues
          // 0表示一级分类; 1表示二级分类; 2表示三级分类
          // cat_level和categoryValues的长度一致
          // cat_pid和categoryValues有长度 最后一项的值 没长度 默认0
          const len = await this.categoryValues.length
          if (len) {
            this.addForm.cat_pid = this.categoryValues[len - 1]
          } else {
            this.addForm.cat_pid = 0
          }
          this.addForm.cat_level = len
          // 提交
          const { data: { meta } } = await this.$http.post('categories', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加分类失败')
          this.$message.success('添加分类成功')
          this.getData()
          this.addDialogFormVisible = false
        }
      })
    },
    // 显示添加对话框
    async showAddDialog () {
      // 获取数据  渲染级联
      const { data: { data, meta } } = await this.$http.get('categories', {
        params: { type: 2 }
      })
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      // 设置下拉选项数据
      this.categoryList = data
      // 重置级联之前选择的值
      this.categoryValues = []
      // 打开对话框
      this.addDialogFormVisible = true
      // 重置表单
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    async getData () {
      const { data: { data, meta } } = await this.$http.get('categories', {
        params: this.reqParams
      })
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      // data 数据结构
      this.categories = data.result
      this.total = data.total
    },
    changePager (newPage) {
      // 改变页码
      this.reqParams.pagenum = newPage
      // 获取数据
      this.getData()
    }
  }
}
