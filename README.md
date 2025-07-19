# Sort Visualizer

A modern, interactive sorting algorithm visualizer built with **React.js** on the frontend and **Python (Flask)** on the backend. This project is designed to help users visually understand how different sorting algorithms work, step-by-step.

## Features

- Clean, responsive user interface
- Dynamic animation of sorting steps
- Backend logic powered by Python for algorithm computation
- Easily extendable with more sorting algorithms and features
- Graph-style rendering of values as bars

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- JavaScript

### Backend
- Python Flask API
- Sorting logic and step generation handled server-side

## Project Structure
```
Sort_visualizer/
│
├── Backend/
│   ├── server.py               # Flask server and API routing
│   ├── sorting_algorithms.py  	# Sorting logic and step tracking
│   └── recommendation_logic.py	# Suggest algorithms based on context
│
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/               		# React.js app pages and components
│   ├── README.md              	# Frontend-specific docs
│   └── …                    	# Other config and dependency files
│
├── .gitignore
├── README.md                  # ← You’re reading this!
└── …
```

## Getting Started

### 1. Clone the repo
```
git clone https://github.com/asifrahman2003/Sort_visualizer.git
cd Sort_visualizer
```

2. Start Backend (Python Flask)
```
cd Backend
python server.py
```
3. Start Frontend
```
cd ../frontend
npm install
npm run dev
```
## Future Improvements
	•	Add more sorting algorithms (e.g., Heap Sort, Bucket Sort)
	•	Improve visualization interactivity
	•	Add algorithm explanations and time complexity comparisons
	•	User controls for speed, array size, and pause/resume
 
## License
MIT License © Asifur Rahman & Apurbo Barua
