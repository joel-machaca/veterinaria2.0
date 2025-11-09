# Aplicación Web Clínica Veterinaria

Este proyecto es una **aplicación web desarrollada en Angular** para digitalizar el proceso de atención de una clínica veterinaria. Permite registrar mascotas, agendar citas, consultar el historial de atención y gestionar el estado de las mismas de forma intuitiva y escalable.

---

## 🔹 Funcionalidades

1. **Registro de mascotas y dueños**  
   - Formularios validados con ReactiveForms.  
   - Captura de información como nombre, especie, sexo, fecha de nacimiento y notas.

2. **Agenda de citas**  
   - Visualización de citas en lista o calendario.  
   - Registro de nuevas citas, asignación de hora y estado (pendiente, completada, cancelada).  
   - Citas próximas resaltadas mediante directivas personalizadas.

3. **Historial de atención por mascota**  
   - Consulta rápida de todas las citas pasadas de cada mascota.  
   - Información completa sobre fecha, servicio y detalle de la atención.

4. **Pipes personalizados**  
   - `appFechaFormato`: formatea fechas a `día / mes / año`.  
   - `edad`: calcula la edad de cada mascota en años.  

5. **Directivas personalizadas**  
   - Resaltan citas próximas, cambian colores según estado, mejorando la experiencia del usuario.

6. **Diseño responsivo y moderno**  
   - Utiliza Tailwind CSS para estilos.  
   - Compatible con dispositivos móviles y escritorio.  

---

## 🔹 Tecnologías


**Frontend**
- Angular 17+ (v20)
- TypeScript
- Tailwind CSS
- ReactiveForms
- NPM

**Backend**

- Spring Boot 3+

- Java 17+

- Maven

- PostgreSQL
---


## 🔹 Instalación

1. Clonar el repositorio Frontend y backend:

** FRONTEND **
```bash
git clone https://github.com/joel-machaca/veterinaria2.0.git
cd veterinaria2.0
```
** BACKEND **
```bash
git clone https://github.com/joel-machaca/backend-veterinaria.git
cd backend-veterinaria
```

2. Backend — Spring Boot
📦 Requisitos previos

- Java 17 o superior

- Maven 3.8+

Base de datos (opcional, si tu proyecto usa H2, no se necesita instalación)

2.Crear una base de datos en PostgreSQL
```bash
CREATE DATABASE veterinaria;
```
3. En el archivo aplication.properties, configura tu conexion
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/veterinaria
spring.datasource.username=postgres
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.port=8080
```
4. ejecuta el backend (la creacion de las tablas son automaticas)

5. Frontend — Angular
📦 Requisitos previos

- Node.js 18+

- Angular CLI (npm install -g @angular/cli)

**pasos a ejecutar**

```bash
cd frontend
npm install
ng serve
```
