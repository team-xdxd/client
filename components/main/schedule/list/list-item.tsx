import styles from './list-item.module.css'

const ListItem = ({item, key}) => {
  return (
    <>
    {item.publishDate || item.endDate &&
      <div>
        <div>
          {item.name}
          {item.itemType}
        </div>
        <div>
            <div>
              {item.itemType === 'project' ?
                item.publishDate
              :
                item.endDate
              }
            </div>
        </div>
      </div>
    }
    </>
  )
}

export default ListItem