## ✨ Landing Page – Silicon Community

This is a responsive landing page built using **React**, **TypeScript**, and **Tailwind CSS** based on the following Figma design:

🎨 **Figma Design**:  
[Silicon Community – Figma](https://www.figma.com/design/y2GshAJT35rHB9dQmzDYx4/Silicon--Community-?node-id=4424-20372&t=z6N05ihN2zgl7TWL-0)

### 🛠 Tech Stack

- ⚛️ React
- 🧑‍💻 TypeScript
- 🎨 Tailwind CSS

### 📸 Preview

<!-- Optional: Add a screenshot of the landing page -->
![Landing Page Screenshot](./screenshot.png)


### Project Folder Structure
```
app/
├── public/
├── src/
│   ├── assets/               # Images, icons, fonts, etc.
│   ├── components/
│   │   ├── atoms/            # Button, Input, Label, etc.
│   │   ├── molecules/        # SearchBar, CardHeader, etc.
│   │   ├── organisms/        # NavBar, SideBar, PostList, etc.
│   │   ├── templates/        # Layouts combining organisms
│   │   └── pages/            # Actual pages (Home, Dashboard, etc.)
│   ├── app/                  # Redux store config
│   │   └── store.js
│   ├── features/             # Redux slices, e.g., user, posts
│   │   └── user/userSlice.js
│   ├── hooks/                # Custom React hooks
│   ├── styles/               # Global styles (Tailwind config extensions, etc.)
│   ├── utils/                # Helper functions, constants
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```