const { workspace } = require('../../../models');

const create = async (req, res) => {
  try {
    const { date, record } = req.body;
    const workspaceResp = await workspace.create({ date, record });
    return res.status(200).json({ workspace: workspaceResp });
  } catch (error) {
    return res.status(422).json({ error });
  }
};

const list  = async (req, res) => {
  try{
    const workspaceResp = await workspace.find();
    return res.status(200).json({ workspaces: workspaceResp });
  }catch(error){
    return res.status(422).json({ error });
  }
}

module.exports = {
  create,
  list,
}