import DashboardLayout from '~/components/layouts/DashboardLayout';
import AddIcon from '~/components/icons/outline/AddIcon';
import Modal from '~/components/modals/Modal';
import { useState } from 'react';
import InviteMemberModal from '~/components/modals/InviteMemberModal';
import { ActionFunctionArgs, json } from '@remix-run/node';
import Table from '~/components/table/Table';
import { useLoaderData } from '@remix-run/react';
import Typography from '~/components/elements/Typography';
import { cn } from '~/utils/helpers';
import Avatar from '~/components/elements/Avatar';
import FormButton from '~/components/forms-fields/FormButton';
import UserIcon from '~/components/icons/solid/UserIcon';
import TrashIcon from '~/components/icons/solid/TrashIcon';
import Drawer from '~/components/drawers/Drawer';
import TeamMemberDrawer from '~/components/drawers/TeamMemberDrawer';

type Team = {
    first_name: string;
    last_name: string;
    title: string;
    email: string;
    role: string;
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    console.log(formData, formData.get('action'));
    return null;
}

export async function loader() {
    const team: Team[] = [
        {
            email: 'mjane@dailybugle.com',
            first_name: 'MaryJane',
            last_name: 'Watson',
            title: 'Software Engineer',
            role: 'Employee',
        },
        {
            email: 'mjane@dailybugle.com',
            first_name: 'MaryJane',
            last_name: 'Watson',
            title: 'Software Engineer',
            role: 'Contractor',
        },
        {
            email: 'mjane@dailybugle.com',
            first_name: 'MaryJane',
            last_name: 'Watson',
            title: 'Software Engineer',
            role: 'Employee',
        },
        {
            email: 'mjane@dailybugle.com',
            first_name: 'MaryJane',
            last_name: 'Watson',
            title: 'Software Engineer',
            role: 'Employee',
        },
        {
            email: 'mjane@dailybugle.com',
            first_name: 'MaryJane',
            last_name: 'Watson',
            title: 'Software Engineer',
            role: 'Employee',
        },
        {
            email: 'mjane@dailybugle.com',
            first_name: 'MaryJane',
            last_name: 'Watson',
            title: 'Software Engineer',
            role: 'Employee',
        },
        {
            email: 'mjane@dailybugle.com',
            first_name: 'MaryJane',
            last_name: 'Watson',
            title: 'Software Engineer',
            role: 'Employee',
        },
        {
            email: 'mjane@dailybugle.com',
            first_name: 'MaryJane',
            last_name: 'Watson',
            title: 'Software Engineer',
            role: 'Employee',
        },
    ];
    return json({ team });
}

export default function DashboardTeam() {
    const data = useLoaderData<typeof loader>();
    const [isOpen, setIsOpen] = useState(false);
    const [isSlideOpen, setIsSlideOpen] = useState(false);

    const actionsColumn = () => {
        return (
            <div className='space-x-2'>
                <FormButton variant='text' fab onClick={() => setIsSlideOpen(true)}>
                    <UserIcon className='size-5 text-dm-text-disabled dark:text-lm-text-disabled' />
                </FormButton>
                <FormButton variant='text' fab>
                    <TrashIcon className='size-5 text-dm-text-disabled dark:text-lm-text-disabled' />
                </FormButton>
            </div>
        );
    };

    const infoColumn = (team: Team) => {
        return (
            <div className='flex items-center space-x-2'>
                <Avatar
                    image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                    size={8}
                />
                <div>
                    <Typography variant='body2'>
                        {team.first_name} {team.last_name}
                    </Typography>
                </div>
            </div>
        );
    };

    const tagColumn = (team: Team) => {
        const tag = {
            Employee:
                'border-primary-focus dark:border-primary text-primary-focus dark:text-primary bg-primary/10',
            Contractor:
                'border-warning-focus dark:border-warning text-warning-focus dark:text-warning bg-warning/10',
        };
        return (
            <Typography variant='body2'>
                <span
                    className={cn(
                        'rounded-lg border px-4 py-2 text-xs',
                        tag[team.role as keyof typeof tag],
                    )}
                >
                    {team.role}
                </span>
            </Typography>
        );
    };

    return (
        <>
            <Modal
                showModal={isOpen}
                closeModal={() => setIsOpen(false)}
                hideCloseButton
                persistent
            >
                <InviteMemberModal closeModal={() => setIsOpen(false)} />
            </Modal>

            <Drawer closeSlide={() => setIsSlideOpen(false)} showSlide={isSlideOpen}>
                <TeamMemberDrawer />
            </Drawer>

            <DashboardLayout
                actions={[
                    {
                        label: 'New Invite',
                        icon: <AddIcon className='size-4' />,
                        click: () => setIsOpen(true),
                    },
                ]}
                title='Team'
            >
                <div className='mb-16 grid grid-cols-3 gap-6'>
                    <div className='rounded-lg border border-lm-stroke bg-lm-secondary px-4 py-8 dark:border-dm-stroke dark:bg-dm-secondary'>
                        <Typography variant='h5'>Most Projects</Typography>
                        <div className='mt-4 flex items-center justify-between'>
                            <div className='flex space-x-2'>
                                <Avatar
                                    image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                                    size={10}
                                />

                                <div>
                                    <Typography variant='body1'>Peter Parker</Typography>
                                    <Typography variant='caption'>Photo Journalist</Typography>
                                </div>
                            </div>

                            <div className='bg-lm-text/60 rounded-lg px-4 py-1 dark:bg-dm-text/60'>
                                <Typography variant='body2'>12</Typography>
                            </div>
                        </div>

                        <div className='mt-4 flex items-center justify-between border-y border-lm-stroke py-2 dark:border-dm-stroke'>
                            <div className='flex space-x-2'>
                                <Avatar
                                    image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                                    size={10}
                                />

                                <div>
                                    <Typography variant='body1'>Peter Parker</Typography>
                                    <Typography variant='caption'>Photo Journalist</Typography>
                                </div>
                            </div>

                            <div className='bg-lm-text/60 rounded-lg px-4 py-1 dark:bg-dm-text/60'>
                                <Typography variant='body2'>12</Typography>
                            </div>
                        </div>

                        <div className='mt-4 flex items-center justify-between'>
                            <div className='flex space-x-2'>
                                <Avatar
                                    image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                                    size={10}
                                />

                                <div>
                                    <Typography variant='body1'>Peter Parker</Typography>
                                    <Typography variant='caption'>Photo Journalist</Typography>
                                </div>
                            </div>

                            <div className='bg-lm-text/60 rounded-lg px-4 py-1 dark:bg-dm-text/60'>
                                <Typography variant='body2'>12</Typography>
                            </div>
                        </div>
                    </div>

                    <div className='rounded-lg border border-lm-stroke bg-lm-secondary px-4 py-8 dark:border-dm-stroke dark:bg-dm-secondary'>
                        <Typography variant='h5'>Most Hours</Typography>
                        <div className='mt-4 flex items-center justify-between'>
                            <div className='flex space-x-2'>
                                <Avatar
                                    image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                                    size={10}
                                />

                                <div>
                                    <Typography variant='body1'>Peter Parker</Typography>
                                    <Typography variant='caption'>Photo Journalist</Typography>
                                </div>
                            </div>

                            <div className='bg-lm-text/60 rounded-lg px-4 py-1 dark:bg-dm-text/60'>
                                <Typography variant='body2'>12</Typography>
                            </div>
                        </div>

                        <div className='mt-4 flex items-center justify-between border-y border-lm-stroke py-2 dark:border-dm-stroke'>
                            <div className='flex space-x-2'>
                                <Avatar
                                    image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                                    size={10}
                                />

                                <div>
                                    <Typography variant='body1'>Peter Parker</Typography>
                                    <Typography variant='caption'>Photo Journalist</Typography>
                                </div>
                            </div>

                            <div className='bg-lm-text/60 rounded-lg px-4 py-1 dark:bg-dm-text/60'>
                                <Typography variant='body2'>12</Typography>
                            </div>
                        </div>

                        <div className='mt-4 flex items-center justify-between'>
                            <div className='flex space-x-2'>
                                <Avatar
                                    image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                                    size={10}
                                />

                                <div>
                                    <Typography variant='body1'>Peter Parker</Typography>
                                    <Typography variant='caption'>Photo Journalist</Typography>
                                </div>
                            </div>

                            <div className='bg-lm-text/60 rounded-lg px-4 py-1 dark:bg-dm-text/60'>
                                <Typography variant='body2'>12</Typography>
                            </div>
                        </div>
                    </div>

                    <div className='rounded-lg border border-lm-stroke bg-lm-secondary px-4 py-8 dark:border-dm-stroke dark:bg-dm-secondary'>
                        <Typography variant='h5'>Newest Member</Typography>

                        <div className='mt-6 flex items-center space-x-4'>
                            <div>
                                <Avatar
                                    image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                                    size={28}
                                />
                            </div>
                            <div>
                                <Typography variant='h3'>Peter Parker</Typography>
                                <Typography variant='caption'>Photo Journalist</Typography>
                                <div className='mt-4'>
                                    <Typography variant='body1'>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                                        consequatur ducimus.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='my-6'>
                    <Typography tag='h2' variant='h4'>
                        Team Members
                    </Typography>
                </div>

                <Table
                    columns={[
                        { content: infoColumn, label: 'Name', colspan: 3 },
                        { content: 'email', label: 'Email', colspan: 3 },
                        { content: 'title', label: 'Title', colspan: 2 },
                        { content: tagColumn, label: 'Role', colspan: 2 },
                        { content: actionsColumn, label: 'Actions', colspan: 1 },
                    ]}
                    empty={{
                        button: {
                            label: (
                                <>
                                    <AddIcon className='size-4' />
                                    <span>New Invite</span>
                                </>
                            ),
                            onClick: () => setIsOpen(true),
                        },
                        content: 'Click the button below to invite members to your team',
                        title: 'No team members',
                    }}
                    items={data.team}
                />
            </DashboardLayout>
        </>
    );
}
