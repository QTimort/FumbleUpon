import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="p-4 text-zinc-400">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col justify-center  gap-2 text-center text-sm sm:flex-row sm:gap-4">
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
            Idea by{" "}
            <a
              href="https://twitter.com/Seb_Moriarty"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-zinc-200 underline underline-offset-4"
            >
              @Seb_Moriarty
            </a>
          </p>
          <p>
            Logo made by{" "}
            <a
              href="https://twitter.com/PatisPapi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-zinc-200 underline underline-offset-4"
            >
              @PatisPapi (Kuya)
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
