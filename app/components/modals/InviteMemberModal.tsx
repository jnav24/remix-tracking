import Typography from '~/components/elements/Typography';
import FormButton from '~/components/forms-fields/FormButton';
import PaperAirplaneIcon from '~/components/icons/outline/PaperAirplaneIcon';
import AddIcon from '~/components/icons/outline/AddIcon';
import FormInput from '~/components/forms-fields/FormInput';
import FormSelect from '~/components/forms-fields/FormSelect';
import CancelIcon from '~/components/icons/CancelIcon';
import { useMemo, useState } from 'react';
import FormContextProvider from '~/providers/FormContextProvider';

type Props = {
    closeModal: () => void;
};

export default function InviteMemberModal({ closeModal }: Props) {
    const emptyMember = { email: '', role: '' };
    const limit = 5;
    const [members, setMembers] = useState([emptyMember]);
    const [isValid, setIsValid] = useState(false);

    const isAtLimit = useMemo(() => members.length >= limit, [members]);

    const canSendInvites = useMemo(() => {
        return isValid && !members.some((member) => member.email === '' || member.role === '');
    }, [members, isValid]);

    const addMember = () => setMembers([...members, emptyMember]);

    const removeInvite = (idx: number) =>
        setMembers(members.slice(0, idx).concat(members.slice(idx + 1)));

    const updateMember = (index: number, data: Partial<typeof emptyMember>) => {
        const temp = JSON.parse(JSON.stringify(members));
        temp[index] = { ...temp[index], ...data };
        setMembers(temp);
    };

    return (
        <section className='w-200 p-4'>
            <Typography tag='h1' variant='h3'>
                Invite Team Member
            </Typography>

            <Typography variant='body2'>
                Invite team members to collaborate on your projects. You can only send, up to,{' '}
                {limit} invites at a time.
            </Typography>

            <FormContextProvider formAction='invite' handleUpdateValid={setIsValid}>
                <div className='my-6 space-y-4'>
                    {members.map((member, idx) => (
                        <div className='flex items-end space-x-3' key={idx}>
                            <div className='flex-1'>
                                <FormInput
                                    label='Email'
                                    name={`email-${idx}`}
                                    rules={['email']}
                                    handleUpdateInput={(v) => updateMember(idx, { email: v })}
                                />
                            </div>
                            <div className='w-1/4'>
                                <FormSelect
                                    defaultValue={member.role}
                                    handleUpdateInput={(v) => updateMember(idx, { role: v })}
                                    label='Role'
                                    name={`role-${idx}`}
                                    items={[
                                        { label: 'Employee', value: '1' },
                                        { label: 'Contractor', value: '2' },
                                    ]}
                                />
                            </div>
                            <div className='pb-2'>
                                {members.length > 1 && (
                                    <FormButton
                                        fab
                                        color='danger'
                                        onClick={() => removeInvite(idx)}
                                    >
                                        <CancelIcon className='size-3 text-white' />
                                    </FormButton>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <FormButton
                    block
                    color='primary'
                    variant='outlined'
                    disabled={isAtLimit}
                    onClick={addMember}
                >
                    <span className='flex items-center space-x-2'>
                        <AddIcon className='size-4' />
                        <span>Add</span>
                    </span>
                </FormButton>

                <div className='mt-6 flex items-center justify-end border-t pt-6 dark:border-dm-stroke'>
                    <FormButton size='xs' onClick={closeModal}>
                        Cancel
                    </FormButton>

                    <FormButton color='primary' size='xs' disabled={!canSendInvites} submit>
                        <span className='flex items-center space-x-2'>
                            <PaperAirplaneIcon className='size-4' />
                            <span>Send Invite</span>
                        </span>
                    </FormButton>
                </div>
            </FormContextProvider>
        </section>
    );
}
