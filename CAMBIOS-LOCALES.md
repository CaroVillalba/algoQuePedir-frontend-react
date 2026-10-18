# Cambios locales conflictivos (2026-10-18)

## Por qué existe esta rama
`Development` local tenía cambios sin commitear y estaba 202 commits atrás de `origin/Development`.
Al hacer pull, los cambios locales entraron en conflicto con el remoto en:
- `src/App.css`
- `src/App.tsx`
- `src/components/Footer.css`
- `src/components/Header.tsx`
- `src/main/pages/ProfileView/ProfileView.tsx`
- `src/main/pages/RestaurantMenuView/RestaurantMenuView.tsx`

Para no perderlos ni pisar el remoto, se guardaron acá y `Development` local quedó igual a `origin/Development`.

## Base
Rama creada desde `b56d6b5` (commit local de `Development` antes del pull), así los cambios aplican sin conflicto.

## Qué contiene
Trabajo en progreso de layout/UI:
- `App.css` / `App.tsx`: layout con clase `.app`, `main` con min-height, back button en Perfil, logs de debug de rutas.
- `Footer.css`, `Header.tsx`: ajustes de estilo/estructura.
- `ProfileView.tsx`: cambios grandes en la vista de perfil.
- `RestaurantMenuView.tsx`, `services/CRUDService.ts`: cambios menores.

## Qué hacer
Comparar con `Development` actual; rescatar lo que sirva (ojo: hay `console.log` de debug en `App.tsx`). Si ya no aplica, borrar la rama.
