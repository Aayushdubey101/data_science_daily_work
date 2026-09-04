# ⚙️ Advanced Python Programming Reference (Weeks 3 & 4)

This directory features detailed reference guides and notebooks covering Object-Oriented Programming (OOP) architectures, robust error boundaries, metaprogramming through decorators, and highly memory-efficient lazy evaluations.

---

## 📂 Sub-Directory Structure

*   📁 **[`oop/`](./oop/)**
    *   `classes_objects.ipynb`: Blueprinting data, self references, instantiations.
    *   `constructors.ipynb`: Customizing initialization with `__init__` vs `__new__`.
    *   `self_keyword.ipynb`: Binding instance methods, self pointer mechanics in memory.
    *   `magic_methods.ipynb`: Operator overloading (`__str__`, `__repr__`, `__len__`, `__getitem__`).
    *   `encapsulation.ipynb`: Private variable naming (`_`, `__`), setter/getter configurations, properties.
    *   `static_methods.ipynb`: Class-level utilities with `@classmethod` and `@staticmethod`.
    *   `inheritance.ipynb`: Code reuse, super class referencing, multiple inheritance models.
    *   `polymorphism.ipynb`: Runtime method overriding, duck typing in dynamic environments.
    *   `abstraction.ipynb`: Abstract base classes (`ABC`) and defining concrete APIs.
    *   `oop_project.ipynb`: Fully functional retail checkout system implementing OOP concepts.
*   📁 **[`file_handling/`](./file_handling/)**
    *   `file_io.ipynb`: Safe context managers (`with`), text/binary reading and writing.
    *   `json_serialization.ipynb`: Converting dynamic objects to JSON and parsed reading.
    *   `pickle.ipynb`: Persistent Python object preservation, risks, and security precautions.
*   📁 **[`exception_handling/`](./exception_handling/)**
    *   `exception_handling.ipynb`: Catching errors with `try-except-else-finally` blocks.
    *   `custom_exceptions.ipynb`: Creating clean domain exceptions by extending `Exception`.
*   📁 **[`decorators/`](./decorators/)**
    *   `decorators.ipynb`: Meta-programming, logging hooks, timer execution, wrappers.
    *   `namespaces.ipynb`: Enclosing environment scopes, closures, tracking inner states.
*   📁 **[`iterators/`](./iterators/)**
    *   `iterators.ipynb`: Iteration protocol details (`__iter__`, `__next__`), writing custom iterable classes.
*   📁 **[`generators/`](./generators/)**
    *   `generators.ipynb`: Lazy evaluation, `yield` expressions, building memory-efficient pipelines.

---

## 🎯 Learning Outcomes
*   Architect maintainable models utilizing standard SOLID OOP design patterns.
*   Construct resilient file handling and serialization routines with solid exceptions.
*   Inject cross-cutting concerns (logging, timing, caching) cleanly using custom decorators.
*   Implement highly optimized, memory-efficient data pipelines utilizing iterators and generators.

---

## 📋 Revision Checklist
*   [x] MRO is resolved via C3 Linearization (visible in `MyClass.__mro__`).
*   [x] Encapsulation in Python is syntactic (name mangling `_ClassName__var`), not rigid access denial.
*   [x] `yield` pauses execution state; it does not destroy stack context like `return`.
*   [x] Standard exception syntax should always capture explicit warnings (`ValueError`) over bare `except:`.
