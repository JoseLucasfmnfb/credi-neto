<script setup lang="ts">
const { toasts, removeToast } = useToast()
</script>

<template>
    <ClientOnly>
        <div class="fixed top-5 right-5 z-[9999] w-[90vw] sm:w-96 flex flex-col space-y-3 pointer-events-none">
            <TransitionGroup 
                enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div 
                    v-for="toast in toasts" 
                    :key="toast.id"
                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                    :class="{
                        'bg-green-50': toast.type === 'success',
                        'bg-red-50': toast.type === 'error',
                        'bg-blue-50': toast.type === 'info',
                        'bg-yellow-50': toast.type === 'warning'
                    }"
                >
                    <div class="p-4 flex items-start">
                        <!-- Icon -->
                        <div class="flex-shrink-0">
                            <span v-if="toast.type === 'success'" class="text-green-400 text-xl">✅</span>
                            <span v-else-if="toast.type === 'error'" class="text-red-400 text-xl">❌</span>
                            <span v-else-if="toast.type === 'info'" class="text-blue-400 text-xl">ℹ️</span>
                            <span v-else-if="toast.type === 'warning'" class="text-yellow-400 text-xl">⚠️</span>
                        </div>
                        
                        <!-- Content -->
                        <div class="ml-3 w-0 flex-1 pt-0.5">
                            <p class="text-sm font-medium"
                                :class="{
                                    'text-green-800': toast.type === 'success',
                                    'text-red-800': toast.type === 'error',
                                    'text-blue-800': toast.type === 'info',
                                    'text-yellow-800': toast.type === 'warning'
                                }"
                            >
                                {{ toast.message }}
                            </p>
                        </div>
                        
                        <!-- Close Button -->
                        <div class="ml-4 flex flex-shrink-0">
                            <button 
                                @click="removeToast(toast.id)"
                                class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                ✖
                            </button>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </ClientOnly>
</template>
