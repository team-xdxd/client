import GooglePicker from 'react-google-picker'
import { useState } from 'react'
import toastUtils from '../../../utils/toast'

import cookiesUtils from '../../../utils/cookies'

const DriveSelector = ({ children, onFilesSelect }) => {
    const selectDriveFiles = (data) => {
        if (data.action === 'picked') {
            onFilesSelect(data.docs)
        }
    }

    return (
        <GooglePicker clientId={process.env.GOOGLE_CLIENT_ID}
            developerKey={process.env.GOOGLE_DEVELOPER_KEY}
            scope={['https://www.googleapis.com/auth/drive.readonly']}
            onChange={selectDriveFiles}
            onAuthenticate={token => cookiesUtils.set('gdriveToken', token)}
            onAuthFailed={error => {
                if (error.error === 'popup_closed_by_user') return
                toastUtils.error(`Could not get google drive data, please try again alter`)
                console.log(error)
            }}
            multiselect={true}
            navHidden={true}
            authImmediate={false}
            mimeTypes={['image/png', 'image/jpeg', 'image/jpg', 'video/mp4']}
            viewId={'DOCS'}>
            {children}
        </GooglePicker>
    )
}

export default DriveSelector
