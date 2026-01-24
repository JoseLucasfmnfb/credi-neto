<script setup lang="ts">
import { onMounted } from 'vue'

console.log('Página /test carregou (setup)')

const supabase = useSupabaseClient()

onMounted(async () => {
  console.log('onMounted executou no cliente')

  const { data, error } = await supabase.auth.getUser()

  console.log('Resultado getUser:', data, error)
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-xl font-bold">Teste Supabase</h1>
    <p>Abra o console do navegador</p>
  </div>
</template>
