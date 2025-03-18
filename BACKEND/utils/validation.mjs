import Joi from "joi";

const profileUpdateSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z]+$/)  // Ensuring names are alphabetic
    .trim()
    .message("First name must be between 2 and 50 characters, and contain only letters."),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z]+$/)  // Ensuring names are alphabetic
    .trim()
    .message("Last name must be between 2 and 50 characters, and contain only letters."),
  email: Joi.string()
    .email()
    .trim()
    .message("Please provide a valid email address."),
  phoneNumber: Joi.string()
    .pattern(/^\+?[\d\s-()]{8,20}$/)
    .message("Please provide a valid phone number with correct format."),
  bio: Joi.string().max(500).trim(),
  location: Joi.string().max(100).trim(),
  settings: Joi.object({
    notifications: Joi.object({
      email: Joi.boolean().default(true),  // Default to true if not provided
      push: Joi.boolean().default(true),   // Default to true if not provided
    }).default(),
    privacy: Joi.object({
      profileVisibility: Joi.string()
        .valid("public", "private", "friends")
        .default("public"),
    }).default(),
    theme: Joi.string().valid("light", "dark").default("light"),
  }).default(),
}).min(1);  // At least one field must be provided

const validateProfileUpdate = (data) => {
  const { error, value } = profileUpdateSchema.validate(data, {
    abortEarly: false,  // Return all errors, not just the first
    stripUnknown: true, // Remove any unknown keys
  });

  if (error) {
    const errors = error.details.map(err => err.message);
    return { errors, isValid: false };
  }

  return { value, isValid: true };
};

export default validateProfileUpdate;
