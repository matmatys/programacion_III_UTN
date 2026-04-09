# Step 1 - Demo conceptual de estado + `*ngIf` + `*ngFor`

## Espanol

### Objetivo
Entender que la UI depende del estado y que Angular renderiza listas/condiciones usando directivas estructurales.

### Proyecto a usar
- `./state-concept-demo`

### Que mostrar
- Crear conversacion con `title` y `text` desde estado local.
- Variable de estado booleana (`showArchived`).
- `*ngFor` para renderizar conversaciones.
- Boton `archive/unarchive` por conversacion para cambiar estado.
- `*ngIf` para mostrar lista o estado vacio.

### Validacion
Al cambiar el estado, la UI se actualiza sin tocar el HTML manualmente.
