# Goal Description

Update the Family Meal Planner to support gender selection, day-by-day planning (different meals for different days), and individual per-meal portion assignment (e.g., 1 egg for you, 2 eggs for your husband). This will provide fine-grained control over the household's protein intake and generate an accurate shopping list based on exact portions over the selected days.

> [!IMPORTANT]
> ## User Review Required
> Please review the proposed changes below, especially how the day-by-day navigation and per-person portion assignment will work in the UI.

> [!NOTE]
> ## Open Questions
> 1. For the gender selection, protein per kg recommendations are generally the same for both men and women. Should the gender selection strictly alter the calculations, or is it mostly for your tracking? (I will implement it to slightly adjust the "maintain" baseline if needed, but standard recommendations per kg are very similar).
> 2. When you add a food to a meal, I plan to show a popup or inline section where you can type how many servings each family member gets (e.g., Member 1: 1 serving, Member 2: 2 servings). Does this sound good?

## Proposed Changes

---

### UI & Layout Updates (HTML & CSS)

#### [MODIFY] index.html
- Add a Gender dropdown (Male/Female) to the family member card in Step 1.
- Restructure Step 2 to include a "Day Tabs" navigation (e.g., Day 1, Day 2, Day 3).
- When "Plan for X days" is changed, the number of Day tabs will update dynamically.
- Add a "Portion Assignment Modal" (or inline section) that pops up when a food is selected from the picker. It will list each family member and allow setting the number of servings (0, 0.5, 1, 2, etc.) for that specific food.
- Update the food chips inside the meal to display the total servings and a breakdown (e.g., `🥚 Eggs (Total: 3 servings)`).

#### [MODIFY] index.css
- Add styles for the Day Tabs navigation (horizontal scrollable tabs).
- Add styles for the Portion Assignment Modal/Inline UI.
- Update meal chip styling to accommodate the per-person breakdown details.

---

### State & Logic Updates (JavaScript)

#### [MODIFY] app.js
- **Member State**: Add `gender` to the member object.
- **Data Structure Shift**: `mealPlan` will change from a simple object `{ breakfast: [], ... }` to a nested structure tracking days and portions:
  ```javascript
  mealPlan = {
    1: { // Day 1
      breakfast: [
        { foodId: 'eggs', portions: { memberId1: 1, memberId2: 2 } }
      ],
      lunch: [...],
      dinner: [...]
    },
    2: { ... }
  }
  ```
- **Day Navigation**: Add logic to render the UI for the currently selected day.
- **Protein Calculations**: 
  - Update the daily progress bar to reflect the *currently viewed day's* total protein versus the daily target.
  - Calculate each individual's daily protein for the viewed day to show if they are meeting their personal targets.
- **Shopping List Aggregation**: Iterate through all days, meals, and member portions to sum up the exact number of servings required for the entire planning period.

## Verification Plan

### Automated Tests
- None.

### Manual Verification
1. Add a male and female member with different goals.
2. Set "Plan for" to 3 days.
3. Switch between Day 1, Day 2, and Day 3, adding different foods to each.
4. Add eggs to breakfast and assign 1 to person A and 2 to person B.
5. Verify the daily protein progress updates accurately based on exact portions.
6. Verify the shopping list accurately totals the exact portions across all 3 days.
