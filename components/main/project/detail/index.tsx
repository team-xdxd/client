import { useState, useEffect } from "react";

import styles from "./index.module.css";
import Link from "next/link";
import update from "immutability-helper";
import projectApi from "../../../../server-api/project";
import taskApi from "../../../../server-api/task";
import toastUtils from "../../../../utils/toast";
import { ProjectTypes, Utilities } from "../../../../assets";
import Router from "next/router";
import urlUtils from "../../../../utils/url";

// Components
import ItemSubheader from "../../../common/items/item-subheader";
import ItemSublayout from "../../../common/layouts/item-sublayout";
import ConversationList from "../../../common/conversation/conversation-list";
import TasksList from "./tasks-list";
import Fields from "./project-fields";

const ProjectDetail = () => {
  const [project, setProject] = useState(undefined);

  const [projectNames, setProjectNames] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [status, setStatus] = useState("");

  const [activeSideComponent, setActiveSidecomponent] = useState("tasks");

  const [editableFields, setEditableFields] = useState({
    name: "",
    headline: "",
    subject: "",
    preheader: "",
    collaborators: [],
    description: "",
    campaign: null,
    startDate: null,
    publishDate: null,
    owner: null,
    tags: [],
    channel: null,
    tasks: [],
  });

  useEffect(() => {
    getProject();
    getProjectNames();
    checkQueryParameters();
  }, []);

  const checkQueryParameters = () => {
    const { side } = urlUtils.getQueryParameters();
    if (side) {
      setActiveSidecomponent(side as string);
    }
  };

  const getProject = async () => {
    try {
      const projectId = urlUtils.getPathId();
      const { data } = await projectApi.getProjectById(projectId);
      setProjectData(data);
      setProject(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProject = async () => {
    try {
      await projectApi.deleteProject(project?.id);
      Router.replace("/main/overview");
      toastUtils.success("Project deleted sucesfully");
    } catch (err) {
      console.log(err);
    }
  };

  const getProjectNames = async () => {
    try {
      const { data } = await projectApi.getProjects();
      setProjectNames(data.map((project) => project.name));
    } catch (err) {
      console.log(err);
    }
  };

  const saveProject = async () => {
    if (!editableFields.publishDate) {
      return toastUtils.error("You must add an Deadline Date");
    }
    if (!editableFields.name) {
      return toastUtils.error("The name cannot be empty");
    }
    if (
      editableFields.name !== project.name &&
      projectNames.includes(editableFields.name)
    ) {
      return toastUtils.error("A project with that name already exists");
    }
    try {
      const saveData = {
        name: editableFields.name,
        description: editableFields.description,
        startDate: editableFields.startDate,
        publishDate: editableFields.publishDate,
        channel: editableFields.channel,
        campaignId: editableFields.campaign?.id,

        headline: editableFields.headline,
        subject: editableFields.subject,
        preheader: editableFields.preheader,
      };
      const { data } = await projectApi.updateProject(project.id, saveData);
      getProjectNames();
      setProject(data);
      toastUtils.success("Project saved sucesfully");
    } catch (err) {
      console.log(err);
    }
  };

  const setProjectData = (data) => {
    setEditableFields({
      ...editableFields,
      ...data,
      owner: data.users.find((user) => user.isOwner),
      collaborators: data.users.filter((user) => !user.isOwner),
    });
    setStatus(data.status);
    setTasks(data.tasks);
  };

  const addTag = async (tag, isNew = false) => {
    if (
      editableFields.tags.findIndex(
        (projectTag) => tag.label === projectTag.name
      ) === -1
    ) {
      const newTag = { name: tag.label };
      if (!isNew) newTag.id = tag.value;
      try {
        const { data } = await projectApi.addTag(project.id, newTag);
        if (!isNew) {
          editFields("tags", update(editableFields.tags, { $push: [newTag] }));
        } else {
          editFields("tags", update(editableFields.tags, { $push: [data] }));
        }
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const removeTag = async (index) => {
    try {
      editFields(
        "tags",
        update(editableFields.tags, { $splice: [[index, 1]] })
      );
      await projectApi.removeTag(project.id, editableFields.tags[index].id);
    } catch (err) {
      console.log(err);
    }
  };

  const addCollaborator = async (user) => {
    try {
      // Only add if collaborator is not on list
      if (
        editableFields.owner.id === user.id ||
        editableFields.collaborators.find(
          (collaborator) => collaborator.id === user.id
        )
      ) {
        return await removeCollaborator(user);
      }
      editFields(
        "collaborators",
        update(editableFields.collaborators, { $push: [user] })
      );
      await projectApi.addCollaborators(project.id, {
        collaboratorIds: [user.id],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeCollaborator = async (user) => {
    try {
      const searchedCollaboratorIndex = editableFields.collaborators.findIndex(
        (collaborator) => collaborator.id === user.id
      );
      if (searchedCollaboratorIndex === -1) return;
      editFields(
        "collaborators",
        update(editableFields.collaborators, {
          $splice: [[searchedCollaboratorIndex, 1]],
        })
      );
      await projectApi.removeCollaborators(project.id, {
        collaboratorIds: [user.id],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async ({ name, endDate, selectedUser }) => {
    try {
      const taskData = {
        name,
        endDate,
      };
      const assignedUser = selectedUser?.id;
      const newTaskResponse = await projectApi.addtask(project.id, {
        taskData,
        assignedUser,
      });
      setTasks(update(tasks, { $push: [newTaskResponse.data] }));
    } catch (err) {
      console.log(err);
      // TODO: Error if failure for whatever reason
    }
  };

  const updateTask = async (index, data) => {
    try {
      setTasks(update(tasks, { [index]: { $merge: data } }));
      await taskApi.updateTask(tasks[index].id, data);
    } catch (err) {
      console.log(err);
      // TODO: Error if failure for whatever reason
    }
  };

  const replaceTaskAssigned = async (index, user) => {
    try {
      if (!user) setTasks(update(tasks, { [index]: { users: { $set: [] } } }));
      else setTasks(update(tasks, { [index]: { users: { $set: [user] } } }));
      await taskApi.replaceAssigned(tasks[index].id, {
        collaboratorId: user?.id,
      });
    } catch (err) {
      console.log(err);
      // TODO: Error if failure for whatever reason
    }
  };

  const removeTask = async (index) => {
    try {
      await taskApi.deleteTask(tasks[index].id);
      setTasks(update(tasks, { $splice: [[index, 1]] }));
    } catch (err) {
      // TODO: Error if failure for whatever reason
    }
  };

  const editFields = (field, value) => {
    setEditableFields({
      ...editableFields,
      [field]: value,
    });
  };

  const changeStatus = async (newStatus) => {
    if (!editableFields.publishDate) {
      return toastUtils.error("You must add an Deadline Date");
    }

    if (newStatus === "scheduled" && editableFields.publishDate < new Date()) {
      return toastUtils.error(
        "You cannot schedule if the Publish Date is in the past"
      );
    }

    try {
      setStatus(newStatus);
      await saveProject();
      await projectApi.updateProject(project.id, { status: newStatus });
    } catch (err) {
      // TODO: Error if failure for whatever reason
      console.log(err);
    }
  };

  const duplicateProject = async () => {
    try {
      const collaboratorsIds = [];
      for (let collaborator in editableFields.collaborators)
        collaboratorsIds.push(editableFields.collaborators[collaborator].id);

      const tasksDuplicated = [];
      // tasksIds.push(editableFields.tasks[task].id);
      for (let task in editableFields.tasks)
        tasksDuplicated.push({
          name: editableFields.tasks[task].name,
          description: editableFields.tasks[task].description,
          userId: editableFields.tasks[task].userId,
        });

      const projectInfo = {
        dataProject: {
          name: editableFields.name,
          type: editableFields.type,
          campaign_id: editableFields.campaignId,
        },
        collaboratorIds: collaboratorsIds,
        tasks: tasksDuplicated,
      };
      console.log("tried", projectInfo);
      const { data } = await projectApi.createDuplicatedProject(projectInfo);
      Router.replace(`/main/projects/${data.id}`);
    } catch (error) {
      console.log("There is an error on duplicateProject", error);
    }
  };

  let SideComponent;
  if (activeSideComponent === "tasks")
    SideComponent = (
      <TasksList
        tasks={tasks}
        createTask={createTask}
        removeTask={removeTask}
        updateTask={updateTask}
        replaceTaskAssigned={replaceTaskAssigned}
      />
    );
  else if (activeSideComponent === "comments")
    SideComponent = (
      <ConversationList itemId={project?.id} itemType="projects" />
    );

  return (
    <>
      <ItemSubheader
        title={editableFields.name}
        saveDraft={saveProject}
        status={status}
        changeName={(name) => editFields("name", name)}
        changeStatus={changeStatus}
        resetPageTittle={() => editFields("name", project?.name)}
        hasAssets={true}
        type="project"
        itemId={project?.id}
      />
      <main className={`${styles.container}`}>
        <ItemSublayout
          deleteItem={deleteProject}
          hasAssets={true}
          type="project"
          itemId={project?.id}
          navElements={[
            {
              icon: ProjectTypes.task,
              onClick: () => {
                setActiveSidecomponent("tasks");
              },
            },
            {
              icon: Utilities.comment,
              onClick: () => {
                setActiveSidecomponent("comments");
              },
            },
          ]}
          SideComponent={SideComponent}
          // temporal
          project={editableFields}
          duplicateProject={duplicateProject}
        >
          {project && (
            <Fields
              project={project}
              editableFields={editableFields}
              editFields={editFields}
              addTag={addTag}
              removeTag={removeTag}
              addCollaborator={addCollaborator}
              removeCollaborator={removeCollaborator}
            />
          )}
        </ItemSublayout>
      </main>
    </>
  );
};

export default ProjectDetail;
