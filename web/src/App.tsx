import { useState } from 'react'
import Drawer from './components/Drawer'
import DrawerContent1 from './components/DrawerContent1'
import DrawerContent2 from './components/DrawerContent2'
import DrawerContent3 from './components/DrawerContent3'
import Modal from './components/Modal'
import ModalContent1 from './components/ModalContent1'
import ModalContent2 from './components/ModalContent2'

const App = () => {
  const [isDrawerOpen1, setIsDrawerOpen1] = useState(false)
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false)
  const [isDrawerOpen3, setIsDrawerOpen3] = useState(false)

  const [isModalOpen1, setIsModalOpen1] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex">
        <div
          className="m-4 flex h-10 w-40 cursor-pointer items-center justify-center rounded bg-red-400"
          onClick={() => setIsDrawerOpen1(!isDrawerOpen1)}
          onKeyDown={() => {}}
        >
          drawer1
        </div>
        <div
          className="m-4 flex h-10 w-40 cursor-pointer items-center justify-center rounded bg-red-400"
          onClick={() => setIsDrawerOpen2(!isDrawerOpen2)}
          onKeyDown={() => {}}
        >
          drawer2
        </div>
        <div
          className="m-4 flex h-10 w-40 cursor-pointer items-center justify-center rounded bg-red-400"
          onClick={() => setIsDrawerOpen3(!isDrawerOpen3)}
          onKeyDown={() => {}}
        >
          drawer3
        </div>
      </div>
      <div className="flex">
        <div
          className="m-4 flex h-10 w-40 cursor-pointer items-center justify-center rounded bg-blue-400"
          onClick={() => setIsModalOpen1(!isModalOpen1)}
          onKeyDown={() => {}}
        >
          modal1
        </div>
        <div
          className="m-4 flex h-10 w-40 cursor-pointer items-center justify-center rounded bg-blue-400"
          onClick={() => setIsModalOpen2(!isModalOpen2)}
          onKeyDown={() => {}}
        >
          modal2
        </div>
      </div>
      <Drawer title="스케줄 생성" open={isDrawerOpen1} setOpen={setIsDrawerOpen1}>
        <DrawerContent1 />
      </Drawer>
      <Drawer title="스케줄 생성" open={isDrawerOpen2} setOpen={setIsDrawerOpen2}>
        <DrawerContent2 />
      </Drawer>
      <Drawer title="스케줄 생성" open={isDrawerOpen3} setOpen={setIsDrawerOpen3}>
        <DrawerContent3 />
      </Drawer>
      <Modal open={isModalOpen1} setOpen={setIsModalOpen1} title="스케줄 정보">
        <ModalContent1 />
      </Modal>
      <Modal open={isModalOpen2} setOpen={setIsModalOpen2} title="스케줄 정보">
        <ModalContent2 />
      </Modal>
    </div>
  )
}

export default App
