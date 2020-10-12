import styles from './nested-select.module.css'
import update from 'immutability-helper'
import ReactSelect, { components } from 'react-select'
import { Utilities } from '../../../assets'
import { useState, useRef, useEffect } from 'react'

// Components
import FiltersSelect from './filters-select'
import Button from '../buttons/button'

const NestedSelect = ({ selectList, onApplyFilters }) => {

  const [tempSelections, setTempSelections] = useState([])

  useEffect(() => {
    const newTempSelections = selectList.map((selectItem) => selectItem.value)
    setTempSelections(newTempSelections)
  }, [selectList])

  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = (event) => {
    if (contentRef.current && !contentRef.current.contains(event.target) && !wrapperRef.current.contains(event.target)
      && event.target.nodeName !== 'svg') {
      setDropdownOpen(null, false)
    }
  }

  const setDropdownOpen = (e, visible) => {
    if (e) {
      e.stopPropagation()
    }
    setIsOpen(visible)
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }

  const setSelection = (selectValue, index) => {
    setTempSelections(update(tempSelections, {
      [index]: { $set: selectValue }
    }))
  }

  const applyFilters = (e) => {
    setDropdownOpen(e, false)
    onApplyFilters(tempSelections)
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <Button
        text='Filters'
        type='button'
        styleType='secondary'
        onClick={(e) => {
          setDropdownOpen(e, true)
        }} />
      {isOpen &&
        <div ref={contentRef} className={styles.content}>
          <div className={styles['select-list']}>
            {selectList.map((selectData, index) => (
              <div key={index}>
                {!selectData.hidden &&
                  <FiltersSelect
                    options={selectData.options}
                    placeholder={selectData.placeholder}
                    isClearable={true}
                    styleType='filter filter-schedule'
                    value={tempSelections[index]}
                    closeMenuOnSelect={true}
                    onChange={(selected) => setSelection(selected, index)}
                  />
                }
              </div>
            ))}
          </div>
          <div className={styles['button-wrapper']}>
            <Button text='Apply' type='button' styleType='primary' onClick={applyFilters} />
          </div>
          <div className={styles['button-wrapper']}>
            <Button text='Cancel' type='button' styleType='secondary' onClick={(e) => {
              setDropdownOpen(e, false)
            }} />
          </div>
        </div>
      }
    </div >
  )
}

export default NestedSelect


