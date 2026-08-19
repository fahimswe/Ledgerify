# Expense Tracker

A lightweight expense tracker with two ways to manage your spending:

- a responsive web dashboard for adding, searching, and reviewing expenses
- the original Python command-line application backed by a CSV file

## Features

- Add expenses with a date, category, amount, and description
- Search and review recorded expenses in the browser
- See total spending, entry count, and the top spending category
- Delete browser entries when they are no longer needed
- Use the menu-driven Python CLI to view expenses or totals by category

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Web dashboard markup |
| `styles.css` | Responsive web dashboard styling |
| `app.js` | Dashboard interactions and browser storage |
| `tracker.py` | Original Python command-line tracker |
| `expenses.csv` | Expense data used by the CLI and as the dashboard's initial sample data |

## Run the web dashboard

No packages are required. From the project folder, run:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

The dashboard initially includes the sample expenses from `expenses.csv`. Expenses you add or delete in the web dashboard are saved in your browser's local storage, so they remain after a refresh on the same browser. They do not yet write back to `expenses.csv`.

## Run the Python CLI

```bash
python tracker.py
```

Choose an option from the displayed menu to add an expense, view all entries, see a category total, or exit. CLI changes are saved to `expenses.csv`.

## Requirements

- Python 3.x for the local web server and command-line application
- A modern web browser for the dashboard

## Clone the project

```bash
git clone https://github.com/fahimswe/expense_tracker.git
cd expense_tracker
```
