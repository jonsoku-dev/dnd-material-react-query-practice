import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'
import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import DndPage from './pages/DndPage'
import IndexPage from './pages/IndexPage'

const queryClient = new QueryClient() // Create a client
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
            <Route path='/dnd'>
              <DndPage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
