// Test page to play around with components

import Button from '../components/common/button'
import Input from '../components/common/input'
import Select from '../components/common/select'
import AuthContainer from '../components/common/auth-container'

const Playground = () => (
  <div>
    <AuthContainer
      title={'Get started for FREE today'}
      subtitle={'No credit card required - 10 day free trial'}
    >
      <>
        <div>
          <Button text='Sign Up' type='s'/>
        </div>
        <div></div>
        <Input placeholder='Full Name' />
        <Select />
      </>
    </AuthContainer>

  </div >
)

export default Playground
