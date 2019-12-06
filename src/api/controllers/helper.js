const connectionCheck = async (req, res) => {
  try {
    return res.status(200).json({ message: 'Connection success!',  });
  } catch (error) {
    return res.status(422).json({ error });
  }
}

module.exports = {
  connectionCheck
}