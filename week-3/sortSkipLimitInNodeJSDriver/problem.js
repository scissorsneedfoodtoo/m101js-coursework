entries = [
  {"_id": 1, "student": "Mary", "grade": 45, "assignment": "homework"},
  {"_id": 2, "student": "Alice", "grade": 48, "assignment": "homework"},
  {"_id": 3, "student": "Fiona", "grade": 16, "assignment": "quiz"},
  {"_id": 4, "student": "Wendy", "grade": 12, "assignment": "homework"},
  {"_id": 5, "student": "Samantha", "grade": 82, "assignment": "homework"},
  {"_id": 6, "student": "Fay", "grade": 89, "assignment": "quiz"},
  {"_id": 7, "student": "Katherine", "grade": 77, "assignment": "quiz"},
  {"_id": 8, "student": "Stacy", "grade": 73, "assignment": "quiz"},
  {"_id": 9, "student": "Sam", "grade": 61, "assignment": "homework"},
  {"_id": 10, "student": "Tom", "grade": 67, "assignment": "exam"},
  {"_id": 11, "student": "Ted", "grade": 52, "assignment": "exam"},
  {"_id": 12, "student": "Bill", "grade": 59, "assignment": "exam"},
  {"_id": 13, "student": "Bob", "grade": 37, "assignment": "exam"},
  {"_id": 14, "student": "Seamus", "grade": 33, "assignment": "exam"},
  {"_id": 15, "student": "Kim", "grade": 28, "assignment": "quiz"},
  {"_id": 16, "student": "Sacha", "grade": 23, "assignment": "quiz"},
  {"_id": 17, "student": "David", "grade": 18, "assignment": "exam"},
  {"_id": 18, "student": "Steve", "grade": 14, "assignment": "homework"},
  {"_id": 19, "student": "Burt", "grade": 90, "assignment": "quiz"},
  {"_id": 20, "student": "Stan", "grade": 92, "assignment": "exam"}
]

function supportGrades(a, b) {
  return a.grade < b.grade ? 1 : a.grade > b.grade ? -1 : 0
}

entries.sort(supportGrades)

entries.forEach(function(entry) {
  console.log(entry)
})
