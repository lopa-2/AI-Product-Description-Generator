import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Button, Input, Loader, Toast, Modal } from "../components/ui"

function Demo() {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [inputValue, setInputValue] = useState("")

  return (
    <div>
      <Navbar />
      <div className="bg-amber-50 min-h-screen px-6 py-16">
        <h1 className="text-4xl font-bold text-green-900 text-center mb-12">
          Component Library
        </h1>

        <div className="max-w-2xl mx-auto flex flex-col gap-12">

          <section>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Buttons</h2>
            <div className="flex gap-4 flex-wrap">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Input</h2>
            <Input
              label="Product Name"
              placeholder="e.g. Himalayan Honey"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Error Example"
              placeholder="Enter something"
              error="This field is required"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Loader</h2>
            <div className="flex gap-8 items-center">
              <Loader size="sm" />
              <Loader size="md" />
              <Loader size="lg" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Modal</h2>
            <Button onClick={() => setShowModal(true)}>Open Modal</Button>
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="Example Modal"
            >
              <p className="text-gray-600">This is the modal content area.</p>
            </Modal>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Toast</h2>
            <Button onClick={() => setShowToast(true)}>Show Toast</Button>
            {showToast && (
              <Toast
                message="Action completed successfully!"
                type="success"
                onClose={() => setShowToast(false)}
              />
            )}
          </section>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Demo