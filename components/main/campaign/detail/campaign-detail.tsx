import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import ToggleableAbsoluteWrapper from "../../../common/misc/toggleable-absolute-wrapper";
import ItemFieldWrapper from "../../../common/items/item-field-wrapper";
import { ProjectTypeChannel } from "../../../../assets";
import styles from "./campaign-detail.module.css";
import Dropdown from "../../../common/inputs/dropdown";
import ItemDropdownWrapper from "../../../common/items/item-dropdown-wrapper";
import channelSocialOptions from "../../../../resources/data/channels-social.json";
const CampaignDetail = () => {
  const [activeInput, setActiveInput] = useState("");

  const toggleActiveInput = (input) => {
    if (input === activeInput) setActiveInput("");
    else setActiveInput(input);
  };

  const handleChannelChange = (value) => {
    toggleActiveInput("channel");
  };
  return (
    <div className="item-detail-new-campaign">
      <table className={styles["table"]} cellSpacing="0">
        <tr className={styles["header-row"]}>
          <th>Channel</th>
          <th>Project</th>
          <th>Deadline</th>
          <th>Collaborators</th>
          <th>Status</th>
        </tr>
        <tr className={styles["table-cells"]}>
          <td>
            <ToggleableAbsoluteWrapper
              wrapperClass="field"
              contentClass="dropdown"
              Wrapper={({ children }) => (
                <>
                  <ItemDropdownWrapper
                    image={ProjectTypeChannel["facebook"]}
                    title="Select channel"
                    hasOption={true}
                    data={null}
                    optionOnClick={() => console.log("hola")}
                  />
                </>
              )}
              Content={() => (
                <Dropdown
                  options={channelSocialOptions.map((option) => ({
                    label: option,
                    onClick: () => handleChannelChange(option),
                  }))}
                />
              )}
            />
          </td>
          <td>Enter Project</td>
          <td></td>
          <td>Add collaborators</td>
          <td>Draft</td>
        </tr>
      </table>
    </div>
  );
};

export default CampaignDetail;
