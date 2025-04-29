import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // Import de la page d'inscription
import Dashboard from "./pages/Dashboard";
import CreateUserNce from "./pages/CreateUserNce.jsx";
import CreateUserNfmp from "./pages/CreateUserNfmp.jsx";
import CreateUseriMonitor from "./pages/CreateUseriMonitor.jsx";
import CreateUserKeycloak from "./pages/CreateUserKeycloak.jsx";
import CreateUserKeycloakT from "./pages/CreateUserKeycloakT.jsx";
import ModifyUserNce from "./pages/ModifyUserNce.jsx";
import ModifyUserNfmp from "./pages/ModifyUserNfmp.jsx";
import ModifyUserkeycloak from "./pages/ModifyUserKeycloak.jsx";
import ModifyUseriMonitor from "./pages/ModifyUseriMonitor.jsx";
import NCEPage from "./pages/NCEPage";  
import NFMPPage from "./pages/NFMPPage"; 
import IMonitorPage from "./pages/IMonitorPage"; 
import DeleteUserPage  from "./pages/DeleteUserPage"; 
import SuspendUserPage from "./pages/SuspendUserPage.jsx"; 
import KEYCLOAKPage from "./pages/KEYCLOAKPage.jsx"; 
import UsersPage from "./pages/UsersPage.jsx";
import KeycloakTool from "./pages/KeycloakTool.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nce" element={<NCEPage />} />
        <Route path="/nfmp" element={<NFMPPage />} />
        <Route path="/imonitor" element={<IMonitorPage />} />
        <Route path="/keycloak" element={<KEYCLOAKPage />} />
        <Route path="/create-nceuser/:toolName" element={<CreateUserNce />} />
        <Route path="/create-nfmpuser/:toolName" element={<CreateUserNfmp />} />
        <Route path="/create-imonitoruser/:toolName" element={<CreateUseriMonitor />} />
        <Route path="/modify-nceuser/:tool" element={<ModifyUserNce />} />
        <Route path="/modify-nfmpuser/:tool" element={<ModifyUserNfmp />} />
        <Route path="/modify-imonitoruser/:tool" element={<ModifyUseriMonitor />} />
        <Route path="/modify-keycloakuser/:tool" element={<ModifyUserkeycloak />} />
        <Route path="/delete-user/:toolName" element={<DeleteUserPage />} />
        <Route path="/suspend-user/:toolName" element={<SuspendUserPage />} />
        <Route path="/create-keycloakuser/:toolName" element={<CreateUserKeycloak />} />
        <Route path="/userspage" element={<UsersPage />} />
        <Route path="/keycloaktool" element={<KeycloakTool />} />
        <Route path="/create-keycloakuserT" element={<CreateUserKeycloakT />} />
      </Routes>
    </Router>
  );
}

export default App;