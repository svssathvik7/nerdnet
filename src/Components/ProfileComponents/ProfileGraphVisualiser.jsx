import React, { useEffect,useState } from 'react'
import Graph from "react-vis-network-graph";
import 'vis-network/styles/vis-network.css'; 
import "./ProfileGraphVisualiser.css";     
export default function ProfileGraphVisualiser() {
    const [graph,setGraph] = useState(null);
    const [option,setOption] = useState(null);
    useEffect(
        ()=>{
            setGraph({
                nodes: [
                    { id: 1, label: 'User' }, // User profile
                    { id: 2, label: 'Friend 1'},
                    { id: 3, label: 'Friend 2' },
                    { id: 4, label: 'Friend 3' },
                    { id: 5, label: 'Friend 4' },
                  ],
                  edges: [
                    { from: 1, to: 2 },
                    { from: 1, to: 3 },
                    { from: 1, to: 4 },
                    { from: 1, to: 5 },
                  ],
            });
            setOption({
                height : "100%",
                edges : {
                    color : "#000"
                },
                interaction : {
                    zoomView : false
                }
            })
        }
    ,[]);
    return (
        <div id='graph-component' className='flex flex-col items-center justify-center m-2 p-2'>
            {graph && option ? <Graph
                graph={graph}
                options={option}
            /> : <h1>Follower Graph</h1>}
        </div>
    )
}
