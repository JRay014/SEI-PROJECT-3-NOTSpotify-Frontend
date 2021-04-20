import {Container,Menu,Button} from 'semantic-ui-react'

export default function Nav (props){
  return(
    <Menu
      fixed='top'
      size='large'
      >
      <Container>
        <Menu.Item href='/'>Home</Menu.Item>
        <Menu.Item position='right'>
          {props.currentUser?
          <>
          Hello, {props.currentUser.firstName}
          <Button onClick={props.logout} href='/sessions' method='DELETE'>Logout</Button>
          </>:
          <>
          <Button href='/users/register'>Sign Up</Button>

          <Button href='/sessions/new'>Log In</Button>
          </>
          }
        </Menu.Item>
      </Container>
    </Menu>
  )
}
