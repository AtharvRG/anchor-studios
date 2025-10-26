// src/lib/projects.ts

export type Project = {
  id: number;
  title: string;
  description: string;
  // We'll keep bgColor as a fallback for if the video fails to load
  bgColor: string; 
  videoUrl: string; // The new property
  siteUrl: string;
};

// We will now showcase only two projects as requested.
export const projects: Project[] = [
  {
    id: 1,
    title: "Fractal",
    description:
      "It is a web-based multi-file code playground that parses code live with Tree-sitter for instant AST exploration. It lets users create, organize, and share snippets via compressed URLs",
    bgColor: "bg-zinc-800", // A neutral fallback color
    videoUrl: "/videos/Fractal.mp4", // Path relative to the 'public' folder
    siteUrl: "https://fractal-anchor.vercel.app",
  },
  {
    id: 2,
    title: "Lemma",
    description:
      "It is a in-browser time-travel debugger for JS, Python, Go, Rust & C++ that lets you step through code execution like a movie.",
    bgColor: "bg-zinc-800",
    videoUrl: "/videos/Lemma.mp4",
    siteUrl: "https://lemma-anchor.vercel.app/",
  },
  {
    id: 3,
    title: "Optima",
    description:
      "~Comming soon~",
    bgColor: "bg-zinc-800",
    videoUrl: "#",
    siteUrl: "#",
  }, 
];