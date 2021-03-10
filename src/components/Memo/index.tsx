import React, { FunctionComponent } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import MemoForm from './MemoForm'

interface Props {
}

const Memo: FunctionComponent<Props> = () => {
  const queryClient = useQueryClient()
  const memosQuery = useQuery('memos', () => {
    return axios.get('/api/memos').then((res) => res.data)
  })

  const { mutate: createMemo, isLoading, isError, isSuccess } = useMutation((values: any) => {
    return axios.post('/api/memos', values).then((res) => res.data)
  }, {
    onSuccess: () => {
      // 다시 요청
      queryClient.invalidateQueries('memos')
    },
  })
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

      <div>
        <h3>Create New Memo</h3>
        <MemoForm
          onSubmit={createMemo}
          clearOnSubmit={true}
          submitText={isLoading ? 'saving...' : isError ? 'Error !' : isSuccess ? 'Saved!!' : 'Create Memo'}
        />
      </div>
    </section>
  )
}

export default Memo