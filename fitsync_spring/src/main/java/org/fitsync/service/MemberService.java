package org.fitsync.service;

import java.util.List;
import java.util.Map;

import org.fitsync.domain.AwardsVO;
import org.fitsync.domain.MemberVO;
import org.fitsync.domain.ReviewVO;

public interface MemberService {
	// 유저 존재여부
	public MemberVO getFindUser(String member_email);
	// 유저 추가 입력
	public boolean insertUser(Map<String, String> body);
	
	// 트레이너 정보 조회
    public MemberVO getTrainerByIdx(int memberIdx);
    // 트레이너의 자격증/수상경력/학위 조회
    public List<AwardsVO> getAwardsByMemberIdx(int memberIdx);
    // 트레이너의 리뷰 목록 조회
    public List<ReviewVO> getReviewsByMemberIdx(int memberIdx);
    // 트레이너 정보 수정
	public void updateTrainerProfile(MemberVO member);
    // 트레이너 목록 가져오기
	public List<MemberVO> getTrainerList();
	// AI 요청시 필요 정보
	public MemberVO getMemberForAIRecommendation(int memberIdx);
}
