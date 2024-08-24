import Avatar from '~/components/elements/Avatar';
import Typography from '~/components/elements/Typography';
import Table from '~/components/table/Table';
import TrashIcon from '~/components/icons/solid/TrashIcon';
import FormButton from '~/components/forms-fields/FormButton';

export default function TeamMemberDrawer() {
    return (
        <section className='px-4'>
            <div className='flex w-full flex-col items-center justify-center space-y-6 rounded-lg bg-lm-text-disabled/30 py-6 dark:bg-dm-text-disabled/15'>
                <div className='rounded-full bg-lm-primary p-1 dark:bg-dm-primary'>
                    <Avatar
                        image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                        size={36}
                    />
                </div>

                <div className='space-y-3 text-center'>
                    <Typography tag='p' variant='h2'>
                        Peter Parker
                    </Typography>

                    <Typography tag='p' variant='body2'>
                        Software Engineer
                    </Typography>
                </div>

                <Typography tag='p' variant='body1'>
                    Available: $45/h USD
                </Typography>
            </div>

            <div className='my-6 flex items-center justify-start space-x-12 border-b border-lm-stroke pb-6 dark:border-dm-stroke'>
                <div>
                    <Typography variant='caption'>Location</Typography>
                    <Typography variant='body1'>Miami, FL USA</Typography>
                </div>

                <div>
                    <Typography variant='caption'>Phone No.</Typography>
                    <Typography variant='body1'>+1 (786) 223-4849</Typography>
                </div>

                <div>
                    <Typography variant='caption'>Status</Typography>
                    <div className='mt-2'>
                        <span className='rounded-lg border border-primary-focus bg-primary/10 px-4 py-2 text-xs text-primary-focus dark:border-primary dark:text-primary'>
                            Active
                        </span>
                    </div>
                </div>
            </div>

            <div className='space-y-6'>
                <Typography tag='h2' variant='h4'>
                    Projects
                </Typography>

                <Table
                    columns={[
                        {
                            content: (project) => {
                                return (
                                    <>
                                        <Typography variant='body2'>{project.name}</Typography>
                                        <div className='truncate'>
                                            <Typography variant='caption'>
                                                {project.description}
                                            </Typography>
                                        </div>
                                    </>
                                );
                            },
                            label: 'Projects',
                            colspan: 10,
                        },
                        {
                            content: () => (
                                <FormButton variant='text' fab>
                                    <TrashIcon className='size-5 text-dm-text-disabled dark:text-lm-text-disabled' />
                                </FormButton>
                            ),
                            label: '',
                            colspan: 1,
                        },
                    ]}
                    empty={{
                        title: 'No projects found',
                        content: 'This user does not have any projects currently assigned.',
                    }}
                    items={[
                        {
                            name: 'Daily Bugle',
                            description:
                                'The Daily Bugle is run by J. Jonah Jameson, who uses the paper to write editorials about Spider-Man',
                        },
                        {
                            name: 'Daily Bugle',
                            description:
                                'The Daily Bugle is run by J. Jonah Jameson, who uses the paper to write editorials about Spider-Man',
                        },
                    ]}
                />
            </div>
        </section>
    );
}
