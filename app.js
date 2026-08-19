const storageKey = "ledgerify-expenses";
const seedExpenses = [
  { date: "2025-07-25", category: "Food", amount: 15.50, description: "Lunch at restaurant" },
  { date: "2025-07-25", category: "Transport", amount: 5, description: "Bus fare" },
  { date: "2025-07-24", category: "Groceries", amount: 45.75, description: "Weekly grocery shopping" },
  { date: "2025-07-23", category: "Entertainment", amount: 20, description: "Movie ticket" },
  { date: "2025-07-23", category: "Food", amount: 12, description: "Dinner" },
  { date: "2025-07-22", category: "Utilities", amount: 60, description: "Electricity bill" },
  { date: "2025-07-22", category: "Transport", amount: 10, description: "Cab ride" },
  { date: "2025-07-21", category: "Food", amount: 7.5, description: "Snacks" },
  { date: "2025-07-16", category: "Food", amount: 7.5, description: "Snacks" },
  { date: "2025-07-26", category: "Vegetables", amount: 200, description: "Pepe" },
  { date: "2025-07-27", category: "Food", amount: 100, description: "Cake" }
];

let expenses = JSON.parse(localStorage.getItem(storageKey) || localStorage.getItem("ledgerly-expenses") || "null") || seedExpenses;
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

function save() { localStorage.setItem(storageKey, JSON.stringify(expenses)); }
function money(value) { return currency.format(value); }
function displayDate(date) { return dateFormatter.format(new Date(`${date}T00:00:00`)); }

function render() {
  const query = document.querySelector("#search").value.trim().toLowerCase();
  const visible = expenses.filter((expense) => Object.values(expense).some((value) => String(value).toLowerCase().includes(query)));
  const list = document.querySelector("#expense-list");
  list.replaceChildren();
  visible.sort((a, b) => b.date.localeCompare(a.date)).forEach((expense) => {
    const row = document.querySelector("#expense-row").content.cloneNode(true);
    row.querySelector(".date-cell").textContent = displayDate(expense.date);
    row.querySelector(".category-tag").textContent = expense.category;
    row.querySelector(".description-cell").textContent = expense.description;
    row.querySelector(".amount-cell").textContent = money(expense.amount);
    row.querySelector(".delete-button").addEventListener("click", () => {
      expenses = expenses.filter((item) => item !== expense); save(); render();
    });
    list.append(row);
  });
  document.querySelector("#empty-state").hidden = visible.length > 0;
  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  document.querySelector("[data-total]").textContent = money(total);
  document.querySelector("[data-count]").textContent = expenses.length;
  const categoryTotals = expenses.reduce((totals, item) => { const name = item.category; totals[name] = (totals[name] || 0) + Number(item.amount); return totals; }, {});
  const top = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  document.querySelector("[data-top-category]").textContent = top ? top[0] : "—";
  document.querySelector("[data-top-category-total]").textContent = top ? money(top[1]) + " spent" : "No expenses yet";
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  const monthTotal = expenses.filter((item) => item.date.startsWith(currentMonth)).reduce((sum, item) => sum + Number(item.amount), 0);
  document.querySelector("[data-month-total]").textContent = money(monthTotal);
}

document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
document.querySelector("#expense-form [name=date]").value = new Date().toISOString().slice(0, 10);
document.querySelector("#search").addEventListener("input", render);
document.querySelector("#expense-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  expenses.unshift({ ...data, amount: Number(data.amount) }); save(); event.currentTarget.reset();
  event.currentTarget.querySelector("[name=date]").value = new Date().toISOString().slice(0, 10);
  document.querySelector("#form-message").textContent = "Expense saved successfully."; render();
});
render();
