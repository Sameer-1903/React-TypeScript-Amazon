import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'



function App() {


  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar bg='dark' variant='dark' expand="ig">
          <Container>
            <Navbar.Brand>amazon</Navbar.Brand>
          </Container>
          <Nav className='d-flex flex-row'>
            <a href='/cart' className='nav-link mx-2'>
              Cart
            </a>
            <a href='/signin' className='nav-link mx-2'>
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet></Outlet>
        </Container>

      </main>
      <footer>
        <div className='text-center'>
          All rights reserved
        </div>
      </footer>
    </div>
  )
}

export default App
