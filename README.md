Proyecto: Prueba tecnica con Vite, React, TypeScript y Tailwind CSS

Este proyecto es una prueba tecnica de un componente de e-commerce que utiliza Vite como herramienta de construcción, junto con React, TypeScript y Tailwind CSS. Contiene componentes como Home, Checkout, Nav y ProductCard para gestionar y mostrar productos, carritos y compras.

Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (v16 o superior recomendado)

npm o yarn

Instalación del proyecto

1. Clona el repositorio

# Reemplaza <url-del-repositorio> con la URL de tu repositorio

git clone <url-del-repositorio>
cd <nombre-del-repositorio>

2. Instala las dependencias

# Usando npm

npm install

# O usando yarn

yarn install

Estructura del proyecto

src/
├── components/
│ ├── Nav.tsx # Barra de navegación principal
│ ├── ProductCard.tsx # Tarjetas de productos individuales
│
├── pages/
│ ├── Home.tsx # Página de inicio con productos listados
│ ├── Checkout.tsx # Página de resumen del carrito y finalización de compra
│
├── hooks/
│ ├── useCart.ts # Hook para gestionar el estado del carrito
│ ├── useFormatPrice.ts # Hook para formatear precios
│
├── App.tsx # Componente raíz de la aplicación
├── main.tsx # Punto de entrada principal
└── index.css # Estilos globales, incluidos los estilos de Tailwind

Scripts disponibles

Iniciar el servidor de desarrollo

npm run dev
