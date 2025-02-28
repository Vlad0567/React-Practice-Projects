import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./RegistrationForm.css"; 


const schema = yup.object().shape({
  username: yup.string().required("Введите логин"),
  email: yup.string().email("Некорректный email").required("Введите email"),
  password: yup
    .string()
    .min(6, "Минимум 6 символов")
    .matches(/[A-Za-z]/, "Должна быть буква")
    .matches(/\d/, "Должна быть цифра")
    .required("Введите пароль"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Подтвердите пароль"),
});

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);


  const onSubmit = (data: any) => {
    alert("Вы зарегистрировались!");
    console.log("Данные формы:", data);
  };

  return (
    <div className="form-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Логин</label>
        <input type="text" {...register("username")} />
        <p className="error">{errors.username?.message}</p>

        <label>Email</label>
        <input type="email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <label>Пароль</label>
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} {...register("password")} />
          <button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "👁‍🗨" : "👁"}
          </button>
        </div>
        <p className="error">{errors.password?.message}</p>

        <label>Подтвердите пароль</label>
        <input type="password" {...register("confirmPassword")} />
        <p className="error">{errors.confirmPassword?.message}</p>

        <button type="submit" disabled={!isValid}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
