const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    standard: {
        type: Number
    },
    rollNumber: {
        type: Number
    },
    school: {
        type: String
    },
    city: {
        type: String
    }
});

module.exports = mongoose.model("Student", studentSchema);