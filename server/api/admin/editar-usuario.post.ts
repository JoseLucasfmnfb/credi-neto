import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { userId, fullName, role } = body

    if (!userId || !fullName || !role) {
        throw createError({ statusCode: 400, statusMessage: 'Dados inválidos' })
    }

    // Valida autenticação e extrai o cliente com Service Role key (ignora RLS)
    const { role: creatorRole, client } = await requireUserRole(event)

    // Regras de negócio de permissão
    if (
        creatorRole === 'funcionario' &&
        (role === 'admin' || role === 'super_admin')
    ) {
        throw createError({ statusCode: 403, statusMessage: 'Você não tem permissão para promover usuários a Admin ou Super Admin' })
    }

    // Atualiza Profile (Service Role Key ignora o RLS silencioso)
    const { error: profileError } = await client
        .from('profiles')
        .update({
            full_name: fullName,
            role: role
        })
        .eq('id', userId)

    if (profileError) {
        console.error('Supabase Update Error:', profileError)
        throw createError({ statusCode: 500, statusMessage: 'Erro ao atualizar o perfil do usuário' })
    }

    return {
        success: true
    }
})
