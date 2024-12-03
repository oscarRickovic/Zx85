import { useNavigate } from 'react-router-dom';
import "../ComponentsCss/Home.css";
import Terminal from "./Terminal";
import Header from "./Header";
import FileManager from './FileManager';

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
