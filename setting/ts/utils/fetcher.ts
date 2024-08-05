import axios from "axios";

// fetcher 활용(연결관계 확인하기)
// get 요청에는 두번째 자리
const fetcher = (url: string) => {
    axios.get(url, {withCredentials: true,
    }).then((response) => response.data);
};

export  default  fetcher;