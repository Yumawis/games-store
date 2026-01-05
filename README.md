# 🎮 Games Store

Aplicación web full-stack para la gestión de una tienda de videojuegos, donde se pueden registrar videojuegos con información como nombre, fecha de creación, categoría e imagen.
El frontend cuenta con un botón que redirige a una página que muestra todos los videojuegos en formato de tarjetas (cards), donde se visualizan el nombre, la imagen, la categoría y la fecha de creación de cada videojuego y un modal para registrar un nuevo videojuego.

---

## ⚙️ Tecnologías utilizadas

**Frontend:**
- ⚛️ React.js
- ⚡ Vite.js
- 💅 Styled Components / Material UI
- 🧩 Formik (para formularios)

**Backend:**
- 🧪 Node.js
- 🚀 Express.js
- 🧪 Mongoose (para MongoDB)
- 🔄 Cors
- 🟢 Nodemon

---

## 🚀 Instalación y ejecución

### 1️⃣ Clona el repositorio
```bash
git clone https://github.com/Yumawis/games-store.git
cd games-store
```

### 2️⃣ Instala las dependencias
Instala las del **frontend** y **backend** por separado:
```bash
cd frontend
pnpm install

cd ../backend
pnpm install
```

### 3️⃣ Ejecuta el backend
```bash
pnpm dev
```
Esto levantará el servidor Express en el puerto configurado (por defecto 4000).

### 4️⃣ Ejecuta el frontend
```bash
cd ../frontend
pnpm run dev
```
Esto iniciará la aplicación React.js ( en `http://localhost:3000`).

---

## 🧩 Ejemplo de uso

1. El usuario ingresa a la aplicación.
2. No es necesario autenticarse para ver el listado de los juegos registrados.
3. Luego de ingresar se verá una pantalla que muestra las cardas de los juegos registrados.  
4. Cada card muestra la información de los juegos como lo es su nombre, fecha de creación, categoría e imagen.
5. Para registrar un nuevo juego, desde la pagina principal hacer click en el botón de agregar juego, este abrirá un modal.
6. Completa el formulario con nombre, fecha de creación, categoría e imagen y al guardar quedará registrado en el sistema.

---

## 🧑‍💻 Autor

**Yury Martinez**  
Fullstack & UI Designer  
📍 Colombia  
💼 [GitHub](https://github.com/Yumawis) 
