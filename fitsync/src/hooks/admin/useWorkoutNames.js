import { useState, useEffect } from 'react';
import axios from 'axios';
import { normalizeAndDisassemble } from '../../utils/KorUtil';

/**
 * 운동명 데이터 관리 훅
 * @returns {Object} 운동명 상태와 관련 함수들
 */
export const useWorkoutNames = () => {
    // 공백 제거 운동명 리스트
    const [rawData, setRawData] = useState([]);
    // idx, 공백 제거 운동명 리스트
    const [rawDataIdx, setRawDataIdx] = useState([{}]);
    // 길이를 기준으로 운동명과 자모음 분해 운동명을 매핑
    const [rawDataMap, setRawDataMap] = useState(new Map());
    // db 에 저장되지 않은 운동명, 이름을 다르게 부르는 운동명
    const [exceptionNames, setExceptionNames] = useState([]);

    const fetchWorkoutNames = async () => {
        const groupedMap = new Map();

        try {
            const response = await axios.get('/ai/getTextReact');
            setRawData(response.data.map(name => name.replace(/\s+/g, '')));

            const responseIdx = await axios.get('/routine/workout');
            // exceptionNames을 response.data에 추가
            const responseData = responseIdx.data.list.concat(exceptionNames);

            setRawDataIdx(responseData.map(item => {
                return {
                    pt_idx: item.pt_idx,
                    pt_name: item.pt_name.replace(/\s+/g, '')
                };
            }));

            // 운동명과 자모음 분해 운동명을 길이별로 그룹화
            responseData.forEach(item => {
                const originalName = item.pt_name;
                const { normalized, length } = normalizeAndDisassemble(originalName);

                const entry = { name: originalName, name_dis: normalized, idx : item.pt_idx };

                if (!groupedMap.has(length)) {
                    groupedMap.set(length, []);
                }
                groupedMap.get(length).push(entry);
            });

            // set할 때는 새로운 Map 객체로 전달하여 리액트가 변경 감지하도록 함
            setRawDataMap(new Map(groupedMap));

        } catch (error) {
            console.error('운동명 목록 요청 실패:', error);
        }
    };

    // 컴포넌트 마운트 시 운동명 데이터 가져오기
    useEffect(() => {
        fetchWorkoutNames();
    }, []);

    return {
        rawData,
        rawDataIdx,
        rawDataMap,
        fetchWorkoutNames,
        setRawData,
        setRawDataIdx,
        setRawDataMap
    };
};


/** DB에 저장되지 않은 운동명, 이름을 다르게 부르는 운동명 */ 
const initExceptionNames = [
    {pt_idx: 24, pt_name: '카프 레이즈'},
    {pt_idx: 2, pt_name: '데드리프트'},
    {pt_idx: 238, pt_name: '윗몸 일으키기'},
];