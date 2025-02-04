import React from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput/CustomInput';
import AuthDiv from '../../components/authDiv/AuthDiv';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/RouteConstants';
import { useLoginUserMutation } from '../../redux/storeApis';
import { Config, getLocalStorage, setLocalStorage } from '../../constants/Index';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { control, handleSubmit, formState: { errors } } = useForm();

  const [loginUser, {isLoading : isLoadingLoginUser} ] = useLoginUserMutation();

  const isLoggedInUser = getLocalStorage(Config.userToken);

  if (isLoggedInUser && location.pathname === ROUTES.login) {
    return <Navigate to={ROUTES.home} replace />;
  };

  const onSubmit = async(data) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      setLocalStorage(Config.userToken, response?.data?.token);
      navigate(ROUTES.home);
    } catch (error) {
      console.log(error.data.message);
    }
  };

  return (
    <AuthDiv title={"Login"}>

      <CustomInput
        label={"Email"}
        name={"email"}
        errors={errors}
        control={control}
        rules={{ required: 'email is required!' }}
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
        {isLoadingLoginUser ? "Loading..." : "Login"}
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