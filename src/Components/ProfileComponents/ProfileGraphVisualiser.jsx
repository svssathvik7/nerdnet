import React, { useEffect, useState } from 'react';
import Graph from 'react-vis-network-graph';
import { useContext } from 'react';
import { friendContextProvider } from '../../Context/friendContext';
import './ProfileGraphVisualiser.css';
import ReloadIcon from "../../assets/reload.svg";

export default function ProfileGraphVisualiser() {
  const { userProfile } = useContext(friendContextProvider);
  const [graph, setGraph] = useState(null);
  const [options, setOptions] = useState(null);
  const [refreshGraph,setRefreshGarph] = useState(false);

  useEffect(() => {
    if (userProfile) {
      const followerNodes = userProfile.followers.map((follower, i) => ({
        id: follower?._id ?? i + 2, // Ensure unique IDs for followers
        label: follower?.username ?? 'Nerd',
      }));

      const followingNodes = userProfile.following.map((following, i) => ({
        id: following?._id ?? i + 2, // Ensure unique IDs for following
        label: following?.username ?? 'Nerd',
      }));

      const allNodes = [
        { id: userProfile._id ?? 1, label: userProfile.username ?? 'Nerd'},
        ...followerNodes,
        ...followingNodes,
      ];

      // Remove duplicates based on id
      const uniqueNodes = allNodes.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      const newGraph = {
        nodes: uniqueNodes,
        edges: [
          ...followerNodes.map((follower) => ({
            from: follower.id,
            to: userProfile._id ?? 1,
          })),
          ...followingNodes.map((following) => ({
            from: userProfile._id ?? 1,
            to: following.id,
          })),
        ],
      };

      setGraph(newGraph);

      const newOptions = {
        height: '100%',
        edges: {
          color: '#fff',
        },
        interaction: {
          zoomView: false,
        },
      };

      setOptions(newOptions);
    }
  }, [userProfile,refreshGraph]);

  return (
    <div id='graph-component' className='flex flex-col items-center justify-around m-2 p-2 h-full'>
      {graph && options ? (
        <Graph graph={graph} options={options} />
      ) : (
        <h1>Follower Graph</h1>
      )}
      <img onClick={() => {setRefreshGarph(!refreshGraph)}} className='w-8 cursor-pointer' alt='icon' src={ReloadIcon}/>
    </div>
  );
}
