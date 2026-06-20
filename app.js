// ============================================
// DATA
// ============================================
var PROTEIN_RANGES = {
  muscle:   { min: 1.6, max: 2.2, rec: 1.8, label: 'Build Muscle', emoji: '\uD83D\uDCAA' },
  loss:     { min: 1.6, max: 2.3, rec: 2.0, label: 'Lose Weight',  emoji: '\uD83D\uDD25' },
  maintain: { min: 0.8, max: 1.2, rec: 1.0, label: 'Maintain',     emoji: '\u2696\uFE0F' }
};

var ACTIVITY_MULTIPLIERS = {
  sedentary: { mult: 24, label: 'Sedentary' },
  light:     { mult: 27, label: 'Lightly Active' },
  moderate:  { mult: 30, label: 'Moderately Active' },
  active:    { mult: 35, label: 'Very Active' }
};

var GOAL_CALORIE_MODIFIERS = {
  muscle: 1.15,
  loss: 0.80,
  maintain: 1.00
};

var FOODS = [
  { id:'chicken-breast',    emoji:'🍗', name:'Chicken Breast',      sz:150, label:'150g breast',   prot:46.5, carb:0,   fat:5.4,   cal:248, cat:'meat',    unit:'kg' },
  { id:'lean-beef',         emoji:'🥩', name:'Lean Beef Steak',     sz:150, label:'150g steak',    prot:39,   carb:0,   fat:10,    cal:256, cat:'meat',    unit:'kg' },
  { id:'turkey-breast',     emoji:'🍖', name:'Turkey Breast',       sz:150, label:'150g portion',  prot:43.5, carb:0,   fat:2.5,   cal:210, cat:'meat',    unit:'kg' },
  { id:'pork-loin',         emoji:'🐖', name:'Pork Loin',           sz:150, label:'150g chop',     prot:40.5, carb:0,   fat:10,    cal:262, cat:'meat',    unit:'kg' },
  { id:'chicken-thigh',     emoji:'🍗', name:'Chicken Thigh',       sz:150, label:'150g thigh',    prot:39,   carb:0,   fat:12,    cal:275, cat:'meat',    unit:'kg' },
  { id:'pork-tenderloin',   emoji:'🥓', name:'Pork Tenderloin',     sz:150, label:'150g serving',  prot:39,   carb:0,   fat:5,     cal:215, cat:'meat',    unit:'kg' },
  { id:'ground-turkey',     emoji:'🍖', name:'Ground Turkey',       sz:150, label:'150g portion',  prot:40.5, carb:0,   fat:12,    cal:280, cat:'meat',    unit:'kg' },
  { id:'ground-beef',       emoji:'🥩', name:'Ground Beef (lean)',  sz:150, label:'150g portion',  prot:39,   carb:0,   fat:15,    cal:300, cat:'meat',    unit:'kg' },
  { id:'salmon',            emoji:'🐟', name:'Salmon Fillet',       sz:150, label:'150g fillet',   prot:37.5, carb:0,   fat:19,    cal:312, cat:'fish',    unit:'kg' },
  { id:'cod',               emoji:'🐟', name:'Cod Fillet',          sz:150, label:'150g fillet',   prot:30,   carb:0,   fat:1,     cal:130, cat:'fish',    unit:'kg' },
  { id:'tilapia',           emoji:'🐟', name:'Tilapia Fillet',      sz:150, label:'150g fillet',   prot:39,   carb:0,   fat:2.5,   cal:192, cat:'fish',    unit:'kg' },
  { id:'shrimp',            emoji:'🍤', name:'Shrimp',              sz:150, label:'150g serving',  prot:36,   carb:1.5, fat:2.5,   cal:175, cat:'fish',    unit:'kg' },
  { id:'canned-tuna',       emoji:'🥫', name:'Canned Tuna',         sz:130, label:'1 can (130g)',  prot:34,   carb:0,   fat:1,     cal:150, cat:'canned',  unit:'can' },
  { id:'canned-salmon',     emoji:'🥫', name:'Canned Salmon',       sz:170, label:'1 can (170g)',  prot:41,   carb:0,   fat:11,    cal:275, cat:'canned',  unit:'can' },
  { id:'canned-chicken',    emoji:'🥫', name:'Canned Chicken',      sz:130, label:'1 can (130g)',  prot:32.5, carb:0,   fat:3,     cal:165, cat:'canned',  unit:'can' },
  { id:'canned-sardines',   emoji:'🥫', name:'Canned Sardines',     sz:120, label:'1 can (120g)',  prot:30,   carb:0,   fat:14,    cal:250, cat:'canned',  unit:'can' },
  { id:'canned-chickpeas',  emoji:'🥫', name:'Canned Chickpeas',    sz:240, label:'1 can (240g)',  prot:17,   carb:55,  fat:4,     cal:300, cat:'canned',  unit:'can' },
  { id:'canned-black-beans',emoji:'🥫', name:'Canned Black Beans',  sz:240, label:'1 can (240g)',  prot:19,   carb:50,  fat:1,     cal:280, cat:'canned',  unit:'can' },
  { id:'eggs',              emoji:'🥚', name:'Eggs',                sz:50,  label:'1 large egg',   prot:6.5,  carb:0.5, fat:5,     cal:72,  cat:'dairy',   unit:'egg' },
  { id:'greek-yogurt',      emoji:'🥛', name:'Greek Yogurt',        sz:200, label:'200g pot',      prot:20,   carb:8,   fat:0.5,   cal:120, cat:'dairy',   unit:'kg' },
  { id:'cottage-cheese',    emoji:'🧀', name:'Cottage Cheese',      sz:150, label:'150g serving',  prot:16.5, carb:5,   fat:3,     cal:120, cat:'dairy',   unit:'kg' },
  { id:'lentils',           emoji:'🧆', name:'Lentils (cooked)',     sz:200, label:'200g cooked',   prot:18,   carb:40,  fat:0.8,   cal:230, cat:'plant',   unit:'kg' },
  { id:'edamame',           emoji:'🌿', name:'Edamame',             sz:150, label:'150g serving',  prot:18,   carb:13,  fat:8,     cal:180, cat:'plant',   unit:'kg' },
  { id:'tofu',              emoji:'🧊', name:'Tofu (firm)',          sz:150, label:'150g block',    prot:25.5, carb:3,   fat:13,    cal:216, cat:'plant',   unit:'kg' },
  { id:'almonds',           emoji:'🥜', name:'Almonds',             sz:30,  label:'30g handful',   prot:6.3,  carb:6,   fat:15,    cal:175, cat:'plant',   unit:'g' },
  { id:'whey-protein',      emoji:'🥤', name:'Whey Protein',        sz:30,  label:'1 scoop (30g)', prot:24,   carb:3,   fat:1.5,   cal:120, cat:'supplement', unit:'scoop' },
  { id:'white-rice',        emoji:'🍚', name:'White Rice',          sz:150, label:'150g cooked',   prot:4,    carb:42,  fat:0.4,   cal:195, cat:'carb',    unit:'kg' },
  { id:'brown-rice',        emoji:'🍚', name:'Brown Rice',          sz:150, label:'150g cooked',   prot:3.8,  carb:35,  fat:1.2,   cal:168, cat:'carb',    unit:'kg' },
  { id:'pasta',             emoji:'🍝', name:'Pasta',               sz:150, label:'150g cooked',   prot:8.7,  carb:46,  fat:0.9,   cal:237, cat:'carb',    unit:'kg' },
  { id:'whole-wheat-pasta', emoji:'🍝', name:'Whole Wheat Pasta',   sz:150, label:'150g cooked',   prot:8,    carb:37,  fat:0.8,   cal:186, cat:'carb',    unit:'kg' },
  { id:'rice-noodles',      emoji:'🍜', name:'Rice Noodles',        sz:150, label:'150g cooked',   prot:1.4,  carb:36,  fat:0.3,   cal:162, cat:'carb',    unit:'kg' },
  { id:'potato-boiled',     emoji:'🥔', name:'Potato (boiled)',     sz:150, label:'150g cooked',   prot:2.5,  carb:30,  fat:0.2,   cal:130, cat:'carb',    unit:'kg' },
  { id:'sweet-potato',      emoji:'🍠', name:'Sweet Potato',        sz:150, label:'150g baked',    prot:3,    carb:31,  fat:0.2,   cal:135, cat:'carb',    unit:'kg' },
  { id:'rolled-oats',       emoji:'🥣', name:'Rolled Oats',         sz:50,  label:'50g raw',       prot:7,    carb:34,  fat:3,     cal:190, cat:'carb',    unit:'kg' },
  { id:'broccoli',          emoji:'🥦', name:'Broccoli',            sz:100, label:'100g serving',  prot:2.8,  carb:7,   fat:0.4,   cal:34,  cat:'veg',     unit:'kg' },
  { id:'spinach',           emoji:'🥬', name:'Spinach',             sz:100, label:'100g serving',  prot:2.9,  carb:3.6, fat:0.4,   cal:23,  cat:'veg',     unit:'kg' },
  { id:'carrots',           emoji:'🥕', name:'Carrots',             sz:100, label:'100g serving',  prot:0.9,  carb:10,  fat:0.2,   cal:41,  cat:'veg',     unit:'kg' },
  { id:'bell-pepper',       emoji:'🫑', name:'Bell Pepper',         sz:100, label:'100g serving',  prot:0.9,  carb:4.6, fat:0.2,   cal:20,  cat:'veg',     unit:'kg' },
  { id:'zucchini',          emoji:'🥒', name:'Zucchini',            sz:100, label:'100g serving',  prot:1.2,  carb:3.1, fat:0.3,   cal:17,  cat:'veg',     unit:'kg' },
  { id:'tomato',            emoji:'🍅', name:'Tomato',              sz:100, label:'100g serving',  prot:0.9,  carb:3.9, fat:0.2,   cal:18,  cat:'veg',     unit:'kg' },
  { id:'apple',             emoji:'🍎', name:'Apple',               sz:150, label:'1 medium',      prot:0.4,  carb:21,  fat:0.3,   cal:78,  cat:'fruit',   unit:'kg' },
  { id:'banana',            emoji:'🍌', name:'Banana',              sz:120, label:'1 medium',      prot:1.3,  carb:27,  fat:0.4,   cal:105, cat:'fruit',   unit:'kg' },
  { id:'berries',           emoji:'🍓', name:'Mixed Berries',       sz:100, label:'100g serving',  prot:0.7,  carb:12,  fat:0.3,   cal:50,  cat:'fruit',   unit:'kg' },
  { id:'orange',            emoji:'🍊', name:'Orange',              sz:130, label:'1 medium',      prot:1.2,  carb:15,  fat:0.2,   cal:60,  cat:'fruit',   unit:'kg' },
  { id:'avocado',           emoji:'🥑', name:'Avocado',             sz:100, label:'1/2 medium',    prot:2,    carb:8.5, fat:14.7,  cal:160, cat:'fruit',   unit:'kg' }
];

function foodById(id) { return FOODS.find(function(f) { return f.id === id; }); }

const MEAL_COMBOS = {
  breakfast: [
    ['greek-yogurt', 'berries', 'almonds'],
    ['eggs', 'rolled-oats', 'apple'],
    ['whey-protein', 'banana', 'almonds']
  ],
  lunch: [
    ['chicken-breast', 'brown-rice', 'broccoli'],
    ['canned-tuna', 'whole-wheat-pasta', 'tomato'],
    ['tofu', 'rice-noodles', 'bell-pepper']
  ],
  dinner: [
    ['salmon', 'sweet-potato', 'spinach'],
    ['ground-beef', 'potato-boiled', 'carrots'],
    ['ground-turkey', 'white-rice', 'zucchini']
  ]
};

function suggestMeal(day, mealStr) {
  var combos = MEAL_COMBOS[mealStr];
  var combo = combos[Math.floor(Math.random() * combos.length)];
  
  // Clear existing meal plan for this day/meal
  mealPlan[day][mealStr] = [];

  combo.forEach(function(foodId) {
    var food = foodById(foodId);
    if (!food) return;
    
    var item = { foodId: foodId, portions: {} };
    
    members.forEach(function(m) {
      var servings = 1; // default for veg/fruit/fat
      
      // Scale protein sources
      if (['meat', 'fish', 'dairy', 'supplement'].includes(food.cat) || foodId === 'tofu') {
        var mealProtTarget = m._protein / 3;
        servings = Math.max(0.5, Math.round((mealProtTarget / food.prot) * 2) / 2);
      } 
      // Scale carb sources
      else if (food.cat === 'carb') {
        var mealCarbTarget = m._carb / 3;
        servings = Math.max(0.5, Math.round((mealCarbTarget / food.carb) * 2) / 2);
      }
      
      item.portions[m.id] = servings;
    });
    
    mealPlan[day][mealStr].push(item);
  });
  
  updateViewForCurrentDay();
  updateShop();
}

// ============================================
// STATE
// ============================================
var memberIdCounter = 0;
var members = [];
var dailyTarget = 0;

// mealPlan[day][meal] = [ { foodId: 'eggs', portions: { memId: count } } ]
var mealPlan = {};
var currentDay = 1;
var totalDays = 1;

var modalPendingFoodId = null;
var modalPendingMeal = null;

// ============================================
// DOM
// ============================================
var stepFamily  = document.getElementById('step-family');
var stepPlanner = document.getElementById('step-planner');
var membersList = document.getElementById('members-list');
var addBtn      = document.getElementById('add-member-btn');
var toStep2Btn  = document.getElementById('to-step2-btn');
var backBtn     = document.getElementById('back-btn');

var daysInput   = document.getElementById('plan-days');
var daysMinus   = document.getElementById('days-minus');
var daysPlus    = document.getElementById('days-plus');
var dayTabsContainer = document.getElementById('day-tabs-container');

var portionModal = document.getElementById('portion-modal');
var modalClose = document.getElementById('modal-close');
var modalBackdrop = document.getElementById('modal-backdrop');
var modalSave = document.getElementById('modal-save-btn');

// ============================================
// STEP 1: MEMBERS
// ============================================
function addMember(pre) {
  var id = ++memberIdCounter;
  var m = { 
    id: id, 
    name: (pre && pre.name) || '', 
    weight: (pre && pre.weight) || '', 
    wu: 'kg', 
    gender: (pre && pre.gender) || 'female',
    goal: (pre && pre.goal) || 'muscle',
    activity: (pre && pre.activity) || 'sedentary'
  };
  members.push(m);
  renderMemberCard(m);
  validateStep1();
}

function removeMember(id) {
  members = members.filter(function(m) { return m.id !== id; });
  var el = document.getElementById('mc-' + id);
  if (el) { el.style.opacity = '0'; el.style.transform = 'translateX(40px)'; setTimeout(function() { el.remove(); validateStep1(); }, 250); }
}

function renderMemberCard(m) {
  var card = document.createElement('div');
  card.className = 'member-card';
  card.id = 'mc-' + m.id;
  card.innerHTML =
    '<div class="mc-header"><span class="mc-title">Person ' + m.id + '</span><button type="button" class="mc-remove" data-id="' + m.id + '">&times;</button></div>' +
    '<div class="mc-fields">' +
      '<div class="fg"><label class="fg-label" for="n' + m.id + '">Name</label><input class="fg-input" id="n' + m.id + '" type="text" placeholder="e.g. Alex" value="' + m.name + '" data-f="name" data-id="' + m.id + '" autocomplete="off"></div>' +
      '<div class="fg"><label class="fg-label" for="w' + m.id + '">Weight</label><div style="display:flex;gap:4px"><input class="fg-input" id="w' + m.id + '" type="number" min="20" max="300" step="0.1" placeholder="75" value="' + m.weight + '" data-f="weight" data-id="' + m.id + '" style="flex:1" autocomplete="off"><select class="fg-input" data-f="wu" data-id="' + m.id + '" style="width:70px"><option value="kg"' + (m.wu === 'kg' ? ' selected' : '') + '>kg</option><option value="lbs"' + (m.wu === 'lbs' ? ' selected' : '') + '>lbs</option></select></div></div>' +
      '<div class="fg"><label class="fg-label" for="a' + m.id + '">Activity</label><select class="fg-input" data-f="activity" id="a' + m.id + '" data-id="' + m.id + '"><option value="sedentary"' + (m.activity === 'sedentary' ? ' selected' : '') + '>Sedentary</option><option value="light"' + (m.activity === 'light' ? ' selected' : '') + '>Lightly Active</option><option value="moderate"' + (m.activity === 'moderate' ? ' selected' : '') + '>Moderately Active</option><option value="active"' + (m.activity === 'active' ? ' selected' : '') + '>Very Active</option></select></div>' +
      '<div class="fg full"><span class="fg-label">Goal</span><div class="goal-pills">' +
        '<button type="button" class="gpill' + (m.goal === 'muscle' ? ' active' : '') + '" data-goal="muscle" data-id="' + m.id + '">\uD83D\uDCAA Build Muscle</button>' +
        '<button type="button" class="gpill' + (m.goal === 'loss' ? ' active' : '') + '" data-goal="loss" data-id="' + m.id + '">\uD83D\uDD25 Lose Weight</button>' +
        '<button type="button" class="gpill' + (m.goal === 'maintain' ? ' active' : '') + '" data-goal="maintain" data-id="' + m.id + '">\u2696\uFE0F Maintain</button>' +
      '</div></div>' +
    '</div>';
  membersList.appendChild(card);

  card.querySelector('.mc-remove').addEventListener('click', function() { removeMember(m.id); });
  card.querySelectorAll('[data-f]').forEach(function(inp) {
    var ev = inp.tagName === 'SELECT' ? 'change' : 'input';
    inp.addEventListener(ev, function(e) {
      var mem = members.find(function(x) { return x.id === m.id; });
      if (mem) { mem[e.target.dataset.f] = e.target.value; validateStep1(); }
    });
  });
  card.querySelectorAll('.gpill').forEach(function(pill) {
    pill.addEventListener('click', function() {
      var mem = members.find(function(x) { return x.id === m.id; });
      if (mem) { mem.goal = pill.dataset.goal; card.querySelectorAll('.gpill').forEach(function(p) { p.classList.remove('active'); }); pill.classList.add('active'); }
    });
  });
}

function validateStep1() {
  var ok = members.length > 0 && members.every(function(m) { var w = parseFloat(m.weight); return m.name.trim().length > 0 && !isNaN(w) && w > 0; });
  toStep2Btn.disabled = !ok;
}

addMember({ name: '', weight: '', goal: 'muscle', activity: 'sedentary' });
addBtn.addEventListener('click', function() { addMember({ name: '', weight: '', goal: 'muscle', activity: 'sedentary' }); });

// ============================================
// STEP 2: INITIALIZATION
// ============================================
toStep2Btn.addEventListener('click', function() {
  // Calculate per-member targets
  var htCal = 0, htPro = 0, htCrb = 0, htFat = 0;
  var pills = document.getElementById('hbar-pills');
  pills.innerHTML = '';
  
  members.forEach(function(m) {
    var wKg = m.wu === 'lbs' ? parseFloat(m.weight) / 2.20462 : parseFloat(m.weight);
    var range = PROTEIN_RANGES[m.goal];
    var prot = Math.round(wKg * range.rec);
    
    var baseCals = wKg * ACTIVITY_MULTIPLIERS[m.activity].mult;
    var targetCals = Math.round(baseCals * GOAL_CALORIE_MODIFIERS[m.goal]);
    
    var fat = Math.round((targetCals * 0.25) / 9);
    var carbCals = targetCals - (prot * 4) - (fat * 9);
    var carb = Math.max(0, Math.round(carbCals / 4));
    
    m._protein = prot;
    m._calories = targetCals;
    m._fat = fat;
    m._carb = carb;
    
    htCal += targetCals;
    htPro += prot;
    htCrb += carb;
    htFat += fat;
    
    var pill = document.createElement('span');
    pill.className = 'hbar-pill';
    pill.innerHTML = range.emoji + ' ' + m.name + ' <span class="hp-protein">' + targetCals + 'kcal</span>';
    pills.appendChild(pill);
  });
  
  document.getElementById('ht-cal').textContent = htCal;
  document.getElementById('ht-pro').textContent = htPro;
  document.getElementById('ht-crb').textContent = htCrb;
  document.getElementById('ht-fat').textContent = htFat;

  // Initialize planner
  totalDays = parseInt(daysInput.value) || 1;
  currentDay = 1;
  initMealPlan(totalDays);
  renderDayTabs();
  
  renderAllPickers();
  updateViewForCurrentDay();

  stepFamily.classList.add('hidden');
  stepPlanner.classList.remove('hidden');
  stepPlanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

backBtn.addEventListener('click', function() {
  stepPlanner.classList.add('hidden');
  stepFamily.classList.remove('hidden');
  stepFamily.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ============================================
// DAYS STEPPER & TABS
// ============================================
function initMealPlan(days) {
  // Only add days we don't have; preserve existing planning
  for (var i = 1; i <= days; i++) {
    if (!mealPlan[i]) {
      mealPlan[i] = { breakfast: [], lunch: [], dinner: [] };
    }
  }
}

function handleDaysChange() {
  var v = parseInt(daysInput.value) || 1;
  v = Math.max(1, Math.min(14, v));
  daysInput.value = v;
  totalDays = v;
  initMealPlan(totalDays);
  if (currentDay > totalDays) { currentDay = totalDays; }
  renderDayTabs();
  updateViewForCurrentDay();
  updateShop();
}

daysMinus.addEventListener('click', function() { daysInput.value = Math.max(1, (parseInt(daysInput.value)||1) - 1); handleDaysChange(); });
daysPlus.addEventListener('click', function() { daysInput.value = Math.min(14, (parseInt(daysInput.value)||1) + 1); handleDaysChange(); });
daysInput.addEventListener('change', handleDaysChange);

function renderDayTabs() {
  dayTabsContainer.innerHTML = '';
  for (var i = 1; i <= totalDays; i++) {
    var btn = document.createElement('button');
    btn.className = 'day-tab' + (i === currentDay ? ' active' : '');
    btn.textContent = 'Day ' + i;
    btn.dataset.day = i;
    btn.addEventListener('click', function(e) {
      currentDay = parseInt(e.target.dataset.day);
      renderDayTabs();
      updateViewForCurrentDay();
    });
    dayTabsContainer.appendChild(btn);
  }
}

// ============================================
// MEAL FOOD PICKERS
// ============================================
function renderAllPickers() {
  ['breakfast', 'lunch', 'dinner'].forEach(function(meal) {
    var container = document.getElementById('picker-' + meal);
    container.innerHTML = '';
    FOODS.forEach(function(f) {
      var card = document.createElement('div');
      card.className = 'mp-card';
      card.innerHTML = 
        '<span class="mp-emoji">' + f.emoji + '</span>' +
        '<span class="mp-name">' + f.name + '</span>' +
        '<div class="mp-macros">' +
          '<span class="m-cal">' + f.cal + 'cal</span>' +
          '<span class="m-pro">' + f.prot + 'P</span>' +
          '<span class="m-crb">' + f.carb + 'C</span>' +
          '<span class="m-fat">' + f.fat + 'F</span>' +
        '</div>';
      card.addEventListener('click', function() { openPortionModal(meal, f.id); });
      container.appendChild(card);
    });
  });
}

document.querySelectorAll('.meal-add-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var meal = btn.dataset.meal;
    var picker = document.getElementById('picker-' + meal);
    var isOpen = !picker.classList.contains('hidden');
    picker.classList.toggle('hidden');
    btn.classList.toggle('open', !isOpen);
    btn.querySelector('span').textContent = isOpen ? '+ Add food' : '\u2715 Close';
  });
});

document.querySelectorAll('.meal-suggest-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var meal = btn.dataset.meal;
    suggestMeal(currentDay, meal);
    
    // Add a little magical animation effect
    var originalText = btn.textContent;
    btn.textContent = '✨ Magic applied!';
    setTimeout(function() {
      btn.textContent = originalText;
    }, 1500);
  });
});

// ============================================
// PORTION MODAL
// ============================================
function openPortionModal(meal, foodId) {
  var f = foodById(foodId);
  if (!f) return;
  modalPendingFoodId = foodId;
  modalPendingMeal = meal;

  document.getElementById('modal-title').innerHTML = f.emoji + ' ' + f.name;
  document.getElementById('modal-subtitle').textContent = 'How many servings for each person? (1 serving = ' + f.label + ')';

  var body = document.getElementById('modal-body');
  body.innerHTML = '';

  members.forEach(function(m) {
    var row = document.createElement('div');
    row.className = 'modal-row';
    row.innerHTML =
      '<span class="mr-name">' + m.name + ' (' + m.goal + ')</span>' +
      '<div class="mr-stepper">' +
        '<button type="button" class="mr-btn" onclick="this.nextElementSibling.stepDown()">-</button>' +
        '<input type="number" class="mr-input" data-mid="' + m.id + '" min="0" max="10" step="0.5" value="1">' +
        '<button type="button" class="mr-btn" onclick="this.previousElementSibling.stepUp()">+</button>' +
      '</div>';
    body.appendChild(row);
  });

  portionModal.classList.remove('hidden');
}

function closePortionModal() {
  portionModal.classList.add('hidden');
  modalPendingFoodId = null;
  modalPendingMeal = null;
}

modalClose.addEventListener('click', closePortionModal);
modalBackdrop.addEventListener('click', closePortionModal);

modalSave.addEventListener('click', function() {
  if (!modalPendingFoodId || !modalPendingMeal) return;
  
  var portions = {};
  var hasAny = false;
  document.querySelectorAll('.mr-input').forEach(function(inp) {
    var val = parseFloat(inp.value) || 0;
    if (val > 0) {
      portions[inp.dataset.mid] = val;
      hasAny = true;
    }
  });

  if (hasAny) {
    mealPlan[currentDay][modalPendingMeal].push({
      foodId: modalPendingFoodId,
      portions: portions
    });
    
    // Close picker automatically after adding
    document.getElementById('picker-' + modalPendingMeal).classList.add('hidden');
    var btn = document.querySelector('.meal-add-btn[data-meal="' + modalPendingMeal + '"]');
    btn.classList.remove('open');
    btn.querySelector('span').textContent = '+ Add food';
  }

  closePortionModal();
  updateViewForCurrentDay();
  updateShop();
});


// ============================================
// RENDER DAY
// ============================================
function updateViewForCurrentDay() {
  document.getElementById('dp-day-label').textContent = 'Day ' + currentDay;
  
  ['breakfast', 'lunch', 'dinner'].forEach(function(meal) {
    renderChips(meal);
  });
  updateDaily();
}

function removeFoodFromMeal(meal, index) {
  mealPlan[currentDay][meal].splice(index, 1);
  updateViewForCurrentDay();
  updateShop();
}

function renderChips(meal) {
  var container = document.getElementById('chips-' + meal);
  container.innerHTML = '';
  var mCal = 0, mPro = 0, mCrb = 0, mFat = 0;

  var items = mealPlan[currentDay][meal] || [];
  items.forEach(function(item, i) {
    var f = foodById(item.foodId);
    if (!f) return;

    var totalServings = 0;
    var breakdown = [];
    Object.keys(item.portions).forEach(function(mid) {
      var serv = item.portions[mid];
      totalServings += serv;
      var mem = members.find(function(x) { return x.id == mid; });
      if (mem) breakdown.push(mem.name + ': ' + serv);
    });

    var cal = totalServings * f.cal;
    var prot = totalServings * f.prot;
    var carb = totalServings * f.carb;
    var fat = totalServings * f.fat;
    
    mCal += cal; mPro += prot; mCrb += carb; mFat += fat;

    var chip = document.createElement('div');
    chip.className = 'food-chip';
    chip.innerHTML = 
      '<div class="chip-left">' +
        '<span class="chip-emoji">' + f.emoji + '</span>' +
        '<div class="chip-info">' +
          '<span class="chip-name">' + f.name + ' (' + totalServings + ' servings)</span>' +
          '<span class="chip-details">' + breakdown.join(', ') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="chip-right">' +
        '<div class="chip-macros">' +
          '<span class="m-cal">' + Math.round(cal) + 'cal</span>' +
          '<span class="m-pro">' + Math.round(prot) + 'P</span>' +
          '<span class="m-crb">' + Math.round(carb) + 'C</span>' +
          '<span class="m-fat">' + Math.round(fat) + 'F</span>' +
        '</div>' +
        '<button class="chip-remove" title="Remove">&times;</button>' +
      '</div>';
      
    chip.querySelector('.chip-remove').addEventListener('click', function(e) {
      e.stopPropagation();
      removeFoodFromMeal(meal, i);
    });
    container.appendChild(chip);
  });

  var mHeader = document.getElementById('macros-' + meal);
  if(mHeader) {
    mHeader.innerHTML = 
      '<span class="m-cal">' + Math.round(mCal) + 'kcal</span>' +
      '<span class="m-pro">' + Math.round(mPro) + 'g P</span>' +
      '<span class="m-crb">' + Math.round(mCrb) + 'g C</span>' +
      '<span class="m-fat">' + Math.round(mFat) + 'g F</span>';
  }
}

function updateDaily() {
  var items = mealPlan[currentDay];
  if (!items) return;

  var mTotals = {};
  members.forEach(function(m) { 
    mTotals[m.id] = { cal: 0, pro: 0, crb: 0, fat: 0 };
  });

  ['breakfast', 'lunch', 'dinner'].forEach(function(meal) {
    items[meal].forEach(function(item) {
      var f = foodById(item.foodId);
      if (f) {
        Object.keys(item.portions).forEach(function(mid) {
          if (mTotals[mid] !== undefined) {
            mTotals[mid].cal += item.portions[mid] * f.cal;
            mTotals[mid].pro += item.portions[mid] * f.prot;
            mTotals[mid].crb += item.portions[mid] * f.carb;
            mTotals[mid].fat += item.portions[mid] * f.fat;
          }
        });
      }
    });
  });

  var listContainer = document.getElementById('daily-progress-list');
  listContainer.innerHTML = '';

  members.forEach(function(m) {
    var t = mTotals[m.id];
    var pctC = m._calories > 0 ? Math.min((t.cal / m._calories) * 100, 100) : 0;
    
    var div = document.createElement('div');
    div.className = 'dp-person';
    div.innerHTML =
      '<div class="dp-info">' +
        '<span class="dp-name">' + m.name + '</span>' +
        '<span class="dp-numbers">' + Math.round(t.cal) + ' / ' + Math.round(m._calories) + ' kcal</span>' +
      '</div>' +
      '<div class="dp-track">' +
        '<div class="dp-fill" style="width:' + pctC + '%"></div>' +
      '</div>' +
      '<div class="dp-macro-summary">' +
        '<span class="m-pro">' + Math.round(t.pro) + '/' + Math.round(m._protein) + 'g Pro</span>' +
        '<span class="m-crb">' + Math.round(t.crb) + '/' + Math.round(m._carb) + 'g Carb</span>' +
        '<span class="m-fat">' + Math.round(t.fat) + '/' + Math.round(m._fat) + 'g Fat</span>' +
      '</div>';
    
    listContainer.appendChild(div);
  });
}

// ============================================
// SHOPPING LIST
// ============================================
function updateShop() {
  var shopSection = document.getElementById('shop-section');
  var shopListEl = document.getElementById('shop-list');

  var counts = {}; 

  for (var day = 1; day <= totalDays; day++) {
    var dayPlan = mealPlan[day];
    if (!dayPlan) continue;
    
    ['breakfast', 'lunch', 'dinner'].forEach(function(meal) {
      dayPlan[meal].forEach(function(item) {
        var totalServings = 0;
        Object.keys(item.portions).forEach(function(mid) {
          totalServings += item.portions[mid];
        });
        counts[item.foodId] = (counts[item.foodId] || 0) + totalServings;
      });
    });
  }

  var ids = Object.keys(counts);
  if (ids.length === 0) {
    shopSection.classList.add('hidden');
    return;
  }
  
  shopSection.classList.remove('hidden');
  document.getElementById('shop-subtitle').textContent = 'Aggregated for your ' + totalDays + ' day plan';
  shopListEl.innerHTML = '';
  
  var tCal = 0, tPro = 0, tCrb = 0, tFat = 0;

  ids.forEach(function(fid) {
    var f = foodById(fid);
    if (!f) return;
    
    var totalServings = counts[fid];
    tCal += f.cal * totalServings;
    tPro += f.prot * totalServings;
    tCrb += f.carb * totalServings;
    tFat += f.fat * totalServings;

    var row = document.createElement('div');
    row.className = 'shop-row';
    row.innerHTML =
      '<span class="sr-emoji">' + f.emoji + '</span>' +
      '<div class="sr-info"><span class="sr-name">' + f.name + '</span><span class="sr-detail">' + f.label + ' \u00D7 ' + totalServings + '</span></div>' +
      '<div class="sr-right"><span class="sr-qty">Buy: ' + formatQty(f, totalServings) + '</span></div>';
    shopListEl.appendChild(row);
  });

  var totalsContainer = document.getElementById('shop-totals-container');
  totalsContainer.innerHTML = 
    '<div style="width:100%;display:flex;justify-content:space-between;margin-bottom:8px"><span>Total Calories:</span><strong>' + Math.round(tCal) + ' kcal</strong></div>' +
    '<div style="width:100%;display:flex;justify-content:space-between;margin-bottom:4px"><span>Total Protein:</span><strong>' + Math.round(tPro) + ' g</strong></div>' +
    '<div style="width:100%;display:flex;justify-content:space-between;margin-bottom:4px"><span>Total Carbs:</span><strong>' + Math.round(tCrb) + ' g</strong></div>' +
    '<div style="width:100%;display:flex;justify-content:space-between"><span>Total Fat:</span><strong>' + Math.round(tFat) + ' g</strong></div>';
}

function formatQty(f, qty) {
  switch (f.unit) {
    case 'can':   return qty + ' can' + (qty !== 1 ? 's' : '');
    case 'egg':   return qty + ' egg' + (qty !== 1 ? 's' : '');
    case 'scoop': return qty + ' scoop' + (qty !== 1 ? 's' : '');
    case 'kg':
      var g = qty * f.sz;
      return g >= 1000 ? (g / 1000).toFixed(1) + ' kg' : g + 'g';
    default:
      return (qty * f.sz) + 'g';
  }
}
