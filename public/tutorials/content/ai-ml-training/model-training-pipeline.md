## The Full ML Pipeline

Building a production ML system is much more than training a model. Data collection, cleaning, feature engineering, validation, deployment, and monitoring each require careful attention. In production, the model code is often <em>less than 5%</em> of the total system.

<div class="flow-steps">

**Data Collection** — Gather raw data from APIs, DBs, logs

**Data Cleaning** — Fix missing values, remove duplicates

**Augmentation** — Expand dataset with synthetic variations

**Feature Engineering** — Create informative input features

**Train** — Fit model on training set

**Validate** — Tune hyperparameters on val set

**Test** — Final evaluation on held-out data

**Deploy** — Serve model in production

**Monitor** — Track drift, errors, performance

</div>

### Data Collection

The quality of your data determines the ceiling of your model's performance. No amount of training can fix bad data.

- <strong>APIs & Databases:</strong> Structured data from internal systems
- <strong>Web Scraping:</strong> Collecting public data (respecting robots.txt)
- <strong>User-Generated:</strong> Labels from annotations, feedback, interactions
- <strong>Synthetic Data:</strong> Generated data to fill gaps or handle rare cases
- <strong>Third-Party Datasets:</strong> Pre-existing datasets (Kaggle, HuggingFace, etc.)

### Data Cleaning & Preprocessing

| Problem | Solution | Tool/Method |
| --- | --- | --- |
| Missing values | Impute with mean/median/mode or drop | pandas fillna(), SimpleImputer |
| Duplicates | Identify and remove duplicate records | pandas drop_duplicates() |
| Outliers | Cap at percentiles or remove | IQR method, Z-score filtering |
| Inconsistent formats | Standardize dates, categories, units | Custom parsing, regex |
| Class imbalance | Oversample minority, undersample majority | SMOTE, random oversampling |

### Feature Engineering

Feature engineering transforms raw data into informative inputs that help the model learn. Good features can make a simple model outperform a complex one with raw features.

```python title="feature_engineering.py"
import numpy as np

# Example: feature engineering for house price prediction
def engineer_features(data: dict) -> dict:
    """Transform raw data into ML-ready features."""
    features = {}

    # Numeric: normalize to [0, 1]
    features['sqft_norm'] = data['sqft'] / 5000.0
    features['bedrooms_norm'] = data['bedrooms'] / 10.0

    # Derived: create new informative features
    features['price_per_sqft'] = data['price'] / max(data['sqft'], 1)
    features['room_ratio'] = data['bedrooms'] / max(data['bathrooms'], 1)
    features['age'] = 2026 - data['year_built']

    # Binning: convert continuous to categorical
    features['age_bucket'] = (
        'new' if features['age'] < 10
        else 'mid' if features['age'] < 30
        else 'old'
    )

    # Interaction: combine features
    features['size_x_bedrooms'] = features['sqft_norm'] * features['bedrooms_norm']

    return features

# Raw data
house = {'sqft': 2000, 'bedrooms': 3, 'bathrooms': 2,
         'price': 450000, 'year_built': 2005}

features = engineer_features(house)
for k, v in features.items():
    print(f"  {k}: {v}")
```

### Data Versioning

Just like code has Git, ML datasets need versioning. When you retrain a model and get different results, you need to know whether the data changed. Tools like <strong>DVC</strong> (Data Version Control) track dataset versions alongside code.

<div class="callout callout-caution">

<strong>Reproducibility crisis:</strong> Without data versioning, you can't reproduce results. If training data changes silently (new records, removed outliers), the same code will produce a different model. Always version your data.

</div>

### Deployment & Monitoring

Deploying a model is just the beginning. Models degrade over time as real-world data drifts from training data.

- <strong>Model Serving:</strong> REST API, batch prediction, or edge deployment
- <strong>Data Drift:</strong> Monitor if input distribution changes (new user behavior)
- <strong>Concept Drift:</strong> Monitor if the relationship between inputs and outputs changes
- <strong>Performance Metrics:</strong> Track accuracy, latency, throughput in production
- <strong>Retraining Triggers:</strong> Automatic retraining when performance drops below threshold

### Key Takeaways

1. Production ML is 95% data engineering and infrastructure, 5% model code
2. Feature engineering can be more impactful than choosing a fancier model
3. Always version your data alongside your code — reproducibility is critical
4. Models degrade over time — monitor for data drift and concept drift
5. The pipeline is a cycle: deploy → monitor → retrain → redeploy

