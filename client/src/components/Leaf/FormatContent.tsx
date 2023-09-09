interface FormatContentProps {
  content: string;
  className: string;
}
export default function FormatContent({
  content,
  className,
}: FormatContentProps) {
  return (
    <p className={className} dangerouslySetInnerHTML={{ __html: content }}></p>
  );
}
