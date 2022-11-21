# teacherAPP_Back
FTM en el Máster en Full Stack Developer de la UNIR (parte de Back). eebApp para la gestión y localización de profesores de clases particulares categorizados.

Este proyecto se ha generado con [Express](https://github.com/expressjs/express) version 4.16.1.

## Implementación en el servidor

Deberá crear el fichero .env en la carpeta donde coloque el proyecto. Este fichero tiene las entradas:

| Entrada del fichero | Descripción |
| --- | --- |
| PORT=3000 | Puerto donde escuchará el servidor (esta entrada es opcional - valor por defecto 3000 -) |
| DB_HOST="db_host" | Host donde está la base de datos |
| DB_USER="db_user" | Usuario de conexión a la base de datos |
| DB_PASSWORD="db_password" | Clave del usuario para conectar a la base de datos |
| DB_PORT=3306 | Puerto en el que escucha el servidor de base de datos |
| DB_DATABASE="db_name" | Nombre de la base de datos |
| DEFAULT_ADMIN_NOMBRE_COMPLETO="Nombre completo administrador" | Si no hay administradores, al arrancar se crea uno con este nombre completo |
| DEFAULT_ADMIN_USERNAME="admin" | Si no hay administradores, al arrancar se crea uno con este nombre de usuario |
| DEFAULT_ADMIN_EMAIL="admin@gmail.com" | Si no hay administradores, al arrancar se crea uno con este correo electrónico |
| DEFAULT_ADMIN_PASSWORD="123456" | Si no hay administradores, al arrancar se crea uno con esta clave |
| TOKEN_SECRET_KEY="aADfji34%$jPm34DdM" | Clave utilizada para la generación de los JWT |
| TOKEN_EXPIRATION_HOURS=5 | Horas que tardan en expirar los JWT generados |
| EMAIL_ENABLED=0 | Indica si se realizará el envío de correos electronicos (0 no, 1 sí). |
| EMAIL_USER="proyecto.tfm.unir.grupo.c@gmail.com" | Usuario utilizado par el envío de emails |
| EMAIL_REFRESH_TOKEN="XXXX-XXXXX" | Token inicialmente asignado (OAuth2 google) |
| EMAIL_CLIENT_ID="XXXX-XXXX" | Client ID (OAuth2 google) |
| EMAIL_CLIENT_SECRET="XXXX-XXXX" | Client Secret (OAuth2 google) |
| EMAIL_PENDIENTES_INTERVAL=60 | Cada EMAIL_PENDIENTES_INTERVAL segundos, se reintenta el envío de emails pendientes (aquellos que no se pudieron enviar cuando se generaron) |

Ejecute `npm install` para cargar las dependencias del proyecto. Ejecute `npm start` para arrancar el servidor. Una vez arrancado el servidor, puede consultar la documentación del API en http://localhost:3000/api-docs/.

Junto al código fuente, tiene el fichero Dump.sql con una copia de la base de datos con la que empezar a probar.
