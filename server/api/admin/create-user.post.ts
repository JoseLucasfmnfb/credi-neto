import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = serverSupabaseServiceRole(event)

    const { data, error } = await client.auth.admin.createUser({
        email: body.email,
        password: body.password,
        user_metadata: { full_name: body.full_name },
        email_confirm: true
    })

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        })
    }

    // Also create profile entry if trigger doesn't catch it (Trigger catches 'insert on auth.users', so it should work)
    // But wait, trigger handles it.

    return { success: true }
})
