# 🚀 Professional Data Science & Python Learning Repository

Welcome to my **Data Science Mentor Program (DSMP 2.0)** learning and development portfolio! This repository serves as a comprehensive, structured study resource and project portfolio, capturing my journey from the fundamentals of Python programming to advanced Data Science concepts (Weeks 1–8).

Every notebook is structured as highly detailed, human-written study notes featuring conceptual overviews, visual mental models, practical code implementations, common pitfalls, interview-focused questions, and hands-on exercises.

---

## 🗺️ Repository Map & Directory Structure

This repository is organized logically by core discipline and DSMP syllabus weeks:

*   📂 **[`python/`](./python/)** (Weeks 1 & 2)
    *   `basics/`: Core programming concepts, type conversions, literals, input/output.
    *   `control_flow/`: Operators, conditional logic, while/for loops, custom modules.
    *   `strings/`: String indexing, slicing, standard operations, and helper functions.
    *   `problem_solving/`: Loop interview challenges, complexity analysis (Big O).
    *   `data_structures/`: In-depth study of Lists, Tuples, Sets, Dictionaries, and Comprehensions.
    *   `functions/`: Positional/keyword arguments, nested functions, lambdas, map/filter/reduce.
*   📂 **[`advanced_python/`](./advanced_python/)** (Weeks 3 & 4)
    *   `oop/`: Custom classes, constructors, magic methods, encapsulation, inheritance, polymorphism, abstraction, and a comprehensive OOP retail project.
    *   `file_handling/`: File I/O, JSON serialization, and object persistence using Pickle.
    *   `exception_handling/`: Robust try-except designs and building domain-specific custom exceptions.
    *   `decorators/`: Decorator functions, nested namespaces, and closure models.
    *   `iterators/` & `generators/`: Lazy evaluation, custom iterables, memory-efficient streams.
*   📂 **[`numpy/`](./numpy/)** (Week 5)
    *   `fundamentals/`: ND-array creation, attributes, basic reshaping, and vector math.
    *   `advanced_numpy/`: Advanced/fancy/boolean indexing, broadcasting mechanics, handling missing values.
    *   `numpy_tricks/`: Sorting, concatenation, percentiles, and set operations.
*   📂 **[`pandas/`](./pandas/)** (Weeks 6, 7 & 8)
    *   `series/` & `dataframe/`: Creation, IO, core filtering, indexing, and standard manipulation methods.
    *   `groupby/`: Split-Apply-Combine paradigms, multi-aggregations.
    *   `merge_join_concat/`: Inner/left/right/outer merges, horizontal/vertical concatenations.
    *   `multiindex/` & `pivot_tables/`: Complex hierarchical indexing, unstacking, multi-dimensional pivots.
    *   `datetime/` & `string_operations/`: Vectorized text processing, datetime parses, offsets, and lag features.
    *   `case_studies/`: Deep-dive portfolio projects (Startup Funding and Time Series).
*   📂 **[`visualization/`](./visualization/)**
    *   `matplotlib/`: Advanced customization of subplots, figures, styles, and static charts.
    *   `plotly/`: Interactive, reactive dashboard plots and web charts.
*   📂 **[`backend/`](./backend/)**
    *   `fastapi/`: Production APIs, routing, server setup, validation.
    *   `pydantic/`: Data validation, type coercion, configurations, and settings schemas.
*   📂 **[`machine_learning/`](./machine_learning/)**
    *   `ml_apps/`: Core machine learning notebooks, algorithms, and models.
*   📂 **[`projects/`](./projects/)**
    *   `trader_performance_analysis/`: Performance review, clusters, fear-greed correlations, and win-rate analysis.
    *   `lmstudio_chat/`: Custom AI interface utilizing LLM local APIs.
*   📂 **[`datasets/`](./datasets/)**
    *   `raw/`: Source CSV/Excel data files used in all case studies and exercises.

---

## 🎯 Progress Tracker

| Syllabus Phase | Focus Area | Status | Core Achievements |
| :--- | :--- | :---: | :--- |
| **Week 1** | Basics of Python Programming | 🟢 Complete | Syntax, operators, string slicing, loop logic & big-O |
| **Week 2** | Python Data Types & Functions | 🟢 Complete | Advanced DS methods, comprehensions, higher-order functions |
| **Week 3** | Object-Oriented Programming | 🟢 Complete | Custom classes, magic methods, absolute encapsulation, projects |
| **Week 4** | Advanced Python Concepts | 🟢 Complete | Custom file-IO pipelines, custom exceptions, decorators, lazy iterators |
| **Week 5** | NumPy Numerical Engines | 🟢 Complete | Broadcasting rules, fancy indexing, nan handling, vector tricks |
| **Week 6** | Pandas Series & DataFrames | 🟢 Complete | Core IO routines, index-alignment, standard query & column builders |
| **Week 7** | Advanced Pandas Data-Wrangling | 🟢 Complete | GroupBy pipelines, complex merges/joins, Startup Funding Case Study |
| **Week 8** | Hierarchical Indexing & Time Series | 🟢 Complete | MultiIndex frames, stack/unstack, rolling windows, date offsets |

---

## 💡 Important Learning Takeaways

1.  **Readability Matters:** Python is written to be read. Clear naming, minimal nested scopes, and PEP 8 alignment make code maintainable.
2.  **Memory Optimization:** Avoid loading giant datasets blindly. Use generators for file I/O, select memory-efficient NumPy datatypes, and write vectorized Pandas operations instead of iterating over rows.
3.  **Encapsulation is Key:** Real-world projects require robust error boundaries. Custom exceptions and explicit OOP encapsulation prevent subtle side-effects.

---

## 📋 Quick Revision Checklist

*   [x] String slicing indices: `str[start:end:step]` (stop is exclusive).
*   [x] List mutable vs Tuple immutable reference mechanics.
*   [x] Constructor chaining and Method Resolution Order (`MRO`) in multiple inheritance.
*   [x] Decorator execution sequence and preserving function signatures using `functools.wraps`.
*   [x] NumPy Broadcasting: Dimensions must be equal or one of them must be 1.
*   [x] Pandas Index Alignment: Calculations are matched by index labels, not positions.
*   [x] Split-Apply-Combine patterns using `.groupby()` and Custom Aggregation functions.
*   [x] MultiIndex manipulations: slicing with `IndexSlice` and swapping levels.
