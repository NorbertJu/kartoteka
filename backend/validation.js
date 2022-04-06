const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
}

const profileValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  });
  return schema.validate(data);
}

const groupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    manager_id: Joi.string().required(),
    members: Joi.array(),
  });
  return schema.validate(data);
}

const noteValidation = (data) => {
  const schema = Joi.object({
    text: Joi.string().min(1).max(255).required(),
    user_id: Joi.string().required(),
    document_id: Joi.string().required(),
  });
  return schema.validate(data);
}

const assignmentValidation = (data) => {
  const schema = Joi.object({
    manager_id: Joi.string().required(),
    user_id: Joi.string().required(),
    document_id: Joi.string().required(),
    date_to: Joi.date().required(),
    date_from: Joi.date(),
  }); 
  return schema.validate(data);
}

const progressValidation = (data) => {
  const schema = Joi.object({
    state: Joi.number().min(0).max(100).required(),
    date: Joi.date(),
    user_id: Joi.string().required(),
    document_id: Joi.string().required(),
  }); 
  return schema.validate(data);
}

const documentValidation = (data) => {
  const schema = Joi.object({
    data: Joi.string().required(),
    author: Joi.string().required(),
    creator: Joi.string().required(),
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().max(500).allow(''),
  }); 
  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.profileValidation = profileValidation;
module.exports.groupValidation = groupValidation;
module.exports.noteValidation = noteValidation;
module.exports.assignmentValidation = assignmentValidation;
module.exports.progressValidation = progressValidation;
module.exports.documentValidation = documentValidation;
