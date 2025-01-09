import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';

function Login() {
    const [userType, setUserType] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const endpoint = userType === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
            const { data } = await axios.post(`${backendUrl}${endpoint}`, { email, password });

            if (data.success) {
                setAToken(data.token);
                console.log(`${userType} logged in successfully`);
                console.log(data.token)
                // Redirect or perform further actions
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className="text-primary">{userType}</span> Login
                </p>
                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-[#DADADA] rounded w-full p-2 mt-1"
                        type="email"
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border border-[#DADADA] rounded w-full p-2 mt-1"
                        type="password"
                        required
                    />
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
                {userType === 'Admin' ? (
                    <p>
                        Doctor Login?{' '}
                        <span className="text-primary underline cursor-pointer" onClick={() => setUserType('Doctor')}>
                            Click Here
                        </span>
                    </p>
                ) : (
                    <p>
                        Admin Login?{' '}
                        <span className="text-primary underline cursor-pointer" onClick={() => setUserType('Admin')}>
                            Click Here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
}

export default Login;
