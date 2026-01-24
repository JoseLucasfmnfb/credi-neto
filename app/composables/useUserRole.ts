import { ref } from 'vue'

export const useUserRole = () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const role = ref<string | null>(null)
    const loading = ref(false)

    const fetchRole = async () => {
        if (!user.value) return

        loading.value = true

        const { data, error } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', user.value.id)
            .single()

        if (!error && data) {
            role.value = data.role
        }

        loading.value = false
    }

    return {
        role,
        loading,
        fetchRole
    }
}