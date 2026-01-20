# DataCenter Equipment Visualizer

A full-stack web application for visualizing and managing hardware deployment and decommissioning progress in data centers. Built with React, TypeScript, Material UI, and ASP.NET Core.

## Features

✅ **Modern Tech Stack**
- **Frontend**: React 19 + TypeScript + Material UI + ReactFlow
- **Backend**: ASP.NET Core (.NET 9) with minimal API
- **Database**: SQLite (easily switchable to PostgreSQL via Docker)
- **Visualization**: Interactive network topology with ReactFlow
- **Testing**: Vitest + React Testing Library

✅ **Key Functionality**
- Real-time equipment status dashboard with statistics
- Interactive network topology visualization showing equipment connections
- Filter by equipment type (server, router, storage, switch) and status
- Responsive grid view with Material UI cards
- REST API with full CRUD operations
- Data-driven UI with dynamic visualizations

✅ **Professional Features**
- TypeScript throughout for type safety
- Component-based architecture
- Reusable UI components
- Clean separation of concerns (services, types, components)
- CORS-enabled API
- Seed data for immediate demo

## Prerequisites

- **Node.js** (v18+)
- **.NET SDK** (9.0+)
- **Docker Desktop** (optional, for PostgreSQL)

## Quick Start

### 1. Start the Backend

```bash
cd datacenter-visualizer/backend/DataCenterAPI
dotnet run
```

Backend will be available at: `http://localhost:5165`

### 2. Start the Frontend

```bash
cd datacenter-visualizer/frontend
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
datacenter-visualizer/
├── frontend/                    # React + TypeScript application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── EquipmentCard.tsx
│   │   │   ├── EquipmentFlow.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── EquipmentCard.test.tsx
│   │   ├── services/           # API communication layer
│   │   │   └── api.ts
│   │   ├── types/              # TypeScript interfaces
│   │   │   └── Equipment.ts
│   │   ├── App.tsx             # Main application component
│   │   └── main.tsx            # Application entry point
│   ├── package.json
│   └── vitest.config.ts        # Test configuration
│
├── backend/                     # ASP.NET Core Web API
│   └── DataCenterAPI/
│       ├── Models/             # Data models
│       │   └── Equipment.cs
│       ├── Data/               # Entity Framework DbContext
│       │   └── AppDbContext.cs
│       ├── Program.cs          # API endpoints and configuration
│       └── Dockerfile
│
├── docker-compose.yml          # Docker orchestration (PostgreSQL)
├── SETUP.md                    # Detailed setup instructions
└── README.md                   # This file
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/equipment` | Get all equipment |
| GET | `/api/equipment/{id}` | Get equipment by ID |
| PUT | `/api/equipment/{id}/status` | Update equipment status |
| GET | `/api/equipment/stats` | Get equipment statistics |

## Technology Highlights

### Frontend
- **React 19**: Latest React with hooks and modern patterns
- **TypeScript**: Full type safety across the application
- **Material UI**: Google's Material Design implementation
- **ReactFlow**: Interactive node-based visualizations
- **Vite**: Fast build tool and dev server
- **Vitest**: Unit testing framework

### Backend
- **ASP.NET Core 9**: Minimal API pattern for clean, concise endpoints
- **Entity Framework Core**: ORM for database operations
- **SQLite**: Embedded database (no external server needed)
- **CORS**: Configured for local development

## Running Tests

```bash
cd datacenter-visualizer/frontend
npm test
```

## Building for Production

### Frontend
```bash
cd datacenter-visualizer/frontend
npm run build
```

### Backend
```bash
cd datacenter-visualizer/backend/DataCenterAPI
dotnet publish -c Release
```

## Docker Support

The project includes Docker Compose configuration for PostgreSQL:

```bash
cd datacenter-visualizer
docker-compose up -d
```

To use PostgreSQL instead of SQLite, update `Program.cs` to use:
```csharp
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
```

## Key Design Decisions

1. **SQLite for Demo**: Uses SQLite by default for easy setup without external dependencies
2. **Minimal API**: Leverages .NET's minimal API pattern for concise, readable endpoints
3. **Component-Based**: React components are small, focused, and reusable
4. **TypeScript Interfaces**: Strong typing prevents runtime errors
5. **Material UI**: Professional, accessible UI components out of the box
6. **ReactFlow**: Perfect for visualizing equipment network topology

## Future Enhancements

- Add authentication and authorization
- Implement WebSocket for real-time updates
- Add more advanced filtering and search
- Export data to CSV/PDF
- Equipment history and audit log
- Drag-and-drop network topology editor

## Why This Project for Akvelon?

This project demonstrates:

✅ **React & TypeScript** - Component-based development with type safety
✅ **UI/UX Principles** - Clean, intuitive interface with Material UI
✅ **Data Visualization** - ReactFlow for network topology (similar to Cytoscape.js)
✅ **Testing** - Unit tests with modern testing libraries
✅ **Figma Integration Ready** - Material UI components match design systems
✅ **REST API Understanding** - Full frontend-backend integration
✅ **C# / .NET Knowledge** - Bonus: includes .NET backend
✅ **Maintainable Code** - Clean architecture, readable, and well-structured

## License

MIT

## Author

Built as a portfolio project for the Akvelon Trainee/Junior React SDE position.
