const { Workspace } = require('../../../models');
const moment = require('moment');

const upsert = async (req, res) => {
  try {
    const { date, record } = req.body;
    console.log({ record })
    const workspaceResp = await Workspace.findOneAndUpdate({ date },{ record }, {upsert: true} );
    return res.status(200).json({ workspace: workspaceResp });
  } catch (error) {
    return res.status(422).json({ error });
  }
};

const show = async (req, res) => {
  try {
    const { date } = req.params;
    const workspaceResp = await Workspace.findOne({ date });
    if(!workspaceResp) throw new Error('Record not found!!')
    return res.status(200).json({ workspace :{...workspaceResp, date:moment(workspaceResp.date).format('YYYY-MM-DD'), record: workspaceResp.record}});
  } catch (error) {
    return res.status(422).json({ error });
  }
}

const list = async (req, res) => {
  try {
    const workspaceResp = await Workspace.find();
    return res.status(200).json({ workspaces: workspaceResp });
  } catch (error) {
    return res.status(422).json({ error });
  }
}

module.exports = {
  upsert,
  list,
  show
}