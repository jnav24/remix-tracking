import DashboardLayout from '~/components/layouts/DashboardLayout';
import Typography from '~/components/elements/Typography';
import FormButton from '~/components/forms-fields/FormButton';
import StopIcon from '~/components/icons/StopIcon';
import PlayIcon from '~/components/icons/PlayIcon';
import PauseIcon from '~/components/icons/PauseIcon';
import CancelIcon from '~/components/icons/CancelIcon';
import FormSelect from '~/components/forms-fields/FormSelect';
import BoltSlashIcon from '~/components/icons/BoltSlashIcon';

export const meta = () => {
    return [{ title: 'Tasks' }];
};

export default function DashboardTasks() {
    const showButtons = false;

    return (
        <DashboardLayout title='Time Tracker' notifications={69}>
            <div className='mb-20 p-8 text-center'>
                <div className='inline-block w-48'>
                    <FormSelect items={[]} />
                </div>

                <div className='my-10 space-y-6'>
                    <Typography className='text-7xl' variant='h1'>
                        37:04<span className='dark:text-gray-500'>:56</span>
                    </Typography>
                    <Typography variant='caption'>Total time tracked today: 3h 45m</Typography>
                </div>

                <div className='space-x-4 pt-2'>
                    <FormButton fab>
                        <CancelIcon className='m-2 size-8' />
                    </FormButton>

                    {showButtons && (
                        <div className='inline-block rounded-full bg-gradient-to-br from-teal-300/25 from-10% via-blue-500/25 via-35% to-violet-500/25 to-75% p-2'>
                            <FormButton fab color='primary-g'>
                                <PlayIcon className='m-4 size-10' />
                            </FormButton>
                        </div>
                    )}

                    <div className='group relative inline-block'>
                        <div className='animate-blur absolute -left-1 -top-1 h-24 w-24 rounded-full bg-gradient-to-tl from-teal-300 from-10% via-blue-500 via-35% to-violet-400 to-75% p-2 blur transition-opacity duration-500 ease-in-out group-hover:opacity-0' />
                        <div className='dark:border-dm-stroke relative rounded-full border border-gray-400'>
                            <FormButton fab color='primary-g'>
                                <PlayIcon className='m-4 size-10 drop-shadow-lg' />
                            </FormButton>
                        </div>
                    </div>

                    {showButtons && (
                        <div className='inline-block rounded-full bg-gradient-to-b from-gray-600 from-10% to-gray-700 to-30% p-1'>
                            <FormButton fab color='primary-dark'>
                                <PauseIcon className='m-4 size-10' />
                            </FormButton>
                        </div>
                    )}

                    <FormButton fab>
                        <StopIcon className='m-2 size-8' />
                    </FormButton>
                </div>
            </div>

            <div className='space-y-6'>
                <section className='space-y-2'>
                    <div className='flex items-center justify-between py-2'>
                        <div>
                            <Typography variant='body1'>Tue, June 02</Typography>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Typography variant='caption'>Total:</Typography>
                            <Typography variant='body1'>01:34:23</Typography>
                        </div>
                    </div>
                    <div className='bg-lm-secondary border-lm-stroke dark:bg-dm-secondary dark:border-dm-stroke flex items-center justify-between rounded border px-6 py-4'>
                        <div className='flex items-center space-x-2'>
                            <div className='rounded bg-gray-100 p-2 shadow dark:bg-gray-800 dark:shadow-black'>
                                <BoltSlashIcon className='size-6 text-gray-400 drop-shadow' />
                            </div>
                            <Typography variant='body1'>Monarchy Project</Typography>
                        </div>
                        <div>
                            <Typography variant='caption'>00:53:42</Typography>
                        </div>
                    </div>

                    <div className='bg-lm-secondary border-lm-stroke dark:bg-dm-secondary dark:border-dm-stroke flex items-center justify-between rounded border px-6 py-4'>
                        <div className='flex items-center space-x-2'>
                            <div className='rounded bg-gray-100 p-2 shadow dark:bg-gray-800 dark:shadow-black'>
                                <BoltSlashIcon className='size-6 text-gray-400 drop-shadow' />
                            </div>
                            <Typography variant='body1'>Monarchy Project</Typography>
                        </div>
                        <div>
                            <Typography variant='caption'>00:53:42</Typography>
                        </div>
                    </div>
                </section>

                <section className='space-y-2'>
                    <div className='flex items-center justify-between py-2'>
                        <div>
                            <Typography variant='body1'>Tue, June 02</Typography>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Typography variant='caption'>Total:</Typography>
                            <Typography variant='body1'>01:34:23</Typography>
                        </div>
                    </div>
                    <div className='bg-lm-secondary border-lm-stroke dark:bg-dm-secondary dark:border-dm-stroke flex items-center justify-between rounded border px-6 py-4'>
                        <div className='flex items-center space-x-2'>
                            <div className='rounded bg-gray-100 p-2 shadow dark:bg-gray-800 dark:shadow-black'>
                                <BoltSlashIcon className='size-6 text-gray-400 drop-shadow' />
                            </div>
                            <Typography variant='body1'>Monarchy Project</Typography>
                        </div>

                        <div>
                            <Typography variant='caption'>00:53:42</Typography>
                        </div>
                    </div>

                    <div className='bg-lm-secondary border-lm-stroke dark:bg-dm-secondary dark:border-dm-stroke flex items-center justify-between rounded border px-6 py-4'>
                        <div className='flex items-center space-x-2'>
                            <div className='rounded bg-gray-100 p-2 shadow dark:bg-gray-800 dark:shadow-black'>
                                <BoltSlashIcon className='size-6 text-gray-400 drop-shadow' />
                            </div>
                            <Typography variant='body1'>Monarchy Project</Typography>
                        </div>
                        <div>
                            <Typography variant='caption'>00:53:42</Typography>
                        </div>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
