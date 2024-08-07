import React, {useCallback, useState} from "react";
import useInput from "@hooks/useInput";
import {Form, Header, Label, Error, Button, LinkContainer, Input} from "@pages/SignUp/styles";
import axios from "axios";
import {Link} from "react-router-dom";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

// Alt + j를 누르면 동시에 변경 가능
const LogIn = () => {
    // SWR 활용, 강의는 revaildate지만 현 버전에선 mutate로 대체 해당 사항 확인하
    const {data, error, mutate} = useSWR("http://localhost:3095/api/users", fetcher, {
        dedupingInterval: 100000,
    });
    const [logInError, setLogInError] = useState(false);
    const [email, onChangeEmail] = useInput("");
    const [password, onChangePassword] = useInput("");

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setLogInError(false);
        axios.post('http://localhost:3095/api/users/login', {
            email, password
        //     post에는 3번째 자리에 withCredentials가 위치해야한다.
        }, {withCredentials: true},
            ).then(() => {
            mutate();
        }).catch((error) => {
            setLogInError(error.response?.data?.statusCode === 401);
        });
    }, [email, password]);

    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>이메일 주소</span>
                    <div>
                        <Input type="email" id="email" name="email"
                        value={email} onChange={onChangeEmail}/>
                    </div>
                </Label>
                <Label id="pasword-label">
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" id="password" name="password"
                               value={password} onChange={onChangePassword}/>
                    </div>
                    {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
                </Label>
                <Button type="submit">로그인</Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요?&nbsp;
                <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
        </div>
    )
};

export default LogIn;