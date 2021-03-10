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
            </ul>
          </nav>
          <Switch>
            <Route path='/' exact>
              <IndexPage />
            </Route>
            <Route path='/dnd' exact>
              <DndPage />
            </Route>
            <Route path='/post' exact>
              <PostPage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
