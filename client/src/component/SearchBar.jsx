
import React from 'react';
import '../css/index.css';

const SearchBar = ({ query, setQuery, searchRecipes }) => {
    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn việc gửi form mặc định
        searchRecipes(); // Gọi hàm tìm kiếm
    };

    return(    
        <form className="max-w-2xl mx-auto rounded-lg shadow-lg" onSubmit={handleSubmit}>   
            <label htmlFor="default-search" className="mb-2 text-sm font-bold text-gray-900 sr-only dark:text-white">Tìm kiếm</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-600" aria-hidden="true" xmlns="#" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full h-16 p-4 text-4xl ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Nhập tên món ăn..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Cập nhật query từ input
                    required 
                />
                <button 
                    type="submit" 
                    className=" h-12 text-base text-white absolute end-2.5 bottom-2.5 bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-800"
                >
                    Tìm kiếm
                </button>

            </div>
        </form>
    );
}

export default SearchBar;
