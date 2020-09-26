import styles from './comment-input.module.css'
import { useState, useRef, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import { Comments, Utilities } from '../../../assets'
import { Picker } from 'emoji-mart'
import getCaretCoordinates from 'textarea-caret'

// Components
import Button from '../buttons/button'
import ToggleableAbsoluteWrapper from '../misc/toggleable-absolute-wrapper'
import SearchableUserList from '../user/searchable-user-list'
import UserPhoto from '../user/user-photo'

const CommentInput = ({ style = 'comment', onSubmit }) => {

  const [content, setContent] = useState('')
  const [inputPosition, setInputPosition] = useState(0)
  const [activePosibleMention, setActivePosibleMention] = useState('')
  const [mentionStartPosition, setMentionStartPosition] = useState(-1)

  const { user } = useContext(UserContext)

  const inputRef = useRef(null)

  const InputIconsPair = () => (
    <div className={styles['image-pair']}>
      <ToggleableAbsoluteWrapper
        closeOnAction={false}
        Wrapper={({ children }) =>
          <>
            <img src={Comments.smileLight} />
            {children}
          </>
        }
        Content={() => <Picker
          emoji=''
          onSelect={addEmoji}
          showPreview={false}
          style={{
            position: 'absolute',
            right: 0,
            top: '2rem'
          }}
          native={true} />}
        contentClass={styles['picker-wrapper']}
        wrapperClass={styles['image-wrapper']}
      />
      <ToggleableAbsoluteWrapper
        closeOnAction={false}
        Wrapper={({ children }) =>
          <>
            <img src={Comments.mentionLight} />
            {children}
          </>
        }
        Content={() => <SearchableUserList
          onUserSelected={addMention} />}
        wrapperClass={styles['image-wrapper']}
        contentClass={styles['user-list-wrapper']}
      />
    </div>
  )

  useEffect(() => {
    if (inputPosition < mentionStartPosition) {
      resetMentionDropdown()
    }
  }, [inputPosition])

  const addEmoji = (emoji) => {
    modifyText(emoji.native)
  }

  const addMention = (user) => {
    const text = `@${user.name}`
    if (mentionStartPosition !== -1) {
      modifyText(text, mentionStartPosition - 1, inputPosition)
    } else {
      modifyText(text)
    }
  }

  const modifyText = (newContent, position = inputPosition, positionOffset = 0) => {
    const firstHalf = content.substring(0, position)
    const secondHalf = content.substring(position + positionOffset, content.length)
    setContent(`${firstHalf}${newContent}${secondHalf}`)
    const newPosition = position + newContent.length
    setInputPosition(newPosition)
    resetMentionDropdown()
    // Refocus and set caret at position of inserted content
    inputRef.current.focus()
    inputRef.current.select()
    // need to set a timeout. Focus and select are not immediate
    setTimeout(() => inputRef.current.setSelectionRange(newPosition, newPosition))

  }

  const submitComment = async (e) => {
    e.preventDefault()
    await onSubmit(content)
    setContent('')
    resetMentionDropdown()
  }

  const resetMentionDropdown = () => {
    setActivePosibleMention('')
    setMentionStartPosition(-1)
  }

  const updateContent = (e) => {
    const newPosition = e.target.selectionStart
    const newContent = e.target.value
    setContent(newContent)
    setInputPosition(newPosition)
    // Check if user wants to mention someone
    if (newContent.charAt(newPosition - 1) === '@') {
      const { left, top } = getCaretCoordinates(inputRef.current, newPosition)
      document.documentElement.style.setProperty('--top-dropdown', `${top}px`)
      document.documentElement.style.setProperty('--left-dropdown', `${left}px`)
      setActivePosibleMention('')
      setMentionStartPosition(newPosition)
    }

    // Check if user is mentioning someone. Display dropdown if at least 1 match
    else if (mentionStartPosition !== -1) {
      setActivePosibleMention(newContent.substring(mentionStartPosition, newPosition))
    }
  }

  const breakValue = style === 'comment' ? 25 : 20

  return (
    <form onSubmit={submitComment}>
      <div className={styles['input-container']}>
        {style === 'reply' &&
          <UserPhoto photoUrl={user?.profilePhoto} sizePx={27} />
        }
        <textarea
          ref={inputRef}
          onChange={updateContent}
          rows={content?.length > 0 ? Math.ceil(content.length / breakValue) : 1}
          value={content}
          onClick={e => setInputPosition(e.target.selectionStart)}
          placeholder={style === 'comment' ? 'Add a comment' : 'Reply'}
          className={`${styles['content-input']} ${styles[style]}`}
        />
        {activePosibleMention &&
          <div className={styles['mention-dropdown']}>
            <SearchableUserList
              externalTerm={activePosibleMention}
              onUserSelected={addMention} />
          </div>
        }
        <InputIconsPair />
      </div>
      {content &&
        <div className={styles['buttons-wrapper']}>
          <Button
            text='Cancel'
            type='button'
            styleType='secondary'
            onClick={() => {
              setContent('')
            }}
          />
          <Button
            text='Post'
            type='button'
            onClick={submitComment}
            styleType='primary' />
        </div>
      }
    </form>
  )
}

export default CommentInput
