import { useMemo } from 'react';
import FormButton from '~/components/forms-fields/FormButton';
import Typography from '~/components/elements/Typography';
import FormSelect from '~/components/forms-fields/FormSelect';
import ChevronDoubleLeftIcon from '~/components/icons/outline/ChevronDoubleLeftIcon';
import ChevronDoubleRightIcon from '~/components/icons/outline/ChevronDoubleRightIcon';

type Props = {
    handleChangePage: (page: number) => void;
    handleSelection: (selection: number) => void;
    options: number[];
    page: number;
    selected: number;
    total: number;
};

export default function TablePagination({
    handleChangePage,
    handleSelection,
    options,
    page,
    selected,
    total,
}: Props) {
    const allowedLinks = 5;

    const items = useMemo(
        () => options.map((op) => ({ label: op.toString(), value: op.toString() })),
        [options],
    );
    const pages = useMemo(() => Math.ceil(total / selected), [selected, total]);
    const endNumber = useMemo(() => {
        const value = selected * page;

        if (total < value) {
            return total;
        }

        return value;
    }, [selected, page]);
    const startNumber = useMemo(() => 1 + selected * (page - 1), [selected, page]);

    const paginationLinks = (iterate: number) => {
        return Array.from(Array(iterate).keys()).map((num) => {
            const sum = num + 1;
            return (
                <FormButton
                    color={page === sum ? 'default' : 'secondary'}
                    size='2xs'
                    onClick={() => handleChangePage(sum)}
                    key={num}
                >
                    {num + 1}
                </FormButton>
            );
        });
    };

    return (
        <div className='flex flex-row items-center justify-between px-4 py-4'>
            <div>
                <Typography variant='caption'>
                    Showing {startNumber}-{endNumber} of {total} results
                </Typography>
            </div>

            <div className='flex flex-row items-center space-x-2'>
                <FormSelect
                    items={items}
                    defaultValue={selected.toString()}
                    handleUpdateInput={(value) => handleSelection(+value)}
                />
                <Typography variant='caption'>per page</Typography>
            </div>

            <div className='flex flex-row items-center space-x-2'>
                {pages > 1 && (
                    <>
                        <FormButton fab disabled={page === 1} onClick={() => handleChangePage(1)}>
                            <ChevronDoubleLeftIcon className='size-4' />
                        </FormButton>
                        {pages < allowedLinks ? paginationLinks(pages) : null}
                        <FormButton
                            fab
                            disabled={page === pages}
                            onClick={() => handleChangePage(pages)}
                        >
                            <ChevronDoubleRightIcon className='size-4' />
                        </FormButton>
                    </>
                )}
            </div>
        </div>
    );
}
