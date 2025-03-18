# Admin Dashboard

## Overview
The **Admin Dashboard** is a user-friendly and responsive interface designed to manage user logs, transactions, and support tickets efficiently. Built with **React, Vite, and Tailwind CSS**, it ensures a clean and intuitive user experience.

## Features
- 📊 **User Logs Management** - View and interact with user activity logs.
- 💳 **Transaction Handling** - Fetch and display user transactions.
- 🎟️ **Ticketing System** - Pick, close, and manage support tickets.
- 🌗 **Dark Mode Support** - Toggle between light and dark themes.
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices.

## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router
- **API Integration**: Fetching data from backend endpoints

## Installation
### Prerequisites
Ensure you have **Node.js** and **npm** installed.

### Steps
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/admin-dashboard.git
   cd admin-dashboard
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Run the Development Server**
   ```sh
   npm run dev
   ```
4. **Open in Browser**
   Navigate to `http://localhost:5173/`

## Folder Structure
```
admin-dashboard/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page views (Dashboard, Tickets, Transactions)
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # Tailwind CSS and global styles
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point
│   └── routes.jsx         # Application routes
├── public/
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
```

## Customizing Tailwind CSS
If you want to modify styles, update `tailwind.config.js`:
```js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

## API Endpoints
| Feature       | Endpoint                     | Method |
|--------------|-----------------------------|--------|
| Get Users    | `/api/users`                 | GET    |
| Get Logs     | `/api/logs`                  | GET    |
| Get Tickets  | `/api/tickets`               | GET    |
| Close Ticket | `/api/tickets/{id}/close`    | PATCH  |

## Contributing
1. **Fork** the repository.
2. **Create a branch** (`git checkout -b feature-branch`)
3. **Commit changes** (`git commit -m 'Add feature X'`)
4. **Push to GitHub** (`git push origin feature-branch`)
5. **Create a Pull Request**

## License
This project is licensed under the MIT License.

---
**Made with ❤️ by Elizabeth**

