🛍️ Priotti Concept - Backend

Backend para e-commerce de indumentaria femenina, desarrollado con Node.js, Express y MongoDB.
Incluye autenticación con JWT, gestión de usuarios, productos, carritos de compra, pagos con MercadoPago, tickets y estadísticas para administrador.

🚀 Tecnologías principales

Node.js + Express

MongoDB + Mongoose

Passport (Local & JWT)

Zod (validaciones)

Multer (subida de imágenes)

Nodemailer (emails)

MercadoPago SDK

Winston (logger)

📂 Estructura del proyecto
src/
├── app.js # Punto de entrada
├── config/ # Configuraciones (Mongo, Passport, envs)
├── controller/ # Lógica de negocio
├── middlewares/ # Middlewares de auth, validaciones, etc.
├── models/ # Modelos de Mongoose
├── routes/ # Rutas agrupadas por recurso
├── schemas/ # Esquemas de validación (Zod)
├── utils/ # Logger, helpers, etc.
└── public/ # Archivos estáticos

⚙️ Instalación y ejecución

1. Clonar repositorio
   git clone https://github.com/EricBayona/Priotti-Concept.git
   cd Priotti-Concept

2. Instalar dependencias
   npm install

3. Variables de entorno

Crear un archivo .env en la raíz con las siguientes claves mínimas:

PORT=8080
MONGO_URL=mongodb://localhost:27017/priotti-concept
SESSION_SECRET=secret
JWT_SECRET=tu_secreto_jwt
MP_ACCESS_TOKEN=tu_token_mercadopago
MAIL_USER=tu_email
MAIL_PASS=tu_password

4. Ejecutar en desarrollo
   npm run dev

5. Ejecutar en producción
   npm start

📌 Endpoints principales
🔑 Autenticación (/api/auth)

POST /register → Registrar usuario

POST /login → Iniciar sesión

GET /current → Usuario autenticado (JWT)

GET /logout → Cerrar sesión

POST /forgot-password → Recuperar contraseña

POST /reset-password/:token → Resetear contraseña

👤 Usuarios (/api/users)

CRUD de usuarios (solo admin)

🛒 Carritos (/api/carts)

GET /mycart → Ver carrito del usuario

POST /:cid/product/:pid → Agregar producto

PUT /:cid/product/:pid → Actualizar cantidad

DELETE /:cid/product/:pid → Eliminar producto

POST /:cid/purchase → Finalizar compra

📦 Productos (/api/products)

GET / → Listar productos (público o con auth según config)

GET /:pid → Ver detalle de producto

CRUD completo (admin)

💳 Pagos (/api/payment)

POST /:cid → Crear pago en MercadoPago

🎫 Tickets (/api/tickets)

GET /my → Ver tickets del usuario

GET /:tid → Ver ticket por ID

📊 Estadísticas (/api/stats)

Solo admin

🧪 Testing

El proyecto incluye configuración con Mocha y Chai.
Ejecutar tests con:

npm test

📄 Licencia

Este proyecto está bajo la licencia Unlicense.
