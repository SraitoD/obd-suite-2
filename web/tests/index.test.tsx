import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import { useSession } from 'next-auth/react'

// Mock next-auth
jest.mock('next-auth/react')

describe('Home Page', () => {
  it('renders login button when not authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' })

    render(<Home />)

    expect(screen.getByText('Connexion avec Google')).toBeInTheDocument()
  })

  it('renders user email when authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com' } },
      status: 'authenticated'
    })

    render(<Home />)

    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('Déconnexion')).toBeInTheDocument()
  })

  it('renders main sections', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' })

    render(<Home />)

    expect(screen.getByText('OBD Suite 2')).toBeInTheDocument()
    expect(screen.getByText('État du véhicule')).toBeInTheDocument()
    expect(screen.getByText('Derniers trajets')).toBeInTheDocument()
    expect(screen.getByText('Diagnostics récents')).toBeInTheDocument()
  })
})
