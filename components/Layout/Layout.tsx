import { PropsWithChildren } from 'react';
import { CakeIcon } from '@heroicons/react/20/solid';
import Link from '../Link';
import Header from '../Header/Header';
import Search from '../Search';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation: { name: string; href: string; exact?: boolean }[] = [
  { name: 'Hoofdgerechten', href: '/recepten/hoofdgerecht' },
  { name: 'Bijgerechten', href: '/recepten/bijgerecht' },
  { name: 'Baksels', href: '/recepten/baksel' },
  { name: 'Kruiden', href: '/recepten/kruiden' },
];

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-fuchsia-700 pb-44">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <CakeIcon className="h-8 w-8 text-white" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        exact={item.exact}
                        key={item.name}
                        href={item.href}
                        activeClass="underline"
                        className="text-white hover:bg-fuchsia-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <Search />
                </div>
              </div>
              <div className="flex lg:hidden justify-self-end justify-end">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-fuchsia-700 p-2 text-fuchsia-200 hover:bg-fuchsia-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-fuchsia-600">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  activeClass="underline !bg-fuchsia-700"
                  className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-fuchsia-500 hover:bg-opacity-75"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>

        <main id="main-content" className="-mt-44">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 pt-28">
            {/* Replace with your content */}
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6 min-h-[10rem]">
              {children}
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
