const catchError = require('../utils/catchError');
const User = require('../models/User.model');

const getAll = catchError(async(req, res) => {
  const user = await User.findAll();
  return res.json(user)
});

const getOne = catchError(async(req, res) => {
  const { id } = req.params
  const user = await User.findByPk(id);
  return res.json(user)
});

const create = catchError(async(req, res) => {
  const { body } = req;
  const user = await User.create(body);
  return res.status(201).json(user)
});

const destroy = catchError(async(req, res) => {
  const { id } = req.params;
  const user = await User.destroy({ where: { id } });
  if (!user) {
    return res.status(404).json('User not found')
  }
  return res.sendStatus(204)
});

const update = catchError(async(req, res) => {
  const { id } = req.params;
  const user = await User.update(
    req.body,
    { where: { id }, returning:true }
  );
  if (user[0] === 0) {
    return res.sendStatus(404)
  }
  return res.status(200).json(user[1][0])
});

module.exports = {
    getAll,
    getOne,
    create,
    destroy,
    update
}