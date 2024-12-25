import {
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Modal,
  NavLink,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconChevronRight,
  IconGauge,
  IconHome2,
  IconLayoutSidebar,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import React, { Component } from "react";
import { SideBarProps, SideBarState } from "./SideBar.types.ts";
import { emojiOptions } from "./emojiOptions.ts";

class SideBar extends Component<SideBarProps, SideBarState> {
  state = {
    searchQuery: "",
    isModalOpen: false,
    newProjectName: "",
    selectedEmoji: "",
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      ...prevState,
      searchQuery: event.currentTarget.value,
    }));
  };

  handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.props.onSearch(this.state.searchQuery);
    }
  };

  handleOpenModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
    }));
  };

  handleCloseModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
      newProjectName: "",
      selectedEmoji: "",
    }));
  };

  handleSaveProject = () => {
    const { newProjectName, selectedEmoji } = this.state;

    if (newProjectName && selectedEmoji) {
      this.props.onAddProject(newProjectName, selectedEmoji);
      this.handleCloseModal();
    }
  };

  handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      newProjectName: value || "",
    }));
  };

  handleEmojiChange = (value: string | null) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedEmoji: value || "",
    }));
  };

  render() {
    const { userName, userProfileImg, projects, onHideSidebar } = this.props;
    const { searchQuery, isModalOpen, newProjectName, selectedEmoji } =
      this.state;

    return (
      <Container>
        <Flex
          position="apart"
          mb="md"
          mt="sm"
          className="w-full"
          justify="space-between"
          align="center"
        >
          <Group>
            <img
              src={userProfileImg}
              alt="User Profile"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <Title order={6}>{userName}</Title>
          </Group>
          <Button
            size="xs"
            variant="subtle"
            onClick={onHideSidebar}
            className="justify-self-end"
          >
            <IconLayoutSidebar />
          </Button>
        </Flex>

        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChange={this.handleSearchChange}
          onKeyDown={this.handleSearchKeyDown}
          icon={<IconSearch />}
          mb="md"
        />

        <NavLink
          href="#"
          label="Today"
          leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          rightSection={
            <IconChevronRight
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />
        <NavLink
          href="#"
          label="Upcoming"
          leftSection={<IconGauge size="1rem" stroke={1.5} />}
          rightSection={
            <IconChevronRight
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />

        <Divider mt="sm" />

        <Button
          size="sm"
          justify="center"
          variant="light"
          fullWidth
          mt="xs"
          onClick={this.handleOpenModal}
          rightSection={
            <IconPlus
              size="0.8rem"
              stroke={1.5}
              onClick={this.handleOpenModal}
            />
          }
        >
          Add project
        </Button>

        <NavLink
          label="Projects"
          order={6}
          mt="sm"
          mb="sm"
          rightSection={
            <Button size="xs" variant="subtle">
              <IconChevronRight
                size="0.8rem"
                stroke={1.5}
                className="mantine-rotate-rtl"
              />
            </Button>
          }
          defaultOpened
        >
          {projects.map((project) => (
            <NavLink
              key={project.id}
              href="#"
              label={project.name}
              leftSection="#"
              rightSection={
                <Badge size="lg" color="blue" variant="filled">
                  {project.emoji || ""}
                </Badge>
              }
            />
          ))}
        </NavLink>

        <Modal
          opened={isModalOpen}
          onClose={this.handleCloseModal}
          title="Add New Project"
        >
          <TextInput
            label="Project Name"
            placeholder="Enter project name"
            value={newProjectName}
            onChange={this.handleProjectNameChange}
            mb="md"
          />
          <Select
            label="Select Emoji"
            placeholder="Choose an emoji"
            data={emojiOptions}
            value={selectedEmoji}
            onChange={this.handleEmojiChange}
          />
          <Button fullWidth mt="md" onClick={this.handleSaveProject}>
            Save Project
          </Button>
        </Modal>
      </Container>
    );
  }
}

export default SideBar;
