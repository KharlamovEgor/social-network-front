import { Button } from "../src/components/Button";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();
  const onSubmit = handleSubmit(async (data) => {
    const response = await axios({
      url: process.env.NEXT_PUBLIC_API! + "/auth/login",
      method: "post",
      data: {
        email: data.email,
        password: data.password,
      },
      headers: {
          'Access-Control-Allow-Origin': '*'
        }
    });

    console.log(response);
  });

  const variants = {
    hidden: { opacity: 0, height: 0, display: "none" },
    visible: { opacity: 1, height: "auto", display: "inline" },
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1>Input your data</h1>
        <input
          type="text"
          placeholder="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\w+@\w+\.\w+/i,
              message: "It isn't mail",
            },
          })}
        />
        <motion.span
          variants={variants}
          initial="hidden"
          animate={errors.email?.message ? "visible" : "hidden"}
          className={styles.error}
        >
          {errors.email?.message}
        </motion.span>
        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Min length is 8 characters",
            },
          })}
        />
        <motion.span
          variants={variants}
          initial="hidden"
          animate={errors.password?.message ? "visible" : "hidden"}
          className={styles.error}
        >
          {errors.password?.message}
        </motion.span>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
