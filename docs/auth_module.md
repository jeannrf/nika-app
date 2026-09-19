# Módulo de Autenticación (Auth Module)

## 1. Visión General
El módulo de autenticación gestiona el acceso de los usuarios a través de correo/contraseña y proveedores de inicio de sesión social (Google SSO).

---

## 2. Estado Actual (Frontend UI / Mock)
- **Ruta**: `apps/mobile/app/(auth)/login.tsx`
- **Flujos Implementados**:
  - Pestaña **Ingresar** (Email + Contraseña).
  - Pestaña **Crear Cuenta** (Nombre Completo + Email + Contraseña + Confirmación).
  - Botón de Social Login con Google SSO.
  - Validación local de campos y alternancia fluida de pestañas.

---

## 3. Próximos Pasos (Integración con Backend / BaaS)
1. Conexión de endpoints `/api/v1/auth/login` y `/api/v1/auth/register` (o Supabase / Firebase Auth).
2. Almacenamiento seguro del JWT en `expo-secure-store`.
3. Redirección condicional según estado del usuario (primer login → `(onboarding)` vs usuario recurrente → `(main)`).
