import React from "react";

export default class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      hasError: false,
    };
  }

  static getDerivedStateFromError() {

    return {

      hasError: true,
    };
  }

  componentDidCatch(error) {

    console.log(error);
  }

  render() {

    if (
      this.state.hasError
    ) {

      return (

        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-10">

          <div className="text-center">

            <h1 className="text-6xl font-black">

              Something broke.

            </h1>

            <p className="text-slate-400 text-xl mt-5">

              The productivity system encountered an unexpected issue.

            </p>

          </div>

        </div>
      );
    }

    return this.props.children;
  }
}