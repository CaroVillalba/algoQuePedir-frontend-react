# Algoritmos III - Trabajo Práctico 2025 - Frontend (React)

## Descripción del proyecto

Este proyecto es el frontend del TP **"Algo Que Pedir"** de la materia Algoritmos III (2025), desarrollado en **React con TypeScript** y pensado exclusivamente para una **vista mobile**. Consume la API REST del backend desarrollado en Spring Boot con Kotlin.

La aplicación se conecta al backend mediante solicitudes HTTP con Axios, gestiona datos dinámicos y muestra la información con componentes de **PrimeReact**, logrando una interfaz consistente.
## Funcionalidades

### Registro e inicio de sesión de usuarios

<p align="center">
  <img width="200" alt="Registro e inicio de sesión" src="https://github.com/user-attachments/assets/a20a85b5-cedc-4127-b228-49aa435de8f8" />
</p>

### Visualización de los restaurantes y realización de pedidos

<p align="center">
  <img width="200" alt="Listado de restaurantes" src="https://github.com/user-attachments/assets/86c456f4-f2c8-40cf-96c3-d7be94bf6b37" />
  <img width="200" alt="Detalle del restaurante" src="https://github.com/user-attachments/assets/b48821ec-c9f2-436f-9694-b56eb7e1297e" />
  <img width="200" alt="Realización del pedido" src="https://github.com/user-attachments/assets/8b995eef-4740-4988-97e4-0e933bb5249f" />
</p>

### Gestión de pedidos

<p align="center">
  <img width="200" alt="Gestión de pedidos" src="https://github.com/user-attachments/assets/6aef317d-e501-4da2-bfaa-d544ecc1b582" />
</p>

### Calificación del restaurante al recibir el pedido

<p align="center">
  <img width="200" alt="Calificación del restaurante" src="https://github.com/user-attachments/assets/cf14f303-f829-47f5-93d6-e12ff0ac10e2" />
  <img width="200" alt="Confirmación de la calificación" src="https://github.com/user-attachments/assets/0d2d2043-6f7b-47ed-9e1d-e4d5f5b71bfb" />
</p>

### Edición del perfil de usuario

<p align="center">
  <img width="200" alt="Edición del perfil" src="https://github.com/user-attachments/assets/b2ce92d0-6b8a-4ad9-8a3d-a4726dcf023f" />
</p>

### Modificación de preferencias

Restaurantes e ingredientes favoritos y a evitar.

<p align="center">
  <img width="200" alt="Preferencias de restaurantes" src="https://github.com/user-attachments/assets/cd3c0eb6-4c25-46a2-8e74-165aeefa825b" />
  <img width="200" alt="Preferencias de ingredientes" src="https://github.com/user-attachments/assets/f976c344-7a83-4509-bb99-310a99af158c" />
</p>

Incluye manejo de errores, estados de carga, tipado de las respuestas de la API y pruebas automatizadas.

## Tecnologías utilizadas

* React 19
* TypeScript
* Vite
* PrimeReact, PrimeFlex y PrimeIcons
* React Router
* Axios
* Vitest y Testing Library (testing)

Backend: Spring Boot + Kotlin (API REST). Repositorio: `<https://github.com/CaroVillalba/algoQuePedir-backend>`

## Estructura del proyecto

* `src/components` → Componentes de UI reutilizables (`Header`, `Footer`) y subcarpeta `common` con componentes compartidos
* `src/hooks` → Custom hooks de la aplicación
* `src/main` → Pantallas y vistas principales de la aplicación
* `src/services` → Llamadas HTTP al backend (Axios)
* `src/types` → Modelos y tipos de las respuestas de la API
* `src/utils` → Funciones utilitarias
* `src/App.tsx` → Componente raíz y configuración de rutas
* `src/main.tsx` → Punto de entrada de la aplicación
* `src/index.css`, `src/App.css`, `src/toast.css` → Estilos globales y de notificaciones


## Requisitos

* Node.js 20 o superior
* npm
* Backend del TP corriendo localmente (ver su README)

## Endpoints consumidos

**Autenticación**

* `POST /v1/auth/register` → Crear un usuario
* `GET /v1/auth/login` → Loguear usuario

**Local**

* `GET /v1/local/{id}` → Obtener info del local
* `PUT /v1/local/{id}` → Actualizar info del local

**Ingredientes**

* `GET /v1/ingredients` → Listar todos los ingredientes

**Platos**

* `GET /v1/dishes` → Listar todos los platos
* `GET /v1/dishes/{id}` → Obtener un plato


**Pedidos (Orders)**

* `GET /v1/order` → Listar pedidos por estado o todos
* `GET /v1/order/orderDetail/{orderId}` → Obtener detalle de un pedido



## Cómo correr el proyecto

1. Clonar el repositorio
2. Instalar dependencias:

```
npm install
```

3. Levantar el backend (ver README del backend) y configurar la URL de la API: `<https://github.com/CaroVillalba/algoQuePedir-backend>`
4. Ejecutar en modo desarrollo:

```
npm run dev
```

5. Abrir la URL que indica Vite (por defecto `http://localhost:5173`) y activar la vista de dispositivo móvil desde las DevTools, o acceder desde un celular en la misma red.

## Testing

* Tests de componentes y lógica con **Vitest** y **Testing Library**
* Se ejecutan con:

```
npm run test
```

* El reporte de cobertura (V8) se genera con:

```
npm run coverage
```

## Aprendizajes

Este proyecto permitió:

* Desarrollar una aplicación mobile usando React y TypeScript
* Integrar componentes avanzados con PrimeReact
* Conectar un frontend con servicios backend reales
* Manejar estados de carga, errores y ciclos de vida en React
* Escribir tests con Vitest y Testing Library
* Tipar respuestas de APIs y compartir modelos
* Trabajar con arquitectura modular y reutilización de componentes

## Equipo de trabajo

* Lucía Arrieta
* Valentino Salguero
* Elias Serantes
* Carolina Villalba
* Ulises Zagare
