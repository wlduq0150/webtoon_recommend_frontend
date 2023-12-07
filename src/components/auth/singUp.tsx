import { useState } from 'react';
import { IoLockClosedOutline } from 'react-icons/io5';
import { LuUser } from 'react-icons/lu';
import { RiHome2Line } from "react-icons/ri";
import { PiGenderIntersex } from "react-icons/pi";
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

const SignupBox = styled.div`
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

const SignupInputBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
`;

const SignupLabel = styled.label`
    margin-right: 10px;
`;

const SignupInput = styled.input`
    padding: 10px;
    width: 100%;
    border: 1px solid #dddddd;
    border-radius: 5px;
`;

const SignupButton = styled.button`
    box-sizing: border-box;
    width: 100%;  /* 수정된 크기 */
    padding: 8px;
    background-color: #4caf50;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-left: 10px;  /* 수정된 마진 */
    &:hover {
        background-color: #45a049;
    }
`;

interface ResultMessageProps {
    success: boolean;
    children: React.ReactNode; // 다른 props가 있다면 추가할 수 있습니다.
}

const ResultMessage: React.FC<ResultMessageProps> = ({ success, children }) => (
    <span style={{ color: success ? 'green' : 'red', fontSize: '14px', position: 'absolute', bottom: '-20px', left: '48px' }}>
        {children}
    </span>
);


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState<number>();
    const [sex, setSex] = useState('');
    const [address, setAddress] = useState('');
    const [isPasswordMatch, setPasswordMatch] = useState(true);
    const [isEmailValid, setEmailValid] = useState(true);
    const [isEmailChecked, setEmailChecked] = useState(false);
    const navigator = useNavigate();

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e: any) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(e.target.value === password);
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        setEmailChecked(false);
    };

    const handleEmailBlur = async () => {
        const response = await axios.get(server + `/auth/emailcheck/${email}`);
        setEmailValid(response.data);
        setEmailChecked(true);
    };

    const handleSignupClick = async () => {
        const checkIsEmailValid = isEmailChecked && isEmailValid;

        if (!checkIsEmailValid) {
            window.alert("이메일 중복확인을 완료해주세요!");
            return;
        }

        if (!isPasswordMatch) {
            window.alert("비밀번호와 확인 비밀번호가 일치하지 않습니다!");
            return;
        }

        const response = await axios.post(server + "/auth/signup", {
            email,
            password,
            name,
            age,
            sex,
            address
        });

        if (!response.data) {
            window.alert("회원가입에 실패했습니다.");
            return;
        }

        navigator("/");
    };

    return (
        <Container>
            <div>
                <Header>
                    <HeaderLogo src={logoImage}></HeaderLogo>
                </Header>
                <SignupBox>
                    <SignupInputBox>
                        <SignupLabel>
                            <LuUser size={32} />
                        </SignupLabel>
                        <SignupInput
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
                            placeholder="이메일"
                        ></SignupInput>
                        <SignupButton onClick={handleEmailBlur}>중복확인</SignupButton>
                        {isEmailChecked && (
                            <ResultMessage success={isEmailValid}>
                                {isEmailValid ? '사용 가능한 이메일입니다.' : '이메일이 유효하지 않습니다.'}
                            </ResultMessage>
                        )}
                    </SignupInputBox>

                    <SignupInputBox>
                        <SignupLabel>
                            <IoLockClosedOutline size={32} />
                        </SignupLabel>
                        <SignupInput
                            name="password"
                            type="password"
                            onChange={handlePasswordChange}
                            value={password}
                            placeholder="비밀번호"
                        ></SignupInput>
                    </SignupInputBox>

                    <SignupInputBox>
                        <SignupLabel>
                            <IoLockClosedOutline size={32} />
                        </SignupLabel>
                        <SignupInput
                            name="confirmPassword"
                            type="password"
                            onChange={handleConfirmPasswordChange}
                            value={confirmPassword}
                            placeholder="비밀번호 확인"
                        ></SignupInput>
                        {!isPasswordMatch && (
                            <ResultMessage success={false}>비밀번호가 일치하지 않습니다.</ResultMessage>
                        )}
                    </SignupInputBox>

                    <SignupInputBox>
                        <SignupLabel> 
                            <LuUser size={32} />
                        </SignupLabel>
                        <SignupInput
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="이름"
                        ></SignupInput>
                    </SignupInputBox>

                    <SignupInputBox>
                        <SignupLabel>
                            <LuUser size={32} />
                        </SignupLabel>
                        <SignupInput
                            name="age"
                            onChange={(e) => setAge(parseInt(e.target.value))}
                            value={age}
                            placeholder="나이"
                        ></SignupInput>
                    </SignupInputBox>

                    <SignupInputBox>
                        <SignupLabel>
                            <PiGenderIntersex size={32} />
                        </SignupLabel>
                        <SignupInput
                            name="sex"
                            onChange={(e) => setSex(e.target.value)}
                            value={sex}
                            placeholder="성별"
                        ></SignupInput>
                    </SignupInputBox>

                    <SignupInputBox>
                        <SignupLabel>
                            <RiHome2Line size={32} /> 
                        </SignupLabel>
                        <SignupInput
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            placeholder="주소"
                        ></SignupInput>
                    </SignupInputBox>

                    <SignupButton onClick={handleSignupClick}>회원가입</SignupButton>
                </SignupBox>
            </div>
           
        </Container>
    );
};

export default Signup;
