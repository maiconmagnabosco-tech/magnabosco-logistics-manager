import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-piano-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Magnabosco Logistics Manager</h1>
        <button
          onClick={onLogin}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
