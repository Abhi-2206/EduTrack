const fs = require('fs');
const path = require('path');
const riskAnalysis = require('./riskAnalysis');

const studentsFilePath = path.join(__dirname, '../data/students.json');

function readStudents() {
  try {
    if (!fs.existsSync(studentsFilePath)) return [];
    return JSON.parse(fs.readFileSync(studentsFilePath, 'utf8'));
  } catch (error) {
    console.error('Error reading file:', error.message);
    return [];
  }
}

function provideAttendanceInterventions(studentId) {
  const students = readStudents();
  
  if (students.length === 0) {
    console.log('\nNo student records available.');
    return;
  }
  
  const student = students.find(s => s.studentId === studentId);
  
  if (!student) {
    console.log('\nStudent not found.');
    return;
  }
  
  const risk = riskAnalysis.calculateRisk(student);
  
  console.log('\n========================================================');
  console.log('              INTERVENTION SUGGESTIONS');
  console.log('========================================================\n');
  console.log(`Student ID: ${student.studentId}`);
  console.log(`Student Name: ${student.name}`);
  console.log(`Attendance: ${student.attendance}%\n`);
  
  if (risk.attendanceRisk > 0) {
    console.log('Attendance has been identified as a risk factor.\n');
    console.log('Suggested Interventions:');
    console.log('1. Regular attendance monitoring');
    console.log('2. Parent-teacher follow-up');
    console.log('3. Attendance improvement programs');
  } else {
    console.log('Attendance is not currently identified as a risk factor.');
    console.log('No attendance-based intervention is required.');
  }
  
  console.log('\n========================================================');
}

module.exports = { provideAttendanceInterventions };