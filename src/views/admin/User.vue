<template>
  <div class="mt_28">
    <div class="table-operations">
      <a-row type="flex">
        <a-col flex="auto">
          <a-form
            layout="inline"
            :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="机构">
              <a-input v-model:value="formState.resource" />
            </a-form-item>
            <a-form-item label="关键字">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="启用状态">
              <a-select
                ref="select"
                style="width: 120px"
                :dropdownMatchSelectWidth="true"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item class="ml_10 mr_10 form_btn">
              <a-button type="primary">搜索</a-button>
              <a-button type="primary">重置</a-button>
              <a-button type="primary">导出</a-button>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col flex="100px">
          <a-button type="primary" @click="dataProp.visible = true"
            >新增用户</a-button
          >
        </a-col>
      </a-row>
    </div>
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="data.dataSource"
      class="mt_28"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- <template #tags="{ text: tags }">
        <span>
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template> -->
      <!-- <template #enables="{}">
        <a-switch v-model:checked="checked" />
      </template> -->

      <template #action="{ record }">
        <span>
          <a @click="query(record.id)">详情</a>
          <a-divider type="vertical" />
          <a @click="edit(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a @click="remove(record.id)">删除</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </a-table>
    <ModalUser
      v-model:show="dataProp.visible"
      v-model:rowId="dataProp.rowId"
      v-model:title="dataProp.title"
    />
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";

import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";

import ModalUser from "@/components/Modal/User.vue";

import { List } from "@/api/user";

export default defineComponent({
  components: { ModalUser },
  setup() {
    const state = reactive({
      selectedRowKeys: [],
      // Check here to configure the default column
      loading: false,
    });
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const onSelectChange = (selectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };
    const checked = ref(false);

    const formform = reactive({
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    });
    const formState = reactive({
      name: "",
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    const dataProp = reactive({
      visible: false,
      rowId: "",
      title: "新增用户",
    });

    const edit = (value) => {
      dataProp.rowId = value;
      dataProp.title = "编辑用户";
      dataProp.visible = true;
    };

    const query = (value) => {
      console.log(value);
    };

    const remove = (value) => {
      console.log(value);
    };

    const columns = [
      {
        title: "用户名",
        key: "userName",
        dataIndex: "userName",
      },
      {
        title: "名称",
        key: "name",
        dataIndex: "name",
      },
      {
        title: "邮箱",
        key: "email",
        dataIndex: "email",
      },
      {
        title: "手机号",
        key: "phoneNumber",
        dataIndex: "phoneNumber",
      },
      {
        title: "角色标签",
        key: "id",
        dataIndex: "id",
        // slots: {
        //   customRender: "tags",
        // },
      },
      {
        title: "创建时间",
        key: "creationTime",
        dataIndex: "creationTime",
      },

      {
        title: "操作",
        key: "action",
        slots: {
          customRender: "action",
        },
      },
    ];

    const data = reactive({
      dataSource: [],
    });

    const queryData = () => {
      List({ SkipCount: 0, MaxResultCount: 10 }).then((respone) => {
        data.dataSource = respone.data.items;
      });
    };
    onMounted(() => {
      queryData();
    });

    return {
      data,
      columns,
      hasSelected,
      ...toRefs(state),
      onSelectChange,
      SmileOutlined,
      DownOutlined,
      checked,
      formform,
      formState,
      dataProp,
      edit,
      query,
      remove,
    };
  },
});
</script>

<style scoped>
.form_btn button {
  margin-left: 20px;
}
</style>
