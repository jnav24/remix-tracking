import DashboardLayout from '~/components/layouts/DashboardLayout';

export default function DashboardTeam() {
    return (
        <DashboardLayout actions={[{ label: 'New Invite', click: () => null }]} title='Team'>
            <h1>Heyo!</h1>
        </DashboardLayout>
    );
}
