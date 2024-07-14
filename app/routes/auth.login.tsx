import { Link } from '@remix-run/react';
import AuthLayout from '~/components/layouts/AuthLayout';
import { ActionFunctionArgs } from '@remix-run/node';
import FormContextProvider from '~/providers/FormContextProvider';
import FormInput from '~/components/forms-fields/FormInput';
import FormButton from '~/components/forms-fields/FormButton';
import { decryptAES } from '~/utils/encryption';
import { route } from '~/utils/routes';

type FormElements = {
    email: string;
    password: string;
};

export const meta = () => {
    return [{ title: 'Login Page' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = JSON.parse(decryptAES((formData.get('data') as string) || '')) as FormElements;
    console.log('----- fd', formData, formData.get('data'));
    console.log('----- decrypt', data);
    return null;
};

export default function AuthLogin() {
    return (
        <AuthLayout title='Sign in to your account'>
            <FormContextProvider isSensitive>
                <div className='mb-12 space-y-8'>
                    <FormInput label='Email' rules={['required', 'email']} />
                    <FormInput label='Password' password rules={['required']} />
                </div>

                <FormButton block submit color='primary'>
                    Login
                </FormButton>
            </FormContextProvider>

            <div className='mt-4 flex justify-between'>
                <Link to={route('auth.register')}>Sign up</Link>
                <Link to={route('auth.forgot')}>Forgot your password?</Link>
            </div>
        </AuthLayout>
    );
}
