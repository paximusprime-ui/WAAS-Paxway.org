/**
 * JsonLd — Server Component
 * Outputs structured data for Google rich results.
 * Usage: <JsonLd data={schema} />
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
