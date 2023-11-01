import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AllProjects from './Components/AllProjects';
import MainComponent from './Components/MainComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alltickets from './Components/AllTickets';
import WorklogsList from './Components/WorklogsList';
import Plan from './Components/Plan';


function App() {
  return (
    <>
    <div class="App">
  <header class="App-header">
    <h1 class="logo">
      <span class="gradient-text">Time Management</span>
    </h1>
  </header>
<BrowserRouter>
            <Routes path="/">
              <Route index element={<MainComponent/>}></Route>
              <Route path="allProjects" element={<AllProjects/>}></Route>
              <Route path="allTickets" element={<Alltickets/>}></Route>
              <Route path="/worklogs/by-ticket/:ticketId" element ={<WorklogsList/>} />
              <Route path="plan" element={<Plan/>}></Route>
            </Routes>
          </BrowserRouter>
</div>

</>
  );
}

export default App;
