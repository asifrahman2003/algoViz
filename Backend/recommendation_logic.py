def recommend_sorting(data_type, data_size, real_time):
    """
    Recommends the best sorting algorithm based on:
    - Data type (e.g., numbers or strings).
    - Data size (e.g., small or large datasets).
    - Whether real-time processing is required.
    """

    # Recommendation logic
    if data_type == "numbers":
        if real_time:
            # For real-time processing, prioritize algorithms like HeapSort
            return "HeapSort"
        elif data_size < 100:
            # For small datasets, InsertionSort is efficient
            return "InsertionSort"
        elif data_size < 1000:
            # For moderately sized datasets, MergeSort is stable
            return "MergeSort"
        else:
            # For very large datasets, QuickSort is generally the fastest
            return "QuickSort"
    elif data_type == "strings":
        # RadixSort is effective for strings, especially when digit-based sorting is applicable
        return "RadixSort"
    else:
        # Default to ShellSort for uncommon scenarios
        return "ShellSort"
