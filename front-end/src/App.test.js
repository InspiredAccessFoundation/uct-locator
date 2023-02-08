import App from "./App";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test("renders without crashing", async () => {
  // ARRANGE
  render(<App />)

  // ACT
  await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('UCT Locator')
})