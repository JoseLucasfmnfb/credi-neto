import { ref } from 'vue';
import { a as useSupabaseClient, b as useSupabaseUser } from './server.mjs';

const useUserRole = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const role = ref(null);
  const fullName = ref(null);
  const loading = ref(false);
  const fetchRole = async () => {
    if (!user.value) return;
    const userId = user.value.id || user.value.user?.id || user.value.sub;
    if (!userId) return;
    loading.value = true;
    const { data, error } = await supabase.from("profiles").select("role, full_name").eq("id", userId).single();
    console.log("[useUserRole] role fetch result:", { data, error });
    if (!error && data) {
      const row = data;
      role.value = row.role;
      fullName.value = row.full_name;
    }
    loading.value = false;
  };
  return {
    role,
    fullName,
    loading,
    fetchRole
  };
};

export { useUserRole as u };
//# sourceMappingURL=useUserRole-CKEAOnSG.mjs.map
