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
              <a-input v-model:value="formState.organization" />
            </a-form-item>
            <a-form-item label="关键字">
              <a-input v-model:value="formState.filter" />
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
              <a-button type="primary" @click="GetList()">搜索</a-button>
              <a-button type="primary" @click="Reset()">重置</a-button>
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
      :tableLayout="fixed"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="data.dataSource"
      class="mt_28"
      :pagination="false"
      :loading="data.loading"
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
          <a-popconfirm
            v-if="data.dataSource.length"
            title="确定删除吗?"
            ok-text="是"
            cancel-text="否"
            @confirm="onDelete(record.id)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
    <a-pagination
      :scroll="{ y: 240 }"
      v-model:current="data.current"
      :total="data.total"
      :pageSizeOptions="data.pageSizeOptions"
      @change="onChange"
      :page-size="data.MaxResultCount"
      show-size-changer
      @showSizeChange="onShowSizeChange"
      class="ant-pagination ant-table-pagination ant-table-pagination-right"
    />

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

import { List, Delete, Get } from "@/api/user";
import { message } from "ant-design-vue";

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
      GetUser(value);
    };

    const GetUser = (id) => {
      return Get(id)
        .then((response) => {
          return response.data;
        })
        .catch(() => {});
    };

    const onDelete = (key) => {
      console.log(key);
      Delete(key)
        .then((response) => {
          if (response?.data == true) {
            message.success("删除成功");
            GetList();
          }
        })
        .catch(() => {});
    };

    const columns = [
      {
        title: "用户名",
        key: "userName",
        dataIndex: "userName",
        ellipsis: true,
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
        ellipsis: true,
      },
      {
        title: "手机号",
        key: "phoneNumber",
        dataIndex: "phoneNumber",
        ellipsis: true,
      },
      {
        title: "角色标签",
        key: "id",
        dataIndex: "id",
        ellipsis: true,

        // slots: {
        //   customRender: "tags",
        // },
      },
      {
        title: "创建时间",
        key: "creationTime",
        dataIndex: "creationTime",
        ellipsis: true,
      },

      {
        title: "操作",
        key: "action",
        slots: {
          customRender: "action",
        },
      },
    ];

    const formState = reactive({
      filter: "",
    });

    const data = reactive({
      dataSource: [],
      total: 0,
      SkipCount: 0,
      MaxResultCount: 10,
      current: 1,
      pageSizeOptions: ["10", "20", "30"],
      loading: false,
    });

    //重置
    function Reset() {
      (formState.filter = ""), GetList();
    }
    const queryData = () => {
      data.loading = true;
      let params = {
        SkipCount: data.SkipCount < 0 ? 0 : data.SkipCount,
        MaxResultCount: data.MaxResultCount,
        Filter: formState.filter,
      };
      List(params)
        .then((respone) => {
          data.loading = false;
          data.dataSource = respone.data.items;
          data.total = respone.data.totalCount;
        })
        .catch(() => {
          data.loading = false;
        });
    };

    function onChange(page, pageSize) {
      data.SkipCount = page * pageSize - pageSize;
      data.MaxResultCount = pageSize;
      GetList();
    }

    const onShowSizeChange = (page, pageSize) => {
      data.SkipCount = page * pageSize - pageSize;
      data.MaxResultCount = pageSize;
      GetList();
    };

    function GetList() {
      queryData();
    }

    onMounted(() => {
      GetList();
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
      GetList,
      onChange,
      onShowSizeChange,
      Reset,
      onDelete,
    };
  },
});
</script>

<style scoped>
.form_btn button {
  margin-left: 20px;
}
</style>
