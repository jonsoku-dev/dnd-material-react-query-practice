import React, { FunctionComponent } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios, { AxiosError } from 'axios'
import MemoForm from './MemoForm'

interface Props {
}

const Memo: FunctionComponent<Props> = () => {
  const queryClient = useQueryClient()
  const memosQuery = useQuery('memos', () => {
    return axios.get('/api/memos').then((res) => res.data)
  })

  const { mutate: createMemo, isLoading, isError, isSuccess, error } = useMutation((values: any) => {
    return axios.post('/api/memos', values).then((res) => res.data)
  }, {
    // Optimistic Updates
    // https://react-query.tanstack.com/guides/optimistic-updates#_top
    // 요청 후 fake data 로 바로 데이터 띄우기
    onMutate: (newMemo) => {
      queryClient.cancelQueries('memos')
      const oldMemos = queryClient.getQueryData('memos')
      queryClient.setQueryData('memos', (oldMemos: any) => {
        return [
          ...oldMemos,
          {
            ...newMemo,
            id: Date.now(), // id는 일단.. ?
          },
        ]
      })
      return { oldMemos }
    },
    onError: (error, value, context:any) => {
      queryClient.setQueryData('memos', context.previousMemos)
    },
    onSettled: () => queryClient.invalidateQueries('memos'), // 방법 1: 다시 요청
  })

  const err = error as AxiosError

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
          submitText={isLoading ?
            'saving...' :
            isError ?
              'Error !' :
              isSuccess ?
                'Saved!!' :
                'Create Memo'}
        />
        {isError ? (
          <pre>{err.response?.data.message}</pre>
        ) : null}
      </div>
    </section>
  )
}

export default Memo