from sorting_algorithms import get_sorting_steps
from recommendation_logic import recommend_sorting

def main():
    while True:
        print("\n--- Sort Visualizer ---")
        print("1. Visualize Sorting")
        print("2. Get Sorting Recommendation")
        print("3. Exit")
        choice = input("Enter your choice (1/2/3): ").strip()

        if choice == "1":
            # Sorting Visualization
            try:
                array = input("Enter the array elements separated by commas (e.g., 64,34,25): ")
                array = list(map(int, array.split(",")))
                method = input("Enter the sorting method (quick, merge, bubble, selection, insertion, heap, radix, shell): ").strip().lower()

                steps = get_sorting_steps(method, array)
                print("\nSorting Steps:")
                for i, step in enumerate(steps):
                    print(f"Step {i + 1}: {step}")

            except ValueError as e:
                print(f"Error: {e}")
            except Exception as ex:
                print(f"An unexpected error occurred: {ex}")

        elif choice == "2":
            # Sorting Recommendation
            try:
                data_type = input("Enter the data type (numbers/strings): ").strip().lower()
                data_size = int(input("Enter the data size (e.g., 100): ").strip())
                real_time = input("Is real-time processing required? (yes/no): ").strip().lower() == "yes"

                recommendation = recommend_sorting(data_type, data_size, real_time)
                print(f"\nRecommended Sorting Algorithm: {recommendation}")
            except Exception as ex:
                print(f"An unexpected error occurred: {ex}")

        elif choice == "3":
            # Exit Program
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
