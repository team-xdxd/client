// Test page to play around with components

import Input from '../components/common/input'
import Select from '../components/common/select'
import AuthContainer from '../components/common/auth-container'
import NavDropdownButton from '../components/common/nav-dropdown-button'

import { GeneralImg } from '../assets'

const Playground = () => (
  <div>
    <AuthContainer
      title={'Get started for FREE today'}
      subtitle={'No credit card required - 10 day free trial'}
    >
      <>
        <div>
          <NavDropdownButton
            text='Create new'
            options={[
              {
                label: 'Campaign',
                onClick: () => { },
                icon: GeneralImg.logo
              },
              {
                label: 'Project',
                onClick: () => { },
                icon: GeneralImg.logo
              },
              {
                label: 'Task',
                onClick: () => { },
                icon: GeneralImg.logo
              }
            ]}
          />
        </div>
        <div></div>
      </>
    </AuthContainer>

  </div >
)

export default Playground
