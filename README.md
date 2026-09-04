# EduTrack

## Student Dropout Risk Analysis & Intervention System

### 📌 Problem Statement

Student dropout can occur due to factors such as poor attendance, low academic performance, financial difficulties, and irregular academic records. Identifying students who are at risk can help educational institutions provide timely support.

### 💡 Proposed Solution

**EduTrack** is a terminal-based application that manages student information, analyzes dropout risk, generates reports, and provides intervention suggestions for high-risk students.

### 🔄 Project Flow

```text
              START
                |
           Main Menu
                |
    +-----------+-----------+----------+
    |           |           |          |
 Student      Analyze     Reports     Exit
Management     Risk
    |           |           |
 Add           Risk      School/Area/
 View          Score     Gender/Class
 Update          |           |
 Delete          v           v
             High-Risk    Reports
             Students
                 |
                 v
          Intervention
           Suggestions
```

### 🛠️ Technology Used

* **Node.js** – Application runtime
* **JavaScript** – Application logic
* **JSON** – Student data storage
* **readline** – Terminal input/output
* **fs** – File handling

### ⭐ Main Features

* Student Management (Add, View, Update, Delete)
* Dropout Risk Analysis
* High-Risk Student Identification
* Category-wise Reports
* Intervention Suggestions

### 🚧 Project Status

**Under Development**

Completed:

* [x] Project Setup
* [x] Main Menu
* [x] Student Management

Upcoming:

* [ ] Dropout Risk Analysis
* [ ] Reports
* [ ] Intervention Suggestions

### 🎯 Objective

To build a simple and easy-to-use system that helps identify students at risk of dropping out and supports better intervention decisions.

**Developed using Node.js for academic purposes.**
