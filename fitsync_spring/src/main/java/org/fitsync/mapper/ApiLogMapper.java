package org.fitsync.mapper;

import java.util.List;
import java.util.Map;

import org.fitsync.domain.ApiLogSearchCriteria;
import org.fitsync.domain.ApiLogStatsDTO;
import org.fitsync.domain.ApiLogVO;

public interface ApiLogMapper {
    void insertApiLog(ApiLogVO log);
    // idx 일치 log 불러오기
    ApiLogVO selectApiLogById(int apilog_idx);
    // api log 전부 불러오기
    List<ApiLogVO> selectApiList();
    // api 통계 가져오기
    ApiLogStatsDTO selectApiLogStats(ApiLogSearchCriteria cri);
    // 예외 내용 입력
    void updateExceptionReason(ApiLogVO apiLogVO);
    // 피드백 서버
    void updateFeedBack(ApiLogVO apiLogVO);
    // 사용자 행동 분석
    int updateUserAction(ApiLogVO apiLogVO);
    // 사용자 월별 토큰 사용량
    Map<String, Object> selectTokenUsageDuringLatestPaidOrder(int memberIdx);
    // 사용자별 AI 사용 여부 확인 (최초 1회 제공을 위해)
    ApiLogVO selectFirstRoutineLog(int memberIdx);
    // 회원별 api log
    List<ApiLogVO> selectByMemberId(int memberIdx);
}
