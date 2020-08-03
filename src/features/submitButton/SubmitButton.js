import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  return <Button loading={isLoading} primary fluid onClick={() => {
    setIsLoading(true)
  }}>
    Loading
  </Button>
}

export default SubmitButton