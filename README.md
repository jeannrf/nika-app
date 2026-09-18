# NIKA — High-Performance Digital Coach

Sistema de acompañamiento y autoconocimiento estructurado para jóvenes de alto rendimiento (profesionales, fundadores y deportistas). Nika traduce el registro diario de vida (texto, audio y fotos) en lectura de patrones y diagnósticos de equilibrio sobre pilares personales mediante Inteligencia Artificial reflexiva.

---

## 🚀 Stack Tecnológico Oficial

| Capa / Componente | Tecnología Seleccionada | Justificación Técnica |
|---|---|---|
| **Frontend / Mobile** | **React Native + Expo SDK** (TypeScript) | Base de código única para Android, iOS y Web centrada. Cero código duplicado. |
| **Estilos UI** | **NativeWind** (Tailwind CSS) | Tokens consistentes de diseño oscuro con acentos naranja (`#ff6b00` / `#f97316`). |
| **Consumo de API** | **TanStack Query** (React Query) | Manejo de Server State, caché y polling asíncrono para reportes de IA. |
| **Backend API** | **FastAPI** (Python 3.11+) | Rendimiento asíncrono (ASGI), tipado estricto con Pydantic y documentación OpenAPI automática. |
| **Worker / Colas** | **Celery + Redis** | Procesamiento fuera del ciclo HTTP para transcripción de audio (Whisper) y llamadas a LLMs. |
| **Base de Datos** | **PostgreSQL 16 + pgvector** | Motor relacional ACID con soporte vectorial nativo para embeddings y búsqueda semántica (RAG). |
| **ORM / Migraciones** | **SQLAlchemy 2.0 + Alembic** | Mapeo relacional desacoplado y migraciones de esquema versionadas. |
| **Almacenamiento BLOB** | **Cloudflare R2 / AWS S3** | Almacenamiento seguro de archivos de audio crudo (`.m4a` / `.mp3`) mediante URLs prefirmadas. |
| **Gateway de IA** | **OpenAI SDK / Anthropic SDK** | Transcripción de audio e inferencia estructurada de diagnósticos con fallback y auditoría de tokens. |

---

## 🏛️ Arquitectura del Repositorio (Monolito Modular)

El proyecto está organizado como un monorepo workspace orientado a dominios (vertical slicing), manteniendo alta cohesión dentro de cada módulo y bajo acoplamiento:

```text
nika-app/
├── apps/
│   ├── mobile/                           # Frontend Multiplataforma (Expo SDK + NativeWind)
│   │   ├── app/                          # File-based routing (Expo Router)
│   │   │   ├── (auth)/                   # login.tsx, register.tsx
│   │   │   ├── (onboarding)/             # Wizard de bienvenida y pilares iniciales
│   │   │   ├── (main)/                   # Navegación principal (home, pillars, stats, etc.)
│   │   │   └── _layout.tsx               # Providers globales (QueryClient, Auth, Theme)
│   │   ├── src/
│   │   │   ├── components/               # Componentes UI reutilizables (átomos y moléculas)
│   │   │   ├── hooks/                    # Custom hooks con TanStack Query
│   │   │   ├── services/                 # Clientes API tipados y subida a BLOB Storage
│   │   │   └── styles/                   # Configuración de Tailwind / tokens de diseño
│   │   ├── app.json                      # Configuración de Expo y capacidades nativas
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── backend/                          # Backend API & Workers Asíncronos (FastAPI + Celery)
│       ├── app/
│       │   ├── core/                     # Configuración transversal (config, database, redis, security)
│       │   ├── integrations/             # Clientes de servicios externos
│       │   │   ├── ai_gateway/           # Conectores OpenAI/Anthropic, Whisper y control de costos
│       │   │   └── storage.py            # Presigned URLs para Cloudflare R2 / S3
│       │   ├── modules/                  # Módulos de Dominio (Monolito Modular)
│       │   │   ├── auth/                 # Autenticación, JWT, registro y login
│       │   │   ├── users/                # Perfiles, planes y arquetipo activo
│       │   │   ├── pillars/              # CRUD de pilares dinámicos y series temporales
│       │   │   ├── journaling/           # Registro diario (texto/audio/foto) y presigned uploads
│       │   │   ├── diagnosis/            # Diagnósticos generados por IA + RAG con pgvector
│       │   │   └── gamification/         # XPLogs, rachas y niveles
│       │   ├── workers/                  # Orquestación de Celery
│       │   │   ├── celery_app.py         # Inicialización del broker Redis y colas
│       │   │   └── tasks.py              # Tareas diferidas (transcripción Whisper, RAG, reportes)
│       │   └── main.py                   # Ensamblador de rutas /api/v1 y middlewares
│       ├── alembic/                      # Migraciones versionadas de base de datos
│       ├── tests/                        # Pruebas unitarias y de integración (pytest)
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/
│   └── shared-types/                     # Tipos TypeScript compartidos (autogenerados desde OpenAPI)
│       ├── src/                          # Contratos de tipos sincronizados con Pydantic
│       ├── package.json
│       └── tsconfig.json
│
├── Context/                              # Documentación estratégica y arquitectónica
│   ├── nika_business_model.md            # Propuesta de valor, mercado, viabilidad y B2B
│   └── nika_tech_model.md                # Especificación técnica oficial y modelado de datos
│
├── docker-compose.yml                    # PostgreSQL 16 (pgvector), Redis y servicios locales
└── README.md
```

---

## 🔄 Flujo de Contratos y Type-Safety (Python ↔ TypeScript)

Para evitar la desincronización entre los esquemas Pydantic del backend y los tipos TypeScript de la app móvil:
1. FastAPI genera automáticamente la especificación `openapi.json` a partir de los esquemas Pydantic v2.
2. `packages/shared-types` utiliza `openapi-typescript` para generar interfaces TypeScript de forma automatizada:
   ```bash
   npm run generate-types
   ```
3. La aplicación móvil importa estos tipos directamente, garantizando tipado estricto de punta a punta.

---

## 📚 Documentación Adicional

- [Especificación Técnica y Arquitectura](file:///home/jean/Desktop/UNI/Proyectos/nika-app/Context/nika_tech_model.md)
- [Propuesta de Valor y Modelo de Negocio](file:///home/jean/Desktop/UNI/Proyectos/nika-app/Context/nika_business_model.md)
