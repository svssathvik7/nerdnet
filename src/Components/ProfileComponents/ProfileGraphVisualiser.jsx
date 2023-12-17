import React, { useEffect, useState } from 'react';
import Graph from 'react-vis-network-graph';
import { useContext } from 'react';
import { friendContextProvider } from '../../Context/friendContext';
import 'vis-network/styles/vis-network.css';
import './ProfileGraphVisualiser.css';

export default function ProfileGraphVisualiser() {
  const { userProfile } = useContext(friendContextProvider);
  const [graph, setGraph] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (userProfile) {
      const followerNodes = userProfile.followers.map((follower, i) => ({
        id: follower?._id ?? i + 2, // Ensure unique IDs for followers
        label: follower?.username ?? 'Nerd',
      }));

      const newGraph = {
        nodes: [
          { id: userProfile._id ?? 1, label: userProfile.username ?? 'Nerd' },
          ...followerNodes,
        ],
        edges: followerNodes.map((follower) => ({
          from: userProfile._id ?? 1,
          to: follower.id,
        })),
      };

      setGraph(newGraph);

      const newOptions = {
        height: '100%',
        edges: {
          color: '#000',
        },
        interaction: {
          zoomView: false,
        },
      };

      setOptions(newOptions);
    }
  }, [userProfile]);

  return (
    <div id='graph-component' className='flex flex-col items-center justify-center m-2 p-2'>
      {graph && options ? (
        <Graph graph={graph} options={options} />
      ) : (
        <h1>Follower Graph</h1>
      )}
    </div>
  );
}
