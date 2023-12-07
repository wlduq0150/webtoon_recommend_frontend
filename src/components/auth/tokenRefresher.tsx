import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../constants";

export default function TokenRefresher() {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: server,
      headers: { "Content-type": "application/json" },
    });

    const interceptor = axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalConfig = error.config;
        const msg = error.response.data.message;
        const status = error.response.status;
        let result;
        
        if (status === 401) {
          if (msg === "accessToken expired") {
            console.log(localStorage.getItem("refreshToken"));
            const res = await axios({
              url: `${server}/auth/refresh`,
              method: "Post",
              headers: {
                Authorization: localStorage.getItem("refreshToken"),
              },
            });
            
            console.log("새로운 토큰: ", res.data.accessToken);
            localStorage.setItem("accessToken", res.data.accessToken);
            
            originalConfig.headers["Authorization"]="Bearer "+res.data.accessToken;

            result = await refreshAPI(originalConfig);
          } 
          else if (msg === "refreshToken expired") {
            localStorage.clear();
            navigate("/login");
            window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.");
          } 
        //   else if (msg === "mail token expired") {
        //     window.alert("비밀번호 변경 시간이 만료되었습니다. 다시 요청해주세요.");
        //   }
        } 
        else if (status === 400 || status === 404 || status === 409) {
          window.alert(msg);
        }
        return result;
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
  return <></>;
}