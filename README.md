# PaperFlow — Research Publication Tracking API

REST API для учёта научных статей, журналов, требований к публикации и истории подач.

Пользователь **вручную** обновляет статус submission — интеграций с издательствами нет.

## Технологии

- Node.js + TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Zod (валидация)
- Docker Compose (API + PostgreSQL)
- Postman (тесты)

## Быстрый старт (всё через Docker)

Нужен запущенный **Docker Desktop**.

```bash
docker compose up --build
```

Поднимается:
- **postgres** — БД (внутри сети Docker; с хоста порт `5433`)
- **api** — Express API на [http://localhost:3000](http://localhost:3000)

Миграции Prisma выполняются автоматически при старте контейнера `api`.

Проверка: [http://localhost:3000/api/health](http://localhost:3000/api/health)

Остановить:

```bash
docker compose down
```

### Postman

Импортируй `postman/PaperFlow.postman_collection.json` в Postman.  
Base URL: `http://localhost:3000`.

### Локальная разработка без Docker API (опционально)

Если хочешь `npm run dev` на машине, а БД в Docker:

```bash
docker compose up postgres -d
npm install
npx prisma migrate dev
npm run dev
```

`.env` для локального API:

```env
DATABASE_URL="postgresql://paperflow:paperflow@localhost:5433/paperflow?schema=public"
PORT=3000
```

---

## Модели и связи

См. также [`docs/ERM.md`](docs/ERM.md).

| Модель | Описание |
|--------|----------|
| Researcher | Исследователь |
| Manuscript | Научная статья |
| Journal | Журнал |
| JournalRequirement | Требование журнала |
| Submission | Подача статьи в журнал |

Связи:
- Researcher **1:N** Manuscript
- Manuscript **1:N** Submission
- Journal **1:N** Submission
- Journal **1:N** JournalRequirement
- Manuscript ↔ Journal **M:N** через Submission

Статусы Submission: `DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `REVISION_REQUIRED`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`.

---

## Структура проекта

```text
src/
  routes/         URL endpoints
  controllers/    HTTP req/res
  services/       бизнес-логика + Prisma
  validators/     Zod-схемы
  middlewares/    validate + errors
  prisma/         Prisma client
prisma/
  schema.prisma
docs/             ERM
postman/          коллекция запросов
```

---

## HTTP-статусы

| Код | Когда |
|-----|--------|
| 200 | Успешное чтение/обновление |
| 201 | Создано |
| 204 | Удалено |
| 400 | Ошибка валидации |
| 404 | Не найдено |
| 409 | Конфликт (например email занят) |
| 500 | Внутренняя ошибка |

---

## Документация endpoints

### Health

#### GET `/api/health`
- Params/body: нет
- Response `200`: `{ "status": "ok", "service": "PaperFlow" }`

---

### Researchers

#### GET `/api/researchers`
- Response `200`: массив researchers

#### POST `/api/researchers`
- Body:
```json
{
  "fullName": "Adina Researcher",
  "email": "adina@university.edu",
  "institution": "NU"
}
```
- Response `201`: созданный researcher
- Errors: `400`, `409` (email)

#### GET `/api/researchers/:id`
- Params: `id` (positive int)
- Response `200` / `404`

#### PUT `/api/researchers/:id`
- Body: как POST (все поля)
- Response `200` / `400` / `404` / `409`

#### DELETE `/api/researchers/:id`
- Response `204` / `404`  
- Cascade: удаляются manuscripts исследователя (и их submissions)

#### GET `/api/researchers/:id/manuscripts`
- Related data: все статьи исследователя
- Response `200` (массив) / `404`

---

### Manuscripts

#### GET `/api/manuscripts`
- Response `200`: массив (+ вложенный researcher)

#### POST `/api/manuscripts`
- Body:
```json
{
  "title": "AI in Medicine",
  "abstract": "A study of clinical ML.",
  "keywords": ["AI", "medicine"],
  "language": "en",
  "researcherId": 1
}
```
- Response `201`
- Errors: `400`, `404` (researcher не найден)

#### GET `/api/manuscripts/:id`
- Response `200` / `404`

#### PUT `/api/manuscripts/:id`
- Body: все поля как POST
- Response `200` / `400` / `404`

#### PATCH `/api/manuscripts/:id`
- Body: любое подмножество полей
- Response `200` / `400` / `404`

#### DELETE `/api/manuscripts/:id`
- Response `204` / `404`

#### GET `/api/manuscripts/:id/submissions`
- Related data: история подач статьи (+ journal)
- Response `200` / `404`

---

### Journals

#### GET `/api/journals`
- Response `200`

#### POST `/api/journals`
- Body:
```json
{
  "name": "Nature",
  "publisher": "Springer Nature",
  "website": "https://www.nature.com",
  "subjectArea": "Multidisciplinary"
}
```
- Response `201` / `400`

#### GET `/api/journals/:id`
- Response `200` / `404`

#### PUT `/api/journals/:id`
- Body: все поля как POST
- Response `200` / `400` / `404`

#### DELETE `/api/journals/:id`
- Response `204` / `404`  
- Cascade: requirements и submissions журнала

#### GET `/api/journals/:id/requirements`
- Related data
- Response `200` / `404`

#### POST `/api/journals/:id/requirements`
- Body:
```json
{
  "title": "Max 8000 words",
  "description": "Main text must not exceed 8000 words.",
  "isMandatory": true
}
```
- Response `201` / `400` / `404`

#### GET `/api/journals/:id/submissions`
- Related data: подачи в этот журнал
- Response `200` / `404`

---

### Requirements

#### PUT `/api/requirements/:id`
- Body:
```json
{
  "title": "Max 8000 words",
  "description": "Updated description",
  "isMandatory": true
}
```
- Response `200` / `400` / `404`

#### DELETE `/api/requirements/:id`
- Response `204` / `404`

---

### Submissions

#### GET `/api/submissions`
- Response `200` (с manuscript + journal)

#### POST `/api/submissions`
- Body:
```json
{
  "manuscriptId": 1,
  "journalId": 1,
  "status": "SUBMITTED",
  "editorComment": null
}
```
- Response `201`
- Errors: `400`, `404` (если manuscript/journal нет)

#### GET `/api/submissions/:id`
- Response `200` / `404`

#### PUT `/api/submissions/:id`
- Body (все поля):
```json
{
  "manuscriptId": 1,
  "journalId": 1,
  "status": "UNDER_REVIEW",
  "submittedAt": "2026-03-20T10:00:00.000Z",
  "editorComment": "Assigned to reviewers"
}
```
- Response `200` / `400` / `404`

#### PATCH `/api/submissions/:id`
- Частичное обновление (часто только статус):
```json
{
  "status": "ACCEPTED",
  "editorComment": "Congratulations"
}
```
- Response `200` / `400` / `404`

#### DELETE `/api/submissions/:id`
- Response `204` / `404`

---

## Рекомендуемый порядок проверки в Postman

1. POST researcher  
2. POST journal  
3. POST journal requirement  
4. POST manuscript  
5. POST submission  
6. PATCH submission status  
7. GET nested routes (`/researchers/:id/manuscripts`, `/manuscripts/:id/submissions`)  
8. DELETE где нужно  

---

## Полезные команды

```bash
docker compose up --build   # API + Postgres
docker compose down         # остановить всё
docker compose logs -f api  # логи API
npm run dev                 # локальный API (БД уже в Docker)
npx prisma studio           # UI таблиц (через localhost:5433)
```
