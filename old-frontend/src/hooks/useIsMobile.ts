import { useViewportSize } from "@mantine/hooks";

export const useIsMobile = () => {
  const { width } = useViewportSize();
  const MOBILE_WIDTH = 768;

  const isMobile = width <= MOBILE_WIDTH;

  return isMobile;
};
