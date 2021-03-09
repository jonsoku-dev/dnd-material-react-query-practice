import React, { useState } from 'react'
import { DragDropContext, Draggable, DraggableLocation, Droppable, DropResult } from 'react-beautiful-dnd'
import RootRef from '@material-ui/core/RootRef'
import { Button, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { getItems } from '../../actions/utils'
import InboxIcon from '@material-ui/icons/Inbox'
import EditIcon from '@material-ui/icons/Edit'


type Item = {
  id: string
  content: string
}

type ResultType = {
  [id: string]: Item[]
}

const reorder = (list: Item[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}


/**
 * Moves an item from one list to another list.
 */
const move = (source: Item[], destination: Item[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result: ResultType = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}
const grid = 8

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
})
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
})

function Dnd() {
  const [state, setState] = useState([getItems(10), getItems(5, 10)])

  function onDragEnd(result: DropResult) {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index)
      const newState = [...state]
      newState[sInd] = items
      setState(newState)
    } else {
      const result = move(state[sInd], state[dInd], source, destination)
      const newState = [...state]
      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]

      setState(newState.filter(group => group.length))
    }
  }

  return (
    <div>
      <Button
        type='button'
        variant='contained'
        color='primary'
        onClick={() => {
          setState([...state, []])
        }}
      >
        Add new group
      </Button>
      <Button
        type='button'
        variant='contained'
        color='primary'
        onClick={() => {
          setState([...state, getItems(1)])
        }}
      >
        Add new item
      </Button>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <RootRef
                  rootRef={provided.innerRef}
                >
                  <List
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {el.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <RootRef
                            rootRef={provided.innerRef}
                          >
                            <ListItem
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}
                            >
                              <ListItemIcon>
                                <InboxIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={'primary'}
                                secondary={'secondary'}
                              />
                              <IconButton onClick={() => {
                                const newState = [...state]
                                newState[ind].splice(index, 1)
                                setState(
                                  newState.filter(group => group.length),
                                )
                              }}>
                                <EditIcon />
                              </IconButton>
                            </ListItem>
                          </RootRef>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                </RootRef>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

export default Dnd