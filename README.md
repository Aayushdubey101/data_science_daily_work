# Data Science Daily Work

A comprehensive workspace for daily data science projects, experiments, and learning activities. This repository contains various datasets, analysis notebooks, API developments, and exploratory work across multiple data science domains.

## Repository Structure

```
data_science_daily_work/
├── Api_work/              # API development using FastAPI and machine learning integration
├── DS_work/               # Data Science projects, analysis, and visualization scripts
├── csv_data/              # Collection of datasets organized by date and topic
│   ├── 30-Jan/           # Smartphone datasets
│   ├── 4-Feb/            # Cleaned smartphone data
│   ├── 10-Feb/           # City location data
│   ├── 18-Feb/           # Sales and order datasets
│   ├── 24-Feb/           # Flight data
│   ├── dataset-session-* # Session-specific datasets (Bollywood, IPL, FIFA, IMDB, etc.)
│   └── pandas-case-study/# Pandas practice datasets
├── matplotlip/            # Matplotlib visualizations and advanced plotting techniques
├── ml/                    # Machine learning models, apps, and integrations (e.g. lmstudio)
├── ploty/                 # Plotly interactive visualizations and projects
├── pydantic_learn/        # Pydantic data validation learning and implementation
└── test/                  # Jupyter notebooks for testing and experimentation
    └── t*.ipynb          # Test notebooks (t1-t6)
```

## Datasets Overview

### Sales & Business Data
- Order management and sales target datasets (18-Feb)
- Customer data and transaction records

### Sports Analytics
- IPL cricket statistics (Virat Kohli performance data)
- FIFA World Cup 2022 data

### Transportation & Location
- Flight data (cleaned datasets)
- City location information

### Technology & Finance
- Smartphone specifications and pricing
- Google (GOOGL) stock data

### Entertainment
- IMDB Top 1000 movies
- Bollywood film industry data

## Key Learning Modules & Projects

- **API Development (`Api_work/`)**: Building and deploying machine learning models via REST APIs using FastAPI.
- **Data Science Projects (`DS_work/`)**: Comprehensive data analysis and modeling projects, including sentiment analysis and behavior tracking.
- **Machine Learning (`ml/`)**: Various ML implementations, predictive models, and integrations with tools like LM Studio.
- **Data Visualization (`matplotlip/` & `ploty/`)**: Practice notebooks focusing on static and interactive visualizations using Matplotlib and Plotly.
- **Data Validation (`pydantic_learn/`)**: Deep dive into robust data validation and settings management using Pydantic.

## Tools & Technologies

- **Languages:** Python
- **Data Manipulation:** Pandas, NumPy
- **Visualization:** Matplotlib, Seaborn, Plotly
- **Machine Learning:** Scikit-learn, and various ML models
- **API Frameworks:** FastAPI
- **Data Validation:** Pydantic
- **Development Tools:** Jupyter Notebooks, VS Code
- **Formats:** Excel/CSV data formats

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/data_science_daily_work.git
cd data_science_daily_work
```

2. Install required dependencies. For basic data science work:
```bash
pip install pandas numpy jupyter matplotlib seaborn plotly openpyxl
```

*(Note: Some folders like `Api_work` or `pydantic_learn` might require additional dependencies such as `fastapi`, `uvicorn`, and `pydantic`. Please refer to the specific folder's requirements.)*

3. Launch Jupyter Notebook:
```bash
jupyter notebook
```

4. Navigate through the folders to explore notebooks and scripts.

## Usage

This repository is organized chronologically and by topic, making it easy to:
- Track daily learning progress
- Experiment with different datasets
- Practice data cleaning, analysis, and visualization techniques
- Build and deploy machine learning models and APIs
- Build portfolio projects

## Contributing

This is a personal learning repository, but suggestions and feedback are welcome!

## License

This project is open source and available for educational purposes.
