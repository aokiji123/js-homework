const student = {
    name: "Alex",
    age: 20,
    courses: [
        { course_name: "Maths", grade: 90 },
        { course_name: "Physics", grade: 85 },
        { course_name: "Chemistry", grade: 92 }
    ]
};

const jsonString = JSON.stringify(student);
console.log("Serialized JSON:", jsonString);

const parsedStudent = JSON.parse(jsonString);
console.log("Parsed JSON into object", parsedStudent);

student.toJSON = function() {
    const averageGrade = this.courses.reduce((acc, course) => acc + course.grade, 0) / this.courses.length;
    return {
        name: this.name,
        averageGrade: averageGrade
    };
};

const jsonStringCustom = JSON.stringify(student);
console.log("Serialized JSON with toJSON:", jsonStringCustom);
