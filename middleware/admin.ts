export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useSupabaseUser()
    const client = useSupabaseClient()

    if (!user.value) {
        return navigateTo('/')
    }

    const { data: profile } = await client.from('profiles').select('role').eq('id', user.value.id).single()

    if (!profile || (profile.role !== 'admin' && profile.role !== 'superadmin')) {
        return navigateTo('/dashboard')
    }
})
