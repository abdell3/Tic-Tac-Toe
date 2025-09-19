function initGame() ;
- D'aboard la fonction initGame qui sert à initialiser le jeu , par la récupération des input qui sont la dimension du jeu N et le nombre 
des case nécessaire pour gagnier K 

-Dedans il y a la validation des input N et K pour ne pas tomber dans des erreurs des input comme k > N ou N < 3 

- Apres il y a l'initialisation de board avec le remplissage des cases par "null" pur avoir une matrice 
par exemple : null | null | null   
              null | null | null    
              null | null | null   

- Ensuit en ajout une forEach pour louper sur ces cases et ajouter des div pour rendre le html par le grid visuel, et pour chaque div on lui donne des dataset pour distinger entre les cases pour les utilisers pour checkWin , pour N = 3 , et basent sur ce N, en rend l'HTML dynamique par le grid pour que ces cases doit etre afficher dynamiquement, et on lui donne un style , et dans loop on ajout un event listner pour chaque click on appel handleMove pour gerer les mouvement 

- Apres la fonction handleMove qui gere le mouvement pour chaque joeurs , il stock les donnée du joueurs courant dans la case pour memoriser que c appartient a ce joueur pour l'utiliser dans checkWin , et bien sur a chaque click la case ce remplie par un symbole comme x o , 

- Et dans la meme fonction il y a la condition de verification de chaque case apres le click, est ce qu'il y a un winner ou non , aussi s'il y a un draw ou non, donc a chaque click il y a une verification de winner/draw 

- Donc on fait appel a la fonction de checkWin pour verifier : 
    les lignes d'abord 