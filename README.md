# F1 Race Analytics Dashboard 🏎️

A modern, full-stack Formula 1 analytics platform providing real-time and historical race data visualization and analysis.

## Features 🌟

- Real-time race data visualization
- Historical race statistics and analysis
- Driver and team performance metrics
- Interactive charts and comparisons
- Tire strategy analysis
- Pit stop duration tracking
- User accounts with favorites
- Live race updates integration

## Tech Stack 💻

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- Styled-components for styling
- Chart.js/D3.js for visualizations
- React Router v6
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- JWT authentication
- RESTful API

## Color Palette 🎨

- Primary Red: #ef233c
- Light Gray: #e5e5e5
- White: #ffffff
- Dark Gray: #2b2d42
- Secondary Gray: #8d99ae

## Getting Started 🚀

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone [repository-url]
\`\`\`

2. Install dependencies:
\`\`\`bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
\`\`\`

3. Set up environment variables:
   - Create `.env` files in both client and server directories
   - Follow the `.env.example` templates

4. Start the development servers:
\`\`\`bash
# Start frontend (from client directory)
npm run dev

# Start backend (from server directory)
npm run dev
\`\`\`

## Project Structure 📁

\`\`\`
f1-analytics/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── pages/        # Page components
│   │   │   ├── services/     # API services
│   │   │   ├── store/        # Redux store
│   │   │   ├── styles/       # Global styles
│   │   │   ├── types/        # TypeScript types
│   │   │   └── utils/        # Utility functions
│   │   └── package.json
│   │
│   ├── server/                # Backend Node.js application
│   │   ├── src/
│   │   │   ├── config/       # Configuration files
│   │   │   ├── controllers/  # Route controllers
│   │   │   ├── middleware/   # Custom middleware
│   │   │   ├── models/       # Database models
│   │   │   ├── routes/       # API routes
│   │   │   ├── services/     # Business logic
│   │   │   ├── types/        # TypeScript types
│   │   │   └── utils/        # Utility functions
│   │   └── package.json
│   │
│   └── README.md
│
└── README.md
\`\`\`

## API Documentation 📚

Detailed API documentation can be found in the [API.md](./API.md) file.

## Contributing 🤝

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
