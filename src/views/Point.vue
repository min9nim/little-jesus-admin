<template lang="pug">
.home(v-loading='state.loading')
  .points
    h3 포인트 관리
    .no-result(v-if="state.menus.length === 0") 포인트 항목을 추가해 주세요
    .point(v-for="item in state.menus" :key="item._id")
      el-card(shadow="hover" v-loading="item.loading")
        template(v-if="item.editable")
          .pointLabel(slot="header")
            .flex1
              el-input.label-input(v-model='item.label' placeholder="제목입력. ex) 출석")
            el-button(size="mini" @click="handleSave(item)") 저장
            el-button(size="mini" @click="handleCancel(item)") 취소
          .item
            .label type
            .value
              el-input(
                v-model='item.type'
                placeholder="입력 형태. ex) checkbox, radio:3"
              )
          .item 
            .label priority
            .value
              el-input(v-model='item.priority' placeholder="가중치. ex) 7")
          .item
            .label hidden
            .value
              el-radio(v-model="item.hidden" :label="true") true
              el-radio(v-model="item.hidden" :label="false") false
        template(v-else)
          .pointLabel(slot="header")
            h4 {{item.label}}
            el-button(size="mini" @click="handleEdit(item)") 수정
            el-button(size="mini" @click="handleRemove(item)") 삭제
          .item
            .label type
            .value {{item.type}}
          .item 
            .label priority
            .value {{item.priority}}
          .item
            .label hidden
            .value {{item.hidden}}            
    .point(v-if="state.newPointMenu.editable")
      el-card(shadow="hover" v-loading='state.newPointMenu.loading')
        .pointLabel(slot="header")
          .flex1
            el-input.label-input(v-model='state.newPointMenu.label' placeholder="제목입력. ex) 출석")
          el-button(size="mini" @click="handleCreate") 저장
          el-button(size="mini" @click="handleCancel(state.newPointMenu)") 취소
        .item
          .label type
          .value
            el-input(
              v-model='state.newPointMenu.type'
              placeholder="입력 형태. ex) checkbox, radio:3"
            )
        .item 
          .label priority
          .value
            el-input(v-model='state.newPointMenu.priority' placeholder="가중치. ex) 7")
        .item
          .label hidden
          .value
            el-radio(v-model="state.newPointMenu.hidden" :label="true") true
            el-radio(v-model="state.newPointMenu.hidden" :label="false") false
    el-button(v-else @click="handleEdit(state.newPointMenu)") 추가      
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted, reactive} from '@vue/composition-api'
import {remove, equals, propEq, eqProps} from 'ramda'
import {
  useBeforeMount,
  useHandleCreate,
  IState,
  IPointMenu,
  useHandleRemove,
  useHandleSave,
} from './point.fn'

export default {
  name: 'v-point',
  setup(props: any, {root}: any) {
    const state = reactive<IState>({
      menus: [],
      loading: false,
      newPointMenu: {
        hidden: false,
        loading: false,
        editable: false,
      },
    })
    onBeforeMount(useBeforeMount({state}))
    return {
      state,
      // handleAddClick: () => {
      //   state.newPointMenu.editable = true
      // },
      handleCreate: useHandleCreate({state}),
      handleRemove: useHandleRemove({state}),
      handleCancel: item => {
        item.editable = false
      },
      handleEdit: item => {
        item.editable = true
      },
      handleSave: useHandleSave(),
    }
  },
}
</script>
<style scoped lang="stylus">
.home {
  // margin: 0 10px;
  padding: 0 5px;
  text-align: left;

  .points {
    h3 {
      margin-top: 0;
    }

    .point {
      margin: 15px 0;

      .pointLabel {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h4 {
          flex: 1;
          margin: 0;
        }

        .label-input {
          width: 150px;
        }

        .el-input__inner {
          height: 30px;
        }
      }

      .item + .item {
        margin: 5px 0;
      }

      .item {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .label {
          display: flex;
          width: 80px;
        }

        .value {
          flex: 1;
        }
      }
    }
  }
}

.flex1 {
  flex: 1;
}
</style>
