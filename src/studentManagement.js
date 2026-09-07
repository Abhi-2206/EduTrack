const fs = require('fs');
const path = require('path');

const studentsFilePath = path.join(__dirname, '../data/students.json');

function readStudents() {
  try {
    if (!fs.existsSync(studentsFilePath)) {
      fs.writeFileSync(studentsFilePath, '[]');
      return [];
    }
    return JSON.parse(fs.readFileSync(studentsFilePath, 'utf8'));
  } catch (error) {
    console.error('Error reading file:', error.message);
    return [];
  }
}

function writeStudents(students) {
  try {
    fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing file:', error.message);
    return false;
  }
}

function validateStudent(student) {
  if (!student.studentId || !student.name) return 'ID and Name are required';
  if (isNaN(student.age) || student.age <= 0) return 'Invalid age';
  if (isNaN(student.class) || student.class <= 0) return 'Invalid class';
  if (isNaN(student.attendance) || student.attendance < 0 || student.attendance > 100) return 'Attendance must be 0-100';
  if (isNaN(student.averageMarks) || student.averageMarks < 0 || student.averageMarks > 100) return 'Marks must be 0-100';
  if (isNaN(student.familyIncome) || student.familyIncome < 0) return 'Invalid income';
  if (student.previousRecord !== 'Yes' && student.previousRecord !== 'No') return 'Previous record must be Yes/No';
  return null;
}

function addStudent(student) {
  const students = readStudents();
  if (students.some(s => s.studentId === student.studentId)) {
    return { success: false, message: 'Student ID already exists' };
  }
  const error = validateStudent(student);
  if (error) return { success: false, message: error };
  students.push(student);
  return writeStudents(students) ? { success: true, message: 'Student added successfully' } : { success: false, message: 'Failed to save' };
}

function viewAllStudents() {
  const students = readStudents();
  if (students.length === 0) {
    console.log('\nNo students found');
    return;
  }
  console.log('\n=== ALL STUDENTS ===\n');
  students.forEach(s => {
    console.log(`ID: ${s.studentId}, Name: ${s.name}, Age: ${s.age}, Class: ${s.class}`);
    console.log(`School: ${s.school}, Area: ${s.area}, Attendance: ${s.attendance}%, Marks: ${s.averageMarks}%`);
    console.log(`Income: ${s.familyIncome}, Previous Record: ${s.previousRecord}\n`);
  });
  console.log(`Total: ${students.length} students`);
}

function searchStudent(term) {
  const students = readStudents();
  const student = students.find(s => s.studentId === term || s.name.toLowerCase() === term.toLowerCase());
  if (student) {
    console.log('\n========================================================');
    console.log('                 STUDENT DETAILS');
    console.log('========================================================\n');
    
    const displayNames = {
      studentId: 'Student ID',
      name: 'Name',
      age: 'Age',
      gender: 'Gender',
      class: 'Class',
      school: 'School',
      area: 'Area',
      caste: 'Caste',
      attendance: 'Attendance',
      averageMarks: 'Average Marks',
      familyIncome: 'Family Income',
      previousRecord: 'Previous Dropout/Irregular Record'
    };
    
    for (let key in student) {
      let value = student[key];
      let displayName = displayNames[key] || key;
      
      if (key === 'attendance' || key === 'averageMarks') {
        value = value + '%';
      }
      if (key === 'familyIncome') {
        value = '₹' + value;
      }
      
      console.log(`${displayName}: ${value}`);
    }
    
    console.log('\n========================================================');
  } else {
    console.log('\nStudent not found');
  }
}

function updateStudent(id, updates) {
  const students = readStudents();
  const index = students.findIndex(s => s.studentId === id);
  if (index === -1) return { success: false, message: 'Student not found' };
  
  const error = validateStudent({ ...students[index], ...updates, studentId: id });
  if (error) return { success: false, message: error };
  
  students[index] = { ...students[index], ...updates, studentId: id };
  return writeStudents(students) ? { success: true, message: 'Student updated successfully' } : { success: false, message: 'Failed to save' };
}

function deleteStudent(id) {
  const students = readStudents();
  const index = students.findIndex(s => s.studentId === id);
  if (index === -1) return { success: false, message: 'Student not found' };
  students.splice(index, 1);
  return writeStudents(students) ? { success: true, message: 'Student deleted successfully' } : { success: false, message: 'Failed to save' };
}

module.exports = { addStudent, viewAllStudents, searchStudent, updateStudent, deleteStudent };