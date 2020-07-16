import styles from './detail-side-panel.module.css'
import update from 'immutability-helper'
import CreatableSelect from 'react-select/creatable';
import { AssetContext } from '../../../context'
import { useEffect, useState, useContext } from 'react'
import { format } from 'date-fns'
import { capitalCase } from 'change-case'
import filesize from 'filesize'
import { getAssociatedCampaigns, getAssociatedChannels } from '../../../utils/asset'
import tagApi from '../../../server-api/tag'
import assetApi from '../../../server-api/asset'
import { Utilities } from '../../../assets'

// Components
import Tag from '../misc/tag'
import IconClickable from '../buttons/icon-clickable'

const SidePanel = ({ asset }) => {
  const {
    id,
    createdAt,
    type,
    extension,
    dimension,
    size,
    tags
  } = asset

  const { assets, setAssets } = useContext(AssetContext)

  const [inputTags, setInputTags] = useState([])
  const [assetTags, setTags] = useState(tags)
  const [activeTags, setActiveTags] = useState(false)

  useEffect(() => {
    getTags()
  }, [])

  const getTags = async () => {
    try {
      const { data } = await tagApi.getTags()
      setInputTags(data)
    } catch (err) {
      // TODO: Maybe show error?
    }
  }

  const addTag = async (tag, isNew = false) => {
    if (tags.findIndex(assetTag => tag.label === assetTag.name) === -1) {
      const newTag = { name: tag.label }
      if (!isNew) newTag.id = tag.value
      try {
        const { data } = await assetApi.addTag(id, newTag)
        let stateTagsUpdate
        if (!isNew) {
          stateTagsUpdate = update(tags, { $push: [newTag] })
          setTags(stateTagsUpdate)
        } else {
          stateTagsUpdate = update(tags, { $push: [data] })
          setTags(stateTagsUpdate)
        }
        updateAssetState({
          tags: { $set: stateTagsUpdate }
        })
        setActiveTags(false)
        return data
      } catch (err) {
        // TODO: Error if failure for whatever reason
      }
    } else {
      setActiveTags(false)
    }
  }

  const removeTag = async (index) => {
    try {
      let stateTagsUpdate = update(tags, { $splice: [[index, 1]] })
      setTags(stateTagsUpdate)
      await assetApi.removeTag(id, tags[index].id)
      updateAssetState({
        tags: { $set: stateTagsUpdate }
      })
    } catch (err) {
      // TODO: Error if failure for whatever reason
    }
  }

  const updateAssetState = (updatedata) => {
    const assetIndex = assets.findIndex(assetItem => assetItem.asset.id === id)
    setAssets(update(assets, {
      [assetIndex]: {
        asset: updatedata
      }
    }))
  }

  const handleTagChange = async (selected, actionMeta) => {
    const newTag = await addTag(selected, actionMeta.action === 'create-option')
    if (actionMeta.action === 'create-option') {
      setInputTags(update(inputTags, { $push: [newTag] }))
    }
  }

  let formattedDimension
  if (dimension) {
    const splitDimension = dimension.split(',')
    formattedDimension = `${splitDimension[0]} x  ${splitDimension[1]} px`
  }

  const fieldValues = [
    {
      field: 'Created',
      value: format(new Date(createdAt), 'Pp')
    },
    {
      field: 'Type',
      value: capitalCase(type)
    },
    {
      field: 'Extension',
      value: extension
    },
    {
      field: 'Dimension',
      value: formattedDimension
    },
    {
      field: 'Size',
      value: filesize(size)
    },
    {
      field: 'Campaigns',
      value: getAssociatedCampaigns(asset)
    },
    {
      field: 'Channels',
      value: getAssociatedChannels(asset)
    }
  ]

  return (
    <div className={styles.container}>
      <h2>Details</h2>
      {fieldValues.map(fieldvalue => (
        <div className={styles['field-wrapper']} key={fieldvalue.field}>
          <div className={`secondary-text ${styles.field}`}>{fieldvalue.field}</div>
          <div className={'normal-text'}>{fieldvalue.value}</div>
        </div>
      ))}
      <div className={styles['field-wrapper']} >
        <div className={`secondary-text ${styles.field}`}>Tags</div>
        <div className={'normal-text'}>
          <ul className={`tags-list ${styles['tags-list']}`}>
            {assetTags?.map((tag, index) => (
              <li>
                <Tag
                  tag={tag.name}
                  canRemove={true}
                  removeFunction={() => removeTag(index)}
                />
              </li>
            ))}
          </ul>
          {activeTags ?
            <div className={`tag-select ${styles['select-wrapper']}`}>
              <CreatableSelect
                placeholder={'Enter a new tag or select an existing one'}
                options={inputTags.map(tag => ({ label: tag.name, value: tag.id }))}
                className={`regular item`}
                onChange={handleTagChange}
                classNamePrefix='select-prefix'
              />
            </div>
            :
            <div className={`add ${styles['select-add']}`} onClick={() => setActiveTags(true)}>
              <IconClickable src={Utilities.add} />
              <span>Add Tag</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SidePanel