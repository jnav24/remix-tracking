import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import TableEmpty, { Props as TableEmptyProps } from '~/components/table/TableEmpty';
import { parseNested } from '~/utils/helpers';
import Typography from '~/components/elements/Typography';
import FormCheckbox from '~/components/forms-fields/FormCheckbox';
import TableRow from '~/components/table/TableRow';
import TablePagination from '~/components/table/TablePagination';
import VerticalEllipsisIcon from '~/components/icons/outline/VerticalEllipsisIcon';
import TrashIcon from '~/components/icons/outline/TrashIcon';
import Dropdown from '~/components/dropdown/Dropdown';

type Column<T> = {
    content: string | ((item: T) => ReactNode);
    label: string;
    searchable?: boolean;
    colspan?: number;
    sortable?: boolean;
};

type Props<T> = {
    columns: Column<T>[];
    handleAction?: (type: 'delete', ids: Array<string>) => void;
    items: T[];
    paginate?: { current: number; options: number[] };
    selectable?: boolean;
    title?: string;
    empty?: TableEmptyProps;
};

const defaultPaginate = { current: 1, options: [10, 25, 50], selected: 10 };

export default function Table<T extends object>({
    columns,
    handleAction,
    items,
    paginate,
    selectable,
    title,
    empty,
}: Props<T>) {
    const [paginateState, setPaginateState] = useState(defaultPaginate);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    useEffect(() => {
        if (paginate) {
            setPaginateState({ ...defaultPaginate, ...paginate, selected: paginate.options[0] });
        }
    }, [paginate]);

    useEffect(() => {
        if (allChecked) {
            setCheckedItems([]);
        }
    }, [allChecked]);

    const hasSearchable = useMemo(() => {
        return columns.some((col) => !!col.searchable);
    }, [columns]);

    const hasSelection = useMemo(
        () => allChecked || checkedItems.length,
        [allChecked, checkedItems],
    );
    const hasTitle = useMemo(() => title && !!title.length, [title]);
    const hasTopSection = useMemo(
        () => selectable || hasTitle || hasSearchable,
        [selectable, hasTitle, hasSearchable],
    );
    const hasData = useMemo(() => !!(columns.length && items.length), [items, columns]);
    const paginateItems = useMemo(() => {
        return items.slice(
            (paginateState.current - 1) * paginateState.selected,
            paginateState.current * paginateState.selected,
        );
    }, [paginateState, items]);

    const defaultContent = (item: T, value: string) => (
        <Typography variant='body2'>{parseNested(item, value)}</Typography>
    );

    const toggleCheckedItem = (id: string) => {
        if (checkedItems.includes(id)) {
            return setCheckedItems(checkedItems.filter((item) => item !== id));
        }

        setCheckedItems([...checkedItems, id]);
    };

    const getColSpan = (col?: number) => {
        const widthClasses = {
            '1': 'w-1/12',
            '2': 'w-2/12',
            '3': 'w-3/12',
            '4': 'w-4/12',
            '5': 'w-5/12',
            '6': 'w-6/12',
            '7': 'w-7/12',
            '8': 'w-8/12',
            '9': 'w-9/12',
            '10': 'w-10/12',
            '11': 'w-11/12',
            '12': 'w-full',
        };
        const idx = `${col || 1}` as keyof typeof widthClasses;
        return widthClasses[idx] || 'w-full';
    };

    return (
        <>
            {!hasData && <TableEmpty {...empty} />}

            {hasData && (
                <div className='rounded-xl border border-lm-stroke bg-lm-secondary dark:border-dm-stroke dark:bg-dm-secondary'>
                    {hasTopSection && (
                        <div className='flex flex-row items-center justify-between px-3 py-4'>
                            <div>
                                {hasTitle && (
                                    <Typography tag='h2' variant='h3'>
                                        {title}
                                    </Typography>
                                )}
                            </div>
                            <div className='flex w-1/3 flex-row items-center justify-end space-x-4'>
                                {hasSearchable && <div className='grow'>Search bar here</div>}
                                {selectable && (
                                    <Dropdown
                                        disabled={!hasSelection}
                                        items={[
                                            {
                                                label: 'Delete',
                                                icon: <TrashIcon className='size-4' />,
                                                action: () =>
                                                    handleAction?.(
                                                        'delete',
                                                        allChecked ? ['all'] : checkedItems,
                                                    ),
                                            },
                                        ]}
                                    >
                                        <VerticalEllipsisIcon className='size-4' />
                                    </Dropdown>
                                )}
                            </div>
                        </div>
                    )}

                    <div className='flex flex-row items-center justify-between space-x-4 border-b border-lm-stroke px-4 py-4 text-lm-text-hover dark:border-dm-stroke dark:text-dm-text-hover'>
                        {selectable && (
                            <FormCheckbox
                                defaultChecked={allChecked}
                                handleUpdateInput={setAllChecked}
                                label=''
                            />
                        )}
                        {columns.map((column, index) => (
                            <Fragment key={index}>
                                {column.sortable}
                                <div className={getColSpan(column.colspan)}>{column.label}</div>
                            </Fragment>
                        ))}
                    </div>

                    {paginateItems.map((item, index) => (
                        <TableRow
                            key={(item as T & { id: string }).id ?? index}
                            className='contact-row justify-between'
                        >
                            {selectable && (
                                <FormCheckbox
                                    defaultChecked={
                                        allChecked ||
                                        checkedItems.includes(
                                            (item as T & { id: string }).id ?? index,
                                        )
                                    }
                                    handleUpdateInput={() =>
                                        toggleCheckedItem((item as T & { id: string })?.id ?? index)
                                    }
                                    label=''
                                />
                            )}
                            {columns.map((column, int) => (
                                <div className={getColSpan(column.colspan)} key={int}>
                                    {typeof column.content === 'string'
                                        ? defaultContent(item, column.content)
                                        : column.content(item)}
                                </div>
                            ))}
                        </TableRow>
                    ))}

                    <TablePagination
                        handleChangePage={(page) =>
                            setPaginateState({ ...paginateState, current: page })
                        }
                        handleSelection={(selected) =>
                            setPaginateState({ ...paginateState, selected })
                        }
                        options={paginateState.options}
                        page={paginateState.current}
                        selected={paginateState.selected}
                        total={items.length}
                    />
                </div>
            )}
        </>
    );
}
