import {Center, Flex, Input, chakra, Button, Stack} from "@chakra-ui/react"

interface Props {
  startGame: (lines: number, columns: number, bombs: number) => void
}

const CustomInput = chakra('input', {
  baseStyle: {
    bg: '#444',
    border: 'solid 2px #888',
    rounded: '10px',
    color: '#eee',
    p: '10px 20px',
    '::placeholder': {
      color: '#aaa',
    },
    ':focus': {
      borderColor: '#ddd',
      outline: 'none',
    }
  }
})

export function Menu({ startGame }: Props) {
  return (
    <Center h="100dvh">
      <Stack>
        <Flex align="center" gap="10px">
          <CustomInput type="number" placeholder={'Lines'}/>
          <CustomInput type="number" placeholder={'Columns'}/>
          <CustomInput type="number" placeholder={'Bombs'}/>
        </Flex>

        <chakra.button>Start</chakra.button>

      </Stack>
    </Center>
  )
}
