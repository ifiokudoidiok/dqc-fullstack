from typing import Dict, Any, List, Tuple
import pandas as pd


# - **UNIFORMITY** Is the data in the same format (per column)?
# - **DUPLICATES** Are no duplicates in the data?
# - **MISSING VALUES** Are there any null / missing values?
# - **OUTLIERS** Any outliers in the data (per column)?




column_name = str


class DataClass:
    def __init__(self, path: str, separator: str = ",") -> None:
        self.df: pd.DataFrame = pd.read_csv(path, sep=separator)

    def check_uniformity(self) -> Dict[column_name, List[int]]:
        # Create a dictionary to store non-uniform rows for each column
        non_uniform_rows = {}
        
        # Iterate through each column in the DataFrame
        for column in self.df.columns:
            # Convert the column to numeric data type, setting non-numeric elements to NaN
            is_numeric = pd.to_numeric(self.df[column], errors="coerce").notna()
            
            # Check if there is at least one numeric element and at least one non-numeric element in the column
            if is_numeric.sum() > 0 and is_numeric.sum() < len(self.df):
                # If both numeric and non-numeric elements are present, add the non-numeric rows to the dictionary
                non_uniform_rows[column] = self.df[~is_numeric].index.tolist()
        
        # Return the dictionary containing non-uniform rows for each column
        return non_uniform_rows

    def check_duplicates(self) -> List[Tuple[int]]:
        # Find rows that are duplicated in the DataFrame, considering all columns (keep=False)
        duplicate_rows = self.df[self.df.duplicated(keep=False)]
        
        # Group the duplicated rows by their contents across all columns
        grouped_duplicates = duplicate_rows.groupby(duplicate_rows.columns.tolist())
        
        # Create a list of tuples containing the row indexes for each duplicate group
        # The tuple structure represents (row_index_1, row_index_2, ..., row_index_n) for each duplicate group
        duplicate_groups = [tuple(group.index.tolist()) for _, group in grouped_duplicates]
        
        # Return the list of duplicate groups
        return duplicate_groups

    def check_missing_values(self) -> List[int]:
        # Check for rows with missing (null) values in the DataFrame
        rows_with_missing_values = self.df[self.df.isnull().any(axis=1)]
        
        # Extract the row indexes of the rows with missing values and convert them to a list
        rows_with_missing_values_indexes = rows_with_missing_values.index.tolist()
        
        # Return the list of row indexes with missing values
        return rows_with_missing_values_indexes

    def check_outliers(self) -> Dict[column_name, List[int]]:
        # Outliers are defined by the 1.5 IQR method.
        # see https://towardsdatascience.com/why-1-5-in-iqr-method-of-outlier-detection-5d07fdc82097
        # for a detailed explanation
        # Return a dict mapping column name to a list of row indexes which are outliers

        return {}

    def generate_report(self) -> Dict[str, Any]:
        report = {
            "UNIFORMITY": self.check_uniformity(),
            "DUPLICATE_ROWS": self.check_duplicates(),
            "MISSING_VALUE_ROWS": self.check_missing_values(),
            "OUTLIERS": self.check_outliers(),
        }
        return report
