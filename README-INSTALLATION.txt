PROJET LOCATION DE VOITURES - AJOUT DES FICHIERS

IMPORTANT: ce dossier est un COMPLEMENT au projet qui existe deja.
Ne pas supprimer les modeles/, config/database.js, public/, creerTables.js, location_voitures.sql ou votre .env.
Copier les dossiers controllers/, routes/, middlewares/, scripts/, uploads/ dans mon-premier-depot.
Le fichier index.js fourni remplace votre index.js principal : faites une sauvegarde avant.
Les fichiers rolesController.js, categoriesController.js, rolesRoutes.js, categoriesRoutes.js remplacent les anciennes versions pour ajouter securite et pagination.

1) Sur VS Code, terminal dans mon-premier-depot, branche karim-branche :
   npm.cmd install express-validator jsonwebtoken bcryptjs multer
2) Dans le fichier .env existant, ajouter PORT, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD.
   JWT_SECRET doit etre une LONGUE CLE ALEATOIRE. Ne jamais montrer ni committer .env.
3) Verifier .gitignore : node_modules/, .env et uploads/*, !uploads/.gitkeep
4) Si les six tables existent deja, ne PAS relancer sync({force:true}).
5) Creer un compte administrateur : node scripts/creerAdmin.js
6) Demarrer : node index.js
7) Dans Postman : POST http://localhost:3000/api/auth/connexion
   JSON {"email":"adresse_admin_du_env", "mot_de_passe":"mot_de_passe_admin_du_env"}
   Copier le token de la reponse.
8) Pour les routes admin, Postman > Authorization > Bearer Token > coller le token.
9) GET public : /api/categories et /api/voitures
   POST admin : /api/categories {"nom":"SUV", "description":"Sport utilitaire"}
   POST admin : /api/voitures {"marque":"Toyota","modele":"RAV4","annee":2022,"immatriculation":"ABC123","prix_jour":70,"categorie_id":1}
   La photo facultative s'envoie en form-data avec le champ photo (type File) et les autres champs (type Text).
10) POST client /api/auth/inscription, puis connexion et POST /api/reservations
   {"voiture_id":1,"date_debut":"2026-12-01","date_fin":"2026-12-03"}
11) POST admin /api/paiements
   {"reservation_id":1,"montant":210,"date_paiement":"2026-12-01","mode_paiement":"carte"}
12) Collection Postman fournie : importer collection-postman.json.

NOTES :
- Les utilisateurs s'ajoutent par /api/auth/inscription (POST), les autres operations sont admin.
- GET /api/roles et /api/paiements sont reserves aux administrateurs.
- La suppression d'une reservation l'annule au lieu de supprimer son historique.
- Les photos stockees localement sont perdues si le serveur est reinstalle sans sauvegarde.
- La verification de chevauchement des reservations n'est pas transactionnelle (prototype scolaire).
- Faire les tests, validation et revue de securite avant un deploiement public.
- Le professeur demande des contributions de chaque membre. Ce lot de fichiers ne remplace pas la participation, les commits, les merges ni la demonstration en classe.
