import React from "react";
import Teachers from "./pages/Teachers";
import TeacherPositions from "./pages/TeacherPositions";

const App = () => {
  return (
    <div className="root">
        <p className="card">Giáo Viên</p>
        <Teachers/>
        <p className="card">Vị Trí Công Tác</p>
        <TeacherPositions/>
    </div>
  );
};

export default App;