# DataCenter Visualizer - Setup Instructions

## Prerequisites

1. **Docker Desktop** - Download and install from https://www.docker.com/products/docker-desktop
2. **Node.js** (v18+) - Already installed ✓
3. **.NET SDK** (9.0+) - Already installed ✓

## Quick Start

### Option 1: Using Docker (Recommended)

1. **Start Docker Desktop**
   - Make sure Docker Desktop is running

2. **Run the application**
   ```bash
   cd datacenter-visualizer
   docker-compose up
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/equipment

### Option 2: Run Locally (Without Docker)

#### Start PostgreSQL manually
If you don't want to use Docker, install PostgreSQL locally and create a database named `datacenterdb`.

#### Start Backend
```bash
cd datacenter-visualizer/backend/DataCenterAPI
dotnet run
```

#### Start Frontend
```bash
cd datacenter-visualizer/frontend
npm run dev
```

## Project Structure

```
datacenter-visualizer/
├── frontend/              # React + TypeScript + Material UI
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── services/     # API service
│   │   ├── types/        # TypeScript interfaces
│   │   └── App.tsx       # Main application
│   └── package.json
├── backend/              # ASP.NET Core Web API
│   └── DataCenterAPI/
│       ├── Models/       # Data models
│       ├── Data/         # DbContext
│       └── Program.cs    # API endpoints
└── docker-compose.yml    # Docker orchestration
```

## Features Implemented

✓ React with TypeScript
✓ Material UI component library
✓ Interactive data visualization with ReactFlow
✓ REST API with C# .NET
✓ PostgreSQL database
✓ Docker containerization
✓ Filtering and search functionality
✓ Responsive design

## API Endpoints

- `GET /api/equipment` - Get all equipment
- `GET /api/equipment/{id}` - Get equipment by ID
- `PUT /api/equipment/{id}/status` - Update equipment status
- `GET /api/equipment/stats` - Get equipment statistics
