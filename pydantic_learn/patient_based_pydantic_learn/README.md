# Patient-Based Pydantic Learning

A comprehensive collection of Python scripts demonstrating Pydantic v2 features through practical Patient model examples. Perfect for learning data validation, serialization, and model management in modern Python applications.

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Module Breakdown](#module-breakdown)
- [Learning Path](#learning-path)
- [Key Concepts](#key-concepts)
- [Best Practices](#best-practices)
- [Resources](#resources)

## Overview

This repository uses a Patient model as the foundation to explore Pydantic's powerful features. Each module focuses on specific capabilities, building from basics to advanced patterns used in production APIs.

## Requirements

```bash
# Python version
Python 3.8 or higher

# Dependencies
pip install pydantic
```

## Quick Start

**Clone and run any example:**
```bash
python basic_pydantic.py
python computed_field_in_pydantic.py
python field_validator.py
# ... and so on
```

Each file is self-contained and demonstrates specific Pydantic features with working examples.

## Module Breakdown

### 1. `basic_pydantic.py` - Foundation

**What you'll learn:**
- Creating Pydantic models with type-safe fields
- Field constraints (min/max values, length limits)
- Automatic type conversion and coercion
- Optional fields with sensible defaults
- Using `Field()` for enhanced validation

**Core Concepts:**
- **Type Safety** - Define exact data types (str, int, float)
- **Validation** - Age between 0-120, weight must be positive
- **Annotated Fields** - Add descriptions and examples for documentation
- **Type Coercion** - Automatic conversion (e.g., "25" → 25)
- **Default Values** - Optional fields like allergies with None default

**Use Cases:**
API request validation, configuration management, data parsing from JSON/CSV

---

### 2. `computed_field_in_pydantic.py` - Dynamic Properties

**What you'll learn:**
- Creating calculated fields with `@computed_field` decorator
- Properties that derive from other model fields
- Automatic inclusion in serialization
- Real-time calculations without manual updates

**Core Concepts:**
- **Computed Properties** - BMI calculated from weight/height
- **Property Decorator** - Mark methods as computed fields
- **Auto Serialization** - Computed fields appear in `model_dump()`
- **Read-Only Fields** - Computed values can't be set directly

**Use Cases:**
BMI calculations, age from birthdate, total price from items, status derivation

---

### 3. `field_validator.py` - Custom Field Validation

**What you'll learn:**
- Implementing custom validation logic per field
- Using `@field_validator` decorator
- Pre-validation vs post-validation modes
- Transforming data during validation
- Raising descriptive validation errors

**Core Concepts:**
- **Field-Level Validation** - Validate individual fields independently
- **Domain Restrictions** - Email must be from specific domains (banks)
- **Data Transformation** - Convert names to uppercase automatically
- **Custom Error Messages** - Provide clear, actionable feedback
- **Validation Modes** - 'before' (pre-process) vs 'after' (post-process)

**Use Cases:**
Email domain whitelisting, password strength validation, phone number formatting, business rule enforcement

---

### 4. `model_validator.py` - Cross-Field Validation

**What you'll learn:**
- Validating relationships between multiple fields
- Using `@model_validator` decorator
- Conditional requirements based on other data
- Whole-model validation logic

**Core Concepts:**
- **Model-Level Validation** - Access multiple fields simultaneously
- **Conditional Logic** - Emergency contact required if age > 60
- **Cross-Field Dependencies** - Validate field combinations
- **Complete Data Validation** - Ensure entire model makes sense together

**Use Cases:**
Conditional required fields, date range validation (start < end), password confirmation matching, complex business rules

---

### 5. `nested_model_in_pydantic.py` - Structured Data

**What you'll learn:**
- Creating reusable sub-models
- Organizing complex data hierarchically
- Nested model validation
- Controlling serialization depth

**Core Concepts:**
- **Model Composition** - Address model within Patient model
- **Reusability** - Same Address model for multiple entities
- **Nested Validation** - Automatic validation of sub-models
- **Selective Serialization** - Include/exclude specific nested fields
- **Better Organization** - Group related fields logically

**Use Cases:**
User profiles with addresses, orders with line items, blog posts with comments, hierarchical configurations

---

### 6. `serialization.py` - Data Output Control

**What you'll learn:**
- Converting models to dictionaries with `model_dump()`
- Excluding unset optional fields
- Controlling output format for APIs
- Managing default values in serialization

**Core Concepts:**
- **Model to Dict** - Convert Pydantic models to plain Python dicts
- **Exclude Unset** - Only include fields explicitly set by user
- **Clean API Responses** - Remove None values and defaults
- **Flexible Output** - Control what data gets serialized

**Use Cases:**
JSON API responses, database inserts, configuration export, data transfer between services

---

## Learning Path

**Recommended order for beginners:**

1. **Start with basics** → `basic_pydantic.py`
   - Understand model creation and basic validation
   
2. **Add calculations** → `computed_field_in_pydantic.py`
   - Learn derived properties and auto-calculation

3. **Custom validation** → `field_validator.py`
   - Implement business rules for individual fields

4. **Complex validation** → `model_validator.py`
   - Handle relationships between multiple fields

5. **Structure data** → `nested_model_in_pydantic.py`
   - Organize complex data with sub-models

6. **Control output** → `serialization.py`
   - Master data export for APIs and storage

## Key Concepts

### Type Hints & Validation
Pydantic uses Python type hints to automatically validate data. Invalid data raises clear errors before processing.

### Annotated Types
Combine type information with metadata (descriptions, examples, constraints) for better documentation and validation.

### Field Constraints
Set boundaries on data (min/max values, string length, regex patterns) to ensure data quality.

### Computed Fields
Automatically calculate derived values that update when dependencies change. Perfect for BMI, totals, or status flags.

### Custom Validators
Implement business-specific validation logic that goes beyond basic type checking. Enforce domain rules and data integrity.

### Model Composition
Build complex data structures by nesting models. Promotes code reuse and logical data organization.

### Serialization Control
Fine-tune how models convert to dictionaries for APIs, databases, or file storage. Include/exclude fields as needed.

## Best Practices

✅ **Use Descriptive Field Names** - Clear names improve code readability

✅ **Add Field Descriptions** - Help API consumers understand data requirements

✅ **Provide Examples** - Show valid data formats in field definitions

✅ **Validate at Boundaries** - Check data quality at entry points (API, files)

✅ **Keep Validators Simple** - One validation concern per validator

✅ **Use Appropriate Types** - Choose specific types (EmailStr, HttpUrl) when available

✅ **Handle Optional Fields** - Decide between None, empty string, or omission

✅ **Group Related Fields** - Use nested models for logical data grouping

✅ **Document Constraints** - Explain why validation rules exist

✅ **Test Edge Cases** - Verify validation works for boundary values

## Real-World Applications

### API Development
Use Pydantic models for request validation in FastAPI, ensuring clean, type-safe APIs with automatic documentation.

### Data Processing
Validate and transform data from CSV, JSON, or databases before processing to prevent errors downstream.

### Configuration Management
Define application settings with validation to catch configuration errors at startup rather than runtime.

### Data Migration
Ensure data quality when moving between systems by validating against Pydantic schemas.

### Form Processing
Validate user input from web forms with detailed error messages for better user experience.

## Common Patterns

### Optional vs Required Fields
Use `Optional[Type]` for fields that can be None. Set defaults to make fields truly optional.

### Validation Order
Field validators run before model validators. Use field validators for single-field logic, model validators for cross-field logic.

### Error Handling
Pydantic raises `ValidationError` with detailed messages showing exactly what failed and why.

### Reusing Validators
Create validator functions that can be applied to multiple fields across different models.

## Learning Outcomes

After completing these examples, you'll be able to:

✓ Create robust, self-validating data models
✓ Implement custom validation logic for business rules
✓ Handle complex nested data structures
✓ Use computed properties for derived values
✓ Control data serialization for different contexts
✓ Build production-ready API request/response models
✓ Validate configuration files and user input
✓ Transform and clean data automatically

## Advanced Topics to Explore

**Custom Types** - Create reusable custom Pydantic types for your domain

**Settings Management** - Use Pydantic for application configuration with env variables

**ORM Integration** - Combine with SQLAlchemy for database models

**JSON Schema** - Generate JSON schemas from Pydantic models

**Performance** - Understand validation overhead and optimization techniques

## Resources

**Official Documentation:**
- [Pydantic V2 Docs](https://docs.pydantic.dev/) - Complete reference
- [Migration Guide](https://docs.pydantic.dev/latest/migration/) - V1 to V2 changes
- [API Reference](https://docs.pydantic.dev/latest/api/base_model/) - Detailed API docs

**Tutorials:**
- Pydantic in FastAPI applications
- Configuration management with BaseSettings
- Advanced validation patterns

**Community:**
- GitHub Discussions
- Stack Overflow pydantic tag

## Next Steps

🚀 Integrate with FastAPI to build validated APIs

📊 Add database models with SQLAlchemy + Pydantic

🔐 Implement authentication schemas with password validation

⚡ Explore async validation for external checks (API calls, DB lookups)

🧪 Write pytest tests using Pydantic models

---

**Happy Learning!** Master these fundamentals to build robust, type-safe Python applications.