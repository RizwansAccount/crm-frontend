import { Card, CardContent } from '@mui/material';
import React from 'react'
import DashboardCardLoadingSkeleton from './DashboardCardLoadingSkeleton';

const DashboardCard = ({ title, value, icon: Icon, isLoading }) => {
    if (isLoading) return <DashboardCardLoadingSkeleton />;
  
    return (
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-2xl font-bold">
                {typeof value === 'number' ? value.toLocaleString() : '0'}
              </p>
            </div>
            <div className="p-4 rounded-full bg-[rgba(0,0,0,0.1)]">
              <Icon className="w-6 h-6 text-black" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

export default DashboardCard