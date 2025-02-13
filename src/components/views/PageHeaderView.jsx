import React from 'react';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

const PageHeaderView = ({ source }) => {
  const navigate = useNavigate();

  return (
      <div className="flex items-center mt-4 gap-3 p-4 rounded-lg shadow-md border border-gray-100 bg-[white]">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
                   transition-all duration-200 group flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft
            className="text-gray-400 group-hover:text-gray-900 
                     group-active:scale-95 transition-all duration-200"
          />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-black">
              {source}
            </h1>
            <span className="text-black font-medium">Details</span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5">
            View and manage {source.toLowerCase()} information
          </p>
        </div>
      </div>
  );
};

export default PageHeaderView;