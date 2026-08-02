import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  handleReload = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50 px-6">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-green-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We hit an unexpected error. Please try going back to the homepage.
            </p>
            <button
              onClick={this.handleReload}
              className="bg-yellow-400 text-green-900 font-bold px-6 py-2 rounded-lg text-sm hover:bg-yellow-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary