type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {title}
        </h1>
      </div>
    </header>
  );
}
