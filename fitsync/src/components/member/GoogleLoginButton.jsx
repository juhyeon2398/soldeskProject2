import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../action/userAction';

const SpinnerAnimation = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const GoogleButton = styled.button`
  background-color: #ffffff;
  color: #3c4043;
  border: 2px solid #dadce0;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.2s ease;
  height: 56px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #f8f9fa;
    border-color: #c4c7c5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

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

const GoogleIcon = styled.svg`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid #4285f4;
  border-radius: 50%;
  animation: ${SpinnerAnimation} 1s linear infinite;
  flex-shrink: 0;
`;

const ButtonText = styled.span`
  font-weight: 500;
  font-size: 1.6rem;
  color: #3c4043;
`;

const GoogleLoginButton = ({ setLoading }) => {
  const [loading, setLocalLoading] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Google API 스크립트 로드
    const loadGoogleScript = () => {
      // 이미 로드된 경우
      if (window.google && window.google.accounts) {
        setGoogleLoaded(true);
        return Promise.resolve();
      }

      // 스크립트가 이미 있는지 확인
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        return new Promise((resolve) => {
          existingScript.onload = () => {
            setGoogleLoaded(true);
            resolve();
          };
        });
      }

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setGoogleLoaded(true);
          resolve();
        };
        script.onerror = () => {
          console.error('Google 스크립트 로드 실패');
          reject(new Error('Google 스크립트 로드 실패'));
        };
        document.head.appendChild(script);
      });
    };

    loadGoogleScript().catch(console.error);
  }, []);

  const handleGoogleLogin = async () => {
    if (!googleLoaded) {
      alert('Google 서비스를 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setLocalLoading(true);
    setLoading && setLoading(true);

    try {
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      
      if (!clientId || clientId === 'your_google_client_id_here') {
        throw new Error('Google 클라이언트 ID가 올바르게 설정되지 않았습니다.');
      }

      if (!window.google || !window.google.accounts) {
        throw new Error('Google API가 로드되지 않았습니다.');
      }

      // 직접 OAuth2 로그인 시도 (One-tap 건너뛰기)
      handleOAuth2Login(clientId);

    } catch (err) {
      console.error('Google 로그인 오류:', err);
      alert('Google 로그인 중 오류가 발생했습니다: ' + err.message);
      setLocalLoading(false);
      setLoading && setLoading(false);
    }
  };

  const handleOAuth2Login = (clientId) => {
    try {
      if (!window.google?.accounts?.oauth2) {
        alert('Google OAuth2 서비스를 사용할 수 없습니다.');
        setLocalLoading(false);
        setLoading && setLoading(false);
        return;
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile',
        prompt: 'select_account',  // 항상 계정 선택 화면 표시
        callback: (response) => {
          if (response.access_token) {
            fetchUserInfo(response.access_token);
          } else if (response.error) {
            console.error('OAuth2 오류:', response.error);
            alert(`Google 로그인 오류: ${response.error}`);
            setLocalLoading(false);
            setLoading && setLoading(false);
          } else {
            alert('Google 로그인에 실패했습니다. 다시 시도해주세요.');
            setLocalLoading(false);
            setLoading && setLoading(false);
          }
        },
        error_callback: (error) => {
          console.error('OAuth2 에러 콜백:', error);
          alert(`Google 로그인 오류: ${error.type || 'Unknown error'}`);
          setLocalLoading(false);
          setLoading && setLoading(false);
        }
      });
      
      client.requestAccessToken({
        prompt: 'select_account'  // 계정 선택 강제
      });
    } catch (error) {
      console.error('OAuth2 초기화 오류:', error);
      alert('Google 로그인 초기화에 실패했습니다.');
      setLocalLoading(false);
      setLoading && setLoading(false);
    }
  };

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
      
      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는데 실패했습니다.');
      }

      const userInfo = await response.json();
      
      // 사용자 정보를 백엔드로 전송
      const result = await axios.post('/auth/google', {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.data.success) {
        await dispatch(setUser(result.data.user));
        
        // 약간의 지연 후 페이지 이동 (Redux 상태 업데이트 완료 대기)
        setTimeout(() => {
          if (!result.data.user.isLogin) {
            nav('/register');
          } else {
            nav('/');
          }
        }, 50);
      } else {
        console.error('백엔드 로그인 실패:', result.data.message);
        alert(result.data.message || 'Google 로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
      alert('사용자 정보를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLocalLoading(false);
      setLoading && setLoading(false);
    }
  };

  return (
    <GoogleButton onClick={handleGoogleLogin} disabled={loading || !googleLoaded}>
      {loading ? (
        <>
          <Spinner />
          <ButtonText>로그인 중...</ButtonText>
        </>
      ) : !googleLoaded ? (
        <>
          <Spinner />
          <ButtonText>Google 로딩 중...</ButtonText>
        </>
      ) : (
        <>
          <GoogleIcon viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </GoogleIcon>
          <ButtonText>Google로 로그인</ButtonText>
        </>
      )}
    </GoogleButton>
  );
};

export default GoogleLoginButton;