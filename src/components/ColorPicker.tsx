import { useEffect, useState } from "react"

import styled from "@emotion/styled"
import { MaterialPicker, ColorResult } from "react-color"

import { colorsType } from "../data/data"

const ColorPickerContainer = styled.div`
  display: flex;
  > div {
    padding: 0 10px;
    width: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const ColorOption = styled.div<{ active: boolean }>`
  width: 100%;
  padding: 5px 0;
  cursor: pointer;
  opacity: ${({ active }) => !active && "0.7"};
  color: ${({ active }) => active && "var(--accent-color)"};
  :hover {
    color: var(--accent-color2);
    animation: text-flicker 0.01s ease 0s infinite alternate;
  }
`

const StyledMaterialPicker = styled.div`
  > div * {
    background-color: var(--bg-color) !important;
    color: var(--default-color) !important;
    box-shadow: none;
  }
  > div {
    border: 2px solid var(--default-color);
  }
`
interface props {
  colors: colorsType
  setColors: (value: colorsType) => void
}

export const ColorPicker = ({ colors, setColors }: props) => {
  const [currentColor, setCurrentColor] = useState(Object.keys(colors)[0] ?? "")

  useEffect(() => {
    if (!colors[currentColor]) {
      setCurrentColor(Object.keys(colors)[0] ?? "")
    }
  }, [colors, currentColor])

  const handleChange = (result: ColorResult) => {
    setColors({ ...colors, [currentColor]: result.hex })
  }

  return (
    <ColorPickerContainer>
      <div>
        {Object.keys(colors).map(key => (
          <ColorOption
            key={key}
            active={key === currentColor}
            onClick={() => setCurrentColor(key)}
          >
            {key}
          </ColorOption>
        ))}
      </div>
      <StyledMaterialPicker>
        <MaterialPicker
          color={colors[currentColor] ?? "#000000"}
          onChange={handleChange}
        />
      </StyledMaterialPicker>
    </ColorPickerContainer>
  )
}
