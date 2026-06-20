# nutrition_planning 🥗

A beautiful, modern, vanilla JavaScript web application designed to help households plan their weekly meals and automatically track their macronutrient targets. 

## ✨ Features

- **Multi-Member Tracking**: Add everyone in your household! Specify weight, gender, activity level, and goals (Maintain, Lose Fat, Gain Muscle) to automatically calculate individual macro targets.
- **Smart Macro Calculator**: Instantly computes personalized targets for Calories, Protein, Carbohydrates, and Fats based on standard scientific models.
- **Interactive Meal Planner**: Plan your Breakfast, Lunch, and Dinner with an intuitive chip-based UI.
- **✨ Magic Auto-Suggest**: Not sure what to eat? Click the Auto-Suggest button to instantly populate a meal with a balanced, predefined food combination. The app automatically scales the portions to precisely hit each member's macro targets!
- **Consolidated Shopping List**: Automatically aggregates all ingredients across all planned days into a single, easy-to-use shopping list.
- **Premium Glassmorphism UI**: Built from scratch with vanilla CSS, featuring dynamic animated backgrounds, modern typography, and clean glassmorphism aesthetics.
- **No Dependencies**: Pure HTML, CSS, and JavaScript. No build steps or heavy frameworks required.

## 🚀 Getting Started

Since this is a vanilla HTML/CSS/JS application, there is no complex build process. 

### Prerequisites
You just need a way to serve static files. If you have Python installed, you can use its built-in HTTP server, or use `npx serve` if you have Node.js.

### Running Locally
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd 10x
   ```
2. Start a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 3000
   
   # OR using Node.js (npx)
   npx serve . -p 3000
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## 🧠 How it Works

1. **Step 1 (Household)**: Add your family members and define their physical parameters and goals.
2. **Step 2 (Meal Plan)**: 
   - Define how many days you are planning for.
   - Use the "+ Add food" button to manually select foods from the curated database (which includes meats, fish, plant proteins, carbs, vegetables, and fruits).
   - Alternatively, use the "**✨ Auto-Suggest**" button to auto-fill the meal.
3. **Step 3 (Shopping)**: Scroll to the bottom to view your consolidated shopping list, complete with aggregate household macros!

## 🛠️ Technology Stack
- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Animations)
- **Logic**: Vanilla JavaScript (ES6)

## 📄 License
This project is open-source and available under the MIT License.
