import React, { FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import BoardForm from '../components/Board/BoardForm'

interface Props {
}

interface PropsRoute {
  boardId?: string | undefined;
}

const BoardPage: FunctionComponent<Props> = () => {
  const queryClient = useQueryClient()
  const { boardId } = useParams<PropsRoute>()

  const boardQuery = useQuery(['board', boardId], () =>
    axios.get(`/api/boards/${boardId}`).then((res) => res.data),
  )

  const {
    mutate: saveBoard,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useMutation((values: any) =>
      axios.patch(`/api/boards/${values.id}`, values).then(res => res.data), {
      // 방법 1 : patch 하고나면 새로운 데이터로 갱신하기위해 한번 더 호출한다.
      // onSuccess: (data, values) => queryClient.invalidateQueries(['board', String(values.id)]),

      // 방법 2 : react-query 로 로컬 캐시를 최신화한다. (갱신을 위한 api 통신은 하지않음)
      onSuccess: (data, values) => {
        queryClient.setQueryData(['board', String(values.id)], data)
      },
    },
  )

  return (
    <>
      {boardQuery.isLoading ? (
        <span>Loading ...</span>
      ) : (
        <div>
          <h3>
            <Link to={`/board/${boardId}`}>
              {boardQuery.data?.title} {boardQuery.isFetching ? '...' : null}
            </Link>
          </h3>
          <p>
            <small>Board ID: {boardQuery.data?.id}</small>
          </p>
          <BoardForm
            initialValues={boardQuery.data}
            onSubmit={saveBoard}
            submitText={
              isLoading
                ? 'Saving ...'
                : isError
                ? 'Error !'
                : isSuccess
                  ? 'Saved!'
                  : 'Save Post'
            }
          />
        </div>
      )}
    </>
  )
}

export default BoardPage
