import React, { FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import MemoForm from './MemoForm'

interface Props {
}

const Memo: FunctionComponent<Props> = () => {
  const memosQuery = useQuery('memos', () => {
    return axios.get('/api/memos').then((res) => res.data)
  })

  const createMemo = (values: any) => {
    console.log('create memo', values)
  }

  return (
    <section>
      <div>
        {memosQuery.isLoading ? (
          <span>Loading ...</span>
        ) : (
          <>
            <h3>Memos {memosQuery.isFetching ? <small>...</small> : null}</h3>
            <ul>
              {memosQuery.data?.map((memo: { id: string, title: string }) => (
                <li key={memo.id}>{memo.title}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <h3>Create New Memo</h3>
      <MemoForm
        onSubmit={createMemo}
        clearOnSubmit={true}
        submitText={'Create Memo'}
      />
    </section>
  )
}

export default Memo
