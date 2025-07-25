package org.fitsync.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.fitsync.domain.MatchingVO;

public interface MatchingMapper {
	
	public List<MatchingVO> getMatchedMembers(@Param("trainerIdx") int trainerIdx);
    public MatchingVO selectMatchingByTrainerAndUser(@Param("userIdx") int userIdx);
    public void updateMatchingRemainMinusOne(@Param("matchingIdx") int matchingIdx);
}