# 🚀 Portfolio Website

A modern, responsive portfolio website built with React 19, Vite, and Tailwind CSS. Features dynamic project loading from GitHub, contact form integration, and a clean, professional design with dark/light theme support.

## ✨ Features

- **Modern React 19** with latest features and performance improvements
- **Blazing Fast Vite** build tool for optimal development experience
- **Tailwind CSS 4** for modern, utility-first styling
- **GitHub Integration** - Automatically fetches and displays your repositories
- **Contact Form** with EmailJS integration for direct messaging
- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Theme** with smooth transitions
- **PWA Ready** - Progressive Web App capabilities
- **SEO Optimized** with proper meta tags and sitemap generation
- **Custom Fonts** with MavenPro typography
- **Modern Icons** using React Icons library

## 🛠️ Tech Stack

- **Frontend:** React 19.1.0, Vite 7.0.4
- **Styling:** Tailwind CSS 4.1.11, Sass
- **Routing:** React Router DOM 6.26.0
- **Forms:** EmailJS Browser 4.4.1
- **Icons:** React Icons 5.3.0
- **Testing:** Vitest, React Testing Library
- **Build Tools:** Vite, PostCSS, Autoprefixer
- **Image Optimization:** Sharp
- **PWA:** Custom service worker implementation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GITHUB_USERNAME=your_github_username
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📜 Available Scripts

- `npm start` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run test suite
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage report
- `npm run optimize-images` - Optimize images for web
- `npm run generate-sitemap` - Generate XML sitemap
- `npm run validate-seo` - Validate SEO implementation

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── App.jsx          # Main application component
│   ├── ProjectFilter.jsx # Project filtering and sorting
│   ├── ContactForm.jsx  # Contact form component
│   └── ...
├── services/            # External service integrations
│   └── githubApi.js     # GitHub API service
├── fonts/               # Custom font files
│   └── MavenPro/
├── images/              # Static images and assets
├── tailwind.css         # Tailwind CSS with custom utilities
├── index.jsx            # Application entry point
└── index.html           # HTML template

public/
├── favicon.ico          # Site favicon
├── manifest.json        # PWA manifest
└── robots.txt           # SEO robots file
```

## 🎨 Customization

### Adding New Projects

Projects are automatically fetched from your GitHub repositories. To customize which projects appear:

1. Add topics/tags to your GitHub repositories
2. Update the filtering logic in `src/components/ProjectFilter.jsx`
3. Or add static projects in the projects array

### Styling

The project uses Tailwind CSS with custom utilities defined in `src/tailwind.css`:

- Custom color variables in CSS custom properties
- MavenPro font family integration
- Dark/light theme support
- Responsive design utilities

### Contact Form

Configure EmailJS in your environment variables to enable the contact form:

1. Create an EmailJS account
2. Set up a service and template
3. Add your credentials to `.env`

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Popular Platforms

**Netlify:**
```bash
npm run build
# Drag and drop dist folder to Netlify
```

**Vercel:**
```bash
npx vercel --prod
```

**GitHub Pages:**
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🔧 Configuration

### Environment Variables

The following environment variables are supported:

- `VITE_EMAILJS_SERVICE_ID` - EmailJS service ID for contact form
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key
- `VITE_GITHUB_USERNAME` - GitHub username for repository fetching

### Vite Configuration

Key configurations in `vite.config.js`:
- React plugin for JSX support
- PostCSS with Tailwind CSS processing
- Build optimization settings
- Development server configuration

## 📱 PWA Features

The portfolio includes Progressive Web App features:

- Offline functionality
- Install prompts
- Optimized caching strategy
- Responsive design
- Fast loading times

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Your Name** - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/your-username/portfolio](https://github.com/your-username/portfolio)

Live Demo: [https://your-portfolio.netlify.app](https://your-portfolio.netlify.app)

---

⭐ Star this repository if you found it helpful!
