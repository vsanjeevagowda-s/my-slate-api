const { workspace } = require('../../../models');

const create = async (req, res) => {
  try {
    const { date, record } = req.body;
    const workspaceResp = await workspace.create({ date, record });
    return res.status(200).json({ resp: workspaceResp });
  } catch (error) {
    return res.status(422).json({ error });
  }
};

module.exports = {
  create,
}