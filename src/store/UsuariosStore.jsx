import { create } from "zustand";
import { InsertarUsuarios, supabase } from "../index";

export const useUsuariosStore = create((set, get) => ({
  InsertarUsuarioAdmin: async (p) => {
    // Validación básica
    if (!p.correo || !p.pass) {
      return { ok: false, error: "Correo y contraseña son obligatorios" };
    }

    // Registrar en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.pass,
    });

    console.log("📩 data del registro del user auth", data);

    if (error) {
      console.error("❌ Error al registrar usuario:", error.message);
      return { ok: false, error: error.message };
    }

    if (!data.user) {
      return { ok: false, error: "Usuario no creado" };
    }

    if (!data.session) {
      return {
        ok: false,
        error: "No hay sesión activa. Inicia sesión para completar el registro.",
      };
    }

    // Insertar en tabla 'usuarios'
    const insert = await InsertarUsuarios({
      idauth: data.user.id,
      fecharegistro: new Date(),
      tipouser: "admin",
      correo: data.user.email,
    });

    if (insert.error) {
      console.error("❌ Error al insertar usuario:", insert.error.message);
      return { ok: false, error: insert.error.message };
    }

    return { ok: true, data: insert.data };
  },
}));
