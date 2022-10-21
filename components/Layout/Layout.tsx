import { PropsWithChildren } from 'react';
import { Disclosure } from '@headlessui/react';
import { CakeIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from '../Link';
import Header from '../Header/Header';
import Head from 'next/head';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';

const navigation: { name: string; href: string; exact?: boolean }[] = [
  { name: 'Hoofdgerechten', href: '/recepten/hoofdgerecht' },
  { name: 'Bijgerechten', href: '/recepten/bijgerecht' },
  { name: 'Baksels', href: '/recepten/baksel' },
  { name: 'Kruiden', href: '/recepten/kruiden' },
];

function getTypeFromPath(currenPath: string): string | undefined {
  const matches = /\/recepten\/([^/]+)\/.*/.exec(currenPath);

  if (matches === null) {
    return undefined;
  }

  return matches[1] ?? undefined;
}

function getSearchPath(currentPath: string): string | undefined {
  if (!currentPath.startsWith('/recepten')) {
    return '/recepten';
  }

  const type = getTypeFromPath(currentPath);
  if (type !== undefined) {
    return '/recepten/' + type;
  }

  return undefined;
}

export default function Layout({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  const router = useRouter();
  const searchPath = getSearchPath(router.asPath);
  const { query } = router.query;

  return (
    <>
      <Head>
        <title>{title ?? 'Recepten'}</title>
      </Head>
      <div className="min-h-full">
        <div className="bg-fuchsia-700 pb-32">
          <Disclosure
            as="nav"
            className="border-b border-fuchsia-300 border-opacity-25 lg:border-none"
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-end lg:border-b lg:border-fuchsia-400 lg:border-opacity-25">
                    <div className="flex items-center px-2 lg:px-0 justify-self-start grow">
                      <div className="flex-shrink-0">
                        <Link href="/">
                          <CakeIcon className="h-8 w-8 text-white" />
                        </Link>
                      </div>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <Link
                              exact={item.exact}
                              key={item.name}
                              href={item.href}
                              activeClassName={(isActive) =>
                                isActive
                                  ? 'underline text-white'
                                  : 'text-white hover:bg-fuchsia-500 hover:bg-opacity-75'
                              }
                              className="rounded-md py-2 px-3 text-sm font-medium"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex mr-4">
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <form action={searchPath} method="get">
                          <input
                            type="search"
                            name="query"
                            id="searchQuery"
                            defaultValue={query}
                            className="block w-full bg-fuchsia-200 rounded-md border-gray-300 pl-10 focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm"
                            placeholder="Zoeken..."
                          />
                        </form>
                      </div>
                    </div>
                    <div className="flex lg:hidden justify-self-end justify-end">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-fuchsia-700 p-2 text-fuchsia-200 hover:bg-fuchsia-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-fuchsia-600">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        href={item.href}
                        activeClassName={(isActive: boolean) =>
                          isActive
                            ? 'bg-fuchsia-700 text-white'
                            : 'text-white hover:bg-fuchsia-500 hover:bg-opacity-75'
                        }
                        className="block rounded-md py-2 px-3 text-base font-medium"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Header title={title ?? '(Monchou)'} />
        </div>

        <main id="main-content" className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              {children}
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
