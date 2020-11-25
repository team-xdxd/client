import styles from "./create-campaign.module.css";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../context";
import Router from "next/router";
import campaignApi from "../../../server-api/campaign";
import toastUtils from "../../../utils/toast";
import update from "immutability-helper";
// Components
import Button from "../../common/buttons/button";
import FormInput from "../../common/inputs/form-input";
import Input from "../../common/inputs/input";
import CampaignDetail from "../campaign/detail/campaign-detail";

const CreateCampaign = () => {
  const {
    user: { id },
  } = useContext(UserContext);
  const { control, handleSubmit, errors } = useForm();
  const [submitError, setSubmitError] = useState("");

  const [campaignNames, setCampaignNames] = useState([]);

  // New editable fields

  const [editableProjectFields, setEditableProjectFields] = useState({
    channel: "Select Channel",
    name: "",
    startDate: null,
    publishDate: null,
    collaborators: [],
    status: "draft",
  });
  // const [startDate, setStartDate] = useState(null);
  // Array projects
  const [projects, setProject] = useState([]);

  useEffect(() => {
    getCampaignNames();
  }, []);

  const addProject = (e) => {
    e.preventDefault();
    setProject([...projects, editableProjectFields]);
  };

  const addCollaborator = async (index, user) => {
    try {
      // Only add if collaborator is not on list
      if (
        id === user.id ||
        projects[index].collaborators.find(
          (collaborator) => collaborator.id === user.id
        )
      ) {
        return await removeCollaborator(user, index);
      }
      setProject(update(projects, { [index]: { $merge: [user] } }));
      // await projectApi.addCollaborators(project.id, {
      //   collaboratorIds: [user.id],
      // });
    } catch (err) {
      console.log(err);
    }
  };
  const removeCollaborator = async (user, index) => {
    try {
      const searchedCollaboratorIndex = projects[index].collaborators.findIndex(
        (collaborator) => collaborator.id === user.id
      );
      if (searchedCollaboratorIndex === -1) return;
      setProject(
        update(projects, {
          [index]: {
            $splice: [[searchedCollaboratorIndex, 1]],
          },
        })
      );
      // await projectApi.removeCollaborators(project.id, {
      //   collaboratorIds: [user.id],
      // });
    } catch (err) {
      console.log(err);
    }
  };
  const editFields = (index, data) => {
    setProject(update(projects, { [index]: { $merge: data } }));
  };
  const onSubmit = async (campaignData, e) => {
    e.preventDefault();
    if (campaignNames.includes(campaignData.name)) {
      return toastUtils.error("A campaign with that name already exists");
    }
    try {
      campaignData.projects = projects;
      // console.log(campaignData);
      const { data } = await campaignApi.createCampaign(campaignData);
      Router.replace(`/main/campaigns/${data.id}`);
    } catch (err) {
      // TODO: Show error message
      if (err.response?.data?.message) {
        setSubmitError(err.response.data.message);
      } else {
        setSubmitError("Something went wrong, please try again later");
      }
    }
  };

  const getCampaignNames = async () => {
    try {
      const { data } = await campaignApi.getCampaigns();
      setCampaignNames(data.map((campaign) => campaign.name));
    } catch (err) {
      // TODO: Error handling
    }
  };

  return (
    <div className={`${styles.container}`}>
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={"create-overlay-form"}>
        <div className={styles["input-wrapper"]}>
          <FormInput
            InputComponent={
              <Input
                type="text"
                placeholder="Name your Campaign"
                styleType="regular"
              />
            }
            name="name"
            control={control}
            message={"This field should be between 1 and 30 characters long"}
            rules={{ minLength: 1, maxLength: 30, required: true }}
            errors={errors}
          />
        </div>
        <CampaignDetail
          editFields={editFields}
          projects={projects}
          addProject={addProject}
          ownerId={id}
          addCollaborator={addCollaborator}
          removeCollaborator={removeCollaborator}
        />
        <div className={styles["button-wrapper"]}>
          <Button type={"submit"} text={"Save changes"} styleType="primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
