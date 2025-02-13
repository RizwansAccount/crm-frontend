import React from 'react'

const OpportunityPage = () => {
  return (
    <div>OpportunityPage</div>
  )
}

export default OpportunityPage

// import { Card, CardContent, CardHeader } from '@mui/material';
// import React, { useState } from 'react';
// import ChevronRight from '@mui/icons-material/KeyboardArrowRight';
// import Plus from '@mui/icons-material/Add';
// import MoreVertical from '@mui/icons-material/MoreVert';


// const OpportunityPage = () => {
//   // Sample data structure - replace with your actual data
//   const [pipelines, setPipelines] = useState([
//     {
//       id: 1,
//       name: 'Sales Pipeline',
//       stages: [
//         { id: 1, name: 'Lead' },
//         { id: 2, name: 'Contact Made' },
//         { id: 3, name: 'Proposal' },
//         { id: 4, name: 'Negotiation' },
//         { id: 5, name: 'Closed' }
//       ],
//       opportunities: [
//         { id: 1, name: 'Client A Deal', currentStage: 1, value: '$50,000' },
//         { id: 2, name: 'Client B Project', currentStage: 3, value: '$75,000' },
//         { id: 3, name: 'Client C Contract', currentStage: 2, value: '$100,000' }
//       ]
//     }
//   ]);

//   return (
//     <div className="w-full p-4 space-y-6">
//       {/* Pipeline Creation Button */}
//       <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
//         <Plus size={20} />
//         <span>Create New Pipeline</span>
//       </button>

//       {/* Pipelines List */}
//       {pipelines.map(pipeline => (
//         <Card key={pipeline.id} className="w-full">
//           <CardHeader className="flex flex-row items-center justify-between">
//             <span>{pipeline.name}</span>
//             <button className="p-2 hover:bg-gray-100 rounded-full">
//               <MoreVertical size={20} />
//             </button>
//           </CardHeader>
//           <CardContent>
//             {/* Stages Display */}
//             <div className="flex justify-between mb-8">
//               {pipeline.stages.map((stage, index) => (
//                 <div key={stage.id} className="flex items-center">
//                   <div className="flex flex-col items-center">
//                     <div className="w-fit p-2 text-center bg-gray-100 rounded-lg">
//                       {stage.name}
//                     </div>
//                   </div>
//                   {index < pipeline.stages.length - 1 && (
//                     <ChevronRight className="mx-2 text-gray-400" />
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Opportunities List */}
//             <div className="space-y-4">
//               {pipeline.opportunities.map(opportunity => (
//                 <div
//                   key={opportunity.id}
//                   className="relative p-4 border rounded-lg hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h3 className="font-medium">{opportunity.name}</h3>
//                       <p className="text-sm text-gray-600">
//                         Stage: {pipeline.stages[opportunity.currentStage - 1].name}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium text-green-600">{opportunity.value}</p>
//                     </div>
//                   </div>
                  
//                   {/* Progress Bar */}
//                   <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-blue-600 rounded-full"
//                       style={{
//                         width: `${(opportunity.currentStage / pipeline.stages.length) * 100}%`
//                       }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Add Opportunity Button */}
//             <button className="mt-4 flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
//               <Plus size={20} />
//               <span>Add Opportunity</span>
//             </button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default OpportunityPage;