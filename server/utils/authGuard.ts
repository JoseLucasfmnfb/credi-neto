import { serverSupabaseServiceRole } from '#supabase/server'
import { getHeader, createError, type H3Event } from 'h3'

export async function requireUserRole(event: H3Event, allowedRoles?: string[]) {
    const client = await serverSupabaseServiceRole(event)
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader) {
        throw createError({ statusCode: 401, statusMessage: 'Não autenticado' })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: userData, error: userError } = await client.auth.getUser(token)

    if (userError || !userData.user) {
        throw createError({ statusCode: 401, statusMessage: 'Usuário logado inválido ou token expirado' })
    }

    const userId = userData.user.id

    const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

    if (profileError || !profile) {
        throw createError({ statusCode: 403, statusMessage: 'Sem permissão (perfil não encontrado)' })
    }

    const role = profile.role

    if (allowedRoles && !allowedRoles.includes(role)) {
        throw createError({ statusCode: 403, statusMessage: 'Cargo insuficiente para realizar esta ação' })
    }

    return { user: userData.user, role, client }
}
