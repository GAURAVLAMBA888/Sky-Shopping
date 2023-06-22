import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div`
    font-size: 70px;
    width: 500px;
    height: 100px;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    
    margin: auto;
`

const NotFound = () => {
  return (
    <>
    <Navbar />
    <Container>
        Page Not Found
    </Container>
    </>
  )
}

export default NotFound