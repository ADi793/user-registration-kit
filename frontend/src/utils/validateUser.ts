import * as z from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().min(5).max(255),
  country: z.string().min(2).max(255),
  state: z.string().min(2).max(255),
  city: z.string().min(2).max(255),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string(),
});

export const defaultUserRegistrationValues = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  state: "",
  city: "",
  gender: "",
  dateOfBirth: "",
};
