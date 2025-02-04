import { Burger, Text, Button, Group, Badge } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { searcherSpotlight } from "@/components/Searcher";
import { useIsMobile } from "@/hooks/useIsMobile";

interface TopBarProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ toggleSidebar, isCollapsed }) => {
  const isMobile = useIsMobile();

  return (
    <Group justify="space-between" align="center" py="xs" px="md" className="h-full">
      <Group align="center">
        {isMobile && <Burger opened={!isCollapsed} onClick={toggleSidebar} size="sm" />}
        <Button
          leftSection={
            <>
              <Group align="center">
                <IconSearch size="1rem" stroke={1.5} />
                <Text fw={400} size="sm" c="dimmed">
                  Search
                </Text>
              </Group>
            </>
          }
          rightSection={
            !isMobile && (
              <Badge size="md" variant="light">
                ⌘ + K
              </Badge>
            )
          }
          onClick={searcherSpotlight.open}
          justify="space-between"
          variant="default"
        />
      </Group>
      <ThemeSwitch />
    </Group>
  );
};
