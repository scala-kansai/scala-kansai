var fs = require('fs');
var path = require('path');

function readJsonFile (filename) {
  var fullpath = path.join(__dirname, filename);
  var content = fs.readFileSync(fullpath, 'utf8')
  return JSON.parse(content);
}

module.exports = {
  getAllData: function () {
    return {
      timetable: readJsonFile("timetable.json"),
      handson: readJsonFile("handons.json"),
      sponsors: {
        platinum: readJsonFile("platinum-sponsors.json"),
        gold: readJsonFile("gold-sponsors.json"),
        silver: readJsonFile("silver-sponsors.json"),
        bronze: readJsonFile("bronze-sponsors.json")
      },
      staff: {
        scala: readJsonFile("scala-staff.json"),
        network: readJsonFile("network-staff.json"),
        student: readJsonFile("student-staff.json")
      },
      jobs: readJsonFile("jobs.json")
    }
  },
}
