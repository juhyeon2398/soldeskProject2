import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { setUser } from '../../action/userAction';
import { useNavigate } from 'react-router-dom';

const SpinnerAnimation = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const LoginButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: #03C75A;
  color: white;
  border: 2px solid #03C75A;
  border-radius: 12px;
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 16px 24px;

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const NaverIcon = styled.svg`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${SpinnerAnimation} 1s linear infinite;
  flex-shrink: 0;
`;

const ButtonText = styled.span`
  font-weight: 500;
  font-size: 1.6rem;
`;

const NaverLoginButton = ({ setLoading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState('checking');
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('/auth/naver/status', {
        withCredentials: true
      });
      
      if (response.data.isLoggedIn) {
        setLoginStatus('loggedIn');
      } else {
        setLoginStatus('loggedOut');
      }
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
      setLoginStatus('loggedOut');
    }
  };

  const handleNaverLogin = async () => {
    setIsLoading(true);
    setLoading && setLoading(true); // 추가
    
    try {
      const response = await axios.get('/auth/naver/url');
      if (response.data.loginUrl) {
        window.location.href = response.data.loginUrl;
      } else {
        alert('로그인 URL 생성에 실패했습니다.');
        setIsLoading(false);
        setLoading && setLoading(false); // 추가
      }
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.');
      setIsLoading(false);
      setLoading && setLoading(false); // 추가
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (code && state) {
      setLoading && setLoading(true); // 추가
      
      axios.get(`/auth/naver/callback?code=${code}&state=${state}`, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            dispatch(setUser(res.data.user));
            setLoginStatus('loggedIn');
            if (!res.data.user.isLogin) {
              nav('/register');
            } else {
              nav('/');
            }
            window.history.replaceState({}, document.title, window.location.pathname);
            // 성공 시에는 페이지 이동하므로 setLoading(false) 불필요
          } else {
            alert(res.data.message || '로그인 실패');
            setLoginStatus('loggedOut');
            setLoading && setLoading(false); // 추가
          }
        })
        .catch(() => {
          alert('로그인 처리 중 오류');
          setLoginStatus('loggedOut');
          setLoading && setLoading(false); // 추가
        });
    }
  }, [dispatch, nav, setLoading]);

  if (loginStatus === 'checking') {
    return (
      <LoginButton disabled>
        <Spinner />
        <ButtonText>상태 확인 중...</ButtonText>
      </LoginButton>
    );
  }

  return (
    <LoginButton $isLoading={isLoading} onClick={handleNaverLogin} disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner />
          <ButtonText>로그인 중...</ButtonText>
        </>
      ) : (
        <>
          <NaverIcon viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z"/>
          </NaverIcon>
          <ButtonText>네이버로 로그인</ButtonText>
        </>
      )}
    </LoginButton>
  );
};

export default NaverLoginButton;