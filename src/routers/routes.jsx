import { Route, Routes } from "react-router-dom";
import {
  Home,
  Configuracion,
  ProtectedRoute,
  UserAuth,
  Login,
  useUsuariosStore,
  SpinnerLoader,
  ErrorMolecula,
  useEmpresaStore,
  Marca,
} from "../index";
import { useQuery } from "@tanstack/react-query";

export function MyRoutes() {
  const { user, loading } = UserAuth();                 // 🆕
  const { mostrarUsuarios, idusuario } = useUsuariosStore();
  const { mostrarEmpresa } = useEmpresaStore();

  /* -------- Queries -------- */
  const { data: usuarios, isLoading, error } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: mostrarUsuarios,
    enabled: !!user && !loading,                       // solo si hay user
  });

  const { data: empresa } = useQuery({
    queryKey: ["mostrar empresa"],
    queryFn: () => mostrarEmpresa({ idusuario }),
    enabled: !!usuarios && !!user && !loading,         // idem
  });

  /* -------- Loaders / errores -------- */
  if (loading || isLoading) return <SpinnerLoader />;  // sesión o query
  if (error)        return <ErrorMolecula mensaje={error.message} />;

  /* -------- Rutas -------- */
  return (
    <Routes>
      {/* pública */}
      <Route path="/login" element={<Login />} />

      {/* privadas */}
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion/>} />
        <Route path="/configurar/marca" element={<Marca/>} />
      </Route>
    </Routes>
  );
}
