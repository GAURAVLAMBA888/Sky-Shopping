import styled from 'styled-components'

const BackDrop = styled.div`
  position: fixed;
    background-color: rgba(100, 100, 100, 0.8);
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Loader = styled.div`
  border: 12px solid #f3f3f3;
    border-radius: 50%;
    border-top: 12px solid teal;
    width: 100px;
    height: 100px;
    animation: spin 0.5s linear infinite;

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Loading = () => {
  return (
    <BackDrop>
        <Loader></Loader>
    </BackDrop>    
  )
}

export default Loading