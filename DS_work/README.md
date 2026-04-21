# Trader Performance vs Market Sentiment — Primetrade.ai Assignment

**Author:** Aayush Dubey  
**Role Applied:** Data Science / Analytics Intern  

---

## Overview

This project analyzes how Bitcoin Fear/Greed market sentiment relates to trader behavior and performance on the Hyperliquid perpetuals exchange. The goal is to surface actionable patterns that inform smarter trading strategies.

---

## Datasets

| Dataset | File | Description |
|---------|------|-------------|
| Bitcoin Fear/Greed Index | `fear_greed_index.csv` | Daily sentiment score + classification (Extreme Fear → Extreme Greed) |
| Hyperliquid Trader History | `historical_data.csv` | Per-trade records: account, coin, execution price, size, PnL, fees, timestamps |

---

## Setup & How to Run

### Requirements

```bash
pip install pandas numpy matplotlib seaborn scipy scikit-learn jupyter
```

### Run the notebook

```bash
cd DS_work
jupyter notebook analysis.ipynb
```

Run cells top-to-bottom. All charts are saved as `.png` files in the same directory.

---

## Methodology

### 1. Data Preparation
- Parsed `Timestamp IST` (DD-MM-YYYY format) → date-level alignment with Fear/Greed index
- Computed `net_pnl = Closed PnL − Fee` for each trade
- Aggregated to **daily trader-level metrics**: PnL, win rate, trade count, position size, long/short ratio
- Merged datasets on `date`; only days present in both datasets are analyzed

### 2. Analysis Approach

**Part A — Data Cleaning:** Shape reporting, null/duplicate detection, timestamp normalization, numeric coercion  

**Part B — Core Analysis:**
- PnL & win rate split by `Fear` vs `Greed` binary sentiment (Mann-Whitney U for significance)
- 5-day rolling PnL as drawdown proxy, grouped by sentiment
- Behavioral metrics: trades/day, position size, long-short ratio by sentiment class
- 3 trader segments:
  - **High vs Low Volume** (median split on avg daily volume)
  - **Frequent vs Infrequent** (median split on trades/active day)
  - **Consistent Winners vs Net Losers vs Inconsistent** (total PnL + win rate threshold)
- Cross-tab: segment × sentiment → median daily PnL
- Cumulative PnL timeline with sentiment background shading

**Bonus:**
- Gradient Boosting classifier (5-fold CV, ROC-AUC) to predict next-day profitability bucket using sentiment + behavioral features
- K-Means clustering (k=4) to identify behavioral archetypes; elbow curve for k selection

---

## Key Insights

| # | Insight | Evidence |
|---|---------|----------|
| 1 | **Fear days suppress PnL and win rates across all trader segments** | Median daily PnL is lower on Fear days; Mann-Whitney U test confirms statistical significance |
| 2 | **Traders chase longs in Greed and crowd shorts in Fear — a predictable herding pattern** | Long/Short ratio rises monotonically from Extreme Fear → Extreme Greed |
| 3 | **Consistent Winners are more resilient in Fear** | Their median PnL on Fear days is less negative vs Net Losers; lower drawdown probability |
| 4 | **Position sizes inflate during Greed — amplifying both upside and drawdown risk** | Avg trade size and daily volume increase materially on Greed days |
| 5 | **Extreme sentiment days show higher PnL variance, not just lower returns** | Std of daily PnL is elevated in Extreme Fear and Extreme Greed — a volatility-of-volatility effect |

---

## Strategy Recommendations

### Strategy 1 — Sentiment-Aware Position Sizing
> On **Extreme Fear** days, reduce nominal position size to 50% of the trailing 7-day average. On **Greed** days, allow full size. On **Extreme Greed**, apply a 20% haircut (overheated market risk).

**Rationale:** Fear days statistically produce lower PnL and higher drawdown probability. Cutting size limits capital at risk during adverse regimes without exiting the market entirely.  
**Best for:** High Volume traders — their large positions amplify Fear-day losses the most.

---

### Strategy 2 — Contrarian Directional Bias for Consistent Winners
> Consistent Winners should maintain or increase short bias during Fear and flip to measured longs during Greed. Infrequent traders should avoid adding longs during Extreme Fear entirely.

**Rationale:** The L/S ratio data shows the crowd is almost always long-biased in Greed and short-biased in Fear. Consistent Winners who avoid this herding behavior generate better risk-adjusted returns.  
**Best for:** Consistent Winner segment; contrarian execution reduces crowded-trade slippage.

---

### Strategy 3 — Trade Frequency Throttle on Extreme Sentiment Days
> On **Extreme Fear** or **Extreme Greed** days, cap daily trade count to 60–70% of a trader's rolling 7-day average.

**Rationale:** Frequent traders show elevated PnL variance (not higher median) on extreme sentiment days, indicating emotional overtrading. Reducing frequency on these days preserves capital and reduces fee drag.  
**Best for:** Frequent trader segment — most prone to overtrading under sentiment extremes.

---

## Output Charts

| File | Description |
|------|-------------|
| `chart_01_pnl_winrate_by_sentiment.png` | Median PnL, Win Rate, PnL distribution by sentiment |
| `chart_02_behavior_by_sentiment.png` | Trade frequency, position size, L/S ratio by sentiment |
| `chart_03_long_bias.png` | Long trade % across all 5 sentiment classes |
| `chart_04_segment_pnl.png` | Median PnL by segment × sentiment cross-tab |
| `chart_05_cumulative_pnl_timeline.png` | Cumulative aggregate PnL with sentiment shading |
| `chart_06_feature_importance.png` | (Bonus) Feature importance for profitability prediction |
| `chart_07_clusters.png` | (Bonus) K-Means behavioral archetypes |

---

## Reproducibility

- All random seeds fixed (`random_state=42`)
- No external API calls — fully offline
- `scikit-learn` is optional; core Parts A–C run without it
