export default defineNuxtRouteMiddleware(async (to) => {
    const supabase = useSupabaseClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    // 🔒 Não logado → volta para login
    if (!user) {
        return navigateTo('/')
    }

    // 🔐 Rotas administrativas (prefixo /admin)
    if (to.path.startsWith('/admin')) {
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (error || !data) {
            return navigateTo('/home')
        }

        const role = data.role

        // Apenas funcionario, admin e super_admin entram em /admin/*
        if (!['funcionario', 'admin', 'super_admin'].includes(role)) {
            return navigateTo('/home')
        }
    }
})
