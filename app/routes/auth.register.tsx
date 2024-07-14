import { Link } from '@remix-run/react';
import AuthLayout from '~/components/layouts/AuthLayout';
import { ActionFunctionArgs } from '@remix-run/node';
import { decryptAES } from '~/utils/encryption';
import FormContextProvider from '~/providers/FormContextProvider';
import FormInput from '~/components/forms-fields/FormInput';
import FormButton from '~/components/forms-fields/FormButton';
import { route } from '~/utils/routes';
import { RulesType } from '~/utils/form-validator';

type FormElements = {
    email: string;
};

const nameRules: Array<keyof RulesType> = ['required', 'min:3'];
const emailRules: Array<keyof RulesType> = ['required', 'email'];
const confirmPasswordRules: Array<keyof RulesType> = ['required', 'match:password'];
const passwordRules: Array<keyof RulesType> = ['required', 'min:12', 'lower', 'upper', 'has-int'];

export const meta = () => {
    return [{ title: 'Sign Up' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = JSON.parse(decryptAES((formData.get('data') as string) || '')) as FormElements;
    console.log('----- fd', formData, formData.get('data'));
    console.log('----- decrypt', data);
    return null;
};

export default function AuthRegister() {
    return (
        <AuthLayout title='Create a new account'>
            <FormContextProvider isSensitive>
                <div className='mb-12 space-y-8'>
                    <FormInput label='First Name' rules={nameRules} />
                    <FormInput label='Last Name' rules={nameRules} />
                    <FormInput label='Email' rules={emailRules} />
                    <FormInput label='Password' password rules={passwordRules} />
                    <FormInput
                        label='Password Confirmation'
                        password
                        rules={confirmPasswordRules}
                    />
                </div>

                <FormButton block submit color='primary'>
                    Register
                </FormButton>
            </FormContextProvider>

            <div className='mt-4 flex justify-between'>
                <Link to={route('auth.login')}>Login</Link>
            </div>
        </AuthLayout>
    );
}
