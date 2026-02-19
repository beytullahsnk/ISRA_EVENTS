# ISRA Events - Site Web Événementiel

Site web professionnel pour ISRA Events, spécialisé dans l'organisation de foires, salons professionnels, congrès et événements culturels en France et en Europe.

## 🎨 Caractéristiques

- **Design moderne** avec thème turquoise élégant
- **Responsive** adapté à tous les écrans (mobile, tablette, desktop)
- **Navigation fixe** pour une meilleure expérience utilisateur
- **Vidéo hero** en page d'accueil (600px de hauteur)
- **Animations fluides** au scroll et au survol
- **Filtres dynamiques** pour les événements
- **Formulaires interactifs** avec validation en temps réel
- **Performance optimisée** avec lazy loading

## 📁 Structure du Projet

```
isra-events/
├── index.html              # Page d'accueil
├── evenements.html         # Liste complète des événements
├── devenir-exposant.html   # Page exposants avec packages
├── a-propos.html          # À propos d'ISRA Events
├── contact.html           # Formulaire de contact
├── css/
│   └── style.css          # Styles principaux (thème turquoise)
├── js/
│   ├── main.js           # JavaScript principal (navigation, animations)
│   ├── events.js         # Filtres et interactions événements
│   ├── exhibitor.js      # Formulaire exposants
│   └── contact.js        # Formulaire de contact
└── assets/
    ├── AnnonceTurkiyeExpo-TR_1.mp4  # Vidéo hero
    └── images/           # Images des événements et galerie
```

## 🎯 Pages du Site

### 1. Page d'Accueil (`index.html`)
- Vidéo hero en arrière-plan (600px)
- Événements phares uniquement
- Domaines d'intervention
- Galerie photos
- Pas d'"Événements à venir" (déplacé sur page dédiée)

### 2. Nos Événements (`evenements.html`)
- Liste complète de tous les événements
- Système de filtres par catégorie
- Légende billetterie (en ligne / gratuit)
- Compteur d'événements filtrés

### 3. Devenir Exposant (`devenir-exposant.html`)
- Avantages pour les exposants
- 3 formules (Starter, Business, Premium)
- Événements disponibles pour réservation
- Formulaire de demande de devis

### 4. À Propos (`a-propos.html`)
- Présentation d'ISRA Events
- Notre expertise (6 domaines)
- Chiffres clés
- Nos engagements
- Domaines d'intervention

### 5. Contact (`contact.html`)
- Formulaire de contact complet
- Coordonnées avec icônes
- Liens réseaux sociaux
- Validation en temps réel

## 🎨 Palette de Couleurs (Thème Turquoise)

```css
--primary: #14B8A6          /* Turquoise principal */
--primary-dark: #0F766E     /* Turquoise foncé */
--primary-light: #5EEAD4    /* Turquoise clair */
--primary-hover: #0D9488    /* Turquoise au survol */
```

## 🔧 Fonctionnalités JavaScript

### Navigation
- Menu mobile responsive avec animation hamburger
- Navbar fixe avec effet au scroll
- Fermeture automatique du menu sur clic (mobile)
- Scroll fluide vers les ancres

### Événements
- Filtrage dynamique par catégorie
- Compteur d'événements
- Animations d'apparition
- Gestion des badges billetterie

### Formulaires
- Validation en temps réel
- Messages d'erreur clairs
- Auto-formatage du numéro de téléphone
- Compteur de caractères pour textarea
- Autosave local (localStorage)
- Notifications de succès/erreur

### Animations
- Fade-in au scroll (Intersection Observer)
- Hover effects sur cartes
- Transitions fluides
- Loading states pour boutons
- Apparition progressive des éléments

### Optimisations
- Lazy loading des images
- Video pause hors viewport
- Back to top button
- Debounce sur inputs
- Performance optimisée

## 📱 Responsive Design

Le site est entièrement responsive avec 3 breakpoints principaux :

- **Desktop** : > 1024px (navigation complète)
- **Tablet** : 768px - 1024px (menu mobile)
- **Mobile** : < 768px (colonnes simples, navigation hamburger)

## 🚀 Installation & Utilisation

### 1. Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Fichier vidéo : `assets/AnnonceTurkiyeExpo-TR_1.mp4`
- Images dans le dossier `assets/`

### 2. Structure des Assets
Créez un dossier `assets/` avec :
- `AnnonceTurkiyeExpo-TR_1.mp4` (vidéo hero)
- Images des événements :
  - `turkiye-expo.jpg`
  - `festival-arts.jpg`
  - `expo-gastro.jpg`
  - `salon-entrepreneurs.jpg`
  - `congres-culture.jpg`
  - `salon-innovation.jpg`
- Images galerie : `gallery-1.jpg` à `gallery-6.jpg`

### 3. Lancement
Ouvrez simplement `index.html` dans votre navigateur.

## 🎯 Points Importants

### ✅ Modifications Appliquées (selon vos remarques)
- ✅ Couleur principale : Turquoise (au lieu du rouge)
- ✅ Navbar fixe (position: fixed)
- ✅ Vidéo hero de 600px de hauteur
- ✅ "Événements à venir" retiré de l'accueil
- ✅ Nouvelle page "Devenir Exposant" créée
- ✅ Page "À propos" séparée avec toutes les infos sur l'entreprise
- ✅ Événements phares uniquement sur l'accueil
- ✅ Galerie d'images conservée
- ✅ Filtres redessinés (pas trop gros)

### 📝 À Faire
1. **Remplacer la vidéo** : Ajoutez `AnnonceTurkiyeExpo-TR_1.mp4` dans `/assets/`
2. **Ajouter les images** : Placez toutes les photos d'événements dans `/assets/`
3. **Logo** : Ajoutez votre logo ISRA Events si disponible
4. **Backend** : Connecter les formulaires à votre système d'emailing
5. **Analytics** : Ajouter Google Analytics ou autre
6. **SEO** : Optimiser les meta tags pour chaque page

## 🔗 API / Backend (À implémenter)

Les formulaires sont actuellement en mode "simulation". Pour les connecter :

1. **Contact & Exposant** :
```javascript
// Dans js/contact.js et js/exhibitor.js
// Remplacer le setTimeout par :
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
```

2. **Billetterie** :
Intégrer un système de billetterie (Eventbrite, Stripe, etc.)

## 🎓 Polices Utilisées

- **Titres** : Playfair Display (élégante, serif)
- **Texte** : Work Sans (moderne, sans-serif)
- Chargées depuis Google Fonts

## 📄 Licence

© 2025 ISRA Events. Tous droits réservés.

## 👨‍💻 Support

Pour toute question ou modification :
- Email : contact@israevents.fr
- Téléphone : +33 1 23 45 67 89

---

**Note** : Ce site est prêt à l'emploi. Il ne manque que les assets (images et vidéo) pour être entièrement fonctionnel.
