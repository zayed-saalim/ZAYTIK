# ZAY TIK - Tic Tac Toe Game

A responsive, accessible, and visually appealing Tic Tac Toe game that works on laptops, tablets, and mobile phones.

## Features

1. **Responsive Design** - Adapts to different screen sizes (desktop, tablet, mobile)
2. **Accessibility** - Keyboard navigable with ARIA attributes for screen readers
3. **Game Features**:
   - Two-player turn-based gameplay
   - Win/draw detection
   - Game statistics tracking (X wins, O wins, draws)
   - Restart functionality
4. **Visual Appeal**:
   - Modern gradient design
   - Dark/light theme toggle
   - Smooth animations and hover effects
5. **Developer Information** - Link to developer portfolio

## How to Run Locally

### Option 1: Direct File Opening
1. Download all three files (`index.html`, `style.css`, `script.js`) to the same directory.
2. Open `index.html` in any modern web browser.

### Option 2: Using a Local Server (Recommended)
1. Install a local HTTP server if you don't have one:
   - For Node.js: `npm install -g http-server`
   - For Python: Python comes with `http.server` module
2. Navigate to the directory containing the files
3. Start the server:
   - Node.js: `http-server`
   - Python 3: `python -m http.server 8000`
4. Open your browser and navigate to `http://localhost:8000` (or the port shown)

## Game Controls

### Mouse/Touch:
- Click on any empty cell to place your mark (X or O)
- Click "Restart Game" to reset
- Click "Toggle Theme" to switch between dark and light modes
- Click "Developer Information" to visit the developer's portfolio

### Keyboard:
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Select a cell or activate a button
- **R**: Restart the game
- **T**: Toggle between dark and light themes

## Testing

The application has been tested on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablets (iPad, Android tablets)
- Mobile phones (iPhone, Android phones)

## Accessibility Features

- ARIA roles and properties for screen readers
- Keyboard navigation support
- High contrast color schemes
- Focus indicators for keyboard users
- Screen reader announcements for game state changes

## Browser Compatibility

Works on all modern browsers that support:
- CSS Grid
- Flexbox
- ES6 JavaScript
- CSS Custom Properties

## Files

- `index.html` - Main HTML structure
- `style.css` - All styling and responsive design
- `script.js` - Game logic and interactivity

## Credits

Developed as a responsive web application project with accessibility in mind.

The "Developer Information" button links to: https://zayed-saalim.github.io/protfolio/