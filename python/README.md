# 🐍 Python Core Programming Reference (Weeks 1 & 2)

This directory contains complete study notes, interactive notebooks, and practical implementations covering the absolute fundamentals of Python through advanced functional programming constructs.

---

## 📂 Sub-Directory Structure

*   📁 **[`basics/`](./basics/)**
    *   `python_basics.ipynb`: Syntax entrypoint, indentation rules, and simple expressions.
    *   `print_function.ipynb`: Formatting techniques, `sep`, `end`, and string interpolation (`f-strings`).
    *   `data_types.ipynb`: In-depth coverage of numeric, sequence, set, and mapping types.
    *   `variables.ipynb`: Dynamic reference binding, garbage collection, and naming best practices.
    *   `comments.ipynb`: Write readable docstrings (PEP 257) vs standard comments.
    *   `keywords_identifiers.ipynb`: Identifiers naming rules and reserved keywords.
    *   `user_input.ipynb`: Interacting with shell inputs, validation strategies.
    *   `type_conversion.ipynb`: Implicit coercion vs explicit casting (`int()`, `float()`, `str()`).
    *   `literals.ipynb`: Exploring raw strings, escape characters, and literal notations.
*   📁 **[`control_flow/`](./control_flow/)**
    *   `operators.ipynb`: Arithmetic, comparison, logical, bitwise, assignment, identity (`is`), membership (`in`).
    *   `if_else.ipynb`: Ternary conditionals, nested branch logic, clean branch patterns.
    *   `while_loop.ipynb`: Sentinel control, infinite loops, looping state management.
    *   `for_loop.ipynb`: Loop over iterables, index tracking with `enumerate()`, nested iterations.
    *   `modules.ipynb`: Importing, package structure, standard modules (`math`, `sys`, `os`).
*   📁 **[`strings/`](./strings/)**
    *   `strings_intro.ipynb`: Memory representations (unicode, immutability).
    *   `indexing.ipynb`: Index ranges, negative tracking.
    *   `slicing.ipynb`: Formula `[start:stop:step]`, reversing strings, stride logic.
    *   `string_operations.ipynb`: Concatenation, repetition, and formatted templates.
    *   `string_functions.ipynb`: Methods like `.strip()`, `.split()`, `.join()`, `.replace()`, `.find()`.
*   📁 **[`problem_solving/`](./problem_solving/)**
    *   `loop_problems.ipynb`: Classic interview puzzles (Fibonacci, primes, nested patterns).
    *   `break_continue_pass.ipynb`: Loop modifiers and when to use `pass`.
    *   `time_complexity.ipynb`: Big-O notation, nested loop complexity analysis, spatial tradeoffs.
*   📁 **[`data_structures/`](./data_structures/)**
    *   `lists.ipynb`: Dynamic sizing, lists methods, nested indexing, mutability tracking.
    *   `tuples.ipynb`: Immutable structures, packing/unpacking, list vs tuple memory performance.
    *   `sets.ipynb`: Mathematical set operations (union, intersection, difference), hashing requirements.
    *   `dictionaries.ipynb`: Key-value lookups, hashing collision models, dict methods, nesting.
    *   `comprehensions.ipynb`: Syntactic sugar for list, set, and dict generators.
    *   `zip_function.ipynb`: Multi-iterable alignment and unzipping.
*   📁 **[`functions/`](./functions/)**
    *   `functions.ipynb`: Reusability, positional vs keyword parameters, default values.
    *   `args_kwargs.ipynb`: Writing flexible APIs with `*args` and `**kwargs`.
    *   `variable_scope.ipynb`: Explaining LEGB rule (Local, Enclosing, Global, Built-in) and `global` / `nonlocal` keys.
    *   `nested_functions.ipynb`: Parent-child scope bindings, basic closures.
    *   `lambda_functions.ipynb`: Anonymous operations, sorting keys, practical short functions.
    *   `higher_order_functions.ipynb`: Accepting functions as arguments or returning functions.
    *   `map_filter_reduce.ipynb`: Functional programming paradigms on sequences, memory benefits.

---

## 🎯 Learning Outcomes
*   Master core syntax, data types, and logical control flow constructs.
*   Understand sequence data models, indexing boundaries, and collection characteristics.
*   Design clean, reusable functional blocks using scoping best practices and higher-order paradigms.
*   Analyze runtime performance using Big-O models to construct optimal loops and list comprehensions.

---

## 📋 Revision Checklist
*   [x] String immutability: Re-assigning variables creates new memory bindings; it does not change the original string.
*   [x] Default mutable arguments: Never use empty lists `def func(x=[])`. Use `def func(x=None)` instead.
*   [x] Explain LEGB resolution order.
*   [x] Map/Filter return dynamic lazy iterators, not concrete lists.
