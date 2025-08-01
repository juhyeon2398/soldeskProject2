// styles.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.5rem;
  background-color: var(--bg-primary);
  min-height: 100vh;
  width: 100%;
`;

export const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: var(--primary-blue);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-blue-hover);
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export const Select = styled.select`
  border: 1px solid var(--border-light);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
`;

export const StatCard = styled.div`
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
  border: 1px solid var(--border-light);
`;

export const StatTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

export const StatValue = styled.p`
  font-size: 1.875rem;
  font-weight: bold;
  color: ${props => props.color || 'var(--text-primary)'};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const Th = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-light);
`;

export const Td = styled.td`
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  white-space: nowrap;
  border-bottom: 1px solid var(--border-light);
`;

export const StatusTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;

  background-color: ${props =>
    props.status === 'success'
      ? 'var(--success)'
      : props.status === 'exception'
      ? 'var(--warning)'
      : 'var(--error)'};

  color: var(--text-primary);
  opacity: 0.9;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

export const ModalContent = styled.div`
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  max-width: 64rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  border: 1px solid var(--border-light);
`;

export const Section = styled.div`
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h4`
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

export const SectionContent = styled.div`
  background-color: var(--bg-tertiary);
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid var(--border-light);
`;

export const RoutineCard = styled.div`
  background-color: var(--bg-secondary);
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
`;

export const Exercise = styled.li`
  font-size: 0.875rem;
  color: var(--text-primary);
`;

// AdminApiContainer용 추가 컴포넌트들
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

export const AutoRefreshContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AutoRefreshLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  
  input {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-light);
  overflow-x: auto;
  
  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'var(--primary-blue)' : 'transparent'};
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-secondary)'};
  border-radius: 0.5rem 0.5rem 0 0;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-blue-hover)' : 'var(--bg-tertiary)'};
    color: var(--text-primary);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
    font-size: 0.85rem;
  }
`;

export const FilterContainer = styled.div`
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  margin-bottom: 2rem;
  border: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-light);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
  
  &::placeholder {
    color: var(--text-tertiary);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

export const CurrentFiltersContainer = styled.div`
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  margin-bottom: 1.5rem;
  border: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;

export const CurrentFiltersTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

export const FilterTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const FilterTag = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.bgColor || 'var(--primary-blue-light)'};
  color: ${props => props.textColor || 'var(--text-primary)'};
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    padding: 0.375rem 0.875rem;
    font-size: 0.8rem;
  }
`;

export const ClearFiltersButton = styled.button`
  padding: 0.25rem 0.75rem;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--border-light);
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
  
  @media (max-width: 768px) {
    padding: 0.375rem 0.875rem;
    font-size: 0.8rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const ChartContainer = styled.div`
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  border: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`;

export const ChartWrapper = styled.div`
  height: 300px;
  position: relative;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

export const ChartDescription = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: center;
  margin-top: 1rem;
  background: var(--bg-tertiary);
  padding: 0.5rem;
  border-radius: 0.375rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.75rem;
  }
`;

export const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

// 상세 모달 관련 컴포넌트들
export const DetailModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid var(--border-light);
`;

export const DetailModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
`;

export const DetailModalSubtitle = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
`;

export const DetailModalCloseButton = styled.button`
  color: var(--text-secondary);
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
  
  &:hover {
    color: var(--text-primary);
  }
`;

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export const NavigationButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-light);
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 0.375rem;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: var(--bg-tertiary);
    border-color: var(--border-medium);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
  }
`;

export const NavigationInfo = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: center;
  
  @media (max-width: 768px) {
    order: -1;
  }
`;

export const FilteredResultInfo = styled.div`
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-top: 0.25rem;
`;

export const MetaInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;

export const MetaInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MetaInfoLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const MetaInfoValue = styled.div`
  font-weight: 600;
  color: ${props => props.color || 'var(--primary-blue)'};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const MetaInfoSubValue = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.125rem;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const FeedbackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FeedbackIcon = styled.span`
  font-size: 1.25rem;
`;

export const FeedbackText = styled.span`
  font-weight: 600;
`;

export const FeedbackReason = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
`;

export const UserRequestContainer = styled.div`
  background: var(--bg-tertiary);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const UserRequestGrid = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const UserRequestItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: var(--bg-secondary);
  border-radius: 0.375rem;
  border: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

export const UserRequestKey = styled.strong`
  min-width: 100px;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    min-width: auto;
    font-size: 0.875rem;
  }
`;

export const UserRequestValue = styled.span`
  margin-left: 0.5rem;
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 0.875rem;
  }
`;

export const SplitMatchBadge = styled.span`
  margin-left: 0.5rem;
  padding: 0.125rem 0.5rem;
  background: var(--success);
  color: var(--text-primary);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.25rem;
    font-size: 0.7rem;
  }
`;

export const MonospaceContent = styled.div`
  padding: 1rem;
  font-family: monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  background: var(--bg-secondary);
  border-radius: 0.375rem;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.8rem;
  }
`;

export const RoutineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RoutineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const RoutineTitle = styled.h5`
  font-weight: 600;
  color: var(--primary-blue);
  margin: 0;
  font-size: 1.125rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const RoutineBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: var(--primary-blue-light);
  color: var(--text-primary);
  border-radius: 1rem;
  font-size: 0.875rem;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
  }
`;

export const ExerciseGrid = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const ExerciseItem = styled.div`
  color: ${props => props.isValid ? 'var(--text-primary)' : 'var(--error)'};
  padding: 0.75rem;
  background: ${props => props.isValid ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'};
  border: 1px solid ${props => props.isValid ? 'var(--primary-blue-light)' : 'var(--error)'};
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
  }
`;

export const ExerciseIcon = styled.span`
  font-size: 1.25rem;
  flex-shrink: 0;
`;

export const ExerciseContent = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ExerciseName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

export const ExerciseDetails = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

export const SimilarExercise = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const InvalidExerciseBadge = styled.span`
  padding: 0.25rem 0.5rem;
  background: var(--error);
  color: var(--text-primary);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  white-space: nowrap;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
`;

export const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background: var(--bg-secondary);
  border: 1px solid var(--error);
  border-radius: 0.5rem;
  color: var(--error);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 0.9rem;
  }
`;

// AItest에서 사용할 수 있는 결과 표시 컴포넌트
export const AIResultContainer = styled.div`
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  padding: 1.5rem;
  margin-top: 2rem;
  border: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    margin-top: 1.5rem;
  }
`;

export const AIResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const AIResultTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const AIResultMeta = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const ViewDetailsButton = styled.button`
  background: var(--primary-blue);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background: var(--primary-blue-hover);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
`;

// 나머지 컴포넌트들도 동일한 패턴으로 CSS 변수 적용...
export const WorkoutResultContainer = styled.div`
  border: 1px solid var(--border-light);
  border-radius: 0.75rem;
  overflow: hidden;
  background: var(--bg-secondary);
`;

export const ResultSummary = styled.div`
  background: var(--bg-tertiary);
  padding: 1rem;
  border-bottom: 1px solid var(--border-light);
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
`;

export const SummaryItem = styled.div`
  text-align: center;
`;

export const SummaryIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

export const SummaryLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.125rem;
`;

export const SummaryValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
`;

export const MuscleGroupContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--border-light);
`;

export const ResultLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MuscleGroupList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const MuscleGroupTag = styled.span`
  background: var(--primary-blue-light);
  color: var(--text-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const RoutinesContainer = styled.div`
  padding: 1rem;
`;

export const ExerciseList = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ExerciseCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${props => props.isValid ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'};
  border: 1px solid ${props => props.isValid ? 'var(--primary-blue-light)' : 'var(--error)'};
  border-radius: 0.5rem;
  position: relative;
`;

export const ExerciseCardIcon = styled.div`
  font-size: 1.25rem;
  flex-shrink: 0;
`;

export const ExerciseCardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ExerciseCardName = styled.div`
  font-weight: 600;
  color: ${props => props.isValid ? 'var(--text-primary)' : 'var(--error)'};
  margin-bottom: 0.5rem;
  word-break: break-word;
`;

export const ExerciseCardDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const DetailChip = styled.span`
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const ExerciseDescription = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  font-style: italic;
`;

export const InvalidBadge = styled.span`
  background: var(--error);
  color: var(--text-primary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.625rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

export const EmptyExerciseMessage = styled.div`
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
  padding: 2rem;
`;

export const ExerciseRequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ExerciseRequestItem = styled.div`
  background: var(--bg-tertiary);
  padding: 0.5rem;
  border-radius: 0.375rem;
  border-left: 3px solid var(--primary-blue);
`;

export const ExerciseRequestName = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

export const ExerciseDetail = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-right: 0.5rem;
`;

// RoutineCard 관련 추가 컴포넌트들 (LogDetailModal용)
export const RoutineCardHeader = styled.div`
  background: var(--bg-tertiary);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RoutineCardTitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RoutineCardBadge = styled.span`
  background: var(--primary-blue-light);
  color: var(--text-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
`;
