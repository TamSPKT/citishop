import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import logo from "../assets/images/logo.png";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.img`
width: 100px;
height: 60px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 14px;
`;

const SocialContainer = styled.div`
  display: flex;
  ${mobile({ display: 'none' })}
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo src={logo}/>
        <Desc>
          CiTi Shop tự hào là một trong những chuỗi cửa hàng mỹ phẩm lớn và đáng tin cậy nhất tại Sài Gòn, nơi có thể thỏa mãn niềm đam mê trong cuộc chơi phấn son của hàng triệu tín đồ yêu shopping từ Nam ra Bắc.
          </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>VỀ CHÚNG TÔI</Title>
        <List>
          <ListItem>Giới thiệu</ListItem>
          <ListItem>Điều khoản sử dụng</ListItem>
          <ListItem>Tuyển dụng</ListItem>
          <ListItem>Chính sách bảo mật</ListItem>
          <ListItem>Liên hệ tư vấn</ListItem>
          <ListItem>Hướng dẫn đặt hàng</ListItem>
          <ListItem>Phương thức vận chuyển</ListItem>
          <ListItem>Chính sách đổi trả</ListItem>
       
          
        </List>
          
      </Center>
      <Right>
        <Title>LIÊN HỆ</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/>01 Võ Văn Ngân, Phường Linh Chiểu, Tp Thủ Đức, Tp Hồ Chí Minh
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/>0383060695
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> citishop@gmail.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;