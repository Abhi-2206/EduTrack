const fs = require('fs');
const path = require('path');

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

function calculateRisk(student) {
  const attendanceRisk = student.attendance >= 75 ? 0 : student.attendance >= 50 ? 15 : 30;
  const marksRisk = student.averageMarks >= 60 ? 0 : student.averageMarks >= 40 ? 10 : 20;
  const incomeRisk = student.familyIncome > 150000 ? 0 : student.familyIncome >= 75000 ? 10 : 20;
  const previousRecordRisk = student.previousRecord === 'Yes' ? 20 : 0;
  
  const totalScore = attendanceRisk + marksRisk + incomeRisk + previousRecordRisk;
  const riskLevel = totalScore <= 30 ? 'LOW RISK' : totalScore <= 60 ? 'MEDIUM RISK' : 'HIGH RISK';
  
  const factors = [];
  if (attendanceRisk > 0) factors.push('Low attendance');
  if (marksRisk > 0) factors.push('Low academic performance');
  if (incomeRisk > 0) factors.push('Low family income');
  if (previousRecordRisk > 0) factors.push('Previous irregular academic record');
  
  return {
    studentId: student.studentId,
    name: student.name,
    attendanceRisk,
    marksRisk,
    incomeRisk,
    previousRecordRisk,
    totalScore,
    riskLevel,
    factors
  };
}

function displayRiskAnalysis() {
  const students = readStudents();
  
  if (students.length === 0) {
    console.log('\nNo student records available for analysis.');
    return;
  }
  
  console.log('\n========================================');
  console.log('        DROPOUT RISK ANALYSIS');
  console.log('========================================\n');
  
  students.forEach(student => {
    const risk = calculateRisk(student);
    
    console.log(`Student ID: ${risk.studentId}`);
    console.log(`Name: ${risk.name}\n`);
    console.log(`Attendance Risk       : ${risk.attendanceRisk}`);
    console.log(`Marks Risk            : ${risk.marksRisk}`);
    console.log(`Family Income Risk    : ${risk.incomeRisk}`);
    console.log(`Previous Record Risk  : ${risk.previousRecordRisk}`);
    console.log('----------------------------------------');
    console.log(`Total Risk Score      : ${risk.totalScore}`);
    console.log(`Risk Level            : ${risk.riskLevel}\n`);
    
    if (risk.factors.length > 0) {
      console.log('Risk Factors:');
      risk.factors.forEach(f => console.log(`- ${f}`));
    } else {
      console.log('Risk Factors: None (all indicators are positive)');
    }
    
    console.log('\n========================================\n');
  });
  
  console.log(`Total Students Analyzed: ${students.length}`);
}

module.exports = { displayRiskAnalysis, calculateRisk };