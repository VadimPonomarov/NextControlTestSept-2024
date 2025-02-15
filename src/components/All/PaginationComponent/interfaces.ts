export interface IProps {
  total: number;
  currentPageSkip: number;
  onPageChange: (newSkip: number) => void;
}
