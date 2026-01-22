# Complete Pydantic Learning Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Basic Models](#basic-models)
4. [Field Types](#field-types)
5. [Field Validation](#field-validation)
6. [Custom Validators](#custom-validators)
7. [Model Configuration](#model-configuration)
8. [Nested Models](#nested-models)
9. [Data Parsing and Serialization](#data-parsing-and-serialization)
10. [Advanced Field Types](#advanced-field-types)
11. [Model Inheritance](#model-inheritance)
12. [Generic Models](#generic-models)
13. [Settings Management](#settings-management)
14. [JSON Schema](#json-schema)
15. [Error Handling](#error-handling)
16. [Performance Optimization](#performance-optimization)
17. [Best Practices](#best-practices)

---

## Introduction

Pydantic is a data validation library for Python that uses Python type annotations. It's fast, extensible, and provides excellent developer experience with IDE support.

**Key Features:**
- Runtime type checking and data validation
- Automatic data parsing and conversion
- Clear error messages
- JSON Schema generation
- Settings management
- Excellent performance (written in Rust core)

**Use Cases:**
- API request/response validation (FastAPI uses Pydantic)
- Configuration management
- Data parsing from various sources
- ETL pipelines
- CLI applications

---

## Installation

```bash
# Basic installation
pip install pydantic

# With email validation support
pip install pydantic[email]

# With all optional dependencies
pip install pydantic[all]
```

**Version Note:** This guide covers Pydantic V2 (2.x). V2 has significant changes from V1.

---

## Basic Models

### Creating Your First Model

```python
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str
    age: int

# Creating an instance
user = User(id=1, name="Aayush", email="aayush@example.com", age=25)
print(user)
# Output: id=1 name='Aayush' email='aayush@example.com' age=25

print(user.name)  # Access attributes
# Output: Aayush

# Another example
user2 = User(id=2, name="Aman", email="aman@example.com", age=28)
print(f"{user2.name} - {user2.email}")
# Output: Aman - aman@example.com
```

### Automatic Type Conversion

```python
from pydantic import BaseModel

class Product(BaseModel):
    name: str
    price: float
    quantity: int

# Pydantic automatically converts compatible types
product = Product(name="Laptop", price="999.99", quantity="5")
print(product.price, type(product.price))
# Output: 999.99 
print(product.quantity, type(product.quantity))
# Output: 5 

# String to int conversion
product2 = Product(name="Mouse", price=25, quantity="10")
print(product2.quantity, type(product2.quantity))
# Output: 10 
```

### Optional Fields and Default Values

```python
from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str
    age: Optional[int] = None  # Optional field
    is_active: bool = True     # Default value
    role: str = "user"

user1 = User(id=1, name="Shiv", email="shiv@example.com")
print(user1.age)  # None
print(user1.is_active)  # True
print(user1.role)  # user

user2 = User(id=2, name="Ut", email="ut@example.com", age=30, role="admin")
print(user2.age)  # 30
print(user2.role)  # admin
```

### Model Methods

```python
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str

    def get_display_name(self) -> str:
        return f"{self.name} ({self.email})"
    
    def is_gmail_user(self) -> bool:
        return self.email.endswith("@gmail.com")

user = User(id=1, name="Aayush", email="aayush@gmail.com")
print(user.get_display_name())
# Output: Aayush (aayush@gmail.com)
print(user.is_gmail_user())
# Output: True

user2 = User(id=2, name="Aman", email="aman@yahoo.com")
print(user2.is_gmail_user())
# Output: False
```

### Working with Dictionaries

```python
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str
    age: int

# Create from dictionary
user_data = {
    "id": 1,
    "name": "Shiv",
    "email": "shiv@example.com",
    "age": 27
}
user = User(**user_data)
print(user.name)  # Shiv

# Convert to dictionary
user_dict = user.model_dump()
print(user_dict)
# Output: {'id': 1, 'name': 'Shiv', 'email': 'shiv@example.com', 'age': 27}
```

---

## Field Types

### Basic Types

```python
from pydantic import BaseModel
from typing import List, Dict, Set, Tuple

class DataTypes(BaseModel):
    # Primitive types
    integer: int
    floating: float
    string: str
    boolean: bool
    
    # Collections
    list_of_ints: List[int]
    dict_data: Dict[str, int]
    set_data: Set[str]
    tuple_data: Tuple[int, str, float]

data = DataTypes(
    integer=42,
    floating=3.14,
    string="hello",
    boolean=True,
    list_of_ints=[1, 2, 3],
    dict_data={"aayush": 95, "aman": 88},
    set_data={"python", "java", "javascript"},
    tuple_data=(1, "test", 2.5)
)

print(data.dict_data["aayush"])  # 95
print(data.set_data)  # {'python', 'java', 'javascript'}
```

### Date and Time Types

```python
from datetime import datetime, date, time, timedelta
from pydantic import BaseModel

class Event(BaseModel):
    created_at: datetime
    event_date: date
    start_time: time
    duration: timedelta
    organizer: str

event = Event(
    created_at="2024-01-15T10:30:00",
    event_date="2024-02-14",
    start_time="14:30:00",
    duration="2 days, 3:30:00",
    organizer="Aayush"
)

print(event.created_at)  # 2024-01-15 10:30:00
print(event.event_date)  # 2024-02-14
print(event.start_time)  # 14:30:00
print(event.duration)    # 2 days, 3:30:00
print(f"Event organized by: {event.organizer}")
```

### UUID and Path Types

```python
from uuid import UUID
from pathlib import Path
from pydantic import BaseModel

class FileData(BaseModel):
    id: UUID
    file_path: Path
    uploaded_by: str

data = FileData(
    id="123e4567-e89b-12d3-a456-426614174000",
    file_path="/home/aayush/documents/report.pdf",
    uploaded_by="Aayush"
)

print(type(data.id))        # 
print(type(data.file_path)) # 
print(data.uploaded_by)     # Aayush
```

### Literal Types

```python
from typing import Literal
from pydantic import BaseModel

class ServerConfig(BaseModel):
    environment: Literal["development", "staging", "production"]
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR"]
    admin_name: str

config = ServerConfig(
    environment="production", 
    log_level="INFO",
    admin_name="Shiv"
)
print(f"Server managed by: {config.admin_name}")
print(f"Environment: {config.environment}")

# This would raise a validation error:
# config = ServerConfig(environment="test", log_level="INFO", admin_name="Shiv")
```

### Union Types

```python
from typing import Union
from pydantic import BaseModel

class FlexibleData(BaseModel):
    value: Union[int, str]
    identifier: Union[int, str, None] = None
    created_by: str

data1 = FlexibleData(value=42, created_by="Ut")
data2 = FlexibleData(value="hello", identifier="abc123", created_by="Aman")

print(f"{data1.created_by} created: {data1.value}, type: {type(data1.value)}")
# Output: Ut created: 42, type: 

print(f"{data2.created_by} created: {data2.value}, type: {type(data2.value)}")
# Output: Aman created: hello, type: 
```

### List and Dict with Type Constraints

```python
from pydantic import BaseModel
from typing import List, Dict

class StudentGrades(BaseModel):
    student_name: str
    grades: List[int]
    subject_scores: Dict[str, float]

student = StudentGrades(
    student_name="Aayush",
    grades=[85, 90, 78, 92],
    subject_scores={
        "Math": 92.5,
        "Physics": 88.0,
        "Chemistry": 85.5
    }
)

print(f"{student.student_name}'s grades: {student.grades}")
print(f"Math score: {student.subject_scores['Math']}")
# Calculate average
avg = sum(student.grades) / len(student.grades)
print(f"Average: {avg}")
```

---

## Field Validation

### Field Constraints

```python
from pydantic import BaseModel, Field

class User(BaseModel):
    id: int = Field(gt=0, description="User ID must be positive")
    username: str = Field(min_length=3, max_length=20)
    age: int = Field(ge=0, le=120)
    email: str = Field(pattern=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    score: float = Field(ge=0.0, le=100.0)
    tags: list = Field(max_length=5)

user = User(
    id=1,
    username="aayush_dev",
    age=25,
    email="aayush@example.com",
    score=85.5,
    tags=["python", "pydantic", "fastapi"]
)

print(f"User: {user.username}, Score: {user.score}")
```

### Numeric Constraints

```python
from pydantic import BaseModel, Field
from decimal import Decimal

class Product(BaseModel):
    name: str
    quantity: int = Field(gt=0, lt=1000, description="Stock quantity")
    stock: int = Field(ge=0, le=10000)
    price: float = Field(gt=0, le=999999.99)
    discount: float = Field(ge=0.0, le=1.0, description="0% to 100%")
    tax_rate: Decimal = Field(ge=0, le=1, decimal_places=4)
    seller: str

product = Product(
    name="Gaming Laptop",
    quantity=50,
    stock=100,
    price=1299.99,
    discount=0.15,
    tax_rate="0.0825",
    seller="Shiv Electronics"
)

print(f"Product: {product.name}")
print(f"Seller: {product.seller}")
print(f"Price: ${product.price}, Discount: {product.discount*100}%")
```

### String Constraints

```python
from pydantic import BaseModel, Field

class UserProfile(BaseModel):
    username: str = Field(min_length=3, max_length=20)
    phone: str = Field(pattern=r'^\+?1?\d{9,15}$')
    full_name: str = Field(strip_whitespace=True)
    email: str = Field(to_lower=True)
    code: str = Field(to_upper=True)

# Example with whitespace and case conversion
profile = UserProfile(
    username="aayush_tech",
    phone="+919876543210",
    full_name="  Aayush Kumar  ",
    email="AAYUSH@EXAMPLE.COM",
    code="abc123"
)

print(f"Name: '{profile.full_name}'")  # "Aayush Kumar" (stripped)
print(f"Email: {profile.email}")        # "aayush@example.com" (lowercased)
print(f"Code: {profile.code}")          # "ABC123" (uppercased)

# Another example
profile2 = UserProfile(
    username="aman_dev",
    phone="+918765432109",
    full_name="Aman Singh",
    email="aman@gmail.com",
    code="xyz789"
)
print(f"User: {profile2.username}, Code: {profile2.code}")
```

### Collection Constraints

```python
from pydantic import BaseModel, Field
from typing import List, Dict

class ProjectData(BaseModel):
    project_name: str
    tags: List[str] = Field(min_length=1, max_length=5)
    team_members: List[str] = Field(min_length=2)
    metadata: Dict[str, str] = Field(min_length=1)

project = ProjectData(
    project_name="E-commerce Platform",
    tags=["python", "fastapi", "postgresql"],
    team_members=["Aayush", "Aman", "Shiv", "Ut"],
    metadata={
        "lead": "Aayush",
        "version": "2.0",
        "status": "active"
    }
)

print(f"Project: {project.project_name}")
print(f"Lead: {project.metadata['lead']}")
print(f"Team: {', '.join(project.team_members)}")
```

---

## Custom Validators

### Field Validators

```python
from pydantic import BaseModel, field_validator

class User(BaseModel):
    username: str
    email: str
    age: int

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v):
        if not v.replace('_', '').isalnum():
            raise ValueError('Username must be alphanumeric (underscore allowed)')
        return v

    @field_validator('email')
    @classmethod
    def email_must_contain_at(cls, v):
        if '@' not in v:
            raise ValueError('Email must contain @')
        return v

    @field_validator('age')
    @classmethod
    def age_must_be_adult(cls, v):
        if v < 18:
            raise ValueError('User must be 18 or older')
        return v

user1 = User(username="aayush_dev", email="aayush@example.com", age=25)
user2 = User(username="aman123", email="aman@gmail.com", age=28)

print(f"Users: {user1.username} and {user2.username}")
```

### Multiple Field Validation

```python
from pydantic import BaseModel, field_validator

class PasswordModel(BaseModel):
    username: str
    password: str
    confirm_password: str

    @field_validator('password')
    @classmethod
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain uppercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain digit')
        return v

    @field_validator('confirm_password')
    @classmethod
    def passwords_match(cls, v, info):
        if 'password' in info.data and v != info.data['password']:
            raise ValueError('Passwords do not match')
        return v

# Valid password
user = PasswordModel(
    username="shiv_tech",
    password="SecurePass123",
    confirm_password="SecurePass123"
)
print(f"Account created for: {user.username}")
```

### Model Validator

```python
from pydantic import BaseModel, model_validator
from datetime import datetime

class Appointment(BaseModel):
    patient_name: str
    doctor_name: str
    start_time: datetime
    end_time: datetime

    @model_validator(mode='after')
    def check_times(self):
        if self.start_time >= self.end_time:
            raise ValueError('start_time must be before end_time')
        
        duration = (self.end_time - self.start_time).total_seconds() / 60
        if duration > 180:  # 3 hours
            raise ValueError('Appointment cannot be longer than 3 hours')
        
        return self

appointment = Appointment(
    patient_name="Aayush",
    doctor_name="Dr. Aman",
    start_time="2024-02-15T10:00:00",
    end_time="2024-02-15T11:00:00"
)

print(f"Appointment: {appointment.patient_name} with {appointment.doctor_name}")
```

### Before and After Validators

```python
from pydantic import BaseModel, field_validator

class DataProcessor(BaseModel):
    username: str
    data: str

    @field_validator('data', mode='before')
    @classmethod
    def preprocess(cls, v):
        # Runs before Pydantic's validation
        if isinstance(v, bytes):
            return v.decode('utf-8')
        return v

    @field_validator('data', mode='after')
    @classmethod
    def postprocess(cls, v):
        # Runs after Pydantic's validation
        return v.strip().lower()

processor = DataProcessor(username="ut_processor", data=b"  HELLO WORLD  ")
print(f"Processed by: {processor.username}")
print(f"Data: {processor.data}")  # "hello world"
```

### Validator with Additional Logic

```python
from pydantic import BaseModel, field_validator
import re

class RegistrationForm(BaseModel):
    username: str
    email: str
    password: str
    referral_code: str = None

    @field_validator('username')
    @classmethod
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username too short')
        if len(v) > 20:
            raise ValueError('Username too long')
        if not v[0].isalpha():
            raise ValueError('Username must start with letter')
        if not re.match(r'^[a-zA-Z0-9_]+$', v):
            raise ValueError('Username can only contain letters, numbers, underscore')
        return v.lower()

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        checks = {
            'length': len(v) >= 8,
            'uppercase': any(c.isupper() for c in v),
            'lowercase': any(c.islower() for c in v),
            'digit': any(c.isdigit() for c in v),
            'special': any(c in '!@#$%^&*' for c in v)
        }
        
        failed = [k for k, val in checks.items() if not val]
        if failed:
            raise ValueError(f'Password failed: {", ".join(failed)}')
        return v

    @field_validator('referral_code')
    @classmethod
    def validate_referral(cls, v):
        if v and len(v) != 6:
            raise ValueError('Referral code must be 6 characters')
        return v.upper() if v else None

user = RegistrationForm(
    username="Aayush_Tech",
    email="aayush@example.com",
    password="MyP@ssw0rd",
    referral_code="ref123"
)

print(f"Registered: {user.username}")
print(f"Referral: {user.referral_code}")
```

---

## Model Configuration

### ConfigDict

```python
from pydantic import BaseModel, ConfigDict

class User(BaseModel):
    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_to_lower=True,
        validate_assignment=True,
        frozen=False,
        extra='forbid'
    )
    
    name: str
    email: str

user = User(name="  AAYUSH KUMAR  ", email="AAYUSH@EXAMPLE.COM")
print(user.name)   # "aayush kumar"
print(user.email)  # "aayush@example.com"

# Validation on assignment
user.email = "NEW@EXAMPLE.COM"
print(user.email)  # "new@example.com"
```

### Common Configuration Options

```python
from pydantic import BaseModel, ConfigDict

class StrictModel(BaseModel):
    model_config = ConfigDict(
        validate_assignment=True,
        frozen=False,
        populate_by_name=True,
        extra='forbid',
        str_strip_whitespace=True,
        strict=False
    )
    
    id: int
    name: str
    created_by: str

model = StrictModel(id=1, name="Project Alpha", created_by="Shiv")
print(f"Project: {model.name} by {model.created_by}")

# With validate_assignment=True, this validates
model.name = "Project Beta"
print(f"Updated: {model.name}")
```

### Aliasing Fields

```python
from pydantic import BaseModel, Field, ConfigDict

class APIUser(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    
    id: int
    user_name: str = Field(alias='userName')
    email_address: str = Field(alias='emailAddress')
    full_name: str = Field(alias='fullName')

# Can use either field name or alias
user = APIUser(
    id=1,
    userName="aayush_dev",
    emailAddress="aayush@example.com",
    fullName="Aayush Kumar"
)

print(user.user_name)      # aayush_dev
print(user.email_address)  # aayush@example.com
print(user.full_name)      # Aayush Kumar

# Serialization with aliases
print(user.model_dump(by_alias=True))
# {'id': 1, 'userName': 'aayush_dev', 'emailAddress': 'aayush@example.com', 'fullName': 'Aayush Kumar'}
```

### Frozen Models (Immutable)

```python
from pydantic import BaseModel, ConfigDict

class ImmutableUser(BaseModel):
    model_config = ConfigDict(frozen=True)
    
    id: int
    name: str
    email: str

user = ImmutableUser(id=1, name="Ut", email="ut@example.com")
print(f"User: {user.name}")

# This will raise an error
try:
    user.name = "Updated Name"
except Exception as e:
    print(f"Error: Cannot modify frozen model")
```

### Extra Fields Handling

```python
from pydantic import BaseModel, ConfigDict

# Forbid extra fields
class StrictUser(BaseModel):
    model_config = ConfigDict(extra='forbid')
    name: str
    email: str

# Allow extra fields
class FlexibleUser(BaseModel):
    model_config = ConfigDict(extra='allow')
    name: str
    email: str

# Ignore extra fields
class IgnoreUser(BaseModel):
    model_config = ConfigDict(extra='ignore')
    name: str
    email: str

# This works
flexible = FlexibleUser(name="Aman", email="aman@example.com", age=28, city="Delhi")
print(flexible.name)
print(flexible.age)  # Extra field accessible

# Extra fields ignored
ignore_user = IgnoreUser(name="Shiv", email="shiv@example.com", phone="123456")
print(ignore_user.name)
# print(ignore_user.phone)  # Would raise AttributeError
```

---

## Nested Models

### Basic Nested Models

```python
from pydantic import BaseModel
from typing import List

class Address(BaseModel):
    street: str
    city: str
    state: str
    zip_code: str

class User(BaseModel):
    name: str
    email: str
    address: Address

user = User(
    name="Aayush",
    email="aayush@example.com",
    address={
        "street": "123 Main St",
        "city": "Mumbai",
        "state": "Maharashtra",
        "zip_code": "400001"
    }
)

print(f"User: {user.name}")
print(f"City: {user.address.city}")
print(f"Full Address: {user.address.street}, {user.address.city}")
```

### Complex Nested Structures

```python
from pydantic import BaseModel
from typing import List, Optional

class Skill(BaseModel):
    name: str
    level: int  # 1-10
    years_experience: float

class Project(BaseModel):
    title: str
    description: str
    technologies: List[str]
    team_size: int

class Developer(BaseModel):
    name: str
    email: str
    skills: List[Skill]
    projects: List[Project]
    mentor: Optional[str] = None

developer = Developer(
    name="Aayush",
    email="aayush@example.com",
    skills=[
        {"name": "Python", "level": 9, "years_experience": 5.5},
        {"name": "FastAPI", "level": 8, "years_experience": 3.0},
        {"name": "PostgreSQL", "level": 7, "years_experience": 4.0}
    ],
    projects=[
        {
            "title": "E-commerce API",
            "description": "RESTful API for online store",
            "technologies": ["Python", "FastAPI", "PostgreSQL"],
            "team_size": 4
        },
        {
            "title": "Analytics Dashboard",
            "description": "Real-time data visualization",
            "technologies": ["Python", "Pandas", "Plotly"],
            "team_size": 3
        }
    ],
    mentor="Aman"
)

print(f"Developer: {developer.name}")
print(f"Mentor: {developer.mentor}")
print(f"Skills: {len(developer.skills)}")
for skill in developer.skills:
    print(f"  - {skill.name}: Level {skill.level}")

print(f"Projects: {len(developer.projects)}")
for project in developer.projects:
    print(f"  - {project.title} (Team: {project.team_size})")
```

### Deeply Nested Models

```python
from pydantic import BaseModel
from typing import List
from datetime import datetime

class Comment(BaseModel):
    author: str
    content: str
    created_at: datetime

class Post(BaseModel):
    title: str
    content: str
    author: str
    comments: List[Comment]
    tags: List[str]

class Blog(BaseModel):
    blog_name: str
    owner: str
    posts: List[Post]

blog = Blog(
    blog_name="Tech Insights",
    owner="Shiv",
    posts=[
        {
            "title": "Getting Started with Pydantic",
            "content": "Pydantic is amazing...",
            "author": "Aayush",
            "comments": [
                {
                    "author": "Aman",
                    "content": "Great article!",
                    "created_at": "2024-01-15T10:30:00"
                },
                {
                    "author": "Ut",
                    "content": "Very helpful, thanks!",
                    "created_at": "2024-01-15T11:45:00"
                }
            ],
            "tags": ["python", "pydantic", "tutorial"]
        }
    ]
)

print(f"Blog: {blog.blog_name} by {blog.owner}")
print(f"Posts: {len(blog.posts)}")

for post in blog.posts:
    print(f"\nPost: {post.title} by {post.author}")
    print(f"Tags: {', '.join(post.tags)}")
    print(f"Comments: {len(post.comments)}")
    for comment in post.comments:
        print(f"  - {comment.author}: {comment.content}")
```

### Circular References

```python
from pydantic import BaseModel
from typing import List, Optional, ForwardRef

# Forward reference for circular dependency
EmployeeRef = ForwardRef('Employee')

class Department(BaseModel):
    name: str
    manager: str
    employees: List[EmployeeRef] = []

class Employee(BaseModel):
    name: str
    employee_id: int
    email: str
    department: Optional[Department] = None

# Update forward references
Department.model_rebuild()

# Create department with employees
dept = Department(
    name="Engineering",
    manager="Aman",
    employees=[
        {
            "name": "Aayush",
            "employee_id": 101,
            "email": "aayush@company.com"
        },
        {
            "name": "Shiv",
            "employee_id": 102,
            "email": "shiv@company.com"
        }
    ]
)

print(f"Department: {dept.name}")
print(f"Manager: {dept.manager}")
print(f"Employees:")
for emp in dept.employees:
    print(f"  - {emp.name} (ID: {emp.employee_id})")
```

---

## Data Parsing and Serialization

### JSON Parsing

```python
from pydantic import BaseModel
from typing import List
import json

class Student(BaseModel):
    name: str
    roll_number: int
    subjects: List[str]
    grade: float

# JSON string
json_data = '''
{
    "name": "Aayush",
    "roll_number": 101,
    "subjects": ["Math", "Physics", "Chemistry"],
    "grade": 8.5
}
'''

# Parse from JSON string
student = Student.model_validate_json(json_data)
print(f"Student: {student.name}")
print(f"Grade: {student.grade}")
print(f"Subjects: {', '.join(student.subjects)}")

# Convert to JSON
json_output = student.model_dump_json(indent=2)
print("\nJSON Output:")
print(json_output)
```

### Dictionary Conversion

```python
from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    product_id: int
    name: str
    price: float
    seller: str
    description: Optional[str] = None

# From dictionary
product_dict = {
    "product_id": 1,
    "name": "Wireless Mouse",
    "price": 599.99,
    "seller": "Ut Electronics",
    "description": "Ergonomic wireless mouse"
}

product = Product(**product_dict)
print(f"Product: {product.name} by {product.seller}")

# To dictionary
output_dict = product.model_dump()
print(output_dict)

# Exclude fields
output_without_desc = product.model_dump(exclude={'description'})
print(output_without_desc)

# Include only specific fields
output_basic = product.model_dump(include={'name', 'price'})
print(output_basic)
```

### Handling Multiple Objects

```python
from pydantic import BaseModel
from typing import List

class Employee(BaseModel):
    name: str
    employee_id: int
    department: str
    salary: float

# List of dictionaries
employees_data = [
    {"name": "Aayush", "employee_id": 101, "department": "Engineering", "salary": 75000},
    {"name": "Aman", "employee_id": 102, "department": "Marketing", "salary": 65000},
    {"name": "Shiv", "employee_id": 103, "department": "HR", "salary": 60000},
    {"name": "Ut", "employee_id": 104, "department": "Engineering", "salary": 70000}
]

# Parse multiple employees
employees = [Employee(**data) for data in employees_data]

print("All Employees:")
for emp in employees:
    print(f"  {emp.name} - {emp.department} - ${emp.salary:,.2f}")

# Filter engineering employees
eng_employees = [emp for emp in employees if emp.department == "Engineering"]
print(f"\nEngineering Department: {len(eng_employees)} employees")
for emp in eng_employees:
    print(f"  - {emp.name}")
```

### Model Copy and Update

```python
from pydantic import BaseModel

class UserProfile(BaseModel):
    username: str
    email: str
    age: int
    city: str

original = UserProfile(
    username="aayush_dev",
    email="aayush@example.com",
    age=25,
    city="Mumbai"
)

# Create a copy with updates
updated = original.model_copy(update={"city": "Delhi", "age": 26})

print(f"Original: {original.username} in {original.city}, age {original.age}")
print(f"Updated: {updated.username} in {updated.city}, age {updated.age}")

# Deep copy with nested models
from typing import List

class Address(BaseModel):
    street: str
    city: str

class Person(BaseModel):
    name: str
    addresses: List[Address]

person = Person(
    name="Aman",
    addresses=[
        {"street": "123 Main St", "city": "Mumbai"},
        {"street": "456 Park Ave", "city": "Delhi"}
    ]
)

# Deep copy
person_copy = person.model_copy(deep=True)
person_copy.addresses[0].city = "Bangalore"

print(f"Original first city: {person.addresses[0].city}")  # Mumbai
print(f"Copy first city: {person_copy.addresses[0].city}")  # Bangalore
```

---

## Advanced Field Types

### EmailStr and HttpUrl

```python
from pydantic import BaseModel, EmailStr, HttpUrl

class SocialProfile(BaseModel):
    username: str
    email: EmailStr
    website: HttpUrl
    github: HttpUrl

profile = SocialProfile(
    username="aayush_tech",
    email="aayush@example.com",
    website="https://aayush.dev",
    github="https://github.com/aayush"
)

print(f"Email: {profile.email}")
print(f"Website: {profile.website}")
print(f"GitHub: {profile.github}")
```

### Constrained Types

```python
from pydantic import BaseModel, constr, conint, confloat, conlist
from typing import List

class ProductListing(BaseModel):
    product_code: constr(min_length=5, max_length=10, to_upper=True)
    quantity: conint(ge=1, le=1000)
    price: confloat(gt=0, le=1000000)
    tags: conlist(str, min_length=1, max_length=5)
    seller_name: str

product = ProductListing(
    product_code="abc123",  # Will be converted to "ABC123"
    quantity=50,
    price=999.99,
    tags=["electronics", "gadgets"],
    seller_name="Shiv Store"
)

print(f"Product Code: {product.product_code}")
print(f"Seller: {product.seller_name}")
print(f"Price: ${product.price}")
```

### Secret Types

```python
from pydantic import BaseModel, SecretStr

class DatabaseConfig(BaseModel):
    host: str
    username: str
    password: SecretStr
    database: str
    admin: str

config = DatabaseConfig(
    host="localhost",
    username="aayush",
    password="super_secret_password_123",
    database="myapp_db",
    admin="Aman"
)

print(f"Host: {config.host}")
print(f"Username: {config.username}")
print(f"Password: {config.password}")  # Output: **********
print(f"Admin: {config.admin}")

# Get actual password value
actual_password = config.password.get_secret_value()
print(f"Actual password length: {len(actual_password)}")
```

### File Types

```python
from pydantic import BaseModel, FilePath, DirectoryPath
from pathlib import Path

class FileConfig(BaseModel):
    config_file: FilePath
    data_directory: DirectoryPath
    uploaded_by: str

# Note: These paths must actually exist for validation
# This is just an example structure
class FileMetadata(BaseModel):
    filename: str
    size_bytes: int
    uploader: str
    file_type: str

metadata = FileMetadata(
    filename="report.pdf",
    size_bytes=2048576,
    uploader="Ut",
    file_type="application/pdf"
)

print(f"File: {metadata.filename}")
print(f"Size: {metadata.size_bytes / 1024:.2f} KB")
print(f"Uploaded by: {metadata.uploader}")
```

### IPvAnyAddress and Json Types

```python
from pydantic import BaseModel, IPvAnyAddress, Json
from typing import Any

class ServerInfo(BaseModel):
    server_name: str
    ip_address: IPvAnyAddress
    config: Json[Any]
    admin: str

server = ServerInfo(
    server_name="web-server-01",
    ip_address="192.168.1.100",
    config='{"timeout": 30, "max_connections": 100}',
    admin="Aayush"
)

print(f"Server: {server.server_name}")
print(f"IP: {server.ip_address}")
print(f"Admin: {server.admin}")
print(f"Config: {server.config}")
print(f"Timeout: {server.config['timeout']}")
```

---

## Model Inheritance

### Basic Inheritance

```python
from pydantic import BaseModel
from typing import Optional

class Person(BaseModel):
    name: str
    email: str
    age: int

class Student(Person):
    roll_number: int
    grade: str
    gpa: float

class Teacher(Person):
    employee_id: int
    subject: str
    years_experience: int

student = Student(
    name="Aayush",
    email="aayush@school.com",
    age=20,
    roll_number=101,
    grade="A",
    gpa=8.5
)

teacher = Teacher(
    name="Aman",
    email="aman@school.com",
    age=35,
    employee_id=501,
    subject="Mathematics",
    years_experience=10
)

print(f"Student: {student.name}, Grade: {student.grade}")
print(f"Teacher: {teacher.name}, Subject: {teacher.subject}")
```

### Multiple Inheritance

```python
from pydantic import BaseModel
from datetime import datetime

class Timestamped(BaseModel):
    created_at: datetime
    updated_at: datetime

class Authored(BaseModel):
    author: str
    editor: Optional[str] = None

class Article(Timestamped, Authored):
    title: str
    content: str
    views: int = 0

article = Article(
    title="Introduction to Pydantic",
    content="Pydantic is a data validation library...",
    author="Shiv",
    editor="Ut",
    created_at="2024-01-15T10:00:00",
    updated_at="2024-01-16T14:30:00"
)

print(f"Article: {article.title}")
print(f"Author: {article.author}, Editor: {article.editor}")
print(f"Created: {article.created_at}")
print(f"Views: {article.views}")
```

### Abstract Base Models

```python
from pydantic import BaseModel
from abc import ABC, abstractmethod
from typing import List

class Shape(BaseModel, ABC):
    name: str
    color: str
    
    @abstractmethod
    def area(self) -> float:
        pass
    
    @abstractmethod
    def perimeter(self) -> float:
        pass

class Rectangle(Shape):
    width: float
    height: float
    
    def area(self) -> float:
        return self.width * self.height
    
    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

class Circle(Shape):
    radius: float
    
    def area(self) -> float:
        return 3.14159 * self.radius ** 2
    
    def perimeter(self) -> float:
        return 2 * 3.14159 * self.radius

rectangle = Rectangle(name="Box", color="red", width=10, height=5)
circle = Circle(name="Disc", color="blue", radius=7)

print(f"{rectangle.name}: Area = {rectangle.area()}, Perimeter = {rectangle.perimeter()}")
print(f"{circle.name}: Area = {circle.area():.2f}, Perimeter = {circle.perimeter():.2f}")
```

---

## Generic Models

### Basic Generic Models

```python
from pydantic import BaseModel
from typing import Generic, TypeVar, List

T = TypeVar('T')

class Response(BaseModel, Generic[T]):
    status: str
    message: str
    data: T
    processed_by: str

class UserData(BaseModel):
    name: str
    email: str

# Generic response with UserData
user_response = Response[UserData](
    status="success",
    message="User retrieved successfully",
    data=UserData(name="Aayush", email="aayush@example.com"),
    processed_by="Aman"
)

print(f"Status: {user_response.status}")
print(f"User: {user_response.data.name}")
print(f"Processed by: {user_response.processed_by}")

# Generic response with list
list_response = Response[List[str]](
    status="success",
    message="Items retrieved",
    data=["item1", "item2", "item3"],
    processed_by="Shiv"
)

print(f"\nItems: {', '.join(list_response.data)}")
```

### Paginated Response

```python
from pydantic import BaseModel
from typing import Generic, TypeVar, List

T = TypeVar('T')

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    page_size: int
    requested_by: str
    
    @property
    def total_pages(self) -> int:
        return (self.total + self.page_size - 1) // self.page_size

class Product(BaseModel):
    id: int
    name: str
    price: float

products = [
    Product(id=1, name="Laptop", price=999.99),
    Product(id=2, name="Mouse", price=29.99),
    Product(id=3, name="Keyboard", price=79.99)
]

paginated = PaginatedResponse[Product](
    items=products,
    total=50,
    page=1,
    page_size=10,
    requested_by="Ut"
)

print(f"Page {paginated.page} of {paginated.total_pages}")
print(f"Showing {len(paginated.items)} of {paginated.total} items")
print(f"Requested by: {paginated.requested_by}")
for product in paginated.items:
    print(f"  - {product.name}: ${product.price}")
```

---

## Settings Management

### Basic Settings

```python
from pydantic_settings import BaseSettings
from pydantic import Field

class AppSettings(BaseSettings):
    app_name: str = "MyApp"
    admin_email: str = Field(default="admin@example.com")
    database_url: str
    secret_key: str
    debug: bool = False
    admin_name: str = "Aayush"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Usage (would typically read from .env file)
# For demonstration, we'll create it directly
settings = AppSettings(
    database_url="postgresql://localhost/mydb",
    secret_key="supersecretkey123"
)

print(f"App: {settings.app_name}")
print(f"Admin: {settings.admin_name} ({settings.admin_email})")
print(f"Debug mode: {settings.debug}")
```

### Environment-Specific Settings

```python
from pydantic_settings import BaseSettings
from typing import Literal

class Settings(BaseSettings):
    environment: Literal["development", "staging", "production"]
    database_host: str
    database_port: int = 5432
    database_name: str
    redis_host: str = "localhost"
    redis_port: int = 6379
    api_key: str
    configured_by: str = "DevOps Team"
    
    class Config:
        env_prefix = "APP_"
        case_sensitive = False

# Example settings
dev_settings = Settings(
    environment="development",
    database_host="localhost",
    database_name="myapp_dev",
    api_key="dev_api_key_123"
)

print(f"Environment: {dev_settings.environment}")
print(f"Database: {dev_settings.database_host}:{dev_settings.database_port}/{dev_settings.database_name}")
print(f"Configured by: {dev_settings.configured_by}")
```

### Complex Settings with Nested Models

```python
from pydantic_settings import BaseSettings
from pydantic import BaseModel

class DatabaseSettings(BaseModel):
    host: str = "localhost"
    port: int = 5432
    username: str
    password: str
    database: str

class RedisSettings(BaseModel):
    host: str = "localhost"
    port: int = 6379
    password: str = None

class AppSettings(BaseSettings):
    app_name: str = "E-commerce Platform"
    version: str = "2.0.0"
    database: DatabaseSettings
    redis: RedisSettings
    debug: bool = False
    maintainer: str = "Aman"
    
    class Config:
        env_nested_delimiter = "__"

# Would typically load from environment/file
settings = AppSettings(
    database=DatabaseSettings(
        username="aayush",
        password="pass123",
        database="ecommerce_db"
    ),
    redis=RedisSettings(
        password="redis_pass"
    )
)

print(f"App: {settings.app_name} v{settings.version}")
print(f"Maintainer: {settings.maintainer}")
print(f"Database: {settings.database.host}:{settings.database.port}")
print(f"Redis: {settings.redis.host}:{settings.redis.port}")
```

---

## JSON Schema

### Generating JSON Schema

```python
from pydantic import BaseModel, Field
from typing import List
import json

class Address(BaseModel):
    street: str = Field(description="Street address")
    city: str = Field(description="City name")
    country: str = Field(description="Country name")

class User(BaseModel):
    """User model representing a system user"""
    name: str = Field(description="Full name of the user")
    email: str = Field(description="Email address")
    age: int = Field(description="Age in years", ge=0, le=120)
    addresses: List[Address] = Field(description="List of addresses")
    role: str = Field(default="user", description="User role")

# Generate JSON schema
schema = User.model_json_schema()
print(json.dumps(schema, indent=2))

# Create instance
user = User(
    name="Shiv Kumar",
    email="shiv@example.com",
    age=28,
    addresses=[
        Address(street="123 Main St", city="Mumbai", country="India")
    ]
)
```

### Custom JSON Schema

```python
from pydantic import BaseModel, Field
from typing import List

class Product(BaseModel):
    product_id: int = Field(
        description="Unique product identifier",
        examples=[1, 2, 3]
    )
    name: str = Field(
        description="Product name",
        examples=["Laptop", "Mouse", "Keyboard"]
    )
    price: float = Field(
        description="Product price in USD",
        gt=0,
        examples=[999.99, 29.99]
    )
    tags: List[str] = Field(
        description="Product tags for categorization",
        examples=[["electronics", "computers"]]
    )
    seller: str = Field(
        description="Seller name",
        examples=["Ut Electronics", "Aayush Store"]
    )

# Generate schema with examples
schema = Product.model_json_schema()

# Create sample product
product = Product(
    product_id=1,
    name="Gaming Laptop",
    price=1299.99,
    tags=["gaming", "computers", "electronics"],
    seller="Aayush Tech Store"
)

print(f"Product: {product.name} by {product.seller}")
print(f"Price: ${product.price}")
```

---

## Error Handling

### Basic Error Handling

```python
from pydantic import BaseModel, ValidationError
from typing import List

class Student(BaseModel):
    name: str
    age: int
    grade: float
    subjects: List[str]

try:
    # This will fail validation
    student = Student(
        name="Aayush",
        age="invalid_age",  # Should be int
        grade=8.5,
        subjects=["Math", "Physics"]
    )
except ValidationError as e:
    print("Validation Error!")
    print(e)
    print("\nError details:")
    for error in e.errors():
        print(f"Field: {error['loc']}")
        print(f"Error: {error['msg']}")
        print(f"Type: {error['type']}\n")
```

### Custom Error Messages

```python
from pydantic import BaseModel, field_validator, ValidationError

class UserRegistration(BaseModel):
    username: str
    email: str
    password: str
    age: int

    @field_validator('username')
    @classmethod
    def username_valid(cls, v):
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters long')
        if not v.isalnum():
            raise ValueError('Username must contain only letters and numbers')
        return v

    @field_validator('age')
    @classmethod
    def age_valid(cls, v):
        if v < 18:
            raise ValueError('You must be at least 18 years old to register')
        if v > 100:
            raise ValueError('Please enter a valid age')
        return v

try:
    user = UserRegistration(
        username="ab",  # Too short
        email="aman@example.com",
        password="pass123",
        age=16  # Too young
    )
except ValidationError as e:
    print("Registration failed!")
    for error in e.errors():
        field = error['loc'][0]
        message = error['msg']
        print(f"  • {field}: {message}")
```

### Validation Context

```python
from pydantic import BaseModel, field_validator
from typing import Optional

class UpdateProfile(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    age: Optional[int] = None
    updated_by: str

    @field_validator('username')
    @classmethod
    def username_not_empty(cls, v):
        if v is not None and len(v.strip()) == 0:
            raise ValueError('Username cannot be empty')
        return v

    @field_validator('email')
    @classmethod
    def email_format(cls, v):
        if v is not None and '@' not in v:
            raise ValueError('Invalid email format')
        return v

# Valid update
try:
    update1 = UpdateProfile(
        username="shiv_updated",
        email="shiv_new@example.com",
        updated_by="Admin Aayush"
    )
    print(f"Profile updated by: {update1.updated_by}")
    print(f"New username: {update1.username}")
except ValidationError as e:
    print(f"Update failed: {e}")
```

---

## Performance Optimization

### Model Validation Modes

```python
from pydantic import BaseModel, ConfigDict, field_validator
from typing import List
import time

class OptimizedModel(BaseModel):
    model_config = ConfigDict(
        # Faster validation, less type coercion
        strict=False,
        # Skip validation for assignments
        validate_assignment=False,
        # Don't validate default values
        validate_default=False
    )
    
    id: int
    name: str
    values: List[int]
    created_by: str

# Create many instances
start = time.time()
models = []
for i in range(10000):
    model = OptimizedModel(
        id=i,
        name=f"item_{i}",
        values=[1, 2, 3, 4, 5],
        created_by="Ut"
    )
    models.append(model)

end = time.time()
print(f"Created 10,000 models in {end - start:.4f} seconds")
print(f"First model: {models[0].name} by {models[0].created_by}")
```

### Reusing Models

```python
from pydantic import BaseModel
from typing import List

class CachedUser(BaseModel):
    id: int
    name: str
    email: str

# Reuse model structure
users_data = [
    {"id": 1, "name": "Aayush", "email": "aayush@example.com"},
    {"id": 2, "name": "Aman", "email": "aman@example.com"},
    {"id": 3, "name": "Shiv", "email": "shiv@example.com"}
]

# Efficient bulk creation
users = [CachedUser.model_validate(data) for data in users_data]

print(f"Created {len(users)} users efficiently")
for user in users:
    print(f"  - {user.name}")
```

---

## Best Practices

### 1. Use Type Hints Consistently

```python
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class BestPracticeModel(BaseModel):
    # Always use specific types
    id: int  # Not just: id
    name: str
    tags: List[str]  # Not: tags: list
    metadata: Dict[str, str]  # Not: metadata: dict
    created_at: datetime
    optional_field: Optional[str] = None
    owner: str

model = BestPracticeModel(
    id=1,
    name="Example",
    tags=["python", "pydantic"],
    metadata={"version": "1.0", "author": "Aayush"},
    created_at=datetime.now(),
    owner="Aman"
)
```

### 2. Use Field for Better Documentation

```python
from pydantic import BaseModel, Field

class DocumentedModel(BaseModel):
    user_id: int = Field(
        description="Unique user identifier",
        gt=0,
        examples=[1, 2, 3]
    )
    username: str = Field(
        description="Username for login",
        min_length=3,
        max_length=20,
        examples=["aayush_dev", "aman_tech"]
    )
    email: str = Field(
        description="User email address",
        examples=["aayush@example.com"]
    )
    role: str = Field(
        default="user",
        description="User role in the system"
    )

user = DocumentedModel(
    user_id=1,
    username="shiv_admin",
    email="shiv@example.com",
    role="admin"
)
```

### 3. Validation Best Practices

```python
from pydantic import BaseModel, field_validator
import re

class SecureUser(BaseModel):
    username: str
    email: str
    password: str

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        # Use proper email validation
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v.lower()

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        # Comprehensive password validation
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain lowercase letter')
        if not re.search(r'\d', v):
            raise ValueError('Password must contain digit')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Password must contain special character')
        return v

user = SecureUser(
    username="ut_secure",
    email="UT@EXAMPLE.COM",  # Will be lowercased
    password="SecureP@ss123"
)

print(f"User: {user.username}")
print(f"Email: {user.email}")  # Output: ut@example.com
```

### 4. Error Handling Pattern

```python
from pydantic import BaseModel, ValidationError
from typing import Optional

class UserInput(BaseModel):
    name: str
    age: int
    email: str

def create_user(data: dict) -> Optional[UserInput]:
    """Safe user creation with error handling"""
    try:
        user = UserInput(**data)
        print(f"User created: {user.name}")
        return user
    except ValidationError as e:
        print("Failed to create user:")
        for error in e.errors():
            field = '.'.join(str(loc) for loc in error['loc'])
            print(f"  • {field}: {error['msg']}")
        return None

# Test with valid data
user1 = create_user({
    "name": "Aayush",
    "age": 25,
    "email": "aayush@example.com"
})

# Test with invalid data
user2 = create_user({
    "name": "Aman",
    "age": "invalid",
    "email": "not_an_email"
})
```

### 5. Configuration Management Pattern

```python
from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache

class Settings(BaseSettings):
    # Application settings
    app_name: str = "My Application"
    version: str = "1.0.0"
    
    # Database settings
    database_url: str = Field(default="sqlite:///./app.db")
    
    # API settings
    api_key: str
    api_timeout: int = 30
    
    # Admin settings
    admin_name: str = "Shiv"
    admin_email: str = "admin@example.com"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance"""
    return Settings(api_key="demo_key_123")

# Usage
settings = get_settings()
print(f"App: {settings.app_name} v{settings.version}")
print(f"Admin: {settings.admin_name}")
```

---

## Complete Real-World Example

```python
from pydantic import BaseModel, Field, field_validator, EmailStr
from typing import List, Optional
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"
    MODERATOR = "moderator"

class Address(BaseModel):
    street: str
    city: str
    state: str
    zip_code: str = Field(pattern=r'^\d{5}(-\d{4})?)
    country: str = "India"

class User(BaseModel):
    user_id: int = Field(gt=0, description="Unique user ID")
    username: str = Field(min_length=3, max_length=20)
    email: EmailStr
    full_name: str
    age: int = Field(ge=18, le=120)
    role: UserRole = UserRole.USER
    address: Optional[Address] = None
    interests: List[str] = Field(max_length=10)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    is_active: bool = True
    created_by: str

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v):
        if not v.replace('_', '').isalnum():
            raise ValueError('Username must be alphanumeric')
        return v.lower()

    @field_validator('interests')
    @classmethod
    def interests_not_empty(cls, v):
        if not v:
            raise ValueError('At least one interest is required')
        return [interest.lower() for interest in v]

    def display_info(self) -> str:
        return f"{self.full_name} (@{self.username}) - {self.role.value}"

# Create a complete user
user = User(
    user_id=1,
    username="Aayush_Dev",
    email="aayush@example.com",
    full_name="Aayush Kumar",
    age=25,
    role=UserRole.ADMIN,
    address=Address(
        street="123 Tech Street",
        city="Mumbai",
        state="Maharashtra",
        zip_code="400001"
    ),
    interests=["Python", "FastAPI", "Machine Learning", "DevOps"],
    created_by="System Admin"
)

print(user.display_info())
print(f"Email: {user.email}")
print(f"Location: {user.address.city}, {user.