import { Card, CardContent, Skeleton } from '@mui/material';
import React from 'react'

const DashboardCardLoadingSkeleton = () => (
  <Card className="h-full">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton width={100} height={20} />
          <Skeleton width={60} height={32} />
        </div>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
    </CardContent>
  </Card>
);

export default DashboardCardLoadingSkeleton