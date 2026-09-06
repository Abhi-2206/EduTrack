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

function provideInterventions(studentId) {
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
  console.log(`Attendance: ${student.attendance}%`);
  console.log(`Average Marks: ${student.averageMarks}%`);
  console.log(`Family Income: ₹${student.familyIncome}\n`);
  
  let hasRiskFactors = false;
  
  if (risk.attendanceRisk > 0) {
    hasRiskFactors = true;
    console.log('Attendance has been identified as a risk factor.\n');
    console.log('Suggested Interventions:');
    console.log('1. Regular attendance monitoring');
    console.log('2. Parent-teacher follow-up');
    console.log('3. Attendance improvement programs');
  } else {
    console.log('Attendance is not currently identified as a risk factor.');
    console.log('No attendance-based intervention is required.');
  }
  
  console.log();
  
  if (risk.marksRisk > 0) {
    hasRiskFactors = true;
    console.log('Academic performance has been identified as a risk factor.\n');
    console.log('Suggested Academic Interventions:');
    console.log('1. Remedial classes');
    console.log('2. Extra academic support');
    console.log('3. Teacher follow-up');
  } else {
    console.log('Academic performance is not currently identified as a risk factor.');
    console.log('No academic-based intervention is required.');
  }
  
  console.log();
  
  if (risk.incomeRisk > 0) {
    hasRiskFactors = true;
    console.log('Financial condition has been identified as a risk factor.\n');
    console.log('Suggested Financial Interventions:');
    console.log('1. Scholarship assistance');
    console.log('2. Financial aid');
    console.log('3. Support from relevant school programs');
  } else {
    console.log('Financial condition is not currently identified as a risk factor.');
    console.log('No financial-based intervention is required.');
  }
  
  if (!hasRiskFactors) {
    console.log('\nNo intervention is currently required for this student.');
  }
  
  console.log('\n========================================================');
}

module.exports = { provideInterventions };