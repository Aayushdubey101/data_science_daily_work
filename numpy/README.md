# 🧮 Numerical Computing with NumPy (Week 5)

This directory hosts in-depth reference notebooks detailing advanced vector math, multi-dimensional array slicing, element-wise array broadcasting, and missing value processing.

---

## 📂 Sub-Directory Structure

*   📁 **[`fundamentals/`](./fundamentals/)**
    *   `numpy_arrays.ipynb`: Constructing arrays from list models, initialization helpers (`zeros`, `ones`, `arange`).
    *   `array_attributes.ipynb`: Slices, dimensions (`ndim`), shapes (`shape`), memory representations (`dtype`).
    *   `array_operations.ipynb`: Arithmetic operations, vector scalars, fast execution.
    *   `vector_operations.ipynb`: Dot product calculations, matrix multiplication, element operations.
    *   `reshaping.ipynb`: Manipulating configurations with `.reshape()`, flattening (`.flatten()`, `.ravel()`).
*   📁 **[`advanced_numpy/`](./advanced_numpy/)**
    *   `indexing.ipynb`: Slicing dimensions, strides, pointer views vs copies.
    *   `fancy_indexing.ipynb`: Integer-array indexing models, complex coordinate selections.
    *   `boolean_indexing.ipynb`: Extracting items using criteria masks, query selections.
    *   `broadcasting.ipynb`: Rules, expanding dimensions, combining shapes.
    *   `missing_values.ipynb`: Handling NaNs, masking empty items, data cleaning steps.
*   📁 **[`numpy_tricks/`](./numpy_tricks/)**
    *   `sort.ipynb`: Vector sorting, indices tracking (`argsort`).
    *   `concatenate.ipynb`: Combining datasets vertically/horizontally (`hstack`, `vstack`, `concatenate`).
    *   `percentile.ipynb`: Mathematical percentile checks, median, standard deviations.
    *   `set_functions.ipynb`: Standard operations (`unique`, `intersect1d`, `union1d`).

---

## 🎯 Learning Outcomes
*   Explain the memory advantages of contiguous C-arrays over traditional Python lists.
*   Apply vectorization techniques to eliminate costly nested loops in scientific code.
*   Navigate multi-dimensional slicing safely, avoiding implicit mutations on shared memory views.
*   Master array broadcasting rules to execute operations on differently shaped tensors.

---

## 📋 Revision Checklist
*   [x] Broad Casting Rule: Match from right to left. Dimensions are compatible if equal, or if one is 1.
*   [x] Fancy indexing returns a copied array; basic slicing returns a view.
*   [x] Mask NaN elements using `np.isnan(arr)` to clean datasets.
*   [x] Vector operations execute in compiled C extensions, boosting execution speeds.
