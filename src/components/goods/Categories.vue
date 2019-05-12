<template>
  <div class="cate_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary"
                 @click="showAddDialog()"
                 plain>添加分类</el-button>
    </el-card>
    <el-table :data="categories"
              :indent="50"
              style="width: 100%;margin-bottom: 20px;"
              row-key="cat_id">
      <el-table-column prop="cat_name"
                       label="分类名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="cat_deleted"
                       label="是否有效"
                       width="180">
      </el-table-column>
      <el-table-column prop="cat_level"
                       label="等级">
      </el-table-column>
      <el-table-column prop="address"
                       label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button icon="el-icon-edit"
            @click="showEditDialog(scope.row.cat_id)"
                       round></el-button>
            <el-button icon="el-icon-delete"
            @click="delCategory(scope.row.cat_id)"
                       round></el-button>
          </el-button-group>
        </template>

      </el-table-column>
    </el-table>
    <div class="pager_container">
      <el-pagination background
                     :page-size="reqParams.pagesize"
                     :current-page.sync="reqParams.pagenum"
                     @current-change="changePager"
                     layout="prev, pager, next"
                     :total="total">
      </el-pagination>
    </div>
    <!-- 添加分类对话框   title 对话框标题 -->
    <!-- addDialogFormVisible 该属性的作用是用数据控制对话框中显示和隐藏的 -->
    <el-dialog title="添加分类"
               width="400px"
               :visible.sync="addDialogFormVisible">
      <!-- model属性时绑定表单数据对象 -->
      <!-- label-width 左边文字的宽度 -->
      <!-- rules属性添加校验规则对象的 -->
      <el-form :model="addForm"
               :rules="addRules"
               clearable
               ref="addForm"
               autocomplete="off"
               label-width="100px">
        <el-form-item label="父级分类">
          <!-- 需要级联显示 -->
          <!-- expand-trigger  hover鼠标经过就会展开 -->
          <!-- options  执行选项的数据 -->
          <!-- v-model 双向数据绑定 指定选择级联数据的时候去修改的字段 -->
          <!-- 级联的选择的结果:是一个数组[一级分类ID,二级分类ID] -->
          <!-- @change 选择事件  指定了一个处理函数 handleChange-->
          <!-- props ={value:'选项对象的字段',label:'选项对象的名称字段'}该选项值为对象 -->
          <el-cascader expand-trigger="hover"
                       :options="categoryList"
                       :props="{value:'cat_id',label:'cat_name'}"
                       :change-on-select="true"
                       v-model="categoryValues"
                       style="width:100%">
          </el-cascader>

        </el-form-item>
        <el-form-item label="分类名称"
                      prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog title="编辑分类"
               width="400px"
               :visible.sync="editDialogFormVisible">
      <!-- model属性时绑定表单数据对象 -->
      <!-- label-width 左边文字的宽度 -->
      <!-- rules属性添加校验规则对象的 -->
      <el-form :model="editForm"
               :rules="editRules"
               ref="editForm"
               autocomplete="off"
               label-width="100px">
        <el-form-item label="分类名称"
                      prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from './Categories-Mixin.js'
export default {
  mixins: [mixin]
}
</script>

<style scoped>
</style>
