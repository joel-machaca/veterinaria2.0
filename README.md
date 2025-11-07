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

- **Frontend:** Angular 15+  
- **Lenguaje:** TypeScript  
- **Estilos:** Tailwind CSS  
- **Control de estado y formularios:** ReactiveForms  
- **Gestión de dependencias:** NPM  
- **Repositorio:** GitHub

---

## 🔹 Arquitectura del proyecto

- `src/app`  
  - `mascotas/` → componentes y servicios relacionados con mascotas  
  - `citas/` → componentes y servicios para la gestión de citas  
  - `shared/` → pipes, directivas y componentes reutilizables  
  - `auth/` → manejo de usuarios y autenticación  
  - `core/models/` → interfaces y modelos de datos  
  - `core/services/` → servicios para consumir y manipular datos  

- Uso de **arquitectura modular**, separación por dominios y componentes reutilizables.

---

## 🔹 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/clinica-veterinaria.git
cd clinica-veterinaria
