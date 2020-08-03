import React from 'react'
import { Input } from 'semantic-ui-react'

const UserSearchInput = () => {

  return <Input focus placeholder='Search...' fluid onChange={value => {
    // findUser(value)
  }} />
}

export default UserSearchInput