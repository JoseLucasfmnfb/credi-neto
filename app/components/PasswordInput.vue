<script setup lang="ts">
import { ref } from 'vue'

const modelValue = defineModel<string>()
const show = ref(false)
</script>

<template>
    <div class="relative">
        <input
            :type="show ? 'text' : 'password'"
            v-model="modelValue"
            class="w-full mt-1 p-2 border rounded pr-10
                   focus:ring-2 focus:ring-[#D85A1A] focus:outline-none"
        />

        <button
            type="button"
            @click="show = !show"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
            <span v-if="show">🙈</span>
            <span v-else>👁️</span>
        </button>
    </div>
</template>
