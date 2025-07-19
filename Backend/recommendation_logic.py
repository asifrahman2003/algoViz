def recommend_sorting(data_type, data_size, real_time):
    """
    Recommends the best sorting algorithm based on:
    - Data type (e.g., 'numbers' or 'strings')
    - Data size (e.g., small, medium, large)
    - Whether real-time processing is required
    """

    if not isinstance(data_size, int) or data_size < 0:
        return "Invalid input"

    data_type = data_type.lower()

    if data_type == "numbers":
        if real_time:
            return "HeapSort"
        if data_size < 100:
            return "InsertionSort"
        elif data_size < 1000:
            return "MergeSort"
        else:
            return "QuickSort"
    elif data_type == "strings":
        return "RadixSort"
    else:
        return "ShellSort"
