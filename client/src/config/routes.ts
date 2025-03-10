import viteEnvValue from '../helpers/viteEnvValue'

const baseUrl = () => {
  if (viteEnvValue('VITE_API_HOST')) return viteEnvValue('VITE_API_HOST')
  return viteEnvValue('VITE_API_HOST') === 'test' ? 'http://localhost:7779' : 'http://localhost:7777'
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
