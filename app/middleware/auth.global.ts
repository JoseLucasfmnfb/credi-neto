export default defineNuxtRouteMiddleware(async (to) => {
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    // Rotas públicas
    const publicRoutes = ['/', '/register', '/confirm']

    if (!user.value && !publicRoutes.includes(to.path)) {
        return navigateTo('/')
    }

    if (user.value) {
        const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.value.id)
            .single()

        const role = data?.role

        // Proteção de rotas admin
        if (to.path.startsWith('/admin')) {
            if (!['super_admin', 'admin', 'funcionario'].includes(role)) {
                return navigateTo('/home')
            }
        }

        // Proteção de rotas exclusivas de admin
        if (to.path.startsWith('/roles')) {
            if (!['super_admin', 'admin'].includes(role)) {
                return navigateTo('/home')
            }
        }
    }
})