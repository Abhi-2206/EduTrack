const fs = require('fs');
const path = require('path');

const studentsFilePath = path.join(__dirname, '../data/students.json');

function readStudents() {
  try {
    if (!fs.existsSync(studentsFilePath)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(studentsFilePath, 'utf8'));
  } catch (error) {
    console.error('Error reading file:', error.message);
    return [];
  }
}

function calculateAttendanceRisk(attendance) {
  if (attendance >= 75) return 0;
  if (attendance >= 50) return 15;
  return 30;
}

function calculateMarksRisk(marks) {
  if (marks >= 60) return 0;
  if (marks >= 40) return 10;
  return 20;
}

function calculateIncomeRisk(income) {
  if (income > 150000) return 0;
  if (income >= 75000) return 10;
  return 20;
}

function calculatePreviousRecordRisk(previousRecord) {
  return previousRecord === 'Yes' ? 20 : 0;
}

function getRiskLevel(totalScore) {
  if (totalScore <= 30) return 'LOW RISK';
  if (totalScore <= 60) return 'MEDIUM RISK';
  return 'HIGH RISK';
}

function getRiskFactors(riskBreakdown) {
  const factors = [];
  if (riskBreakdown.attendance > 0) factors.push('Low attendance');
  if (riskBreakdown.marks > 0) factors.push('Low academic performance');
  if (riskBreakdown.income > 0) factors.push('Low family income');
  if (riskBreakdown.previousRecord > 0) factors.push('Previous irregular academic record');
  return factors;
}

function analyzeStudentRisk(student) {
  const attendanceRisk = calculateAttendanceRisk(student.attendance);
  const marksRisk = calculateMarksRisk(student.averageMarks);
  const incomeRisk = calculateIncomeRisk(student.familyIncome);
  const previousRecordRisk = calculatePreviousRecordRisk(student.previousRecord);
  
  const totalScore = attendanceRisk + marksRisk + incomeRisk + previousRecordRisk;
  const riskLevel = getRiskLevel(totalScore);
  
  return {
    studentId: student.studentId,
    name: student.name,
    riskBreakdown: {
      attendance: attendanceRisk,
      marks: marksRisk,
      income: incomeRisk,
      previousRecord: previousRecordRisk
    },
    totalScore,
    riskLevel
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
    const analysis = analyzeStudentRisk(student);
    const riskFactors = getRiskFactors(analysis.riskBreakdown);
    
    console.log(`Student ID: ${analysis.studentId}`);
    console.log(`Name: ${analysis.name}\n`);
    console.log(`Attendance Risk       : ${analysis.riskBreakdown.attendance}`);
    console.log(`Marks Risk            : ${analysis.riskBreakdown.marks}`);
    console.log(`Family Income Risk    : ${analysis.riskBreakdown.income}`);
    console.log(`Previous Record Risk  : ${analysis.riskBreakdown.previousRecord}`);
    console.log('----------------------------------------');
    console.log(`Total Risk Score      : ${analysis.totalScore}`);
    console.log(`Risk Level            : ${analysis.riskLevel}\n`);
    
    if (riskFactors.length > 0) {
      console.log('Risk Factors:');
      riskFactors.forEach(factor => console.log(`- ${factor}`));
    } else {
      console.log('Risk Factors: None (all indicators are positive)');
    }
    
    console.log('\n========================================\n');
  });
  
  console.log(`Total Students Analyzed: ${students.length}`);
}

module.exports = { displayRiskAnalysis };