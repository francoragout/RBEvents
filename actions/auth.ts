"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { LoginSchema, RegisterSchema } from "@/lib/validations";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const LoginUser = async (values: z.infer<typeof LoginSchema>) => {
  try {

    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return { success: true };

  } catch (error) {
    
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};

export const RegisterUser = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const { data, success } = RegisterSchema.safeParse(values);

    if (!success) {
      throw new Error("Invalid data");
    }

    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    const passwordHashed = await bcrypt.hash(data.password, 10);

    await db.user.create({
      data: {
        email: data.email,
        password: passwordHashed,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };

  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};
