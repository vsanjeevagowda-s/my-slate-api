const { Todo } = require('../../../models');
const moment = require('moment');
const hmve = require('hmve');

const upsert = async (req, res) => {
  try {
    const { date, record } = req.body;
    const todoResp = await Todo.findOneAndUpdate({ date },{ record }, {upsert: true} );
    return res.status(200).json({ todo: todoResp });
  } catch (error) {
    return res.status(422).json({ message: hmve(Todo, error).message });
  }
};

const show = async (req, res) => {
  try {
    const { date } = req.params;
    const todoResp = await Todo.findOne({ date });
    if(!todoResp) throw new Error('Record not found!!')
    return res.status(200).json({ todo :{...todoResp, date:moment(todoResp.date).format('YYYY-MM-DD'), record: todoResp.record}});
  } catch (error) {
    return res.status(422).json({ message: hmve(Todo, error).message });
  }
}

const list = async (req, res) => {
  try {
    const todoResp = await Todo.find();
    return res.status(200).json({ todos: todoResp });
  } catch (error) {
    return res.status(422).json({ message: hmve(Todo, error).message });
  }
}

module.exports = {
  upsert,
  list,
  show
}