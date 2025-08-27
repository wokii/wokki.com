import React from "react";

type LinkItem = {
  title: string;
  href: string;
  description?: string;
};

const mentors: LinkItem[] = [
  {
    title: "Bernát Gábor",
    href: "https://bernat.tech/about/",
    description: "PSF (Python Software Foundation) Fellow",
  },
];

const friends: LinkItem[] = [
  {
    title: "Jonathan Paserman",
    href: "https://medium.com/@jonathanpaserman",
    description: "League of Draven(?)",
  },
];

const media: LinkItem[] = [
  {
    title: "Stay Hungry, Stay Foolish",
    href: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
    description: "steve jobs @ Stanford",
  },
  {
    title: "BLACKPINK - 'Pink Venom'",
    href: "https://www.youtube.com/watch?v=gQlMMD8auMs&list=RDgQlMMD8auMs",
    description: "Feast of Colors",
  },
];

function LinkCard({ item }: { item: LinkItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-foreground rounded-md p-6 hover:bg-foreground hover:text-background transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-xl font-bold group-hover:text-accent">
            {item.title}
          </h4>
          {item.description && (
            <p className="mt-2 text-sm text-foreground/70 group-hover:text-background/70">
              {item.description}
            </p>
          )}
        </div>
        <span aria-hidden className="ml-4">
          ↗
        </span>
      </div>
    </a>
  );
}

export default function Kindred() {
  return (
    <section
      id="kindred"
      className="min-h-screen py-16 border-t border-foreground flex items-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-12">
          KINDRED
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Mentor</h3>
            <div className="space-y-4">
              {mentors.map((m) => (
                <LinkCard key={m.href} item={m} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Friends</h3>
            <div className="space-y-4">
              {friends.map((f) => (
                <LinkCard key={f.href} item={f} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Media</h3>
            <div className="space-y-4">
              {media.map((v) => (
                <LinkCard key={v.href} item={v} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
