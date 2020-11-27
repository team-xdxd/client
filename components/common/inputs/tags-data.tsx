import React, { useRef, useState, useEffect } from 'react'
import ReactSelection, { components } from 'react-select'
import update from 'immutability-helper'
import FiltersSelect from './filters-select'
import styles from './tags-data.module.css'
export const TagsData = ({ options, styleType = '', placeholder, topTags, children }) => {
    const [open, setOpen] = useState(false)


    const MenuList = props => (

        <div className={styles['container-most-used']}>
            <div className={styles['title-most-used']}>Most Used Tags</div>
            <div className={styles['container-data']}>
                {topTags.map((topTag, index) => {
                    return (
                        <div className={styles['container-data-row']} key={index}>
                            <div className={styles['data-top']}>
                                <span>{topTag.name}</span>
                            </div>
                            <div className={styles['number-top']}>
                                <span>{topTag.number}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <input placeholder="Search for Tags" type="text" className={`${styles['search-filter']} ${styleType} ${styles[styleType]}`} /> */}
            {props.children}
        </div>

    )
    return (
        <>
            <div className={styles.wrapper} onClick={() => setOpen(!open)}>
                <div className={styles['select-list']}>
                    <div className={`${styles.container} ${styleType} ${styles[styleType]}`}>
                        Tags
                </div>
                    {/* <ReactSelection
                    controlShouldRenderValue={false}
                    classNamePrefix='select-prefix'
                    placeholder={placeholder}
                    isMulti={false}
                    hideSelectedOptions={false}
                    options={options}
                    components={{ MenuList }}
                    
                    className={`${styles.container} ${styleType} ${styles[styleType]}`}
                /> */}
                </div>
            </div>
            {open && <MenuList>
                {children}
            </MenuList>}
        </>
    )
}
