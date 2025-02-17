import React from 'react';
import {
  Cable as PipelineIcon,
  Work as Briefcase,
  TrackChanges as Target,
  ImportContacts as ContactsBook,
  PeopleAlt as Users
} from '@mui/icons-material';
import { useGetAllContactsQuery, useGetAllLeadsQuery, useGetAllPipelinesQuery, useGetAllUsersQuery } from '../../redux/storeApis';
import DashboardCard from './components/DashboardCard';

const HomePage = () => {
  
  const { data: contactsData, isLoading: isContactsLoading } = useGetAllContactsQuery();
  const { data: leadsData, isLoading: isLeadsLoading } = useGetAllLeadsQuery();
  const { data: usersData, isLoading: isUsersLoading } = useGetAllUsersQuery();
  const { data: pipelinesData, isLoading : isPipelinesLoading } = useGetAllPipelinesQuery();

  const metrics = React.useMemo(() => [
    {
      title: 'Total Leads',
      value: leadsData?.data?.length,
      icon: Target,
      isLoading: isLeadsLoading
    },
    {
      title: 'Active Users',
      value: usersData?.data?.length,
      icon: Users,
      isLoading: isUsersLoading
    },
    {
      title: 'Contacts',
      value: contactsData?.data?.length,
      icon: ContactsBook,
      isLoading: isContactsLoading
    },
    {
      title: 'Pipelines',
      value: pipelinesData?.data?.length,
      icon: PipelineIcon,
      isLoading: isPipelinesLoading
    },
    // {
    //   title: 'Opportunities',
    //   value: 0,
    //   icon: Briefcase,
    //   isLoading: false
    // }
  ], [contactsData, leadsData, usersData, isContactsLoading, isLeadsLoading, isUsersLoading]);

  const handleCardClick = (metric) => {
    console.log(`Clicked ${metric.title}:`, metric.value);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics?.map((metric) => (
          <div 
            key={metric.title} 
            onClick={() => handleCardClick(metric)}
            className="cursor-pointer"
          >
            <DashboardCard
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              isLoading={metric.isLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;