import React, { FunctionComponent } from 'react'

interface Props {
  onSubmit: any
  clearOnSubmit: any
  submitText: string
}

const MemoForm: FunctionComponent<Props> = ({
                                              onSubmit,
                                              clearOnSubmit,
                                              submitText,
                                            }) => {

  return (
    <div>
      MemoForm
    </div>
  )
}

export default MemoForm
