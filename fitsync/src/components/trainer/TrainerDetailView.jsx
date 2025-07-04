import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdChat } from 'react-icons/md';

import TrainerProfileHeader from './TrainerProfileHeader';
import TrainerIntroSection from './TrainerIntroSection';
import TrainerReviewSection from './TrainerReviewSection';

const TrainerDetailView = () => {
  const { trainerIdx } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const loginUserId = user?.member_email;

  const [trainer, setTrainer] = useState(null);
  const [editedTrainer, setEditedTrainer] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('소개');
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    axios.get(`/trainer/profile/${trainerIdx}`)
      .then((res) => {
        const data = res.data;

        const trainerData = {
          member_idx: data.member_idx,
          member_email: data.member_email,
          name: data.member_name,
          images: data.member_info_image ? data.member_info_image.split(',') : [],
          description: data.member_info,
          certifications: data.awards ? data.awards.map(a => `${a.awards_category} - ${a.awards_name}`) : [],
          availableTime: data.member_time ? `월~토 ${data.member_time} (일요일 휴무)` : '',
          priceBase: data.member_price,
          reviewList: data.reviews || [],
          intro: data.member_intro || '',
          specialties: data.specialties || [],
          lessons: data.lessons || []
        };
        console.log(data);
        
        
        setTrainer(trainerData);
        setEditedTrainer(trainerData);
      })
      .catch(console.error);
  }, [trainerIdx]);

  const isLoggedIn = !!loginUserId;

  const handleConsultClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate(`/consult/${trainer.member_idx}`);
    }
  };

  const handleEditToggle = async () => {
    if (isEditMode) {
      const payload = {
        member_idx: trainerIdx,
        member_intro: editedTrainer.intro || '',
        member_info: editedTrainer.description || '',
        member_price: editedTrainer.priceBase || 0,
        member_info_image: editedTrainer.images?.join(',') || '',
        lessons: editedTrainer.lessons || [],
      };

      try {
        const res = await axios.put(`/trainer/update/${trainerIdx}`, payload, {
          withCredentials: true
        });

        alert('수정이 완료되었습니다.');
        setTrainer(editedTrainer);
      } catch (err) {
        alert('수정 중 오류가 발생했습니다.');
        console.error('[프론트] 수정 실패:', err);
      }
    }

    setIsEditMode(!isEditMode);
  };

  const handleChange = (field, value) => {
    setEditedTrainer(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!trainer || !editedTrainer) return <div style={{ fontSize: '1.1rem' }}>로딩 중...</div>;

  return (
    <div style={{ margin: '0 auto', padding: '1.5rem', fontSize: '3rem' }}>
      <TrainerProfileHeader
        trainer={isEditMode ? editedTrainer : trainer}
        isEdit={isEditMode}
        onChange={handleChange}
        onEditToggle={handleEditToggle}
        loginUserId={loginUserId}
      />

      {/* 탭 메뉴 */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc', marginTop: '2rem' }}>
        {['소개', '후기'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '1rem 0',
              border: 'none',
              background: 'none',
              fontWeight: 600,
              fontSize: '1.2rem',
              color: activeTab === tab ? '#007aff' : '#999',
              borderBottom: activeTab === tab ? '0.2rem solid #007aff' : 'transparent',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 섹션 렌더링 */}
      {activeTab === '소개' && (
        <TrainerIntroSection
          trainer={isEditMode ? editedTrainer : trainer}
          isEdit={isEditMode}
          onChange={handleChange}
          onMoreClick={() => setActiveTab('후기')}
          lessons={isEditMode ? editedTrainer.lessons : trainer.lessons}
          onLessonsChange={(newLessons) => handleChange('lessons', newLessons)}
        />
      )}
      {activeTab === '후기' && <TrainerReviewSection reviews={trainer.reviewList} />}

      {/* 상담 버튼 */}
      {loginUserId !== trainer.member_email && (
        <button
          onClick={handleConsultClick}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            backgroundColor: '#007aff',
            color: 'white',
            border: 'none',
            boxShadow: '0 0.2rem 0.6rem rgba(0,0,0,0.2)',
            cursor: 'pointer',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
          }}
          title="상담하기"
        >
          <MdChat />
        </button>
      )}

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', fontSize: '1.1rem' }}>
            <p>로그인이 필요한 기능입니다.</p>
            <button style={{ marginTop: '1rem' }} onClick={() => navigate('/login')}>로그인 하러가기</button>
            <button style={{ marginLeft: '1rem' }} onClick={() => setShowLoginModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDetailView;
