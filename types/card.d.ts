type CardProps = {
  index: number;
  title: string;
  value: string;
  image: any;
  selectedCard: number | null;
  hoveredCard: number | null;
  isDarkMode: boolean;
  onLongPress: (index: number) => void;
  onPressOut: () => void;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
  onPress: (index: number) => void;
};
