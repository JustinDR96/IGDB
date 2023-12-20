## fields a recuperer

# commencer par une base de donnée classique en utilisant l'api pour ensuite migrer sur la bd

# info a recuperer

(nom,cover,screenshots,videos,edition?,platforme,developpeur,editeur,date de sortie,genres,notes,tags,dlcs,resumé)

id
name
cover.image_id
screenshots.image_id
platforms.name
platforms.platform_logo.image_id
genres.name
rating_count
age_ratings.rating_cover_url
hypes
follows
release_dates.date
multiplayer_modes
dlcs
videos.video_id
summary

## fonctionnalités a ajouter

- ajouter jeux depuis l'api dans la base de données
- Rechercher via nom du jeux, déveloper, ...
- ajout super user
- dark mode
- cookies
- login/logout
- ajouter compte par utilisateur (pseudo, password, email,) //cloudinary pour profil images et tester google auth librarie pour se connecter directement via un compte google
- possibilités de changer ses infos de connexion
- ajouter dashboard par utilisateurs (jeux achetes recemment, total depensé,dernier jeux ajouté a la wishlist,...)
- wishlist par utilisateur (add,remove,etc)
- gerer le payment d'un jeu
- gerer un panier par session
- ajout d'un jeu via le back dans la bd
- système de filtre et système de trie
- gerer le stock disponible pour un jeu
- gerer le prix pour un jeu
- gerer la remise en stock et push notif si le jeu est de nouveau disponible //notificationAPI pushAPI
- pouvoir choisir la platforme du jeu avant de buy
- Clé d'activation pour les jeux pc
- pouvoir choisir differente version d'un jeu (deluxe, collector,...) //si deluxe version = jeu de base + version deluxe
- pouvoir choisir les dlcs (si il y a) et les buy
- gerer les tags
- ajout d'un CTA abonnement(jeux moins cher ex: jeux entre 20-30 = 10% de remise )
- (chatbot pour le support) //react-chatbot-kit
- (ajouter amis et voir leur achats)

## pages

- page confidentialité, condition de vente, nous contacter, about us
- page détaillée du jeu avec description, capture d'écran, vidéo, etc.
- page d'accueil avec jeu en tendances, prochaines sorties,...
- page login/sign up
- page profil utilisateur avec wishlist, jeux achetés, ...
- page panier
- page search avec filtres et trie
- page admin pour gérer les games et les users

## dependance use

- axios
- passport
- express
- sass
- react-router
