import styles from './list-item.module.css'

const ListItem = ({item, key}) => {
  return (
    <>
      <div>
        <div>
          {item.name}
        </div>
        <div>
          {item}
        </div>
      </div>
    </>
  )
}

export default ListItem