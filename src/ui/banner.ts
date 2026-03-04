const banner = String.raw`
████████╗██╗   ██╗██████╗ ███████╗██╗   ██╗██╗   ██╗   ███████╗██╗  ██╗
╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██║   ██║██║   ██║   ██╔════╝██║  ██║
   ██║    ╚████╔╝ ██████╔╝█████╗  ██║   ██║██║   ██║   ███████╗███████║
   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ██║   ██║██║   ██║   ╚════██║██╔══██║
   ██║      ██║   ██║     ███████╗╚██████╔╝╚██████╔╝██╗███████║██║  ██║
   ╚═╝      ╚═╝   ╚═╝     ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═╝  ╚═╝
`;

let didPrint = false;

export function printBanner(): void {
  if (didPrint) {
    return;
  }
  didPrint = true;
  console.log(banner);
  console.log("Design system skill generator for Codex, Cursor, Claude Code, and Open Code.");
  console.log("");
}
