import React from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput/CustomInput';
import AuthDiv from '../../components/authDiv/AuthDiv';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/RouteConstants';

const LoginPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };
  return (
    <AuthDiv title={"Login"}>

      <CustomInput
        label={"Username"}
        name={"username"}
        errors={errors}
        control={control}
        rules={{ required: 'username is required!' }}
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
        Login
      </button>

      {/* <span className='mt-3 flex gap-1'>
        Don't have an account ? 
        <span onClick={()=> navigate(ROUTES.signup)} className='underline text-[blue] cursor-pointer'>
          Sign up
        </span>
      </span> */}

    </AuthDiv>
  )
}

export default LoginPage