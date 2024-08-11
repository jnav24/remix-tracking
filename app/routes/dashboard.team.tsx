import DashboardLayout from '~/components/layouts/DashboardLayout';
import AddIcon from '~/components/icons/outline/AddIcon';

export default function DashboardTeam() {
    return (
        <DashboardLayout
            actions={[
                { label: 'New Invite', icon: <AddIcon className='size-4' />, click: () => null },
            ]}
            title='Team'
        >
            <h1>Heyo!</h1>
        </DashboardLayout>
    );
}
