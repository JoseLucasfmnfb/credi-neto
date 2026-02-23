import { ref } from 'vue'

export const useUserRole = () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const role = ref<string | null>(null)
    const fullName = ref<string | null>(null)
    const loading = ref(false)

    const fetchRole = async () => {
        if (!user.value) return

        const userId = user.value.id || (user.value as any).user?.id || (user.value as any).sub
        if (!userId) return

        loading.value = true

        const { data, error } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', userId)
            .single()

        console.log('[useUserRole] role fetch result:', { data, error })

        if (!error && data) {
            const row = data as any
            role.value = row.role
            fullName.value = row.full_name
        }

        loading.value = false
    }

    return {
        role,
        fullName,
        loading,
        fetchRole
    }
}