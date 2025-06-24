import { create } from "zustand";
import { InsertarUsuarios,supabase } from "../index";

export const useUsuariosStore = create((set, get) => ({
    InsertarUsuarioAdmin: async (p) => {
        const {data,error} = await supabase.auth.SingUp({
            email: p.correo,
            password: p.pass
        });
        console.log("data del registro del user auth", data);
        if(error) return;
        const datauser = await InsertarUsuarios({
            idauth:data.user.id,
            fecharegistro:new Date(),
            tipouser:"admin",
        });
        return datauser;
    },

})); 