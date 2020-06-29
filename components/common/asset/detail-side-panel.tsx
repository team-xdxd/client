import styles from './detail-side-panel.module.css'
import { format } from 'date-fns'
import { capitalCase } from 'change-case'
import filesize from 'filesize'

const SidePanel = ({ asset }) => {
  const {
    createdAt,
    type,
    extension,
    dimension,
    size
  } = asset

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
    </div>
  )
}

export default SidePanel