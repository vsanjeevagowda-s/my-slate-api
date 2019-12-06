const { Workspace } = require('../../../models');
const moment = require('moment');
const hmve = require('hmve');

const upsert = async (req, res) => {
  try {
    const { date, record } = req.body;
    const workspaceResp = await Workspace.findOneAndUpdate({ date },{ record }, {upsert: true} );
    return res.status(200).json({ workspace: workspaceResp });
  } catch (error) {
    return res.status(422).json({ message: hmve(Workspace, error).message });
  }
};

const show = async (req, res) => {
  try {
    const { date } = req.params;
    const workspaceResp = await Workspace.findOne({ date });
    if(!workspaceResp) throw new Error('Record not found!!')
    return res.status(200).json({ workspace :{...workspaceResp, date:moment(workspaceResp.date).format('YYYY-MM-DD'), record: workspaceResp.record}});
  } catch (error) {
    return res.status(422).json({ message: hmve(Workspace, error).message });
  }
}

const list = async (req, res) => {
  try {
    const workspaceResp = await Workspace.find();
    return res.status(200).json({ workspaces: workspaceResp });
  } catch (error) {
    return res.status(422).json({ message: hmve(Workspace, error).message });
  }
}

module.exports = {
  upsert,
  list,
  show
}