import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Terminal } from "lucide-react";

const VCP_URL = "vcp://quickcopy/vcp-c6b6ce2ee19a4a3e8cc07ff7bb01f035";

export default function Index() {
  const [manager, setManager] = useState<"npx" | "pnpm" | "yarn">("npx");
  const [spaceId, setSpaceId] = useState("");

  const command = useMemo(() => {
    const base = "\"@builder.io/dev-tools@latest\" code";
    const urlPart = ` --url ${VCP_URL}`;
    const spacePart = spaceId ? ` --spaceId ${spaceId.trim()}` : "";
    if (manager === "npx") return `npx ${base}${urlPart}${spacePart}`;
    if (manager === "pnpm") return `pnpm dlx ${base}${urlPart}${spacePart}`;
    return `yarn dlx ${base}${urlPart}${spacePart}`;
  }, [manager, spaceId]);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
  };

  return (
    <div className="flex flex-col gap-16">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-muted-foreground">
            <Terminal className="mr-2 h-3.5 w-3.5" /> Builder Dev Tools
          </span>
          <h1 className="text-balance bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Generate code from a QuickCopy VCP
          </h1>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            Run the CLI to pull code from QuickCopy into your project using a
            VCP link and optional Builder Space ID.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.builder.io/c/docs/projects"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
            >
              Learn how Projects work
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-indigo-500/20 blur-2xl" />
          <div className="rounded-xl border bg-card p-6 shadow-xl">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Package runner</label>
                <Select value={manager} onValueChange={(v) => setManager(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="npx">npx (npm)</SelectItem>
                    <SelectItem value="pnpm">pnpm dlx</SelectItem>
                    <SelectItem value="yarn">yarn dlx</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Builder Space ID (optional)</label>
                <Input
                  placeholder="e.g. 123abc456def..."
                  value={spaceId}
                  onChange={(e) => setSpaceId(e.target.value)}
                  spellCheck={false}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Command</label>
                <div className="group relative rounded-md border bg-muted/40 p-3 font-mono text-xs md:text-sm">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words leading-relaxed">
                    <code>{command}</code>
                  </pre>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={copy}
                    aria-label="Copy command"
                  >
                    <Copy className="h-4 w-4" /> Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Step
          index={1}
          title="Open your terminal"
          desc="Navigate to your project root where you want the code generated."
        />
        <Step index={2} title="Run the command" desc="Paste the command above and press Enter." />
        <Step
          index={3}
          title="Customize & ship"
          desc="Adjust the generated code, then deploy via Netlify or Vercel."
        />
      </section>
    </div>
  );
}

function Step({ index, title, desc }: { index: number; title: string; desc: string }) {
  return (
    <div className="relative rounded-xl border bg-card p-6 shadow-sm">
      <div className="absolute -top-3 left-6 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 px-2 text-xs font-bold text-white shadow-sm">
        {index}
      </div>
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
