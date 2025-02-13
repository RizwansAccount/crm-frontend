import React from 'react';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

const PageHeaderView = ({ source }) => {
  const navigate = useNavigate();

  return (
    <div className='top-0 left-0 sticky pt-8 pb-2 bg-[white] z-[9999]' >
      <div className="flex items-center gap-3  bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
                   transition-all duration-200 group flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft
            className="text-gray-600 group-hover:text-gray-900 
                     group-active:scale-95 transition-all duration-200"
          />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-800">
              {source}
            </h1>
            <span className="text-gray-400 font-medium">Details</span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            View and manage {source.toLowerCase()} information
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHeaderView;