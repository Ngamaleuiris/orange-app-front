import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CreateUserNce from "./pages/CreateUserNce";
import CreateUserNfmp from "./pages/CreateUserNfmp";
import CreateUseriMonitor from "./pages/CreateUseriMonitor";
import CreateUserKeycloak from "./pages/CreateUserKeycloak";
import ModifyUserNce from "./pages/ModifyUserNce";
import ModifyUserNfmp from "./pages/ModifyUserNfmp";
import ModifyUserkeycloak from "./pages/ModifyUserKeycloak";
import ModifyUseriMonitor from "./pages/ModifyUseriMonitor";
import NCEPage from "./pages/NCEPage";
import NFMPPage from "./pages/NFMPPage";
import IMonitorPage from "./pages/IMonitorPage";
import NomadPage from "./pages/NomadPage";
import DeleteUserPage from "./pages/DeleteUserPage";
import SuspendUserPage from "./pages/SuspendUserPage";
import KEYCLOAKPage from "./pages/KEYCLOAKPage";
import UsersPage from "./pages/UsersPage";
import KeycloakTool from "./pages/KeycloakTool";
import SuspendUserKeycloak from './pages/SuspendUserKeycloak';
import DeleteUserKeycloak from './pages/DeleteUserKeycloak';
import NCEUserManagement from "./pages/NCEUserManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Routes de l'application */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nce" element={<NCEPage />} />
        <Route path="/nfmp" element={<NFMPPage />} />
        <Route path="/imonitor" element={<IMonitorPage />} />
        <Route path="/nomad" element={<NomadPage />} />
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
        <Route path="/suspend-keycloakuser" element={<SuspendUserKeycloak />} />
        <Route path="/delete-keycloakuser" element={<DeleteUserKeycloak />} />
        <Route path="/support" element={<div>Page de support</div>} />
        <Route path="/nce-users" element={<NCEUserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;