import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Routine from './Routine';
import axios from 'axios';
import { ReactSortable } from 'react-sortablejs';
import AddIcon from '@mui/icons-material/Add';


const EmptyData = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
  color: var(--text-tertiary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 50px 0;
  text-align: center;
  margin-top: 12px;
  background: var(--bg-secondary);
`;

const RoutineListWrapper = styled.div`
  position: relative;
  .routine-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const RoutineAddCTA = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'lengthData' && prop !== 'heightData'
})`
  color: var(--text-white);
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(50% - 5px);
  height: ${(props) => (props.heightData > 0 ? props.heightData + 'px' : '120px')};
  border: 1px solid var(--border-light);
  background: var(--bg-secondary);
  border-radius: 12px;
  position: absolute;
  ${(props)=> props.lengthData%2 === 1 ? 'bottom: 0; right:0;' : 'top: 100%; margin-top: 10px;'}
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  @media (max-width: 650px) {
    width: 100%;
    top: 100%;
    margin-top: 10px;
  }
  
  svg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--text-secondary);
    path {
      color: var(--text-secondary);
    }
  }
`;

const RoutineList = ({ handleAddRoutine, targetMemberIdx  }) => {
  const [initList, setInitList] = useState([]);
  const [routinelist, setRoutinelist] = useState([]);
  const [sort, setSort] = useState([]);
  const [heightData, setHeightData] = useState(0);
  const targetIdx = targetMemberIdx || null;

  
  // API에서 데이터 받아오는 함수
const handleRoutineResponse = async () => {
  try {
    const response = await axios.get(
      targetIdx ? `/routine/getList/${targetIdx}` : `/routine/getList`,
      { withCredentials: true }
    );
    const data = response.data;
    const vo = data.vo;

    if (vo && vo.length !== 0) {
      const sorted = vo.map((item, idx) => {
        item.routine_list_idx = sort[idx] || item.routine_list_idx;
        return item;
      });

      setInitList(sorted);
      setRoutinelist(sorted);
    } else {
      setInitList([]);
      setRoutinelist([]);
    }
  } catch (err) {
    console.error("루틴 리스트 불러오기 실패:", err);
  }
};

  // 정렬된 순서를 서버에 업데이트하는 함수
  const handleSortUpdate = async (newSort) => {
    const response = await axios.put("/routine/sort", newSort, { withCredentials: true });
    const data = response.data;
    if (!data.success) {
      alert(data.msg);
    }
  };

  // 순서가 변경될 때 호출되는 함수
  const handleSort = (newOrder) => {
    const routinelistString = JSON.stringify(newOrder);
    const initListString = JSON.stringify(initList);

    if (routinelistString === initListString) {
      return;
    } else {
      const newSort = newOrder.map(item => item.routine_list_idx);
      setSort(newSort);
      handleSortUpdate(newSort)
    }

    setInitList(newOrder); // 정렬된 아이템 순서를 상태에 반영
    setRoutinelist(newOrder); // 정렬된 아이템 순서를 상태에 반영
  };

  useEffect(() => {
    if (initList === undefined || initList === null) return;
    if (initList.length === 0 && sort.length === 0) {
      handleRoutineResponse();
    }
  }, [sort]);

  useEffect(() => {
  }, [routinelist, heightData]);
  
  return (
    <RoutineListWrapper>
      {
        routinelist && routinelist.length > 0 ? (
          <ReactSortable
            list={routinelist}
            setList={handleSort}
            animation={150}
            className="routine-list"
            filter=".no-drag"
            preventOnFilter={false}
          >
            {
              routinelist.map((routine, idx) => (
                <Routine setHeightData={setHeightData} key={routine.routine_list_idx || idx} data={routine} onDelete={handleRoutineResponse} targetIdx={targetIdx} />
              ))
            }
          </ReactSortable>
        ) : <></>
      }
      <RoutineAddCTA className="no-drag" type='button' onClick={handleAddRoutine} lengthData={routinelist ? routinelist.length : 0} heightData={heightData} ><AddIcon /></RoutineAddCTA>

    </RoutineListWrapper>
  );
};

export default RoutineList;
