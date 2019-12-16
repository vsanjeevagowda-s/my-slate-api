const { Workspace } = require('../../../models');
const moment = require('moment');
const hmve = require('hmve');

const create = async (req, res) => {
  try {
    const { date, record } = req.body;
    let workspaceResp = '';
    const wr = await Workspace.findOne({ date });
    if (wr) {
      wr.versions.push({ version: wr.versions.length + 1, record, date });
      workspaceResp = await wr.save();
    } else {
      workspaceResp = await Workspace.create({ date, versions: [{ record, date }] });
    }
    return res.status(200).json({ workspace: workspaceResp });
  } catch (error) {
    return res.status(422).json({ message: hmve(Workspace, error).message });
  }
};

const show = async (req, res) => {
  try {
    const { date } = req.params;
    const workspaceResp = await Workspace.findOne({ date });
    if (!workspaceResp) throw new Error('Record not found!!')
    const [workspace, ...items] = workspaceResp.versions.sort((m1, m2) => ( m1.verison > m2.verison ? -1 : 1 ));
    if (!workspace) throw new Error('Verison not available!!')
    return res.status(200).json({ workspace: { date: moment(workspace.date).format('YYYY-MM-DD'), record: workspace.record, version: workspace.version } });
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
  create,
  list,
  show
}