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
        # Define a helper function to find outliers for a given column using the 1.5 IQR method
        def get_outliers(col):
            # Calculate the first quartile (Q1) and third quartile (Q3)
            q1 = col.quantile(0.25)
            q3 = col.quantile(0.75)
            
            # Calculate the interquartile range (IQR)
            iqr = q3 - q1
            
            # Find the outliers using the 1.5 IQR method (values outside the range [Q1 - 1.5 * IQR, Q3 + 1.5 * IQR])
            outliers = col[(col < (q1 - 1.5 * iqr)) | (col > (q3 + 1.5 * iqr))].index.tolist()
            
            return outliers

        # Create a dictionary to store rows with outliers for each numeric column
        outlier_rows = {}
        
        # Iterate through each column in the DataFrame
        for column in self.df.columns:
            # Check if the data type of the column is numeric (int64 or float64)
            if self.df[column].dtype in ['int64', 'float64']:
                # If the column is numeric, find the outliers using the helper function and store them in the dictionary
                outlier_rows[column] = get_outliers(self.df[column])
        
        # Return the dictionary containing rows with outliers for each numeric column
        return outlier_rows

        return {}

    def generate_report(self) -> Dict[str, Any]:
        report = {
            "UNIFORMITY": self.check_uniformity(),
            "DUPLICATE_ROWS": self.check_duplicates(),
            "MISSING_VALUE_ROWS": self.check_missing_values(),
            "OUTLIERS": self.check_outliers(),
        }
        return report
