import styles from './list-item.module.css'

const ListItem = ({item, key}) => {
  return (
    <>
        <div>
            {item.name}
        </div>
    </>
  )
}

export default ListItem