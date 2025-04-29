// Tableau des utilisateurs
let users = [];

// Récupérer les utilisateurs du localStorage ou initialiser un tableau vide
const getStoredUsers = () => {
  const storedUsers = localStorage.getItem('mockUsers');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

// Sauvegarder les utilisateurs dans le localStorage
const saveUsers = (users) => {
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

const mockApi = {
  login: async (cuid, password) => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUsers = getStoredUsers();
    console.log("Tentative de connexion avec:", { cuid, password });
    console.log("Utilisateurs enregistrés:", mockUsers);
    
    const user = mockUsers.find(u => u.cuid === cuid && u.password === password);
    
    if (user) {
      console.log("Utilisateur trouvé:", user);
      return {
        token: `mock-token-${user.id}`,
        user: {
          id: user.id,
          cuid: user.cuid
        }
      };
    }
    console.log("Aucun utilisateur trouvé avec ces identifiants");
    throw new Error("Identifiants incorrects");
  },

  register: async (userData) => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUsers = getStoredUsers();
    console.log("Tentative d'inscription avec:", userData);
    
    const existingUser = mockUsers.find(u => u.cuid === userData.cuid);
    if (existingUser) {
      console.log("CUID déjà utilisé:", existingUser);
      throw new Error("Ce CUID est déjà utilisé");
    }

    const newUser = {
      id: mockUsers.length + 1,
      cuid: userData.cuid,
      password: userData.password
    };
    
    mockUsers.push(newUser);
    saveUsers(mockUsers);
    
    console.log("Nouvel utilisateur créé:", newUser);
    console.log("Liste des utilisateurs après création:", mockUsers);
    
    return {
      message: "Inscription réussie",
      user: {
        id: newUser.id,
        cuid: newUser.cuid
      }
    };
  },

  // Méthode pour voir tous les utilisateurs (utile pour le débogage)
  getAllUsers: () => {
    return getStoredUsers();
  },

  // Méthode pour réinitialiser les données (utile pour les tests)
  reset: () => {
    localStorage.removeItem('mockUsers');
    console.log("Données réinitialisées");
  }
};

// Rendre le mock accessible globalement pour le débogage
window.mockApi = mockApi;

export default mockApi; 