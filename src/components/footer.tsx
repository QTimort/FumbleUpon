import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="p-2 uppercase text-rad-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-2 text-center text-sm sm:grid-cols-2 lg:grid-cols-2">
          <p className={"border border-rad-orange p-1"}>
            Initiative{" "}
            <a
              href="https://twitter.com/FumbleUpon_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 font-bold underline underline-offset-4"
            >
              @FumbleUpon_
            </a>
          </p>
          <p className={"border border-rad-orange p-1"}>
            Website{" "}
            <a
              href="https://twitter.com/TimortUnchained"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 font-bold underline underline-offset-4"
            >
              @TimortUnchained
            </a>
          </p>
          <p className={"border border-rad-orange p-1"}>
            Idea{" "}
            <a
              href="https://twitter.com/Seb_Moriarty"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 font-bold underline underline-offset-4"
            >
              @Seb_Moriarty
            </a>
          </p>
          <p className={"border border-rad-orange p-1"}>
            Logo{" "}
            <a
              href="https://twitter.com/PatisPapi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 font-bold underline underline-offset-4"
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
