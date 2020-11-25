import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import ToggleableAbsoluteWrapper from "../../../common/misc/toggleable-absolute-wrapper";
import ItemFieldWrapper from "../../../common/items/item-field-wrapper";
import { ProjectTypeChannel, Utilities } from "../../../../assets";
import styles from "./campaign-detail.module.css";
import DayPicker from "react-day-picker";
import Dropdown from "../../../common/inputs/dropdown";
import ItemDropdownWrapper from "../../../common/items/item-dropdown-wrapper";
import CollaboratorItem from "../../../common/items/collaborator-item";
import SearchableUserList from "../../../common/user/searchable-user-list";
import channelSocialOptions from "../../../../resources/data/channels-social.json";
import projectStatus from "../../../../resources/data/project-status.json";
import ButtonIcon from "../../../common/buttons/button-icon";
import { capitalCase } from "change-case";
import { format } from "date-fns";

const CampaignDetail = ({
  projects = [],
  addProject,
  editFields,
  ownerId,
  removeCollaborator,
  addCollaborator,
}) => {
  const [activeInput, setActiveInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleActiveInput = (input) => {
    if (input === activeInput) setActiveInput("");
    else setActiveInput(input);
  };
  const toggleActiveInputDeadlineDate = (input, index) => {
    if (input === activeInput && index === activeIndex) {
      setActiveInput("");
      setActiveIndex(null);
    } else {
      setActiveInput(input);
      setActiveIndex(index);
    }
  };
  const handleChannelChange = (index, value) => {
    console.log("value", value);
    toggleActiveInput("channel");
    editFields(index, { channel: value });
  };
  const handleStatusChange = (index, value) => {
    toggleActiveInput("status");
    editFields(index, { status: value });
  };
  const handleDeadlineDateChange = (index, value) => {
    toggleActiveInput("deadlineDate");
    editFields(index, { publishDate: value });
  };

  return (
    <div className="item-detail-new-campaign">
      <table className={styles["table"]} cellSpacing="0">
        <thead>
          <tr className={styles["header-row"]}>
            <th>Channel</th>
            <th>Project</th>
            <th>Deadline</th>
            <th>Collaborators</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            return (
              <tr className={styles["table-cells"]} key={index}>
                <td>
                  <ToggleableAbsoluteWrapper
                    wrapperClass="field"
                    contentClass="dropdown"
                    Wrapper={({ children }) => (
                      <>
                        <ItemDropdownWrapper
                          image={ProjectTypeChannel[project.channel]}
                          data={capitalCase(project.channel)}
                          hasOption={true}
                          optionOnClick={() => toggleActiveInput("channel")}
                          styleType={project.channel === 'Select Channel' ? false : true}
                        // styleType={true}
                        >
                          {children}
                        </ItemDropdownWrapper>
                      </>
                    )}
                    Content={() => (
                      <Dropdown
                        options={channelSocialOptions.map((option) => ({
                          label: option,
                          onClick: () => {
                            handleChannelChange(index, option);
                          },
                        }))}
                      />
                    )}
                  />
                </td>
                <td>
                  <input
                    className={styles["input-name"]}
                    value={project.name}
                    onChange={(e) =>
                      editFields(index, { name: e.target.value })
                    }
                    placeholder="Enter Project Name"
                    onClick={() => toggleActiveInput("name")}
                    onBlur={() => toggleActiveInput("name")}
                  />
                </td>
                <td>
                  <ItemDropdownWrapper
                    image="/"
                    data={
                      project.publishDate
                        ? format(new Date(project.publishDate), "MMM d, yyyy")
                        : "Select Deadline"
                    }
                    overrideIcon={true}
                    hasOption={true}
                    optionOnClick={() =>
                      toggleActiveInputDeadlineDate("deadlineDate", index)
                    }
                    styleType={!project.publishDate ? false : true}
                  >
                    {activeInput === "deadlineDate" && index === activeIndex && (
                      <div className={styles["day-picker"]}>
                        <DayPicker
                          selectedDays={project.publishDate}
                          disabledDays={{
                            before: project.startDate && new Date(project.startDate),
                          }}
                          onDayClick={(day) =>
                            handleDeadlineDateChange(index, day)
                          }
                        />
                      </div>
                    )}
                  </ItemDropdownWrapper>
                </td>
                <td>
                  <ToggleableAbsoluteWrapper
                    closeOnAction={false}
                    Wrapper={({ children }) => (
                      <ItemDropdownWrapper
                        image={Utilities.add}
                        data='Add Collaborators'
                        hasOption={true}
                        optionOnClick={() => toggleActiveInput("collaborators")}
                      >
                        <ul className={styles["collaborator-list"]}>
                          {project.collaborators.map((collaborator) => (
                            <li key={collaborator.id}>
                              <CollaboratorItem
                                photoUrl={collaborator.profilePhoto}
                                onRemove={() =>
                                  removeCollaborator(collaborator)
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      </ItemDropdownWrapper>
                    )}
                    Content={() => (
                      <SearchableUserList
                        onUserSelected={addCollaborator}
                        filterOut={[ownerId]}
                        selectedList={project.collaborators.map(
                          (colab) => colab.id
                        )}
                      />
                    )}
                    wrapperClass={styles["image-wrapper"]}
                    contentClass={styles["user-list-wrapper"]}
                  />
                </td>
                <td>
                  <ToggleableAbsoluteWrapper
                    wrapperClass="field"
                    contentClass="dropdown"
                    Wrapper={({ children }) => (
                      <>
                        <ItemDropdownWrapper
                          image={ProjectTypeChannel[project.channel]}
                          data={capitalCase(project.status)}
                          overrideIcon={true}
                          hasOption={true}
                          optionOnClick={() => toggleActiveInput("status")}
                          styleType={project.status === 'draft' || 'schedule' && true}
                        >
                          {children}
                        </ItemDropdownWrapper>
                      </>
                    )}
                    Content={() => (
                      <Dropdown
                        options={projectStatus.map((option) => ({
                          label: option,
                          onClick: () => {
                            handleStatusChange(index, option);
                          },
                        }))}
                      />
                    )}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles["button-container"]}>
        <ButtonIcon
          text="Add project"
          disabled={false}
          icon={Utilities.add}
          onClick={addProject}
          buttonType="button"
          isGray={true}
        />
      </div>
    </div>
  );
};

export default CampaignDetail;
