type Props = {
  children: string | string[];
};

export default function Header({ children }: Props) {
  return (
    <header className="h-24 -mt-24 -ml-4 sm:-ml-6 lg:-ml-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {children}
        </h1>
      </div>
    </header>
  );
}
