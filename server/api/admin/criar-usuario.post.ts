import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)


    const { fullName, email, password, role } = body


    if (!fullName || !email || !password || !role) {
        throw createError({ statusCode: 400, statusMessage: 'Dados inválidos' })
    }


    // Recupera perfil e dependências com a validação do header já resolvida.
    const { role: creatorRole, client } = await requireUserRole(event)

    // Regras de negócio de permissão
    if (creatorRole === 'funcionario' && role !== 'cliente') {
        throw createError({ statusCode: 403, statusMessage: 'Funcionário só pode criar clientes' })
    }


    if (creatorRole === 'admin' && role === 'super_admin') {
        throw createError({ statusCode: 403, statusMessage: 'Admin não pode criar super admin' })
    }


    // Criar usuário no Auth
    const { data: newUser, error: createErrorAuth } = await client.auth.admin.createUser({
        email,
        password,
        email_confirm: true
    })


    if (createErrorAuth || !newUser.user) {
        throw createError({ statusCode: 500, statusMessage: 'Erro ao criar usuário no Auth' })
    }


    const newUserId = newUser.user.id


    // Criar profile
    const { error: profileError } = await client
        .from('profiles')
        .insert({
            id: newUserId,
            email,
            full_name: fullName,
            role
        })


    if (profileError) {
        throw createError({ statusCode: 500, statusMessage: 'Erro ao criar perfil' })
    }


    // Criar conta de crédito
    const { error: creditError } = await client
        .from('credit_accounts')
        .insert({
            user_id: newUserId,
            balance: 0
        })


    if (creditError) {
        throw createError({ statusCode: 500, statusMessage: 'Erro ao criar conta de crédito' })
    }


    return {
        success: true
    }
})