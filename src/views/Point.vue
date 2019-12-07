<template lang="pug">
.home(v-loading='state.loading')
  .points
    h3 포인트 관리1
    .no-result(v-if="state.menus.length === 0") 포인트 항목을 추가해 주세요
    .point(v-for="item in state.menus" :key="item._id" :class="{hidden: item.hidden}")
      el-card(shadow="hover" v-loading="item.loading")
        template(v-if="item.editable")
          .pointLabel(slot="header")
            .flex1
              el-input.label-input(v-model='item.label' placeholder="제목입력. ex) 출석")
            el-button.btn(size="mini" icon="el-icon-check" type="" @click="handleSave(item)") 저장
            el-button.btn(size="mini" icon="el-icon-close" type="" @click="handleCancel(item)") 취소
          .item
            .label 입력개수
            .value
              el-input-number(
                v-model='item.type'
                size="mini"
                :min="2"
                :max="20"
              )
          .item 
            .label 가중치
            .value
              el-input-number(
                v-model='item.priority'
                size="mini"
                :min="0"
                :max="100"
              )
          .item
            .label 상태
            .value
              el-radio(v-model="item.hidden" :label="false") 사용
              el-radio(v-model="item.hidden" :label="true") 미사용
        template(v-else)
          .pointLabel(slot="header")
            h4 {{item.label}}
            el-button.btn(size="mini" icon="el-icon-edit" type="" @click="handleEdit(item)") 수정
            el-button.btn(size="mini" icon="el-icon-delete" type="" @click="handleRemove(item)") 삭제
          .item
            .label 입력개수
            .value {{item.type}}
          .item 
            .label 가중치
            .value {{item.priority}}
          //- .item
          //-   .label 사용여부
          //-   .value {{item.hidden}}            
    .point(v-if="state.newPointMenu.editable")
      el-card(shadow="hover" v-loading='state.newPointMenu.loading')
        .pointLabel(slot="header")
          .flex1
            el-input.label-input(
              v-model='state.newPointMenu.label'
              placeholder="제목입력. ex) 출석"
              ref="newPointMenuLabel"
            )
          el-button(size="mini" icon="el-icon-check" @click="handleCreate") 저장
          el-button(size="mini" icon="el-icon-close" @click="handleCancel(state.newPointMenu)") 취소
        .item
          .label 입력개수
          .value
            el-input-number(
              v-model='state.newPointMenu.type'
              size="mini"
              :min="2"
              :max="20"
            )
        .item 
          .label 가중치
          .value
            el-input-number(
                v-model='state.newPointMenu.priority'
                size="mini"
                :min="0"
                :max="100"
              )          
    el-button.new-item(v-else icon="el-icon-plus" @click="handleAdd") 새로운 항목 추가   
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted, reactive} from '@vue/composition-api'
import {remove, equals, propEq, eqProps, clone} from 'ramda'
import {
  useBeforeMount,
  useHandleCreate,
  IState,
  IPointMenu,
  useHandleRemove,
  useHandleSave,
  DEFAULT,
  checkType,
} from './point.fn'

export default {
  name: 'v-point',
  setup(props: any, {root, refs}: any) {
    const state = reactive<IState>({
      menus: [],
      loading: false,
      newPointMenu: DEFAULT(),
      rules: {
        type: [{validator: checkType, trigger: 'change'}],
        priority: [{validator: () => {}, trigger: 'change'}],
      },
    })
    onBeforeMount(useBeforeMount({state}))
    return {
      state,
      handleCreate: useHandleCreate({state}),
      handleRemove: useHandleRemove({state}),
      handleCancel: item => {
        Object.assign(item, item.clone)
        item.editable = false
      },
      handleEdit: item => {
        item.clone = clone(item)
        item.editable = true
      },
      handleAdd: () => {
        state.newPointMenu = DEFAULT()
        state.newPointMenu.editable = true
        setTimeout(() => refs.newPointMenuLabel.focus(), 200)
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

    .hidden {
      .pointLabel, .label, .value, .btn {
        color: #bbb;
      }
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
      }

      .item + .item {
        margin-top: 7px;
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

    .new-item {
      margin-top: 10px;
    }
  }
}

.flex1 {
  flex: 1;
}
</style>
