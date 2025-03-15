import Joi from "joi";

const profileUpdateSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).trim(),
  lastName: Joi.string().min(2).max(50).trim(),
  email: Joi.string().email().trim(),
  phoneNumber: Joi.string().pattern(/^\+?[\d\s-()]{8,20}$/),
  bio: Joi.string().max(500).trim(),
  location: Joi.string().max(100).trim(),
  settings: Joi.object({
    notifications: Joi.object({
      email: Joi.boolean(),
      push: Joi.boolean(),
    }),
    privacy: Joi.object({
      profileVisibility: Joi.string().valid("public", "private", "friends"),
    }),
    theme: Joi.string().valid("light", "dark"),
  }),
}).min(1);

const validateProfileUpdate = (data) => {
  return profileUpdateSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
};

export default validateProfileUpdate;
