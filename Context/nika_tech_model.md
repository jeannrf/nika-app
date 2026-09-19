# NIKA — Especificación Técnica y Arquitectura de Arranque
### Documento Oficial para el Equipo de Desarrollo

**Alcance:** Stack tecnológico oficial, modelado de datos, backend (FastAPI + Celery), frontend/mobile unificado (React Native + Expo SDK + NativeWind), almacenamiento BLOB (R2/S3), orquestación de IA (OpenAI / Anthropic), DevOps y ciberseguridad.  
**No incluye:** Modelo de negocio, pricing ni propuesta de valor comercial (ver [nika_business_model.md](file:///home/jean/Desktop/UNI/Proyectos/nika-app/Context/nika_business_model.md)).

---

## Índice

1. [Stack Tecnológico Oficial](#1-stack-tecnológico-oficial)
2. [Modelado de Datos y Persistencia](#2-modelado-de-datos-y-persistencia)
3. [Arquitectura General y Distribución del Repositorio](#3-arquitectura-general-y-distribución-del-repositorio)
4. [Backend API y Procesamiento Asíncrono](#4-backend-api-y-procesamiento-asíncrono)
5. [Frontend y Mobile (React Native + Expo)](#5-frontend-y-mobile-react-native--expo)
6. [Almacenamiento BLOB y Manejo de Multimedia](#6-almacenamiento-blob-y-manejo-de-multimedia)
7. [Gateway de IA y Control de Costos](#7-gateway-de-ia-y-control-de-costos)
8. [DevOps y CI/CD](#8-devops-y-cicd)
9. [Ciberseguridad y Protección de Datos](#9-ciberseguridad-y-protección-de-datos)
10. [Checklist de Arranque Técnico](#10-checklist-de-arranque-técnico)

---

## 1. Stack Tecnológico Oficial

A continuación se detalla la selección oficial de tecnologías para la construcción del ecosistema NIKA, optimizada para rendimiento, escalabilidad y mínima duplicación de código:

| Capa / Componente | Tecnología Seleccionada | Justificación Técnica |
|---|---|---|
| **Frontend / Mobile** | **React Native + Expo SDK** (TypeScript) | Base de código única para Android, iOS y Web centrada. Cero código duplicado. |
| **Estilos UI** | **NativeWind** (Tailwind CSS) | Tokens consistentes de diseño oscuro con acentos naranja. |
| **Consumo de API** | **TanStack Query** (React Query) | Manejo de Server State, caché y polling asíncrono para reportes de IA. |
| **Backend API** | **FastAPI** (Python 3.11+) | Rendimiento asíncrono (ASGI), tipado estricto con Pydantic y documentación OpenAPI automática. |
| **Worker / Colas** | **Celery + Redis** | Procesamiento fuera del ciclo HTTP para transcripción de audio (Whisper) y llamadas a LLMs. |
| **Base de Datos** | **PostgreSQL 16 + pgvector** | Motor relacional ACID con soporte vectorial nativo para embeddings y búsqueda semántica (RAG). |
| **ORM / Migraciones** | **SQLAlchemy 2.0 + Alembic** | Mapeo relacional desacoplado y migraciones de esquema versionadas. |
| **Almacenamiento BLOB** | **Cloudflare R2 / AWS S3** | Almacenamiento seguro de archivos de audio crudo (`.m4a` / `.mp3`) mediante URLs prefirmadas. |
| **Gateway de IA** | **OpenAI SDK / Anthropic SDK** | Transcripción de audio e inferencia estructurada de diagnósticos con fallback y auditoría de tokens. |

---

## 2. Modelado de Datos y Persistencia

### 2.1 Entidades Principales

| Entidad | Descripción | Notas de diseño |
|---|---|---|
| `User` | Cuenta del usuario | Autenticación, plan (`free`/`pro`), ID de arquetipo activo |
| `Archetype` | Catálogo de arquetipos (Bio-Optimizer, The Cleaner, Novelty Engine, Psicólogo de Alto Rendimiento) | Tabla catálogo administrada; define el `system_prompt` base del mentor |
| `Pillar` | Pilar de vida del usuario (salud, finanzas, familia, rendimiento, etc.) | **Dinámico por usuario**: se inicializa con defaults pero son filas en BD editables por el usuario |
| `PillarScoreLog` | Histórico de puntuaciones por pilar en el tiempo | Serie temporal para alimentar gráficos de radar y análisis longitudinal |
| `JournalEntry` | Registro diario ("Espejo del día") | Soporta texto, audio o imagen. Guarda estado (`pending`, `completed`, `failed`) y URL en R2/S3 |
| `DiagnosisReport` | Análisis generado por la IA para una entrada | Separado de `JournalEntry` para permitir regeneraciones y auditoría |
| `JournalEmbedding` | Vector semántico de la entrada | Campo de tipo `vector(1536)` para RAG histórico del usuario vía `pgvector` |
| `XPLog` | Registro de eventos de experiencia | Histórico transaccional para calcular niveles y recompensar hábitos |
| `Streak` | Racha activa del usuario | Días consecutivos y fecha del último registro activo |
| `Subscription` | Estado de suscripción y pagos | Vinculación externa con pasarela de pago (Stripe / MercadoPago) |
| `AIInteractionLog` | Auditoría de cada llamada a modelos de IA | **Crítico**: modelo, proveedor, tokens de entrada/salida, latencia y costo en USD |

### 2.2 Diagrama Entidad-Relación

```mermaid
erDiagram
    USER ||--o{ PILLAR : define
    USER ||--o{ JOURNAL_ENTRY : crea
    USER ||--o{ XP_LOG : genera
    USER ||--|| STREAK : tiene
    USER ||--o| SUBSCRIPTION : tiene
    USER }o--|| ARCHETYPE : "tiene activo"
    PILLAR ||--o{ PILLAR_SCORE_LOG : acumula
    JOURNAL_ENTRY ||--o| DIAGNOSIS_REPORT : genera
    JOURNAL_ENTRY ||--o| JOURNAL_EMBEDDING : vectoriza
    DIAGNOSIS_REPORT ||--o{ AI_INTERACTION_LOG : audita
    JOURNAL_ENTRY ||--o{ AI_INTERACTION_LOG : audita

    USER {
        uuid id PK
        string email
        string password_hash
        string plan
        uuid active_archetype_id FK
        datetime created_at
    }
    ARCHETYPE {
        uuid id PK
        string name
        string tagline
        text system_prompt
    }
    PILLAR {
        uuid id PK
        uuid user_id FK
        string name
        string icon
        boolean is_active
        int display_order
    }
    PILLAR_SCORE_LOG {
        uuid id PK
        uuid pillar_id FK
        int score
        text ai_comment
        datetime recorded_at
    }
    JOURNAL_ENTRY {
        uuid id PK
        uuid user_id FK
        string entry_type
        text raw_text
        string media_url
        string processing_status
        datetime created_at
    }
    DIAGNOSIS_REPORT {
        uuid id PK
        uuid journal_entry_id FK
        json pillar_scores
        text summary
        string priority_action
        datetime created_at
    }
    JOURNAL_EMBEDDING {
        uuid id PK
        uuid journal_entry_id FK
        vector embedding
        datetime created_at
    }
    XP_LOG {
        uuid id PK
        uuid user_id FK
        string reason
        int amount
        datetime created_at
    }
    STREAK {
        uuid user_id PK
        int current_days
        date last_active_date
    }
    SUBSCRIPTION {
        uuid id PK
        uuid user_id FK
        string status
        string external_id
        date renews_at
    }
    AI_INTERACTION_LOG {
        uuid id PK
        uuid user_id FK
        string provider
        string model
        int input_tokens
        int output_tokens
        decimal cost_usd
        datetime created_at
    }
```

### 2.3 Decisiones de Persistencia (PostgreSQL 16 + SQLAlchemy 2.0 + Alembic)
- **Migraciones versionadas con Alembic**: Todo cambio en tablas o índices debe realizarse mediante migraciones versionadas (`alembic revision --autogenerate`), sin modificar tablas manualmente en producción.
- **Soporte vectorial con `pgvector`**: Permite guardar embeddings (1536 dimensiones) de los diarios del usuario y calcular similitud coseno (`<=>`) directamente con SQL sin necesidad de un cluster Pinecone/Weaviate adicional.
- **Transaccionalidad ACID**: Garantiza la consistencia entre la creación del diagnóstico, actualización del puntaje del pilar y asignación de XP.

---

## 3. Arquitectura General y Distribución del Repositorio

### 3.1 Estilo de Arquitectura: Monorepo y Monolito Modular Asíncrono

El ecosistema NIKA está estructurado como un **Monorepo Workspace** orientado a dominios (*vertical slicing*), permitiendo alta cohesión interna por módulo, bajo acoplamiento entre capas y tipado compartido de punta a punta entre Backend y Frontend.

```text
nika-app/
├── apps/
│   ├── mobile/                               # Aplicación Multiplataforma (React Native + Expo SDK)
│   │   ├── app/                              # Enrutamiento basado en archivos (Expo Router)
│   │   │   ├── (auth)/                       # Flujos de autenticación (login, registro, recuperación)
│   │   │   ├── (onboarding)/                 # Setup inicial, selección de arquetipos y pilares
│   │   │   ├── (main)/                       # Navegación principal (home/radar, diario, stats, perfil)
│   │   │   ├── _layout.tsx                   # Layout raíz y providers (React Query, Auth, Theme)
│   │   │   └── index.tsx                     # Entrypoint / redirección inicial
│   │   ├── src/                              # Código fuente modular de la app móvil
│   │   │   ├── components/                   # UI Kit reutilizable (Cards, Radars, Modales, Inputs)
│   │   │   ├── hooks/                        # Custom hooks reactivos (TanStack Query, Audio recording)
│   │   │   ├── services/                     # Clientes API tipados, interceptores y upload a R2/S3
│   │   │   └── styles/                       # Tokens de diseño NativeWind / Tailwind CSS
│   │   ├── app.json                          # Manifiesto y configuración nativa de Expo
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── backend/                              # API REST & Workers Asíncronos (FastAPI + Celery)
│       ├── alembic/                          # Versionado de esquemas y migraciones de BD
│       │   ├── versions/                     # Scripts de migración generados
│       │   └── env.py                        # Conexión SQLAlchemy para Alembic
│       ├── app/                              # Núcleo de la aplicación FastAPI
│       │   ├── core/                         # Configuraciones transversales globales
│       │   │   ├── config.py                 # Pydantic BaseSettings (variables de entorno)
│       │   │   ├── database.py               # AsyncEngine SQLAlchemy 2.0 y sesión async
│       │   │   ├── redis.py                  # Conexión y cliente Redis para caché / rate-limit
│       │   │   └── security.py               # Hashing de contraseñas (Argon2/bcrypt) y JWT
│       │   ├── integrations/                 # Clientes de servicios e infraestructura externa
│       │   │   ├── ai_gateway/               # Abstracción OpenAI / Anthropic, Whisper y costes
│       │   │   └── storage.py                # Cliente S3 / Cloudflare R2 para Presigned URLs
│       │   ├── modules/                      # Dominios de negocio aislados (Vertical Slices)
│       │   │   ├── auth/                     # Autenticación, tokens JWT, guards de seguridad
│       │   │   ├── users/                    # Gestión de usuarios, perfiles y suscripciones
│       │   │   ├── pillars/                  # CRUD de pilares dinámicos y logs de puntuación
│       │   │   ├── journaling/               # Entradas diarias (texto/audio/foto) y uploads
│       │   │   ├── diagnosis/                # Diagnósticos de IA, prompts de arquetipos y RAG pgvector
│       │   │   └── gamification/             # Motor de XP, rachas (streaks) y recompensas
│       │   ├── workers/                      # Procesamiento asíncrono en segundo plano
│       │   │   ├── celery_app.py             # Configuración del broker Redis y colas Celery
│       │   │   └── tasks.py                  # Tareas pesadas (Whisper transcription, RAG, batching)
│       │   └── main.py                       # Fábrica de FastAPI, middlewares CORS y ensamblado /api/v1
│       ├── tests/                            # Suites de pruebas automatizadas (pytest + pytest-asyncio)
│       ├── requirements.txt                  # Dependencias de producción
│       ├── requirements-dev.txt              # Dependencias de desarrollo (Ruff, Mypy, Pytest)
│       └── Dockerfile                        # Imagen de contenedor para backend y workers
│
├── packages/
│   └── shared-types/                         # Contratos TypeScript sincronizados con OpenAPI
│       ├── src/                              # Interfaces generadas automáticamente desde Pydantic
│       ├── package.json
│       └── tsconfig.json
│
├── Context/                                  # Documentación viva y arquitectura del proyecto
│   ├── nika_business_model.md                # Propuesta de valor, arquetipos, pricing y unit economics
│   └── nika_tech_model.md                    # Especificación técnica oficial y modelado de datos
│
├── .agents/                                  # Skills, plugins y reglas para agentes de desarrollo
│   ├── plugins/                              # Plugins especializados (animaciones, diseño UI/UX)
│   └── skills/                               # Habilidades y guías de buenas prácticas
│
├── docker-compose.yml                        # Orquestación local (Postgres 16 + pgvector, Redis)
└── README.md                                 # Guía de inicio rápido y visión general del repo
```

### 3.2 Responsabilidades y Flujo de Cada Directorio

1. **`apps/mobile`**:
   - **`app/`**: Implementa el enrutamiento nativo con Expo Router. Se agrupa mediante *route groups* `(auth)`, `(onboarding)` y `(main)` para desacoplar las diferentes etapas de la sesión del usuario.
   - **`src/components/`**: Átomos, moléculas y componentes visuales reutilizables (gráficos de radar para pilares, visualizadores de onda de audio, tarjetas de diagnóstico).
   - **`src/services/`**: Clientes Axios/Fetch tipados que consumen la API de FastAPI y gestionan la subida directa de audio/foto a los buckets BLOB (Cloudflare R2 / S3) mediante Presigned URLs.
   - **`src/hooks/`**: Encapsulan la lógica reactiva y la caché de datos mediante TanStack Query (React Query), evitando llamadas redundantes al backend.

2. **`apps/backend/app/modules`** *(Enfoque Vertical Slice)*:
   - Cada subcarpeta dentro de `modules/` (`auth`, `users`, `pillars`, `journaling`, `diagnosis`, `gamification`) contiene:
     - `router.py`: Endpoints expuestos bajo `/api/v1/{module}`.
     - `schemas.py`: Modelos Pydantic v2 para validación estricta de Request y Response.
     - `models.py`: Entidades SQLAlchemy asociadas al dominio.
     - `service.py`: Lógica de negocio y consultas parametrizadas.

3. **`packages/shared-types`**:
   - Mantiene la consistencia de tipos entre backend y frontend. Se alimenta de la especificación OpenAPI generada por FastAPI (`/openapi.json`) y produce interfaces TypeScript consumibles por `apps/mobile`.

4. **`Context/`**:
   - Almacena el conocimiento fundamental del producto, dividiendo la visión de negocio (`nika_business_model.md`) de la implementación tecnológica (`nika_tech_model.md`).

---

### 3.3 Flujo End-to-End: Registro de Audio del "Espejo del Día"

El flujo de audio e inferencia es asíncrono para garantizar respuesta inmediata y desacople de carga:

```mermaid
sequenceDiagram
    participant App as Mobile (Expo / TanStack Query)
    participant API as FastAPI (HTTP)
    participant R2 as Storage (Cloudflare R2 / S3)
    participant Redis as Redis (Broker)
    participant Celery as Celery Worker
    participant AI as AI Gateway (Whisper + LLM)
    participant DB as PostgreSQL 16 (pgvector)

    App->>API: POST /api/v1/journaling/upload-url (nombre_archivo, mime)
    API->>R2: Genera Presigned PUT URL
    API-->>App: Retorna { upload_url, file_key, entry_id }

    App->>R2: PUT audio crudo (.m4a / .mp3)
    App->>API: POST /api/v1/journaling/confirm (entry_id)
    API->>DB: Actualiza JournalEntry (status: 'processing')
    API->>Redis: Encola tarea Celery `process_journal_audio(entry_id)`
    API-->>App: 202 Accepted { status: "processing" }

    Celery->>Redis: Toma tarea de la cola
    Celery->>R2: Lee archivo de audio
    Celery->>AI: Transcribe con Whisper API
    AI-->>Celery: Texto transcrito
    Celery->>DB: Busca contexto semántico histórico (RAG con pgvector)
    Celery->>AI: Solicita diagnóstico estructurado con prompt del arquetipo
    AI-->>Celery: Diagnóstico JSON { scores, summary, priority_action }
    Celery->>DB: Guarda DiagnosisReport + PillarScoreLog + AIInteractionLog
    Celery->>DB: Actualiza XPLog, Streak y marca status: 'completed'

    loop Polling asíncrono con TanStack Query
        App->>API: GET /api/v1/journaling/:entry_id
        API-->>App: Retorna { status: "completed", diagnosis: {...} }
    end
```

---

## 4. Backend API y Procesamiento Asíncrono

### 4.1 FastAPI (Python 3.11+)
- **Rendimiento Asíncrono (ASGI)**: Uso de Uvicorn y handlers asíncronos (`async def`) para maximizar concurrencia sin bloquear el hilo principal.
- **Tipado estricto con Pydantic v2**:
  - Validación rigurosa de contratos de entrada y salida.
  - Generación automática de especificación OpenAPI (`/docs` y `/redoc`).
- **Inyección de Dependencias (`Depends`)**: Gestión limpia del ciclo de vida de sesiones de base de datos (`AsyncSession`), cliente Redis y usuario autenticado.

### 4.2 Celery + Redis (Worker & Colas)
- **Aislamiento de tareas pesadas**: Las llamadas a Whisper (transcripción) y LLMs (Claude/GPT) tienen latencias de 2 a 15 segundos; procesarlas en workers Celery evita agotar los hilos de la API HTTP.
- **Reintentos y Resiliencia**:
  - Reintentos con retroceso exponencial (*exponential backoff*) ante fallos temporales de proveedores de IA.
  - Colas separadas por prioridad (`high_priority` para resúmenes directos, `background` para embeddings y vectorización).

### 4.3 SQLAlchemy 2.0 (Async) + Alembic
- Sintaxis moderna `select(Model).where(...)` con tipado estricto.
- Separación clara:
  - **Models**: Estructura de tablas en BD.
  - **Schemas**: Contratos de datos validados por Pydantic.
  - **Repositories/Services**: Consultas parametrizadas sin inyección SQL.

---

## 5. Frontend y Mobile (React Native + Expo)

### 5.1 Arquitectura Unificada con Expo SDK (TypeScript)
- **Base de Código Única**: Una sola base de código en TypeScript que compila de forma nativa para Android e iOS, y soporte Web responsivo.
- **Expo Router**: Enrutamiento basado en archivos (`app/(auth)`, `app/(main)`, `app/journaling`), simplificando navegación y deep linking.

### 5.2 Estilos y Tipografía con NativeWind (Tailwind CSS)
- **Tipografía Oficial**: **Rethink Sans** (`@expo-google-fonts/rethink-sans`) configurada como fuente base (`sans`) para toda la aplicación en variantes Regular (400), Medium (500), SemiBold (600), Bold (700) y ExtraBold (800).
- Tokens de diseño centralizados en `tailwind.config.js`:
  - **Fondo Dark**: `#0a0a0c`, `#121216`
  - **Superficie / Cards**: `#18181f`, `#22222b`
  - **Acento Primario Nika**: Naranja de alta energía (`#ff6b00` / `#f97316`)
  - **Texto**: `#f4f4f6` (principal), `#9ca3af` (secundario)
  - **Fuentes**: `font-sans`, `font-regular`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`
- Consistencia absoluta entre componentes móviles y web sin crear hojas de estilo dispares.

### 5.3 Consumo de API con TanStack Query (React Query)
- **Server State Management**: Caché automático de pilares, reportes diarios y estadísticas de racha.
- **Polling inteligente para reportes de IA**:
```typescript
const { data: entry, isLoading } = useQuery({
  queryKey: ['journalEntry', entryId],
  queryFn: () => getJournalEntry(entryId),
  refetchInterval: (query) => {
    const status = query.state.data?.processing_status;
    return status === 'processing' || status === 'pending' ? 2500 : false;
  },
});
```
- **Optimistic Updates**: Actualizaciones instantáneas en UI para acciones rápidas (ej. marcar hábito o cambiar visualmente el pilar antes de la confirmación del servidor).

---

## 6. Almacenamiento BLOB y Manejo de Multimedia

### 6.1 Cloudflare R2 / AWS S3
- **Almacenamiento Crudo de Audios**: Los audios en formatos comunes de smartphones (`.m4a` de iOS/Android o `.mp3`) se almacenan directamente en buckets BLOB.
- **Subida Segura con Presigned URLs**:
  - La aplicación cliente móvil nunca recibe credenciales de acceso a AWS o Cloudflare.
  - Solicita una URL firmada de corta duración (validez: 10-15 minutos) con verbo `PUT` y tamaño máximo restringido (ej. 25 MB).
  - La aplicación sube el archivo directamente a R2/S3, reduciendo la carga de red y memoria del backend FastAPI.
- **Bucket Privado**: Acceso público desactivado. Solo el worker de Celery o el backend mediante credenciales IAM pueden leer los audios para transcripción.

---

## 7. Gateway de IA y Control de Costos

### 7.1 Abstracción de Proveedores (OpenAI SDK / Anthropic SDK)
Toda interacción con inteligencia artificial está encapsulada dentro del módulo `integrations/ai_gateway.py`:

```mermaid
graph LR
    A[Servicio Diagnosis / Celery] --> B[AI Gateway]
    B --> C{Orquestador y Fallback}
    C -->|Transcripción| D[OpenAI Whisper / Groq]
    C -->|Diagnóstico Principal| E[Anthropic Claude 3.5 Sonnet]
    C -->|Fallback / Respaldo| F[OpenAI GPT-4o]
    C -->|Embeddings RAG| G[OpenAI text-embedding-3-small]
```

### 7.2 Auditoría y Contención de Costos
- **Registro Obligatorio (`AIInteractionLog`)**: Cada ejecución registra tokens de entrada, tokens de salida, modelo y costo en USD calculado al momento.
- **Prompt Engineering Eficiente**: Prompts estructurados con salida JSON obligatoria (`pydantic` parser o `tool_choice`/`response_format`), evitando texto innecesario y alucinaciones.
- **RAG Localizado**: Búsqueda vectorial con `pgvector` filtrando estrictamente por el `user_id` para inyectar solo las últimas 3-5 entradas relevantes del usuario como contexto.

---

## 8. DevOps y CI/CD

### 8.1 Entornos

| Entorno | Propósito | Servicios |
|---|---|---|
| **Local** | Desarrollo ágil | Docker Compose (PostgreSQL con pgvector, Redis, FastAPI con reload, Celery worker) |
| **Staging** | Validación y QA | Railway / Render con réplica de esquema y datos anonimizados |
| **Producción** | Usuarios finales | Instancia gestionada de FastAPI + Celery Workers independientes + PostgreSQL 16 + Redis |

### 8.2 Pipeline de CI/CD (GitHub Actions)

El flujo de integración continua valida tanto el backend en Python como la app en TypeScript/Expo:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  backend-quality:
    name: Backend Lint & Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'
      - run: pip install -r requirements-dev.txt
      - run: ruff check .
      - run: pytest tests/

  frontend-quality:
    name: Mobile / Frontend Lint & Types
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit

  deploy-staging:
    name: Deploy to Staging
    needs: [backend-quality, frontend-quality]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Disparar webhook de despliegue a Staging (Railway / Render)"
```

---

## 9. Ciberseguridad y Protección de Datos

1. **Autorización y Propiedad de Recursos**: Todo endpoint verifica que el recurso pertenezca al `current_user.id` extraído del JWT. Prohibido consultar registros usando únicamente el ID del payload.
2. **Archivos Protegidos y Presigned URLs**: Audios y fotos privados con acceso exclusivo temporal vía URLs prefirmadas.
3. **Cifrado en Tránsito y Reposo**: Tráfico TLS 1.3 forzado y cifrado en base de datos de campos de reflexión íntima.
4. **Rate Limiting con Redis**: Limitador por IP y por usuario para mitigar abusos y ataques de denegación de servicio sobre endpoints de IA.
5. **Mitigación OWASP**: Sanitización de inputs, prevención de SQL Injection mediante SQLAlchemy y cero filtración de trazas de error internas en producción.

---

## 10. Checklist de Arranque Técnico

1. [ ] Inicializar proyecto FastAPI con estructura modular y configuración de entornos (`pydantic-settings`).
2. [ ] Configurar contenedor Docker para PostgreSQL 16 con la extensión `pgvector` activada y Redis 7.
3. [ ] Modelar entidades SQLAlchemy 2.0 e inicializar migraciones con Alembic.
4. [ ] Implementar cliente S3/R2 para generación de Presigned URLs de audio (`.m4a`/`.mp3`).
5. [ ] Configurar Celery con Redis broker y crear el primer worker de transcripción Whisper.
6. [ ] Implementar el módulo `ai_gateway.py` con OpenAI y Anthropic, integrando `AIInteractionLog`.
7. [ ] Inicializar app móvil con `npx create-expo-app` en TypeScript, configurando NativeWind y tokens de tema oscuro/naranja.
8. [ ] Configurar TanStack Query en Expo y montar el cliente API tipado.
9. [ ] Implementar pipeline de GitHub Actions con chequeos de Ruff, Pytest y TypeScript.
10. [ ] Configurar variables de entorno y secrets en plataforma de despliegue (Railway/Render).
