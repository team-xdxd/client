import { useState, useRef } from 'react'

const ToggleableAbsoluteWrapper = ({ Wrapper, Content, wrapperClass = '', contentClass = '', closeOnAction = true, onCloseAction = false, onClose = () => { } }) => {

  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = (event) => {
    if (contentRef.current && !contentRef.current.contains(event.target) && !wrapperRef.current.contains(event.target)) {
      setDropdownOpen(null, false)
    }
  }

  const setDropdownOpen = (e, visible) => {
    if (e)
      e.stopPropagation()

    if (visible === false && onCloseAction) {
      onClose()
    }
    setIsOpen(visible)
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }

  return (
    <div ref={wrapperRef} className={wrapperClass} onClick={(e) => {
      setDropdownOpen(e, !isOpen)
    }}>
      <Wrapper>
        {isOpen &&
          <div ref={contentRef} className={contentClass} onClick={(e) => {
            if (!closeOnAction) e.stopPropagation()
          }}
          >
            <Content />
          </div>
        }
      </Wrapper>
    </div>
  )
}

export default ToggleableAbsoluteWrapper