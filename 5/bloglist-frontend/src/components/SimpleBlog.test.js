import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/react'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

describe('<SimpleBlog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Blog test',
      author: 'Blog test maker',
      likes: 0
    }
    const clickFunction = () => {
      console.log('klick')
    }
    component = render(
      <SimpleBlog blog={blog} onClick={clickFunction} />
    )
  })
  test('renders blog title and author correctly', () => {
    const element = component.getByText(
      'Blog test Blog test maker'
    )
    expect(element).toBeDefined()
  })
  test('renders blog likes correctly', () => {
    const element = component.getByText(
      'blog has 0 likes'
    )
    expect(element).toBeDefined()
  })
  test('like button can be pressed twice in a row', () => {
    const mockHandler = jest.fn()
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})