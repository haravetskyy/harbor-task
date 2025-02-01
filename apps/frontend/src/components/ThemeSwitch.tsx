import { rem, Switch, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export const ThemeSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Switch
      checked={colorScheme === "dark"}
      size="md"
      color="dark.4"
      onChange={toggleColorScheme}
      onLabel={<IconSun size={rem(16)} stroke={2.5} color="#ffd43b" />}
      offLabel={<IconMoonStars size={rem(16)} stroke={2.5} color="#228be6" />}
    />
  );
};
