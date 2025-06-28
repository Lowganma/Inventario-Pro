import { create } from 'zustand';
import { supabase } from "../index";

export const useAuthStore = create((set, get) => ({
  signInWithEmail: async (p) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.correo,
      password: p.pass,
    });

    if (error) {
      return null;
    }

    return data.user;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      throw new Error("Ocurrió un error durante el cierre de sesión: " + error.message);
    }
  },
}));
