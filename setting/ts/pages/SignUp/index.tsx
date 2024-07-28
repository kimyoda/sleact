import React, {useCallback, useState} from "react";
import {Form, Error, Success, Label, Input, Header, Button, LinkContainer} from "./styles"
import useInput from "@hooks/useInput";
import axios from "axios";
// Alt + j를 누르면 동시에 변경 가능
const SignUp = () => {
    const [signUpError, setSignUpError] = useState("");
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [mismatchError, setMismatchError] = useState(false);
    const [email, onChangeEmail] = useInput("");
    const [nickname, onChangeNickname] = useInput("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
        // 비밀번호를 바꿀 때 passwordCheck라는 비밀번호 확인 체크
        setMismatchError(e.target.value !== passwordCheck);
    }, [passwordCheck]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        // 비밀번호 확인을 바꿀때는 비밀번호와 틀린 지 확인
        setMismatchError(e.target.value !== password);
    }, [password]);

    // 안에 값의 함수를 넣어서 값을 받는다. 리렌더링을 줄이기위해 사용한다.
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!mismatchError && nickname) {
            console.log("서버로 회원가입하기");
            // RESTPul api의 주소로 아래 데이터를 post로 보낸다.
            // 요청 보내기 직전에 초기화를 해줘야한다. 첫번째 요청때 남아있는 결과가 문제가 생길 수 있어 초기화 해야한다.
            setSignUpError("");
            setSignUpSuccess(false);
            axios.post("/api/users", {
                email, nickname, password,
            })
                .then((response) => {
                    console.log(response);
                    setSignUpSuccess(true);
                })
                .catch((error) => {
                    console.log(error.response);
                    setSignUpError(error.response.data);
                })
                .finally(() => {});
        }
    }, [email, nickname, password, passwordCheck, mismatchError]);


    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>이메일 주소</span>
                    <div>
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                    </div>
                </Label>
                <Label id="nickname-label">
                    <span>닉네임</span>
                    <div>
                        <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
                    </div>
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                    </div>
                </Label>
                <Label id="password-check-label">
                    <span>비밀번호 확인</span>
                    <div>
                        <Input
                            type="password"
                            id="password-check"
                            name="password-check"
                            value={passwordCheck}
                            onChange={onChangePasswordCheck}
                        />
                    </div>
                    {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
                    {!nickname && <Error>닉네임을 입력해주세요.</Error>}
                    {signUpError && <Error>{signUpError}</Error>}
                    {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
                </Label>
                <Button type="submit">회원가입</Button>
            </Form>
            <LinkContainer>
                이미 회원이신가요?&nbsp;
                <a href="/login">로그인 하러가기</a>
            </LinkContainer>
        </div>
    );
};

export default SignUp;