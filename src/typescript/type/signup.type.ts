
import { signupSchema } from "@/services/validtions/auth.validations";
import * as yup from "yup"; 

export type SignupFormData = yup.InferType<typeof signupSchema>;