import { useContext, useEffect } from 'react'
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { Store } from './Store'



function App() {

  const { state: { mode }, dispatch } = useContext(Store)
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])
  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }



  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>amazon</Navbar.Brand>
          </Container>
          <Nav className='d-flex flex-row '>
            <a href='/cart' className='nav-link '>
              Cart
            </a>
            <a href='/signin' className='nav-link  '>
              Sign In
            </a>


          </Nav>
          <Button variant={mode} onClick={switchModeHandler}>
            <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
          </Button>
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
