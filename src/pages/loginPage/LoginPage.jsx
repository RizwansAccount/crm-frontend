import React from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput/CustomInput';
import AuthDiv from '../../components/divs/authDiv/AuthDiv';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/RouteConstants';
import { useLoginUserMutation } from '../../redux/storeApis';
import { Config, getLocalStorage, setLocalStorage } from '../../constants/Index';
import CustomButton from '../../components/customButton/CustomButton';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [loginUser, { isLoading: isLoadingLoginUser }] = useLoginUserMutation();

  const isLoggedInUser = getLocalStorage(Config.userToken);

  if (isLoggedInUser && location.pathname === ROUTES.login) {
    return <Navigate to={ROUTES.home} replace />;
  };

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      setLocalStorage(Config.userToken, response?.data?.token);
      navigate(ROUTES.home, { state : { user_id : response?.data?.user_id } });
    } catch (error) {
      console.log(error?.data?.message || error);
    }
  };

  return (
    <AuthDiv title={"Login"}>

      <div className='gap-3 flex w-full flex-col pb-4'>
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
          type={"password"}
          errors={errors}
          control={control}
          rules={{ required: 'password is required!' }}
        />

        <CustomButton style={{marginTop : 12}} className={"w-full"} onClick={handleSubmit(onSubmit)}>
          {isLoadingLoginUser ? "Loading..." : "Login"}
        </CustomButton>
      </div>

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