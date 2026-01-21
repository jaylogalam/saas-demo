interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
