import React from "react";
import "../../styles/common.css";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="wrap">
      <div className="login-container">
        <img src="/img/logo.svg" alt="dctrend" className="logo" />
        <div className="login-title">Trip Plan</div>
        <div className="login-buttons">
          <button className="kakao-btn">
            <img src="/img/kakao.svg" alt="Kakao" />
            카카오로 로그인하기
          </button>
          <button className="naver-btn">
            <img src="/img/naver.svg" alt="Naver" />
            네이버로 로그인하기
          </button>
        </div>
        <div className="login-info">
          <p className="info-icon">-</p>
          <p className="info-text">
            소셜로그인 시, 트립플랜의 <a href="#">서비스 이용약관</a> 및
            <a href="#">개인정보 처리방침</a> 에 동의한 것으로 간주합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
