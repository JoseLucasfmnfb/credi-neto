import { r as requireUserRole } from '../../../_/authGuard.mjs';
import { d as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import '@supabase/functions-js';
import '@supabase/postgrest-js';
import '@supabase/realtime-js';
import '@supabase/storage-js';
import '@supabase/auth-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const editarUsuario_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, fullName, role } = body;
  if (!userId || !fullName || !role) {
    throw createError({ statusCode: 400, statusMessage: "Dados inv\xE1lidos" });
  }
  const { role: creatorRole, client } = await requireUserRole(event);
  if (creatorRole === "funcionario" && (role === "admin" || role === "super_admin")) {
    throw createError({ statusCode: 403, statusMessage: "Voc\xEA n\xE3o tem permiss\xE3o para promover usu\xE1rios a Admin ou Super Admin" });
  }
  const { error: profileError } = await client.from("profiles").update({
    full_name: fullName,
    role
  }).eq("id", userId);
  if (profileError) {
    console.error("Supabase Update Error:", profileError);
    throw createError({ statusCode: 500, statusMessage: "Erro ao atualizar o perfil do usu\xE1rio" });
  }
  return {
    success: true
  };
});

export { editarUsuario_post as default };
//# sourceMappingURL=editar-usuario.post.mjs.map
