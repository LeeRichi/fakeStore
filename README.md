## Key Concepts
1. To use redux to fetch data from a 3rd party service(https://fakeapi.platzi.com/) and display in MUI.
2. Home page, product page, profile page and cart page are implemented.
3. Implemets the logic of sort and filter by the different end points.
4. Use google auth to login, only the admin can add, remove, edit the products.
5. There's only ONE admin: admin@google.com, password: 12345678 for testing the function.

## Tech Stack
1. typescript
2. redux(older version)
3. mui

## yet to do
1. unit testing

## Result
deploy url: https://richfakestore.netlify.app/

## Instructure
1. clone the app: https://github.com/LeeRichi/fakeStore.git
2. Run 'npm i --legacy-peer-deps' in root folder in terminal.
3. In root folder, run script 'npm start'.

## Sturcture
````
├── src
│   ├── App.tsx
│   ├── assets
│   │   └── rich-logo.png
│   ├── components
│   │   ├── Admin
│   │   │   ├── Add.tsx
│   │   │   ├── Delete.tsx
│   │   │   ├── Edit.tsx
│   │   │   └── index.tsx
│   │   ├── Filterbar.tsx
│   │   ├── LogIn.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── SignUp.tsx
│   ├── firebaseConfig.js
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   ├── Cart.tsx
│   │   ├── Home.tsx
│   │   ├── LogInPage.tsx
│   │   ├── ProductDetail.tsx
│   │   └── ProfilePage.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── store
│   │   ├── adminReducer.tsx
│   │   ├── cartSlice.tsx
│   │   ├── productSlice.tsx
│   │   └── userSlice.tsx
│   └── types
│       └── LogInPage.tsx
````
