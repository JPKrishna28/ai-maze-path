# PathFinder AI - Maze Solver Visualizer

A modern, interactive web application that visualizes various pathfinding algorithms in real-time. Built with React, TypeScript, and Vite, this tool helps users understand how different algorithms explore and find paths through mazes.

## 🚀 Features

### Core Functionality
- **Interactive Grid Editor**: 30x30 grid with clickable cells for creating custom mazes
- **Multiple Pathfinding Algorithms**:
  - **Breadth-First Search (BFS)**: Guarantees shortest path in unweighted grids
  - **Depth-First Search (DFS)**: Explores as far as possible before backtracking
  - **A* Algorithm**: Uses heuristics for optimal pathfinding with Manhattan distance
- **Real-time Visualization**: Watch algorithms explore the maze step by step
- **Maze Generation**: Automatic maze creation with recursive backtracking algorithm
- **Performance Statistics**: Track nodes visited, path length, and execution time

### User Interface
- **Modern Design**: Clean, responsive UI with Tailwind CSS styling
- **Interactive Controls**: Easy-to-use control panel with algorithm selection
- **Visual Feedback**: Different colors for start, end, walls, visited nodes, and final path
- **Mouse Interactions**: 
  - Left-click to place walls, start, or end points
  - Right-click to remove walls
  - Drag to draw walls continuously

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1 with PostCSS and Autoprefixer
- **Icons**: Lucide React 0.344.0
- **Code Quality**: ESLint 9.9.1 with TypeScript support
- **Database**: Supabase integration ready

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ai-maze-path
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎮 How to Use

### Basic Controls

1. **Set Start Point**: Click "Set Start" button, then click any cell to place the green starting point
2. **Set End Point**: Click "Set End" button, then click any cell to place the red destination
3. **Add Walls**: Click "Add Walls" button, then click and drag to create obstacles
4. **Remove Walls**: Right-click on any wall to remove it

### Running Algorithms

1. **Select Algorithm**: Choose from BFS, DFS, or A* in the control panel
2. **Start Visualization**: Click the "Solve" button to watch the algorithm in action
3. **View Results**: See statistics including nodes visited, path length, and execution time

### Additional Features

- **Generate Maze**: Click "Generate Maze" for an automatic maze using recursive backtracking
- **Reset Grid**: Click "Reset" to clear everything and start fresh
- **Clear Path**: Algorithms automatically clear previous visualizations before running

## 📊 Algorithm Details

### Breadth-First Search (BFS)
- **Guarantee**: Always finds the shortest path
- **Time Complexity**: O(V + E) where V is vertices and E is edges
- **Space Complexity**: O(V)
- **Best For**: Unweighted graphs, shortest path guarantee needed

### Depth-First Search (DFS)
- **Guarantee**: Finds a path (not necessarily shortest)
- **Time Complexity**: O(V + E)
- **Space Complexity**: O(V)
- **Best For**: Maze solving, detecting cycles, topological sorting

### A* Algorithm
- **Guarantee**: Finds optimal path with admissible heuristic
- **Time Complexity**: O(b^d) where b is branching factor, d is depth
- **Space Complexity**: O(b^d)
- **Heuristic**: Manhattan distance
- **Best For**: Optimal pathfinding with known goal location

## 🎨 Visual Legend

| Color | Meaning |
|-------|---------|
| 🟢 Green | Starting point |
| 🔴 Red | Destination point |
| ⬛ Black | Walls/obstacles |
| 🟡 Yellow | Nodes explored by algorithm |
| 🟢 Light Green | Final shortest path |
| 🔵 Blue | Current node being processed |
| 🟣 Purple | Frontier nodes (A* algorithm) |

## 🏗️ Project Structure

```
src/
├── algorithms/          # Pathfinding algorithm implementations
│   ├── astar.ts        # A* algorithm with priority queue
│   ├── bfs.ts          # Breadth-First Search
│   └── dfs.ts          # Depth-First Search
├── components/          # React components
│   ├── ControlPanel.tsx # Algorithm controls and statistics
│   ├── Grid.tsx        # Main grid container
│   └── GridCell.tsx    # Individual cell component
├── hooks/              # Custom React hooks
│   └── usePathfindingVisualization.ts # Animation and state management
├── types/              # TypeScript type definitions
│   └── grid.ts         # Grid and algorithm types
├── utils/              # Utility functions
│   └── mazeGenerator.ts # Recursive backtracking maze generation
└── App.tsx             # Main application component
```

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code analysis
- `npm run typecheck` - Run TypeScript type checking

## 🚀 Deployment

The application is optimized for static hosting platforms:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Additional algorithms (Dijkstra, Greedy Best-First)
- [ ] Variable grid sizes and cell costs
- [ ] Save/load maze configurations
- [ ] Step-by-step debugging mode
- [ ] Performance comparison charts
- [ ] Mobile touch controls optimization
- [ ] Algorithm speed controls
- [ ] Pattern-based maze templates

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and version information

## ⭐ Acknowledgments

- Inspired by classical pathfinding algorithm visualizers
- Built with modern React and TypeScript best practices
- UI designed with accessibility and user experience in mind
