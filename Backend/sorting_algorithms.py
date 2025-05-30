def bubble_sort_steps(arr):
    steps = [{"step": arr.copy(), "code": "Initial array"}]
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                steps.append({
                    "step": arr.copy(),
                    "code": f"Swapped {arr[j]} and {arr[j+1]} at positions {j} and {j+1}"
                })
    return steps


def merge_sort_steps(arr):
    steps = []

    def merge_sort_recursive(arr):
        if len(arr) > 1:
            mid = len(arr) // 2
            L = arr[:mid]
            R = arr[mid:]

            merge_sort_recursive(L)
            merge_sort_recursive(R)

            i = j = k = 0
            while i < len(L) and j < len(R):
                if L[i] < R[j]:
                    arr[k] = L[i]
                    i += 1
                else:
                    arr[k] = R[j]
                    j += 1
                k += 1
                steps.append(arr.copy())

            while i < len(L):
                arr[k] = L[i]
                i += 1
                k += 1
                steps.append(arr.copy())

            while j < len(R):
                arr[k] = R[j]
                j += 1
                k += 1
                steps.append(arr.copy())

    merge_sort_recursive(arr)
    return steps


def quick_sort_steps(arr):
    steps = []

    def quick_sort_recursive(arr, low, high):
        if low < high:
            pi = partition(arr, low, high)
            quick_sort_recursive(arr, low, pi - 1)
            quick_sort_recursive(arr, pi + 1, high)

    def partition(arr, low, high):
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                steps.append(arr.copy())
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        steps.append(arr.copy())
        return i + 1

    quick_sort_recursive(arr, 0, len(arr) - 1)
    return steps


def selection_sort_steps(arr):
    steps = [arr.copy()]
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        steps.append(arr.copy())
    return steps


def insertion_sort_steps(arr):
    steps = [arr.copy()]
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
            steps.append(arr.copy())
        arr[j + 1] = key
        steps.append(arr.copy())
    return steps


def heap_sort_steps(arr):
    steps = []

    def heapify(arr, n, i):
        largest = i
        l = 2 * i + 1
        r = 2 * i + 2
        if l < n and arr[i] < arr[l]:
            largest = l
        if r < n and arr[largest] < arr[r]:
            largest = r
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            steps.append(arr.copy())
            heapify(arr, n, largest)

    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        steps.append(arr.copy())
        heapify(arr, i, 0)
    return steps


def radix_sort_steps(arr):
    steps = [arr.copy()]

    def counting_sort(arr, exp):
        n = len(arr)
        output = [0] * n
        count = [0] * 10

        for i in range(n):
            index = arr[i] // exp
            count[index % 10] += 1

        for i in range(1, 10):
            count[i] += count[i - 1]

        i = n - 1
        while i >= 0:
            index = arr[i] // exp
            output[count[index % 10] - 1] = arr[i]
            count[index % 10] -= 1
            i -= 1

        for i in range(n):
            arr[i] = output[i]
            steps.append(arr.copy())

    max_num = max(arr)
    exp = 1
    while max_num // exp > 0:
        counting_sort(arr, exp)
        exp *= 10
    return steps


def shell_sort_steps(arr):
    steps = [arr.copy()]
    n = len(arr)
    gap = n // 2

    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
                steps.append(arr.copy())
            arr[j] = temp
            steps.append(arr.copy())
        gap //= 2
    return steps


def get_sorting_steps(method, array):
    sorting_methods = {
        "bubble": bubble_sort_steps,
        "merge": merge_sort_steps,
        "quick": quick_sort_steps,
        "selection": selection_sort_steps,
        "insertion": insertion_sort_steps,
        "heap": heap_sort_steps,
        "radix": radix_sort_steps,
        "shell": shell_sort_steps,
    }

    if method not in sorting_methods:
        raise ValueError(f"Sorting method '{method}' not supported.")

    return sorting_methods[method](array.copy())
