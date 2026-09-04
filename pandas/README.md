# 🐼 Data Wrangling with Pandas (Weeks 6, 7 & 8)

This directory features highly detailed study notes, code references, and complete real-world case studies demonstrating data wrangling, multi-level framing, database-style merging, and time series parsing.

---

## 📂 Sub-Directory Structure

*   📁 **[`series/`](./series/)**
    *   `pandas_series.ipynb`: Vector alignment, mapping indexes, element configurations.
    *   `series_methods.ipynb`: Statistics methods (`.describe()`, `.value_counts()`, `.map()`).
    *   `boolean_indexing.ipynb`: Slicing records with conditional filters.
*   📁 **[`dataframe/`](./dataframe/)**
    *   `dataframe_creation.ipynb`: Instantiating structures from lists, dicts, arrays.
    *   `read_csv.ipynb`: Customizing parsing options, chunk loading, encoding specifications.
    *   `dataframe_methods.ipynb`: Essential frame manipulations (`.info()`, `.head()`, `.drop()`).
    *   `filtering.ipynb`: Multi-conditional filters using `.loc[]` and `.iloc[]`.
    *   `adding_columns.ipynb`: Dynamic feature building, column re-assignments.
*   📁 **[`groupby/`](./groupby/)**
    *   `groupby_basics.ipynb`: The Split-Apply-Combine mechanic, simple group splits.
    *   `aggregation.ipynb`: Custom multi-level aggregations (`.agg()`), transforms.
*   📁 **[`merge_join_concat/`](./merge_join_concat/)**
    *   `merge.ipynb`: Inner, outer, left, and right dataset merges.
    *   `join.ipynb`: Merging databases on index constraints.
    *   `concat.ipynb`: Stacking series/dataframes across rows or columns.
*   📁 **[`case_studies/`](./case_studies/)**
    *   `startup_funding_case_study.ipynb`: Fully documented deep-dive analysis of startup funding.
*   📁 **[`multiindex/`](./multiindex/)**
    *   `multiindex_series.ipynb`: Dynamic multi-level series, slice selections.
    *   `multiindex_dataframe.ipynb`: Pivoted hierarchical columns/indexes, index-slicing.
    *   `stack_unstack.ipynb`: Pivot-like operations to transpose data structures.
*   📁 **[`pivot_tables/`](./pivot_tables/)**
    *   `pivot_table.ipynb`: Building tabular summaries, margins, custom aggregations.
*   📁 **[`datetime/`](./datetime/)**
    *   `pandas_datetime.ipynb`: String parsing, datetime frequencies, offsets.
*   📁 **[`string_operations/`](./string_operations/)**
    *   `vectorized_string_operations.ipynb`: Dynamic regex text processing using `.str` accessor.
*   📁 **[`time_series/`](./time_series/)**
    *   `time_series_case_study.ipynb`: Complete portfolio-grade time series case study.
    *   `textual_data_case_study.ipynb`: Real-world text data processing, parsing patterns, NLP preprocessing.

---

## 🎯 Learning Outcomes
*   Ingest, inspect, clean, and pre-process tabular files of any size.
*   Apply complex relational operations (inner/outer joins, alignments).
*   Implement powerful aggregation pipelines using the Split-Apply-Combine model.
*   Analyze temporal and textual datasets utilizing vector methods.

---

## 📋 Revision Checklist
*   [x] Loc vs Iloc: `.loc` is label-based (inclusive of stop bounds), while `.iloc` is integer-index based (exclusive of stop bounds).
*   [x] Avoid using loops (`iterrows`) inside pandas! Use vectorized functions, `.apply()`, or `.map()` for optimal performance.
*   [x] Unstack shifts Index levels to Column levels; Stack does the opposite.
*   [x] Set standard datetime columns using `pd.to_datetime(df['date'])` to unlock time accessors (`.dt`).
