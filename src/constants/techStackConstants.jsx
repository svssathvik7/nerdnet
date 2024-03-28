import { FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiAxios } from "react-icons/si";
import { SiJsonwebtokens } from "react-icons/si";
import { SiMongoose } from "react-icons/si";
import { SiSocketdotio } from "react-icons/si";
const c1 = "#ff0000";
const c2 = "#0000ff";
const c3 = "#1ec11e";
const c4 = "#Ffa500";
const techStack = [
    {
        logo : <FaReact />,
        name : "Reactjs",
        tag : "Frontend",
        color : "c1"
    },
    {
        logo : <SiTailwindcss />,
        name : "Tailwind CSS",
        tag : "Frontend",
        color : "c1"
    },
    {
        logo : <FaNodeJs />,
        name : "Nodejs",
        tag : "Backend",
        color : "c2"
    },
    {
        logo : <SiExpress />,
        name : "Express",
        tag : "Backend",
        color : "c2"
    },
    {
        logo : <SiMongodb />,
        name : "MongoDb",
        tag : "DataBase",
        color : "c3"
    },
    {
        logo : <SiAxios />,
        name : "Axios",
        tag : "HTTP Client",
        color : c4
    },
    {
        logo : <SiJsonwebtokens />,
        name : "Json Web Tokens",
        tag : "Sessions",
        color : c4
    },
    {
        logo : <SiMongoose />,
        name : "Mongoose",
        tag : "MongoDB ODM",
        color : "c3"
    },
    {
        logo : <SiSocketdotio />,
        name : "Socket IO",
        tag : "Web Sockets",
        color : "c4"
    }
]
export default techStack