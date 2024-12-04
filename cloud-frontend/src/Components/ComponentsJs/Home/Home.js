import { useNavigate } from 'react-router-dom';
import "../../ComponentsCss/Home.css";
import Terminal from "./HomeComponents/Terminal";
import Header from "./HomeComponents/Header";
import FileManager from './HomeComponents/FileManager';

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
