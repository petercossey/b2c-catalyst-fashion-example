import { clsx } from 'clsx';

export interface ProductVariantInventoryListItem {
  entityId: number;
  sku: string;
  inventoryAvailable: number | null;
  isInStock: boolean;
  optionValues: Array<{
    optionEntityId: number;
    optionLabel: string;
    valueEntityId: number;
    valueLabel: string;
  }>;
}

interface Props {
  items: ProductVariantInventoryListItem[];
  title?: string;
}

export function ProductVariantsInventory({
  items,
  title = 'Variant inventory',
}: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-[var(--product-detail-border,hsl(var(--contrast-100)))] py-8">
      <h2 className="mb-4 text-base font-medium @xl:text-lg">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm"
            key={item.entityId}
          >
            <div className="min-w-0">
              <span className="font-mono text-[var(--product-detail-primary-text,hsl(var(--foreground)))]">
                {item.sku}
              </span>
              {item.optionValues.length > 0 && (
                <span className="ml-3 text-[var(--product-detail-secondary-text,hsl(var(--contrast-500)))]">
                  {item.optionValues.map((option) => option.valueLabel).join(' / ')}
                </span>
              )}
            </div>
            <span
              className={clsx(
                'whitespace-nowrap text-[var(--product-detail-secondary-text,hsl(var(--contrast-500)))]',
                !item.isInStock && 'font-medium',
              )}
            >
              {item.inventoryAvailable ?? 'N/A'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
