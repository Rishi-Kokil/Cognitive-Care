// import React from 'react'
// import ForumHeader from './ForumHeader'
// import ForumBody from './ForumBody'

// function UserForum() {
//   return (
//     <>
//       <div className='container h-full flex flex-col gap-3'>
//         <header className='flex-none'>
//           <ForumHeader />
//         </header>
//         <main className='flex-1 scroll-auto'>
//           <ForumBody />
//         </main>
//       </div>
//     </>

//   )
// }

// export default UserForum


// src/components/UserCommunity.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserForum = () => {
  const [newTopic, setNewTopic] = useState('');
  const [tableData, setTableData] = useState([
    { id: 1, topic: 'Getting Started with React', replies: 15, views: 120, lastPost: '2 hours ago' },
    { id: 2, topic: 'Tailwind CSS Tips and Tricks', replies: 8, views: 80, lastPost: '1 day ago' },
    { id: 3, topic: 'Responsive Web Design', replies: 22, views: 150, lastPost: '3 days ago' },
    // Add more rows as needed
  ]);

  const handleNewTopicSubmit = (e) => {
    e.preventDefault();
    if (newTopic.trim() !== '') {
      const newId = tableData.length + 1;
      const newTopicData = { id: newId, topic: newTopic, replies: 0, views: 0, lastPost: 'Just now' };
      setTableData([...tableData, newTopicData]);
      setNewTopic('');
    }
  };

  return (
    <div className="font-sans px-8">
      <section className="container mx-auto my-8">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Latest Discussions</h2>
        {/* New Discussion Form */}
        <form onSubmit={handleNewTopicSubmit} className="mb-4">
          <label htmlFor="newTopic" className="block text-gray-700 text-sm font-bold mb-2">
            New Discussion:
          </label>
          <input
            type="text"
            id="newTopic"
            name="newTopic"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline-blue"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Add Discussion
          </button>
        </form>

        {/* Discussions Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-4 px-6 border">Topic</th>
                <th className="py-4 px-6 border">Replies</th>
                <th className="py-4 px-6 border">Views</th>
                <th className="py-4 px-6 border">Last Post</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="bg-white">
                  <td className="py-4 px-6 border hover:bg-gray-200 transition-colors">
                    <Link to={`topics/${row.id}`} className="text-blue-500 hover:underline">
                      {row.topic}
                    </Link>
                  </td>
                  <td className="py-4 px-6 border">{row.replies}</td>
                  <td className="py-4 px-6 border">{row.views}</td>
                  <td className="py-4 px-6 border">{row.lastPost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default UserForum;
