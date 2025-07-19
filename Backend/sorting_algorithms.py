def bubble_sort_steps(arr):
    steps = [{"step": arr.copy(), "code": "Initial array"}]
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                steps.append({
                    "step": arr.copy(),
                    "code": f"Swapped positions {j} and {j + 1}: {arr[j]} <-> {arr[j + 1]}"
                })
    return steps


def selection_sort_steps(arr):
    steps = [{"step": arr.copy(), "code": "Initial array"}]
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            steps.append({
                "step": arr.copy(),
                "code": f"Swapped positions {i} and {min_idx}: {arr[i]} <-> {arr[min_idx]}"
            })
    return steps


def insertion_sort_steps(arr):
    steps = [{"step": arr.copy(), "code": "Initial array"}]
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
        steps.append({
            "step": arr.copy(),
            "code": f"Inserted {key} at position {j + 1}"
        })
    return steps


def merge_sort_steps(arr):
    steps = [{"step": arr.copy(), "code": "Initial array"}]

    def merge_sort(arr, left, right):
        if left < right:
            mid = (left + right) // 2
            merge_sort(arr, left, mid)
            merge_sort(arr, mid + 1, right)
            merge(arr, left, mid, right)

    def merge(arr, left, mid, right):
        L = arr[left:mid + 1]
        R = arr[mid + 1:right + 1]
        i = j = 0
        k = left

        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

        steps.append({
            "step": arr.copy(),
            "code": f"Merged subarrays from index {left} to {right}"
        })

    merge_sort(arr, 0, len(arr) - 1)
    return steps


def quick_sort_steps(arr):
    steps = [{"step": arr.copy(), "code": "Initial array"}]

    def quick_sort(arr, low, high):
        if low < high:
            pi = partition(arr, low, high)
            quick_sort(arr, low, pi - 1)
            quick_sort(arr, pi + 1, high)

    def partition(arr, low, high):
        pivot = arr[high]
        i = low - 1

        for j in range(low, high):
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                steps.append({
                    "step": arr.copy(),
                    "code": f"Swapped positions {i} and {j}: {arr[i]} <-> {arr[j]}"
                })
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        steps.append({
            "step": arr.copy(),
            "code": f"Moved pivot {arr[i + 1]} to correct position at index {i + 1}"
        })
        return i + 1

    quick_sort(arr, 0, len(arr) - 1)
    return steps


def heap_sort_steps(arr):
    steps = [{"step": arr.copy(), "code": "Initial array"}]
    n = len(arr)

    def heapify(arr, n, i):
        largest = i
        l = 2 * i + 1
        r = 2 * i + 2

        if l < n and arr[l] > arr[largest]:
            largest = l
        if r < n and arr[r] > arr[largest]:
            largest = r
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            steps.append({
                "step": arr.copy(),
                "code": f"Swapped positions {i} and {largest}: {arr[i]} <-> {arr[largest]}"
            })
            heapify(arr, n, largest)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        steps.append({
            "step": arr.copy(),
            "code": f"Moved max {arr[i]} to position {i}"
        })
        heapify(arr, i, 0)

    return steps

def radix_sort_steps(arr):
    steps = [{"step": arr.copy(), "code": "Initial array"}]

    def counting_sort(arr, exp):
        n = len(arr)
        output = [0] * n
        count = [0] * 10

        for i in range(n):
            index = arr[i] // exp
            count[(index % 10)] += 1

        for i in range(1, 10):
            count[i] += count[i - 1]

        i = n - 1
        while i >= 0:
            index = arr[i] // exp
            output[count[(index % 10)] - 1] = arr[i]
            count[(index % 10)] -= 1
            i -= 1

        for i in range(n):
            arr[i] = output[i]

        steps.append({
            "step": arr.copy(),
            "code": f"Sorted by digit at exp {exp}"
        })

    max1 = max(arr) if arr else 0
    exp = 1
    while max1 // exp > 0:
        counting_sort(arr, exp)
        exp *= 10

    return steps

def shell_sort_steps(arr):
    steps = [{"step": arr.copy(), "code": "Initial array"}]
    n = len(arr)
    gap = n // 2

    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
            steps.append({
                "step": arr.copy(),
                "code": f"Inserted {temp} at position {j} with gap {gap}"
            })
        gap //= 2

    return steps



def get_sorting_steps(method, array):
    sorting_methods = {
        "bubble": bubble_sort_steps,
        "selection": selection_sort_steps,
        "insertion": insertion_sort_steps,
        "merge": merge_sort_steps,
        "quick": quick_sort_steps,
        "heap": heap_sort_steps,
        "radix": radix_sort_steps,
        "shell": shell_sort_steps,
    }

    if method not in sorting_methods:
        raise ValueError(f"Unsupported sorting method '{method}'")

    return sorting_methods[method](array.copy())
