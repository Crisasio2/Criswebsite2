# E'Crist Commerce - Sustainable E-commerce Platform

## Overview

E'Crist Commerce is a full-stack e-commerce platform focused on sustainable and eco-friendly products. The application enables customers to browse, search, and purchase environmentally conscious products through a modern web interface. Built with a focus on sustainability, the platform showcases eco-friendly products ranging from natural cosmetics to biodegradable everyday items.

The platform features a product catalog with detailed descriptions, environmental certifications, shopping cart functionality, and educational content about sustainability. The design emphasizes natural aesthetics with green color schemes and nature-inspired animations to reinforce the environmental theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React and TypeScript, utilizing a component-based architecture with modern development practices:

- **Framework**: React 18 with TypeScript for type safety and development efficiency
- **Routing**: Wouter for lightweight client-side routing without the complexity of React Router
- **State Management**: Zustand for simple and performant global state management, primarily handling shopping cart state
- **Styling**: Tailwind CSS combined with shadcn/ui components for consistent, modern UI design
- **Data Fetching**: TanStack Query (React Query) for server state management, caching, and synchronization
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a page-based structure with dedicated pages for Home, Products, Sustainability, and About sections. Components are modular and reusable, with a comprehensive UI component library from shadcn/ui providing accessible and consistent interface elements.

### Backend Architecture
The server-side implements a RESTful API architecture with Express.js:

- **Framework**: Express.js with TypeScript for the web server and API endpoints
- **API Design**: RESTful endpoints for products, cart management, and search functionality
- **Data Validation**: Zod schemas for runtime type checking and data validation
- **Error Handling**: Centralized error handling middleware for consistent error responses
- **Development Tools**: ESBuild for production bundling and tsx for development execution

The backend provides endpoints for product management, cart operations, and search functionality. It implements proper HTTP methods and status codes following REST conventions.

### Data Storage Solutions
The application uses a dual storage approach:

- **Development Storage**: In-memory storage with pre-populated mock data for development and testing
- **Production Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Shared TypeScript schemas between client and server using Drizzle-Zod for validation

The database schema includes tables for users, products, and cart items with proper relationships and constraints. Products include detailed information about sustainability features, certifications, and stock levels.

### Authentication and Authorization
Currently implements a basic user system:

- **User Management**: Simple user creation and lookup functionality
- **Session Handling**: Basic session support with PostgreSQL session store
- **Cart Association**: Cart items can be associated with user accounts or used anonymously

### Development and Deployment
The application is optimized for the Replit development environment:

- **Development Server**: Vite dev server with hot module replacement
- **Production Build**: Optimized builds with proper asset handling
- **Environment Support**: Automatic detection of Replit environment with specialized tooling
- **Database Integration**: Configured for Neon Database (PostgreSQL) with environment-based connection strings

## External Dependencies

### Core Technologies
- **React 18**: Frontend framework with hooks and modern patterns
- **TypeScript**: Type safety across the entire application stack
- **Node.js**: Server runtime environment
- **PostgreSQL**: Primary database for production data storage

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Comprehensive React component library built on Radix UI
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography

### State Management and Data Fetching
- **Zustand**: Lightweight state management for client-side state
- **TanStack Query**: Server state management, caching, and data synchronization
- **React Hook Form**: Form handling with validation support

### Database and Validation
- **Drizzle ORM**: Type-safe ORM for PostgreSQL database operations
- **Drizzle Kit**: Database migration and schema management tools
- **Zod**: Runtime schema validation and type inference
- **Neon Database**: Serverless PostgreSQL database service

### Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution engine for development
- **Wouter**: Minimalist routing library for React

### Specialized Dependencies
- **date-fns**: Date manipulation and formatting utilities
- **class-variance-authority**: Utility for building component variants
- **clsx**: Utility for conditional CSS class names
- **cmdk**: Command menu component for enhanced UX