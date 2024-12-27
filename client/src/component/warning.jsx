import React from 'react';
import { Link } from 'react-router-dom';

function warning(){
    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
        <div className=" p-6 rounded-lg max-w-md w-full">
            <p className="text-3xl font-bold text-gray-600 text-center">
            Bạn không có quyền sử dụng chức năng này!
            </p>
        </div>
        </div>
      );
}

export default warning;
