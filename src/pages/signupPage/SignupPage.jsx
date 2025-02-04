import React from 'react'
import AuthDiv from '../../components/authDiv/AuthDiv'
import CustomInput from '../../components/customInput/CustomInput'
import { useForm } from 'react-hook-form';
import { ROUTES } from '../../routes/RouteConstants';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <AuthDiv title={'Sign Up'} >

      <CustomInput
        label={"Name"}
        name={"name"}
        errors={errors}
        control={control}
        rules={{ required: 'name is required!' }}
      />
      <CustomInput
        label={"Email"}
        name={"email"}
        type={"email"}
        errors={errors}
        control={control}
        rules={{
          required: 'email is required!',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format",
          },
        }}
      />
      <CustomInput
        label={"Role"}
        name={"role"}
        errors={errors}
        control={control}
        rules={{ required: 'role is required!' }}
      />
      <CustomInput
        label={"Password"}
        name={"password"}
        errors={errors}
        control={control}
        rules={{ required: 'password is required!' }}
      />

      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>

      <span className='mt-3 flex gap-1'>
        Already have an account ?
        <span onClick={() => navigate(ROUTES.login)} className='underline text-[blue] cursor-pointer'>
          Login
        </span>
      </span>

    </AuthDiv>
  )
}

export default SignupPage