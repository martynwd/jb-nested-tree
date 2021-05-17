import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Content from "./components/Content";

import './App.scss'

function App() {
  return (
    <div className="App">
        <Header />
        <SideNav />
        <Content />
    </div>
  );
}

export default App;
