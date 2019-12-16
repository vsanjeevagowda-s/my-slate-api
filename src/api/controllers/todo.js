const { Todo } = require('../../../models');
const moment = require('moment');
const hmve = require('hmve');

const create = async (req, res) => {
  try {
    const { date, record } = req.body;
    let todoResp = '';
    const wr = await Todo.findOne({ date });
    if (wr) {
      wr.versions.push({ version: wr.versions.length + 1, record, date });
      todoResp = await wr.save();
    } else {
      todoResp = await Todo.create({ date, versions: [{ record, date }] });
    }
    return res.status(200).json({ todo: todoResp });
  } catch (error) {
    return res.status(422).json({ message: hmve(Todo, error).message });
  }
};

const show = async (req, res) => {
  try {
    const { date } = req.params;
    const todoResp = await Todo.findOne({ date });
    if (!todoResp) throw new Error('Record not found!!')
    const [todo, ...items] = todoResp.versions.sort((m1, m2) => ( m1.version > m2.version ? -1 : 1 ));
    if (!todo) throw new Error('Verison not available!!')
    return res.status(200).json({ todo: { date: moment(todo.date).format('YYYY-MM-DD'), record: todo.record, version: todo.version } });
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
  create,
  list,
  show
}