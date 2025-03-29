# Usa una imagen de nginx como base
FROM nginx:latest

# Copia los archivos del frontend al contenedor
COPY . /usr/share/nginx/html

# Expone el puerto en el que corre nginx
EXPOSE 80
