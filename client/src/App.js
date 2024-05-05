import React from "react";

//use Route to define various routes of our application
import { Route,Routes } from "react-router-dom";

// Import all components for app
import Navbar from "./componenets/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

const App = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<RecordList/>}/>
                <Route path="/edit/:id" element={<Edit/>}/>
                <Route path="/create" element={<Create/>}/>
            </Routes>
        </div>
    );
};

export default App;