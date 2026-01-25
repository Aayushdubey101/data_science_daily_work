# FastAPI CRUD Operations Guide

A practical guide to mastering CRUD (Create, Read, Update, Delete) operations with FastAPI - a modern, high-performance Python web framework.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Quick Setup](#quick-setup)
- [Understanding CRUD](#understanding-crud)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
- [CRUD Implementation](#crud-implementation)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Resources](#resources)

## Introduction

CRUD operations are fundamental to most web applications. This guide teaches you to implement these operations efficiently using FastAPI, from simple JSON-based storage to production-ready implementations.

## Prerequisites

- Python 3.7 or higher
- Basic Python knowledge
- Understanding of REST APIs and HTTP methods

## Quick Setup

**Using UV (Recommended):**
```bash
# Install UV if not already installed
pip install uv

# Initialize project
uv init api-work
cd api-work

# Add dependencies
uv add fastapi uvicorn
```

**Manual Setup:**
```bash
pip install fastapi uvicorn
```

**Run your API:**
```bash
uvicorn main:app --reload
```

Access interactive docs at `http://localhost:8000/docs`

## Understanding CRUD

- **Create (POST)** - Add new records (`/create`)
- **Read (GET)** - Retrieve data (`/view`, `/patient/{id}`)
- **Update (PUT/PATCH)** - Modify existing records (`/edit/{id}`)
- **Delete (DELETE)** - Remove records (`/delete/{id}`)

## Project Structure

### Simple Structure (current structure)
```
api-work/
├── main.py              # All API code
├── patients.json        # JSON data storage
├── pyproject.toml       # UV configuration
└── README.md
```

### Production Structure ( working towards this  )
```
api-work/
├── main.py              # API endpoints
├── models.py            # SQLAlchemy database models
├── schemas.py           # Pydantic validation schemas
├── database.py          # Database configuration
├── crud.py              # Database operations
├── auth.py              # Authentication logic
├── pyproject.toml       # Dependencies
└── README.md
```

## Core Concepts

### Path Parameters
Dynamic values in URL paths (e.g., `/patient/{patient_id}`). Used to identify specific resources. Validated using `Path()` with descriptions and examples.

### Query Parameters
Optional filters after `?` in URL (e.g., `/sort?sort_by=age&order=desc`). Used for sorting, filtering, and pagination. Defined with `Query()` for validation.

### Pydantic Models
Define data structure with automatic validation:
- **Type validation** - Ensures correct data types
- **Field constraints** - Min/max values, length limits
- **Custom validators** - Complex validation logic
- **Computed fields** - Auto-calculated properties (BMI, totals)

### Annotated Types
Combine type hints with validation metadata for cleaner, more readable code. Provides inline documentation and examples.

### Response Models
Control what data is returned in API responses. Exclude sensitive fields and ensure consistent output format.

### HTTPException
Raise standardized errors with status codes (404, 400, 500) and custom messages for better error handling.

## CRUD Implementation

### File-Based Storage (Simple)

**Advantages:**
- No database setup needed
- Easy to understand and debug
- Good for learning and prototyping

**Limitations:**
- Not scalable for production
- No concurrent access handling
- Manual data persistence

### Database Storage (Production)

**Advantages:**
- ACID transactions
- Concurrent access handling
- Query optimization
- Relationship management

**Popular Choices:**
- **SQLite** - Simple, file-based, good for development
- **PostgreSQL** - Full-featured, production-ready
- **MySQL** - Popular, widely supported
- **MongoDB** - NoSQL, flexible schema

## Advanced Features

### Data Validation

**Field Constraints:**
- `gt`, `lt` - Greater than, less than
- `ge`, `le` - Greater/less than or equal
- `min_length`, `max_length` - String length
- `regex` - Pattern matching

**Literal Types:**
Restrict values to specific choices (e.g., gender: 'male', 'female', 'others')

**Computed Fields:**
Auto-calculated properties using `@computed_field` decorator. Updates automatically when dependent values change.

### Request Validation

**Path Validation:**
Validate URL parameters with descriptions and examples for better API documentation.

**Query Validation:**
Set default values, allowed options, and validation rules for query parameters.

**Body Validation:**
Full request body validation through Pydantic models with detailed error messages.

### Partial Updates (PATCH)

Allow updating specific fields without sending entire object. Use `Optional` fields and `exclude_unset=True` to handle partial data.

### Sorting & Filtering

Implement dynamic sorting by multiple fields with ascending/descending order. Validate sort fields to prevent errors.

### Error Handling

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

**Custom Messages:**
Provide clear, actionable error messages to help API consumers fix issues.

## Best Practices

✅ **Use Type Hints** - Enable auto-validation and better IDE support

✅ **Descriptive Field Names** - Use clear, meaningful names for better API usability

✅ **Add Examples** - Include example values in field definitions for documentation

✅ **Validate Input** - Always validate user input with Pydantic constraints

✅ **Handle Errors** - Check for edge cases (duplicates, missing data)

✅ **Separate Concerns** - Split into multiple files as project grows

✅ **Use Enums/Literals** - Restrict values to valid choices

✅ **Document Endpoints** - Add descriptions to help API consumers

✅ **Version Control** - Use Git to track changes

✅ **Environment Variables** - Store secrets in `.env` files

## Migration Path

### From JSON to Database

**Step 1:** Create database models matching your Pydantic schemas

**Step 2:** Set up database connection and session management

**Step 3:** Replace file read/write with database queries

**Step 4:** Add proper transaction handling and rollback

**Step 5:** Implement database migrations for schema changes

## Common Patterns

### Dependency Injection
Reuse common logic (database sessions, authentication) across endpoints using `Depends()`.

### Response Models
Control output structure and automatically filter sensitive data from responses.

### Background Tasks
Execute non-critical operations (emails, logging) after returning response for better performance.

### Middleware
Add logging, authentication, or CORS handling that runs for all requests.

## Testing Your API

**Manual Testing:**
- Use Swagger UI at `/docs`
- Test with Postman or Insomnia
- Use curl commands

**Automated Testing:**
- Write unit tests with pytest
- Use FastAPI's TestClient
- Mock database operations
- Test edge cases and errors

## Resources

**Official Documentation:**
- [FastAPI Docs](https://fastapi.tiangolo.com/) - Complete guide
- [Pydantic Docs](https://docs.pydantic.dev/) - Validation library
- [UV Package Manager](https://github.com/astral-sh/uv) - Fast Python package installer

**Learning Path:**
1. Start with single-file JSON-based CRUD (like your current project)
2. Add database integration with SQLite
3. Implement authentication and authorization
4. Learn deployment and production best practices

## Next Steps

🚀 Add database integration (SQLAlchemy + SQLite)

🔐 Implement user authentication with JWT

📊 Add pagination for large datasets

⚡ Optimize with caching and async operations

🧪 Write comprehensive tests

🌐 Deploy to production (Heroku, Railway, Render)

---

