# NIKA — Sistema y Directrices de Diseño (Design System)

> **Filosofía**: *Dark Minimalist + High-Energy Solid Accent*. Interfaz sobria, elegante y sin distracciones, diseñada para el autoconocimiento y el alto rendimiento.

---

## 1. Reglas Inmutables de Diseño

1. **0 Degradados (*Zero Gradients*)**:
   - Todo fondo, superficie, borde y botón debe utilizar **colores sólidos planos**. Los degradados diluyen la seriedad y enfoque ritual de la aplicación.
2. **0 Badges (*Zero Badges*)**:
   - No se utilizan píldoras ni insignias (*badges*) genéricas estilo plantillas de IA. La jerarquía se comunica mediante **tamaño tipográfico, peso, opacidad y espaciado**.
3. **Tipografía Exclusiva — Rethink Sans**:
   - Toda la interfaz utiliza la familia **Rethink Sans** en sus pesos geométricos nativos: `Regular (400)`, `Medium (500)`, `SemiBold (600)`, `Bold (700)` y `ExtraBold (800)`.
4. **Respuesta Táctil / Micro-interacciones**:
   - Todo elemento interactivo (botones, inputs, pestañas) debe tener un feedback inmediato al ser presionado (`activeOpacity={0.85}` / escala sutil), confirmando al usuario que la interfaz responde.

---

## 2. Paleta Cromática Oficial

| Token | Valor Hex | Uso en UI |
|---|---|---|
| `background` | `#0a0a0c` | Fondo base de toda la aplicación (negro ultra-profundo). |
| `surface` | `#111116` | Fondo secundario de vistas o barras de navegación. |
| `surface-card` | `#14141c` | Superficie de tarjetas, modales y contenedores de formularios. |
| `surface-input` | `#0d0d12` | Fondo de campos de entrada de texto. |
| `border-subtle` | `#1f1f2b` (`rgba(255, 255, 255, 0.08)`) | Bordes de tarjetas y separadores discretos. |
| `primary` | `#ff6b00` | Naranja NIKA sólido (Acento principal para CTAs primarios y estados activos). |
| `primary-hover` | `#f97316` | Naranja de interacción / hover. |
| `text-primary` | `#f4f4f6` | Texto principal de alto contraste (Títulos, botones primarios). |
| `text-secondary` | `#9ca3af` | Texto de apoyo, subtítulos y descripciones. |
| `text-muted` | `#6b7280` | Overlines, textos secundarios y micro-copy. |
| `text-placeholder` | `#4b5563` | Placeholders de campos de texto. |

---

## 3. Escala Tipográfica (Rethink Sans)

```text
Overline / Micro:  11px - 12px | SemiBold (600)  | Tracking: 0.15em (uppercase)
Body Small:        13px - 14px | Regular (400)   | Tracking: normal
Body Base:         15px - 16px | Regular / Medium | Tracking: normal
Card Heading:      18px - 20px | SemiBold / Bold | Tracking: -0.01em
Section Title:     24px - 28px | Bold (700)      | Tracking: -0.02em
Hero Display:      32px - 40px | ExtraBold (800) | Tracking: -0.03em
```

---

## 4. Componentes Base y Patrones de Interacción

### 4.1 Botón Primario (CTA Sólido)
- **Fondo**: Sólido `#ff6b00`.
- **Texto**: `#ffffff` en `RethinkSans_700Bold` (Tracking amplio / mayúsculas limpias).
- **Radio de Borde**: `rounded-2xl` (16px) o `rounded-xl` (12px).
- **Feedback**: Opacidad al 85% al presionar. Cero sombras difusas o sombras de colores ajenos.

### 4.2 Botón Secundario / Social (Google)
- **Fondo**: Sólido `#14141c` con borde `border-white/10`.
- **Texto**: `#ffffff` en `RethinkSans_600SemiBold`.
- **Iconografía**: SVG auténtico y minimalista.

### 4.3 Campos de Entrada (Inputs)
- **Fondo**: `#0d0d12`.
- **Borde en reposo**: `border-white/10`.
- **Borde en foco**: `border-[#ff6b00]`.
- **Texto**: `#f4f4f6` en `RethinkSans_400Regular`.
- **Label superior**: `#9ca3af` en `RethinkSans_500Medium`.

### 4.4 Pestañas y Switchers (Tabs)
- Separación limpia con borde inferior de 2px en el elemento activo (`border-[#ff6b00]`).
- Texto inactivo en `#6b7280`, texto activo en `#ffffff` con `RethinkSans_600SemiBold`.

---

## 5. Tono de Copy y Micro-copys de Marca

- **Encabezado de Bienvenida**: `"Bienvenido a Nika"`
- **Mensaje de Propósito**: `"Tu espacio personal para cultivar hábitos, reflexionar y vivir con claridad."`
- **Voz del producto**: Directa, reflexiva, humana y libre de lenguaje corporativo aburrido o imperativo forzado.
