import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;