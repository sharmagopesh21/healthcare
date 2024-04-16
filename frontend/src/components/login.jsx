import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLoginUser from '../hooks/useLoginUser';
import useLoginDr from '../hooks/useLoginDr';
import useLoginCompany from '../hooks/useLoginCompany';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [showDoctorTypeInput, setShowDoctorTypeInput] = useState(false);
  const [showUserTypeInput, setShowUserTypeInput] = useState(false);
  const [showCompanyTypeInput, setShowCompanyTypeInput] = useState(false);

  const {loginUser, loading1} = useLoginUser();
  const {loginDr, loading2} = useLoginDr();
  const {loginCompany, loading3} = useLoginCompany();

  // console.log(loginUser);
  // console.log(loginDr);
  // console.log(loginCompany);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userType:", userType);
    if(userType === 'Doctor') {
      console.log("dr")
      await loginDr({ email: email, password: password });
      navigate('/doctor');
    } else if(userType === 'User') {
      await loginUser({ email: email, password: password });
      navigate('/user'); 
    } else if(userType === 'Company') {
      await loginCompany({ email: email, password: password });
      navigate('/insurance');
    }
  };

  // const handlePlaceholderChange = (e) => {
  //   const { value } = e.target;
  //   setUserType(value);
  // };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/src/assets/login_bg.jpg')"}}>
      <form onSubmit = {handleSubmit} className="relative flex flex-col w-1/3 h-1/2 bg-white rounded-md p-5 shadow-lg">
        <p className="mb-5 text-2xl font-bold text-center">Sign in</p>
        <input 
        className="border-gray-300 border-2 rounded-md mb-3 p-2"
        type='text' placeholder='Doctor/User/Company' value = {userType} onChange={(e) => setUserType(e.target.value)} />
        <input
          className="border-gray-300 border-2 rounded-md mb-3 p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-gray-300 border-2 mb-3 rounded-md p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showDoctorTypeInput && <input className="border-gray-300 border-2 mb-3 rounded-md p-2" type="text" placeholder="Type of Doctor" />}
        {showUserTypeInput && <input className="border-gray-300 border-2 mb-3 rounded-md p-2" type="text" placeholder="Male/Female" />}
        {showCompanyTypeInput && <input className="border-gray-300 border-2 mb-3 rounded-md p-2" type="text" placeholder="Type of Company" />}
        
          {/* <Link className="border-gray-300 border-2 rounded-md p-1 text-center text-white bg-blue-500 hover:bg-blue-700" to={userType === 'Doctor' ? "/doctor" : userType === 'User' ? "/user" : "/insurance"}> */}
          <button type="submit">
            SIGN IN
            </button>
          {/* </Link> */}
        
        <a className="mb-3 p-1 text-red-500 hover:text-red-700" href="#">
          Forgot your password?
        </a>
        <div className="overflow-hidden absolute bottom-0 right-0">
          <p className="p-1">Don't have an account?</p>
          <Link className="border-gray-300 border-2 w-full rounded-md p-1 text-center text-white bg-green-500 hover:bg-green-700" to="/signup">
            SIGN UP
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
