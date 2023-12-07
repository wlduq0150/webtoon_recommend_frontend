import { useState } from 'react';
import { IoLockClosedOutline } from 'react-icons/io5';
import { LuUser } from 'react-icons/lu';
import styled from 'styled-components';
import { logoImage, server } from '../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Header = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    justify-content: center;
`;

const HeaderLogo = styled.img`
    width: 100px;
    height: 100px;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LoginInputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const LoginLabel = styled.label`
  margin-right: 10px;
`;

const LoginInput = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 5px;
`;

const LoginSubmit = styled.button`
  box-sizing: border-box;
  width: 300px;
  padding: 10px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const Login = () => {
    const [email, modifierEmail] = useState<string>('');
    const [password, modifierPassword] = useState<string>('');
    const navigator = useNavigate();

    const onEmailChange = (e: any) => {
        modifierEmail(e.target.value);
    };

    const onPasswordChange = (e: any) => {
        modifierPassword(e.target.value);
    };

    const onLoginClick = async (e: any) => {
        const response = await axios.post(server + "/auth/login", {
            email,
            password
        });

        if (response.status !== 201) {
            window.alert("로그인에 실패했습니다");
            return;
        }

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        navigator("/");
    };

    return (
        <Container>
            <div>
                <Header>
                    <HeaderLogo src={logoImage}></HeaderLogo>
                </Header>
                
                <LoginBox>
                    <LoginInputBox>
                        <LoginLabel>
                            <LuUser size={32} />
                        </LoginLabel>
                        <LoginInput
                            name="email"
                            onChange={onEmailChange}
                            value={email}
                            placeholder="이메일"
                        ></LoginInput>
                    </LoginInputBox>

                    <LoginInputBox>
                        <LoginLabel>
                            <IoLockClosedOutline size={32} />
                        </LoginLabel>
                        <LoginInput
                            name="password"
                            type="password"
                            onChange={onPasswordChange}
                            value={password}
                            placeholder="비밀번호"
                        ></LoginInput>
                    </LoginInputBox>

                    <LoginSubmit onClick={onLoginClick}>로그인</LoginSubmit>
                </LoginBox>
            </div>
            
        </Container>
    );
};

export default Login;