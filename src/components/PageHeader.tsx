'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  breadcrumbs?: Array<{ name: string; href?: string }>;
}

const PageHeader = ({ title, titleHighlight, subtitle, breadcrumbs }: PageHeaderProps) => {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if not provided
  const defaultBreadcrumbs =
    breadcrumbs ||
    (() => {
      const paths = pathname.split('/').filter(Boolean);
      const breadcrumbItems = [{ name: 'Home', href: '/' }];

      let currentPath = '';
      paths.forEach((path, index) => {
        currentPath += `/${path}`;
        const isLast = index === paths.length - 1;
        breadcrumbItems.push({
          name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
          href: isLast ? '' : currentPath,
        });
      });

      return breadcrumbItems;
    })();

  return (
    <div className="py-6">
      <div >
        {/* Breadcrumbs */}
        <div className="text-md font-bold text-[var(--color-logo)] mb-6">
          {defaultBreadcrumbs.map((crumb, index) => (
            <span key={index}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span>{crumb.name}</span>
              )}
              {index < defaultBreadcrumbs.length - 1 && <span className="mx-2">/</span>}
            </span>
          ))}
        </div>

        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-black)] mb-4">
            {titleHighlight ? (
              <>
                {title} <span className="text-[var(--color-primary-accent)]">{titleHighlight}</span>
              </>
            ) : (
              title
            )}
          </h1>
          {subtitle && <p className="text-xl text-[var(--color-secondary-text)]">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
