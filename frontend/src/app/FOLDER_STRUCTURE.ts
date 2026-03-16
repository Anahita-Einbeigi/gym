/**
 * Angular Project Structure Guide
 * 
 * This project follows Angular's recommended folder structure:
 */

export const FOLDER_STRUCTURE = {
  app: {
    description: 'Root app folder',
    children: {
      core: {
        description: 'Core module - Services, Guards, Interceptors used application-wide',
        children: {
          services: {
            description: 'Application services (AuthService, etc)',
            files: ['auth.service.ts', 'index.ts']
          },
          guards: {
            description: 'Route guards for protecting routes'
          }
        }
      },
      shared: {
        description: 'Shared module - Reusable components, pipes, directives',
        children: {
          components: {
            description: 'Shared components (Navbar, Footer, etc)',
            files: ['navbar.component.ts', 'footer.component.ts', 'index.ts']
          },
          pipes: {
            description: 'Shared pipes for data transformation'
          },
          directives: {
            description: 'Shared directives'
          }
        }
      },
      pages: {
        description: 'Page components - Each page has its own folder with ts, html, css, spec.ts',
        children: {
          home: {
            description: 'Home page',
            files: ['home.ts', 'home.html', 'home.css', 'home.spec.ts']
          },
          booking: {
            description: 'Booking page',
            files: ['booking.ts', 'booking.html', 'booking.css', 'booking.spec.ts']
          },
          login: {
            description: 'Login page',
            files: ['login.ts', 'login.html', 'login.css', 'login.spec.ts']
          },
          register: {
            description: 'Register page',
            files: ['register.ts', 'register.html', 'register.css', 'register.spec.ts']
          }
        }
      },
      features: {
        description: 'Features module - Can contain feature-specific components and services'
      },
      app_files: {
        description: 'Root app files',
        files: ['app.ts', 'app.routes.ts', 'app.html', 'app.css', 'app.config.ts']
      }
    }
  }
};
