<template lang="pug">
.home(v-loading='state.loading')
  .teachers 선생님
    .list
      el-tag.item(v-for="item in globalState.teachers") {{item.name}}
    
</template>

<script lang="ts">
import {createComponent, onBeforeMount, onMounted} from '@vue/composition-api'
import {
  useState,
  useBeforeMount,
  useHandleSave,
  IState,
  useGlobalState,
  useHandleDateChange,
  useHandleTeacherChange,
  useHandleEdit,
  useHandleRemove,
} from './home.fn'
import EditPoint from '../components/EditPoint.vue'
import ReadPoint from '../components/ReadPoint.vue'
import {IGlobalState, IPoint, ITeacher} from '../biz/type'

export default {
  name: 'v-home',
  components: {EditPoint, ReadPoint},
  setup(props: any, {root}: any) {
    const globalState: IGlobalState = useGlobalState()
    const state: IState = useState()
    const handleTeacherChange = useHandleTeacherChange({state, globalState})
    const handleDateChange = useHandleDateChange({state, globalState})
    const handleSave = useHandleSave({state, globalState})
    const handleEdit = useHandleEdit({state})
    const handleRemove = useHandleRemove({state})
    onBeforeMount(useBeforeMount({root, state, globalState}))
    return {
      state,
      globalState,
      handleTeacherChange,
      handleDateChange,
      handleSave,
      handleEdit,
      handleRemove,
      handleCancel: () => {
        state.editable = false
      },
    }
  },
}
</script>
<style scoped lang="stylus">
.home {
  // margin: 0 10px;
  padding: 5px;
  text-align: left;
  .item {
    margin: 5px;
  }
}
</style>
