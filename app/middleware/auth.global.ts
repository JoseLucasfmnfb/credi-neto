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
        // Obter os metadados do user para evitar chamadas de banco no middleware frontend
        // Se a Role não estiver nos metadados da sessão, o backend (Server Routes)
        // é quem de fato bloqueará as inserções/deletes usando requireUserRole()

        // Allowed to navigate UI
        return
    }
})
