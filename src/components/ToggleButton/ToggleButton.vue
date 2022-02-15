<script setup>
import { ref, watch, toRefs, computed } from 'vue'
import { useToggle } from './composeable/toggle'

const emit = defineEmits(['change'])
const props = defineProps({
    labelEnableText: {
      type: String,
      default: "On",
    },

    labelDisableText: {
      type: String,
      default: "Off",
    },

    defaultState: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    id: {
      type: String,
      default: "primary",
    },
})
const { defaultState, labelEnableText, labelDisableText, id } = toRefs(props)

const { checkedValue, isActive } = useToggle(defaultState.value)

watch(checkedValue, (val) => {
  emit('change', val)
})
</script>

<template>
  <label
    
    :class="{ active: isActive }"
    class="toggle__button"
  >
    <!-- <input
      type="checkbox"
      :disabled="disabled"
      :id="id + '_button'"
      v-model="checkedValue"
    /> -->
    <input
      type="checkbox"
      
      v-model="checkedValue"
    />
    <span class="toggle__switch">
      <span v-if="isActive" class="toggle__label">{{ labelEnableText }}</span>
      <span v-if="!isActive" class="toggle__label">{{ labelDisableText }}</span>
    </span>
  </label>
</template>



<style scoped>
.toggle__label {
  margin-top: 20px;
  color: #ffffff;
}
.toggle__button {
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
}
.toggle__button input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  width: 1px;
  height: 1px;
}
.toggle__button .toggle__switch {
  display: inline-block;
  height: 36px;
  border-radius: 21px;
  width: 72px;
  background: linear-gradient(90deg, #da3276 0%, #ec702f 100%);
  box-shadow: inset 0 0 1px #bfcbd9;
  position: relative;
  margin-left: 10px;
  transition: all 0.25s;
}

.toggle__button .toggle__switch::after,
.toggle__button .toggle__switch::before {
  content: "";
  position: absolute;
  display: block;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  left: 3px;
  top: 3px;
  transform: translateX(0);
  transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
}

.toggle__button .toggle__switch::after {
  background: #ffffff;
  box-shadow: 0 0 1px #666;
}
.toggle__button .toggle__switch::before {
  background: #4d4d4d;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  opacity: 0;
}

.active .toggle__switch {
  background: linear-gradient(90deg, #46998d 0%, #74e885 100%);
  box-shadow: inset 0 0 1px #adedcb;
}

.active .toggle__switch::after,
.active .toggle__switch::before {
  transform: translateX(40px - 18px);
}

.active .toggle__switch::after {
  left: 39px;
  background: #ffffff;
  box-shadow: 0 0 1px #53b883;
}
</style>