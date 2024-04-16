import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useSignupUser from '../hooks/useSignupUser';
import useSignupDr from "../hooks/useSIgnupDr"
import useSignupComp from '../hooks/useSignupCompany';

const Signup = () => {
    const [selectedType, setSelectedType] = useState('');
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        address: "",
        age: null,
        phone: "",
        type: ""
    });

    const navigate = useNavigate();
    const { loading: loading1, signupUser } = useSignupUser();
    const { loading: loading2, signupDr } = useSignupDr();
    const { loading: loading3, signupComp } = useSignupComp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedInputs = { ...inputs };
    
        // if (selectedType === 'User' || selectedType === 'Doctor') {
        //     updatedInputs = { ...inputs, fullName: inputs.Name };
        //     delete updatedInputs.Name; // Remove the Name attribute
        // }
    
        if(selectedType === 'Company'){
            updatedInputs = {...inputs, Name: inputs.fullName}
            delete updatedInputs.fullName;
        }
        if (selectedType === 'User') {
            await signupUser(updatedInputs);
            navigate('/user');
        } else if (selectedType === 'Doctor') {
            await signupDr({ ...updatedInputs, type: inputs.type });
            navigate('/doctor');
        } else if (selectedType === 'Company') {
            await signupComp({ ...updatedInputs }); // Pass the updatedInputs object
            navigate('/insurance');
        }
    };
    

    const handleTypeChange = (e) => {
        const { value } = e.target;
        setSelectedType(value);
        setShowAdditionalFields(value === 'User' || value === 'Doctor');
        setInputs({ ...inputs, type: value });
    };

    return (
        <div className="flex justify-center items-center w-full h-screen bg-black">
            <form className='flex flex-col w-1/2 h-1/2 bg-white' onSubmit={handleSubmit}>
                <p className='w-1/2 h-15px'>Sign Up</p>
                <input className='border-zinc-800 border-2' type='text' placeholder='Name' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
                <input className='border-zinc-800 border-2' type='email' placeholder='Email' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                <input type='password' placeholder='Password' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                <input type='password' placeholder='Confirm Password' value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
                <input type='text' placeholder='Phone Number' value={inputs.phone} onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} />
                <input type='text' placeholder='Address' value={inputs.address} onChange={(e) => setInputs({ ...inputs, address: e.target.value })} />

                <select value={selectedType} onChange={handleTypeChange}>
                    <option value="">Select Type</option>
                    <option value="User">User</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Company">Company</option>
                </select>

                {showAdditionalFields && (
                    selectedType === 'Doctor' ? (
                        <input type='text' placeholder='Type' value={inputs.type} onChange={(e) => setInputs({ ...inputs, type: e.target.value })} />
                    ) : (
                        <div>
                            <input type='text' placeholder='Gender' value={inputs.gender} onChange={(e) => setInputs({ ...inputs, gender: e.target.value })} />
                            <input type='number' placeholder='Age' value={inputs.age} onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) })} />
                        </div>
                    )
                )}

                <div>
                    <button
                        className="btn btn-block btn-sm mt-2 border border-slate-700"
                        disabled={loading1 || loading2 || loading3}
                    >
                        {loading1 || loading2 || loading3 ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </div>
                <a href='#'>Forgot your password?</a>
                <Link to={"/doctor"}>SIGN IN</Link>
            </form>
        </div>
    );
};

export default Signup;
