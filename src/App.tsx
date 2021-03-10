import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'
import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import DndPage from './pages/DndPage'
import IndexPage from './pages/IndexPage'
import { ReactQueryDevtools } from 'react-query/devtools'
import PostPage from './pages/PostPage'
import PostDetailPage from './pages/PostDetailPage'
import MemoPage from './pages/MemoPage'
import BoardPage from './pages/BoardPage'


const queryCache = new QueryCache()
const queryClient = new QueryClient({ queryCache }) // Create a client
const theme = createMuiTheme()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/dnd'>Dnd</Link>
              </li>
              <li>
                <Link to='/post'>Post</Link>
              </li>
              <li>
                <Link to='/memo'>Memo</Link>
              </li>
              <li>
                <Link to='/board/1'>Board</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/' exact>
              <IndexPage />
            </Route>
            <Route path='/dnd' exact>
              <DndPage />
            </Route>
            <Route path='/post/:postId'>
              <PostDetailPage />
            </Route>
            <Route path='/post' exact>
              <PostPage />
            </Route>
            <Route path='/memo' exact>
              <MemoPage />
            </Route>
            <Route path='/board/:boardId'>
              <BoardPage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
