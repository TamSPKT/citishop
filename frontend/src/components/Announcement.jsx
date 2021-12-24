import styled from 'styled-components'

const Container = styled.div`
  height: 30px;
  background-color: #d4838d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;


const Announcement = () => {
  return (
    <div>
      <Container>
        Siêu sale lễ hội!
      </Container>
      
    </div>
  )
}

export default Announcement

