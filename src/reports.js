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

function generateSchoolWiseReport() {
  const students = readStudents();
  
  if (students.length === 0) {
    console.log('\nNo student records available for generating the report.');
    return;
  }
  
  const schoolData = {};
  
  students.forEach(student => {
    const risk = riskAnalysis.calculateRisk(student);
    const school = student.school || 'Unknown School';
    
    if (!schoolData[school]) {
      schoolData[school] = {
        total: 0,
        low: 0,
        medium: 0,
        high: 0
      };
    }
    
    schoolData[school].total++;
    
    if (risk.riskLevel === 'LOW RISK') {
      schoolData[school].low++;
    } else if (risk.riskLevel === 'MEDIUM RISK') {
      schoolData[school].medium++;
    } else {
      schoolData[school].high++;
    }
  });
  
  console.log('\n========================================================');
  console.log('                 SCHOOL-WISE REPORT');
  console.log('========================================================\n');
  console.log('School              Total    Low    Medium    High');
  console.log('--------------------------------------------------------');
  
  Object.keys(schoolData).forEach(school => {
    const data = schoolData[school];
    
    // Simple spacing without padEnd/padStart
    let schoolName = school;
    while (schoolName.length < 20) {
      schoolName += ' ';
    }
    
    let totalStr = String(data.total);
    while (totalStr.length < 8) {
      totalStr = ' ' + totalStr;
    }
    
    let lowStr = String(data.low);
    while (lowStr.length < 6) {
      lowStr = ' ' + lowStr;
    }
    
    let mediumStr = String(data.medium);
    while (mediumStr.length < 8) {
      mediumStr = ' ' + mediumStr;
    }
    
    let highStr = String(data.high);
    while (highStr.length < 8) {
      highStr = ' ' + highStr;
    }
    
    console.log(schoolName + totalStr + lowStr + mediumStr + highStr);
  });
  
  console.log('========================================================');
  console.log(`Total Schools: ${Object.keys(schoolData).length}`);
  console.log(`Total Students: ${students.length}`);
  console.log('========================================================');
}

function generateAreaWiseReport() {
  const students = readStudents();
  
  if (students.length === 0) {
    console.log('\nNo student records available for generating the report.');
    return;
  }
  
  const areaData = {};
  
  students.forEach(student => {
    const risk = riskAnalysis.calculateRisk(student);
    const area = student.area || 'Unknown Area';
    
    if (!areaData[area]) {
      areaData[area] = {
        total: 0,
        low: 0,
        medium: 0,
        high: 0
      };
    }
    
    areaData[area].total++;
    
    if (risk.riskLevel === 'LOW RISK') {
      areaData[area].low++;
    } else if (risk.riskLevel === 'MEDIUM RISK') {
      areaData[area].medium++;
    } else {
      areaData[area].high++;
    }
  });
  
  console.log('\n========================================================');
  console.log('                  AREA-WISE REPORT');
  console.log('========================================================\n');
  console.log('Area              Total     Low     Medium     High');
  console.log('--------------------------------------------------------');
  
  Object.keys(areaData).forEach(area => {
    const data = areaData[area];
    
    let areaName = area;
    while (areaName.length < 18) {
      areaName += ' ';
    }
    
    let totalStr = String(data.total);
    while (totalStr.length < 9) {
      totalStr = ' ' + totalStr;
    }
    
    let lowStr = String(data.low);
    while (lowStr.length < 7) {
      lowStr = ' ' + lowStr;
    }
    
    let mediumStr = String(data.medium);
    while (mediumStr.length < 10) {
      mediumStr = ' ' + mediumStr;
    }
    
    let highStr = String(data.high);
    while (highStr.length < 8) {
      highStr = ' ' + highStr;
    }
    
    console.log(areaName + totalStr + lowStr + mediumStr + highStr);
  });
  
  console.log('========================================================');
  console.log(`Total Areas: ${Object.keys(areaData).length}`);
  console.log(`Total Students: ${students.length}`);
  console.log('========================================================');
}

function generateGenderWiseReport() {
  const students = readStudents();
  
  if (students.length === 0) {
    console.log('\nNo student records available for generating the report.');
    return;
  }
  
  const genderData = {};
  
  students.forEach(student => {
    const risk = riskAnalysis.calculateRisk(student);
    const gender = student.gender || 'Unknown';
    
    if (!genderData[gender]) {
      genderData[gender] = {
        total: 0,
        low: 0,
        medium: 0,
        high: 0
      };
    }
    
    genderData[gender].total++;
    
    if (risk.riskLevel === 'LOW RISK') {
      genderData[gender].low++;
    } else if (risk.riskLevel === 'MEDIUM RISK') {
      genderData[gender].medium++;
    } else {
      genderData[gender].high++;
    }
  });
  
  console.log('\n========================================================');
  console.log('                 GENDER-WISE REPORT');
  console.log('========================================================\n');
  console.log('Gender          Total     Low     Medium     High');
  console.log('--------------------------------------------------------');
  
  Object.keys(genderData).forEach(gender => {
    const data = genderData[gender];
    
    let genderName = gender;
    while (genderName.length < 16) {
      genderName += ' ';
    }
    
    let totalStr = String(data.total);
    while (totalStr.length < 9) {
      totalStr = ' ' + totalStr;
    }
    
    let lowStr = String(data.low);
    while (lowStr.length < 7) {
      lowStr = ' ' + lowStr;
    }
    
    let mediumStr = String(data.medium);
    while (mediumStr.length < 10) {
      mediumStr = ' ' + mediumStr;
    }
    
    let highStr = String(data.high);
    while (highStr.length < 8) {
      highStr = ' ' + highStr;
    }
    
    console.log(genderName + totalStr + lowStr + mediumStr + highStr);
  });
  
  console.log('========================================================');
  console.log(`Total Genders: ${Object.keys(genderData).length}`);
  console.log(`Total Students: ${students.length}`);
  console.log('========================================================');
}

module.exports = { generateSchoolWiseReport, generateAreaWiseReport, generateGenderWiseReport };


