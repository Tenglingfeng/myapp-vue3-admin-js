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
                v-model:value="value1"
                style="width: 120px"
                @focus="focus"
                @change="handleChange"
                dropdownMatchSelectWidth="true"
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
          <a-button type="primary" @click="visible = true">新增用户</a-button>
        </a-col>
      </a-row>
    </div>
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="data"
      class="mt_28"
    >
      <template #tags="{ text: tags }">
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
      </template>
      <template #enables="{}">
        <a-switch v-model:checked="checked" />
      </template>
      <template #action="">
        <span>
          <a>详情</a>
          <a-divider type="vertical" />
          <a>删除</a>
          <a-divider type="vertical" />
        </span>
      </template>
    </a-table>
    <ModalUser :show="visible" />
  </div>
</template>
<script>
import { computed, defineComponent, reactive, ref, toRefs } from "vue";

import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";

import ModalUser from "@/components/Modal/User.vue";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    slots: {
      customRender: "tags",
    },
  },
  {
    title: "Enable",
    key: "enables",
    dataIndex: "enables",
    slots: {
      customRender: "enables",
    },
  },
  {
    title: "Action",
    key: "action",
    slots: {
      customRender: "action",
    },
  },
];
const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    tags: [`Teng`, `Ling`, `Feng`],
    enables: false,
  });
}

export default defineComponent({
  components: { ModalUser },
  setup() {
    const state = reactive({
      selectedRowKeys: [],
      // Check here to configure the default column
      loading: false,
    });
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const start = () => {
      state.loading = true; // ajax request after empty completing

      setTimeout(() => {
        state.loading = false;
        state.selectedRowKeys = [];
      }, 1000);
    };

    const onSelectChange = (selectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };
    const checked = ref(false);

    const from = reactive({
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

    const visible = ref(false);

    return {
      data,
      columns,
      hasSelected,
      ...toRefs(state),
      // func
      start,
      onSelectChange,
      SmileOutlined,
      DownOutlined,
      checked,
      from,
      formState,
      visible,
    };
  },
});
</script>

<style scoped>
.form_btn button {
  margin-left: 20px;
}
</style>
