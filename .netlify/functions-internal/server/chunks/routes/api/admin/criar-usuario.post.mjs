import { d as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { r as requireUserRole } from '../../../_/authGuard.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@supabase/functions-js';
import '@supabase/postgrest-js';
import '@supabase/realtime-js';
import '@supabase/storage-js';
import '@supabase/auth-js';

const criarUsuario_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { fullName, email, password, role } = body;
  if (!fullName || !email || !password || !role) {
    throw createError({ statusCode: 400, statusMessage: "Dados inv\xE1lidos" });
  }
  const { role: creatorRole, client } = await requireUserRole(event);
  if (creatorRole === "funcionario" && role !== "cliente") {
    throw createError({ statusCode: 403, statusMessage: "Funcion\xE1rio s\xF3 pode criar clientes" });
  }
  if (creatorRole === "admin" && role === "super_admin") {
    throw createError({ statusCode: 403, statusMessage: "Admin n\xE3o pode criar super admin" });
  }
  const { data: newUser, error: createErrorAuth } = await client.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });
  if (createErrorAuth || !(newUser == null ? void 0 : newUser.user)) {
    console.error("Supabase Auth Error:", createErrorAuth);
    throw createError({
      statusCode: 400,
      statusMessage: (createErrorAuth == null ? void 0 : createErrorAuth.message) || "Erro desconhecido ao criar usu\xE1rio no Auth"
    });
  }
  const newUserId = newUser.user.id;
  const { error: profileError } = await client.from("profiles").insert({
    id: newUserId,
    email,
    full_name: fullName,
    role
  });
  if (profileError) {
    throw createError({ statusCode: 500, statusMessage: "Erro ao criar perfil" });
  }
  const { error: creditError } = await client.from("credit_accounts").insert({
    user_id: newUserId,
    balance: 0
  });
  if (creditError) {
    throw createError({ statusCode: 500, statusMessage: "Erro ao criar conta de cr\xE9dito" });
  }
  return {
    success: true
  };
});

export { criarUsuario_post as default };
//# sourceMappingURL=criar-usuario.post.mjs.map
