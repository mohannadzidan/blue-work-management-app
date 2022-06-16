const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI);

const userSchema = Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
});
const taskSchema = Schema({
    userId: Schema.Types.ObjectId,
    title: Schema.Types.String,
    description:  Schema.Types.String,
    list: Schema.Types.String,
    startDate: Schema.Types.Date,
    endDate: Schema.Types.Date,
    priority: Schema.Types.Number,
    status: Schema.Types.Boolean,
});

exports.User = mongoose.model('User', userSchema);
exports.Task = mongoose.model('Task', taskSchema);
