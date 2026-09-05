const readline = require('readline');
const fs = require('fs');
const path = require('path');
const studentManagement = require('./studentManagement');
const riskAnalysis = require('./riskAnalysis');
const reports = require('./reports');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

function showMainMenu() {
  console.log('\n========================================');
  console.log('  STUDENT DROPOUT RISK ANALYSIS SYSTEM');
  console.log('========================================\n');
  console.log('1. Student Management');
  console.log('2. Dropout Risk Analysis');
  console.log('3. Reports');
  console.log('4. Intervention Suggestions');
  console.log('5. Exit');
  console.log('\n========================================\n');
}

async function studentManagementMenu() {
  while (true) {
    console.log('\n========== STUDENT MANAGEMENT ==========');
    console.log('1. Add Student');
    console.log('2. View All Students');
    console.log('3. Search Student');
    console.log('4. Update Student');
    console.log('5. Delete Student');
    console.log('6. Back to Main Menu');
    console.log('========================================\n');
    
    const choice = await askQuestion('Enter choice (1-6): ');
    
    switch (choice.trim()) {
      case '1': await addStudent(); break;
      case '2': studentManagement.viewAllStudents(); break;
      case '3': await searchStudent(); break;
      case '4': await updateStudent(); break;
      case '5': await deleteStudent(); break;
      case '6': return;
      default: console.log('Invalid choice');
    }
    
    await askQuestion('Press Enter to continue...');
  }
}

async function reportsMenu() {
  while (true) {
    console.log('\n========== REPORTS ==========');
    console.log('1. School-wise Report');
    console.log('2. Area-wise Report');
    console.log('3. Back to Main Menu');
    console.log('========================================\n');
    
    const choice = await askQuestion('Enter choice (1-3): ');
    
    switch (choice.trim()) {
      case '1': reports.generateSchoolWiseReport(); break;
      case '2': reports.generateAreaWiseReport(); break;
      case '3': return;
      default: console.log('Invalid choice');
    }
    
    await askQuestion('Press Enter to continue...');
  }
}

async function addStudent() {
  console.log('\n--- Add Student ---\n');
  const student = {
    studentId: (await askQuestion('Student ID: ')).trim(),
    name: (await askQuestion('Name: ')).trim(),
    age: parseInt(await askQuestion('Age: ')),
    gender: (await askQuestion('Gender: ')).trim(),
    class: parseInt(await askQuestion('Class: ')),
    school: (await askQuestion('School: ')).trim(),
    area: (await askQuestion('Area: ')).trim(),
    caste: (await askQuestion('Caste: ')).trim(),
    attendance: parseFloat(await askQuestion('Attendance: ')),
    averageMarks: parseFloat(await askQuestion('Average Marks: ')),
    familyIncome: parseFloat(await askQuestion('Family Income: ')),
    previousRecord: (await askQuestion('Previous Record (Yes/No): ')).trim()
  };
  const result = studentManagement.addStudent(student);
  console.log(`\n${result.message}`);
}

async function searchStudent() {
  console.log('\n--- Search Student ---\n');
  const term = await askQuestion('Enter ID or Name: ');
  studentManagement.searchStudent(term.trim());
}

async function updateStudent() {
  console.log('\n--- Update Student ---\n');
  const id = (await askQuestion('Student ID: ')).trim();
  const students = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/students.json'), 'utf8'));
  const student = students.find(s => s.studentId === id);
  
  if (!student) {
    console.log('Student not found');
    return;
  }
  
  console.log('Enter new values (press Enter to keep current):\n');
  const updates = {};
  
  const fields = ['name', 'age', 'gender', 'class', 'school', 'area', 'caste', 'attendance', 'averageMarks', 'familyIncome', 'previousRecord'];
  for (const field of fields) {
    const value = await askQuestion(`${field} [${student[field]}]: `);
    if (value.trim()) {
      updates[field] = ['age', 'class', 'attendance', 'averageMarks', 'familyIncome'].includes(field) 
        ? parseFloat(value) 
        : value.trim();
    }
  }
  
  if (Object.keys(updates).length === 0) {
    console.log('No changes made');
    return;
  }
  
  const result = studentManagement.updateStudent(id, updates);
  console.log(`\n${result.message}`);
}

async function deleteStudent() {
  console.log('\n--- Delete Student ---\n');
  const id = (await askQuestion('Student ID: ')).trim();
  const students = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/students.json'), 'utf8'));
  const student = students.find(s => s.studentId === id);
  
  if (!student) {
    console.log('Student not found');
    return;
  }
  
  console.log(`Deleting: ${student.name} (ID: ${student.studentId})`);
  const confirm = await askQuestion('Confirm? (yes/no): ');
  
  if (confirm.toLowerCase() === 'yes') {
    const result = studentManagement.deleteStudent(id);
    console.log(`\n${result.message}`);
  } else {
    console.log('Cancelled');
  }
}

async function main() {
  while (true) {
    showMainMenu();
    const choice = await askQuestion('Enter choice (1-5): ');
    
    switch (choice.trim()) {
      case '1': await studentManagementMenu(); break;
      case '2': riskAnalysis.displayRiskAnalysis(); break;
      case '3': await reportsMenu(); break;
      case '4': console.log('[Coming Soon]'); break;
      case '5': console.log('\nThank you!'); rl.close(); return;
      default: console.log('Invalid choice');
    }
    
    await askQuestion('Press Enter to continue...');
  }
}

main();
