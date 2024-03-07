import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="p-4 text-zinc-400">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center text-sm flex  flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
          <p>
            A{" "}
            <a
              href="https://twitter.com/RadiantsDAO"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-zinc-200 underline underline-offset-4"
            >
              @RadiantsDAO
            </a>{" "}
            initiative
          </p>
          <p>
            Website made by{" "}
            <a
              href="https://twitter.com/TimortUnchained"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-zinc-200 underline underline-offset-4"
            >
              @TimortUnchained
            </a>
          </p>
          <p>
            Idea by <a
            href="https://twitter.com/Seb_Moriarty"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-zinc-200 underline underline-offset-4"
          >
            @Seb_Moriarty
          </a>
          </p>
          <p>
            Logo made by <a className={"text-zinc-200e"}>Kuya</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
