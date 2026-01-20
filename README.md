# Social Network Visualizer

A small full-stack web application for visualizing social connections and relationships between people. Built with React, TypeScript, Material UI, and ASP.NET Core.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Material UI + ReactFlow
- **Backend**: ASP.NET Core (.NET 9) with minimal API
- **Database**: SQLite (embedded, no setup required)

## Features

- Interactive network graph showing connections between people
- Filter by relationship type (colleague, classmate, family, groupmate)
- Filter by status (best-friend, friend, acquaintance)
- Add, edit, and delete people

## Quick Start

### 1. Start the Backend

```bash
cd backend/DataCenterAPI
dotnet run
```

Backend runs at: `http://localhost:5165`

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/people` | Get all people |
| GET | `/api/people/{id}` | Get person by ID |
| POST | `/api/people` | Create new person |
| PUT | `/api/people/{id}` | Update person |
| DELETE | `/api/people/{id}` | Delete person |
| PUT | `/api/people/{id}/status` | Update person's status |
| GET | `/api/people/stats` | Get statistics |

## License

MIT
