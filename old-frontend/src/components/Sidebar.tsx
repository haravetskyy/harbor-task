import { useFilter } from "@/components/FilterContext";
import ProjectList from "@/components/ProjectList";
import { useUser } from "@/hooks/useUser";
import getInitials from "@/lib/getInitials";
import { AllowedSection } from "@harbor-task/models";
import { Avatar, Container, Divider, Flex, Group, NavLink, Title } from "@mantine/core";
import { IconCalendarDot, IconChevronRight, IconGauge, IconHome2 } from "@tabler/icons-react";
import React, { useState } from "react";

const SECTIONS: { label: AllowedSection; icon: any }[] = [
  { label: "All", icon: <IconHome2 size="1rem" stroke={1.5} /> },
  { label: "Today", icon: <IconCalendarDot size="1rem" stroke={1.5} /> },
  { label: "Upcoming", icon: <IconGauge size="1rem" stroke={1.5} /> },
];

const Sidebar: React.FC = () => {
  const { setSelectedFilter } = useFilter();
  const { data: user } = useUser();
  const [activeItem, setActiveItem] = useState<string>("All");

  const userFullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <Container className="w-full">
      <Flex mb="md" mt="sm" justify="space-between" align="center">
        <Group gap={16}>
          <Avatar src={user?.avatarUrl} alt={userFullName} color="initials">
            {getInitials(userFullName)}
          </Avatar>
          <Title order={6}>{userFullName}</Title>
        </Group>
      </Flex>

      {SECTIONS.map(({ label, icon }) => (
        <NavLink
          key={label}
          label={label}
          active={label === activeItem}
          variant="light"
          onClick={() => {
            setSelectedFilter({ type: "section", value: label });
            setActiveItem(label);
          }}
          leftSection={icon}
          rightSection={
            <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
          }
        />
      ))}

      <Divider mt="sm" />

      <ProjectList activeItem={activeItem} setActiveItem={setActiveItem} />
    </Container>
  );
};

export default Sidebar;
