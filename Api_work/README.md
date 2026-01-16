# REST API Development with FastAPI

This directory contains projects and experiments focused on building REST APIs using FastAPI and working with CSV data sources.

## Learning Objectives

- Build RESTful APIs with FastAPI
- Create API endpoints for CSV data manipulation
- Implement CRUD operations (Create, Read, Update, Delete)
- Handle data serialization and JSON responses
- Work with CSV files as data sources

## Getting Started

### Prerequisites

```bash
pip install fastapi uvicorn pandas
```

### Basic FastAPI Structure

```python
from fastapi import FastAPI
import pandas as pd

app = FastAPI()

@app.get('/api/data')
def get_data():
    df = pd.read_csv('data.csv')
    return df.to_dict(orient='records')

# Run with: uvicorn main:app --reload
```

## Project Goals

- Learn how to expose CSV data through REST APIs
- Practice API design and endpoint creation
- Understand request/response handling
- Implement data filtering and querying via API parameters
