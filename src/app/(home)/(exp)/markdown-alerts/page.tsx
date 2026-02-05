import { MarkdownAlert, Highlight } from "@/components/markdown-alert";
import PageTitle from "@/components/page-title";

export default function MarkdownAlertsDemo() {
  return (
    <article>
      <PageTitle title={"Markdown Alerts Demo"} />
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <MarkdownAlert type="tip">
            <p>
              Instead of setting up a local development environment, you can use
              the <Highlight variant="green">online playground</Highlight>.
            </p>
          </MarkdownAlert>

          <MarkdownAlert type="info">
            <p>Make sure you have installed the recommended setup:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                Latest LTS version of either{" "}
                <Highlight variant="blue">Node.js</Highlight>,{" "}
                <Highlight variant="blue">Bun</Highlight>, or{" "}
                <Highlight variant="blue">Deno</Highlight>.
              </li>
              <li>
                <Highlight variant="blue">Visual Studio Code</Highlight>
              </li>
            </ul>
          </MarkdownAlert>

          <MarkdownAlert type="warning">
            <p>
              This feature is experimental and may change in future versions.
              Use with <Highlight variant="yellow">caution</Highlight> in
              production environments.
            </p>
          </MarkdownAlert>

          <MarkdownAlert type="important">
            <p>
              This feature is experimental and may change in future versions.
              Use with <Highlight variant="purple">important</Highlight> in
              production environments.
            </p>
          </MarkdownAlert>

          <MarkdownAlert type="danger">
            <p>
              <Highlight variant="red">Warning:</Highlight> This action cannot
              be undone. Make sure you have backed up your data before
              proceeding.
            </p>
          </MarkdownAlert>

          <MarkdownAlert type="info">
            <p>To get started with the project, follow these steps:</p>
            <ol className="list-decimal list-inside space-y-2 mt-3">
              <li>
                Install dependencies using{" "}
                <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">
                  npm install
                </code>
              </li>
              <li>
                Configure your environment variables in{" "}
                <Highlight variant="blue">.env.local</Highlight>
              </li>
              <li>
                Run the development server with{" "}
                <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">
                  npm run dev
                </code>
              </li>
            </ol>
          </MarkdownAlert>
        </div>
      </div>
    </article>
  );
}
