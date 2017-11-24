// db.companies.aggregate( [
//     { $match: { "relationships.person.permalink": "eric-di-benedetto" } },
//     { $project: { relationships: 1, _id: 0, name: 1 } },
//     { $unwind: "$relationships" },
//     { $group: {
//         _id: "$relationships.person.permalink",
//         count: { $sum: 1 }
//     } },
//     { $sort: { count: -1 } }
// ] )

db.companies.aggregate([
  { $match: { "relationships.person.permalink": "eric-di-benedetto" } },
  { $project: {
    name: 1,
    relationships: 1,
    _id: 0,
    employee: "eric-di-benedetto"
  }},
  { $group: {
    _id: "$name",
  }},
  { $count: "total companies" }
])

db.grades.aggregate([
  { $project: {_id: 0, class_id: 1, student_id: 1, "scores": 1 } },
  { $unwind: "$scores" },
  { $match: {"scores.type": {$ne: "quiz" } } },
  { $group: {
    _id: {
      class_id: "$class_id",
      student_id: "$student_id"
    },
    avgScore: { $avg: "$scores.score" }
  }},
  { $project: {'_id.class_id': 1, avgScore: 1 } },
  { $group: {
    _id: "$_id.class_id",
    avgScore: { $avg: "$avgScore" }
  }},
  { $sort: { avgScore: -1 } }
])

db.companies.aggregate([
  { $match: { founded_year: 2004 } },
  { $project: {
    _id: 0,
    name: 1,
    "funding_rounds.raised_amount": 1,
    size: { $size: "$funding_rounds" }
  }},
  { $match: { size: {$gte: 5 } } },
  { $project: {
    name: 1,
    avg: { $avg: "$funding_rounds.raised_amount" }
  }},
  { $sort: { avg: 1 } }
])
test
