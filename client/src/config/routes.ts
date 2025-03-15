import viteEnvValue from './viteEnvValue.js'

const baseUrl = () => {
  if (viteEnvValue('VITE_API_HOST')) return viteEnvValue('VITE_API_HOST')
  return viteEnvValue('VITE_PSYCHIC_ENV') === 'test' ? 'http://localhost:7778' : 'http://localhost:7777'
}

const routes = {
  baseURL: baseUrl(),

  app: {
    home: '/',
    login: '/login',
    logout: '/logout',
    signup: '/signup',
  },
}

export default routes
