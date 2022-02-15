import { ref, computed } from 'vue';

export const useToggle = (defaultState) => {
    const checkedValue = ref(defaultState)

    const isActive = computed(() => checkedValue.value)

    return {
        checkedValue,
        isActive
    }
}