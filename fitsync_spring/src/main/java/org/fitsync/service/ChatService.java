package org.fitsync.service;

import java.util.List;
import java.util.Map;

import org.fitsync.domain.ChatAttachVO;
import org.fitsync.domain.MessageVO;
import org.fitsync.domain.RoomVO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

public interface ChatService {

	// 채팅방
	public RoomVO registerRoom(int trainer_idx, int user_idx, String room_name);
	public RoomVO readRoom(int room_idx);
    public List<RoomVO> readRoomList(int member_idx);
    
    // 메시지
    public MessageVO registerMessage(MessageVO vo);
    public MessageVO getMessage(int message_idx);
    public List<MessageVO> readMessageList(int room_idx);
    public List<MessageVO> readMessageListPaging(int room_idx, int page, int size);
    public List<MessageVO> searchMessage(int room_idx, String keyword);
    public int readMark(int message_idx, int receiver_idx);
    public int unreadCount(int room_idx, int receiver_idx);
    
    // 파일 업로드
    public Map<String, Object> uploadFile(MultipartFile file, int message_idx) throws Exception;
    boolean deleteFile(int attach_idx);
    public List<ChatAttachVO> readFile(int message_idx);
	
}