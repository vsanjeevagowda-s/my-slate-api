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


const versions = async (req, res) => {
  try {
    const { date } = req.params;
    let { page = 1, limit=10 } = req.query;
    page = Number(page);
    limit = Number(limit);
    let [todo, ...rest] = await Todo.aggregate([
      {
        $match: {
          date: new Date(date)
        }
      },
      { $unwind: "$versions" },
      { $sort: { "versions.version": -1 } },
      { $group: { _id: "$_id", versions: { $push: "$versions" } } },
      {
        $project: {
          versions: {
            $slice: ["$versions", (page - 1) * limit, limit]
          },
          totalRecords: {
            $size: "$versions"
          }
        }
      }
    ]);
    if(!todo.versions.length) throw new Error('No more records available!!');
    const totalPages = Math.ceil(todo.totalRecords / limit);
    return res.status(200).json({
      ...todo,
      totalPages,
      limit,
      page,
      recordsPerPage: todo.versions.length
    });
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
  show,
  versions
}