import DashboardLayout from '~/components/layouts/DashboardLayout';
import AddIcon from '~/components/icons/outline/AddIcon';
import Modal from '~/components/modals/Modal';
import { useState } from 'react';
import InviteMemberModal from '~/components/modals/InviteMemberModal';

export default function DashboardTeam() {
    const [isOpen, setIsOpen] = useState(false);

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
                <h1>Heyo!</h1>
            </DashboardLayout>
        </>
    );
}
