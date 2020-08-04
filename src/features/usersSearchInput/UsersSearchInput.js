import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Form, Button } from 'semantic-ui-react'
import { getUser } from '../../app/githubSlice'

const UserSearchInput = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  return <Form>
    <Input focus placeholder='Search github users' fluid value={value} onChange={(e, { value }) => { setValue(value) }} />
    <Button loading={isLoading} primary fluid onClick={async () => {
      setIsLoading(true)
      await dispatch(getUser(value))
      setIsLoading(false)
    }}>
      Search
    </Button>
    </Form>
}

export default UserSearchInput