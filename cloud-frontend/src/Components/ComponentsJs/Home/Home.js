import { useNavigate } from 'react-router-dom';
import "../../ComponentsCss/Home.css";
import Terminal from "./HomeComponenets/Terminal";
import Header from "./HomeComponenets/Header";
import FileManager from './HomeComponenets/FileManager';

function Home() {
  return (
    <>
      <Header/>
      <FileManager/>
      <Terminal />
    </>
  );
}

export default Home;
