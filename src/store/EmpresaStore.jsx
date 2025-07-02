import { create } from "zustand";
import { ContarUsuariosXempresa, MostrarEmpresa, supabase } from "../index";

export const useEmpresaStore = create((set, get) => ({
  contadorusuario:0,
  dataempresa:[],
  mostrarEmpresa: async(p)=>{
    const response = await MostrarEmpresa(p);
    set({dataempresa:response});
    return response;
  },
  ContarUsuariosXempresa: async(p)=> {
    const response = await ContarUsuariosXempresa(p);
    set({contadorusuario:response});
    return response;
  }
}));
